/* =========================================================================
   TTEUKKEUN — 매움지수 테스트 앱
   Routes (hash):
     #/                start
     #/test/1..5       quiz
     #/resultado/:tipo result   (suave | medio | picante)
     #/receta/:tipo    recipe
   ========================================================================= */
(function () {
  "use strict";

  const D = window.TTK;
  const Q = D.questions;
  const TOTAL = Q.length;
  const TYPES = ["suave", "medio", "picante"];
  const LETTERS = ["A", "B", "C"];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");

  if (!D.config.showKorean) document.documentElement.classList.add("no-ko");

  /* ---------------------------------------------------------------------
     STATE — answers[i] = 1 | 2 | 3 (A/B/C). Kept for the tab session so a
     refresh or the browser back button never loses progress.
     --------------------------------------------------------------------- */
  const STORE_KEY = "ttk-answers";
  let answers = load();

  function load() {
    try {
      const raw = JSON.parse(sessionStorage.getItem(STORE_KEY) || "[]");
      if (Array.isArray(raw)) return raw.slice(0, TOTAL).map((v) => ([1, 2, 3].includes(v) ? v : null));
    } catch (e) { /* storage unavailable */ }
    return [];
  }
  function save() {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(answers)); } catch (e) { /* ignore */ }
  }
  function reset() { answers = []; save(); }

  /* ---------------------------------------------------------------------
     SCORING — A=1, B=2, C=3 · total 5–15
       5–8 SUAVE · 9–12 MEDIO · 13–15 PICANTE
     --------------------------------------------------------------------- */
  function answeredCount() { return answers.filter(Boolean).length; }
  function isComplete() { return answers.length === TOTAL && answers.every(Boolean); }
  function totalScore() { return answers.reduce((s, v) => s + (v || 0), 0); }
  function typeForScore(score) {
    return TYPES.find((t) => score >= D.types[t].min && score <= D.types[t].max) || null;
  }
  // exposed for QA in the browser console
  window.TTK.score = { totalScore, typeForScore, get answers() { return answers.slice(); } };

  /* ---------------------------------------------------------------------
     MARKUP HELPERS
     --------------------------------------------------------------------- */
  const icon = (id, cls = "icon") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const ko = (text, tag = "span", cls = "ko") => text ? `<${tag} class="${cls}" lang="ko" data-ko>${esc(text)}</${tag}>` : "";

  function imageOr(src, alt, placeholderHTML, cls = "") {
    return src
      ? `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" decoding="async">`
      : placeholderHTML;
  }

  /* ---------------------------------------------------------------------
     TTUKBAEGI — layered so characters sit *inside* the pot:
     back layer (rim, broth, steam) → character slots → front body
     --------------------------------------------------------------------- */
  function pot({ slots = [], lid = true, steamCount = 3, bubbles = 5 } = {}) {
    const steamX = [150, 205, 258].slice(0, steamCount);
    const bubbleSpots = [[120, 196, 6], [170, 205, 4.5], [236, 188, 7], [282, 200, 5], [205, 214, 3.5], [140, 184, 3.5]].slice(0, bubbles);

    const back = `
      <svg class="pot-layer pot-back" viewBox="0 0 400 360" aria-hidden="true">
        <ellipse class="pot-shadow" cx="200" cy="346" rx="150" ry="11"/>
        <g class="pot-steam">
          ${steamX.map((x, i) => `<path style="--i:${i}" d="M${x},168c-16,-18 14,-30 0,-50c-14,-19 14,-31 0,-52"/>`).join("")}
        </g>
        <ellipse class="pot-rim" cx="200" cy="190" rx="160" ry="36"/>
        <ellipse class="pot-broth" cx="200" cy="195" rx="138" ry="26"/>
        <ellipse cx="200" cy="195" rx="138" ry="26" fill="url(#halftone-dark)" opacity=".16"/>
        <g class="pot-bubbles">
          ${bubbleSpots.map(([x, y, r], i) => `<circle style="--i:${i}" cx="${x}" cy="${y}" r="${r}"/>`).join("")}
        </g>
      </svg>`;

    const slotHTML = slots.map((s) => `
      <div class="pot-char pot-char--${s.pos}" style="--d:${s.delay || 0}s">
        ${imageOr(s.src, s.alt || "", `<span class="char-ph"><span>${esc(s.label)}</span></span>`, "pot-char-img")}
      </div>`).join("");

    const front = `
      <svg class="pot-layer pot-front" viewBox="0 0 400 360" aria-hidden="true">
        <defs><clipPath id="potclip-${uid}"><path d="M62,195 A138,26 0 0 0 338,195 L360,190 C358,262 318,318 258,332 L142,332 C82,318 42,262 40,190 Z"/></clipPath></defs>
        <path class="pot-misreg" d="M62,195 A138,26 0 0 0 338,195 L360,190 C358,262 318,318 258,332 L142,332 C82,318 42,262 40,190 Z"/>
        <path class="pot-body" d="M62,195 A138,26 0 0 0 338,195 L360,190 C358,262 318,318 258,332 L142,332 C82,318 42,262 40,190 Z"/>
        <g clip-path="url(#potclip-${uid})">
          <rect x="262" y="180" width="110" height="170" fill="url(#halftone)" opacity=".22"/>
          <path class="pot-groove" d="M48,238 Q200,282 352,238"/>
          <path class="pot-groove" d="M66,272 Q200,310 334,272"/>
        </g>
        <path class="pot-lip" d="M40,190 A160,36 0 0 0 360,190"/>
        <rect class="pot-foot" x="150" y="328" width="100" height="14" rx="5"/>
      </svg>`;

    const lidHTML = lid ? `
      <div class="pot-lid-wrap">
        <svg class="pot-lid" viewBox="0 0 160 80" aria-hidden="true">
          <path class="lid-dome" d="M10,62 C14,28 48,14 80,14 C112,14 146,28 150,62 Z"/>
          <ellipse class="lid-rim" cx="80" cy="63" rx="74" ry="11"/>
          <rect class="lid-knob" x="66" y="2" width="28" height="16" rx="7"/>
          <path d="M28,50 Q80,34 132,50" class="lid-groove"/>
        </svg>
      </div>` : "";

    uid++;
    return `<div class="pot">${back}${slotHTML}${front}${lidHTML}</div>`;
  }
  let uid = 0;

  /* ---------------------------------------------------------------------
     STATIC SLOTS — logo + start-page pot
     --------------------------------------------------------------------- */
  function renderLogos() {
    document.querySelectorAll("[data-logo]").forEach((el) => {
      el.innerHTML = D.assets.logo
        ? `<a href="#/" class="logo-link"><img src="${esc(D.assets.logo)}" alt="TTEUKKEUN 뜨끈"></a>`
        : `<a href="#/" class="logo-link logo-ph" aria-label="TTEUKKEUN 뜨끈 — inicio"><span>TTEUKKEUN</span><small>logo</small></a>`;
    });
  }

  function renderHero() {
    const el = $("[data-hero-pot]");
    el.innerHTML = pot({
      slots: [
        { pos: "l", label: "SUAVE", src: D.assets.hero.suave, delay: 0 },
        { pos: "c", label: "MEDIO", src: D.assets.hero.medio, delay: 0.35 },
        { pos: "r", label: "PICANTE", src: D.assets.hero.picante, delay: 0.7 },
      ],
    });
  }

  /* ---------------------------------------------------------------------
     QUIZ
     --------------------------------------------------------------------- */
  const stage = $("[data-stage]");
  const countEl = $("[data-count]");
  const progress = $("[data-progress]");
  const progressFill = $("[data-progress-fill]");
  const mascot = $("[data-mascot]");
  let currentQ = -1;
  let locked = false;

  function questionHTML(i) {
    const q = Q[i];
    return `
      <h2 class="q-title" tabindex="-1" id="q-title">${esc(q.es)}</h2>
      ${ko(q.ko, "p", "q-ko")}
      <ol class="options" aria-labelledby="q-title">
        ${q.options.map((o, k) => `
          <li>
            <button type="button" class="opt" data-value="${k + 1}" aria-pressed="${answers[i] === k + 1}">
              <span class="opt-badge" aria-hidden="true">${LETTERS[k]}</span>
              <span class="opt-text">
                <span class="opt-es">${esc(o.es)}</span>
                ${ko(o.ko, "span", "opt-ko")}
              </span>
            </button>
          </li>`).join("")}
      </ol>
      <p class="sr-only">Pregunta ${i + 1} de ${TOTAL}</p>`;
  }

  function setProgress(i, includeCurrent) {
    const filled = i + (includeCurrent ? 1 : 0);
    progressFill.style.transform = `scaleX(${filled / TOTAL})`;
    progress.setAttribute("aria-valuenow", String(filled));
    progress.setAttribute("aria-valuetext", `${filled} de ${TOTAL} respondidas`);
  }

  // Broth in the mascot pot warms up with the answers so far
  function setMascotHeat() {
    const given = answers.filter(Boolean);
    const avg = given.length ? given.reduce((a, b) => a + b, 0) / given.length : 0;
    const heat = !avg ? "none" : avg < 1.67 ? "suave" : avg < 2.34 ? "medio" : "picante";
    mascot.dataset.broth = heat;
  }

  function renderMascot() {
    mascot.innerHTML = pot({
      slots: [{ pos: "c", label: "", src: D.assets.quizMascot }],
      steamCount: 2, bubbles: 4,
    });
    setMascotHeat();
  }

  function showQuestion(i, dir) {
    const firstPaint = currentQ === -1 || !stage.innerHTML;
    const go = () => {
      stage.innerHTML = questionHTML(i);
      countEl.textContent = `${pad(i + 1)} / ${pad(TOTAL)}`;
      setProgress(i, !!answers[i]);
      currentQ = i;
      locked = false;
      if (!firstPaint) $(".q-title", stage).focus({ preventScroll: true });
    };

    if (firstPaint || reduceMotion.matches || !stage.animate) {
      go();
      if (!firstPaint && reduceMotion.matches) fade(stage);
      return;
    }
    const dx = dir < 0 ? -1 : 1;
    const out = stage.animate(
      [{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: `translateX(${-28 * dx}px)` }],
      { duration: 170, easing: "cubic-bezier(.55,0,1,.45)", fill: "forwards" }
    );
    out.onfinish = () => {
      go();
      out.cancel();
      stage.animate(
        [{ opacity: 0, transform: `translateX(${32 * dx}px)` }, { opacity: 1, transform: "translateX(0)" }],
        { duration: 380, easing: "cubic-bezier(.16,1,.3,1)" }
      );
    };
  }

  function fade(el) {
    el.animate && el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: "ease-out" });
  }

  function choose(btn) {
    if (locked) return;
    locked = true;
    const value = Number(btn.dataset.value);
    const i = currentQ;
    answers[i] = value;
    // answers after this one stay remembered; only the score uses all five
    save();

    stage.querySelectorAll(".opt").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    setProgress(i, true);
    setMascotHeat();
    bounceMascot();

    const next = () => {
      if (i + 1 < TOTAL) navigate(`#/test/${i + 2}`);
      else navigate(`#/resultado/${typeForScore(totalScore())}`);
    };
    setTimeout(next, reduceMotion.matches ? 120 : 520);
  }

  function bounceMascot() {
    const p = $(".pot", mascot);
    if (!p || reduceMotion.matches) return;
    p.classList.remove("is-hop");
    void p.offsetWidth;
    p.classList.add("is-hop");
  }

  stage.addEventListener("click", (e) => {
    const btn = e.target.closest(".opt");
    if (btn) choose(btn);
  });

  // Keyboard: A / B / C or 1 / 2 / 3 answer the visible question
  document.addEventListener("keydown", (e) => {
    if (document.body.dataset.screen !== "quiz" || e.metaKey || e.ctrlKey || e.altKey) return;
    const map = { a: 0, b: 1, c: 2, 1: 0, 2: 1, 3: 2 };
    const k = map[e.key.toLowerCase()];
    if (k === undefined) return;
    const btn = stage.querySelectorAll(".opt")[k];
    if (btn) { btn.focus(); choose(btn); }
  });

  $("[data-back]").addEventListener("click", () => {
    if (currentQ <= 0) navigate("#/");
    else navigate(`#/test/${currentQ}`);
  });

  /* ---------------------------------------------------------------------
     RESULT
     --------------------------------------------------------------------- */
  function gaugeHTML(type, score) {
    const ticks = [];
    for (let n = 5; n <= 15; n++) ticks.push(`<span class="g-tick${[5, 8, 9, 12, 13, 15].includes(n) ? " is-major" : ""}" style="--n:${n - 5}"><i></i><b>${n}</b></span>`);
    const target = ((score || (D.types[type].min + D.types[type].max) / 2) - 5) / 10;
    return `
      <div class="gauge" style="--target:${target.toFixed(3)}">
        <div class="g-zones" aria-hidden="true">
          ${TYPES.map((t) => `<span class="g-zone g-zone--${t}${t === type ? " is-on" : ""}">${D.types[t].name}</span>`).join("")}
        </div>
        <div class="g-tube" aria-hidden="true">
          <span class="g-bulb"></span>
          <span class="g-track"><span class="g-fill"></span></span>
        </div>
        <div class="g-scale" aria-hidden="true">${ticks.join("")}</div>
      </div>`;
  }

  function charSlot(type) {
    const t = D.types[type];
    return imageOr(
      D.assets.characters[type],
      (D.assets.characterAlt && D.assets.characterAlt[type]) || `폴폴이 ${t.ko} — ${t.name}`,
      `<span class="char-ph char-ph--big"><span>폴폴이 · ${t.name}</span><small>ilustración en camino</small></span>`,
      "r-char-img"
    );
  }

  function foodSlot(type, cls) {
    const f = D.types[type].food;
    return imageOr(
      D.assets.food[type], `${f.es} — ${f.ko}`,
      `<span class="food-ph">${icon("image")}<span>${esc(f.es)}</span><small>foto en camino</small></span>`,
      cls
    );
  }

  function heatDeco(type) {
    if (type === "picante") return `<svg class="r-heat r-heat--picante" viewBox="0 0 200 60" aria-hidden="true">${[30, 75, 125, 170].map((x, i) => `<use href="#i-flame" x="${x - 14}" y="${i % 2 ? 6 : 16}" width="28" height="36" style="--i:${i}"/>`).join("")}</svg>`;
    if (type === "medio") return `<svg class="r-heat r-heat--medio" viewBox="0 0 200 60" aria-hidden="true">${[[40, 40, 9], [78, 22, 6], [118, 44, 11], [160, 26, 7]].map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" style="--i:${i}"/>`).join("")}</svg>`;
    return `<svg class="r-heat r-heat--suave" viewBox="0 0 200 60" aria-hidden="true">${[50, 100, 150].map((x, i) => `<path d="M${x},58c-10,-10 10,-18 0,-28c-10,-10 10,-18 0,-28" style="--i:${i}"/>`).join("")}</svg>`;
  }

  function renderResult(type) {
    const t = D.types[type];
    const score = isComplete() && typeForScore(totalScore()) === type ? totalScore() : null;
    const el = $("#screen-result");
    el.innerHTML = `
      <header class="brandbar brandbar--field"><div class="logo-slot" data-logo></div></header>
      <article class="r-sheet">
        <header class="r-head">
          <h1 class="r-type" id="result-title">
            <span class="r-name">${t.name}</span>
            ${ko(t.ko, "span", "r-ko")}
          </h1>
          <p class="r-tag">${esc(t.tagline.es)}</p>
          ${ko(t.tagline.ko, "p", "r-tag-ko")}
        </header>

        <section class="r-gauge" aria-label="Nivel de picante">
          <p class="r-level">
            <span>Nivel ${t.level} de 3</span>
            ${score ? `<span class="r-score"><b data-count-to="${score}">${score}</b> / 15 pts</span>` : `<span class="r-score">${t.min}–${t.max} pts</span>`}
          </p>
          ${gaugeHTML(type, score)}
        </section>

        <figure class="r-char">
          ${heatDeco(type)}
          ${charSlot(type)}
        </figure>

        <div class="r-desc">
          <p>${esc(t.desc.es)}</p>
          ${ko(t.desc.ko, "p")}
        </div>

        <section class="r-food" aria-labelledby="food-title">
          <h2 class="r-food-name" id="food-title">${esc(t.food.es)}${ko(t.food.ko, "span", "r-food-ko")}</h2>
          <figure class="r-food-img">${foodSlot(type, "food-img")}</figure>
          <div class="r-food-text">
            <p>${esc(t.food.blurb.es)}</p>
            ${ko(t.food.blurb.ko, "p")}
          </div>
          <div class="r-actions">
            <a class="btn btn-primary" href="#/receta/${type}">
              <span class="btn-label">Ver receta</span>
              ${ko("레시피 보기", "span", "btn-sub")}
              ${icon("arrow-r", "icon btn-arrow")}
            </a>
            <button class="btn btn-ghost" type="button" data-restart>
              ${icon("refresh")}
              <span class="btn-label">Repetir el test</span>
              ${ko("테스트 다시 하기", "span", "btn-sub")}
            </button>
          </div>
        </section>
      </article>`;
    renderLogos();
    countUp(el);
  }

  function countUp(root) {
    const n = $("[data-count-to]", root);
    if (!n || reduceMotion.matches) return;
    const end = Number(n.dataset.countTo);
    const start = 5, t0 = performance.now(), dur = 1100, delay = 380;
    n.textContent = start;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - t0 - delay) / dur));
      const eased = 1 - Math.pow(1 - p, 4);
      n.textContent = Math.round(start + (end - start) * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------------------
     RECIPE
     --------------------------------------------------------------------- */
  const TBD = `<p class="tbd">${ko("레시피를 준비하고 있어요.", "span", "tbd-ko")}Receta en preparación — muy pronto aquí.</p>`;
  // Recipe content: Korean first, Spanish underneath
  const kf = (o, tag = "span") => o ? `${ko(o.ko, tag, "kf-ko")}<${tag} class="kf-es">${esc(o.es)}</${tag}>` : "";
  const hd = (koText, esText) => `${ko(koText, "span", "h-ko")}<span class="h-es">${esc(esText)}</span>`;

  function renderRecipe(type) {
    const t = D.types[type];
    const r = D.recipes[type] || {};
    const name = r.name || { ko: t.food.ko, es: t.food.es };
    const el = $("#screen-recipe");
    const flames = [1, 2, 3].map((n) => `<svg class="flame${n <= t.level ? " is-on" : ""}" aria-hidden="true"><use href="#i-flame"/></svg>`).join("");
    const pairImg = D.assets.pairing && D.assets.pairing[type];

    el.innerHTML = `
      <header class="rc-bar">
        <a class="back" href="#/resultado/${type}">${icon("arrow-l")}<span>Volver al resultado</span></a>
        <div class="logo-slot" data-logo></div>
      </header>

      <article class="rc">
        <header class="rc-hero">
          <figure class="rc-img">${foodSlot(type, "food-img")}</figure>
          <div class="rc-intro">
            <h1 class="rc-title" id="recipe-title">
              ${ko(name.ko, "span", "rc-title-main")}
              <span class="rc-title-es">${esc(name.es)}</span>
            </h1>
            ${D.recipeNote ? `<p class="rc-note">${kf(D.recipeNote)}</p>` : ""}
            <div class="rc-lead">
              ${r.intro ? r.intro.map((p) => `<p>${kf(p)}</p>`).join("") : `<p>${kf(t.food.blurb)}</p>`}
            </div>
            <dl class="rc-meta">
              <div>
                <dt>${icon("clock")}${hd("조리 시간", "Tiempo")}</dt>
                <dd>${r.time ? kf(r.time) : "—"}${r.timeExtra ? `<span class="rc-extra-time">${kf(r.timeExtra)}</span>` : ""}</dd>
              </div>
              <div>
                <dt>${icon("bowl")}${hd("인분", "Raciones")}</dt>
                <dd>${r.servings ? kf(r.servings) : "—"}</dd>
              </div>
              <div>
                <dt>${icon("flame")}${hd("매움지수", "Picante")}</dt>
                <dd><span class="rc-level"><span class="flames" role="img" aria-label="Nivel ${t.level} de 3">${flames}</span>${t.name}</span></dd>
              </div>
            </dl>
            ${r.features ? `<p class="rc-features"><span class="rc-features-label">${hd("음식 특징", "Sabor")}</span>${kf(r.features)}</p>` : ""}
          </div>
        </header>

        <div class="rc-body">
          <section class="rc-ing" aria-labelledby="h-ing">
            <h2 id="h-ing">${hd("재료", "Ingredientes")}</h2>
            ${r.ingredients ? r.ingredients.map((g) => `
              <div class="ing-group">
                <h3>${hd(g.group.ko, g.group.es)}</h3>
                <ul class="ing-list">${g.items.map((x) => `<li>${kf(x)}</li>`).join("")}</ul>
              </div>`).join("") : TBD}
          </section>

          <section class="rc-steps" aria-labelledby="h-steps">
            <h2 id="h-steps">${hd("조리 방법", "Preparación")}</h2>
            ${r.steps ? `<ol class="step-list">${r.steps.map((x) => `
              <li>
                <h3 class="step-title">${hd(x.title.ko, x.title.es)}</h3>
                <p>${kf(x)}</p>
              </li>`).join("")}</ol>` : TBD}
          </section>
        </div>

        <div class="rc-extra">
          <section class="rc-tips" aria-labelledby="h-tips">
            <h2 id="h-tips">${hd("뜨끈의 조리 팁", "Consejos de TTEUKKEUN")}</h2>
            ${r.tips ? `<ul class="tip-list">${r.tips.map((x) => `<li>${kf(x)}</li>`).join("")}</ul>` : TBD}
          </section>
          <section class="rc-pair" aria-labelledby="h-pair">
            <h2 id="h-pair">${icon("cup")}${hd("음료 페어링", "Maridaje")}</h2>
            ${r.pairing ? `
              ${pairImg ? `<img class="pair-img" src="${esc(pairImg)}" alt="${esc(r.pairing.name)}" decoding="async">` : ""}
              <p class="pair-name">${esc(r.pairing.name)}</p>
              <p class="pair-desc">${kf(r.pairing)}</p>` : TBD}
          </section>
        </div>

        <footer class="rc-foot">
          <button class="btn btn-ghost" type="button" data-restart>
            ${icon("refresh")}<span class="btn-label">Repetir el test</span>${ko("테스트 다시 하기", "span", "btn-sub")}
          </button>
          <p class="signoff"><span>TTEUKKEUN</span> — ¡Que hierva el sabor!</p>
        </footer>
      </article>`;
    renderLogos();
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-restart]")) {
      reset();
      navigate("#/test/1");
    }
  });

  $("[data-start]").addEventListener("click", (e) => {
    // fresh start each time from the start page
    reset();
  });

  /* ---------------------------------------------------------------------
     ROUTER
     --------------------------------------------------------------------- */
  const screens = {
    start: $("#screen-start"),
    quiz: $("#screen-quiz"),
    result: $("#screen-result"),
    recipe: $("#screen-recipe"),
  };
  let currentScreen = null;

  function navigate(hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  }

  function parse() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (parts[0] === "test") {
      const n = Math.min(TOTAL, Math.max(1, parseInt(parts[1], 10) || 1));
      return { screen: "quiz", q: n - 1 };
    }
    if ((parts[0] === "resultado" || parts[0] === "receta") && TYPES.includes(parts[1])) {
      return { screen: parts[0] === "resultado" ? "result" : "recipe", type: parts[1] };
    }
    return { screen: "start" };
  }

  function show(name, heat, title) {
    const changed = currentScreen !== name;
    Object.entries(screens).forEach(([k, el]) => (el.hidden = k !== name));
    document.body.dataset.screen = name;
    document.body.dataset.heat = heat;
    document.title = title;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = getComputedStyle(document.body).getPropertyValue("--field").trim() || "#FEF5F0";
    if (changed) {
      window.scrollTo(0, 0);
      const el = screens[name];
      if (!reduceMotion.matches && el.animate) {
        el.animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }],
          { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" });
      }
    }
    currentScreen = name;
    return changed;
  }

  function route() {
    const r = parse();

    if (r.screen === "quiz") {
      // can't skip ahead past an unanswered question
      const firstOpen = answers.findIndex((v, i) => i < r.q && !v);
      const missing = firstOpen !== -1 ? firstOpen : (answers.length < r.q ? answers.length : -1);
      if (missing !== -1) { location.replace(`#/test/${missing + 1}`); return; }

      const prev = currentScreen === "quiz" ? currentQ : -1;
      const changed = show("quiz", "none", `Pregunta ${r.q + 1} de ${TOTAL} · TTEUKKEUN`);
      if (changed) { currentQ = -1; stage.innerHTML = ""; renderMascot(); }
      showQuestion(r.q, r.q >= prev ? 1 : -1);
      return;
    }

    if (r.screen === "result") {
      const t = D.types[r.type];
      show("result", r.type, `${t.name} · ${t.ko} · TTEUKKEUN`);
      renderResult(r.type);
      $("#result-title").setAttribute("tabindex", "-1");
      $("#result-title").focus({ preventScroll: true });
      return;
    }

    if (r.screen === "recipe") {
      const t = D.types[r.type];
      show("recipe", r.type, `Receta · ${(D.recipes[r.type].name || t.food).es} · TTEUKKEUN`);
      renderRecipe(r.type);
      $("#recipe-title").setAttribute("tabindex", "-1");
      $("#recipe-title").focus({ preventScroll: true });
      return;
    }

    show("start", "none", "TTEUKKEUN · ¿Qué nivel de picante tienes hoy?");
  }

  renderLogos();
  renderHero();
  window.addEventListener("hashchange", route);
  route();
})();
