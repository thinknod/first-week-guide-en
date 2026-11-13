(function () {
  "use strict";

  var DONE_KEY = "fwg.done"; // { task_id: { done: true, done_at: "YYYY-MM-DD HH:MM" } }
  var tasks = window.CONTENT.tasks;
  var answers = window.CONTENT.answers;
  var currentDay = 1;

  // Browser-only storage. If the browser blocks it, the page still works (marks just aren't kept).
  function loadDone() {
    try { return JSON.parse(localStorage.getItem(DONE_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveDone(marks) {
    try { localStorage.setItem(DONE_KEY, JSON.stringify(marks)); } catch (e) { /* not saved */ }
  }
  var marks = loadDone();

  function isDone(id) { return !!(marks[id] && marks[id].done); }

  function stamp() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function toggle(id) {
    if (isDone(id)) delete marks[id];
    else marks[id] = { done: true, done_at: stamp() };
    saveDone(marks);
    render();
  }

  function roleFor(answerId) {
    for (var i = 0; i < answers.length; i++) if (answers[i].answer_id === answerId) return answers[i].contact_role;
    return "";
  }

  function tasksForDay(day) {
    return tasks.filter(function (t) { return t.day === day; })
                .sort(function (a, b) { return a.order - b.order; });
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function renderDayButtons() {
    var nav = document.getElementById("day-buttons");
    nav.textContent = "";
    for (var d = 1; d <= 5; d++) {
      var b = el("button", "", "Day " + d);
      b.type = "button";
      b.setAttribute("aria-pressed", d === currentDay ? "true" : "false");
      b.addEventListener("click", (function (day) {
        return function () { currentDay = day; render(); };
      })(d));
      nav.appendChild(b);
    }
  }

  function renderTasks(list) {
    var box = document.getElementById("task-list");
    box.textContent = "";
    if (!list.length) {
      var c = el("div", "card");
      c.appendChild(el("p", "empty", "No tasks for this day yet."));
      box.appendChild(c);
      return;
    }
    list.forEach(function (t, i) {
      var done = isDone(t.task_id);
      var card = el("div", "card" + (done ? " done" : ""));
      var top = el("div", "top");
      var text = el("div");
      text.appendChild(el("div", "label", "Task " + (i + 1)));
      text.appendChild(el("h2", "", t.title));
      top.appendChild(text);

      var btn = el("button", "check");
      btn.type = "button";
      btn.setAttribute("aria-pressed", done ? "true" : "false");
      btn.setAttribute("aria-label", "Mark '" + t.title + "' done");
      var mark = el("span", "", "✓");
      mark.setAttribute("aria-hidden", "true");
      btn.appendChild(mark);
      btn.addEventListener("click", function () { toggle(t.task_id); });
      top.appendChild(btn);
      card.appendChild(top);

      var role = t.answer_id ? roleFor(t.answer_id) : "";
      if (role) card.appendChild(el("div", "contact", "Contact: " + role));
      box.appendChild(card);
    });
  }

  function renderHeader(list) {
    var n = list.filter(function (t) { return isDone(t.task_id); }).length;
    var total = list.length;
    document.getElementById("day-header").textContent = "Day " + currentDay + " of 5";
    document.getElementById("ring-count").textContent = n + "/" + total;
    var ring = document.getElementById("ring");
    ring.setAttribute("aria-label", n + " of " + total + " tasks done");
    ring.style.setProperty("--p", (total ? (n / total) * 100 : 0) + "%");
  }

  function render() {
    // Keep focus on the same control after re-render (keyboard users).
    var active = document.activeElement;
    var focusKey = active && active.getAttribute ? active.getAttribute("aria-label") || active.textContent : null;

    var list = tasksForDay(currentDay);
    renderHeader(list);
    renderDayButtons();
    renderTasks(list);

    if (focusKey) {
      var btns = document.querySelectorAll("button");
      for (var i = 0; i < btns.length; i++) {
        if ((btns[i].getAttribute("aria-label") || btns[i].textContent) === focusKey) { btns[i].focus(); break; }
      }
    }
  }

  render();

  // ---- S4 Who do I ask? and S5 Topic guide ------------------------------
  // Views are switched by the URL hash: "" = Today, "#ask" = S4, "#topic/<answer_id>" = S5.
  // Works from disk (file://); nothing is sent anywhere.

  var EMPTY_TEXT = "Not here yet. Ask your buddy — this is a normal first-week question.";
  var views = {
    today: document.getElementById("view-today"),
    ask: document.getElementById("view-ask"),
    topic: document.getElementById("view-topic")
  };
  var filterBox = document.getElementById("ask-filter");

  function findAnswer(id) {
    for (var i = 0; i < answers.length; i++) if (answers[i].answer_id === id) return answers[i];
    return null;
  }

  function matches(a, q) {
    if (!q) return true;
    var hay = [a.topic, a.question || "", a.keywords || ""].join(" ").toLowerCase();
    return q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
  }

  function renderAskList() {
    var q = filterBox.value.trim();
    var box = document.getElementById("ask-list");
    box.textContent = "";
    var list = answers.filter(function (a) { return matches(a, q); });
    document.getElementById("ask-count").textContent =
      list.length ? list.length + (list.length === 1 ? " topic" : " topics") : EMPTY_TEXT;
    if (!list.length) {
      var c = el("div", "card");
      c.appendChild(el("p", "empty", EMPTY_TEXT));
      box.appendChild(c);
      return;
    }
    list.forEach(function (a) {
      var link = el("a", "card topic");
      link.href = "#topic/" + encodeURIComponent(a.answer_id);
      link.appendChild(el("h2", "", a.topic));
      var row = el("div", "contact");
      row.appendChild(el("span", "", "Contact: " + a.contact_role));
      var go = el("span", "go", "Answer →");
      go.setAttribute("aria-hidden", "true");
      row.appendChild(go);
      link.appendChild(row);
      box.appendChild(link);
    });
  }

  function renderTopic(a) {
    var card = document.getElementById("topic-card");
    card.textContent = "";
    var h = el("h1", "", a ? a.topic : "Not here yet");
    h.id = "topic-title";
    h.tabIndex = -1;
    card.appendChild(h);
    if (!a) {
      card.appendChild(el("p", "answer", EMPTY_TEXT));
      return;
    }
    var meta = el("div", "meta");
    if (a.status !== "confirmed" || !a.answer) {
      // Never show a guessed answer: label + contact role only.
      card.appendChild(el("span", "chip", "Needs checking"));
    } else {
      card.appendChild(el("p", "answer", a.answer));
      if (a.wiki_location) {
        var w = el("p");
        w.appendChild(el("strong", "", "Wiki: "));
        w.appendChild(document.createTextNode(a.wiki_location));
        meta.appendChild(w);
      }
    }
    var c = el("p");
    c.appendChild(el("strong", "", "Contact: "));
    c.appendChild(document.createTextNode(a.contact_role));
    meta.appendChild(c);
    card.appendChild(meta);
  }

  function show(name, focusEl) {
    for (var k in views) views[k].hidden = (k !== name);
    window.scrollTo(0, 0);
    if (focusEl) focusEl.focus();
  }

  function route() {
    var hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (hash === "ask") {
      renderAskList();
      show("ask", document.getElementById("ask-title"));
    } else if (hash.indexOf("topic/") === 0) {
      renderTopic(findAnswer(hash.slice(6)));
      show("topic", document.getElementById("topic-title"));
    } else {
      show("today", null);
    }
  }

  filterBox.addEventListener("input", renderAskList);
  window.addEventListener("hashchange", route);
  route();
})();
