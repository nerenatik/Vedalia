/* Ведалія — общие скрипты сайта */
(function () {
  "use strict";

  var STORAGE = {
    theme: "vedalia.theme",
    progress: "vedalia.progress"
  };

  var TRACKS = [
    { id: "history", name: "История Беларуси", href: "history.html" },
    { id: "culture", name: "Культура и традиции", href: "culture.html" },
    { id: "nature", name: "Природа и география", href: "nature.html" },
    { id: "language", name: "Белорусский язык", href: "language.html" },
    { id: "quiz", name: "Итоговый тест", href: "quiz.html" }
  ];

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* приватный режим — просто игнорируем */
    }
  }

  /* ------------------------------------------------------------------ */
  /* Тема                                                               */
  /* ------------------------------------------------------------------ */

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему");
      btn.setAttribute("title", theme === "dark" ? "Светлая тема" : "Тёмная тема");
    }
  }

  function initTheme() {
    var saved = read(STORAGE.theme, null);
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));

    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      write(STORAGE.theme, next);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Мобильное меню                                                     */
  /* ------------------------------------------------------------------ */

  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav]");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 880) close();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Появление блоков при прокрутке                                     */
  /* ------------------------------------------------------------------ */

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* Учебный прогресс                                                   */
  /* ------------------------------------------------------------------ */

  function getProgress() {
    var data = read(STORAGE.progress, {});
    return data && typeof data === "object" ? data : {};
  }

  function setTrack(id, done) {
    var data = getProgress();
    if (done) data[id] = true;
    else delete data[id];
    write(STORAGE.progress, data);
    return data;
  }

  function renderProgress() {
    var data = getProgress();

    var rows = document.querySelectorAll("[data-progress-row]");
    rows.forEach(function (row) {
      var done = !!data[row.getAttribute("data-progress-row")];
      row.classList.toggle("is-done", done);
      var state = row.querySelector(".state");
      if (state) state.textContent = done ? "Изучено" : "Не изучено";
    });

    var trackCards = document.querySelectorAll("[data-track-card]");
    trackCards.forEach(function (card) {
      var id = card.getAttribute("data-track-card");
      var badge = card.querySelector(".done-badge");
      if (data[id] && !badge) {
        badge = document.createElement("span");
        badge.className = "done-badge";
        badge.textContent = "Изучено";
        card.appendChild(badge);
      } else if (!data[id] && badge) {
        badge.remove();
      }
    });

    var total = TRACKS.length;
    var done = TRACKS.filter(function (t) { return !!data[t.id]; }).length;
    var pct = Math.round((done / total) * 100);

    document.querySelectorAll("[data-progress-ring]").forEach(function (ring) {
      ring.style.setProperty("--p", pct);
    });
    document.querySelectorAll("[data-progress-percent]").forEach(function (el) {
      el.textContent = pct;
    });
    document.querySelectorAll("[data-progress-count]").forEach(function (el) {
      el.textContent = done + " из " + total;
    });
    document.querySelectorAll("[data-progress-label]").forEach(function (el) {
      if (pct === 100) el.textContent = "Все разделы изучены. Отличная работа!";
      else if (pct >= 60) el.textContent = "Большая часть пути пройдена — продолжайте!";
      else if (pct > 0) el.textContent = "Хорошее начало. Отмечайте разделы, которые прошли.";
      else el.textContent = "Отмечайте разделы, которые вы уже изучили.";
    });
  }

  function initProgress() {
    renderProgress();

    document.querySelectorAll("[data-mark-track]").forEach(function (btn) {
      var id = btn.getAttribute("data-mark-track");

      function paint(done) {
        btn.classList.toggle("is-done", done);
        btn.innerHTML = done
          ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> Раздел изучен'
          : '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> Отметить как изученное';
        btn.setAttribute("aria-pressed", done ? "true" : "false");
      }

      paint(!!getProgress()[id]);
      btn.addEventListener("click", function () {
        var done = !getProgress()[id];
        setTrack(id, done);
        paint(done);
        renderProgress();
      });
    });

    document.querySelectorAll("[data-progress-reset]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!window.confirm("Сбросить весь учебный прогресс?")) return;
        write(STORAGE.progress, {});
        renderProgress();
        document.querySelectorAll("[data-mark-track]").forEach(function (b) {
          b.classList.remove("is-done");
          b.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> Отметить как изученное';
          b.setAttribute("aria-pressed", "false");
        });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Бегущий факт на главной                                            */
  /* ------------------------------------------------------------------ */

  var FACTS = [
    "В Беловежской пуще живёт одна из крупнейших популяций зубра — символа страны.",
    "Первая печатная книга для восточных славян вышла в 1517 году стараниями Франциска Скорины.",
    "Беловежская пуща — один из древнейших лесов Европы и объект Всемирного наследия ЮНЕСКО.",
    "На территории Беларуси находятся четыре объекта Всемирного наследия ЮНЕСКО.",
    "В белорусском языке 32 буквы, а буква «ў» есть только в нём.",
    "Минск был разрушен почти полностью и отстроен заново — сегодня это город-герой."
  ];

  function initTicker() {
    var textEl = document.querySelector("[data-fact-text]");
    if (!textEl) return;

    var dotsWrap = document.querySelector("[data-fact-dots]");
    var index = 0;
    var timer = null;

    if (dotsWrap) {
      FACTS.forEach(function (_, i) {
        var dot = document.createElement("i");
        if (i === 0) dot.className = "on";
        dotsWrap.appendChild(dot);
      });
    }

    function show(i) {
      index = i % FACTS.length;
      textEl.classList.add("is-changing");
      window.setTimeout(function () {
        textEl.textContent = FACTS[index];
        textEl.classList.remove("is-changing");
        if (dotsWrap) {
          Array.prototype.forEach.call(dotsWrap.children, function (dot, di) {
            dot.classList.toggle("on", di === index);
          });
        }
      }, 260);
    }

    function start() {
      stop();
      timer = window.setInterval(function () { show(index + 1); }, 7000);
    }
    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    var card = textEl.closest(".hero-card");
    if (card) {
      card.addEventListener("mouseenter", stop);
      card.addEventListener("mouseleave", start);
    }

    show(0);
    start();
  }

  /* ------------------------------------------------------------------ */
  /* Вкладки                                                            */
  /* ------------------------------------------------------------------ */

  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (root) {
      var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
      if (!tabs.length) return;

      function activate(tab) {
        tabs.forEach(function (t) {
          var selected = t === tab;
          t.setAttribute("aria-selected", selected ? "true" : "false");
          t.setAttribute("tabindex", selected ? "0" : "-1");
          var panel = document.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = !selected;
        });
        tab.focus({ preventScroll: true });
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener("click", function () { activate(tab); });
        tab.addEventListener("keydown", function (e) {
          var next = null;
          if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
          if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
          if (e.key === "Home") next = tabs[0];
          if (e.key === "End") next = tabs[tabs.length - 1];
          if (next) { e.preventDefault(); activate(next); }
        });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Фильтр таймлайна                                                   */
  /* ------------------------------------------------------------------ */

  function initTimelineFilter() {
    var chips = document.querySelectorAll("[data-era-filter]");
    var events = document.querySelectorAll("[data-era]");
    if (!chips.length || !events.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var era = chip.getAttribute("data-era-filter");
        chips.forEach(function (c) {
          var active = c === chip;
          c.classList.toggle("active", active);
          c.setAttribute("aria-pressed", active ? "true" : "false");
        });
        events.forEach(function (ev) {
          var show = era === "all" || ev.getAttribute("data-era") === era;
          ev.hidden = !show;
        });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Карточки-перевёртыши                                                */
  /* ------------------------------------------------------------------ */

  function initFlips() {
    document.querySelectorAll(".flip").forEach(function (card) {
      function toggle() {
        var flipped = card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", flipped ? "true" : "false");
      }
      card.addEventListener("click", toggle);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Выбор области                                                      */
  /* ------------------------------------------------------------------ */

  function initRegions() {
    var buttons = document.querySelectorAll("[data-region]");
    var panels = document.querySelectorAll("[data-region-panel]");
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-region");
        buttons.forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        panels.forEach(function (p) {
          p.hidden = p.getAttribute("data-region-panel") !== id;
        });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Озвучивание фраз                                                   */
  /* ------------------------------------------------------------------ */

  function initSpeech() {
    var buttons = document.querySelectorAll("[data-speak]");
    if (!buttons.length || !("speechSynthesis" in window)) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-speak");
        if (!text) return;
        window.speechSynthesis.cancel();
        var utter = new SpeechSynthesisUtterance(text);
        utter.lang = "be-BY";
        utter.rate = 0.85;
        window.speechSynthesis.speak(utter);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Прочее                                                             */
  /* ------------------------------------------------------------------ */

  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function init() {
    initTheme();
    initNav();
    initReveal();
    initProgress();
    initTicker();
    initTabs();
    initTimelineFilter();
    initFlips();
    initRegions();
    initSpeech();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Экспорт для страницы теста
  window.Vedalia = { getProgress: getProgress, setTrack: setTrack, renderProgress: renderProgress, TRACKS: TRACKS };
})();
