let tempPeoplesGrown = 2, tempPeoplesChild = 0, tempPeoplesBaby = 0, tempPeoplesNum = 2,
  score = decodeURIComponent(location.search.substr(1)).split("search="), peoplesBaby = null, peoplesChild = null,
  peoplesGrown = null, cities = [];
var city1 = null, city2 = null, day1 = null, month1 = null, year1 = null, day2 = null, month2 = null, year2 = null;
if (score.length > 1) {
  score.splice(0, 1);
  let e = score[0];
  peoplesBaby = String(e).substr(-1, 1), peoplesChild = String(e).substr(-2, 1), peoplesGrown = String(e).substr(-3, 1), e = e.substring(0, e.length - 3), city1 = e.substr(0, 3), city2 = e.substr(9, 3), cities.push(city1), cities.push(city2), day1 = e.substr(3, 2), month1 = parseInt(e.substr(5, 2)) - 1, year1 = e.substr(7, 2), e.length > 12 && (day2 = e.substr(12, 2), month2 = parseInt(e.substr(14, 2)) - 1, year2 = e.substr(16, 2))
}
let searchInputs = document.querySelectorAll("#autocomplete");

function ciSearch(e = "", t = "") {
}

searchInputs.forEach(async (e, t) => {
  if (t < 1 ? e.addEventListener("input", () => {
    let e = document.querySelectorAll(".tip")[0], t = document.querySelectorAll(".tip")[1];
    e.classList.remove("_active"), t.classList.remove("_active")
  }) : e.addEventListener("input", () => {
    let e = document.querySelectorAll(".tip")[2], t = document.querySelectorAll(".tip")[3];
    e.classList.remove("_active"), t.classList.remove("_active")
  }), cities.length) {
    let i = await fetch(`http://autocomplete.travelpayouts.com/places2?term=${cities[t]}&locale=ru&types[]=city`),
      s = await i.json();
    e.value = String(await s[0].name), e.dataset.value = `${s[0].name}, ${s[0].country_name}\n${s[0].code}`
  }
  e.classList.add("autocomplete-input");
  let i = document.createElement("div");
  i.className = "autocomplete-wrap", e.parentNode.insertBefore(i, e), i.appendChild(e);
  let s = document.createElement("div");
  s.className = "autocomplete-list", i.appendChild(s);
  let a = document.createElement("div");
  a.className = "antother-city tip", a.innerHTML = "Укажите разные города", i.appendChild(a), a = document.createElement("div"), a.className = "empty-city tip", a.innerHTML = "Укажите город прибытия", i.appendChild(a);
  let r = [], n = [], o = -1;

  function l(e = !0) {
    e ? i.classList.add("active") : i.classList.remove("active")
  }

  function d(e) {
    return !!n.length && (e > n.length - 1 ? d(0) : e < 0 ? d(n.length - 1) : (o = e, n.forEach(e => {
      e.classList.remove("focused")
    }), void n[o].classList.add("focused")))
  }

  function h(t) {
    if (!n[t]) return !1;
    e.dataset.value = n[t].innerText, e.value = n[t].innerText.split(",")[0], l(!1)
  }

  e.addEventListener("input", async t => {
    if ((t = e.value.trim()).length > 0) {
      let i = [];
      const a = await fetch(`http://autocomplete.travelpayouts.com/places2?term=${t}&locale=ru&types[]=city`);
      (await a.json()).forEach(e => {
        i.push(`<div class="item-names"><strong>${e.name},</strong> ${e.country_name}</div> <span class="text-primary">${e.code}</span>`)
      });
      let o = e.value;
      if (!o) return l(!1);
      s.innerHTML = "", n = [], i.forEach((e, t) => {
        if (ciSearch(o, e) || t > 7) return !1;
        r.push(t);
        let i = document.createElement("div");
        i.className = "autocomplete-item", i.innerHTML = e, s.appendChild(i), n.push(i), i.addEventListener("click", (function () {
          h(n.indexOf(i))
        }))
      }), n.length > 0 ? l(!0) : l(!1)
    }
  }), e.addEventListener("keydown", e => {
    let t = e.keyCode;
    40 === t ? (e.preventDefault(), o++, d(o)) : 38 === t ? (e.preventDefault(), o > 0 && o--, d(o)) : 27 === t ? l(!1) : 13 === t && h(o)
  }), document.body.addEventListener("click", (function (e) {
    i.contains(e.target) || l(!1)
  }))
});
let menuSelectNum = document.querySelector(".menu__select-num"), babyFull = !1;
const menuSelect = document.querySelector(".menu__select"), peoplesFilter = document.querySelector(".peoples-filter"),
  tip = document.querySelector(".peoples-filter__baby-plus-tip"),
  grownMinus = document.querySelector(".peoples-filter__grown-minus"),
  childMinus = document.querySelector(".peoples-filter__child-minus"),
  babyMinus = document.querySelector(".peoples-filter__baby-minus"), minuses = document.querySelectorAll("._minus"),
  grownPlus = document.querySelector(".peoples-filter__grown-plus"),
  childPlus = document.querySelector(".peoples-filter__child-plus"),
  babyPlus = document.querySelector(".peoples-filter__baby-plus"), pluses = document.querySelectorAll("._plus"),
  grownNum = document.querySelector(".peoples-filter__grown-num"),
  childNum = document.querySelector(".peoples-filter__child-num"),
  babyNum = document.querySelector(".peoples-filter__baby-num");

function updateForms(e = null, t = null, i = null) {
  const s = +e || +grownNum.innerHTML, a = +t || +babyNum.innerHTML, r = +i || +childNum.innerHTML;
  grownNum.innerHTML = s, childNum.innerHTML = r, babyNum.innerHTML = a, 1 == s || s == a ? grownMinus.classList.remove("_active") : grownMinus.classList.add("_active"), 0 == r ? childMinus.classList.remove("_active") : childMinus.classList.add("_active"), 0 == a ? babyMinus.classList.remove("_active") : babyMinus.classList.add("_active"), s + a + r > 8 ? (grownPlus.classList.remove("_active"), childPlus.classList.remove("_active"), babyPlus.classList.remove("_active"), babyFull = !1) : (grownPlus.classList.add("_active"), childPlus.classList.add("_active"), a == s ? (babyPlus.classList.remove("_active"), babyFull = !0) : (babyPlus.classList.add("_active"), babyFull = !1));
  let n = s + a + r;
  menuSelectNum.innerHTML = n < 2 ? n + " пассажир" : n > 1 && n < 5 ? n + " пассажира" : n + " пассажиров"
}

updateForms(peoplesGrown, peoplesBaby, peoplesChild),
//! Обработчики событий
  menuSelect.addEventListener("click", e => {
    peoplesFilter.classList.add("_active"), menuSelect.classList.add("_active")
  }), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || menuSelect.addEventListener("focus", () => {
  peoplesFilter.classList.add("_active"), menuSelect.classList.add("_active")
}), document.addEventListener("click", e => {
  const t = e.target;
  menuSelect.contains(t) || (peoplesFilter.classList.remove("_active"), menuSelect.classList.remove("_active"))
}), minuses.forEach(e => {
  e.addEventListener("click", () => {
    e.classList.contains("_active") && (e.nextElementSibling.innerHTML = +e.nextElementSibling.innerHTML - 1, updateForms())
  })
}), pluses.forEach(e => {
  e.addEventListener("click", () => {
    e.classList.contains("_active") && (e.previousElementSibling.innerHTML = +e.previousElementSibling.innerHTML + 1, updateForms())
  })
}), babyPlus.addEventListener("mousemove", () => {
  babyFull && tip.classList.add("_active")
}), babyPlus.addEventListener("mouseout", () => {
  tip.classList.remove("_active")
});
const selected_date_element = document.querySelector("._calendar"),
  selected_date_element2 = document.querySelector("._calendar2"), dates_element = document.querySelector(" .dates"),
  dates_element2 = document.querySelector(" .dates2"), mth_element = document.querySelector(" .dates .month .mth"),
  mth_element2 = document.querySelector(" .dates2 .month .mth"), next_mth_element = document.querySelector(".next-mth"),
  prev_mth_element = document.querySelector(".prev-mth");
let days_element = document.querySelector(" .dates .days"), days_element2 = document.querySelector(" .dates2 .days"),
  calendars = document.querySelector(".calendars"), calendars_down = document.querySelector(".calendars__down"),
  calendars_top = document.querySelector(".calendars__top"), arrow1 = document.querySelector(".prev-mth"),
  arrow2 = document.querySelector(".next-mth"), back_btn = document.querySelector(".calendars__back-btn"),
  back_close = document.querySelector(".calendars__close"),
  months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
  date = new Date;
date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
let day = date.getDate(), month = date.getMonth(), year = date.getFullYear(),
  selectedDate = day1 ? new Date(+year1 + 2e3, month1, day1) : date, selectedDay = day1 || day,
  selectedMonth = month1 || month, selectedYear = year1 || year,
  selectedDate2 = day2 ? new Date(+year2 + 2e3, month2, day2) : null, selectedDay2 = day2 || null,
  selectedMonth2 = month2 || null, selectedYear2 = year2 || null, isFirstClick = !0, isFirstInput = !0;

function toggleDatePicker(e) {
  checkEventPathForClass(e.path, "dates") || checkEventPathForClass(e.path, "dates2") || (calendars.classList.add("active"), isFirstClick = !0, isFirstInput = !0)
}

function removeDatePicker(e) {
  checkEventPathForClass(e.path, "dates") || checkEventPathForClass(e.path, "dates2") || (calendars.classList.remove("active"), isFirstClick = !0, isFirstInput = !0, selected_date_element.value = formatDate(selectedDate), populateDates())
}

function clickSecondInput(e) {
  toggleDatePicker(e), isFirstClick = !isFirstClick, isFirstInput = !isFirstInput
}

function goToNextMonth(e = !0) {
  let t = month + 2, i = year;
  if (t > 11 && (t = 0 - (12 - t), i++), new Date(i - 1, t, day) > date) return !1;
  month = t, year = i, e && (mth_element.textContent = months[month] + " " + year, NextMonth(), mth_element2.textContent = months[month] + " " + year, PrevMonth(), populateDates())
}

function goToPrevMonth(e = !0) {
  let t = month - 2, i = year;
  if (t < 0 && (t = 12 + t, i--), new Date(i, t, day) < date) return !1;
  month = t, year = i, e && (mth_element.textContent = months[month] + " " + year, NextMonth(), mth_element2.textContent = months[month] + " " + year, PrevMonth(), populateDates())
}

function NextMonth() {
  month++, month > 11 && (month = 0, year++)
}

function PrevMonth() {
  month--, month < 0 && (month = 11, year--)
}

function populateDates(e) {
  for (let e = 0; e < 2; e++) {
    1 == e && (replaceDays(), NextMonth()), days_element.innerHTML = "";
    let t = 31;
    1 == month && (t = 28);
    let i = new Date(year, month, 1).getDay() - 1;
    for (let e = 0; e < i; e++) {
      const e = document.createElement("div");
      e.classList.add("grayed"), days_element.appendChild(e)
    }
    for (let e = i; e < i; e++) {
      const e = document.createElement("div");
      e.classList.add("grayed"), days_element.appendChild(e)
    }
    for (let i = 0; i < t; i++) {
      if (grayedDay(i + 1)) {
        const e = document.createElement("div");
        e.textContent = i + 1, e.classList.add("grayed-day"), days_element.appendChild(e);
        continue
      }
      const t = document.createElement("div");
      t.classList.add("day"), t.textContent = i + 1;
      let s = new Date(year, month, i + 1);
      selectedDate2 >= s && s >= selectedDate && t.classList.add("selecteds"), selectedDay == i + 1 && selectedYear == year && selectedMonth == month && t.classList.add("selected"), selectedDay2 == i + 1 && selectedYear2 == year && selectedMonth2 == month && t.classList.add("selected"), 0 == e ? t.addEventListener("click", (function (e) {
        isFirstClick ? (selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1)), selectedDay = i + 1, selectedMonth = month, selectedYear = year, isFirstInput && (isFirstClick = !1)) : (selectedDate2 = new Date(year + "-" + (month + 1) + "-" + (i + 1)), selectedDay2 = i + 1, selectedMonth2 = month, selectedYear2 = year, selectedDate2 < selectedDate && (selectedDate2 = [selectedDate, selectedDate = selectedDate2][0], selectedDay2 = [selectedDay, selectedDay = selectedDay2][0], selectedMonth2 = [selectedMonth, selectedMonth = selectedMonth2][0], selectedYear2 = [selectedYear, selectedYear = selectedYear2][0]), selected_date_element.value = formatDate(selectedDate), selected_date_element2.value = formatDate(selectedDate2), paintDays(), isFirstInput && (isFirstClick = !0), calendars.classList.remove("active")), populateDates()
      })) : t.addEventListener("click", (function (e) {
        NextMonth(), isFirstClick ? (selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1)), selectedDay = i + 1, selectedMonth = month, selectedYear = year, isFirstInput && (isFirstClick = !1)) : (selectedDate2 = new Date(year + "-" + (month + 1) + "-" + (i + 1)), selectedDay2 = i + 1, selectedMonth2 = month, selectedYear2 = year, selectedDate2 < selectedDate && (selectedDate2 = [selectedDate, selectedDate = selectedDate2][0], selectedDay2 = [selectedDay, selectedDay = selectedDay2][0], selectedMonth2 = [selectedMonth, selectedMonth = selectedMonth2][0], selectedYear2 = [selectedYear, selectedYear = selectedYear2][0]), selected_date_element.value = formatDate(selectedDate), selected_date_element2.value = formatDate(selectedDate2), isFirstInput && (isFirstClick = !0, calendars.classList.remove("active")), calendars.classList.remove("active")), PrevMonth(), populateDates()
      })), days_element.appendChild(t)
    }
    1 == e && (replaceDays(), PrevMonth())
  }
}

function grayedDay(e) {
  let t = new Date(year, month, e), i = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
  return t < date || t > i
}

function paintDays() {
}

function checkEventPathForClass(e, t) {
  for (let i = 0; i < e.length; i++) if (e[i].classList && e[i].classList.contains(t)) return !0;
  return !1
}

function formatDate(e) {
  let t = e.getDate();
  t < 10 && (t = "0" + t);
  let i = e.getMonth() + 1;
  return i < 10 && (i = "0" + i), t + "." + i + "." + e.getFullYear()
}

function replaceDays() {
  let e = days_element;
  days_element = days_element2, days_element2 = e
}

mth_element.textContent = months[month] + " " + year, NextMonth(), mth_element2.textContent = months[month] + " " + year, PrevMonth(), selected_date_element.value = formatDate(selectedDate), selected_date_element.dataset.value = formatDate(selectedDate), isNaN(Date.parse(selectedDate2)) || (selected_date_element2.value = formatDate(selectedDate2), selected_date_element2.dataset.value = formatDate(selectedDate2)), populateDates(), selected_date_element.addEventListener("click", toggleDatePicker), selected_date_element2.addEventListener("click", clickSecondInput), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (selected_date_element.addEventListener("focus", toggleDatePicker), selected_date_element2.addEventListener("focus", clickSecondInput)), next_mth_element.addEventListener("click", goToNextMonth), prev_mth_element.addEventListener("click", goToPrevMonth), back_btn.addEventListener("click", (function (e) {
  isFirstClick = !0, isFirstInput = !0, selectedDate2 = null, selectedDay2 = null, selectedMonth2 = null, selectedYear2 = null, populateDates(), selected_date_element2.dataset.value = "Не нужно", selected_date_element2.value = "Не нужно"
})), back_close.addEventListener("click", (function (e) {
  isFirstClick = !0, isFirstInput = !0, selected_date_element.value = formatDate(selectedDate), populateDates()
})), document.addEventListener("click", e => {
  const t = e.target;
  t !== calendars && t !== arrow1 && t !== arrow2 && (t !== selected_date_element2 && t !== selected_date_element && t !== calendars_down && t !== calendars_top && removeDatePicker(e))
}), function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, (function () {
  "use strict";
  var e = "undefined" == typeof document ? {
    body: {}, addEventListener: function () {
    }, removeEventListener: function () {
    }, activeElement: {
      blur: function () {
      }, nodeName: ""
    }, querySelector: function () {
      return null
    }, querySelectorAll: function () {
      return []
    }, getElementById: function () {
      return null
    }, createEvent: function () {
      return {
        initEvent: function () {
        }
      }
    }, createElement: function () {
      return {
        children: [], childNodes: [], style: {}, setAttribute: function () {
        }, getElementsByTagName: function () {
          return []
        }
      }
    }, location: {hash: ""}
  } : document, t = "undefined" == typeof window ? {
    document: e,
    navigator: {userAgent: ""},
    location: {},
    history: {},
    CustomEvent: function () {
      return this
    },
    addEventListener: function () {
    },
    removeEventListener: function () {
    },
    getComputedStyle: function () {
      return {
        getPropertyValue: function () {
          return ""
        }
      }
    },
    Image: function () {
    },
    Date: function () {
    },
    screen: {},
    setTimeout: function () {
    },
    clearTimeout: function () {
    }
  } : window, i = function (e) {
    for (var t = 0; t < e.length; t += 1) this[t] = e[t];
    return this.length = e.length, this
  };

  function s(s, a) {
    var r = [], n = 0;
    if (s && !a && s instanceof i) return s;
    if (s) if ("string" == typeof s) {
      var o, l, d = s.trim();
      if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
        var h = "div";
        for (0 === d.indexOf("<li") && (h = "ul"), 0 === d.indexOf("<tr") && (h = "tbody"), 0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (h = "tr"), 0 === d.indexOf("<tbody") && (h = "table"), 0 === d.indexOf("<option") && (h = "select"), (l = e.createElement(h)).innerHTML = d, n = 0; n < l.childNodes.length; n += 1) r.push(l.childNodes[n])
      } else for (o = a || "#" !== s[0] || s.match(/[ .<>:~]/) ? (a || e).querySelectorAll(s.trim()) : [e.getElementById(s.trim().split("#")[1])], n = 0; n < o.length; n += 1) o[n] && r.push(o[n])
    } else if (s.nodeType || s === t || s === e) r.push(s); else if (s.length > 0 && s[0].nodeType) for (n = 0; n < s.length; n += 1) r.push(s[n]);
    return new i(r)
  }

  function a(e) {
    for (var t = [], i = 0; i < e.length; i += 1) -1 === t.indexOf(e[i]) && t.push(e[i]);
    return t
  }

  s.fn = i.prototype, s.Class = i, s.Dom7 = i;
  var r = {
    addClass: function (e) {
      if (void 0 === e) return this;
      for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]);
      return this
    }, removeClass: function (e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]);
      return this
    }, hasClass: function (e) {
      return !!this[0] && this[0].classList.contains(e)
    }, toggleClass: function (e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
      return this
    }, attr: function (e, t) {
      var i = arguments;
      if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
      for (var s = 0; s < this.length; s += 1) if (2 === i.length) this[s].setAttribute(e, t); else for (var a in e) this[s][a] = e[a], this[s].setAttribute(a, e[a]);
      return this
    }, removeAttr: function (e) {
      for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this
    }, data: function (e, t) {
      var i;
      if (void 0 !== t) {
        for (var s = 0; s < this.length; s += 1) (i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
        return this
      }
      if (i = this[0]) return i.dom7ElementDataStorage && e in i.dom7ElementDataStorage ? i.dom7ElementDataStorage[e] : i.getAttribute("data-" + e) || void 0
    }, transform: function (e) {
      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        i.webkitTransform = e, i.transform = e
      }
      return this
    }, transition: function (e) {
      "string" != typeof e && (e += "ms");
      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        i.webkitTransitionDuration = e, i.transitionDuration = e
      }
      return this
    }, on: function () {
      for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
      var a = t[0], r = t[1], n = t[2], o = t[3];

      function l(e) {
        var t = e.target;
        if (t) {
          var i = e.target.dom7EventData || [];
          if (i.indexOf(e) < 0 && i.unshift(e), s(t).is(r)) n.apply(t, i); else for (var a = s(t).parents(), o = 0; o < a.length; o += 1) s(a[o]).is(r) && n.apply(a[o], i)
        }
      }

      function d(e) {
        var t = e && e.target && e.target.dom7EventData || [];
        t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t)
      }

      "function" == typeof t[1] && (a = (e = t)[0], n = e[1], o = e[2], r = void 0), o || (o = !1);
      for (var h, c = a.split(" "), p = 0; p < this.length; p += 1) {
        var u = this[p];
        if (r) for (h = 0; h < c.length; h += 1) {
          var m = c[h];
          u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[m] || (u.dom7LiveListeners[m] = []), u.dom7LiveListeners[m].push({
            listener: n,
            proxyListener: l
          }), u.addEventListener(m, l, o)
        } else for (h = 0; h < c.length; h += 1) {
          var f = c[h];
          u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[f] || (u.dom7Listeners[f] = []), u.dom7Listeners[f].push({
            listener: n,
            proxyListener: d
          }), u.addEventListener(f, d, o)
        }
      }
      return this
    }, off: function () {
      for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
      var s = t[0], a = t[1], r = t[2], n = t[3];
      "function" == typeof t[1] && (s = (e = t)[0], r = e[1], n = e[2], a = void 0), n || (n = !1);
      for (var o = s.split(" "), l = 0; l < o.length; l += 1) for (var d = o[l], h = 0; h < this.length; h += 1) {
        var c = this[h], p = void 0;
        if (!a && c.dom7Listeners ? p = c.dom7Listeners[d] : a && c.dom7LiveListeners && (p = c.dom7LiveListeners[d]), p && p.length) for (var u = p.length - 1; u >= 0; u -= 1) {
          var m = p[u];
          r && m.listener === r || r && m.listener && m.listener.dom7proxy && m.listener.dom7proxy === r ? (c.removeEventListener(d, m.proxyListener, n), p.splice(u, 1)) : r || (c.removeEventListener(d, m.proxyListener, n), p.splice(u, 1))
        }
      }
      return this
    }, trigger: function () {
      for (var i = [], s = arguments.length; s--;) i[s] = arguments[s];
      for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1) for (var o = a[n], l = 0; l < this.length; l += 1) {
        var d = this[l], h = void 0;
        try {
          h = new t.CustomEvent(o, {detail: r, bubbles: !0, cancelable: !0})
        } catch (t) {
          (h = e.createEvent("Event")).initEvent(o, !0, !0), h.detail = r
        }
        d.dom7EventData = i.filter((function (e, t) {
          return t > 0
        })), d.dispatchEvent(h), d.dom7EventData = [], delete d.dom7EventData
      }
      return this
    }, transitionEnd: function (e) {
      var t, i = ["webkitTransitionEnd", "transitionend"], s = this;

      function a(r) {
        if (r.target === this) for (e.call(this, r), t = 0; t < i.length; t += 1) s.off(i[t], a)
      }

      if (e) for (t = 0; t < i.length; t += 1) s.on(i[t], a);
      return this
    }, outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
        }
        return this[0].offsetWidth
      }
      return null
    }, outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
        }
        return this[0].offsetHeight
      }
      return null
    }, offset: function () {
      if (this.length > 0) {
        var i = this[0], s = i.getBoundingClientRect(), a = e.body, r = i.clientTop || a.clientTop || 0,
          n = i.clientLeft || a.clientLeft || 0, o = i === t ? t.scrollY : i.scrollTop,
          l = i === t ? t.scrollX : i.scrollLeft;
        return {top: s.top + o - r, left: s.left + l - n}
      }
      return null
    }, css: function (e, i) {
      var s;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (s = 0; s < this.length; s += 1) for (var a in e) this[s].style[a] = e[a];
          return this
        }
        if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e)
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (s = 0; s < this.length; s += 1) this[s].style[e] = i;
        return this
      }
      return this
    }, each: function (e) {
      if (!e) return this;
      for (var t = 0; t < this.length; t += 1) if (!1 === e.call(this[t], t, this[t])) return this;
      return this
    }, html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
      for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this
    }, text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this
    }, is: function (a) {
      var r, n, o = this[0];
      if (!o || void 0 === a) return !1;
      if ("string" == typeof a) {
        if (o.matches) return o.matches(a);
        if (o.webkitMatchesSelector) return o.webkitMatchesSelector(a);
        if (o.msMatchesSelector) return o.msMatchesSelector(a);
        for (r = s(a), n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
        return !1
      }
      if (a === e) return o === e;
      if (a === t) return o === t;
      if (a.nodeType || a instanceof i) {
        for (r = a.nodeType ? [a] : a, n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
        return !1
      }
      return !1
    }, index: function () {
      var e, t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
        return e
      }
    }, eq: function (e) {
      if (void 0 === e) return this;
      var t, s = this.length;
      return new i(e > s - 1 ? [] : e < 0 ? (t = s + e) < 0 ? [] : [this[t]] : [this[e]])
    }, append: function () {
      for (var t, s = [], a = arguments.length; a--;) s[a] = arguments[a];
      for (var r = 0; r < s.length; r += 1) {
        t = s[r];
        for (var n = 0; n < this.length; n += 1) if ("string" == typeof t) {
          var o = e.createElement("div");
          for (o.innerHTML = t; o.firstChild;) this[n].appendChild(o.firstChild)
        } else if (t instanceof i) for (var l = 0; l < t.length; l += 1) this[n].appendChild(t[l]); else this[n].appendChild(t)
      }
      return this
    }, prepend: function (t) {
      var s, a;
      for (s = 0; s < this.length; s += 1) if ("string" == typeof t) {
        var r = e.createElement("div");
        for (r.innerHTML = t, a = r.childNodes.length - 1; a >= 0; a -= 1) this[s].insertBefore(r.childNodes[a], this[s].childNodes[0])
      } else if (t instanceof i) for (a = 0; a < t.length; a += 1) this[s].insertBefore(t[a], this[s].childNodes[0]); else this[s].insertBefore(t, this[s].childNodes[0]);
      return this
    }, next: function (e) {
      return this.length > 0 ? e ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e) ? new i([this[0].nextElementSibling]) : new i([]) : this[0].nextElementSibling ? new i([this[0].nextElementSibling]) : new i([]) : new i([])
    }, nextAll: function (e) {
      var t = [], a = this[0];
      if (!a) return new i([]);
      for (; a.nextElementSibling;) {
        var r = a.nextElementSibling;
        e ? s(r).is(e) && t.push(r) : t.push(r), a = r
      }
      return new i(t)
    }, prev: function (e) {
      if (this.length > 0) {
        var t = this[0];
        return e ? t.previousElementSibling && s(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([]) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([])
      }
      return new i([])
    }, prevAll: function (e) {
      var t = [], a = this[0];
      if (!a) return new i([]);
      for (; a.previousElementSibling;) {
        var r = a.previousElementSibling;
        e ? s(r).is(e) && t.push(r) : t.push(r), a = r
      }
      return new i(t)
    }, parent: function (e) {
      for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
      return s(a(t))
    }, parents: function (e) {
      for (var t = [], i = 0; i < this.length; i += 1) for (var r = this[i].parentNode; r;) e ? s(r).is(e) && t.push(r) : t.push(r), r = r.parentNode;
      return s(a(t))
    }, closest: function (e) {
      var t = this;
      return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
    }, find: function (e) {
      for (var t = [], s = 0; s < this.length; s += 1) for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1) t.push(a[r]);
      return new i(t)
    }, children: function (e) {
      for (var t = [], r = 0; r < this.length; r += 1) for (var n = this[r].childNodes, o = 0; o < n.length; o += 1) e ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o]) : 1 === n[o].nodeType && t.push(n[o]);
      return new i(a(t))
    }, filter: function (e) {
      for (var t = [], s = 0; s < this.length; s += 1) e.call(this[s], s, this[s]) && t.push(this[s]);
      return new i(t)
    }, remove: function () {
      for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this
    }, add: function () {
      for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
      var i, a;
      for (i = 0; i < e.length; i += 1) {
        var r = s(e[i]);
        for (a = 0; a < r.length; a += 1) this[this.length] = r[a], this.length += 1
      }
      return this
    }, styles: function () {
      return this[0] ? t.getComputedStyle(this[0], null) : {}
    }
  };
  Object.keys(r).forEach((function (e) {
    s.fn[e] = s.fn[e] || r[e]
  }));
  var n = {
    deleteProps: function (e) {
      var t = e;
      Object.keys(t).forEach((function (e) {
        try {
          t[e] = null
        } catch (e) {
        }
        try {
          delete t[e]
        } catch (e) {
        }
      }))
    }, nextTick: function (e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t)
    }, now: function () {
      return Date.now()
    }, getTranslate: function (e, i) {
      var s, a, r;
      void 0 === i && (i = "x");
      var n = t.getComputedStyle(e, null);
      return t.WebKitCSSMatrix ? ((a = n.transform || n.webkitTransform).split(",").length > 6 && (a = a.split(", ").map((function (e) {
        return e.replace(",", ".")
      })).join(", ")), r = new t.WebKitCSSMatrix("none" === a ? "" : a)) : s = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === i && (a = t.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])), "y" === i && (a = t.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])), a || 0
    }, parseUrlQuery: function (e) {
      var i, s, a, r, n = {}, o = e || t.location.href;
      if ("string" == typeof o && o.length) for (r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter((function (e) {
        return "" !== e
      }))).length, i = 0; i < r; i += 1) a = s[i].replace(/#\S+/g, "").split("="), n[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "";
      return n
    }, isObject: function (e) {
      return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
    }, extend: function () {
      for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
      for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
        var a = e[s];
        if (null != a) for (var r = Object.keys(Object(a)), o = 0, l = r.length; o < l; o += 1) {
          var d = r[o], h = Object.getOwnPropertyDescriptor(a, d);
          void 0 !== h && h.enumerable && (n.isObject(i[d]) && n.isObject(a[d]) ? n.extend(i[d], a[d]) : !n.isObject(i[d]) && n.isObject(a[d]) ? (i[d] = {}, n.extend(i[d], a[d])) : i[d] = a[d])
        }
      }
      return i
    }
  }, o = {
    touch: t.Modernizr && !0 === t.Modernizr.touch || !!(t.navigator.maxTouchPoints > 0 || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch),
    pointerEvents: !!t.PointerEvent && "maxTouchPoints" in t.navigator && t.navigator.maxTouchPoints > 0,
    observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
    passiveListener: function () {
      var e = !1;
      try {
        var i = Object.defineProperty({}, "passive", {
          get: function () {
            e = !0
          }
        });
        t.addEventListener("testPassiveListener", null, i)
      } catch (e) {
      }
      return e
    }(),
    gestures: "ongesturestart" in t
  }, l = function (e) {
    void 0 === e && (e = {});
    var t = this;
    t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach((function (e) {
      t.on(e, t.params.on[e])
    }))
  }, d = {components: {configurable: !0}};
  l.prototype.on = function (e, t, i) {
    var s = this;
    if ("function" != typeof t) return s;
    var a = i ? "unshift" : "push";
    return e.split(" ").forEach((function (e) {
      s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][a](t)
    })), s
  }, l.prototype.once = function (e, t, i) {
    var s = this;
    if ("function" != typeof t) return s;

    function a() {
      for (var i = [], r = arguments.length; r--;) i[r] = arguments[r];
      s.off(e, a), a.f7proxy && delete a.f7proxy, t.apply(s, i)
    }

    return a.f7proxy = t, s.on(e, a, i)
  }, l.prototype.off = function (e, t) {
    var i = this;
    return i.eventsListeners ? (e.split(" ").forEach((function (e) {
      void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach((function (s, a) {
        (s === t || s.f7proxy && s.f7proxy === t) && i.eventsListeners[e].splice(a, 1)
      }))
    })), i) : i
  }, l.prototype.emit = function () {
    for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
    var i, s, a, r = this;
    if (!r.eventsListeners) return r;
    "string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], s = e.slice(1, e.length), a = r) : (i = e[0].events, s = e[0].data, a = e[0].context || r);
    var n = Array.isArray(i) ? i : i.split(" ");
    return n.forEach((function (e) {
      if (r.eventsListeners && r.eventsListeners[e]) {
        var t = [];
        r.eventsListeners[e].forEach((function (e) {
          t.push(e)
        })), t.forEach((function (e) {
          e.apply(a, s)
        }))
      }
    })), r
  }, l.prototype.useModulesParams = function (e) {
    var t = this;
    t.modules && Object.keys(t.modules).forEach((function (i) {
      var s = t.modules[i];
      s.params && n.extend(e, s.params)
    }))
  }, l.prototype.useModules = function (e) {
    void 0 === e && (e = {});
    var t = this;
    t.modules && Object.keys(t.modules).forEach((function (i) {
      var s = t.modules[i], a = e[i] || {};
      s.instance && Object.keys(s.instance).forEach((function (e) {
        var i = s.instance[e];
        t[e] = "function" == typeof i ? i.bind(t) : i
      })), s.on && t.on && Object.keys(s.on).forEach((function (e) {
        t.on(e, s.on[e])
      })), s.create && s.create.bind(t)(a)
    }))
  }, d.components.set = function (e) {
    this.use && this.use(e)
  }, l.installModule = function (e) {
    for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
    var s = this;
    s.prototype.modules || (s.prototype.modules = {});
    var a = e.name || Object.keys(s.prototype.modules).length + "_" + n.now();
    return s.prototype.modules[a] = e, e.proto && Object.keys(e.proto).forEach((function (t) {
      s.prototype[t] = e.proto[t]
    })), e.static && Object.keys(e.static).forEach((function (t) {
      s[t] = e.static[t]
    })), e.install && e.install.apply(s, t), s
  }, l.use = function (e) {
    for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
    var s = this;
    return Array.isArray(e) ? (e.forEach((function (e) {
      return s.installModule(e)
    })), s) : s.installModule.apply(s, [e].concat(t))
  }, Object.defineProperties(l, d);
  var h, c, p, u, m, f, v, g, b, y, w, x, S, E, C, T = {
    updateSize: function () {
      var e, t, i = this.$el;
      e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), n.extend(this, {
        width: e,
        height: t,
        size: this.isHorizontal() ? e : t
      }))
    }, updateSlides: function () {
      var e = this.params, i = this.$wrapperEl, s = this.size, a = this.rtlTranslate, r = this.wrongRTL,
        o = this.virtual && e.virtual.enabled, l = o ? this.virtual.slides.length : this.slides.length,
        d = i.children("." + this.params.slideClass), h = o ? this.virtual.slides.length : d.length, c = [], p = [],
        u = [];

      function m(t) {
        return !e.cssMode || t !== d.length - 1
      }

      var f = e.slidesOffsetBefore;
      "function" == typeof f && (f = e.slidesOffsetBefore.call(this));
      var v = e.slidesOffsetAfter;
      "function" == typeof v && (v = e.slidesOffsetAfter.call(this));
      var g = this.snapGrid.length, b = this.snapGrid.length, y = e.spaceBetween, w = -f, x = 0, S = 0;
      if (void 0 !== s) {
        var E, C;
        "string" == typeof y && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * s), this.virtualSize = -y, a ? d.css({
          marginLeft: "",
          marginTop: ""
        }) : d.css({
          marginRight: "",
          marginBottom: ""
        }), e.slidesPerColumn > 1 && (E = Math.floor(h / e.slidesPerColumn) === h / this.params.slidesPerColumn ? h : Math.ceil(h / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (E = Math.max(E, e.slidesPerView * e.slidesPerColumn)));
        for (var T, M = e.slidesPerColumn, P = E / M, k = Math.floor(h / e.slidesPerColumn), L = 0; L < h; L += 1) {
          C = 0;
          var D = d.eq(L);
          if (e.slidesPerColumn > 1) {
            var z = void 0, $ = void 0, I = void 0;
            if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
              var O = Math.floor(L / (e.slidesPerGroup * e.slidesPerColumn)),
                N = L - e.slidesPerColumn * e.slidesPerGroup * O,
                A = 0 === O ? e.slidesPerGroup : Math.min(Math.ceil((h - O * M * e.slidesPerGroup) / M), e.slidesPerGroup);
              z = ($ = N - (I = Math.floor(N / A)) * A + O * e.slidesPerGroup) + I * E / M, D.css({
                "-webkit-box-ordinal-group": z,
                "-moz-box-ordinal-group": z,
                "-ms-flex-order": z,
                "-webkit-order": z,
                order: z
              })
            } else "column" === e.slidesPerColumnFill ? (I = L - ($ = Math.floor(L / M)) * M, ($ > k || $ === k && I === M - 1) && (I += 1) >= M && (I = 0, $ += 1)) : $ = L - (I = Math.floor(L / P)) * P;
            D.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== I && e.spaceBetween && e.spaceBetween + "px")
          }
          if ("none" !== D.css("display")) {
            if ("auto" === e.slidesPerView) {
              var _ = t.getComputedStyle(D[0], null), H = D[0].style.transform, F = D[0].style.webkitTransform;
              if (H && (D[0].style.transform = "none"), F && (D[0].style.webkitTransform = "none"), e.roundLengths) C = this.isHorizontal() ? D.outerWidth(!0) : D.outerHeight(!0); else if (this.isHorizontal()) {
                var V = parseFloat(_.getPropertyValue("width")), B = parseFloat(_.getPropertyValue("padding-left")),
                  G = parseFloat(_.getPropertyValue("padding-right")),
                  Y = parseFloat(_.getPropertyValue("margin-left")), q = parseFloat(_.getPropertyValue("margin-right")),
                  X = _.getPropertyValue("box-sizing");
                C = X && "border-box" === X ? V + Y + q : V + B + G + Y + q
              } else {
                var R = parseFloat(_.getPropertyValue("height")), W = parseFloat(_.getPropertyValue("padding-top")),
                  j = parseFloat(_.getPropertyValue("padding-bottom")),
                  U = parseFloat(_.getPropertyValue("margin-top")), K = parseFloat(_.getPropertyValue("margin-bottom")),
                  Z = _.getPropertyValue("box-sizing");
                C = Z && "border-box" === Z ? R + U + K : R + W + j + U + K
              }
              H && (D[0].style.transform = H), F && (D[0].style.webkitTransform = F), e.roundLengths && (C = Math.floor(C))
            } else C = (s - (e.slidesPerView - 1) * y) / e.slidesPerView, e.roundLengths && (C = Math.floor(C)), d[L] && (this.isHorizontal() ? d[L].style.width = C + "px" : d[L].style.height = C + "px");
            d[L] && (d[L].swiperSlideSize = C), u.push(C), e.centeredSlides ? (w = w + C / 2 + x / 2 + y, 0 === x && 0 !== L && (w = w - s / 2 - y), 0 === L && (w = w - s / 2 - y), Math.abs(w) < .001 && (w = 0), e.roundLengths && (w = Math.floor(w)), S % e.slidesPerGroup == 0 && c.push(w), p.push(w)) : (e.roundLengths && (w = Math.floor(w)), (S - Math.min(this.params.slidesPerGroupSkip, S)) % this.params.slidesPerGroup == 0 && c.push(w), p.push(w), w = w + C + y), this.virtualSize += C + y, x = C, S += 1
          }
        }
        if (this.virtualSize = Math.max(this.virtualSize, s) + v, a && r && ("slide" === e.effect || "coverflow" === e.effect) && i.css({width: this.virtualSize + e.spaceBetween + "px"}), e.setWrapperSize && (this.isHorizontal() ? i.css({width: this.virtualSize + e.spaceBetween + "px"}) : i.css({height: this.virtualSize + e.spaceBetween + "px"})), e.slidesPerColumn > 1 && (this.virtualSize = (C + e.spaceBetween) * E, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? i.css({width: this.virtualSize + e.spaceBetween + "px"}) : i.css({height: this.virtualSize + e.spaceBetween + "px"}), e.centeredSlides)) {
          T = [];
          for (var Q = 0; Q < c.length; Q += 1) {
            var J = c[Q];
            e.roundLengths && (J = Math.floor(J)), c[Q] < this.virtualSize + c[0] && T.push(J)
          }
          c = T
        }
        if (!e.centeredSlides) {
          T = [];
          for (var ee = 0; ee < c.length; ee += 1) {
            var te = c[ee];
            e.roundLengths && (te = Math.floor(te)), c[ee] <= this.virtualSize - s && T.push(te)
          }
          c = T, Math.floor(this.virtualSize - s) - Math.floor(c[c.length - 1]) > 1 && c.push(this.virtualSize - s)
        }
        if (0 === c.length && (c = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? a ? d.filter(m).css({marginLeft: y + "px"}) : d.filter(m).css({marginRight: y + "px"}) : d.filter(m).css({marginBottom: y + "px"})), e.centeredSlides && e.centeredSlidesBounds) {
          var ie = 0;
          u.forEach((function (t) {
            ie += t + (e.spaceBetween ? e.spaceBetween : 0)
          }));
          var se = (ie -= e.spaceBetween) - s;
          c = c.map((function (e) {
            return e < 0 ? -f : e > se ? se + v : e
          }))
        }
        if (e.centerInsufficientSlides) {
          var ae = 0;
          if (u.forEach((function (t) {
            ae += t + (e.spaceBetween ? e.spaceBetween : 0)
          })), (ae -= e.spaceBetween) < s) {
            var re = (s - ae) / 2;
            c.forEach((function (e, t) {
              c[t] = e - re
            })), p.forEach((function (e, t) {
              p[t] = e + re
            }))
          }
        }
        n.extend(this, {
          slides: d,
          snapGrid: c,
          slidesGrid: p,
          slidesSizesGrid: u
        }), h !== l && this.emit("slidesLengthChange"), c.length !== g && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")), p.length !== b && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset()
      }
    }, updateAutoHeight: function (e) {
      var t, i = [], s = 0;
      if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1) if (this.params.centeredSlides) i.push.apply(i, this.visibleSlides); else for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
        var a = this.activeIndex + t;
        if (a > this.slides.length) break;
        i.push(this.slides.eq(a)[0])
      } else i.push(this.slides.eq(this.activeIndex)[0]);
      for (t = 0; t < i.length; t += 1) if (void 0 !== i[t]) {
        var r = i[t].offsetHeight;
        s = r > s ? r : s
      }
      s && this.$wrapperEl.css("height", s + "px")
    }, updateSlidesOffset: function () {
      for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
    }, updateSlidesProgress: function (e) {
      void 0 === e && (e = this && this.translate || 0);
      var t = this.params, i = this.slides, a = this.rtlTranslate;
      if (0 !== i.length) {
        void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
        var r = -e;
        a && (r = e), i.removeClass(t.slideVisibleClass), this.visibleSlidesIndexes = [], this.visibleSlides = [];
        for (var n = 0; n < i.length; n += 1) {
          var o = i[n],
            l = (r + (t.centeredSlides ? this.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + t.spaceBetween);
          if (t.watchSlidesVisibility || t.centeredSlides && t.autoHeight) {
            var d = -(r - o.swiperSlideOffset), h = d + this.slidesSizesGrid[n];
            (d >= 0 && d < this.size - 1 || h > 1 && h <= this.size || d <= 0 && h >= this.size) && (this.visibleSlides.push(o), this.visibleSlidesIndexes.push(n), i.eq(n).addClass(t.slideVisibleClass))
          }
          o.progress = a ? -l : l
        }
        this.visibleSlides = s(this.visibleSlides)
      }
    }, updateProgress: function (e) {
      if (void 0 === e) {
        var t = this.rtlTranslate ? -1 : 1;
        e = this && this.translate && this.translate * t || 0
      }
      var i = this.params, s = this.maxTranslate() - this.minTranslate(), a = this.progress, r = this.isBeginning,
        o = this.isEnd, l = r, d = o;
      0 === s ? (a = 0, r = !0, o = !0) : (r = (a = (e - this.minTranslate()) / s) <= 0, o = a >= 1), n.extend(this, {
        progress: a,
        isBeginning: r,
        isEnd: o
      }), (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && this.updateSlidesProgress(e), r && !l && this.emit("reachBeginning toEdge"), o && !d && this.emit("reachEnd toEdge"), (l && !r || d && !o) && this.emit("fromEdge"), this.emit("progress", a)
    }, updateSlidesClasses: function () {
      var e, t = this.slides, i = this.params, s = this.$wrapperEl, a = this.activeIndex, r = this.realIndex,
        n = this.virtual && i.virtual.enabled;
      t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
      var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
      i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
      var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
      i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
    }, updateActiveIndex: function (e) {
      var t, i = this.rtlTranslate ? this.translate : -this.translate, s = this.slidesGrid, a = this.snapGrid,
        r = this.params, o = this.activeIndex, l = this.realIndex, d = this.snapIndex, h = e;
      if (void 0 === h) {
        for (var c = 0; c < s.length; c += 1) void 0 !== s[c + 1] ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2 ? h = c : i >= s[c] && i < s[c + 1] && (h = c + 1) : i >= s[c] && (h = c);
        r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0)
      }
      if (a.indexOf(i) >= 0) t = a.indexOf(i); else {
        var p = Math.min(r.slidesPerGroupSkip, h);
        t = p + Math.floor((h - p) / r.slidesPerGroup)
      }
      if (t >= a.length && (t = a.length - 1), h !== o) {
        var u = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
        n.extend(this, {
          snapIndex: t,
          realIndex: u,
          previousIndex: o,
          activeIndex: h
        }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), l !== u && this.emit("realIndexChange"), (this.initialized || this.runCallbacksOnInit) && this.emit("slideChange")
      } else t !== d && (this.snapIndex = t, this.emit("snapIndexChange"))
    }, updateClickedSlide: function (e) {
      var t = this.params, i = s(e.target).closest("." + t.slideClass)[0], a = !1;
      if (i) for (var r = 0; r < this.slides.length; r += 1) this.slides[r] === i && (a = !0);
      if (!i || !a) return this.clickedSlide = void 0, void (this.clickedIndex = void 0);
      this.clickedSlide = i, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(s(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = s(i).index(), t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
    }
  }, M = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      var t = this.params, i = this.rtlTranslate, s = this.translate, a = this.$wrapperEl;
      if (t.virtualTranslate) return i ? -s : s;
      if (t.cssMode) return s;
      var r = n.getTranslate(a[0], e);
      return i && (r = -r), r || 0
    }, setTranslate: function (e, t) {
      var i = this.rtlTranslate, s = this.params, a = this.$wrapperEl, r = this.wrapperEl, n = this.progress, o = 0,
        l = 0;
      this.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.cssMode ? r[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = this.isHorizontal() ? -o : -l : s.virtualTranslate || a.transform("translate3d(" + o + "px, " + l + "px, 0px)"), this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? o : l;
      var d = this.maxTranslate() - this.minTranslate();
      (0 === d ? 0 : (e - this.minTranslate()) / d) !== n && this.updateProgress(e), this.emit("setTranslate", this.translate, t)
    }, minTranslate: function () {
      return -this.snapGrid[0]
    }, maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1]
    }, translateTo: function (e, t, i, s, a) {
      var r;
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === s && (s = !0);
      var n = this, o = n.params, l = n.wrapperEl;
      if (n.animating && o.preventInteractionOnTransition) return !1;
      var d, h = n.minTranslate(), c = n.maxTranslate();
      if (d = s && e > h ? h : s && e < c ? c : e, n.updateProgress(d), o.cssMode) {
        var p = n.isHorizontal();
        return 0 === t ? l[p ? "scrollLeft" : "scrollTop"] = -d : l.scrollTo ? l.scrollTo(((r = {})[p ? "left" : "top"] = -d, r.behavior = "smooth", r)) : l[p ? "scrollLeft" : "scrollTop"] = -d, !0
      }
      return 0 === t ? (n.setTransition(0), n.setTranslate(d), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionEnd"))) : (n.setTransition(t), n.setTranslate(d), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function (e) {
        n && !n.destroyed && e.target === this && (n.$wrapperEl[0].removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.$wrapperEl[0].removeEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, i && n.emit("transitionEnd"))
      }), n.$wrapperEl[0].addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.$wrapperEl[0].addEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd))), !0
    }
  }, P = {
    slideTo: function (e, t, i, s) {
      var a;
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
      var r = this, n = e;
      n < 0 && (n = 0);
      var o = r.params, l = r.snapGrid, d = r.slidesGrid, h = r.previousIndex, c = r.activeIndex, p = r.rtlTranslate,
        u = r.wrapperEl;
      if (r.animating && o.preventInteractionOnTransition) return !1;
      var m = Math.min(r.params.slidesPerGroupSkip, n), f = m + Math.floor((n - m) / r.params.slidesPerGroup);
      f >= l.length && (f = l.length - 1), (c || o.initialSlide || 0) === (h || 0) && i && r.emit("beforeSlideChangeStart");
      var v, g = -l[f];
      if (r.updateProgress(g), o.normalizeSlideIndex) for (var b = 0; b < d.length; b += 1) -Math.floor(100 * g) >= Math.floor(100 * d[b]) && (n = b);
      if (r.initialized && n !== c) {
        if (!r.allowSlideNext && g < r.translate && g < r.minTranslate()) return !1;
        if (!r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (c || 0) !== n) return !1
      }
      if (v = n > c ? "next" : n < c ? "prev" : "reset", p && -g === r.translate || !p && g === r.translate) return r.updateActiveIndex(n), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(g), "reset" !== v && (r.transitionStart(i, v), r.transitionEnd(i, v)), !1;
      if (o.cssMode) {
        var y = r.isHorizontal();
        return 0 === t ? u[y ? "scrollLeft" : "scrollTop"] = -g : u.scrollTo ? u.scrollTo(((a = {})[y ? "left" : "top"] = -g, a.behavior = "smooth", a)) : u[y ? "scrollLeft" : "scrollTop"] = -g, !0
      }
      return 0 === t ? (r.setTransition(0), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, v), r.transitionEnd(i, v)) : (r.setTransition(t), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, v), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) {
        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, v))
      }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))), !0
    }, slideToLoop: function (e, t, i, s) {
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
      var a = e;
      return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s)
    }, slideNext: function (e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var s = this.params, a = this.animating, r = this.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
      if (s.loop) {
        if (a) return !1;
        this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft
      }
      return this.slideTo(this.activeIndex + r, e, t, i)
    }, slidePrev: function (e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var s = this.params, a = this.animating, r = this.snapGrid, n = this.slidesGrid, o = this.rtlTranslate;
      if (s.loop) {
        if (a) return !1;
        this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft
      }

      function l(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
      }

      var d, h = l(o ? this.translate : -this.translate), c = r.map((function (e) {
        return l(e)
      })), p = (n.map((function (e) {
        return l(e)
      })), r[c.indexOf(h)], r[c.indexOf(h) - 1]);
      return void 0 === p && s.cssMode && r.forEach((function (e) {
        !p && h >= e && (p = e)
      })), void 0 !== p && (d = n.indexOf(p)) < 0 && (d = this.activeIndex - 1), this.slideTo(d, e, t, i)
    }, slideReset: function (e, t, i) {
      return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i)
    }, slideToClosest: function (e, t, i, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === s && (s = .5);
      var a = this.activeIndex, r = Math.min(this.params.slidesPerGroupSkip, a),
        n = r + Math.floor((a - r) / this.params.slidesPerGroup),
        o = this.rtlTranslate ? this.translate : -this.translate;
      if (o >= this.snapGrid[n]) {
        var l = this.snapGrid[n];
        o - l > (this.snapGrid[n + 1] - l) * s && (a += this.params.slidesPerGroup)
      } else {
        var d = this.snapGrid[n - 1];
        o - d <= (this.snapGrid[n] - d) * s && (a -= this.params.slidesPerGroup)
      }
      return a = Math.max(a, 0), a = Math.min(a, this.slidesGrid.length - 1), this.slideTo(a, e, t, i)
    }, slideToClickedSlide: function () {
      var e, t = this, i = t.params, a = t.$wrapperEl,
        r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, o = t.clickedIndex;
      if (i.loop) {
        if (t.animating) return;
        e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? o < t.loopedSlides - r / 2 || o > t.slides.length - t.loopedSlides + r / 2 ? (t.loopFix(), o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), n.nextTick((function () {
          t.slideTo(o)
        }))) : t.slideTo(o) : o > t.slides.length - r ? (t.loopFix(), o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), n.nextTick((function () {
          t.slideTo(o)
        }))) : t.slideTo(o)
      } else t.slideTo(o)
    }
  }, k = {
    loopCreate: function () {
      var t = this, i = t.params, a = t.$wrapperEl;
      a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
      var r = a.children("." + i.slideClass);
      if (i.loopFillGroupWithBlank) {
        var n = i.slidesPerGroup - r.length % i.slidesPerGroup;
        if (n !== i.slidesPerGroup) {
          for (var o = 0; o < n; o += 1) {
            var l = s(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
            a.append(l)
          }
          r = a.children("." + i.slideClass)
        }
      }
      "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length), t.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10)), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > r.length && (t.loopedSlides = r.length);
      var d = [], h = [];
      r.each((function (e, i) {
        var a = s(i);
        e < t.loopedSlides && h.push(i), e < r.length && e >= r.length - t.loopedSlides && d.push(i), a.attr("data-swiper-slide-index", e)
      }));
      for (var c = 0; c < h.length; c += 1) a.append(s(h[c].cloneNode(!0)).addClass(i.slideDuplicateClass));
      for (var p = d.length - 1; p >= 0; p -= 1) a.prepend(s(d[p].cloneNode(!0)).addClass(i.slideDuplicateClass))
    }, loopFix: function () {
      this.emit("beforeLoopFix");
      var e, t = this.activeIndex, i = this.slides, s = this.loopedSlides, a = this.allowSlidePrev,
        r = this.allowSlideNext, n = this.snapGrid, o = this.rtlTranslate;
      this.allowSlidePrev = !0, this.allowSlideNext = !0;
      var l = -n[t] - this.getTranslate();
      t < s ? (e = i.length - 3 * s + t, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l)) : t >= i.length - s && (e = -i.length + t + s, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l)), this.allowSlidePrev = a, this.allowSlideNext = r, this.emit("loopFix")
    }, loopDestroy: function () {
      var e = this.$wrapperEl, t = this.params, i = this.slides;
      e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
    }
  }, L = {
    setGrabCursor: function (e) {
      if (!(o.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode)) {
        var t = this.el;
        t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
      }
    }, unsetGrabCursor: function () {
      o.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this.el.style.cursor = "")
    }
  }, D = {
    appendSlide: function (e) {
      var t = this.$wrapperEl, i = this.params;
      if (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e) for (var s = 0; s < e.length; s += 1) e[s] && t.append(e[s]); else t.append(e);
      i.loop && this.loopCreate(), i.observer && o.observer || this.update()
    }, prependSlide: function (e) {
      var t = this.params, i = this.$wrapperEl, s = this.activeIndex;
      t.loop && this.loopDestroy();
      var a = s + 1;
      if ("object" == typeof e && "length" in e) {
        for (var r = 0; r < e.length; r += 1) e[r] && i.prepend(e[r]);
        a = s + e.length
      } else i.prepend(e);
      t.loop && this.loopCreate(), t.observer && o.observer || this.update(), this.slideTo(a, 0, !1)
    }, addSlide: function (e, t) {
      var i = this.$wrapperEl, s = this.params, a = this.activeIndex;
      s.loop && (a -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + s.slideClass));
      var r = this.slides.length;
      if (e <= 0) this.prependSlide(t); else if (e >= r) this.appendSlide(t); else {
        for (var n = a > e ? a + 1 : a, l = [], d = r - 1; d >= e; d -= 1) {
          var h = this.slides.eq(d);
          h.remove(), l.unshift(h)
        }
        if ("object" == typeof t && "length" in t) {
          for (var c = 0; c < t.length; c += 1) t[c] && i.append(t[c]);
          n = a > e ? a + t.length : a
        } else i.append(t);
        for (var p = 0; p < l.length; p += 1) i.append(l[p]);
        s.loop && this.loopCreate(), s.observer && o.observer || this.update(), s.loop ? this.slideTo(n + this.loopedSlides, 0, !1) : this.slideTo(n, 0, !1)
      }
    }, removeSlide: function (e) {
      var t = this.params, i = this.$wrapperEl, s = this.activeIndex;
      t.loop && (s -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + t.slideClass));
      var a, r = s;
      if ("object" == typeof e && "length" in e) {
        for (var n = 0; n < e.length; n += 1) a = e[n], this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1);
        r = Math.max(r, 0)
      } else a = e, this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1), r = Math.max(r, 0);
      t.loop && this.loopCreate(), t.observer && o.observer || this.update(), t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1)
    }, removeAllSlides: function () {
      for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
      this.removeSlide(e)
    }
  }, z = (h = t.navigator.platform, c = t.navigator.userAgent, p = {
    ios: !1,
    android: !1,
    androidChrome: !1,
    desktop: !1,
    iphone: !1,
    ipod: !1,
    ipad: !1,
    edge: !1,
    ie: !1,
    firefox: !1,
    macos: !1,
    windows: !1,
    cordova: !(!t.cordova && !t.phonegap),
    phonegap: !(!t.cordova && !t.phonegap),
    electron: !1
  }, u = t.screen.width, m = t.screen.height, f = c.match(/(Android);?[\s\/]+([\d.]+)?/), v = c.match(/(iPad).*OS\s([\d_]+)/), g = c.match(/(iPod)(.*OS\s([\d_]+))?/), b = !v && c.match(/(iPhone\sOS|iOS)\s([\d_]+)/), y = c.indexOf("MSIE ") >= 0 || c.indexOf("Trident/") >= 0, w = c.indexOf("Edge/") >= 0, x = c.indexOf("Gecko/") >= 0 && c.indexOf("Firefox/") >= 0, S = "Win32" === h, E = c.toLowerCase().indexOf("electron") >= 0, C = "MacIntel" === h, !v && C && o.touch && (1024 === u && 1366 === m || 834 === u && 1194 === m || 834 === u && 1112 === m || 768 === u && 1024 === m) && (v = c.match(/(Version)\/([\d.]+)/), C = !1), p.ie = y, p.edge = w, p.firefox = x, f && !S && (p.os = "android", p.osVersion = f[2], p.android = !0, p.androidChrome = c.toLowerCase().indexOf("chrome") >= 0), (v || b || g) && (p.os = "ios", p.ios = !0), b && !g && (p.osVersion = b[2].replace(/_/g, "."), p.iphone = !0), v && (p.osVersion = v[2].replace(/_/g, "."), p.ipad = !0), g && (p.osVersion = g[3] ? g[3].replace(/_/g, ".") : null, p.ipod = !0), p.ios && p.osVersion && c.indexOf("Version/") >= 0 && "10" === p.osVersion.split(".")[0] && (p.osVersion = c.toLowerCase().split("version/")[1].split(" ")[0]), p.webView = !(!(b || v || g) || !c.match(/.*AppleWebKit(?!.*Safari)/i) && !t.navigator.standalone) || t.matchMedia && t.matchMedia("(display-mode: standalone)").matches, p.webview = p.webView, p.standalone = p.webView, p.desktop = !(p.ios || p.android) || E, p.desktop && (p.electron = E, p.macos = C, p.windows = S, p.macos && (p.os = "macos"), p.windows && (p.os = "windows")), p.pixelRatio = t.devicePixelRatio || 1, p);

  function $(i) {
    var a = this.touchEventsData, r = this.params, o = this.touches;
    if (!this.animating || !r.preventInteractionOnTransition) {
      var l = i;
      l.originalEvent && (l = l.originalEvent);
      var d = s(l.target);
      if (("wrapper" !== r.touchEventsTarget || d.closest(this.wrapperEl).length) && (a.isTouchEvent = "touchstart" === l.type, (a.isTouchEvent || !("which" in l) || 3 !== l.which) && !(!a.isTouchEvent && "button" in l && l.button > 0 || a.isTouched && a.isMoved))) if (r.noSwiping && d.closest(r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass)[0]) this.allowClick = !0; else if (!r.swipeHandler || d.closest(r.swipeHandler)[0]) {
        o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX, o.currentY = "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY;
        var h = o.currentX, c = o.currentY, p = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
          u = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
        if (!p || !(h <= u || h >= t.screen.width - u)) {
          if (n.extend(a, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0
          }), o.startX = h, o.startY = c, a.touchStartTime = n.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, r.threshold > 0 && (a.allowThresholdMove = !1), "touchstart" !== l.type) {
            var m = !0;
            d.is(a.formElements) && (m = !1), e.activeElement && s(e.activeElement).is(a.formElements) && e.activeElement !== d[0] && e.activeElement.blur();
            var f = m && this.allowTouchMove && r.touchStartPreventDefault;
            (r.touchStartForcePreventDefault || f) && l.preventDefault()
          }
          this.emit("touchStart", l)
        }
      }
    }
  }

  function I(t) {
    var i = this.touchEventsData, a = this.params, r = this.touches, o = this.rtlTranslate, l = t;
    if (l.originalEvent && (l = l.originalEvent), i.isTouched) {
      if (!i.isTouchEvent || "mousemove" !== l.type) {
        var d = "touchmove" === l.type && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0]),
          h = "touchmove" === l.type ? d.pageX : l.pageX, c = "touchmove" === l.type ? d.pageY : l.pageY;
        if (l.preventedByNestedSwiper) return r.startX = h, void (r.startY = c);
        if (!this.allowTouchMove) return this.allowClick = !1, void (i.isTouched && (n.extend(r, {
          startX: h,
          startY: c,
          currentX: h,
          currentY: c
        }), i.touchStartTime = n.now()));
        if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop) if (this.isVertical()) {
          if (c < r.startY && this.translate <= this.maxTranslate() || c > r.startY && this.translate >= this.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1)
        } else if (h < r.startX && this.translate <= this.maxTranslate() || h > r.startX && this.translate >= this.minTranslate()) return;
        if (i.isTouchEvent && e.activeElement && l.target === e.activeElement && s(l.target).is(i.formElements)) return i.isMoved = !0, void (this.allowClick = !1);
        if (i.allowTouchCallbacks && this.emit("touchMove", l), !(l.targetTouches && l.targetTouches.length > 1)) {
          r.currentX = h, r.currentY = c;
          var p, u = r.currentX - r.startX, m = r.currentY - r.startY;
          if (!(this.params.threshold && Math.sqrt(Math.pow(u, 2) + Math.pow(m, 2)) < this.params.threshold)) if (void 0 === i.isScrolling && (this.isHorizontal() && r.currentY === r.startY || this.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : u * u + m * m >= 25 && (p = 180 * Math.atan2(Math.abs(m), Math.abs(u)) / Math.PI, i.isScrolling = this.isHorizontal() ? p > a.touchAngle : 90 - p > a.touchAngle)), i.isScrolling && this.emit("touchMoveOpposite", l), void 0 === i.startMoving && (r.currentX === r.startX && r.currentY === r.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1; else if (i.startMoving) {
            this.allowClick = !1, a.cssMode || l.preventDefault(), a.touchMoveStopPropagation && !a.nested && l.stopPropagation(), i.isMoved || (a.loop && this.loopFix(), i.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !a.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", l)), this.emit("sliderMove", l), i.isMoved = !0;
            var f = this.isHorizontal() ? u : m;
            r.diff = f, f *= a.touchRatio, o && (f = -f), this.swipeDirection = f > 0 ? "prev" : "next", i.currentTranslate = f + i.startTranslate;
            var v = !0, g = a.resistanceRatio;
            if (a.touchReleaseOnEdges && (g = 0), f > 0 && i.currentTranslate > this.minTranslate() ? (v = !1, a.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + f, g))) : f < 0 && i.currentTranslate < this.maxTranslate() && (v = !1, a.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - f, g))), v && (l.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), a.threshold > 0) {
              if (!(Math.abs(f) > a.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
              if (!i.allowThresholdMove) return i.allowThresholdMove = !0, r.startX = r.currentX, r.startY = r.currentY, i.currentTranslate = i.startTranslate, void (r.diff = this.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
            }
            a.followFinger && !a.cssMode && ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), a.freeMode && (0 === i.velocities.length && i.velocities.push({
              position: r[this.isHorizontal() ? "startX" : "startY"],
              time: i.touchStartTime
            }), i.velocities.push({
              position: r[this.isHorizontal() ? "currentX" : "currentY"],
              time: n.now()
            })), this.updateProgress(i.currentTranslate), this.setTranslate(i.currentTranslate))
          }
        }
      }
    } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", l)
  }

  function O(e) {
    var t = this, i = t.touchEventsData, s = t.params, a = t.touches, r = t.rtlTranslate, o = t.$wrapperEl,
      l = t.slidesGrid, d = t.snapGrid, h = e;
    if (h.originalEvent && (h = h.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", h), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void (i.startMoving = !1);
    s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
    var c, p = n.now(), u = p - i.touchStartTime;
    if (t.allowClick && (t.updateClickedSlide(h), t.emit("tap click", h), u < 300 && p - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", h)), i.lastClickTime = n.now(), n.nextTick((function () {
      t.destroyed || (t.allowClick = !0)
    })), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void (i.startMoving = !1);
    if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, c = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, !s.cssMode) if (s.freeMode) {
      if (c < -t.minTranslate()) return void t.slideTo(t.activeIndex);
      if (c > -t.maxTranslate()) return void (t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1));
      if (s.freeModeMomentum) {
        if (i.velocities.length > 1) {
          var m = i.velocities.pop(), f = i.velocities.pop(), v = m.position - f.position, g = m.time - f.time;
          t.velocity = v / g, t.velocity /= 2, Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (g > 150 || n.now() - m.time > 300) && (t.velocity = 0)
        } else t.velocity = 0;
        t.velocity *= s.freeModeMomentumVelocityRatio, i.velocities.length = 0;
        var b = 1e3 * s.freeModeMomentumRatio, y = t.velocity * b, w = t.translate + y;
        r && (w = -w);
        var x, S, E = !1, C = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
        if (w < t.maxTranslate()) s.freeModeMomentumBounce ? (w + t.maxTranslate() < -C && (w = t.maxTranslate() - C), x = t.maxTranslate(), E = !0, i.allowMomentumBounce = !0) : w = t.maxTranslate(), s.loop && s.centeredSlides && (S = !0); else if (w > t.minTranslate()) s.freeModeMomentumBounce ? (w - t.minTranslate() > C && (w = t.minTranslate() + C), x = t.minTranslate(), E = !0, i.allowMomentumBounce = !0) : w = t.minTranslate(), s.loop && s.centeredSlides && (S = !0); else if (s.freeModeSticky) {
          for (var T, M = 0; M < d.length; M += 1) if (d[M] > -w) {
            T = M;
            break
          }
          w = -(w = Math.abs(d[T] - w) < Math.abs(d[T - 1] - w) || "next" === t.swipeDirection ? d[T] : d[T - 1])
        }
        if (S && t.once("transitionEnd", (function () {
          t.loopFix()
        })), 0 !== t.velocity) {
          if (b = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity), s.freeModeSticky) {
            var P = Math.abs((r ? -w : w) - t.translate), k = t.slidesSizesGrid[t.activeIndex];
            b = P < k ? s.speed : P < 2 * k ? 1.5 * s.speed : 2.5 * s.speed
          }
        } else if (s.freeModeSticky) return void t.slideToClosest();
        s.freeModeMomentumBounce && E ? (t.updateProgress(x), t.setTransition(b), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, o.transitionEnd((function () {
          t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(s.speed), t.setTranslate(x), o.transitionEnd((function () {
            t && !t.destroyed && t.transitionEnd()
          })))
        }))) : t.velocity ? (t.updateProgress(w), t.setTransition(b), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, o.transitionEnd((function () {
          t && !t.destroyed && t.transitionEnd()
        })))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
      } else if (s.freeModeSticky) return void t.slideToClosest();
      (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
    } else {
      for (var L = 0, D = t.slidesSizesGrid[0], z = 0; z < l.length; z += z < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) {
        var $ = z < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
        void 0 !== l[z + $] ? c >= l[z] && c < l[z + $] && (L = z, D = l[z + $] - l[z]) : c >= l[z] && (L = z, D = l[l.length - 1] - l[l.length - 2])
      }
      var I = (c - l[L]) / D, O = L < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
      if (u > s.longSwipesMs) {
        if (!s.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection && (I >= s.longSwipesRatio ? t.slideTo(L + O) : t.slideTo(L)), "prev" === t.swipeDirection && (I > 1 - s.longSwipesRatio ? t.slideTo(L + O) : t.slideTo(L))
      } else {
        if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
        !t.navigation || h.target !== t.navigation.nextEl && h.target !== t.navigation.prevEl ? ("next" === t.swipeDirection && t.slideTo(L + O), "prev" === t.swipeDirection && t.slideTo(L)) : h.target === t.navigation.nextEl ? t.slideTo(L + O) : t.slideTo(L)
      }
    }
  }

  function N() {
    var e = this.params, t = this.el;
    if (!t || 0 !== t.offsetWidth) {
      e.breakpoints && this.setBreakpoint();
      var i = this.allowSlideNext, s = this.allowSlidePrev, a = this.snapGrid;
      this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0), this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(), this.allowSlidePrev = s, this.allowSlideNext = i, this.params.watchOverflow && a !== this.snapGrid && this.checkOverflow()
    }
  }

  function A(e) {
    this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
  }

  function _() {
    var e = this.wrapperEl;
    this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? -e.scrollLeft : -e.scrollTop, -0 === this.translate && (this.translate = 0), this.updateActiveIndex(), this.updateSlidesClasses();
    var t = this.maxTranslate() - this.minTranslate();
    (0 === t ? 0 : (this.translate - this.minTranslate()) / t) !== this.progress && this.updateProgress(this.translate), this.emit("setTranslate", this.translate, !1)
  }

  var H = !1;

  function F() {
  }

  var V = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "container",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      preventInteractionOnTransition: !1,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: .02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: "column",
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !1,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: .5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: .85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: "swiper-container-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0
    }, B = {
      update: T, translate: M, transition: {
        setTransition: function (e, t) {
          this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
        }, transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          var i = this.activeIndex, s = this.params, a = this.previousIndex;
          if (!s.cssMode) {
            s.autoHeight && this.updateAutoHeight();
            var r = t;
            if (r || (r = i > a ? "next" : i < a ? "prev" : "reset"), this.emit("transitionStart"), e && i !== a) {
              if ("reset" === r) return void this.emit("slideResetTransitionStart");
              this.emit("slideChangeTransitionStart"), "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")
            }
          }
        }, transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          var i = this.activeIndex, s = this.previousIndex, a = this.params;
          if (this.animating = !1, !a.cssMode) {
            this.setTransition(0);
            var r = t;
            if (r || (r = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== s) {
              if ("reset" === r) return void this.emit("slideResetTransitionEnd");
              this.emit("slideChangeTransitionEnd"), "next" === r ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")
            }
          }
        }
      }, slide: P, loop: k, grabCursor: L, manipulation: D, events: {
        attachEvents: function () {
          var t = this.params, i = this.touchEvents, s = this.el, a = this.wrapperEl;
          this.onTouchStart = $.bind(this), this.onTouchMove = I.bind(this), this.onTouchEnd = O.bind(this), t.cssMode && (this.onScroll = _.bind(this)), this.onClick = A.bind(this);
          var r = !!t.nested;
          if (!o.touch && o.pointerEvents) s.addEventListener(i.start, this.onTouchStart, !1), e.addEventListener(i.move, this.onTouchMove, r), e.addEventListener(i.end, this.onTouchEnd, !1); else {
            if (o.touch) {
              var n = !("touchstart" !== i.start || !o.passiveListener || !t.passiveListeners) && {
                passive: !0,
                capture: !1
              };
              s.addEventListener(i.start, this.onTouchStart, n), s.addEventListener(i.move, this.onTouchMove, o.passiveListener ? {
                passive: !1,
                capture: r
              } : r), s.addEventListener(i.end, this.onTouchEnd, n), i.cancel && s.addEventListener(i.cancel, this.onTouchEnd, n), H || (e.addEventListener("touchstart", F), H = !0)
            }
            (t.simulateTouch && !z.ios && !z.android || t.simulateTouch && !o.touch && z.ios) && (s.addEventListener("mousedown", this.onTouchStart, !1), e.addEventListener("mousemove", this.onTouchMove, r), e.addEventListener("mouseup", this.onTouchEnd, !1))
          }
          (t.preventClicks || t.preventClicksPropagation) && s.addEventListener("click", this.onClick, !0), t.cssMode && a.addEventListener("scroll", this.onScroll), t.updateOnWindowResize ? this.on(z.ios || z.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", N, !0) : this.on("observerUpdate", N, !0)
        }, detachEvents: function () {
          var t = this.params, i = this.touchEvents, s = this.el, a = this.wrapperEl, r = !!t.nested;
          if (!o.touch && o.pointerEvents) s.removeEventListener(i.start, this.onTouchStart, !1), e.removeEventListener(i.move, this.onTouchMove, r), e.removeEventListener(i.end, this.onTouchEnd, !1); else {
            if (o.touch) {
              var n = !("onTouchStart" !== i.start || !o.passiveListener || !t.passiveListeners) && {
                passive: !0,
                capture: !1
              };
              s.removeEventListener(i.start, this.onTouchStart, n), s.removeEventListener(i.move, this.onTouchMove, r), s.removeEventListener(i.end, this.onTouchEnd, n), i.cancel && s.removeEventListener(i.cancel, this.onTouchEnd, n)
            }
            (t.simulateTouch && !z.ios && !z.android || t.simulateTouch && !o.touch && z.ios) && (s.removeEventListener("mousedown", this.onTouchStart, !1), e.removeEventListener("mousemove", this.onTouchMove, r), e.removeEventListener("mouseup", this.onTouchEnd, !1))
          }
          (t.preventClicks || t.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0), t.cssMode && a.removeEventListener("scroll", this.onScroll), this.off(z.ios || z.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", N)
        }
      }, breakpoints: {
        setBreakpoint: function () {
          var e = this.activeIndex, t = this.initialized, i = this.loopedSlides;
          void 0 === i && (i = 0);
          var s = this.params, a = this.$el, r = s.breakpoints;
          if (r && (!r || 0 !== Object.keys(r).length)) {
            var o = this.getBreakpoint(r);
            if (o && this.currentBreakpoint !== o) {
              var l = o in r ? r[o] : void 0;
              l && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach((function (e) {
                var t = l[e];
                void 0 !== t && (l[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
              }));
              var d = l || this.originalParams, h = s.slidesPerColumn > 1, c = d.slidesPerColumn > 1;
              h && !c ? a.removeClass(s.containerModifierClass + "multirow " + s.containerModifierClass + "multirow-column") : !h && c && (a.addClass(s.containerModifierClass + "multirow"), "column" === d.slidesPerColumnFill && a.addClass(s.containerModifierClass + "multirow-column"));
              var p = d.direction && d.direction !== s.direction,
                u = s.loop && (d.slidesPerView !== s.slidesPerView || p);
              p && t && this.changeDirection(), n.extend(this.params, d), n.extend(this, {
                allowTouchMove: this.params.allowTouchMove,
                allowSlideNext: this.params.allowSlideNext,
                allowSlidePrev: this.params.allowSlidePrev
              }), this.currentBreakpoint = o, u && t && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - i + this.loopedSlides, 0, !1)), this.emit("breakpoint", d)
            }
          }
        }, getBreakpoint: function (e) {
          if (e) {
            var i = !1, s = Object.keys(e).map((function (e) {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                var i = parseFloat(e.substr(1));
                return {value: t.innerHeight * i, point: e}
              }
              return {value: e, point: e}
            }));
            s.sort((function (e, t) {
              return parseInt(e.value, 10) - parseInt(t.value, 10)
            }));
            for (var a = 0; a < s.length; a += 1) {
              var r = s[a], n = r.point;
              r.value <= t.innerWidth && (i = n)
            }
            return i || "max"
          }
        }
      }, checkOverflow: {
        checkOverflow: function () {
          var e = this.params, t = this.isLocked,
            i = this.slides.length > 0 && e.slidesOffsetBefore + e.spaceBetween * (this.slides.length - 1) + this.slides[0].offsetWidth * this.slides.length;
          e.slidesOffsetBefore && e.slidesOffsetAfter && i ? this.isLocked = i <= this.size : this.isLocked = 1 === this.snapGrid.length, this.allowSlideNext = !this.isLocked, this.allowSlidePrev = !this.isLocked, t !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"), t && t !== this.isLocked && (this.isEnd = !1, this.navigation.update())
        }
      }, classes: {
        addClasses: function () {
          var e = this.classNames, t = this.params, i = this.rtl, s = this.$el, a = [];
          a.push("initialized"), a.push(t.direction), t.freeMode && a.push("free-mode"), t.autoHeight && a.push("autoheight"), i && a.push("rtl"), t.slidesPerColumn > 1 && (a.push("multirow"), "column" === t.slidesPerColumnFill && a.push("multirow-column")), z.android && a.push("android"), z.ios && a.push("ios"), t.cssMode && a.push("css-mode"), a.forEach((function (i) {
            e.push(t.containerModifierClass + i)
          })), s.addClass(e.join(" "))
        }, removeClasses: function () {
          var e = this.$el, t = this.classNames;
          e.removeClass(t.join(" "))
        }
      }, images: {
        loadImage: function (e, i, s, a, r, n) {
          var o;

          function l() {
            n && n()
          }

          e.complete && r ? l() : i ? ((o = new t.Image).onload = l, o.onerror = l, a && (o.sizes = a), s && (o.srcset = s), i && (o.src = i)) : l()
        }, preloadImages: function () {
          var e = this;

          function t() {
            null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
          }

          e.imagesToLoad = e.$el.find("img");
          for (var i = 0; i < e.imagesToLoad.length; i += 1) {
            var s = e.imagesToLoad[i];
            e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
          }
        }
      }
    }, G = {}, Y = function (e) {
      function t() {
        for (var i, a, r, l = [], d = arguments.length; d--;) l[d] = arguments[d];
        1 === l.length && l[0].constructor && l[0].constructor === Object ? r = l[0] : (a = (i = l)[0], r = i[1]), r || (r = {}), r = n.extend({}, r), a && !r.el && (r.el = a), e.call(this, r), Object.keys(B).forEach((function (e) {
          Object.keys(B[e]).forEach((function (i) {
            t.prototype[i] || (t.prototype[i] = B[e][i])
          }))
        }));
        var h = this;
        void 0 === h.modules && (h.modules = {}), Object.keys(h.modules).forEach((function (e) {
          var t = h.modules[e];
          if (t.params) {
            var i = Object.keys(t.params)[0], s = t.params[i];
            if ("object" != typeof s || null === s) return;
            if (!(i in r) || !("enabled" in s)) return;
            !0 === r[i] && (r[i] = {enabled: !0}), "object" != typeof r[i] || "enabled" in r[i] || (r[i].enabled = !0), r[i] || (r[i] = {enabled: !1})
          }
        }));
        var c = n.extend({}, V);
        h.useModulesParams(c), h.params = n.extend({}, c, G, r), h.originalParams = n.extend({}, h.params), h.passedParams = n.extend({}, r), h.$ = s;
        var p = s(h.params.el);
        if (a = p[0]) {
          if (p.length > 1) {
            var u = [];
            return p.each((function (e, i) {
              var s = n.extend({}, r, {el: i});
              u.push(new t(s))
            })), u
          }
          var m, f, v;
          return a.swiper = h, p.data("swiper", h), a && a.shadowRoot && a.shadowRoot.querySelector ? (m = s(a.shadowRoot.querySelector("." + h.params.wrapperClass))).children = function (e) {
            return p.children(e)
          } : m = p.children("." + h.params.wrapperClass), n.extend(h, {
            $el: p,
            el: a,
            $wrapperEl: m,
            wrapperEl: m[0],
            classNames: [],
            slides: s(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: function () {
              return "horizontal" === h.params.direction
            },
            isVertical: function () {
              return "vertical" === h.params.direction
            },
            rtl: "rtl" === a.dir.toLowerCase() || "rtl" === p.css("direction"),
            rtlTranslate: "horizontal" === h.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === p.css("direction")),
            wrongRTL: "-webkit-box" === m.css("display"),
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: h.params.allowSlideNext,
            allowSlidePrev: h.params.allowSlidePrev,
            touchEvents: (f = ["touchstart", "touchmove", "touchend", "touchcancel"], v = ["mousedown", "mousemove", "mouseup"], o.pointerEvents && (v = ["pointerdown", "pointermove", "pointerup"]), h.touchEventsTouch = {
              start: f[0],
              move: f[1],
              end: f[2],
              cancel: f[3]
            }, h.touchEventsDesktop = {
              start: v[0],
              move: v[1],
              end: v[2]
            }, o.touch || !h.params.simulateTouch ? h.touchEventsTouch : h.touchEventsDesktop),
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              formElements: "input, select, option, textarea, button, video, label",
              lastClickTime: n.now(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              isTouchEvent: void 0,
              startMoving: void 0
            },
            allowClick: !0,
            allowTouchMove: h.params.allowTouchMove,
            touches: {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0},
            imagesToLoad: [],
            imagesLoaded: 0
          }), h.useModules(), h.params.init && h.init(), h
        }
      }

      e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
      var i = {
        extendedDefaults: {configurable: !0},
        defaults: {configurable: !0},
        Class: {configurable: !0},
        $: {configurable: !0}
      };
      return t.prototype.slidesPerViewDynamic = function () {
        var e = this.params, t = this.slides, i = this.slidesGrid, s = this.size, a = this.activeIndex, r = 1;
        if (e.centeredSlides) {
          for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1) t[l] && !n && (r += 1, (o += t[l].swiperSlideSize) > s && (n = !0));
          for (var d = a - 1; d >= 0; d -= 1) t[d] && !n && (r += 1, (o += t[d].swiperSlideSize) > s && (n = !0))
        } else for (var h = a + 1; h < t.length; h += 1) i[h] - i[a] < s && (r += 1);
        return r
      }, t.prototype.update = function () {
        var e = this;
        if (e && !e.destroyed) {
          var t = e.snapGrid, i = e.params;
          i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (s(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
        }

        function s() {
          var t = e.rtlTranslate ? -1 * e.translate : e.translate,
            i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses()
        }
      }, t.prototype.changeDirection = function (e, t) {
        void 0 === t && (t = !0);
        var i = this.params.direction;
        return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (this.$el.removeClass("" + this.params.containerModifierClass + i).addClass("" + this.params.containerModifierClass + e), this.params.direction = e, this.slides.each((function (t, i) {
          "vertical" === e ? i.style.width = "" : i.style.height = ""
        })), this.emit("changeDirection"), t && this.update()), this
      }, t.prototype.init = function () {
        this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.watchOverflow && this.checkOverflow(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init"))
      }, t.prototype.destroy = function (e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        var i = this, s = i.params, a = i.$el, r = i.$wrapperEl, o = i.slides;
        return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), a.removeAttr("style"), r.removeAttr("style"), o && o.length && o.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((function (e) {
          i.off(e)
        })), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), n.deleteProps(i)), i.destroyed = !0), null
      }, t.extendDefaults = function (e) {
        n.extend(G, e)
      }, i.extendedDefaults.get = function () {
        return G
      }, i.defaults.get = function () {
        return V
      }, i.Class.get = function () {
        return e
      }, i.$.get = function () {
        return s
      }, Object.defineProperties(t, i), t
    }(l), q = {name: "device", proto: {device: z}, static: {device: z}},
    X = {name: "support", proto: {support: o}, static: {support: o}}, R = {
      isEdge: !!t.navigator.userAgent.match(/Edge/g), isSafari: function () {
        var e = t.navigator.userAgent.toLowerCase();
        return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
      }(), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
    }, W = {name: "browser", proto: {browser: R}, static: {browser: R}}, j = {
      name: "resize", create: function () {
        var e = this;
        n.extend(e, {
          resize: {
            resizeHandler: function () {
              e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
            }, orientationChangeHandler: function () {
              e && !e.destroyed && e.initialized && e.emit("orientationchange")
            }
          }
        })
      }, on: {
        init: function () {
          t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler)
        }, destroy: function () {
          t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
        }
      }
    }, U = {
      func: t.MutationObserver || t.WebkitMutationObserver, attach: function (e, i) {
        void 0 === i && (i = {});
        var s = this, a = new (0, U.func)((function (e) {
          if (1 !== e.length) {
            var i = function () {
              s.emit("observerUpdate", e[0])
            };
            t.requestAnimationFrame ? t.requestAnimationFrame(i) : t.setTimeout(i, 0)
          } else s.emit("observerUpdate", e[0])
        }));
        a.observe(e, {
          attributes: void 0 === i.attributes || i.attributes,
          childList: void 0 === i.childList || i.childList,
          characterData: void 0 === i.characterData || i.characterData
        }), s.observer.observers.push(a)
      }, init: function () {
        if (o.observer && this.params.observer) {
          if (this.params.observeParents) for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) this.observer.attach(e[t]);
          this.observer.attach(this.$el[0], {childList: this.params.observeSlideChildren}), this.observer.attach(this.$wrapperEl[0], {attributes: !1})
        }
      }, destroy: function () {
        this.observer.observers.forEach((function (e) {
          e.disconnect()
        })), this.observer.observers = []
      }
    }, K = {
      name: "observer", params: {observer: !1, observeParents: !1, observeSlideChildren: !1}, create: function () {
        n.extend(this, {
          observer: {
            init: U.init.bind(this),
            attach: U.attach.bind(this),
            destroy: U.destroy.bind(this),
            observers: []
          }
        })
      }, on: {
        init: function () {
          this.observer.init()
        }, destroy: function () {
          this.observer.destroy()
        }
      }
    }, Z = {
      update: function (e) {
        var t = this, i = t.params, s = i.slidesPerView, a = i.slidesPerGroup, r = i.centeredSlides, o = t.params.virtual,
          l = o.addSlidesBefore, d = o.addSlidesAfter, h = t.virtual, c = h.from, p = h.to, u = h.slides,
          m = h.slidesGrid, f = h.renderSlide, v = h.offset;
        t.updateActiveIndex();
        var g, b, y, w = t.activeIndex || 0;
        g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (b = Math.floor(s / 2) + a + l, y = Math.floor(s / 2) + a + d) : (b = s + (a - 1) + l, y = a + d);
        var x = Math.max((w || 0) - y, 0), S = Math.min((w || 0) + b, u.length - 1),
          E = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);

        function C() {
          t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
        }

        if (n.extend(t.virtual, {
          from: x,
          to: S,
          offset: E,
          slidesGrid: t.slidesGrid
        }), c === x && p === S && !e) return t.slidesGrid !== m && E !== v && t.slides.css(g, E + "px"), void t.updateProgress();
        if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
          offset: E,
          from: x,
          to: S,
          slides: function () {
            for (var e = [], t = x; t <= S; t += 1) e.push(u[t]);
            return e
          }()
        }), void C();
        var T = [], M = [];
        if (e) t.$wrapperEl.find("." + t.params.slideClass).remove(); else for (var P = c; P <= p; P += 1) (P < x || P > S) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + P + '"]').remove();
        for (var k = 0; k < u.length; k += 1) k >= x && k <= S && (void 0 === p || e ? M.push(k) : (k > p && M.push(k), k < c && T.push(k)));
        M.forEach((function (e) {
          t.$wrapperEl.append(f(u[e], e))
        })), T.sort((function (e, t) {
          return t - e
        })).forEach((function (e) {
          t.$wrapperEl.prepend(f(u[e], e))
        })), t.$wrapperEl.children(".swiper-slide").css(g, E + "px"), C()
      }, renderSlide: function (e, t) {
        var i = this.params.virtual;
        if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
        var a = i.renderSlide ? s(i.renderSlide.call(this, e, t)) : s('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
        return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = a), a
      }, appendSlide: function (e) {
        if ("object" == typeof e && "length" in e) for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]); else this.virtual.slides.push(e);
        this.virtual.update(!0)
      }, prependSlide: function (e) {
        var t = this.activeIndex, i = t + 1, s = 1;
        if (Array.isArray(e)) {
          for (var a = 0; a < e.length; a += 1) e[a] && this.virtual.slides.unshift(e[a]);
          i = t + e.length, s = e.length
        } else this.virtual.slides.unshift(e);
        if (this.params.virtual.cache) {
          var r = this.virtual.cache, n = {};
          Object.keys(r).forEach((function (e) {
            var t = r[e], i = t.attr("data-swiper-slide-index");
            i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1), n[parseInt(e, 10) + s] = t
          })), this.virtual.cache = n
        }
        this.virtual.update(!0), this.slideTo(i, 0)
      }, removeSlide: function (e) {
        if (null != e) {
          var t = this.activeIndex;
          if (Array.isArray(e)) for (var i = e.length - 1; i >= 0; i -= 1) this.virtual.slides.splice(e[i], 1), this.params.virtual.cache && delete this.virtual.cache[e[i]], e[i] < t && (t -= 1), t = Math.max(t, 0); else this.virtual.slides.splice(e, 1), this.params.virtual.cache && delete this.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
          this.virtual.update(!0), this.slideTo(t, 0)
        }
      }, removeAllSlides: function () {
        this.virtual.slides = [], this.params.virtual.cache && (this.virtual.cache = {}), this.virtual.update(!0), this.slideTo(0, 0)
      }
    }, Q = {
      name: "virtual",
      params: {
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          addSlidesBefore: 0,
          addSlidesAfter: 0
        }
      },
      create: function () {
        n.extend(this, {
          virtual: {
            update: Z.update.bind(this),
            appendSlide: Z.appendSlide.bind(this),
            prependSlide: Z.prependSlide.bind(this),
            removeSlide: Z.removeSlide.bind(this),
            removeAllSlides: Z.removeAllSlides.bind(this),
            renderSlide: Z.renderSlide.bind(this),
            slides: this.params.virtual.slides,
            cache: {}
          }
        })
      },
      on: {
        beforeInit: function () {
          if (this.params.virtual.enabled) {
            this.classNames.push(this.params.containerModifierClass + "virtual");
            var e = {watchSlidesProgress: !0};
            n.extend(this.params, e), n.extend(this.originalParams, e), this.params.initialSlide || this.virtual.update()
          }
        }, setTranslate: function () {
          this.params.virtual.enabled && this.virtual.update()
        }
      }
    }, J = {
      handle: function (i) {
        var s = this.rtlTranslate, a = i;
        a.originalEvent && (a = a.originalEvent);
        var r = a.keyCode || a.charCode;
        if (!this.allowSlideNext && (this.isHorizontal() && 39 === r || this.isVertical() && 40 === r || 34 === r)) return !1;
        if (!this.allowSlidePrev && (this.isHorizontal() && 37 === r || this.isVertical() && 38 === r || 33 === r)) return !1;
        if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) {
          if (this.params.keyboard.onlyInViewport && (33 === r || 34 === r || 37 === r || 39 === r || 38 === r || 40 === r)) {
            var n = !1;
            if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
            var o = t.innerWidth, l = t.innerHeight, d = this.$el.offset();
            s && (d.left -= this.$el[0].scrollLeft);
            for (var h = [[d.left, d.top], [d.left + this.width, d.top], [d.left, d.top + this.height], [d.left + this.width, d.top + this.height]], c = 0; c < h.length; c += 1) {
              var p = h[c];
              p[0] >= 0 && p[0] <= o && p[1] >= 0 && p[1] <= l && (n = !0)
            }
            if (!n) return
          }
          this.isHorizontal() ? (33 !== r && 34 !== r && 37 !== r && 39 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (34 !== r && 39 !== r || s) && (33 !== r && 37 !== r || !s) || this.slideNext(), (33 !== r && 37 !== r || s) && (34 !== r && 39 !== r || !s) || this.slidePrev()) : (33 !== r && 34 !== r && 38 !== r && 40 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 34 !== r && 40 !== r || this.slideNext(), 33 !== r && 38 !== r || this.slidePrev()), this.emit("keyPress", r)
        }
      }, enable: function () {
        this.keyboard.enabled || (s(e).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
      }, disable: function () {
        this.keyboard.enabled && (s(e).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
      }
    }, ee = {
      name: "keyboard", params: {keyboard: {enabled: !1, onlyInViewport: !0}}, create: function () {
        n.extend(this, {
          keyboard: {
            enabled: !1,
            enable: J.enable.bind(this),
            disable: J.disable.bind(this),
            handle: J.handle.bind(this)
          }
        })
      }, on: {
        init: function () {
          this.params.keyboard.enabled && this.keyboard.enable()
        }, destroy: function () {
          this.keyboard.enabled && this.keyboard.disable()
        }
      }
    }, te = {
      lastScrollTime: n.now(), lastEventBeforeSnap: void 0, recentWheelEvents: [], event: function () {
        return t.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
          var t = "onwheel" in e;
          if (!t) {
            var i = e.createElement("div");
            i.setAttribute("onwheel", "return;"), t = "function" == typeof i.onwheel
          }
          return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")), t
        }() ? "wheel" : "mousewheel"
      }, normalize: function (e) {
        var t = 0, i = 0, s = 0, a = 0;
        return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, a = 10 * i, "deltaY" in e && (a = e.deltaY), "deltaX" in e && (s = e.deltaX), e.shiftKey && !s && (s = a, a = 0), (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, a *= 40) : (s *= 800, a *= 800)), s && !t && (t = s < 1 ? -1 : 1), a && !i && (i = a < 1 ? -1 : 1), {
          spinX: t,
          spinY: i,
          pixelX: s,
          pixelY: a
        }
      }, handleMouseEnter: function () {
        this.mouseEntered = !0
      }, handleMouseLeave: function () {
        this.mouseEntered = !1
      }, handle: function (e) {
        var t = e, i = this, a = i.params.mousewheel;
        i.params.cssMode && t.preventDefault();
        var r = i.$el;
        if ("container" !== i.params.mousewheel.eventsTarged && (r = s(i.params.mousewheel.eventsTarged)), !i.mouseEntered && !r[0].contains(t.target) && !a.releaseOnEdges) return !0;
        t.originalEvent && (t = t.originalEvent);
        var o = 0, l = i.rtlTranslate ? -1 : 1, d = te.normalize(t);
        if (a.forceToAxis) if (i.isHorizontal()) {
          if (!(Math.abs(d.pixelX) > Math.abs(d.pixelY))) return !0;
          o = d.pixelX * l
        } else {
          if (!(Math.abs(d.pixelY) > Math.abs(d.pixelX))) return !0;
          o = d.pixelY
        } else o = Math.abs(d.pixelX) > Math.abs(d.pixelY) ? -d.pixelX * l : -d.pixelY;
        if (0 === o) return !0;
        if (a.invert && (o = -o), i.params.freeMode) {
          var h = {time: n.now(), delta: Math.abs(o), direction: Math.sign(o)}, c = i.mousewheel.lastEventBeforeSnap,
            p = c && h.time < c.time + 500 && h.delta <= c.delta && h.direction === c.direction;
          if (!p) {
            i.mousewheel.lastEventBeforeSnap = void 0, i.params.loop && i.loopFix();
            var u = i.getTranslate() + o * a.sensitivity, m = i.isBeginning, f = i.isEnd;
            if (u >= i.minTranslate() && (u = i.minTranslate()), u <= i.maxTranslate() && (u = i.maxTranslate()), i.setTransition(0), i.setTranslate(u), i.updateProgress(), i.updateActiveIndex(), i.updateSlidesClasses(), (!m && i.isBeginning || !f && i.isEnd) && i.updateSlidesClasses(), i.params.freeModeSticky) {
              clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = void 0;
              var v = i.mousewheel.recentWheelEvents;
              v.length >= 15 && v.shift();
              var g = v.length ? v[v.length - 1] : void 0, b = v[0];
              if (v.push(h), g && (h.delta > g.delta || h.direction !== g.direction)) v.splice(0); else if (v.length >= 15 && h.time - b.time < 500 && b.delta - h.delta >= 1 && h.delta <= 6) {
                var y = o > 0 ? .8 : .2;
                i.mousewheel.lastEventBeforeSnap = h, v.splice(0), i.mousewheel.timeout = n.nextTick((function () {
                  i.slideToClosest(i.params.speed, !0, void 0, y)
                }), 0)
              }
              i.mousewheel.timeout || (i.mousewheel.timeout = n.nextTick((function () {
                i.mousewheel.lastEventBeforeSnap = h, v.splice(0), i.slideToClosest(i.params.speed, !0, void 0, .5)
              }), 500))
            }
            if (p || i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), u === i.minTranslate() || u === i.maxTranslate()) return !0
          }
        } else {
          var w = {time: n.now(), delta: Math.abs(o), direction: Math.sign(o), raw: e},
            x = i.mousewheel.recentWheelEvents;
          x.length >= 2 && x.shift();
          var S = x.length ? x[x.length - 1] : void 0;
          if (x.push(w), S ? (w.direction !== S.direction || w.delta > S.delta) && i.mousewheel.animateSlider(w) : i.mousewheel.animateSlider(w), i.mousewheel.releaseScroll(w)) return !0
        }
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
      }, animateSlider: function (e) {
        return e.delta >= 6 && n.now() - this.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? this.isEnd && !this.params.loop || this.animating || (this.slideNext(), this.emit("scroll", e.raw)) : this.isBeginning && !this.params.loop || this.animating || (this.slidePrev(), this.emit("scroll", e.raw)), this.mousewheel.lastScrollTime = (new t.Date).getTime(), !1)
      }, releaseScroll: function (e) {
        var t = this.params.mousewheel;
        if (e.direction < 0) {
          if (this.isEnd && !this.params.loop && t.releaseOnEdges) return !0
        } else if (this.isBeginning && !this.params.loop && t.releaseOnEdges) return !0;
        return !1
      }, enable: function () {
        var e = te.event();
        if (this.params.cssMode) return this.wrapperEl.removeEventListener(e, this.mousewheel.handle), !0;
        if (!e) return !1;
        if (this.mousewheel.enabled) return !1;
        var t = this.$el;
        return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)), t.on("mouseenter", this.mousewheel.handleMouseEnter), t.on("mouseleave", this.mousewheel.handleMouseLeave), t.on(e, this.mousewheel.handle), this.mousewheel.enabled = !0, !0
      }, disable: function () {
        var e = te.event();
        if (this.params.cssMode) return this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0;
        if (!e) return !1;
        if (!this.mousewheel.enabled) return !1;
        var t = this.$el;
        return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)), t.off(e, this.mousewheel.handle), this.mousewheel.enabled = !1, !0
      }
    }, ie = {
      update: function () {
        var e = this.params.navigation;
        if (!this.params.loop) {
          var t = this.navigation, i = t.$nextEl, s = t.$prevEl;
          s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)), i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass))
        }
      }, onPrevClick: function (e) {
        e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev()
      }, onNextClick: function (e) {
        e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext()
      }, init: function () {
        var e, t, i = this.params.navigation;
        (i.nextEl || i.prevEl) && (i.nextEl && (e = s(i.nextEl), this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))), i.prevEl && (t = s(i.prevEl), this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))), e && e.length > 0 && e.on("click", this.navigation.onNextClick), t && t.length > 0 && t.on("click", this.navigation.onPrevClick), n.extend(this.navigation, {
          $nextEl: e,
          nextEl: e && e[0],
          $prevEl: t,
          prevEl: t && t[0]
        }))
      }, destroy: function () {
        var e = this.navigation, t = e.$nextEl, i = e.$prevEl;
        t && t.length && (t.off("click", this.navigation.onNextClick), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click", this.navigation.onPrevClick), i.removeClass(this.params.navigation.disabledClass))
      }
    }, se = {
      update: function () {
        var e = this.rtl, t = this.params.pagination;
        if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
          var i, a = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
            r = this.pagination.$el,
            n = this.params.loop ? Math.ceil((a - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
          if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > a - 1 - 2 * this.loopedSlides && (i -= a - 2 * this.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== this.params.paginationType && (i = n + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
            var o, l, d, h = this.pagination.bullets;
            if (t.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"), t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex, this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)), o = i - this.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2), h.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"), r.length > 1) h.each((function (e, a) {
              var r = s(a), n = r.index();
              n === i && r.addClass(t.bulletActiveClass), t.dynamicBullets && (n >= o && n <= l && r.addClass(t.bulletActiveClass + "-main"), n === o && r.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), n === l && r.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"))
            })); else {
              var c = h.eq(i), p = c.index();
              if (c.addClass(t.bulletActiveClass), t.dynamicBullets) {
                for (var u = h.eq(o), m = h.eq(l), f = o; f <= l; f += 1) h.eq(f).addClass(t.bulletActiveClass + "-main");
                if (this.params.loop) if (p >= h.length - t.dynamicMainBullets) {
                  for (var v = t.dynamicMainBullets; v >= 0; v -= 1) h.eq(h.length - v).addClass(t.bulletActiveClass + "-main");
                  h.eq(h.length - t.dynamicMainBullets - 1).addClass(t.bulletActiveClass + "-prev")
                } else u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), m.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"); else u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), m.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next")
              }
            }
            if (t.dynamicBullets) {
              var g = Math.min(h.length, t.dynamicMainBullets + 4),
                b = (this.pagination.bulletSize * g - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize,
                y = e ? "right" : "left";
              h.css(this.isHorizontal() ? y : "top", b + "px")
            }
          }
          if ("fraction" === t.type && (r.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)), r.find("." + t.totalClass).text(t.formatFractionTotal(n))), "progressbar" === t.type) {
            var w;
            w = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
            var x = (i + 1) / n, S = 1, E = 1;
            "horizontal" === w ? S = x : E = x, r.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + S + ") scaleY(" + E + ")").transition(this.params.speed)
          }
          "custom" === t.type && t.renderCustom ? (r.html(t.renderCustom(this, i + 1, n)), this.emit("paginationRender", this, r[0])) : this.emit("paginationUpdate", this, r[0]), r[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass)
        }
      }, render: function () {
        var e = this.params.pagination;
        if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
          var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
            i = this.pagination.$el, s = "";
          if ("bullets" === e.type) {
            for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1) e.renderBullet ? s += e.renderBullet.call(this, r, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
            i.html(s), this.pagination.bullets = i.find("." + e.bulletClass)
          }
          "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>', i.html(s)), "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>', i.html(s)), "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0])
        }
      }, init: function () {
        var e = this, t = e.params.pagination;
        if (t.el) {
          var i = s(t.el);
          0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", "." + t.bulletClass, (function (t) {
            t.preventDefault();
            var i = s(this).index() * e.params.slidesPerGroup;
            e.params.loop && (i += e.loopedSlides), e.slideTo(i)
          })), n.extend(e.pagination, {$el: i, el: i[0]}))
        }
      }, destroy: function () {
        var e = this.params.pagination;
        if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
          var t = this.pagination.$el;
          t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass)
        }
      }
    }, ae = {
      setTranslate: function () {
        if (this.params.scrollbar.el && this.scrollbar.el) {
          var e = this.scrollbar, t = this.rtlTranslate, i = this.progress, s = e.dragSize, a = e.trackSize,
            r = e.$dragEl, n = e.$el, o = this.params.scrollbar, l = s, d = (a - s) * i;
          t ? (d = -d) > 0 ? (l = s - d, d = 0) : -d + s > a && (l = a + d) : d < 0 ? (l = s + d, d = 0) : d + s > a && (l = a - d), this.isHorizontal() ? (r.transform("translate3d(" + d + "px, 0, 0)"), r[0].style.width = l + "px") : (r.transform("translate3d(0px, " + d + "px, 0)"), r[0].style.height = l + "px"), o.hide && (clearTimeout(this.scrollbar.timeout), n[0].style.opacity = 1, this.scrollbar.timeout = setTimeout((function () {
            n[0].style.opacity = 0, n.transition(400)
          }), 1e3))
        }
      }, setTransition: function (e) {
        this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
      }, updateSize: function () {
        if (this.params.scrollbar.el && this.scrollbar.el) {
          var e = this.scrollbar, t = e.$dragEl, i = e.$el;
          t[0].style.width = "", t[0].style.height = "";
          var s, a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, r = this.size / this.virtualSize,
            o = r * (a / this.size);
          s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px", i[0].style.display = r >= 1 ? "none" : "", this.params.scrollbar.hide && (i[0].style.opacity = 0), n.extend(e, {
            trackSize: a,
            divider: r,
            moveDivider: o,
            dragSize: s
          }), e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass)
        }
      }, getPointerPosition: function (e) {
        return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
      }, setDragPosition: function (e) {
        var t, i = this.scrollbar, s = this.rtlTranslate, a = i.$el, r = i.dragSize, n = i.trackSize, o = i.dragStartPos;
        t = (i.getPointerPosition(e) - a.offset()[this.isHorizontal() ? "left" : "top"] - (null !== o ? o : r / 2)) / (n - r), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
        var l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
        this.updateProgress(l), this.setTranslate(l), this.updateActiveIndex(), this.updateSlidesClasses()
      }, onDragStart: function (e) {
        var t = this.params.scrollbar, i = this.scrollbar, s = this.$wrapperEl, a = i.$el, r = i.$dragEl;
        this.scrollbar.isTouched = !0, this.scrollbar.dragStartPos = e.target === r[0] || e.target === r ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), r.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), a.transition(0), t.hide && a.css("opacity", 1), this.params.cssMode && this.$wrapperEl.css("scroll-snap-type", "none"), this.emit("scrollbarDragStart", e)
      }, onDragMove: function (e) {
        var t = this.scrollbar, i = this.$wrapperEl, s = t.$el, a = t.$dragEl;
        this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), s.transition(0), a.transition(0), this.emit("scrollbarDragMove", e))
      }, onDragEnd: function (e) {
        var t = this.params.scrollbar, i = this.scrollbar, s = this.$wrapperEl, a = i.$el;
        this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, this.params.cssMode && (this.$wrapperEl.css("scroll-snap-type", ""), s.transition("")), t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = n.nextTick((function () {
          a.css("opacity", 0), a.transition(400)
        }), 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideToClosest())
      }, enableDraggable: function () {
        if (this.params.scrollbar.el) {
          var t = this.scrollbar, i = this.touchEventsTouch, s = this.touchEventsDesktop, a = this.params, r = t.$el[0],
            n = !(!o.passiveListener || !a.passiveListeners) && {passive: !1, capture: !1},
            l = !(!o.passiveListener || !a.passiveListeners) && {passive: !0, capture: !1};
          o.touch ? (r.addEventListener(i.start, this.scrollbar.onDragStart, n), r.addEventListener(i.move, this.scrollbar.onDragMove, n), r.addEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.addEventListener(s.start, this.scrollbar.onDragStart, n), e.addEventListener(s.move, this.scrollbar.onDragMove, n), e.addEventListener(s.end, this.scrollbar.onDragEnd, l))
        }
      }, disableDraggable: function () {
        if (this.params.scrollbar.el) {
          var t = this.scrollbar, i = this.touchEventsTouch, s = this.touchEventsDesktop, a = this.params, r = t.$el[0],
            n = !(!o.passiveListener || !a.passiveListeners) && {passive: !1, capture: !1},
            l = !(!o.passiveListener || !a.passiveListeners) && {passive: !0, capture: !1};
          o.touch ? (r.removeEventListener(i.start, this.scrollbar.onDragStart, n), r.removeEventListener(i.move, this.scrollbar.onDragMove, n), r.removeEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n), e.removeEventListener(s.move, this.scrollbar.onDragMove, n), e.removeEventListener(s.end, this.scrollbar.onDragEnd, l))
        }
      }, init: function () {
        if (this.params.scrollbar.el) {
          var e = this.scrollbar, t = this.$el, i = this.params.scrollbar, a = s(i.el);
          this.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === t.find(i.el).length && (a = t.find(i.el));
          var r = a.find("." + this.params.scrollbar.dragClass);
          0 === r.length && (r = s('<div class="' + this.params.scrollbar.dragClass + '"></div>'), a.append(r)), n.extend(e, {
            $el: a,
            el: a[0],
            $dragEl: r,
            dragEl: r[0]
          }), i.draggable && e.enableDraggable()
        }
      }, destroy: function () {
        this.scrollbar.disableDraggable()
      }
    }, re = {
      setTransform: function (e, t) {
        var i = this.rtl, a = s(e), r = i ? -1 : 1, n = a.attr("data-swiper-parallax") || "0",
          o = a.attr("data-swiper-parallax-x"), l = a.attr("data-swiper-parallax-y"),
          d = a.attr("data-swiper-parallax-scale"), h = a.attr("data-swiper-parallax-opacity");
        if (o || l ? (o = o || "0", l = l || "0") : this.isHorizontal() ? (o = n, l = "0") : (l = n, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * r + "%" : o * t * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", null != h) {
          var c = h - (h - 1) * (1 - Math.abs(t));
          a[0].style.opacity = c
        }
        if (null == d) a.transform("translate3d(" + o + ", " + l + ", 0px)"); else {
          var p = d - (d - 1) * (1 - Math.abs(t));
          a.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + p + ")")
        }
      }, setTranslate: function () {
        var e = this, t = e.$el, i = e.slides, a = e.progress, r = e.snapGrid;
        t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t, i) {
          e.parallax.setTransform(i, a)
        })), i.each((function (t, i) {
          var n = i.progress;
          e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(t / 2) - a * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), s(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t, i) {
            e.parallax.setTransform(i, n)
          }))
        }))
      }, setTransition: function (e) {
        void 0 === e && (e = this.params.speed), this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t, i) {
          var a = s(i), r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
          0 === e && (r = 0), a.transition(r)
        }))
      }
    }, ne = {
      getDistanceBetweenTouches: function (e) {
        if (e.targetTouches.length < 2) return 1;
        var t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, s = e.targetTouches[1].pageX,
          a = e.targetTouches[1].pageY;
        return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2))
      }, onGestureStart: function (e) {
        var t = this.params.zoom, i = this.zoom, a = i.gesture;
        if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !o.gestures) {
          if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
          i.fakeGestureTouched = !0, a.scaleStart = ne.getDistanceBetweenTouches(e)
        }
        a.$slideEl && a.$slideEl.length || (a.$slideEl = s(e.target).closest("." + this.params.slideClass), 0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)), a.$imageEl = a.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass), a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio, 0 !== a.$imageWrapEl.length) ? (a.$imageEl.transition(0), this.zoom.isScaling = !0) : a.$imageEl = void 0
      }, onGestureChange: function (e) {
        var t = this.params.zoom, i = this.zoom, s = i.gesture;
        if (!o.gestures) {
          if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
          i.fakeGestureMoved = !0, s.scaleMove = ne.getDistanceBetweenTouches(e)
        }
        s.$imageEl && 0 !== s.$imageEl.length && (i.scale = o.gestures ? e.scale * i.currentScale : s.scaleMove / s.scaleStart * i.currentScale, i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
      }, onGestureEnd: function (e) {
        var t = this.params.zoom, i = this.zoom, s = i.gesture;
        if (!o.gestures) {
          if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
          if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !z.android) return;
          i.fakeGestureTouched = !1, i.fakeGestureMoved = !1
        }
        s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio), s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (s.$slideEl = void 0))
      }, onTouchStart: function (e) {
        var t = this.zoom, i = t.gesture, s = t.image;
        i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (z.android && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
      }, onTouchMove: function (e) {
        var t = this.zoom, i = t.gesture, s = t.image, a = t.velocity;
        if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, s.isTouched && i.$slideEl)) {
          s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = n.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = n.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (s.startX = -s.startX, s.startY = -s.startY));
          var r = s.width * t.scale, o = s.height * t.scale;
          if (!(r < i.slideWidth && o < i.slideHeight)) {
            if (s.minX = Math.min(i.slideWidth / 2 - r / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !t.isScaling) {
              if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void (s.isTouched = !1);
              if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void (s.isTouched = !1)
            }
            e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x), a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y), a.prevTime || (a.prevTime = Date.now()), a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2, a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2, Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0), Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0), a.prevPositionX = s.touchesCurrent.x, a.prevPositionY = s.touchesCurrent.y, a.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
          }
        }
      }, onTouchEnd: function () {
        var e = this.zoom, t = e.gesture, i = e.image, s = e.velocity;
        if (t.$imageEl && 0 !== t.$imageEl.length) {
          if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void (i.isMoved = !1);
          i.isTouched = !1, i.isMoved = !1;
          var a = 300, r = 300, n = s.x * a, o = i.currentX + n, l = s.y * r, d = i.currentY + l;
          0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
          var h = Math.max(a, r);
          i.currentX = o, i.currentY = d;
          var c = i.width * e.scale, p = i.height * e.scale;
          i.minX = Math.min(t.slideWidth / 2 - c / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - p / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
        }
      }, onTransitionEnd: function () {
        var e = this.zoom, t = e.gesture;
        t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
      }, toggle: function (e) {
        var t = this.zoom;
        t.scale && 1 !== t.scale ? t.out() : t.in(e)
      }, in: function (e) {
        var t, i, s, a, r, n, o, l, d, h, c, p, u, m, f, v, g = this.zoom, b = this.params.zoom, y = g.gesture,
          w = g.image;
        y.$slideEl || (y.$slideEl = this.slides.eq(this.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), y.$imageWrapEl = y.$imageEl.parent("." + b.containerClass)), y.$imageEl && 0 !== y.$imageEl.length && (y.$slideEl.addClass("" + b.zoomedSlideClass), void 0 === w.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = w.touchesStart.x, i = w.touchesStart.y), g.scale = y.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, g.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, e ? (f = y.$slideEl[0].offsetWidth, v = y.$slideEl[0].offsetHeight, s = y.$slideEl.offset().left + f / 2 - t, a = y.$slideEl.offset().top + v / 2 - i, o = y.$imageEl[0].offsetWidth, l = y.$imageEl[0].offsetHeight, d = o * g.scale, h = l * g.scale, u = -(c = Math.min(f / 2 - d / 2, 0)), m = -(p = Math.min(v / 2 - h / 2, 0)), (r = s * g.scale) < c && (r = c), r > u && (r = u), (n = a * g.scale) < p && (n = p), n > m && (n = m)) : (r = 0, n = 0), y.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + g.scale + ")"))
      }, out: function () {
        var e = this.zoom, t = this.params.zoom, i = e.gesture;
        i.$slideEl || (i.$slideEl = this.slides.eq(this.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1, e.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + t.zoomedSlideClass), i.$slideEl = void 0)
      }, enable: function () {
        var e = this.zoom;
        if (!e.enabled) {
          e.enabled = !0;
          var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && {
            passive: !0,
            capture: !1
          }, i = !o.passiveListener || {passive: !1, capture: !0}, s = "." + this.params.slideClass;
          o.gestures ? (this.$wrapperEl.on("gesturestart", s, e.onGestureStart, t), this.$wrapperEl.on("gesturechange", s, e.onGestureChange, t), this.$wrapperEl.on("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, s, e.onGestureStart, t), this.$wrapperEl.on(this.touchEvents.move, s, e.onGestureChange, i), this.$wrapperEl.on(this.touchEvents.end, s, e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.on(this.touchEvents.cancel, s, e.onGestureEnd, t)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
        }
      }, disable: function () {
        var e = this.zoom;
        if (e.enabled) {
          this.zoom.enabled = !1;
          var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && {
            passive: !0,
            capture: !1
          }, i = !o.passiveListener || {passive: !1, capture: !0}, s = "." + this.params.slideClass;
          o.gestures ? (this.$wrapperEl.off("gesturestart", s, e.onGestureStart, t), this.$wrapperEl.off("gesturechange", s, e.onGestureChange, t), this.$wrapperEl.off("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, s, e.onGestureStart, t), this.$wrapperEl.off(this.touchEvents.move, s, e.onGestureChange, i), this.$wrapperEl.off(this.touchEvents.end, s, e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.off(this.touchEvents.cancel, s, e.onGestureEnd, t)), this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
        }
      }
    }, oe = {
      loadInSlide: function (e, t) {
        void 0 === t && (t = !0);
        var i = this, a = i.params.lazy;
        if (void 0 !== e && 0 !== i.slides.length) {
          var r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
            n = r.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
          !r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || (n = n.add(r[0])), 0 !== n.length && n.each((function (e, n) {
            var o = s(n);
            o.addClass(a.loadingClass);
            var l = o.attr("data-background"), d = o.attr("data-src"), h = o.attr("data-srcset"),
              c = o.attr("data-sizes");
            i.loadImage(o[0], d || l, h, c, !1, (function () {
              if (null != i && i && (!i || i.params) && !i.destroyed) {
                if (l ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background")) : (h && (o.attr("srcset", h), o.removeAttr("data-srcset")), c && (o.attr("sizes", c), o.removeAttr("data-sizes")), d && (o.attr("src", d), o.removeAttr("data-src"))), o.addClass(a.loadedClass).removeClass(a.loadingClass), r.find("." + a.preloaderClass).remove(), i.params.loop && t) {
                  var e = r.attr("data-swiper-slide-index");
                  if (r.hasClass(i.params.slideDuplicateClass)) {
                    var s = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                    i.lazy.loadInSlide(s.index(), !1)
                  } else {
                    var n = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                    i.lazy.loadInSlide(n.index(), !1)
                  }
                }
                i.emit("lazyImageReady", r[0], o[0]), i.params.autoHeight && i.updateAutoHeight()
              }
            })), i.emit("lazyImageLoad", r[0], o[0])
          }))
        }
      }, load: function () {
        var e = this, t = e.$wrapperEl, i = e.params, a = e.slides, r = e.activeIndex, n = e.virtual && i.virtual.enabled,
          o = i.lazy, l = i.slidesPerView;

        function d(e) {
          if (n) {
            if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
          } else if (a[e]) return !0;
          return !1
        }

        function h(e) {
          return n ? s(e).attr("data-swiper-slide-index") : s(e).index()
        }

        if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each((function (t, i) {
          var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
          e.lazy.loadInSlide(a)
        })); else if (l > 1) for (var c = r; c < r + l; c += 1) d(c) && e.lazy.loadInSlide(c); else e.lazy.loadInSlide(r);
        if (o.loadPrevNext) if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
          for (var p = o.loadPrevNextAmount, u = l, m = Math.min(r + u + Math.max(p, u), a.length), f = Math.max(r - Math.max(u, p), 0), v = r + l; v < m; v += 1) d(v) && e.lazy.loadInSlide(v);
          for (var g = f; g < r; g += 1) d(g) && e.lazy.loadInSlide(g)
        } else {
          var b = t.children("." + i.slideNextClass);
          b.length > 0 && e.lazy.loadInSlide(h(b));
          var y = t.children("." + i.slidePrevClass);
          y.length > 0 && e.lazy.loadInSlide(h(y))
        }
      }
    }, le = {
      LinearSpline: function (e, t) {
        var i, s, a, r, n;
        return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
          return e ? (n = function (e, t) {
            for (s = -1, i = e.length; i - s > 1;) e[a = i + s >> 1] <= t ? s = a : i = a;
            return i
          }(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
        }, this
      }, getInterpolateFunction: function (e) {
        this.controller.spline || (this.controller.spline = this.params.loop ? new le.LinearSpline(this.slidesGrid, e.slidesGrid) : new le.LinearSpline(this.snapGrid, e.snapGrid))
      }, setTranslate: function (e, t) {
        var i, s, a = this, r = a.controller.control;

        function n(e) {
          var t = a.rtlTranslate ? -a.translate : a.translate;
          "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), s = -a.controller.spline.interpolate(-t)), s && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()), s = (t - a.minTranslate()) * i + e.minTranslate()), a.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, a), e.updateActiveIndex(), e.updateSlidesClasses()
        }

        if (Array.isArray(r)) for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof Y && n(r[o]); else r instanceof Y && t !== r && n(r)
      }, setTransition: function (e, t) {
        var i, s = this, a = s.controller.control;

        function r(t) {
          t.setTransition(e, s), 0 !== e && (t.transitionStart(), t.params.autoHeight && n.nextTick((function () {
            t.updateAutoHeight()
          })), t.$wrapperEl.transitionEnd((function () {
            a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd())
          })))
        }

        if (Array.isArray(a)) for (i = 0; i < a.length; i += 1) a[i] !== t && a[i] instanceof Y && r(a[i]); else a instanceof Y && t !== a && r(a)
      }
    }, de = {
      makeElFocusable: function (e) {
        return e.attr("tabIndex", "0"), e
      }, addElRole: function (e, t) {
        return e.attr("role", t), e
      }, addElLabel: function (e, t) {
        return e.attr("aria-label", t), e
      }, disableEl: function (e) {
        return e.attr("aria-disabled", !0), e
      }, enableEl: function (e) {
        return e.attr("aria-disabled", !1), e
      }, onEnterKey: function (e) {
        var t = this.params.a11y;
        if (13 === e.keyCode) {
          var i = s(e.target);
          this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)), this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)), this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click()
        }
      }, notify: function (e) {
        var t = this.a11y.liveRegion;
        0 !== t.length && (t.html(""), t.html(e))
      }, updateNavigation: function () {
        if (!this.params.loop && this.navigation) {
          var e = this.navigation, t = e.$nextEl, i = e.$prevEl;
          i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t))
        }
      }, updatePagination: function () {
        var e = this, t = e.params.a11y;
        e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function (i, a) {
          var r = s(a);
          e.a11y.makeElFocusable(r), e.a11y.addElRole(r, "button"), e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1))
        }))
      }, init: function () {
        this.$el.append(this.a11y.liveRegion);
        var e, t, i = this.params.a11y;
        this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
      }, destroy: function () {
        var e, t;
        this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
      }
    }, he = {
      init: function () {
        if (this.params.history) {
          if (!t.history || !t.history.pushState) return this.params.history.enabled = !1, void (this.params.hashNavigation.enabled = !0);
          var e = this.history;
          e.initialized = !0, e.paths = he.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState))
        }
      }, destroy: function () {
        this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState)
      }, setHistoryPopState: function () {
        this.history.paths = he.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
      }, getPathValues: function () {
        var e = t.location.pathname.slice(1).split("/").filter((function (e) {
          return "" !== e
        })), i = e.length;
        return {key: e[i - 2], value: e[i - 1]}
      }, setHistory: function (e, i) {
        if (this.history.initialized && this.params.history.enabled) {
          var s = this.slides.eq(i), a = he.slugify(s.attr("data-history"));
          t.location.pathname.includes(e) || (a = e + "/" + a);
          var r = t.history.state;
          r && r.value === a || (this.params.history.replaceState ? t.history.replaceState({value: a}, null, a) : t.history.pushState({value: a}, null, a))
        }
      }, slugify: function (e) {
        return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
      }, scrollToSlide: function (e, t, i) {
        if (t) for (var s = 0, a = this.slides.length; s < a; s += 1) {
          var r = this.slides.eq(s);
          if (he.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
            var n = r.index();
            this.slideTo(n, e, i)
          }
        } else this.slideTo(0, e, i)
      }
    }, ce = {
      onHashCange: function () {
        var t = e.location.hash.replace("#", "");
        if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
          var i = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index();
          if (void 0 === i) return;
          this.slideTo(i)
        }
      }, setHash: function () {
        if (this.hashNavigation.initialized && this.params.hashNavigation.enabled) if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""); else {
          var i = this.slides.eq(this.activeIndex), s = i.attr("data-hash") || i.attr("data-history");
          e.location.hash = s || ""
        }
      }, init: function () {
        if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
          this.hashNavigation.initialized = !0;
          var i = e.location.hash.replace("#", "");
          if (i) for (var a = 0, r = this.slides.length; a < r; a += 1) {
            var n = this.slides.eq(a);
            if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) {
              var o = n.index();
              this.slideTo(o, 0, this.params.runCallbacksOnInit, !0)
            }
          }
          this.params.hashNavigation.watchState && s(t).on("hashchange", this.hashNavigation.onHashCange)
        }
      }, destroy: function () {
        this.params.hashNavigation.watchState && s(t).off("hashchange", this.hashNavigation.onHashCange)
      }
    }, pe = {
      run: function () {
        var e = this, t = e.slides.eq(e.activeIndex), i = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = n.nextTick((function () {
          e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), e.params.cssMode && e.autoplay.running && e.autoplay.run()
        }), i)
      }, start: function () {
        return void 0 === this.autoplay.timeout && !this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0)
      }, stop: function () {
        return !!this.autoplay.running && void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0)
      }, pause: function (e) {
        this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout), this.autoplay.paused = !0, 0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd), this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1, this.autoplay.run())))
      }
    }, ue = {
      setTranslate: function () {
        for (var e = this.slides, t = 0; t < e.length; t += 1) {
          var i = this.slides.eq(t), s = -i[0].swiperSlideOffset;
          this.params.virtualTranslate || (s -= this.translate);
          var a = 0;
          this.isHorizontal() || (a = s, s = 0);
          var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
          i.css({opacity: r}).transform("translate3d(" + s + "px, " + a + "px, 0px)")
        }
      }, setTransition: function (e) {
        var t = this, i = t.slides, s = t.$wrapperEl;
        if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
          var a = !1;
          i.transitionEnd((function () {
            if (!a && t && !t.destroyed) {
              a = !0, t.animating = !1;
              for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) s.trigger(e[i])
            }
          }))
        }
      }
    }, me = {
      setTranslate: function () {
        var e, t = this.$el, i = this.$wrapperEl, a = this.slides, r = this.width, n = this.height, o = this.rtlTranslate,
          l = this.size, d = this.params.cubeEffect, h = this.isHorizontal(),
          c = this.virtual && this.params.virtual.enabled, p = 0;
        d.shadow && (h ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({height: r + "px"})) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), t.append(e)));
        for (var u = 0; u < a.length; u += 1) {
          var m = a.eq(u), f = u;
          c && (f = parseInt(m.attr("data-swiper-slide-index"), 10));
          var v = 90 * f, g = Math.floor(v / 360);
          o && (v = -v, g = Math.floor(-v / 360));
          var b = Math.max(Math.min(m[0].progress, 1), -1), y = 0, w = 0, x = 0;
          f % 4 == 0 ? (y = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (y = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (y = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (y = -l, x = 3 * l + 4 * l * g), o && (y = -y), h || (w = y, y = 0);
          var S = "rotateX(" + (h ? 0 : -v) + "deg) rotateY(" + (h ? v : 0) + "deg) translate3d(" + y + "px, " + w + "px, " + x + "px)";
          if (b <= 1 && b > -1 && (p = 90 * f + 90 * b, o && (p = 90 * -f - 90 * b)), m.transform(S), d.slideShadows) {
            var E = h ? m.find(".swiper-slide-shadow-left") : m.find(".swiper-slide-shadow-top"),
              C = h ? m.find(".swiper-slide-shadow-right") : m.find(".swiper-slide-shadow-bottom");
            0 === E.length && (E = s('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'), m.append(E)), 0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'), m.append(C)), E.length && (E[0].style.opacity = Math.max(-b, 0)), C.length && (C[0].style.opacity = Math.max(b, 0))
          }
        }
        if (i.css({
          "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
          "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
          "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
          "transform-origin": "50% 50% -" + l / 2 + "px"
        }), d.shadow) if (h) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")"); else {
          var T = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90),
            M = 1.5 - (Math.sin(2 * T * Math.PI / 360) / 2 + Math.cos(2 * T * Math.PI / 360) / 2), P = d.shadowScale,
            k = d.shadowScale / M, L = d.shadowOffset;
          e.transform("scale3d(" + P + ", 1, " + k + ") translate3d(0px, " + (n / 2 + L) + "px, " + -n / 2 / k + "px) rotateX(-90deg)")
        }
        var D = R.isSafari || R.isUiWebView ? -l / 2 : 0;
        i.transform("translate3d(0px,0," + D + "px) rotateX(" + (this.isHorizontal() ? 0 : p) + "deg) rotateY(" + (this.isHorizontal() ? -p : 0) + "deg)")
      }, setTransition: function (e) {
        var t = this.$el;
        this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
      }
    }, fe = {
      setTranslate: function () {
        for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
          var a = e.eq(i), r = a[0].progress;
          this.params.flipEffect.limitRotation && (r = Math.max(Math.min(a[0].progress, 1), -1));
          var n = -180 * r, o = 0, l = -a[0].swiperSlideOffset, d = 0;
          if (this.isHorizontal() ? t && (n = -n) : (d = l, l = 0, o = -n, n = 0), a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length, this.params.flipEffect.slideShadows) {
            var h = this.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"),
              c = this.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
            0 === h.length && (h = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), a.append(h)), 0 === c.length && (c = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), a.append(c)), h.length && (h[0].style.opacity = Math.max(-r, 0)), c.length && (c[0].style.opacity = Math.max(r, 0))
          }
          a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
        }
      }, setTransition: function (e) {
        var t = this, i = t.slides, s = t.activeIndex, a = t.$wrapperEl;
        if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
          var r = !1;
          i.eq(s).transitionEnd((function () {
            if (!r && t && !t.destroyed) {
              r = !0, t.animating = !1;
              for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) a.trigger(e[i])
            }
          }))
        }
      }
    }, ve = {
      setTranslate: function () {
        for (var e = this.width, t = this.height, i = this.slides, a = this.$wrapperEl, r = this.slidesSizesGrid, n = this.params.coverflowEffect, l = this.isHorizontal(), d = this.translate, h = l ? e / 2 - d : t / 2 - d, c = l ? n.rotate : -n.rotate, p = n.depth, u = 0, m = i.length; u < m; u += 1) {
          var f = i.eq(u), v = r[u], g = (h - f[0].swiperSlideOffset - v / 2) / v * n.modifier, b = l ? c * g : 0,
            y = l ? 0 : c * g, w = -p * Math.abs(g), x = n.stretch;
          "string" == typeof x && -1 !== x.indexOf("%") && (x = parseFloat(n.stretch) / 100 * v);
          var S = l ? 0 : x * g, E = l ? x * g : 0;
          Math.abs(E) < .001 && (E = 0), Math.abs(S) < .001 && (S = 0), Math.abs(w) < .001 && (w = 0), Math.abs(b) < .001 && (b = 0), Math.abs(y) < .001 && (y = 0);
          var C = "translate3d(" + E + "px," + S + "px," + w + "px)  rotateX(" + y + "deg) rotateY(" + b + "deg)";
          if (f.transform(C), f[0].style.zIndex = 1 - Math.abs(Math.round(g)), n.slideShadows) {
            var T = l ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
              M = l ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
            0 === T.length && (T = s('<div class="swiper-slide-shadow-' + (l ? "left" : "top") + '"></div>'), f.append(T)), 0 === M.length && (M = s('<div class="swiper-slide-shadow-' + (l ? "right" : "bottom") + '"></div>'), f.append(M)), T.length && (T[0].style.opacity = g > 0 ? g : 0), M.length && (M[0].style.opacity = -g > 0 ? -g : 0)
          }
        }
        (o.pointerEvents || o.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = h + "px 50%")
      }, setTransition: function (e) {
        this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
      }
    }, ge = {
      init: function () {
        var e = this.params.thumbs, t = this.constructor;
        e.swiper instanceof t ? (this.thumbs.swiper = e.swiper, n.extend(this.thumbs.swiper.originalParams, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1
        }), n.extend(this.thumbs.swiper.params, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1
        })) : n.isObject(e.swiper) && (this.thumbs.swiper = new t(n.extend({}, e.swiper, {
          watchSlidesVisibility: !0,
          watchSlidesProgress: !0,
          slideToClickedSlide: !1
        })), this.thumbs.swiperCreated = !0), this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass), this.thumbs.swiper.on("tap", this.thumbs.onThumbClick)
      }, onThumbClick: function () {
        var e = this.thumbs.swiper;
        if (e) {
          var t = e.clickedIndex, i = e.clickedSlide;
          if (!(i && s(i).hasClass(this.params.thumbs.slideThumbActiveClass) || null == t)) {
            var a;
            if (a = e.params.loop ? parseInt(s(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t, this.params.loop) {
              var r = this.activeIndex;
              this.slides.eq(r).hasClass(this.params.slideDuplicateClass) && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, r = this.activeIndex);
              var n = this.slides.eq(r).prevAll('[data-swiper-slide-index="' + a + '"]').eq(0).index(),
                o = this.slides.eq(r).nextAll('[data-swiper-slide-index="' + a + '"]').eq(0).index();
              a = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
            }
            this.slideTo(a)
          }
        }
      }, update: function (e) {
        var t = this.thumbs.swiper;
        if (t) {
          var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView;
          if (this.realIndex !== t.realIndex) {
            var s, a = t.activeIndex;
            if (t.params.loop) {
              t.slides.eq(a).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, a = t.activeIndex);
              var r = t.slides.eq(a).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(),
                n = t.slides.eq(a).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index();
              s = void 0 === r ? n : void 0 === n ? r : n - a == a - r ? a : n - a < a - r ? n : r
            } else s = this.realIndex;
            t.visibleSlidesIndexes && t.visibleSlidesIndexes.indexOf(s) < 0 && (t.params.centeredSlides ? s = s > a ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : s > a && (s = s - i + 1), t.slideTo(s, e ? 0 : void 0))
          }
          var o = 1, l = this.params.thumbs.slideThumbActiveClass;
          if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (o = this.params.slidesPerView), this.params.thumbs.multipleActiveThumbs || (o = 1), o = Math.floor(o), t.slides.removeClass(l), t.params.loop || t.params.virtual && t.params.virtual.enabled) for (var d = 0; d < o; d += 1) t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + d) + '"]').addClass(l); else for (var h = 0; h < o; h += 1) t.slides.eq(this.realIndex + h).addClass(l)
        }
      }
    }, be = [q, X, W, j, K, Q, ee, {
      name: "mousewheel",
      params: {
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarged: "container"
        }
      },
      create: function () {
        n.extend(this, {
          mousewheel: {
            enabled: !1,
            enable: te.enable.bind(this),
            disable: te.disable.bind(this),
            handle: te.handle.bind(this),
            handleMouseEnter: te.handleMouseEnter.bind(this),
            handleMouseLeave: te.handleMouseLeave.bind(this),
            animateSlider: te.animateSlider.bind(this),
            releaseScroll: te.releaseScroll.bind(this),
            lastScrollTime: n.now(),
            lastEventBeforeSnap: void 0,
            recentWheelEvents: []
          }
        })
      },
      on: {
        init: function () {
          !this.params.mousewheel.enabled && this.params.cssMode && this.mousewheel.disable(), this.params.mousewheel.enabled && this.mousewheel.enable()
        }, destroy: function () {
          this.params.cssMode && this.mousewheel.enable(), this.mousewheel.enabled && this.mousewheel.disable()
        }
      }
    }, {
      name: "navigation",
      params: {
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock"
        }
      },
      create: function () {
        n.extend(this, {
          navigation: {
            init: ie.init.bind(this),
            update: ie.update.bind(this),
            destroy: ie.destroy.bind(this),
            onNextClick: ie.onNextClick.bind(this),
            onPrevClick: ie.onPrevClick.bind(this)
          }
        })
      },
      on: {
        init: function () {
          this.navigation.init(), this.navigation.update()
        }, toEdge: function () {
          this.navigation.update()
        }, fromEdge: function () {
          this.navigation.update()
        }, destroy: function () {
          this.navigation.destroy()
        }, click: function (e) {
          var t, i = this.navigation, a = i.$nextEl, r = i.$prevEl;
          !this.params.navigation.hideOnClick || s(e.target).is(r) || s(e.target).is(a) || (a ? t = a.hasClass(this.params.navigation.hiddenClass) : r && (t = r.hasClass(this.params.navigation.hiddenClass)), !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this), a && a.toggleClass(this.params.navigation.hiddenClass), r && r.toggleClass(this.params.navigation.hiddenClass))
        }
      }
    }, {
      name: "pagination",
      params: {
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: function (e) {
            return e
          },
          formatFractionTotal: function (e) {
            return e
          },
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          modifierClass: "swiper-pagination-",
          currentClass: "swiper-pagination-current",
          totalClass: "swiper-pagination-total",
          hiddenClass: "swiper-pagination-hidden",
          progressbarFillClass: "swiper-pagination-progressbar-fill",
          progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
          clickableClass: "swiper-pagination-clickable",
          lockClass: "swiper-pagination-lock"
        }
      },
      create: function () {
        n.extend(this, {
          pagination: {
            init: se.init.bind(this),
            render: se.render.bind(this),
            update: se.update.bind(this),
            destroy: se.destroy.bind(this),
            dynamicBulletIndex: 0
          }
        })
      },
      on: {
        init: function () {
          this.pagination.init(), this.pagination.render(), this.pagination.update()
        }, activeIndexChange: function () {
          (this.params.loop || void 0 === this.snapIndex) && this.pagination.update()
        }, snapIndexChange: function () {
          this.params.loop || this.pagination.update()
        }, slidesLengthChange: function () {
          this.params.loop && (this.pagination.render(), this.pagination.update())
        }, snapGridLengthChange: function () {
          this.params.loop || (this.pagination.render(), this.pagination.update())
        }, destroy: function () {
          this.pagination.destroy()
        }, click: function (e) {
          this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !s(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this), this.pagination.$el.toggleClass(this.params.pagination.hiddenClass))
        }
      }
    }, {
      name: "scrollbar",
      params: {
        scrollbar: {
          el: null,
          dragSize: "auto",
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
          lockClass: "swiper-scrollbar-lock",
          dragClass: "swiper-scrollbar-drag"
        }
      },
      create: function () {
        n.extend(this, {
          scrollbar: {
            init: ae.init.bind(this),
            destroy: ae.destroy.bind(this),
            updateSize: ae.updateSize.bind(this),
            setTranslate: ae.setTranslate.bind(this),
            setTransition: ae.setTransition.bind(this),
            enableDraggable: ae.enableDraggable.bind(this),
            disableDraggable: ae.disableDraggable.bind(this),
            setDragPosition: ae.setDragPosition.bind(this),
            getPointerPosition: ae.getPointerPosition.bind(this),
            onDragStart: ae.onDragStart.bind(this),
            onDragMove: ae.onDragMove.bind(this),
            onDragEnd: ae.onDragEnd.bind(this),
            isTouched: !1,
            timeout: null,
            dragTimeout: null
          }
        })
      },
      on: {
        init: function () {
          this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
        }, update: function () {
          this.scrollbar.updateSize()
        }, resize: function () {
          this.scrollbar.updateSize()
        }, observerUpdate: function () {
          this.scrollbar.updateSize()
        }, setTranslate: function () {
          this.scrollbar.setTranslate()
        }, setTransition: function (e) {
          this.scrollbar.setTransition(e)
        }, destroy: function () {
          this.scrollbar.destroy()
        }
      }
    }, {
      name: "parallax", params: {parallax: {enabled: !1}}, create: function () {
        n.extend(this, {
          parallax: {
            setTransform: re.setTransform.bind(this),
            setTranslate: re.setTranslate.bind(this),
            setTransition: re.setTransition.bind(this)
          }
        })
      }, on: {
        beforeInit: function () {
          this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
        }, init: function () {
          this.params.parallax.enabled && this.parallax.setTranslate()
        }, setTranslate: function () {
          this.params.parallax.enabled && this.parallax.setTranslate()
        }, setTransition: function (e) {
          this.params.parallax.enabled && this.parallax.setTransition(e)
        }
      }
    }, {
      name: "zoom",
      params: {
        zoom: {
          enabled: !1,
          maxRatio: 3,
          minRatio: 1,
          toggle: !0,
          containerClass: "swiper-zoom-container",
          zoomedSlideClass: "swiper-slide-zoomed"
        }
      },
      create: function () {
        var e = this, t = {
          enabled: !1,
          scale: 1,
          currentScale: 1,
          isScaling: !1,
          gesture: {
            $slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            $imageEl: void 0,
            $imageWrapEl: void 0,
            maxRatio: 3
          },
          image: {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {}
          },
          velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0}
        };
        "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach((function (i) {
          t[i] = ne[i].bind(e)
        })), n.extend(e, {zoom: t});
        var i = 1;
        Object.defineProperty(e.zoom, "scale", {
          get: function () {
            return i
          }, set: function (t) {
            if (i !== t) {
              var s = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                a = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
              e.emit("zoomChange", t, s, a)
            }
            i = t
          }
        })
      },
      on: {
        init: function () {
          this.params.zoom.enabled && this.zoom.enable()
        }, destroy: function () {
          this.zoom.disable()
        }, touchStart: function (e) {
          this.zoom.enabled && this.zoom.onTouchStart(e)
        }, touchEnd: function (e) {
          this.zoom.enabled && this.zoom.onTouchEnd(e)
        }, doubleTap: function (e) {
          this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
        }, transitionEnd: function () {
          this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
        }, slideChange: function () {
          this.zoom.enabled && this.params.zoom.enabled && this.params.cssMode && this.zoom.onTransitionEnd()
        }
      }
    }, {
      name: "lazy",
      params: {
        lazy: {
          enabled: !1,
          loadPrevNext: !1,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: !1,
          elementClass: "swiper-lazy",
          loadingClass: "swiper-lazy-loading",
          loadedClass: "swiper-lazy-loaded",
          preloaderClass: "swiper-lazy-preloader"
        }
      },
      create: function () {
        n.extend(this, {lazy: {initialImageLoaded: !1, load: oe.load.bind(this), loadInSlide: oe.loadInSlide.bind(this)}})
      },
      on: {
        beforeInit: function () {
          this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
        }, init: function () {
          this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
        }, scroll: function () {
          this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
        }, resize: function () {
          this.params.lazy.enabled && this.lazy.load()
        }, scrollbarDragMove: function () {
          this.params.lazy.enabled && this.lazy.load()
        }, transitionStart: function () {
          this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load()
        }, transitionEnd: function () {
          this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
        }, slideChange: function () {
          this.params.lazy.enabled && this.params.cssMode && this.lazy.load()
        }
      }
    }, {
      name: "controller", params: {controller: {control: void 0, inverse: !1, by: "slide"}}, create: function () {
        n.extend(this, {
          controller: {
            control: this.params.controller.control,
            getInterpolateFunction: le.getInterpolateFunction.bind(this),
            setTranslate: le.setTranslate.bind(this),
            setTransition: le.setTransition.bind(this)
          }
        })
      }, on: {
        update: function () {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
        }, resize: function () {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
        }, observerUpdate: function () {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
        }, setTranslate: function (e, t) {
          this.controller.control && this.controller.setTranslate(e, t)
        }, setTransition: function (e, t) {
          this.controller.control && this.controller.setTransition(e, t)
        }
      }
    }, {
      name: "a11y",
      params: {
        a11y: {
          enabled: !0,
          notificationClass: "swiper-notification",
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}"
        }
      },
      create: function () {
        var e = this;
        n.extend(e, {a11y: {liveRegion: s('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')}}), Object.keys(de).forEach((function (t) {
          e.a11y[t] = de[t].bind(e)
        }))
      },
      on: {
        init: function () {
          this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
        }, toEdge: function () {
          this.params.a11y.enabled && this.a11y.updateNavigation()
        }, fromEdge: function () {
          this.params.a11y.enabled && this.a11y.updateNavigation()
        }, paginationUpdate: function () {
          this.params.a11y.enabled && this.a11y.updatePagination()
        }, destroy: function () {
          this.params.a11y.enabled && this.a11y.destroy()
        }
      }
    }, {
      name: "history", params: {history: {enabled: !1, replaceState: !1, key: "slides"}}, create: function () {
        n.extend(this, {
          history: {
            init: he.init.bind(this),
            setHistory: he.setHistory.bind(this),
            setHistoryPopState: he.setHistoryPopState.bind(this),
            scrollToSlide: he.scrollToSlide.bind(this),
            destroy: he.destroy.bind(this)
          }
        })
      }, on: {
        init: function () {
          this.params.history.enabled && this.history.init()
        }, destroy: function () {
          this.params.history.enabled && this.history.destroy()
        }, transitionEnd: function () {
          this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
        }, slideChange: function () {
          this.history.initialized && this.params.cssMode && this.history.setHistory(this.params.history.key, this.activeIndex)
        }
      }
    }, {
      name: "hash-navigation",
      params: {hashNavigation: {enabled: !1, replaceState: !1, watchState: !1}},
      create: function () {
        n.extend(this, {
          hashNavigation: {
            initialized: !1,
            init: ce.init.bind(this),
            destroy: ce.destroy.bind(this),
            setHash: ce.setHash.bind(this),
            onHashCange: ce.onHashCange.bind(this)
          }
        })
      },
      on: {
        init: function () {
          this.params.hashNavigation.enabled && this.hashNavigation.init()
        }, destroy: function () {
          this.params.hashNavigation.enabled && this.hashNavigation.destroy()
        }, transitionEnd: function () {
          this.hashNavigation.initialized && this.hashNavigation.setHash()
        }, slideChange: function () {
          this.hashNavigation.initialized && this.params.cssMode && this.hashNavigation.setHash()
        }
      }
    }, {
      name: "autoplay",
      params: {
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1
        }
      },
      create: function () {
        var e = this;
        n.extend(e, {
          autoplay: {
            running: !1,
            paused: !1,
            run: pe.run.bind(e),
            start: pe.start.bind(e),
            stop: pe.stop.bind(e),
            pause: pe.pause.bind(e),
            onVisibilityChange: function () {
              "hidden" === document.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === document.visibilityState && e.autoplay.paused && (e.autoplay.run(), e.autoplay.paused = !1)
            },
            onTransitionEnd: function (t) {
              e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop())
            }
          }
        })
      },
      on: {
        init: function () {
          this.params.autoplay.enabled && (this.autoplay.start(), document.addEventListener("visibilitychange", this.autoplay.onVisibilityChange))
        }, beforeTransitionStart: function (e, t) {
          this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
        }, sliderFirstMove: function () {
          this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
        }, touchEnd: function () {
          this.params.cssMode && this.autoplay.paused && !this.params.autoplay.disableOnInteraction && this.autoplay.run()
        }, destroy: function () {
          this.autoplay.running && this.autoplay.stop(), document.removeEventListener("visibilitychange", this.autoplay.onVisibilityChange)
        }
      }
    }, {
      name: "effect-fade", params: {fadeEffect: {crossFade: !1}}, create: function () {
        n.extend(this, {
          fadeEffect: {
            setTranslate: ue.setTranslate.bind(this),
            setTransition: ue.setTransition.bind(this)
          }
        })
      }, on: {
        beforeInit: function () {
          if ("fade" === this.params.effect) {
            this.classNames.push(this.params.containerModifierClass + "fade");
            var e = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0
            };
            n.extend(this.params, e), n.extend(this.originalParams, e)
          }
        }, setTranslate: function () {
          "fade" === this.params.effect && this.fadeEffect.setTranslate()
        }, setTransition: function (e) {
          "fade" === this.params.effect && this.fadeEffect.setTransition(e)
        }
      }
    }, {
      name: "effect-cube",
      params: {cubeEffect: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94}},
      create: function () {
        n.extend(this, {
          cubeEffect: {
            setTranslate: me.setTranslate.bind(this),
            setTransition: me.setTransition.bind(this)
          }
        })
      },
      on: {
        beforeInit: function () {
          if ("cube" === this.params.effect) {
            this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
            var e = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              resistanceRatio: 0,
              spaceBetween: 0,
              centeredSlides: !1,
              virtualTranslate: !0
            };
            n.extend(this.params, e), n.extend(this.originalParams, e)
          }
        }, setTranslate: function () {
          "cube" === this.params.effect && this.cubeEffect.setTranslate()
        }, setTransition: function (e) {
          "cube" === this.params.effect && this.cubeEffect.setTransition(e)
        }
      }
    }, {
      name: "effect-flip", params: {flipEffect: {slideShadows: !0, limitRotation: !0}}, create: function () {
        n.extend(this, {
          flipEffect: {
            setTranslate: fe.setTranslate.bind(this),
            setTransition: fe.setTransition.bind(this)
          }
        })
      }, on: {
        beforeInit: function () {
          if ("flip" === this.params.effect) {
            this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
            var e = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0
            };
            n.extend(this.params, e), n.extend(this.originalParams, e)
          }
        }, setTranslate: function () {
          "flip" === this.params.effect && this.flipEffect.setTranslate()
        }, setTransition: function (e) {
          "flip" === this.params.effect && this.flipEffect.setTransition(e)
        }
      }
    }, {
      name: "effect-coverflow",
      params: {coverflowEffect: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0}},
      create: function () {
        n.extend(this, {
          coverflowEffect: {
            setTranslate: ve.setTranslate.bind(this),
            setTransition: ve.setTransition.bind(this)
          }
        })
      },
      on: {
        beforeInit: function () {
          "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
        }, setTranslate: function () {
          "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
        }, setTransition: function (e) {
          "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
        }
      }
    }, {
      name: "thumbs",
      params: {
        thumbs: {
          multipleActiveThumbs: !0,
          swiper: null,
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-container-thumbs"
        }
      },
      create: function () {
        n.extend(this, {
          thumbs: {
            swiper: null,
            init: ge.init.bind(this),
            update: ge.update.bind(this),
            onThumbClick: ge.onThumbClick.bind(this)
          }
        })
      },
      on: {
        beforeInit: function () {
          var e = this.params.thumbs;
          e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0))
        }, slideChange: function () {
          this.thumbs.swiper && this.thumbs.update()
        }, update: function () {
          this.thumbs.swiper && this.thumbs.update()
        }, resize: function () {
          this.thumbs.swiper && this.thumbs.update()
        }, observerUpdate: function () {
          this.thumbs.swiper && this.thumbs.update()
        }, setTransition: function (e) {
          var t = this.thumbs.swiper;
          t && t.setTransition(e)
        }, beforeDestroy: function () {
          var e = this.thumbs.swiper;
          e && this.thumbs.swiperCreated && e && e.destroy()
        }
      }
    }];
  return void 0 === Y.use && (Y.use = Y.Class.use, Y.installModule = Y.Class.installModule), Y.use(be), Y
})), function (e) {
  "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : window.noUiSlider = e()
}((function () {
  "use strict";
  var e = "%%REPLACE_THIS_WITH_VERSION%%";

  function t(e) {
    e.parentElement.removeChild(e)
  }

  function i(e) {
    return null != e
  }

  function s(e) {
    e.preventDefault()
  }

  function a(e) {
    return "number" == typeof e && !isNaN(e) && isFinite(e)
  }

  function r(e, t, i) {
    i > 0 && (d(e, t), setTimeout((function () {
      h(e, t)
    }), i))
  }

  function n(e) {
    return Math.max(Math.min(e, 100), 0)
  }

  function o(e) {
    return Array.isArray(e) ? e : [e]
  }

  function l(e) {
    var t = (e = String(e)).split(".");
    return t.length > 1 ? t[1].length : 0
  }

  function d(e, t) {
    e.classList && !/\s/.test(t) ? e.classList.add(t) : e.className += " " + t
  }

  function h(e, t) {
    e.classList && !/\s/.test(t) ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " ")
  }

  function c(e) {
    var t = void 0 !== window.pageXOffset, i = "CSS1Compat" === (e.compatMode || "");
    return {
      x: t ? window.pageXOffset : i ? e.documentElement.scrollLeft : e.body.scrollLeft,
      y: t ? window.pageYOffset : i ? e.documentElement.scrollTop : e.body.scrollTop
    }
  }

  function p(e, t) {
    return 100 / (t - e)
  }

  function u(e, t, i) {
    return 100 * t / (e[i + 1] - e[i])
  }

  function m(e, t) {
    for (var i = 1; e >= t[i];) i += 1;
    return i
  }

  function f(e, t, i) {
    if (i >= e.slice(-1)[0]) return 100;
    var s = m(i, e), a = e[s - 1], r = e[s], n = t[s - 1], o = t[s];
    return n + function (e, t) {
      return u(e, e[0] < 0 ? t + Math.abs(e[0]) : t - e[0], 0)
    }([a, r], i) / p(n, o)
  }

  function v(e, t, i, s) {
    if (100 === s) return s;
    var a = m(s, e), r = e[a - 1], n = e[a];
    return i ? s - r > (n - r) / 2 ? n : r : t[a - 1] ? e[a - 1] + function (e, t) {
      return Math.round(e / t) * t
    }(s - e[a - 1], t[a - 1]) : s
  }

  function g(t, i, s) {
    var r;
    if ("number" == typeof i && (i = [i]), !Array.isArray(i)) throw new Error("noUiSlider (" + e + "): 'range' contains invalid value.");
    if (!a(r = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t)) || !a(i[0])) throw new Error("noUiSlider (" + e + "): 'range' value isn't numeric.");
    s.xPct.push(r), s.xVal.push(i[0]), r ? s.xSteps.push(!isNaN(i[1]) && i[1]) : isNaN(i[1]) || (s.xSteps[0] = i[1]), s.xHighestCompleteStep.push(0)
  }

  function b(e, t, i) {
    if (t) if (i.xVal[e] !== i.xVal[e + 1]) {
      i.xSteps[e] = u([i.xVal[e], i.xVal[e + 1]], t, 0) / p(i.xPct[e], i.xPct[e + 1]);
      var s = (i.xVal[e + 1] - i.xVal[e]) / i.xNumSteps[e], a = Math.ceil(Number(s.toFixed(3)) - 1),
        r = i.xVal[e] + i.xNumSteps[e] * a;
      i.xHighestCompleteStep[e] = r
    } else i.xSteps[e] = i.xHighestCompleteStep[e] = i.xVal[e]
  }

  function y(e, t, i) {
    var s;
    this.xPct = [], this.xVal = [], this.xSteps = [i || !1], this.xNumSteps = [!1], this.xHighestCompleteStep = [], this.snap = t;
    var a = [];
    for (s in e) e.hasOwnProperty(s) && a.push([e[s], s]);
    for (a.length && "object" == typeof a[0][0] ? a.sort((function (e, t) {
      return e[0][0] - t[0][0]
    })) : a.sort((function (e, t) {
      return e[0] - t[0]
    })), s = 0; s < a.length; s++) g(a[s][1], a[s][0], this);
    for (this.xNumSteps = this.xSteps.slice(0), s = 0; s < this.xNumSteps.length; s++) b(s, this.xNumSteps[s], this)
  }

  y.prototype.getDistance = function (t) {
    var i, s = [];
    for (i = 0; i < this.xNumSteps.length - 1; i++) {
      var a = this.xNumSteps[i];
      if (a && t / a % 1 != 0) throw new Error("noUiSlider (" + e + "): 'limit', 'margin' and 'padding' of " + this.xPct[i] + "% range must be divisible by step.");
      s[i] = u(this.xVal, t, i)
    }
    return s
  }, y.prototype.getAbsoluteDistance = function (e, t, i) {
    var s, a = 0;
    if (e < this.xPct[this.xPct.length - 1]) for (; e > this.xPct[a + 1];) a++; else e === this.xPct[this.xPct.length - 1] && (a = this.xPct.length - 2);
    i || e !== this.xPct[a + 1] || a++;
    var r = 1, n = t[a], o = 0, l = 0, d = 0, h = 0;
    for (s = i ? (e - this.xPct[a]) / (this.xPct[a + 1] - this.xPct[a]) : (this.xPct[a + 1] - e) / (this.xPct[a + 1] - this.xPct[a]); n > 0;) o = this.xPct[a + 1 + h] - this.xPct[a + h], t[a + h] * r + 100 - 100 * s > 100 ? (l = o * s, r = (n - 100 * s) / t[a + h], s = 1) : (l = t[a + h] * o / 100 * r, r = 0), i ? (d -= l, this.xPct.length + h >= 1 && h--) : (d += l, this.xPct.length - h >= 1 && h++), n = t[a + h] * r;
    return e + d
  }, y.prototype.toStepping = function (e) {
    return e = f(this.xVal, this.xPct, e)
  }, y.prototype.fromStepping = function (e) {
    return function (e, t, i) {
      if (i >= 100) return e.slice(-1)[0];
      var s = m(i, t), a = e[s - 1], r = e[s], n = t[s - 1];
      return function (e, t) {
        return t * (e[1] - e[0]) / 100 + e[0]
      }([a, r], (i - n) * p(n, t[s]))
    }(this.xVal, this.xPct, e)
  }, y.prototype.getStep = function (e) {
    return e = v(this.xPct, this.xSteps, this.snap, e)
  }, y.prototype.getDefaultStep = function (e, t, i) {
    var s = m(e, this.xPct);
    return (100 === e || t && e === this.xPct[s - 1]) && (s = Math.max(s - 1, 1)), (this.xVal[s] - this.xVal[s - 1]) / i
  }, y.prototype.getNearbySteps = function (e) {
    var t = m(e, this.xPct);
    return {
      stepBefore: {
        startValue: this.xVal[t - 2],
        step: this.xNumSteps[t - 2],
        highestStep: this.xHighestCompleteStep[t - 2]
      },
      thisStep: {
        startValue: this.xVal[t - 1],
        step: this.xNumSteps[t - 1],
        highestStep: this.xHighestCompleteStep[t - 1]
      },
      stepAfter: {startValue: this.xVal[t], step: this.xNumSteps[t], highestStep: this.xHighestCompleteStep[t]}
    }
  }, y.prototype.countStepDecimals = function () {
    var e = this.xNumSteps.map(l);
    return Math.max.apply(null, e)
  }, y.prototype.convert = function (e) {
    return this.getStep(this.toStepping(e))
  };
  var w = {
    to: function (e) {
      return void 0 !== e && e.toFixed(2)
    }, from: Number
  }, x = {
    target: "target",
    base: "base",
    origin: "origin",
    handle: "handle",
    handleLower: "handle-lower",
    handleUpper: "handle-upper",
    touchArea: "touch-area",
    horizontal: "horizontal",
    vertical: "vertical",
    background: "background",
    connect: "connect",
    connects: "connects",
    ltr: "ltr",
    rtl: "rtl",
    textDirectionLtr: "txt-dir-ltr",
    textDirectionRtl: "txt-dir-rtl",
    draggable: "draggable",
    drag: "state-drag",
    tap: "state-tap",
    active: "active",
    tooltip: "tooltip",
    pips: "pips",
    pipsHorizontal: "pips-horizontal",
    pipsVertical: "pips-vertical",
    marker: "marker",
    markerHorizontal: "marker-horizontal",
    markerVertical: "marker-vertical",
    markerNormal: "marker-normal",
    markerLarge: "marker-large",
    markerSub: "marker-sub",
    value: "value",
    valueHorizontal: "value-horizontal",
    valueVertical: "value-vertical",
    valueNormal: "value-normal",
    valueLarge: "value-large",
    valueSub: "value-sub"
  };

  function S(t) {
    if (function (e) {
      return "object" == typeof e && "function" == typeof e.to && "function" == typeof e.from
    }(t)) return !0;
    throw new Error("noUiSlider (" + e + "): 'format' requires 'to' and 'from' methods.")
  }

  function E(t, i) {
    if (!a(i)) throw new Error("noUiSlider (" + e + "): 'step' is not numeric.");
    t.singleStep = i
  }

  function C(t, i) {
    if (!a(i)) throw new Error("noUiSlider (" + e + "): 'keyboardPageMultiplier' is not numeric.");
    t.keyboardPageMultiplier = i
  }

  function T(t, i) {
    if (!a(i)) throw new Error("noUiSlider (" + e + "): 'keyboardDefaultStep' is not numeric.");
    t.keyboardDefaultStep = i
  }

  function M(t, i) {
    if ("object" != typeof i || Array.isArray(i)) throw new Error("noUiSlider (" + e + "): 'range' is not an object.");
    if (void 0 === i.min || void 0 === i.max) throw new Error("noUiSlider (" + e + "): Missing 'min' or 'max' in 'range'.");
    if (i.min === i.max) throw new Error("noUiSlider (" + e + "): 'range' 'min' and 'max' cannot be equal.");
    t.spectrum = new y(i, t.snap, t.singleStep)
  }

  function P(t, i) {
    if (i = o(i), !Array.isArray(i) || !i.length) throw new Error("noUiSlider (" + e + "): 'start' option is incorrect.");
    t.handles = i.length, t.start = i
  }

  function k(t, i) {
    if (t.snap = i, "boolean" != typeof i) throw new Error("noUiSlider (" + e + "): 'snap' option must be a boolean.")
  }

  function L(t, i) {
    if (t.animate = i, "boolean" != typeof i) throw new Error("noUiSlider (" + e + "): 'animate' option must be a boolean.")
  }

  function D(t, i) {
    if (t.animationDuration = i, "number" != typeof i) throw new Error("noUiSlider (" + e + "): 'animationDuration' option must be a number.")
  }

  function z(t, i) {
    var s, a = [!1];
    if ("lower" === i ? i = [!0, !1] : "upper" === i && (i = [!1, !0]), !0 === i || !1 === i) {
      for (s = 1; s < t.handles; s++) a.push(i);
      a.push(!1)
    } else {
      if (!Array.isArray(i) || !i.length || i.length !== t.handles + 1) throw new Error("noUiSlider (" + e + "): 'connect' option doesn't match handle count.");
      a = i
    }
    t.connect = a
  }

  function $(t, i) {
    switch (i) {
      case"horizontal":
        t.ort = 0;
        break;
      case"vertical":
        t.ort = 1;
        break;
      default:
        throw new Error("noUiSlider (" + e + "): 'orientation' option is invalid.")
    }
  }

  function I(t, i) {
    if (!a(i)) throw new Error("noUiSlider (" + e + "): 'margin' option must be numeric.");
    0 !== i && (t.margin = t.spectrum.getDistance(i))
  }

  function O(t, i) {
    if (!a(i)) throw new Error("noUiSlider (" + e + "): 'limit' option must be numeric.");
    if (t.limit = t.spectrum.getDistance(i), !t.limit || t.handles < 2) throw new Error("noUiSlider (" + e + "): 'limit' option is only supported on linear sliders with 2 or more handles.")
  }

  function N(t, i) {
    var s;
    if (!a(i) && !Array.isArray(i)) throw new Error("noUiSlider (" + e + "): 'padding' option must be numeric or array of exactly 2 numbers.");
    if (Array.isArray(i) && 2 !== i.length && !a(i[0]) && !a(i[1])) throw new Error("noUiSlider (" + e + "): 'padding' option must be numeric or array of exactly 2 numbers.");
    if (0 !== i) {
      for (Array.isArray(i) || (i = [i, i]), t.padding = [t.spectrum.getDistance(i[0]), t.spectrum.getDistance(i[1])], s = 0; s < t.spectrum.xNumSteps.length - 1; s++) if (t.padding[0][s] < 0 || t.padding[1][s] < 0) throw new Error("noUiSlider (" + e + "): 'padding' option must be a positive number(s).");
      var r = i[0] + i[1], n = t.spectrum.xVal[0];
      if (r / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - n) > 1) throw new Error("noUiSlider (" + e + "): 'padding' option must not exceed 100% of the range.")
    }
  }

  function A(t, i) {
    switch (i) {
      case"ltr":
        t.dir = 0;
        break;
      case"rtl":
        t.dir = 1;
        break;
      default:
        throw new Error("noUiSlider (" + e + "): 'direction' option was not recognized.")
    }
  }

  function _(t, i) {
    if ("string" != typeof i) throw new Error("noUiSlider (" + e + "): 'behaviour' must be a string containing options.");
    var s = i.indexOf("tap") >= 0, a = i.indexOf("drag") >= 0, r = i.indexOf("fixed") >= 0, n = i.indexOf("snap") >= 0,
      o = i.indexOf("hover") >= 0, l = i.indexOf("unconstrained") >= 0;
    if (r) {
      if (2 !== t.handles) throw new Error("noUiSlider (" + e + "): 'fixed' behaviour must be used with 2 handles");
      I(t, t.start[1] - t.start[0])
    }
    if (l && (t.margin || t.limit)) throw new Error("noUiSlider (" + e + "): 'unconstrained' behaviour cannot be used with margin or limit");
    t.events = {tap: s || n, drag: a, fixed: r, snap: n, hover: o, unconstrained: l}
  }

  function H(t, i) {
    if (!1 !== i) if (!0 === i) {
      t.tooltips = [];
      for (var s = 0; s < t.handles; s++) t.tooltips.push(!0)
    } else {
      if (t.tooltips = o(i), t.tooltips.length !== t.handles) throw new Error("noUiSlider (" + e + "): must pass a formatter for all handles.");
      t.tooltips.forEach((function (t) {
        if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to)) throw new Error("noUiSlider (" + e + "): 'tooltips' must be passed a formatter or 'false'.")
      }))
    }
  }

  function F(e, t) {
    e.ariaFormat = t, S(t)
  }

  function V(e, t) {
    e.format = t, S(t)
  }

  function B(t, i) {
    if (t.keyboardSupport = i, "boolean" != typeof i) throw new Error("noUiSlider (" + e + "): 'keyboardSupport' option must be a boolean.")
  }

  function G(e, t) {
    e.documentElement = t
  }

  function Y(t, i) {
    if ("string" != typeof i && !1 !== i) throw new Error("noUiSlider (" + e + "): 'cssPrefix' must be a string or `false`.");
    t.cssPrefix = i
  }

  function q(t, i) {
    if ("object" != typeof i) throw new Error("noUiSlider (" + e + "): 'cssClasses' must be an object.");
    if ("string" == typeof t.cssPrefix) for (var s in t.cssClasses = {}, i) i.hasOwnProperty(s) && (t.cssClasses[s] = t.cssPrefix + i[s]); else t.cssClasses = i
  }

  function X(t) {
    var s = {margin: 0, limit: 0, padding: 0, animate: !0, animationDuration: 300, ariaFormat: w, format: w}, a = {
      step: {r: !1, t: E},
      keyboardPageMultiplier: {r: !1, t: C},
      keyboardDefaultStep: {r: !1, t: T},
      start: {r: !0, t: P},
      connect: {r: !0, t: z},
      direction: {r: !0, t: A},
      snap: {r: !1, t: k},
      animate: {r: !1, t: L},
      animationDuration: {r: !1, t: D},
      range: {r: !0, t: M},
      orientation: {r: !1, t: $},
      margin: {r: !1, t: I},
      limit: {r: !1, t: O},
      padding: {r: !1, t: N},
      behaviour: {r: !0, t: _},
      ariaFormat: {r: !1, t: F},
      format: {r: !1, t: V},
      tooltips: {r: !1, t: H},
      keyboardSupport: {r: !0, t: B},
      documentElement: {r: !1, t: G},
      cssPrefix: {r: !0, t: Y},
      cssClasses: {r: !0, t: q}
    }, r = {
      connect: !1,
      direction: "ltr",
      behaviour: "tap",
      orientation: "horizontal",
      keyboardSupport: !0,
      cssPrefix: "noUi-",
      cssClasses: x,
      keyboardPageMultiplier: 5,
      keyboardDefaultStep: 10
    };
    t.format && !t.ariaFormat && (t.ariaFormat = t.format), Object.keys(a).forEach((function (n) {
      if (!i(t[n]) && void 0 === r[n]) {
        if (a[n].r) throw new Error("noUiSlider (" + e + "): '" + n + "' is required.");
        return !0
      }
      a[n].t(s, i(t[n]) ? t[n] : r[n])
    })), s.pips = t.pips;
    var n = document.createElement("div"), o = void 0 !== n.style.msTransform, l = void 0 !== n.style.transform;
    s.transformRule = l ? "transform" : o ? "msTransform" : "webkitTransform";
    return s.style = [["left", "top"], ["right", "bottom"]][s.dir][s.ort], s
  }

  function R(i, a, l) {
    var p, u, m, f, v, g, b, y, w = window.navigator.pointerEnabled ? {
        start: "pointerdown",
        move: "pointermove",
        end: "pointerup"
      } : window.navigator.msPointerEnabled ? {
        start: "MSPointerDown",
        move: "MSPointerMove",
        end: "MSPointerUp"
      } : {start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend"},
      x = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function () {
        var e = !1;
        try {
          var t = Object.defineProperty({}, "passive", {
            get: function () {
              e = !0
            }
          });
          window.addEventListener("test", null, t)
        } catch (e) {
        }
        return e
      }(), S = i, E = a.spectrum, C = [], T = [], M = [], P = 0, k = {}, L = i.ownerDocument,
      D = a.documentElement || L.documentElement, z = L.body, $ = "rtl" === L.dir || 1 === a.ort ? 0 : 100;

    function I(e, t) {
      var i = L.createElement("div");
      return t && d(i, t), e.appendChild(i), i
    }

    function O(e, t) {
      var i = I(e, a.cssClasses.origin), s = I(i, a.cssClasses.handle);
      return I(s, a.cssClasses.touchArea), s.setAttribute("data-handle", t), a.keyboardSupport && (s.setAttribute("tabindex", "0"), s.addEventListener("keydown", (function (e) {
        return function (e, t) {
          if (_() || H(t)) return !1;
          var i = ["Left", "Right"], s = ["Down", "Up"], r = ["PageDown", "PageUp"], n = ["Home", "End"];
          a.dir && !a.ort ? i.reverse() : a.ort && !a.dir && (s.reverse(), r.reverse());
          var o, l = e.key.replace("Arrow", ""), d = l === r[0], h = l === r[1], c = l === s[0] || l === i[0] || d,
            p = l === s[1] || l === i[1] || h, u = l === n[0], m = l === n[1];
          if (!(c || p || u || m)) return !0;
          if (e.preventDefault(), p || c) {
            var f = a.keyboardPageMultiplier, v = c ? 0 : 1, g = ue(t)[v];
            if (null === g) return !1;
            !1 === g && (g = E.getDefaultStep(T[t], c, a.keyboardDefaultStep)), (h || d) && (g *= f), g = Math.max(g, 1e-7), g *= c ? -1 : 1, o = C[t] + g
          } else o = m ? a.spectrum.xVal[a.spectrum.xVal.length - 1] : a.spectrum.xVal[0];
          return le(t, E.toStepping(o), !0, !0), ie("slide", t), ie("update", t), ie("change", t), ie("set", t), !1
        }(e, t)
      }))), s.setAttribute("role", "slider"), s.setAttribute("aria-orientation", a.ort ? "vertical" : "horizontal"), 0 === t ? d(s, a.cssClasses.handleLower) : t === a.handles - 1 && d(s, a.cssClasses.handleUpper), i
    }

    function N(e, t) {
      return !!t && I(e, a.cssClasses.connect)
    }

    function A(e, t) {
      return !!a.tooltips[t] && I(e.firstChild, a.cssClasses.tooltip)
    }

    function _() {
      return S.hasAttribute("disabled")
    }

    function H(e) {
      return u[e].hasAttribute("disabled")
    }

    function F() {
      v && (te("update.tooltips"), v.forEach((function (e) {
        e && t(e)
      })), v = null)
    }

    function V() {
      F(), v = u.map(A), ee("update.tooltips", (function (e, t, i) {
        if (v[t]) {
          var s = e[t];
          !0 !== a.tooltips[t] && (s = a.tooltips[t].to(i[t])), v[t].innerHTML = s
        }
      }))
    }

    function B(e, t, i) {
      var s = L.createElement("div"), r = [];
      r[0] = a.cssClasses.valueNormal, r[1] = a.cssClasses.valueLarge, r[2] = a.cssClasses.valueSub;
      var n = [];
      n[0] = a.cssClasses.markerNormal, n[1] = a.cssClasses.markerLarge, n[2] = a.cssClasses.markerSub;
      var o = [a.cssClasses.valueHorizontal, a.cssClasses.valueVertical],
        l = [a.cssClasses.markerHorizontal, a.cssClasses.markerVertical];

      function h(e, t) {
        var i = t === a.cssClasses.value, s = i ? r : n;
        return t + " " + (i ? o : l)[a.ort] + " " + s[e]
      }

      return d(s, a.cssClasses.pips), d(s, 0 === a.ort ? a.cssClasses.pipsHorizontal : a.cssClasses.pipsVertical), Object.keys(e).forEach((function (r) {
        !function (e, r, n) {
          if (-1 !== (n = t ? t(r, n) : n)) {
            var o = I(s, !1);
            o.className = h(n, a.cssClasses.marker), o.style[a.style] = e + "%", n > 0 && ((o = I(s, !1)).className = h(n, a.cssClasses.value), o.setAttribute("data-value", r), o.style[a.style] = e + "%", o.innerHTML = i.to(r))
          }
        }(r, e[r][0], e[r][1])
      })), s
    }

    function G() {
      f && (t(f), f = null)
    }

    function Y(t) {
      G();
      var i = t.mode, s = t.density || 1, a = t.filter || !1, r = function (t, i, s) {
        if ("range" === t || "steps" === t) return E.xVal;
        if ("count" === t) {
          if (i < 2) throw new Error("noUiSlider (" + e + "): 'values' (>= 2) required for mode 'count'.");
          var a = i - 1, r = 100 / a;
          for (i = []; a--;) i[a] = a * r;
          i.push(100), t = "positions"
        }
        return "positions" === t ? i.map((function (e) {
          return E.fromStepping(s ? E.getStep(e) : e)
        })) : "values" === t ? s ? i.map((function (e) {
          return E.fromStepping(E.getStep(E.toStepping(e)))
        })) : i : void 0
      }(i, t.values || !1, t.stepped || !1), n = function (e, t, i) {
        var s, a = {}, r = E.xVal[0], n = E.xVal[E.xVal.length - 1], o = !1, l = !1, d = 0;
        return s = i.slice().sort((function (e, t) {
          return e - t
        })), (i = s.filter((function (e) {
          return !this[e] && (this[e] = !0)
        }), {}))[0] !== r && (i.unshift(r), o = !0), i[i.length - 1] !== n && (i.push(n), l = !0), i.forEach((function (s, r) {
          var n, h, c, p, u, m, f, v, g, b, y = s, w = i[r + 1], x = "steps" === t;
          if (x && (n = E.xNumSteps[r]), n || (n = w - y), !1 !== y && void 0 !== w) for (n = Math.max(n, 1e-7), h = y; h <= w; h = (h + n).toFixed(7) / 1) {
            for (v = (u = (p = E.toStepping(h)) - d) / e, b = u / (g = Math.round(v)), c = 1; c <= g; c += 1) a[(m = d + c * b).toFixed(5)] = [E.fromStepping(m), 0];
            f = i.indexOf(h) > -1 ? 1 : x ? 2 : 0, !r && o && h !== w && (f = 0), h === w && l || (a[p.toFixed(5)] = [h, f]), d = p
          }
        })), a
      }(s, i, r), o = t.format || {to: Math.round};
      return f = S.appendChild(B(n, a, o))
    }

    function q() {
      var e = p.getBoundingClientRect(), t = "offset" + ["Width", "Height"][a.ort];
      return 0 === a.ort ? e.width || p[t] : e.height || p[t]
    }

    function R(e, t, i, s) {
      var r = function (r) {
        return !!(r = function (e, t, i) {
          var s, a, r = 0 === e.type.indexOf("touch"), n = 0 === e.type.indexOf("mouse"),
            o = 0 === e.type.indexOf("pointer");
          0 === e.type.indexOf("MSPointer") && (o = !0);
          if (r) {
            var l = function (e) {
              return e.target === i || i.contains(e.target) || e.target.shadowRoot && e.target.shadowRoot.contains(i)
            };
            if ("touchstart" === e.type) {
              var d = Array.prototype.filter.call(e.touches, l);
              if (d.length > 1) return !1;
              s = d[0].pageX, a = d[0].pageY
            } else {
              var h = Array.prototype.find.call(e.changedTouches, l);
              if (!h) return !1;
              s = h.pageX, a = h.pageY
            }
          }
          t = t || c(L), (n || o) && (s = e.clientX + t.x, a = e.clientY + t.y);
          return e.pageOffset = t, e.points = [s, a], e.cursor = n || o, e
        }(r, s.pageOffset, s.target || t)) && (!(_() && !s.doNotReject) && (n = S, o = a.cssClasses.tap, !((n.classList ? n.classList.contains(o) : new RegExp("\\b" + o + "\\b").test(n.className)) && !s.doNotReject) && (!(e === w.start && void 0 !== r.buttons && r.buttons > 1) && ((!s.hover || !r.buttons) && (x || r.preventDefault(), r.calcPoint = r.points[a.ort], void i(r, s))))));
        var n, o
      }, n = [];
      return e.split(" ").forEach((function (e) {
        t.addEventListener(e, r, !!x && {passive: !0}), n.push([e, r])
      })), n
    }

    function W(e) {
      var t, i, s, r, o, l,
        d = 100 * (e - (t = p, i = a.ort, s = t.getBoundingClientRect(), r = t.ownerDocument, o = r.documentElement, l = c(r), /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (l.x = 0), i ? s.top + l.y - o.clientTop : s.left + l.x - o.clientLeft)) / q();
      return d = n(d), a.dir ? 100 - d : d
    }

    function j(e, t) {
      "mouseout" === e.type && "HTML" === e.target.nodeName && null === e.relatedTarget && K(e, t)
    }

    function U(e, t) {
      if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === e.buttons && 0 !== t.buttonsProperty) return K(e, t);
      var i = (a.dir ? -1 : 1) * (e.calcPoint - t.startCalcPoint);
      re(i > 0, 100 * i / t.baseSize, t.locations, t.handleNumbers)
    }

    function K(e, t) {
      t.handle && (h(t.handle, a.cssClasses.active), P -= 1), t.listeners.forEach((function (e) {
        D.removeEventListener(e[0], e[1])
      })), 0 === P && (h(S, a.cssClasses.drag), oe(), e.cursor && (z.style.cursor = "", z.removeEventListener("selectstart", s))), t.handleNumbers.forEach((function (e) {
        ie("change", e), ie("set", e), ie("end", e)
      }))
    }

    function Z(e, t) {
      if (t.handleNumbers.some(H)) return !1;
      var i;
      1 === t.handleNumbers.length && (i = u[t.handleNumbers[0]].children[0], P += 1, d(i, a.cssClasses.active));
      e.stopPropagation();
      var r = [], n = R(w.move, D, U, {
        target: e.target,
        handle: i,
        listeners: r,
        startCalcPoint: e.calcPoint,
        baseSize: q(),
        pageOffset: e.pageOffset,
        handleNumbers: t.handleNumbers,
        buttonsProperty: e.buttons,
        locations: T.slice()
      }), o = R(w.end, D, K, {
        target: e.target,
        handle: i,
        listeners: r,
        doNotReject: !0,
        handleNumbers: t.handleNumbers
      }), l = R("mouseout", D, j, {
        target: e.target,
        handle: i,
        listeners: r,
        doNotReject: !0,
        handleNumbers: t.handleNumbers
      });
      r.push.apply(r, n.concat(o, l)), e.cursor && (z.style.cursor = getComputedStyle(e.target).cursor, u.length > 1 && d(S, a.cssClasses.drag), z.addEventListener("selectstart", s, !1)), t.handleNumbers.forEach((function (e) {
        ie("start", e)
      }))
    }

    function Q(e) {
      if (!e.buttons && !e.touches) return !1;
      e.stopPropagation();
      var t = W(e.calcPoint), i = function (e) {
        var t = 100, i = !1;
        return u.forEach((function (s, a) {
          if (!H(a)) {
            var r = T[a], n = Math.abs(r - e);
            (n < t || n <= t && e > r || 100 === n && 100 === t) && (i = a, t = n)
          }
        })), i
      }(t);
      if (!1 === i) return !1;
      a.events.snap || r(S, a.cssClasses.tap, a.animationDuration), le(i, t, !0, !0), oe(), ie("slide", i, !0), ie("update", i, !0), ie("change", i, !0), ie("set", i, !0), a.events.snap && Z(e, {handleNumbers: [i]})
    }

    function J(e) {
      var t = W(e.calcPoint), i = E.getStep(t), s = E.fromStepping(i);
      Object.keys(k).forEach((function (e) {
        "hover" === e.split(".")[0] && k[e].forEach((function (e) {
          e.call(g, s)
        }))
      }))
    }

    function ee(e, t) {
      k[e] = k[e] || [], k[e].push(t), "update" === e.split(".")[0] && u.forEach((function (e, t) {
        ie("update", t)
      }))
    }

    function te(e) {
      var t = e && e.split(".")[0], i = t && e.substring(t.length);
      Object.keys(k).forEach((function (e) {
        var s = e.split(".")[0], a = e.substring(s.length);
        t && t !== s || i && i !== a || delete k[e]
      }))
    }

    function ie(e, t, i) {
      Object.keys(k).forEach((function (s) {
        var r = s.split(".")[0];
        e === r && k[s].forEach((function (e) {
          e.call(g, C.map(a.format.to), t, C.slice(), i || !1, T.slice(), g)
        }))
      }))
    }

    function se(e, t, i, s, r, o) {
      var l;
      return u.length > 1 && !a.events.unconstrained && (s && t > 0 && (l = E.getAbsoluteDistance(e[t - 1], a.margin, 0), i = Math.max(i, l)), r && t < u.length - 1 && (l = E.getAbsoluteDistance(e[t + 1], a.margin, 1), i = Math.min(i, l))), u.length > 1 && a.limit && (s && t > 0 && (l = E.getAbsoluteDistance(e[t - 1], a.limit, 0), i = Math.min(i, l)), r && t < u.length - 1 && (l = E.getAbsoluteDistance(e[t + 1], a.limit, 1), i = Math.max(i, l))), a.padding && (0 === t && (l = E.getAbsoluteDistance(0, a.padding[0], 0), i = Math.max(i, l)), t === u.length - 1 && (l = E.getAbsoluteDistance(100, a.padding[1], 1), i = Math.min(i, l))), !((i = n(i = E.getStep(i))) === e[t] && !o) && i
    }

    function ae(e, t) {
      var i = a.ort;
      return (i ? t : e) + ", " + (i ? e : t)
    }

    function re(e, t, i, s) {
      var a = i.slice(), r = [!e, e], n = [e, !e];
      s = s.slice(), e && s.reverse(), s.length > 1 ? s.forEach((function (e, i) {
        var s = se(a, e, a[e] + t, r[i], n[i], !1);
        !1 === s ? t = 0 : (t = s - a[e], a[e] = s)
      })) : r = n = [!0];
      var o = !1;
      s.forEach((function (e, s) {
        o = le(e, i[e] + t, r[s], n[s]) || o
      })), o && s.forEach((function (e) {
        ie("update", e), ie("slide", e)
      }))
    }

    function ne(e, t) {
      return a.dir ? 100 - e - t : e
    }

    function oe() {
      M.forEach((function (e) {
        var t = T[e] > 50 ? -1 : 1, i = 3 + (u.length + t * e);
        u[e].style.zIndex = i
      }))
    }

    function le(e, t, i, s) {
      return !1 !== (t = se(T, e, t, i, s, !1)) && (function (e, t) {
        T[e] = t, C[e] = E.fromStepping(t);
        var i = "translate(" + ae(10 * (ne(t, 0) - $) + "%", "0") + ")";
        u[e].style[a.transformRule] = i, de(e), de(e + 1)
      }(e, t), !0)
    }

    function de(e) {
      if (m[e]) {
        var t = 0, i = 100;
        0 !== e && (t = T[e - 1]), e !== m.length - 1 && (i = T[e]);
        var s = i - t, r = "translate(" + ae(ne(t, s) + "%", "0") + ")", n = "scale(" + ae(s / 100, "1") + ")";
        m[e].style[a.transformRule] = r + " " + n
      }
    }

    function he(e, t) {
      return null === e || !1 === e || void 0 === e ? T[t] : ("number" == typeof e && (e = String(e)), e = a.format.from(e), !1 === (e = E.toStepping(e)) || isNaN(e) ? T[t] : e)
    }

    function ce(e, t) {
      var i = o(e), s = void 0 === T[0];
      t = void 0 === t || !!t, a.animate && !s && r(S, a.cssClasses.tap, a.animationDuration), M.forEach((function (e) {
        le(e, he(i[e], e), !0, !1)
      }));
      for (var n = 1 === M.length ? 0 : 1; n < M.length; ++n) M.forEach((function (e) {
        le(e, T[e], !0, !0)
      }));
      oe(), M.forEach((function (e) {
        ie("update", e), null !== i[e] && t && ie("set", e)
      }))
    }

    function pe() {
      var e = C.map(a.format.to);
      return 1 === e.length ? e[0] : e
    }

    function ue(e) {
      var t = T[e], i = E.getNearbySteps(t), s = C[e], r = i.thisStep.step, n = null;
      if (a.snap) return [s - i.stepBefore.startValue || null, i.stepAfter.startValue - s || null];
      !1 !== r && s + r > i.stepAfter.startValue && (r = i.stepAfter.startValue - s), n = s > i.thisStep.startValue ? i.thisStep.step : !1 !== i.stepBefore.step && s - i.stepBefore.highestStep, 100 === t ? r = null : 0 === t && (n = null);
      var o = E.countStepDecimals();
      return null !== r && !1 !== r && (r = Number(r.toFixed(o))), null !== n && !1 !== n && (n = Number(n.toFixed(o))), [n, r]
    }

    return d(b = S, a.cssClasses.target), 0 === a.dir ? d(b, a.cssClasses.ltr) : d(b, a.cssClasses.rtl), 0 === a.ort ? d(b, a.cssClasses.horizontal) : d(b, a.cssClasses.vertical), d(b, "rtl" === getComputedStyle(b).direction ? a.cssClasses.textDirectionRtl : a.cssClasses.textDirectionLtr), p = I(b, a.cssClasses.base), function (e, t) {
      var i = I(t, a.cssClasses.connects);
      u = [], (m = []).push(N(i, e[0]));
      for (var s = 0; s < a.handles; s++) u.push(O(t, s)), M[s] = s, m.push(N(i, e[s + 1]))
    }(a.connect, p), (y = a.events).fixed || u.forEach((function (e, t) {
      R(w.start, e.children[0], Z, {handleNumbers: [t]})
    })), y.tap && R(w.start, p, Q, {}), y.hover && R(w.move, p, J, {hover: !0}), y.drag && m.forEach((function (e, t) {
      if (!1 !== e && 0 !== t && t !== m.length - 1) {
        var i = u[t - 1], s = u[t], r = [e];
        d(e, a.cssClasses.draggable), y.fixed && (r.push(i.children[0]), r.push(s.children[0])), r.forEach((function (e) {
          R(w.start, e, Z, {handles: [i, s], handleNumbers: [t - 1, t]})
        }))
      }
    })), ce(a.start), a.pips && Y(a.pips), a.tooltips && V(), ee("update", (function (e, t, i, s, r) {
      M.forEach((function (e) {
        var t = u[e], s = se(T, e, 0, !0, !0, !0), n = se(T, e, 100, !0, !0, !0), o = r[e], l = a.ariaFormat.to(i[e]);
        s = E.fromStepping(s).toFixed(1), n = E.fromStepping(n).toFixed(1), o = E.fromStepping(o).toFixed(1), t.children[0].setAttribute("aria-valuemin", s), t.children[0].setAttribute("aria-valuemax", n), t.children[0].setAttribute("aria-valuenow", o), t.children[0].setAttribute("aria-valuetext", l)
      }))
    })), g = {
      destroy: function () {
        for (var e in a.cssClasses) a.cssClasses.hasOwnProperty(e) && h(S, a.cssClasses[e]);
        for (; S.firstChild;) S.removeChild(S.firstChild);
        delete S.noUiSlider
      }, steps: function () {
        return M.map(ue)
      }, on: ee, off: te, get: pe, set: ce, setHandle: function (t, i, s) {
        if (!((t = Number(t)) >= 0 && t < M.length)) throw new Error("noUiSlider (" + e + "): invalid handle number, got: " + t);
        le(t, he(i, t), !0, !0), ie("update", t), s && ie("set", t)
      }, reset: function (e) {
        ce(a.start, e)
      }, __moveHandles: function (e, t, i) {
        re(e, t, T, i)
      }, options: l, updateOptions: function (e, t) {
        var i = pe(),
          s = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"];
        s.forEach((function (t) {
          void 0 !== e[t] && (l[t] = e[t])
        }));
        var r = X(l);
        s.forEach((function (t) {
          void 0 !== e[t] && (a[t] = r[t])
        })), E = r.spectrum, a.margin = r.margin, a.limit = r.limit, a.padding = r.padding, a.pips ? Y(a.pips) : G(), a.tooltips ? V() : F(), T = [], ce(e.start || i, t)
      }, target: S, removePips: G, removeTooltips: F, getTooltips: function () {
        return v
      }, getOrigins: function () {
        return u
      }, pips: Y
    }
  }

  return {
    __spectrum: y, version: e, cssClasses: x, create: function (t, i) {
      if (!t || !t.nodeName) throw new Error("noUiSlider (" + e + "): create requires a single element, got: " + t);
      if (t.noUiSlider) throw new Error("noUiSlider (" + e + "): Slider was already initialized.");
      var s = R(t, X(i), i);
      return t.noUiSlider = s, s
    }
  }
}));