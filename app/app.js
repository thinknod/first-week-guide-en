(function () {
  "use strict";

  var DONE_KEY = "fwg.done"; // { task_id: { done: true, done_at: "YYYY-MM-DD HH:MM" } }
  var START_KEY = "fwg.start_date"; // "YYYY-MM-DD", set on S1
  var REPEAT_TAP_MS = 800; // a second tap this soon after the first is ignored (double-tap / "did it work?")
  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var tasks = window.CONTENT.tasks;
  var answers = window.CONTENT.answers;
  var lastTap = {}; // task_id -> time of the last toggle

  function loadStart() {
    try { return localStorage.getItem(START_KEY) || ""; } catch (e) { return ""; }
  }
  function saveStart(v) {
    try { localStorage.setItem(START_KEY, v); } catch (e) { /* not saved */ }
  }
  var startDate = loadStart();

  function parseDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }
  function isoDate(d) {
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }
  function todayDate() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }

  // Which day is "today": count working days (Mon–Fri) from the start date; Day 1 = start date.
  // Returns { day: 1..5, before: bool, after: bool }.
  function dayInfo() {
    var start = parseDate(startDate), today = todayDate();
    if (!start || today < start) return { day: 1, before: !!start, after: false };
    var count = 0;
    for (var d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      var w = d.getDay();
      if (w !== 0 && w !== 6) count++;
    }
    if (count > 5) return { day: 5, before: false, after: true };
    return { day: Math.max(1, count), before: false, after: false };
  }
  var currentDay = dayInfo().day;

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
    var now = Date.now();
    if (lastTap[id] && now - lastTap[id] < REPEAT_TAP_MS) return;
    lastTap[id] = now;
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
    var today = dayInfo().day;
    for (var d = 1; d <= 5; d++) {
      var b = el("button", "", "Day " + d);
      b.type = "button";
      b.setAttribute("aria-pressed", d === currentDay ? "true" : "false");
      if (d === today && startDate) b.setAttribute("aria-current", "date");
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
      var label = el("div", "label", "Task " + (i + 1));
      if (done) label.appendChild(el("span", "undo", " · Done ✓ · tap to undo"));
      text.appendChild(label);
      text.appendChild(el("h2", "", t.title));
      top.appendChild(text);

      var btn = el("button", "check");
      btn.type = "button";
      btn.setAttribute("aria-pressed", done ? "true" : "false");
      btn.setAttribute("aria-label", "Mark '" + t.title + "' done");      var mark = el("span", "", "✓");
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
    var info = dayInfo();
    var head = "Day " + currentDay + " of 5";
    if (info.before) {
      var s = parseDate(startDate);
      head += " · Starts on " + DAY_NAMES[s.getDay()].slice(0, 3) + ", " + MONTHS[s.getMonth()] + " " + s.getDate();
    } else if (info.after) {
      head += " · Your first week is done";
    } else if (currentDay === info.day) {
      head += " · " + DAY_NAMES[todayDate().getDay()];
    }
    document.getElementById("day-header").textContent = head;
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
    topic: document.getElementById("view-topic"),
    start: document.getElementById("view-start")
  };
  var startInput = document.getElementById("start-date");
  var filterBox = document.getElementById("ask-filter");

  function findAnswer(id) {
    for (var i = 0; i < answers.length; i++) if (answers[i].answer_id === id) return answers[i];
    return null;
  }

  // Cut a common English ending so "printing" / "printers" find "printer". Keeps at least 3 letters.
  function stem(w) {
    var ends = ["ing", "ers", "er", "ed", "es", "s"];
    for (var i = 0; i < ends.length; i++) {
      var e = ends[i];
      if (w.length - e.length >= 3 && w.slice(-e.length) === e) return w.slice(0, -e.length);
    }
    return w;
  }

  function matches(a, q) {
    if (!q) return true;
    var hay = [a.topic, a.question || "", a.keywords || ""].join(" ").toLowerCase();
    return q.toLowerCase().split(/\s+/).every(function (w) {
      return hay.indexOf(w) !== -1 || hay.indexOf(stem(w)) !== -1;
    });
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
    if (!startDate || hash === "start") {
      // S1: first visit (no start date in this browser yet) or "Change start date".
      startInput.value = startDate || isoDate(todayDate());
      show("start", document.getElementById("start-title"));
    } else if (hash === "ask") {
      renderAskList();
      show("ask", document.getElementById("ask-title"));
    } else if (hash.indexOf("topic/") === 0) {
      renderTopic(findAnswer(hash.slice(6)));
      show("topic", document.getElementById("topic-title"));
    } else {
      show("today", null);
    }
  }

  document.getElementById("start-form").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!parseDate(startInput.value)) return;
    startDate = startInput.value;
    saveStart(startDate);
    currentDay = dayInfo().day;
    render();
    if (location.hash) location.hash = ""; // hashchange → route()
    else route();
  });

  filterBox.addEventListener("input", renderAskList);
  window.addEventListener("hashchange", route);
  route();
})();
