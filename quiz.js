/* Ведалія — итоговый тест */
(function () {
  "use strict";

  var QUESTIONS = [
    {
      cat: "История",
      q: "В каком году Полоцк впервые упоминается в «Повести временных лет»?",
      options: ["862", "1067", "1253", "1517"],
      answer: 0,
      explain: "Под 862 годом летопись впервые называет Полоцк — древнейший город Беларуси."
    },
    {
      cat: "История",
      q: "Кто издал первую печатную книгу для восточных славян?",
      options: ["Иван Фёдоров", "Франциск Скорина", "Кирилл Туровский", "Янка Купала"],
      answer: 1,
      explain: "Франциск Скорина из Полоцка издал «Псалтырь» в Праге в 1517 году."
    },
    {
      cat: "История",
      q: "В каком городе состоялась коронация Миндовга, считающаяся началом ВКЛ?",
      options: ["Вильня", "Полоцк", "Новогрудок", "Гродно"],
      answer: 2,
      explain: "Коронация Миндовга прошла в Новогрудке в 1253 году."
    },
    {
      cat: "История",
      q: "Что произошло в 1569 году?",
      options: ["Брестская церковная уния", "Люблинская уния", "Принятие Статута ВКЛ", "Первый раздел Речи Посполитой"],
      answer: 1,
      explain: "Люблинская уния 1569 года объединила ВКЛ и Польшу в Речь Посполитую."
    },
    {
      cat: "История",
      q: "Кто возглавил восстание 1863 года на белорусских землях?",
      options: ["Тадеуш Костюшко", "Кастусь Калиновский", "Миндовг", "Якуб Колас"],
      answer: 1,
      explain: "Кастусь Калиновский руководил восстанием и издавал газету «Мужыцкая праўда»."
    },
    {
      cat: "История",
      q: "Когда была провозглашена Белорусская Народная Республика (БНР)?",
      options: ["1 января 1919", "25 марта 1918", "3 июля 1944", "27 июля 1990"],
      answer: 1,
      explain: "БНР была провозглашена 25 марта 1918 года."
    },
    {
      cat: "История",
      q: "Какой город был освобождён 3 июля 1944 года — теперь это День Независимости?",
      options: ["Брест", "Полоцк", "Минск", "Гомель"],
      answer: 2,
      explain: "3 июля 1944 года был освобождён Минск. С 1996 года эта дата отмечается как День Независимости."
    },
    {
      cat: "История",
      q: "В каком году БССР стала одним из государств — основателей ООН?",
      options: ["1919", "1945", "1986", "1991"],
      answer: 1,
      explain: "БССР подписала Устав ООН в 1945 году как одна из стран-основательниц."
    },
    {
      cat: "Культура",
      q: "Какой праздник связан с летним солнцестоянием, кострами и венками на воде?",
      options: ["Коляды", "Дожинки", "Купалье", "Гуканне вясны"],
      answer: 2,
      explain: "Купалье отмечают в ночь на 7 июля: костры, венки, песни и легенда о цветке папоротника."
    },
    {
      cat: "Культура",
      q: "Кто написал стихотворение «Слуцкія ткачыхі»?",
      options: ["Максим Богданович", "Янка Купала", "Якуб Колас", "Василь Быков"],
      answer: 0,
      explain: "«Слуцкія ткачыхі» — одно из самых известных стихотворений Максима Богдановича."
    },
    {
      cat: "Культура",
      q: "Какое блюдо считают визитной карточкой белорусской кухни?",
      options: ["Борщ", "Драники", "Пельмени", "Плов"],
      answer: 1,
      explain: "Драники — картофельные оладьи, которые подают со сметаной или мачанкой."
    },
    {
      cat: "Культура",
      q: "Что такое «батлейка»?",
      options: ["Вид вышивки", "Народный кукольный театр", "Праздничный танец", "Старинное блюдо"],
      answer: 1,
      explain: "Батлейка — народный кукольный театр с двухъярусной сценой и рождественскими сюжетами."
    },
    {
      cat: "Культура",
      q: "Кто получил Нобелевскую премию по литературе в 2015 году?",
      options: ["Василь Быков", "Владимир Короткевич", "Светлана Алексиевич", "Янка Купала"],
      answer: 2,
      explain: "Светлана Алексиевич — лауреат Нобелевской премии по литературе 2015 года."
    },
    {
      cat: "География",
      q: "Какая река самая длинная в пределах Беларуси?",
      options: ["Неман", "Западная Двина", "Припять", "Днепр"],
      answer: 3,
      explain: "Днепр протекает по территории Беларуси около 700 километров."
    },
    {
      cat: "География",
      q: "Какое озеро — самое большое в Беларуси?",
      options: ["Нарочь", "Освейское", "Дрисвяты", "Лукомское"],
      answer: 0,
      explain: "Нарочь — крупнейшее озеро страны, его площадь около 80 км²."
    },
    {
      cat: "География",
      q: "Где живёт крупнейшая популяция зубров?",
      options: ["Браславские озёра", "Беловежская пуща", "Припятский парк", "Нарочанский парк"],
      answer: 1,
      explain: "Беловежская пуща — главный дом зубров и объект Всемирного наследия ЮНЕСКО."
    },
    {
      cat: "География",
      q: "Какова высота высшей точки Беларуси — горы Дзержинской?",
      options: ["245 м", "345 м", "445 м", "545 м"],
      answer: 1,
      explain: "Гора Дзержинская достигает 345 метров — это высшая точка страны."
    },
    {
      cat: "Язык",
      q: "Сколько букв в белорусском алфавите?",
      options: ["26", "31", "32", "33"],
      answer: 2,
      explain: "В белорусском алфавите 32 буквы: нет «и», «щ», «ъ», но есть «і» и «ў»."
    },
    {
      cat: "Язык",
      q: "Что означает слово «дзякуй»?",
      options: ["Пожалуйста", "Спасибо", "Привет", "До свидания"],
      answer: 1,
      explain: "«Дзякуй» — это «спасибо». «Калі ласка» — пожалуйста, «вітаю» — привет."
    },
    {
      cat: "Язык",
      q: "Какая буква есть только в белорусском алфавите?",
      options: ["І", "Ў", "Ё", "Ы"],
      answer: 1,
      explain: "Буква «ў» («у нескладовае») уникальна для белорусской кириллицы."
    }
  ];

  var els = {
    intro: document.getElementById("quizIntro"),
    play: document.getElementById("quizPlay"),
    result: document.getElementById("quizResult"),
    start: document.getElementById("startQuiz"),
    best: document.getElementById("bestScore"),
    cat: document.getElementById("qCat"),
    count: document.getElementById("qCount"),
    bar: document.getElementById("qBar"),
    text: document.getElementById("qText"),
    options: document.getElementById("qOptions"),
    feedback: document.getElementById("qFeedback"),
    next: document.getElementById("qNext"),
    ring: document.getElementById("resultRing"),
    percent: document.getElementById("resultPercent"),
    title: document.getElementById("resultTitle"),
    sub: document.getElementById("resultSub"),
    review: document.getElementById("review"),
    retry: document.getElementById("retryQuiz")
  };

  if (!els.intro || !els.start) return;

  var state = { order: [], idx: 0, score: 0, answered: false, wrong: [] };
  var BEST_KEY = "vedalia.quiz.best";

  function getBest() {
    try {
      var v = Number(localStorage.getItem(BEST_KEY));
      return Number.isFinite(v) && v > 0 ? v : null;
    } catch (e) {
      return null;
    }
  }

  function setBest(v) {
    try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {}
  }

  function paintBest() {
    var best = getBest();
    if (els.best) els.best.textContent = best === null ? "пока нет" : best + "%";
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function startQuiz() {
    state.order = shuffle(QUESTIONS.map(function (_, i) { return i; }));
    state.idx = 0;
    state.score = 0;
    state.answered = false;
    state.wrong = [];

    els.intro.hidden = true;
    els.result.hidden = true;
    els.play.hidden = false;
    renderQuestion();
  }

  function renderQuestion() {
    var q = QUESTIONS[state.order[state.idx]];
    state.answered = false;

    els.cat.textContent = q.cat;
    els.count.textContent = "Вопрос " + (state.idx + 1) + " из " + state.order.length;
    els.bar.style.width = (state.idx / state.order.length) * 100 + "%";
    els.text.textContent = q.q;
    els.feedback.className = "feedback";
    els.feedback.innerHTML = "";
    els.next.hidden = true;
    els.next.textContent = state.idx === state.order.length - 1 ? "Показать результат" : "Следующий вопрос";

    els.options.innerHTML = "";
    q.options.forEach(function (opt, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.innerHTML = '<span class="key">' + "ABCD"[i] + "</span><span>" + opt + "</span>";
      btn.addEventListener("click", function () { answer(i, btn); });
      els.options.appendChild(btn);
    });
  }

  function answer(chosen, btn) {
    if (state.answered) return;
    state.answered = true;

    var q = QUESTIONS[state.order[state.idx]];
    var buttons = Array.prototype.slice.call(els.options.querySelectorAll(".option"));
    var correct = q.answer;

    buttons.forEach(function (b, i) {
      b.disabled = true;
      if (i === correct) b.classList.add("correct");
      else if (i === chosen) b.classList.add("wrong");
      else b.classList.add("dim");
    });

    if (chosen === correct) {
      state.score++;
      els.feedback.className = "feedback show ok";
      els.feedback.innerHTML = "<b>Верно!</b>" + q.explain;
    } else {
      state.wrong.push({ q: q, chosen: chosen });
      els.feedback.className = "feedback show no";
      els.feedback.innerHTML = "<b>Не совсем.</b>" + q.explain;
    }

    els.bar.style.width = ((state.idx + 1) / state.order.length) * 100 + "%";
    els.next.hidden = false;
    els.next.focus({ preventScroll: true });
  }

  function nextQuestion() {
    if (!state.answered) return;
    state.idx++;
    if (state.idx >= state.order.length) finish();
    else renderQuestion();
  }

  function finish() {
    els.play.hidden = true;
    els.result.hidden = false;

    var total = state.order.length;
    var pct = Math.round((state.score / total) * 100);

    els.ring.style.setProperty("--p", pct);
    els.percent.textContent = pct;

    var title, sub;
    if (pct === 100) {
      title = "Идеально! Вы знаете Беларусь отлично.";
      sub = "Правильных ответов: " + state.score + " из " + total + ". Так держать!";
    } else if (pct >= 80) {
      title = "Отличный результат!";
      sub = "Правильных ответов: " + state.score + " из " + total + ". Осталось закрыть пару пробелов.";
    } else if (pct >= 60) {
      title = "Хорошая база!";
      sub = "Правильных ответов: " + state.score + " из " + total + ". Загляните в разделы, где были ошибки.";
    } else if (pct >= 40) {
      title = "Есть что повторить";
      sub = "Правильных ответов: " + state.score + " из " + total + ". Это нормальный этап — вернитесь к разделам и попробуйте снова.";
    } else {
      title = "Начало положено";
      sub = "Правильных ответов: " + state.score + " из " + total + ". Прочитайте разделы сайта и возвращайтесь — результат обязательно вырастет.";
    }

    els.title.textContent = title;
    els.sub.textContent = sub;

    var best = getBest();
    if (best === null || pct > best) {
      setBest(pct);
      paintBest();
    }

    if (pct >= 60 && window.Vedalia) {
      window.Vedalia.setTrack("quiz", true);
      window.Vedalia.renderProgress();
    }

    if (state.wrong.length) {
      var html = "<h3>Разбор ошибок</h3><ul>";
      state.wrong.forEach(function (item) {
        html += "<li><b>" + item.q.q + "</b>Правильный ответ: " + item.q.options[item.q.answer] + ". " + item.q.explain + "</li>";
      });
      html += "</ul>";
      els.review.innerHTML = html;
    } else {
      els.review.innerHTML = "<h3>Разбор ошибок</h3><p style=\"font-size:.9rem\">Ошибок нет — все ответы верные.</p>";
    }

    els.result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  els.start.addEventListener("click", startQuiz);
  els.next.addEventListener("click", nextQuestion);
  els.retry.addEventListener("click", function () {
    els.result.hidden = true;
    startQuiz();
  });

  paintBest();
})();
