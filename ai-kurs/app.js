/* AI kurslari — talabalar uchun Telegram Mini App */
(() => {
'use strict';

const tg = window.Telegram && window.Telegram.WebApp;
const CFG = window.APP_CONFIG || {};
const $ = (s, r = document) => r.querySelector(s);
const app = $('#app');

const S = {
  catalog: null, me: null, initData: tg ? tg.initData : '', dev: false, devAs: null,
  tab: null, stack: [], cache: {}, form: {}, gsel: {},
};

// ---------------- yordamchilar ----------------
const h = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const OYLAR = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
const fmtDate = (d) => { if (!d) return ''; const x = new Date(d); return isNaN(x) ? d : `${x.getDate()}-${OYLAR[x.getMonth()]}, ${x.getFullYear()}`; };
const haptic = (t = 'light') => { try { tg && tg.HapticFeedback && (t === 'ok' ? tg.HapticFeedback.notificationOccurred('success') : t === 'err' ? tg.HapticFeedback.notificationOccurred('error') : tg.HapticFeedback.impactOccurred(t)); } catch (_) {} };
const course = (k) => S.catalog && S.catalog.courses.find((c) => c.key === k);
const role = () => (S.me && S.me.user.role) || 'student';
const isStaff = () => ['teacher', 'admin'].includes(role());
const isAdmin = () => role() === 'admin';
const inTg = () => !!(tg && S.initData && !S.dev);
const tgOk = (v) => !!(tg && tg.isVersionAtLeast && tg.isVersionAtLeast(v));

function toast(text) {
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}
function confirmDlg(text) {
  return new Promise((res) => {
    if (tgOk('6.2') && inTg()) tg.showConfirm(text, (ok) => res(!!ok));
    else res(window.confirm(text));
  });
}
async function copy(text) {
  try { await navigator.clipboard.writeText(text); }
  catch (_) { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
  haptic('ok'); toast('Nusxa olindi ✓');
}
function openLink(url) {
  if (inTg()) (/^https:\/\/t\.me\//.test(url) ? tg.openTelegramLink(url) : tg.openLink(url));
  else window.open(url, '_blank');
}

async function api(action, body = {}) {
  let j;
  try {
    const res = await fetch(CFG.API_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action, initData: S.initData, ...body }) });
    j = await res.json();
  } catch (_) { throw new Error("Internet bilan bog'lanib bo'lmadi"); }
  if (!j.ok) throw new Error(j.error || 'Xato');
  return j.data;
}
async function run(fn, btn) {
  if (btn) btn.disabled = true;
  try { return await fn(); }
  catch (e) { haptic('err'); toast(e.message || 'Xato'); }
  finally { if (btn) btn.disabled = false; }
}

// ---------------- markdown ----------------
function inline(s) {
  return h(s)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (m, t, u) => `<a href="${u}" data-act="link" data-url="${u}">${t}</a>`);
}
function mdToHtml(src, opt = {}) {
  const lines = String(src || '').split('\n');
  let out = '', i = 0, list = null;
  const close = () => { if (list) { out += `</${list}>`; list = null; } };
  while (i < lines.length) {
    const l = lines[i];
    if (/^```/.test(l)) {
      close();
      const lang = l.slice(3).trim(); const buf = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      if (lang === 'latex') {
        out += `<div class="formula">${h(buf.join(' ').replace(/\\text\{([^}]*)\}/g, '$1').replace(/\\times/g, '×'))}</div>`;
      } else {
        const id = 'p' + Math.random().toString(36).slice(2, 8);
        (S.cache.prompts ||= {})[id] = buf.join('\n');
        out += `<div class="prompt"><pre>${h(buf.join('\n'))}</pre><div class="copy"><button class="btn sm ghost" data-act="copyPrompt" data-id="${id}">📋 Nusxa olish</button></div></div>`;
      }
      continue;
    }
    if (/^\|/.test(l)) {
      close();
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = rows.filter((r) => !/^\|\s*-{3}/.test(r)).map((r) => r.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim()));
      out += '<table><thead><tr>' + cells[0].map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
        cells.slice(1).map((r) => '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table>';
      continue;
    }
    let m;
    if ((m = l.match(/^###\s+(.*)$/))) {
      close();
      out += `<h3>${inline(m[1])}</h3>`;
      if (opt.exercise && /mashq|Namoyish|Qo'shimcha/i.test(m[1])) out += opt.exercise(m[1]);
      i++; continue;
    }
    if ((m = l.match(/^\s*- \[[ x]\]\s+(.*)$/))) { if (list !== 'ul') { close(); out += '<ul>'; list = 'ul'; } out += `<li class="check">${inline(m[1])}</li>`; i++; continue; }
    if ((m = l.match(/^(\s*)[-*]\s+(.*)$/))) { if (list !== 'ul' && !m[1]) { close(); out += '<ul>'; list = 'ul'; } out += `<li${m[1] ? ' style="margin-left:16px;list-style:circle"' : ''}>${inline(m[2])}</li>`; i++; continue; }
    if ((m = l.match(/^\d+\.\s+(.*)$/))) { if (list !== 'ol') { close(); out += '<ol>'; list = 'ol'; } out += `<li>${inline(m[1])}</li>`; i++; continue; }
    if (!l.trim()) { close(); i++; continue; }
    close(); out += `<p>${inline(l)}</p>`; i++;
  }
  close();
  return out;
}

// ---------------- navigatsiya ----------------
const TABS = {
  student: [['home', '🏠', 'Kurs'], ['prompts', '📋', 'Promptlar'], ['work', '📝', 'Natijalar'], ['profile', '👤', 'Profil']],
  teacher: [['groups', '👥', 'Guruhlar'], ['courses', '📖', 'Darslar'], ['profile', '👤', 'Profil']],
  admin: [['dash', '📊', 'Panel'], ['groups', '👥', 'Guruhlar'], ['students', '🎓', 'Talabalar'], ['courses', '📖', 'Darslar'], ['profile', '👤', 'Profil']],
};
// Admin/o'qituvchi uchun "Talaba ko'rinishi" (faqat interfeys; huquqlar serverda tekshiriladi)
const isPreview = () => !!S.preview && isStaff();
function setPreview(on) {
  S.preview = !!on;
  try { localStorage.setItem('preview', on ? '1' : ''); } catch (_) {}
  S.cache.fresh = false; S.tab = tabsFor()[0][0]; S.stack = []; haptic('ok'); render(); window.scrollTo(0, 0);
}
function tabsFor() {
  if (isPreview()) return TABS.student;
  const t = TABS[role()] || TABS.student;
  if (role() === 'teacher' && S.me && S.me.enrollments.length) return [t[0], t[1], ['home', '🎒', "O'qishim"], t[2]];
  return t;
}
function renderTabs() {
  const rev = S.cache.stats ? S.cache.stats.toReview : 0;
  $('#tabs').innerHTML = '<div class="in">' + tabsFor().map(([k, ic, l]) =>
    `<button class="tab ${S.tab === k && !S.stack.length ? 'on' : ''}" data-act="tab" data-k="${k}"><span class="ic">${ic}</span>${l}${k === 'groups' && rev ? `<span class="dot">${rev}</span>` : ''}</button>`).join('') + '</div>';
}
function setTab(k) { S.tab = k; S.stack = []; S.cache.promptsList = null; render(); window.scrollTo(0, 0); }
function go(view, params = {}) { S.stack.push({ view, params }); render(); window.scrollTo(0, 0); haptic(); }
function back() { S.stack.pop(); render(); }
function current() { return S.stack.length ? S.stack[S.stack.length - 1] : { view: S.tab, params: {} }; }

async function render() {
  renderTabs();
  if (tg && tg.BackButton) { S.stack.length ? tg.BackButton.show() : tg.BackButton.hide(); }
  const { view, params } = current();
  const fn = V[view] || V.home;
  try {
    const html = await fn(params);
    if (current().view !== view) return;
    const banner = isPreview() ? `<div class="pbar"><span>👀</span>${previewCourses().length > 1 ? previewCourses().map((k) => `<button class="chip ${k === curEnrollment().course ? 'on' : ''}" data-act="pickPreview" data-c="${k}">${h(course(k).title)}</button>`).join('') : '<b class="grow small">Talaba ko\'rinishi</b>'}<button class="chip x" data-act="previewOff">✕</button></div>` : '';
    app.innerHTML = `<div class="view">${banner}${S.stack.length && !inTg() ? '<button class="btn sm ghost mb" data-act="back">← Orqaga</button>' : ''}${html}</div>`;
  } catch (e) {
    app.innerHTML = `<div class="view"><div class="empty"><div class="e">⚠️</div>${h(e.message)}<div class="mt"><button class="btn sm" data-act="reload">Qayta urinish</button></div></div></div>`;
  }
}

async function loadMe() {
  if (!S.initData) { S.me = null; return; }
  S.me = await api('me');
  if (isStaff()) S.cache.stats = isAdmin() ? await api('stats').catch(() => null) : null;
}

// ---------------- talaba ----------------
const V = {};
const statusBadge = (s) => ({ active: "<span class=\"badge ok\">O'qimoqda</span>", completed: '<span class="badge info">Tugatgan</span>', cancelled: '<span class="badge bad">Chiqarilgan</span>' }[s] || `<span class="badge">${h(s)}</span>`);

function joinScreen() {
  return `
  <div class="hero">
    <div class="kicker">AI kurslari</div>
    <h1>Xush kelibsiz! 👋</h1>
    <p>Guruh kodini kiriting</p>
  </div>
  <div class="card col">
    <input id="j-code" placeholder="K7M2QX" autocomplete="off" style="text-transform:uppercase;font-size:22px;letter-spacing:.14em;text-align:center">
    <button class="btn" data-act="join">Kirish</button>
  </div>
  ${contacts()}`;
}

function contacts() {
  const c = S.me && S.me.contacts;
  if (!c || !(c.phone || c.address || c.telegram)) return '';
  return `<div class="card small col">
    ${c.phone ? `<div>📞 <a href="tel:${h(c.phone.replace(/\s/g, ''))}">${h(c.phone)}</a></div>` : ''}
    ${c.address ? `<div>📍 ${h(c.address)}</div>` : ''}
    ${c.telegram ? `<div>✈️ <a href="#" data-act="link" data-url="https://t.me/${h(c.telegram.replace(/^@/, ''))}">${h(c.telegram)}</a></div>` : ''}
  </div>`;
}

// ---- talaba: joriy kurs ----
function previewEnrollment(k) {
  const c = course(k);
  return {
    id: 0, course: k, courseTitle: c.title, package: 'full', packageTitle: "To'liq kurs (1–12)", status: 'active', preview: true,
    group: { name: 'Namuna guruh', schedule: 'Sh, Ya 10:00–13:00', location: "O'quv markazi" },
    teacher: null, attended: 0, submissions: 0, reviewed: 0,
    lessons: c.lessons.map((l) => ({ n: l.n, title: l.title, inPackage: true, unlocked: true, opened_at: null, done: 0, submitted: false })),
  };
}
function previewCourses() { return (S.me && S.me.teaches && S.me.teaches.length) ? S.me.teaches : ['biznes', 'umumiy']; }
function curEnrollment() {
  if (isPreview()) {
    const ks = previewCourses();
    return previewEnrollment(ks.includes(S.previewCourse) ? S.previewCourse : ks[0]);
  }
  const list = (S.me && S.me.enrollments) || [];
  return list.find((e) => e.course === S.curCourse) || list[0] || null;
}
function courseSwitcher() {
  if (isPreview()) return ''; // admin uchun kurs tanlash bannerda
  const list = S.me.enrollments;
  if (list.length < 2) return '';
  const cur = curEnrollment().course;
  return `<div class="chips">${list.map((e) => `<button class="chip ${e.course === cur ? 'on' : ''}" data-act="pickCourse" data-c="${e.course}">${h(e.courseTitle)}</button>`).join('')}</div>`;
}

const DAY = 864e5;
const isNew = (l) => l.unlocked && l.opened_at && !l.done && Date.now() - new Date(l.opened_at).getTime() < 3 * DAY;

function lessonRow(e, l, color) {
  const fin = l.done || l.submitted;
  const st = !l.unlocked ? '<span class="lk">🔒</span>' : isNew(l) && !fin ? '<span class="badge warn">Yangi</span>' : '<span class="chev">›</span>';
  return `<button class="item ${l.unlocked ? '' : 'locked'}" ${l.unlocked ? `data-act="openLesson" data-c="${e.course}" data-n="${l.n}"` : 'data-act="lockedLesson"'}>
    <div class="num" ${l.unlocked ? `style="background:${fin ? 'var(--ok)' : color};color:#fff"` : ''}>${fin ? '✓' : l.n}</div>
    <div class="grow b">${h(l.title)}</div>${st}</button>`;
}

function studentHome(e) {
  const c = course(e.course);
  const inPkg = e.lessons.filter((l) => l.inPackage);
  const opened = inPkg.filter((l) => l.unlocked);
  const doneL = inPkg.filter((l) => l.unlocked && (l.done || l.submitted));
  const pct = inPkg.length ? Math.round((opened.length / inPkg.length) * 100) : 0;
  const cert = !e.preview && S.me.certificates.find((x) => x.course === e.course);
  const first = (S.me.user.full_name || S.me.user.name || '').split(' ')[0];

  // keyingi qadam
  const pend = opened.filter((l) => !l.done && !l.submitted);
  const todo = pend.filter(isNew).sort((a, b) => b.n - a.n)[0] || pend.sort((a, b) => a.n - b.n)[0];
  const nx = (cls, ic, k, t, btn = '') => `<div class="next ${cls}"><div class="ic">${ic}</div><div class="grow"><div class="k">${k}</div><div class="t">${t}</div></div>${btn}</div>`;
  let next;
  if (cert) next = nx('ok', '🎓', 'Kurs tugatildi', 'Sertifikat tayyor', `<button class="btn sm ok" data-act="openCert" data-code="${h(cert.code)}">Ochish</button>`);
  else if (todo) next = nx('', isNew(todo) ? '🆕' : '▶️', isNew(todo) ? 'Yangi dars' : 'Davom eting', `${todo.n}. ${h(todo.title)}`, `<button class="btn sm" data-act="openLesson" data-c="${e.course}" data-n="${todo.n}">Ochish</button>`);
  else if (opened.length && opened.length === inPkg.length) next = nx('ok', '✅', 'Barcha darslar', 'Bajarildi');
  else if (opened.length) next = nx('', '⏳', 'Keyingi dars', e.group && e.group.schedule ? h(e.group.schedule) : 'Darsda ochiladi');
  else next = nx('', '🚀', 'Boshlanish', e.group && e.group.start_date ? h(fmtDate(e.group.start_date)) : 'Birinchi darsda ochiladi');

  // darslar modullar bo'yicha
  const mods = e.package === 'full'
    ? [1, 2].map((m) => { const pk = (c.packages || []).find((x) => x.key === 'modul' + m); return [pk ? pk.title : m + '-modul', inPkg.filter((l) => (m === 1 ? l.n <= 6 : l.n > 6))]; })
    : [[e.packageTitle, inPkg]];

  return `
  ${courseSwitcher()}
  <div class="hero2 ${e.course}">
    <div class="grow">
      <div class="k">${first ? 'Salom, ' + h(first) + '! 👋' : 'Xush kelibsiz! 👋'}</div>
      <h1>${h(c.title)}</h1>
      <div class="sub">${e.group ? '👥 ' + h(e.group.name) : ''}</div>
    </div>
    <div class="ring" style="--p:${pct}"><div><b>${opened.length}</b><span>/${inPkg.length}</span></div></div>
  </div>
  ${next}
  <div class="mini" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${doneL.length}/${inPkg.length}</b><span>bajarildi</span></div>
    <div><b>${e.attended}</b><span>davomat</span></div>
    <div><b>${e.submissions}</b><span>topshiriq</span></div>
  </div>
  ${!S.me.user.full_name && !e.preview ? `<button class="next warn" data-act="tab" data-k="profile"><div class="ic">✍️</div><div class="grow t">Ism familiyangizni kiriting</div><span class="chev">›</span></button>` : ''}
  ${e.group && (e.group.schedule || e.group.location || e.teacher) ? `<div class="info">
    ${e.group.schedule ? `<span>📅 ${h(e.group.schedule)}</span>` : ''}
    ${e.group.location ? `<span>📍 ${h(e.group.location)}</span>` : ''}
    ${e.teacher ? (e.teacher.username ? `<button data-act="link" data-url="https://t.me/${h(e.teacher.username)}">💬 ${h(e.teacher.name)}</button>` : `<span>👤 ${h(e.teacher.name)}</span>`) : ''}
  </div>` : ''}
  ${mods.map(([title, ls]) => ls.length ? `<div class="section-title row between"><span>${h(title)}</span><span>${ls.filter((l) => l.unlocked && (l.done || l.submitted)).length}/${ls.length}</span></div>
    <div class="list">${ls.map((l) => lessonRow(e, l, c.color)).join('')}</div>` : '').join('')}`;
}

V.home = async () => {
  if (!S.initData) return `<div class="empty"><div class="e">🤖</div>Ilovani Telegram'dagi bot orqali oching.${CFG.BOT_USERNAME ? `<div class="mt"><a class="btn" href="https://t.me/${h(CFG.BOT_USERNAME)}">Botga o'tish</a></div>` : ''}</div>`;
  if (S.cache.fresh) S.cache.fresh = false; else await loadMe();
  const e = curEnrollment();
  return e ? studentHome(e) : joinScreen();
};

V.prompts = async () => {
  if (!S.me) await loadMe();
  const e = curEnrollment();
  if (!e) return joinScreen();
  const key = e.course + (isPreview() ? ':p' : '');
  if (!S.cache.promptsList || S.cache.promptsKey !== key) {
    S.cache.promptsList = (await api('my_prompts', { course: e.course })).prompts;
    S.cache.promptsKey = key;
  }
  const q = (S.form.pq || '').toLowerCase();
  const list = S.cache.promptsList.filter((p) => !q || (p.title + ' ' + p.text + ' ' + p.lesson).toLowerCase().includes(q));
  const byLesson = {};
  for (const p of list) (byLesson[p.n] ||= []).push(p);
  S.cache.prompts = S.cache.prompts || {};
  return `${courseSwitcher()}
  <div class="title mb">Promptlar</div>
  <div class="row mb"><input id="pq" class="grow" value="${h(S.form.pq || '')}" placeholder="🔎 Qidirish"><button class="btn sm" data-act="promptSearch">Izlash</button></div>
  ${list.length ? Object.entries(byLesson).map(([n, ps]) => `
    <div class="section-title">${n}. ${h(ps[0].lesson)}</div>
    ${ps.map((p) => { const id = 'p' + Math.random().toString(36).slice(2, 8); S.cache.prompts[id] = p.text; return `
      <div class="pc"><div class="row between"><b>${h(p.title)}</b><button class="chip" data-act="copyPrompt" data-id="${id}">📋 Nusxa</button></div>
        <pre data-act="expand">${h(p.text)}</pre></div>`; }).join('')}`).join('')
  : `<div class="empty"><div class="e">📋</div>${q ? 'Topilmadi' : "Hali yo'q"}</div>`}`;
};

V.work = async () => {
  if (!S.me) await loadMe();
  const d = await api('my_work');
  const subs = d.submissions;
  const reviewed = subs.filter((s) => s.feedback || s.score != null);
  const scored = reviewed.filter((s) => s.score != null);
  return `<div class="title mb">Natijalar</div>
  ${subs.length ? `<div class="mini" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${subs.length}</b><span>yuborildi</span></div><div><b>${reviewed.length}</b><span>izoh</span></div>
    <div><b>${scored.length ? Math.round(scored.reduce((a, s) => a + s.score, 0) / scored.length) : '—'}</b><span>baho</span></div></div>
    ${subs.map((s) => `<div class="card small col" data-act="openLesson" data-c="${s.course}" data-n="${s.lesson_no}" style="cursor:pointer">
      <div class="row between"><b>${s.lesson_no}. ${h(s.lessonTitle)}</b>${s.score != null ? `<span class="badge ok">${s.score}</span>` : s.feedback ? '' : '<span class="badge">⏳</span>'}</div>
      ${s.text ? `<div class="muted clamp2">${h(s.text)}</div>` : ''}${s.link ? `<div class="ellipsis" style="color:var(--link)">🔗 ${h(s.link)}</div>` : ''}
      ${s.feedback ? `<div class="fb">💬 ${h(s.feedback)}</div>` : ''}
    </div>`).join('')}`
  : `<div class="empty"><div class="e">📝</div>Hali yo'q</div>`}`;
};

V.enr = async ({ id }) => {
  if (!S.me) await loadMe();
  const e = S.me.enrollments.find((x) => x.id === Number(id));
  return e ? studentHome(e) : '<div class="empty">Topilmadi</div>';
};

V.lesson = async ({ c, n }) => {
  const d = await api('lesson', { course: c, n: Number(n), preview: isPreview() });
  S.cache.lesson = { c, n: Number(n), progress: new Set(d.progress) };
  const l = d.lesson;
  const ex = (title) => {
    const on = S.cache.lesson.progress.has(title);
    return `<div class="ex-done"><button class="toggle ${on ? 'on' : ''}" data-act="toggleEx" data-item="${h(title)}">${on ? '✓' : ''}</button><span class="small muted">${on ? 'Bajarildi' : 'Bajardim'}</span></div>`;
  };
  const subs = d.submissions || [];
  return `
  <div class="lesson-head ${c}"><div class="k">${n}-DARS · ${h(course(c).title.toUpperCase())}</div><h1>${h(l.title)}</h1></div>
  <div class="lead ${c}">${inline(l.lead)}</div>
  <div class="facts-grid">
    ${l.result ? `<div class="fact"><div class="l">Natija</div>${inline(l.result)}</div>` : ''}
    ${l.tools ? `<div class="fact"><div class="l">Asboblar</div>${inline(l.tools)}</div>` : ''}
    ${l.idea ? `<div class="fact"><div class="l">Asosiy g'oya</div>${inline(l.idea)}</div>` : ''}
  </div>
  ${l.sections.map((s, i) => `<details class="card md sec" ${i === 0 || s.title === 'Mashqlar' ? 'open' : ''}><summary>${s.teacher ? "<span class=\"tag-teacher\">O'qituvchi</span>" : ''}<h2>${h(s.title)}</h2></summary>${mdToHtml(s.md, s.title === 'Mashqlar' && !d.full ? { exercise: ex } : {})}</details>`).join('')}
  ${d.full ? '' : `
  <div class="section-title">Natija yuborish</div>
  <div class="card col">
    <textarea id="s-text" placeholder="Natijangiz"></textarea>
    <input id="s-link" placeholder="Havola (ixtiyoriy)" inputmode="url">
    <button class="btn" data-act="submitWork">Yuborish</button>
  </div>
  ${subs.map((s) => `<div class="card small"><div class="muted tiny">${h(fmtDate(s.created_at))}</div>${s.text ? `<div>${h(s.text)}</div>` : ''}${s.link ? `<div><a href="#" data-act="link" data-url="${h(s.link)}">${h(s.link)}</a></div>` : ''}
    ${s.feedback || s.score != null ? `<div class="mt" style="border-left:3px solid var(--ok);padding-left:10px">💬 ${h(s.feedback || '')}${s.score != null ? ` <span class="badge ok">${s.score}</span>` : ''}</div>` : "<div class=\"tiny muted mt\">O'qituvchi ko'rib chiqadi</div>"}</div>`).join('')}`}`;
};

V.profile = async () => {
  if (S.initData) await loadMe();
  const u = S.me && S.me.user;
  if (!u) return '<div class="empty"><div class="e">👤</div>Profil uchun ilovani Telegram orqali oching.</div>';
  const ini = (u.name || '?').split(' ').map((x) => x[0]).join('').slice(0, 2).toUpperCase();
  const roleName = { student: 'Talaba', teacher: "O'qituvchi", admin: 'Admin' }[u.role];
  return `
  <div class="card row"><div style="width:54px;height:54px;border-radius:16px;display:grid;place-items:center;font-size:20px;font-weight:800;background:var(--btn);color:var(--btn-text);flex:none">${h(ini)}</div>
    <div class="grow"><div class="b" style="font-size:17px">${h(u.name)}</div><div class="small muted">${u.phone ? h(u.phone) : 'Raqam kiritilmagan'}${u.username ? ' · @' + h(u.username) : ''}</div></div><span class="badge info">${roleName}</span></div>
  <div class="section-title">Ma'lumotlarim</div>
  <div class="card col">
    <label class="label" style="margin-top:0">Ism familiya (sertifikatga shunday yoziladi)</label>
    <input id="p-name" value="${h(u.full_name)}" placeholder="Masalan: Dilshod Aliyev" autocomplete="name">
    <label class="label">Telefon</label>
    <input id="p-phone" value="${h(u.phone || '')}" placeholder="+998 90 123 45 67" inputmode="tel">
    <button class="btn" data-act="saveProfile">Saqlash</button>
  </div>
  ${S.me.certificates.length ? `<div class="section-title">Sertifikatlarim</div><div class="list">${S.me.certificates.map((c) => `
    <button class="item" data-act="openCert" data-code="${h(c.code)}"><div class="num">🎓</div><div class="grow"><div class="b">${h(course(c.course).title)}</div><div class="small muted">${h(c.code)} · ${h(fmtDate(c.issued_at))}</div></div><span class="chev">›</span></button>`).join('')}</div>` : ''}
  <div class="section-title">Boshqa</div>
  <div class="list">
    ${isStaff() ? (isPreview()
      ? '<button class="item" data-act="previewOff"><div class="num">⚙️</div><div class="grow b">Panelga qaytish</div><span class="chev">›</span></button>'
      : "<button class=\"item\" data-act=\"previewOn\"><div class=\"num\">🎒</div><div class=\"grow\"><div class=\"b\">Talaba ko'rinishi</div><div class=\"small muted\">Ilova talabaga qanday ko'rinishini sinab ko'ring</div></div><span class=\"chev\">›</span></button>") : ''}
    <button class="item" data-act="go" data-v="verify"><div class="num">🔎</div><div class="grow">Sertifikatni tekshirish</div><span class="chev">›</span></button>
    ${S.me.enrollments.length ? "<button class=\"item\" data-act=\"go\" data-v=\"joinMore\"><div class=\"num\">➕</div><div class=\"grow\">Boshqa guruhga qo'shilish (kod bilan)</div><span class=\"chev\">›</span></button>" : ''}
    ${isAdmin() ? `<button class="item" data-act="go" data-v="users"><div class="num">🧑‍🤝‍🧑</div><div class="grow">Foydalanuvchilar va rollar</div><span class="chev">›</span></button>
    <button class="item" data-act="go" data-v="settings"><div class="num">⚙️</div><div class="grow">Kontaktlar</div><span class="chev">›</span></button>` : ''}
  </div>
  ${contacts()}
  <p class="tiny muted center">ID: ${u.tg_id}</p>`;
};

V.joinMore = () => `<div class="title mb">Guruhga qo'shilish</div>
  <div class="card col"><input id="j-code" placeholder="Guruh kodi" autocomplete="off" style="text-transform:uppercase;font-size:20px;letter-spacing:.12em;text-align:center">
  <button class="btn" data-act="join">Kirish</button></div>`;

V.verify = ({ code } = {}) => `
  <div class="title mb">Sertifikatni tekshirish</div>
  <div class="card col"><input id="v-code" value="${h(code || '')}" placeholder="Masalan: AIB-2026-0001" style="text-transform:uppercase">
  <button class="btn" data-act="verify">Tekshirish</button></div><div id="v-res"></div>`;

V.cert = async ({ code }) => {
  if (!S.me) await loadMe();
  const c = S.me.certificates.find((x) => x.code === code);
  if (!c) return '<div class="empty">Topilmadi</div>';
  S.cache.certPng = drawCert(c);
  return `<img class="cert mb" src="${S.cache.certPng}" alt="Sertifikat">
  <button class="btn mb" data-act="sendCert" data-code="${h(c.code)}">📩 Telegramga fayl qilib yuborish</button>
  <div class="card small">Haqiqiyligini tekshirish: ilovada «Sertifikatni tekshirish» → <b>${h(c.code)}</b></div>`;
};

// ---------------- o'qituvchi ----------------
V.courses = () => {
  const ks = (S.me && S.me.teaches) || [];
  if (!ks.length) return "<div class=\"empty\"><div class=\"e\">📖</div>Sizga hali guruh biriktirilmagan — darslar guruh kursi bo'yicha ochiladi.</div>";
  return '<div class="title mb">Darslar</div>' + ks.map((k) => {
    const c = course(k);
    return `<button class="course ${k}" data-act="go" data-v="courseLessons" data-k="${k}"><span class="arrow">→</span>
      <span class="badge-acc">${k === 'biznes' ? 'Biznes egalari uchun' : 'Hamma uchun'}</span><h2>${h(c.title)}</h2>
      <div class="facts"><span>${c.lessons.length} dars</span><span>${c.hours} soat</span><span>To'liq ssenariy</span></div></button>`;
  }).join('');
};

V.courseLessons = ({ k }) => {
  const c = course(k);
  return `<div class="lesson-head ${k}"><div class="k">O'QITUVCHI UCHUN</div><h1>${h(c.title)}</h1><div style="opacity:.9;margin-top:4px">${h(c.lead)}</div></div>
  <button class="btn ghost mb" data-act="go" data-v="notes" data-c="${k}">📘 Kurs haqida: ritm, jihozlar, o'qituvchiga talablar</button>
  <div class="list">${c.lessons.map((l) => `<button class="item" data-act="openLesson" data-c="${k}" data-n="${l.n}"><div class="num" style="background:${c.color};color:#fff">${l.n}</div>
    <div class="grow"><div class="b">${h(l.title)}</div><div class="small muted">${inline(l.result)}</div></div><span class="chev">›</span></button>`).join('')}</div>`;
};

V.notes = async ({ c }) => {
  const d = await api('teacher_notes', { course: c });
  return `<div class="title mb">${h(course(c).title)}</div>
    ${[...course(c).overview, ...d.overview].map((s) => `<div class="card md"><h2>${h(s.title)}</h2>${mdToHtml(s.md)}</div>`).join('')}`;
};

V.groups = async () => {
  const d = await api('groups_list');
  S.cache.groups = d;
  return `<div class="row between mb"><div class="title">Guruhlar</div>${isAdmin() ? '<button class="btn sm" data-act="go" data-v="groupEdit">➕ Yangi</button>' : ''}</div>
  ${d.groups.length ? d.groups.map((g) => `
    <div class="card" data-act="openGroup" data-id="${g.id}" style="cursor:pointer;border-left:5px solid ${course(g.course).color}">
      <div class="row between"><div class="b">${h(g.name)}</div><span class="badge ${g.status === 'running' ? 'ok' : g.status === 'open' ? 'info' : ''}">${{ open: 'Boshlanmagan', running: 'Davom etmoqda', finished: 'Tugagan' }[g.status]}</span></div>
      <div class="small muted">${h(g.courseTitle)} · ${h(g.packageTitle)}${g.schedule ? ' · ' + h(g.schedule) : ''}</div>
      <div class="row mt small"><span>👥 ${g.students}${g.capacity ? '/' + g.capacity : ''}</span><span>📚 ${g.opened} dars</span><span class="muted ellipsis grow">👩‍🏫 ${h(g.teacher || 'tayinlanmagan')}</span></div>
    </div>`).join('') : `<div class="empty"><div class="e">👥</div>${isAdmin() ? "Hali guruh yo'q. «➕ Yangi» bilan yarating, keyin taklif havolasini talabalarga yuborasiz." : 'Sizga hali guruh biriktirilmagan.'}</div>`}`;
};

V.groupEdit = async ({ id }) => {
  const d = S.cache.groups || (S.cache.groups = await api('groups_list'));
  const g = id ? d.groups.find((x) => x.id === Number(id)) : {};
  return `<div class="title mb">${id ? 'Guruhni tahrirlash' : 'Yangi guruh'}</div>
  <div class="card col">
    ${id ? '' : `<label class="label" style="margin-top:0">Kurs</label><select id="g-course">${S.catalog.courses.map((c) => `<option value="${c.key}">${h(c.title)}</option>`).join('')}</select>
    <label class="label">Dastur</label><select id="g-package"><option value="full">To'liq kurs (1–12 darslar)</option><option value="modul1">1-modul (1–6 darslar)</option><option value="modul2">2-modul (7–12 darslar)</option></select>`}
    <label class="label">Nomi</label><input id="g-name" value="${h(g.name || '')}" placeholder="Masalan: Biznes-1 (shanba-yakshanba)">
    <label class="label">Jadval</label><input id="g-schedule" value="${h(g.schedule || '')}" placeholder="Sh, Ya 10:00–13:00">
    <label class="label">Boshlanish sanasi</label><input id="g-start" type="date" value="${h(g.start_date || '')}">
    <label class="label">Manzil</label><input id="g-location" value="${h(g.location || '')}" placeholder="O'quv markazi, xona">
    <label class="label">Sig'im (havola orqali kiradiganlar chegarasi, bo'sh = cheklanmagan)</label><input id="g-cap" type="number" value="${h(g.capacity || '')}">
    <label class="label">O'qituvchi</label><select id="g-teacher"><option value="">— tanlanmagan —</option>${d.teachers.map((t) => `<option value="${t.tg_id}" ${Number(g.teacher_id) === Number(t.tg_id) ? 'selected' : ''}>${h(t.name)} (${t.role === 'admin' ? 'admin' : "o'qituvchi"})</option>`).join('')}</select>
    ${id ? `<label class="label">Holat</label><select id="g-status">${[['open', 'Boshlanmagan'], ['running', 'Davom etmoqda'], ['finished', 'Tugagan (yangi kirish yopiladi)']].map(([v, t]) => `<option value="${v}" ${g.status === v ? 'selected' : ''}>${t}</option>`).join('')}</select>` : ''}
    <button class="btn mt" data-act="saveGroup" data-id="${id || ''}">Saqlash</button>
  </div>
  <p class="tiny muted">O'qituvchi ro'yxatda bo'lmasa: u botga /start yozsin, keyin Profil → Foydalanuvchilar → rolini «O'qituvchi» qiling.</p>`;
};

V.group = async ({ id }) => {
  const d = await api('group_get', { group_id: Number(id) });
  S.cache.group = d;
  const g = d.group;
  const opened = new Set(d.sessions.map((s) => s.lesson_no));
  const sel = S.gsel[id] || (d.sessions.length ? Math.max(...opened) : d.lessons[0].n);
  S.gsel[id] = sel;
  const lt = d.lessons.find((l) => l.n === sel) || d.lessons[0];
  const isOpen = opened.has(lt.n);
  const toReview = d.submissions.filter((s) => !s.feedback && s.score == null);
  return `
  <div class="lesson-head ${g.course}"><div class="k">${h(g.courseTitle.toUpperCase())} · ${h(g.packageTitle.toUpperCase())}</div><h1>${h(g.name)}</h1>
    <div style="opacity:.92;margin-top:6px">📅 ${h(g.schedule || '—')}${g.start_date ? ' · ' + h(fmtDate(g.start_date)) : ''}${g.location ? '<br>📍 ' + h(g.location) : ''}<br>👥 ${d.students.length}${g.capacity ? '/' + g.capacity : ''} talaba</div></div>
  ${isAdmin() ? `<div class="btns mb"><button class="btn sm ghost" data-act="go" data-v="groupEdit" data-id="${g.id}">✏️ Tahrirlash</button><button class="btn sm ghost" data-act="go" data-v="addStudent" data-gid="${g.id}">➕ Talaba qo'shish</button></div>` : ''}
  <div class="section-title">Taklif — talabalarga yuboring</div>
  <div class="card col">
    <div class="copybox" style="justify-content:center;font-size:24px">${h(g.invite_code || '—')}</div>
    ${g.invite ? `<div class="small muted" style="word-break:break-all">${h(g.invite)}</div>
    <div class="btns"><button class="btn sm" data-act="copy" data-t="${h(g.invite)}">📋 Havola</button><button class="btn sm" data-act="share" data-url="${h(g.invite)}" data-name="${h(g.name)}">📤 Ulashish</button></div>` : ''}
    <button class="btn sm ghost" data-act="resetInvite" data-gid="${g.id}">🔄 Yangi kod (eskisi ishlamay qoladi)</button>
  </div>
  <div class="section-title">Darslar</div>
  <div class="card"><div class="lessons-grid">${d.lessons.map((l) => `<button class="lg ${opened.has(l.n) ? 'on' : ''} ${l.n === lt.n ? 'sel' : ''}" data-act="gsel" data-gid="${g.id}" data-n="${l.n}">${l.n}</button>`).join('')}</div>
    <div class="mt"><div class="b">${lt.n}-dars: ${h(lt.title)}</div>
      <div class="btns mt">
        <button class="btn sm ghost" data-act="openLesson" data-c="${g.course}" data-n="${lt.n}">📖 Ssenariy</button>
        ${isOpen ? '<span class="badge ok" style="align-self:center">Ochilgan</span>' : `<button class="btn sm" data-act="openSession" data-gid="${g.id}" data-n="${lt.n}">🔓 Darsni ochish</button>`}
      </div></div></div>
  ${isOpen ? `<div class="section-title">Davomat — ${lt.n}-dars</div><div class="list">${d.students.map((s) => {
    const on = s.present.includes(lt.n);
    return `<div class="item"><button class="toggle ${on ? 'on' : ''}" data-act="att" data-gid="${g.id}" data-n="${lt.n}" data-u="${s.tg_id}" data-on="${on ? 1 : 0}">${on ? '✓' : ''}</button><div class="grow">${h(s.name)}</div></div>`;
  }).join('') || "<div class=\"item muted\">Talaba yo'q</div>"}</div>` : ''}
  <div class="section-title">Talabalar</div>
  <div class="list">${d.students.map((s) => `
    <div class="item"><div class="grow"><div class="b">${h(s.name)}</div>
      <div class="small muted">${s.phone ? `<a href="tel:${h(String(s.phone).replace(/\s/g, ''))}">${h(s.phone)}</a> · ` : ''}davomat ${s.present.length}/${opened.size} · mashq ${s.done} · topshiriq ${s.submissions}</div></div>
      ${s.certificate ? `<span class="badge ok">🎓 ${h(s.certificate)}</span>` : `<button class="btn sm ghost" data-act="issueCert" data-e="${s.enrollment_id}" data-name="${h(s.name)}" title="Sertifikat berish">🎓</button>`}
    </div>`).join('') || "<div class=\"item muted\">Hali talaba yo'q — yuqoridagi havolani yuboring.</div>"}</div>
  <div class="section-title">Guruhga e'lon</div>
  <div class="card col"><textarea id="ann" placeholder="Masalan: Ertangi dars 10:00 da, noutbuk olib keling."></textarea><button class="btn" data-act="announce" data-gid="${g.id}">📣 Yuborish (${d.students.length})</button></div>
  ${d.submissions.length ? `<div class="section-title">Topshiriqlar${toReview.length ? ` — ${toReview.length} ta tekshirilmagan` : ''}</div>${d.submissions.map((s) => `
    <div class="card small col" ${!s.feedback && s.score == null ? 'style="border-left:4px solid var(--warn)"' : ''}><div class="row between"><b>${h(s.name || '')}</b><span class="muted">${s.lesson_no}-dars · ${h(fmtDate(s.created_at))}</span></div>
      ${s.text ? `<div>${h(s.text)}</div>` : ''}${s.link ? `<a href="#" data-act="link" data-url="${h(s.link)}">${h(s.link)}</a>` : ''}
      <div class="row"><input id="fb-${s.id}" class="grow" placeholder="Izoh" value="${h(s.feedback || '')}"><input id="sc-${s.id}" type="number" style="width:76px" placeholder="Baho" value="${s.score ?? ''}"></div>
      <button class="btn sm ${s.feedback ? 'ghost' : ''}" data-act="review" data-id="${s.id}">${s.feedback ? 'Yangilash' : 'Izoh yuborish'}</button></div>`).join('')}` : ''}`;
};

V.addStudent = async ({ gid }) => {
  const q = S.form.aq || '';
  const d = await api('users_list', { q });
  return `<div class="title mb">Guruhga talaba qo'shish</div>
  <div class="row mb"><input id="aq" class="grow" value="${h(q)}" placeholder="Ism, @username, telefon yoki ID"><button class="btn sm" data-act="addSearch">🔎</button></div>
  <div class="list">${d.users.map((u) => `<button class="item" data-act="addToGroup" data-u="${u.tg_id}" data-gid="${gid}" data-name="${h(u.name)}"><div class="grow"><div class="b">${h(u.name)}</div><div class="small muted">${u.username ? '@' + h(u.username) + ' · ' : ''}${h(u.phone || '')} · ${u.tg_id}</div></div><span class="btn sm">➕</span></button>`).join('') || '<div class="item muted">Topilmadi</div>'}</div>
  <p class="tiny muted">Ro'yxatda chiqishi uchun odam avval botga /start yozishi kerak. Osonroq yo'l — guruh havolasini yuborish.</p>`;
};

// ---------------- admin ----------------
V.dash = async () => {
  const s = S.cache.stats = await api('stats');
  renderTabs();
  return `<div class="title mb">Panel</div>
  <div class="stats">
    <div class="stat" data-act="tab" data-k="students" style="cursor:pointer"><div class="v">${s.students}</div><div class="l">Talabalar</div></div>
    <div class="stat" data-act="tab" data-k="groups" style="cursor:pointer"><div class="v">${(s.groups.running || 0) + (s.groups.open || 0)}</div><div class="l">Faol guruhlar</div></div>
    <div class="stat"><div class="v">${s.attendance == null ? '—' : s.attendance + '%'}</div><div class="l">O'rtacha davomat</div></div>
    <div class="stat" data-act="tab" data-k="groups" style="cursor:pointer"><div class="v" style="color:${s.toReview ? 'var(--warn)' : 'inherit'}">${s.toReview}</div><div class="l">Tekshirilmagan topshiriqlar</div></div>
    <div class="stat"><div class="v">${s.certificates}</div><div class="l">Berilgan sertifikatlar</div></div>
    <div class="stat"><div class="v">${s.users}</div><div class="l">Bot foydalanuvchilari</div></div>
  </div>
  <div class="section-title">Kurslar bo'yicha</div>
  <div class="list">${Object.entries(s.perCourse).map(([k, v]) => `
    <div class="item"><div class="num" style="background:${course(k).color};color:#fff">${v.students}</div><div class="grow"><div class="b">${h(course(k).title)}</div><div class="small muted">${v.groups} guruh · ${v.students} talaba · ${v.certificates} sertifikat</div></div></div>`).join('')}</div>
  <div class="section-title">Yangi qo'shilganlar</div>
  <div class="list">${s.recent.map((e) => `<button class="item" data-act="go" data-v="student" data-id="${e.id}"><div class="grow"><div class="b">${h(e.name || '—')}</div><div class="small muted">${h(course(e.course).title)}${e.group ? ' · ' + h(e.group) : ''} · ${h(fmtDate(e.joined_at))}</div></div><span class="chev">›</span></button>`).join('') || "<div class=\"item muted\">Hali talaba yo'q. Guruh yarating va havolani yuboring.</div>"}</div>`;
};

V.students = async () => {
  const f = S.form.sf || {};
  const d = await api('students_list', { q: f.q || '', course: f.c || '' });
  S.cache.students = d.students;
  return `<div class="title mb">Talabalar</div>
  <div class="row mb"><input id="sq" class="grow" value="${h(f.q || '')}" placeholder="Ism, @username, telefon, guruh"><button class="btn sm" data-act="studSearch">🔎</button></div>
  <div class="chips">${[['', 'Hammasi'], ['biznes', 'AI biznesda'], ['umumiy', 'AI bilan ishlash']].map(([v, t]) => `<button class="chip ${(f.c || '') === v ? 'on' : ''}" data-act="studCourse" data-c="${v}">${t}</button>`).join('')}</div>
  ${d.students.length ? `<div class="list">${d.students.map((s) => `
    <button class="item" data-act="go" data-v="student" data-id="${s.enrollment_id}"><div class="num" style="background:${course(s.course).color};color:#fff">${s.done}</div>
      <div class="grow"><div class="b ellipsis">${h(s.name)}</div><div class="small muted ellipsis">${h(s.group || 'guruhsiz')} · ${h(s.courseTitle)}</div></div>${statusBadge(s.status)}</button>`).join('')}</div>` : '<div class="empty"><div class="e">🎓</div>Topilmadi</div>'}`;
};

V.student = async ({ id }) => {
  if (!S.cache.students || !S.cache.students.find((x) => x.enrollment_id === Number(id))) S.cache.students = (await api('students_list', {})).students;
  const s = S.cache.students.find((x) => x.enrollment_id === Number(id));
  if (!s) return '<div class="empty">Topilmadi</div>';
  const gl = S.cache.groups || (S.cache.groups = await api('groups_list'));
  const groups = gl.groups.filter((g) => g.course === s.course && g.status !== 'finished');
  return `<div class="title">${h(s.name)}</div><div class="muted mb">${h(s.courseTitle)} · qo'shilgan ${h(fmtDate(s.joined_at))}</div>
  <div class="card col small">
    <div>📞 ${s.phone ? `<a href="tel:${h(String(s.phone).replace(/\s/g, ''))}">${h(s.phone)}</a>` : '—'}${s.username ? ` · <a href="#" data-act="link" data-url="https://t.me/${h(s.username)}">@${h(s.username)}</a>` : ''}</div>
    <div>👥 ${h(s.group || 'guruhsiz')}</div>
    <div>✅ Belgilangan mashqlar: ${s.done}</div>
    <div>Holat: ${statusBadge(s.status)}</div>
  </div>
  ${s.group_id ? `<button class="btn ghost mb" data-act="openGroup" data-id="${s.group_id}">👥 Guruhni ochish</button>` : ''}
  <div class="section-title">Boshqa guruhga o'tkazish</div>
  <div class="card col"><select id="st-group">${groups.map((g) => `<option value="${g.id}" ${Number(s.group_id) === g.id ? 'selected' : ''}>${h(g.name)} (${g.students}${g.capacity ? '/' + g.capacity : ''})</option>`).join('')}</select>
    <button class="btn" data-act="moveStudent" data-id="${s.enrollment_id}">Saqlash va talabaga xabar berish</button></div>
  ${s.status === 'active' ? `<button class="btn danger mt" data-act="removeStudent" data-id="${s.enrollment_id}" data-name="${h(s.name)}">Guruhdan chiqarish</button>` : ''}
  ${s.status === 'cancelled' ? `<button class="btn ok mt" data-act="restoreStudent" data-id="${s.enrollment_id}">Qayta faollashtirish</button>` : ''}`;
};

V.settings = async () => {
  const d = await api('settings_get');
  const c = d.settings.contacts;
  return `<div class="title mb">Kontaktlar</div>
  <div class="card col">
    <div class="small muted">Talabalar ilovada ko'radi.</div>
    <input id="st-phone" value="${h(c.phone)}" placeholder="Telefon: +998 ...">
    <input id="st-address" value="${h(c.address)}" placeholder="Manzil">
    <input id="st-tg" value="${h(c.telegram)}" placeholder="Telegram: @admin">
    <button class="btn" data-act="saveSettings">Saqlash</button>
  </div>`;
};

V.users = async () => {
  const q = S.form.uq || '';
  const d = await api('users_list', { q });
  return `<div class="title mb">Foydalanuvchilar</div>
  <div class="row mb"><input id="u-q" class="grow" value="${h(q)}" placeholder="Ism, @username, telefon yoki ID"><button class="btn sm" data-act="userSearch">🔎</button></div>
  <div class="list">${d.users.map((u) => `
    <div class="item"><div class="grow"><div class="b">${h(u.name)}</div><div class="small muted">${u.username ? '@' + h(u.username) + ' · ' : ''}${h(u.phone || '')} · ${u.tg_id}</div></div>
      <select data-act-change="setRole" data-u="${u.tg_id}" style="width:auto;padding:6px 8px">${[['student', 'Talaba'], ['teacher', "O'qituvchi"], ['admin', 'Admin']].map(([v, t]) => `<option value="${v}" ${u.role === v ? 'selected' : ''}>${t}</option>`).join('')}</select>
    </div>`).join('') || '<div class="item muted">Topilmadi</div>'}</div>
  <p class="tiny muted">Odam ro'yxatda chiqishi uchun avval botga /start yozishi kerak.</p>`;
};

// ---------------- sertifikat ----------------
function drawCert(c) {
  const W = 1600, H = 1130, cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const x = cv.getContext('2d');
  const k = course(c.course);
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, W, H);
  x.fillStyle = k.color; x.fillRect(0, 0, W, 210);
  x.fillStyle = k.accent; x.fillRect(0, 210, W, 10);
  x.strokeStyle = k.color; x.lineWidth = 3; x.strokeRect(40, 260, W - 80, H - 300);
  x.textAlign = 'center';
  x.fillStyle = '#ffffff'; x.font = '700 30px Segoe UI, Arial'; x.fillText('AI KURSLARI', W / 2, 95);
  x.font = '800 64px Segoe UI, Arial'; x.fillText('SERTIFIKAT', W / 2, 170);
  x.fillStyle = '#6b7280'; x.font = '400 30px Segoe UI, Arial'; x.fillText('Ushbu sertifikat', W / 2, 360);
  x.fillStyle = '#111827'; x.font = '800 74px Segoe UI, Arial'; x.fillText(c.full_name, W / 2, 470);
  x.fillStyle = k.accent; x.fillRect(W / 2 - 220, 500, 440, 5);
  x.fillStyle = '#374151'; x.font = '400 32px Segoe UI, Arial';
  x.fillText('ga quyidagi amaliy kursni muvaffaqiyatli tamomlagani uchun berildi:', W / 2, 580);
  x.fillStyle = k.color; x.font = '800 58px Segoe UI, Arial'; x.fillText('«' + k.title + '»', W / 2, 670);
  x.fillStyle = '#4b5563'; x.font = '400 28px Segoe UI, Arial';
  x.fillText(`${k.lessons.length} dars · ${k.hours} soat · offline`, W / 2, 725);
  if (c.grade) { x.fillStyle = k.accent; x.font = '700 32px Segoe UI, Arial'; x.fillText('Natija: ' + c.grade, W / 2, 785); }
  x.textAlign = 'left'; x.fillStyle = '#374151'; x.font = '400 26px Segoe UI, Arial';
  x.fillText('Berilgan sana: ' + fmtDate(c.issued_at), 110, 960);
  x.fillText('Tekshirish kodi: ' + c.code, 110, 1000);
  x.textAlign = 'right'; x.fillText('___________________', W - 110, 960); x.fillText('Kurs rahbari', W - 160, 1000);
  return cv.toDataURL('image/png');
}

// ---------------- harakatlar ----------------
const ACT = {
  back, reload: () => render(),
  previewOn: () => setPreview(true),
  previewOff: () => setPreview(false),
  tab: (d) => setTab(d.k),
  go: (d) => go(d.v, { ...d }),
  link: (d) => openLink(d.url),
  copy: (d) => copy(d.t),
  copyPrompt: (d) => copy(S.cache.prompts[d.id]),
  pickPreview: (d) => { S.previewCourse = d.c; S.cache.fresh = S.tab === 'home'; haptic(); render(); },
  pickCourse: (d) => { S.curCourse = d.c; S.cache.fresh = S.tab === 'home'; haptic(); render(); },
  expand: (d, el) => el.classList.toggle('open'),
  promptSearch: () => { S.form.pq = $('#pq').value; render(); },
  share: (d) => {
    const text = `«${d.name}» guruhiga qo'shilish uchun havolani bosing:`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(d.url)}&text=${encodeURIComponent(text)}`;
    if (inTg()) tg.openTelegramLink(url); else copy(d.url);
  },
  join: (d, el) => run(async () => {
    const r = await api('join', { code: $('#j-code').value.trim() });
    haptic('ok'); toast(r.already ? 'Siz allaqachon shu guruhdasiz' : `«${r.group.name}» guruhiga qo'shildingiz ✓`);
    await loadMe(); S.tab = tabsFor().find((t) => t[0] === 'home') ? 'home' : tabsFor()[0][0]; S.cache.fresh = S.tab === 'home'; S.stack = []; render();
  }, el),
  saveProfile: (d, el) => run(async () => {
    await api('profile_save', { full_name: $('#p-name').value, phone: $('#p-phone').value });
    haptic('ok'); toast('Saqlandi ✓'); render();
  }, el),
  openEnr: (d) => go('enr', { id: d.id }),
  openLesson: (d) => go('lesson', { c: d.c, n: d.n }),
  lockedLesson: () => toast("Dars o'qituvchi uni boshlaganda ochiladi"),
  toggleEx: (d, el) => run(async () => {
    const L = S.cache.lesson; const on = !L.progress.has(d.item);
    await api('progress_set', { course: L.c, n: L.n, item: d.item, done: on });
    on ? L.progress.add(d.item) : L.progress.delete(d.item);
    el.classList.toggle('on', on); el.textContent = on ? '✓' : ''; el.nextElementSibling.textContent = on ? 'Bajarildi' : 'Bajarganimda belgilayman';
    haptic(on ? 'ok' : 'light');
  }),
  submitWork: (d, el) => run(async () => {
    const L = S.cache.lesson;
    await api('submit', { course: L.c, n: L.n, text: $('#s-text').value, link: $('#s-link').value });
    haptic('ok'); toast("Yuborildi ✓ O'qituvchi ko'rib chiqadi"); render();
  }, el),
  verify: (d, el) => run(async () => {
    const r = await api('cert_verify', { code: $('#v-code').value.trim() });
    $('#v-res').innerHTML = r.valid
      ? `<div class="card" style="border-left:5px solid var(--ok)"><div class="b" style="color:var(--ok)">✅ Haqiqiy sertifikat</div><div class="mt"><b>${h(r.certificate.full_name)}</b></div><div class="small muted">${h(r.certificate.courseTitle)} · ${h(fmtDate(r.certificate.issued_at))}${r.certificate.grade ? ' · ' + h(r.certificate.grade) : ''}</div><div class="small">${h(r.certificate.code)}</div></div>`
      : '<div class="card" style="border-left:5px solid var(--bad)"><div class="b" style="color:var(--bad)">❌ Bunday sertifikat topilmadi</div></div>';
  }, el),
  openCert: (d) => go('cert', { code: d.code }),
  sendCert: (d, el) => run(async () => { await api('cert_send', { code: d.code, png: S.cache.certPng }); haptic('ok'); toast('Botga yuborildi ✓'); }, el),
  // o'qituvchi
  openGroup: (d) => go('group', { id: d.id }),
  gsel: (d) => { S.gsel[d.gid] = Number(d.n); render(); },
  openSession: async (d, el) => { if (await confirmDlg(`${d.n}-darsni ochasizmi? Talabalarga xabar boradi.`)) run(async () => { const r = await api('lesson_open', { group_id: Number(d.gid), n: Number(d.n) }); haptic('ok'); toast(`Ochildi ✓ ${r.sent || 0} ta talabaga xabar`); render(); }, el); },
  att: (d, el) => run(async () => { const on = d.on !== '1'; await api('attendance_set', { group_id: Number(d.gid), n: Number(d.n), user_id: Number(d.u), present: on }); el.dataset.on = on ? '1' : '0'; el.classList.toggle('on', on); el.textContent = on ? '✓' : ''; haptic(); }),
  announce: async (d, el) => { const text = $('#ann').value.trim(); if (!text) return toast('Matn yozing'); if (await confirmDlg("E'lon guruhdagi hamma talabaga yuboriladi. Yuborilsinmi?")) run(async () => { const r = await api('announce', { group_id: Number(d.gid), text }); haptic('ok'); toast(`Yuborildi: ${r.sent}/${r.total}`); $('#ann').value = ''; }, el); },
  review: (d, el) => run(async () => { await api('submission_review', { id: Number(d.id), feedback: $('#fb-' + d.id).value, score: $('#sc-' + d.id).value }); haptic('ok'); toast('Izoh yuborildi ✓'); render(); }, el),
  issueCert: async (d, el) => { if (await confirmDlg(`${d.name} uchun sertifikat berilsinmi? Kurs «tugatgan» holatiga o'tadi.`)) run(async () => { const r = await api('cert_issue', { enrollment_id: Number(d.e) }); haptic('ok'); toast('Sertifikat: ' + r.certificate.code); render(); }, el); },
  resetInvite: async (d, el) => { if (await confirmDlg('Yangi kod yaratilsinmi? Eski havola ishlamay qoladi.')) run(async () => { await api('group_invite_reset', { group_id: Number(d.gid) }); haptic('ok'); toast('Yangi kod ✓'); render(); }, el); },
  saveGroup: (d, el) => run(async () => {
    const v = (id) => { const x = $(id); return x ? x.value : undefined; };
    const r = await api('group_save', { id: d.id ? Number(d.id) : undefined, course: v('#g-course'), package: v('#g-package'), name: v('#g-name'), schedule: v('#g-schedule'), start_date: v('#g-start'), location: v('#g-location'), capacity: v('#g-cap'), teacher_id: v('#g-teacher'), status: v('#g-status') });
    haptic('ok'); S.cache.groups = null; await loadMe();
    if (d.id) { toast('Saqlandi ✓'); back(); } else { toast('Guruh yaratildi ✓ Havolani talabalarga yuboring'); S.stack = [{ view: 'group', params: { id: r.group.id } }]; render(); }
  }, el),
  addSearch: () => { S.form.aq = $('#aq').value; render(); },
  addToGroup: async (d, el) => { if (await confirmDlg(`${d.name} guruhga qo'shilsinmi?`)) run(async () => { const r = await api('student_add', { tg_id: Number(d.u), group_id: Number(d.gid) }); haptic('ok'); toast(r.already ? 'Allaqachon guruhda' : "Qo'shildi ✓"); back(); }, el); },
  // admin
  studSearch: () => { S.form.sf = { ...(S.form.sf || {}), q: $('#sq').value }; render(); },
  studCourse: (d) => { S.form.sf = { ...(S.form.sf || {}), c: d.c }; render(); },
  moveStudent: (d, el) => run(async () => { await api('enrollment_update', { id: Number(d.id), group_id: Number($('#st-group').value) }); haptic('ok'); toast('Saqlandi ✓'); S.cache.students = null; S.cache.groups = null; render(); }, el),
  removeStudent: async (d, el) => { if (await confirmDlg(`${d.name} guruhdan chiqarilsinmi? Darslarga kirishi yopiladi.`)) run(async () => { await api('enrollment_update', { id: Number(d.id), status: 'cancelled' }); S.cache.students = null; back(); }, el); },
  restoreStudent: (d, el) => run(async () => { await api('enrollment_update', { id: Number(d.id), status: 'active' }); S.cache.students = null; toast('Faollashtirildi ✓'); render(); }, el),
  saveSettings: (d, el) => run(async () => {
    await api('settings_save', { contacts: { phone: $('#st-phone').value.trim(), address: $('#st-address').value.trim(), telegram: $('#st-tg').value.trim() } });
    haptic('ok'); toast('Saqlandi ✓');
  }, el),
  userSearch: () => { S.form.uq = $('#u-q').value; render(); },
};
const CHANGE = {
  setRole: (d, el) => run(async () => { await api('user_role', { tg_id: Number(d.u), role: el.value }); haptic('ok'); toast('Rol yangilandi ✓'); }),
};

document.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-act]');
  if (!el) return;
  if (el.tagName === 'A') ev.preventDefault();
  const fn = ACT[el.dataset.act];
  if (fn) fn({ ...el.dataset }, el);
});
document.addEventListener('change', (ev) => {
  const el = ev.target.closest('[data-act-change]');
  if (el && CHANGE[el.dataset.actChange]) CHANGE[el.dataset.actChange]({ ...el.dataset }, el);
});
document.addEventListener('keydown', (ev) => {
  if (ev.key !== 'Enter') return;
  const k = { 'u-q': 'userSearch', sq: 'studSearch', aq: 'addSearch', pq: 'promptSearch', 'j-code': 'join' }[ev.target.id];
  if (k) ACT[k]({}, ev.target.closest('.card') && ev.target.closest('.card').querySelector('.btn'));
});

// ---------------- lokal sinov paneli ----------------
const DEV_USERS = [['guest', 'Mehmon'], ['student', 'Talaba'], ['teacher', "O'qituvchi"], ['admin', 'Admin']];
async function devLogin(as) {
  const r = await (await fetch('/dev/init?as=' + as)).json();
  S.initData = r.initData; S.devAs = as; S.devUid = r.user.id; S.cache = {}; S.form = {};
  localStorage.setItem('devAs', as);
  await loadMe(); S.tab = tabsFor()[0][0]; S.cache.fresh = S.tab === 'home'; S.stack = []; drawDevBar(); render();
}
function drawDevBar() {
  $('#dev').innerHTML = `<div class="devbar"><b>🧪 LOKAL SINOV</b>${DEV_USERS.map(([k, t]) => `<button class="${S.devAs === k ? 'on' : ''}" data-dev="as" data-k="${k}">${t}</button>`).join('')}
    <button data-dev="bot">💬 Bot</button><button data-dev="reset">♻️</button></div>`;
}
async function devBot() {
  const box = $('.devbox');
  if (box) { box.remove(); return; }
  const list = await (await fetch('/dev/outbox?chat=' + S.devUid)).json();
  const el = document.createElement('div'); el.className = 'devbox';
  el.innerHTML = `<div class="row between mb"><b>Bot → ${h(DEV_USERS.find((x) => x[0] === S.devAs)[1])}</b><button data-dev="bot" style="background:#374151;color:#fff;border-radius:8px;padding:3px 8px">✕</button></div>` +
    (list.length ? list.slice().reverse().map((m) => {
      const kb = (m.payload.reply_markup && m.payload.reply_markup.inline_keyboard) || [];
      return `<div class="m">${h((m.payload.text || m.payload.caption || '').replace(/<[^>]+>/g, ''))}${kb.flat().map((b) => `<button disabled>${h(b.text)}</button>`).join('')}</div>`;
    }).join('') : "<div class=\"m\">Hali xabar yo'q</div>");
  document.body.appendChild(el);
}
document.addEventListener('click', async (ev) => {
  const el = ev.target.closest('[data-dev]');
  if (!el) return;
  const k = el.dataset.dev;
  if (k === 'as') return devLogin(el.dataset.k);
  if (k === 'bot') return devBot();
  if (k === 'reset' && confirm('Lokal bazani tozalaysizmi?')) { await fetch('/dev/reset'); location.reload(); }
});

// ---------------- ishga tushirish ----------------
function startParam() {
  return (tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param) || new URLSearchParams(location.search).get('start') || '';
}
async function applyStart(p) {
  let m;
  if (p === 'admin') S.tab = tabsFor()[0][0];
  else if (p === 'certs') S.tab = 'profile';
  else if ((m = p.match(/^lesson_(biznes|umumiy)_(\d+)$/))) S.stack = [{ view: 'lesson', params: { c: m[1], n: m[2] } }];
  else if ((m = p.match(/^group_(\d+)$/)) && isStaff()) { S.tab = 'groups'; S.stack = [{ view: 'group', params: { id: m[1] } }]; }
  else if ((m = p.match(/^cert_(.+)$/))) S.stack = [{ view: 'verify', params: { code: m[1] } }];
  else if ((m = p.match(/^g_([A-Za-z0-9]{4,12})$/))) {
    try { const r = await api('join', { code: m[1] }); toast(r.already ? 'Siz shu guruhdasiz' : `«${r.group.name}» guruhiga qo'shildingiz ✓`); await loadMe(); }
    catch (e) { toast(e.message); }
  }
}

// Server manzilini topish: GitHub Pages'dagi api.json (bot har ishga tushganda yangilaydi)
// yoki tugma URL'idagi ?api=. Faqat ishonchli ko'rinishdagi manzillar qabul qilinadi.
const API_RE = /^https:\/\/[a-z0-9-]+\.(trycloudflare\.com|supabase\.co)\/(api|functions\/v1\/api)$/;
async function resolveApi() {
  if (CFG.API_URL) return CFG.API_URL;
  const cands = [];
  try { const j = await (await fetch('api.json?t=' + Date.now(), { cache: 'no-store' })).json(); if (j.api) cands.push(j.api); } catch (_) {}
  const qp = new URLSearchParams(location.search).get('api');
  if (qp) cands.push(qp);
  for (const u of [...new Set(cands)].filter((x) => API_RE.test(x))) {
    try {
      const r = await fetch(u, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'ping' }) });
      if (r.ok) return u;
    } catch (_) {}
  }
  return null;
}

async function boot() {
  if (tg) {
    tg.ready(); tg.expand();
    try { tg.setHeaderColor('secondary_bg_color'); } catch (_) {}
    tg.BackButton && tg.BackButton.onClick(back);
  }
  S.catalog = await (await fetch('catalog.json?v=' + Date.now())).json();
  try { S.preview = localStorage.getItem('preview') === '1'; } catch (_) {}
  CFG.API_URL = await resolveApi();
  if (!CFG.API_URL) {
    app.innerHTML = '<div class="view"><div class="empty"><div class="e">🔌</div><div class="b">Server hozir yangilanmoqda</div><div class="mt">Bir daqiqadan keyin qayta urinib ko\'ring.</div><div class="mt"><button class="btn sm" onclick="location.reload()">Qayta urinish</button></div></div></div>';
    return;
  }
  if (!S.initData && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    S.dev = true; drawDevBar();
    return devLogin(localStorage.getItem('devAs') || 'guest');
  }
  try {
    await loadMe();
    S.tab = tabsFor()[0][0];
    await applyStart(startParam());
    S.cache.fresh = S.tab === 'home' && !S.stack.length;
  } catch (e) { S.tab = 'home'; if (S.initData) toast(e.message); }
  render();
}
boot();
})();
