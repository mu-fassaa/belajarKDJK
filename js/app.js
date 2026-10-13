/**
 * app.js - Main Application Controller for BelajarKDJK
 * Komunikasi Data dan Jaringan Komputer (KDJK)
 * Features:
 * - Dashboard (Beranda) with Daily Target, Streak, Progress per Bab (1-6), Focus Bab Terlemah
 * - Ringkasan (Searchable & Filterable) from Course Summary PDFs
 * - Kartu (Flashcards with Leitner Box 1-3 & Mastery Tracker)
 * - Pilihan Ganda (90 PG Soal: 4 Opsi, Instant Feedback & Penjelasan)
 * - Benar/Salah (90 BS Soal: True/False & Penjelasan)
 * - Cocokkan (18 Set Pasangan: Dropdown Matching)
 * - Isian Singkat (90 Isian Soal with Levenshtein Fuzzy Matching)
 * - Ulangi Salah (Cross-category Wrong Review Bank, graduates after 2 consecutive correct)
 * - Esai (18 Soal Komprehensif UTS with Accordion & Progress Tracking)
 * - Simulasi (Simulasi UTS Berwaktu dengan PG, BS, FI, MT, Timer, Score & Review)
 * - Export & Import Progress
 */

const $ = s => document.querySelector(s);
const app = $('#app');

// Shuffler
const sh = a => [...a].sort(() => Math.random() - .5);

// Chapter Names fallback
if (typeof window.CHAPTER_NAMES === 'undefined') {
  window.CHAPTER_NAMES = {
    1: 'Pengantar Jaringan Komunikasi',
    2: 'Arsitektur Berlapis, OSI & TCP/IP',
    3: 'Dasar-Dasar Transmisi Digital',
    4: 'Multiplexing, Switching & Seluler',
    5: 'Peer-to-Peer Protocols & Data Link',
    6: 'Medium Access Control & LAN'
  };
}

// Tabs list
const TABS = [
  ['home', 'Beranda'],
  ['rg', 'Ringkasan'],
  ['fc', 'Kartu'],
  ['pg', 'Pilihan Ganda'],
  ['bs', 'Benar/Salah'],
  ['mt', 'Cocokkan'],
  ['fi', 'Isian'],
  ['wrong', 'Ulangi Salah'],
  ['es', 'Esai'],
  ['sim', 'Simulasi']
];

// App State
let mode = KDJKStorage.get('ui.mode', 'home'),
  ch = KDJKStorage.get('ui.ch', 0),
  onlyBm = KDJKStorage.get('ui.onlyBookmarked', false),
  st = {},
  deck = [],
  i = 0,
  flip = false,
  search = '',
  simInterval = null;

// Helper to get question by stable ID
function getQuestionById(id) {
  if (!id) return null;
  if (id.startsWith('pg_')) {
    const found = PG.find(item => KDJKStorage.hashId('pg', item[2]) === id);
    if (found) return { type: 'pg', data: found };
  } else if (id.startsWith('bs_')) {
    const found = B.find(item => KDJKStorage.hashId('bs', item[2]) === id);
    if (found) return { type: 'bs', data: found };
  } else if (id.startsWith('fi_')) {
    const found = F.find(item => KDJKStorage.hashId('fi', item[2]) === id);
    if (found) return { type: 'fi', data: found };
  } else if (id.startsWith('mt_')) {
    const found = M.find(item => KDJKStorage.hashId('mt', item[1]) === id);
    if (found) return { type: 'mt', data: found };
  } else if (id.startsWith('fc_')) {
    const found = C.find(item => KDJKStorage.hashId('fc', item[1]) === id);
    if (found) return { type: 'fc', data: found };
  } else if (id.startsWith('es_')) {
    const found = E.find(item => KDJKStorage.hashId('es', item.soal) === id);
    if (found) return { type: 'es', data: found };
  }
  return null;
}

// Navigation & Filter Chips
function updateScrollFades() {
  ['tabs', 'chips'].forEach(id => {
    const el = $('#' + id);
    const wrap = $('#' + id + '-wrap') || el;
    if (!el || !wrap) return;
    const canLeft = el.scrollLeft > 2;
    const canRight = el.scrollLeft < (el.scrollWidth - el.clientWidth - 2);
    wrap.classList.toggle('can-scroll-left', canLeft);
    wrap.classList.toggle('can-scroll-right', canRight);
  });
}

function nav() {
  const tabsEl = $('#tabs');
  const chipsEl = $('#chips');

  const tabsScroll = tabsEl ? tabsEl.scrollLeft : 0;
  const chipsScroll = chipsEl ? chipsEl.scrollLeft : 0;

  const wrongMap = KDJKStorage.get('wrongReview', {});
  const wrongCount = Object.keys(wrongMap).length;
  const bmList = KDJKStorage.get('bookmarks', []);
  const bmCount = Array.isArray(bmList) ? bmList.length : 0;

  if (tabsEl) {
    tabsEl.innerHTML = TABS.map(t => {
      let label = t[1];
      if (t[0] === 'wrong' && wrongCount > 0) {
        label += ` (${wrongCount})`;
      }
      const isSelected = mode === t[0];
      return `<button class="tab ${isSelected ? 'on' : ''}" data-m="${t[0]}" role="tab" aria-selected="${isSelected ? 'true' : 'false'}" tabindex="${isSelected ? '0' : '-1'}" aria-label="${t[1]}">${label}</button>`;
    }).join('');
    tabsEl.scrollLeft = tabsScroll;
    const activeTab = tabsEl.querySelector('.tab.on');
    if (activeTab && tabsEl.scrollWidth > tabsEl.clientWidth) {
      activeTab.scrollIntoView({ inline: 'nearest', block: 'nearest' });
    }
  }

  if (chipsEl) {
    const chipsHtml = ['Semua', 1, 2, 3, 4, 5, 6].map((c, k) => {
      const isSelected = ch === k;
      return `<button class="chip ${isSelected ? 'on' : ''}" data-c="${k}" role="button" aria-pressed="${isSelected ? 'true' : 'false'}" aria-label="${k ? 'Bab ' + c : 'Semua Bab'}">${k ? 'Bab ' + c : c}</button>`;
    }).join('');

    const bmChipHtml = `<button class="chip ${onlyBm ? 'on' : ''}" id="bm-filter-btn" role="button" aria-pressed="${onlyBm ? 'true' : 'false'}" aria-label="Filter hanya soal yang ditandai penting">★ Penting ${bmCount > 0 ? '(' + bmCount + ')' : ''}</button>`;

    chipsEl.innerHTML = chipsHtml + bmChipHtml;
    chipsEl.scrollLeft = chipsScroll;
    const activeChip = chipsEl.querySelector('.chip.on');
    if (activeChip && chipsEl.scrollWidth > chipsEl.clientWidth) {
      activeChip.scrollIntoView({ inline: 'nearest', block: 'nearest' });
    }
  }

  updateScrollFades();
}

// Standard Quiz Flow for PG, BS, MT, FI
function flow(k, pool, draw, fresh) {
  let S = st[k];
  if (fresh || !S) {
    let filtered = pool.filter(x => !ch || x[0] === ch);
    if (onlyBm) {
      filtered = filtered.filter(x => {
        const titleForHash = (k === 'pg' || k === 'bs' || k === 'fi') ? x[2] : x[1];
        const qId = KDJKStorage.hashId(k, titleForHash);
        return KDJKStorage.isBookmarked(qId);
      });
    }
    S = st[k] = { l: sh(filtered), i: 0, s: 0, t: 0 };
  }

  if (!S.l.length) {
    const emptyMsg = onlyBm
      ? 'Belum ada soal yang ditandai penting di bab ini. Tekan tombol ★ pada soal untuk menandainya.'
      : 'Belum ada soal untuk bab ini. Pilih bab lain.';
    app.innerHTML = `<div class="pn">${emptyMsg}</div>`;
    return;
  }

  if (S.i >= S.l.length) {
    const pct = S.t ? Math.round((S.s / S.t) * 100) : 0;
    app.innerHTML = `
      <div class="pn c">
        <div class="info3">
          <div><b>${S.s}</b>Benar</div>
          <div><b>${S.t - S.s}</b>Salah</div>
          <div><b>${pct}%</b>Skor</div>
        </div>
        <p>${S.s === S.t ? 'Sempurna, siap hadapi UTS KDJK!' : S.s >= S.t * 0.7 ? 'Bagus sekali! Tingkatkan lagi pemahaman detailnya.' : 'Buka tab Ringkasan atau Kartu dulu, lalu ulangi kuis ini.'}</p>
        <div class="row">
          <button class="cta o" id="btn-back-home">Ke Beranda</button>
          <button class="cta" id="rs">Main lagi</button>
        </div>
      </div>
    `;
    $('#rs').onclick = () => flow(k, pool, draw, 1);
    $('#btn-back-home').onclick = () => {
      mode = 'home';
      KDJKStorage.set('ui.mode', 'home');
      go();
    };
    return;
  }

  const x = S.l[S.i];
  const titleForHash = (k === 'pg' || k === 'bs' || k === 'fi') ? x[2] : x[1];
  const qId = KDJKStorage.hashId(k, titleForHash);
  const isBm = KDJKStorage.isBookmarked(qId);
  const re = () => flow(k, pool, draw);

  const fin = (ok, msg, n = 1) => {
    S.s += ok;
    S.t += n;
    $('#fb').innerHTML = `
      <div class="exp">${msg}</div>
      <button class="cta w" id="nx">${S.i + 1 < S.l.length ? 'Lanjut' : 'Lihat skor'}</button>
    `;
    $('#nx').onclick = () => {
      S.i++;
      re();
      window.scrollTo(0, Math.max(0, $('#chips').offsetTop - 70));
    };
  };

  app.innerHTML = `
    <div class="bar"><i style="width:${(S.i / S.l.length) * 100}%"></i></div>
    <div class="pn">
      <div class="top-bar-quiz">
        <div class="tag">Bab ${x[0]} · ${S.i + 1} dari ${S.l.length}</div>
        <button class="bm-btn ${isBm ? 'on' : ''}" data-qid="${qId}" aria-label="Tandai penting">★ ${isBm ? 'Penting' : 'Tandai'}</button>
      </div>
      ${draw.h(x)}
      <div id="fb"></div>
    </div>
  `;

  // Attach bookmark toggle
  const bmBtn = app.querySelector ? app.querySelector('.bm-btn') : null;
  if (bmBtn) {
    bmBtn.onclick = (e) => {
      e.stopPropagation();
      const on = KDJKStorage.toggleBookmark(qId);
      bmBtn.classList.toggle('on', on);
      bmBtn.innerHTML = `★ ${on ? 'Penting' : 'Tandai'}`;
      nav();
    };
  }

  draw.b(x, fin);
}

// Pilihan Ganda Handlers
const PG_HELPER = {
  h: x => `
    <p class="q">${x[2]}</p>
    <div class="pg-opts">
      ${x[3].map((opt, idx) => `
        <button class="opt pg-opt" data-idx="${idx}">
          <span style="display:inline-block;width:24px;color:var(--mag);font-weight:900">${String.fromCharCode(65 + idx)}.</span>
          <span>${opt}</span>
        </button>
      `).join('')}
    </div>
  `,
  b: (x, fin) => app.querySelectorAll('.pg-opt').forEach(btn => btn.onclick = () => {
    const chosenIdx = +btn.dataset.idx;
    const correctIdx = x[4];
    const ok = chosenIdx === correctIdx;

    app.querySelectorAll('.pg-opt').forEach(b => {
      b.disabled = true;
      if (+b.dataset.idx === correctIdx) b.classList.add('ok');
      else if (b === btn) b.classList.add('bad');
    });

    // Log answer to centralized storage
    const qId = KDJKStorage.hashId('pg', x[2]);
    KDJKStorage.logAnswer({ id: qId, kategori: 'pg', bab: x[0], benar: ok });

    const correctLetter = String.fromCharCode(65 + correctIdx);
    const msg = (ok ? '<b>Benar!</b> ' : `<b>Belum tepat.</b> Jawaban benar: <b>${correctLetter}. ${x[3][correctIdx]}</b>. `) +
      (x[5] ? `<br><br><span style="opacity:0.9">💡 <b>Penjelasan:</b> ${x[5]}</span>` : '');

    fin(+ok, msg);
  })
};

// Benar / Salah Handlers
const BS_HELPER = {
  h: x => `
    <p class="q">${x[2]}</p>
    <div style="display:flex;gap:12px">
      <button class="opt bs-opt" data-v="1" style="flex:1;text-align:center">Benar</button>
      <button class="opt bs-opt" data-v="0" style="flex:1;text-align:center">Salah</button>
    </div>
  `,
  b: (x, fin) => app.querySelectorAll('.bs-opt').forEach(b => b.onclick = () => {
    const v = +b.dataset.v;
    const ok = v === x[3];
    app.querySelectorAll('.bs-opt').forEach(o => {
      o.disabled = true;
      if (+o.dataset.v === x[3]) o.classList.add('ok');
      else if (o === b) o.classList.add('bad');
    });

    const qId = KDJKStorage.hashId('bs', x[2]);
    KDJKStorage.logAnswer({ id: qId, kategori: 'bs', bab: x[0], benar: ok });

    const msg = (ok ? '<b>Benar!</b> ' : '<b>Belum tepat.</b> ') + (x[4] ? `<br><br>💡 <b>Penjelasan:</b> ${x[4]}` : '');
    fin(+ok, msg);
  })
};

// Cocokkan Handlers
const MT_HELPER = {
  h: x => `
    <p class="q">Cocokkan tiap deskripsi/fungsi dengan istilah yang tepat pada <b>${x[1]}</b>.</p>
    ${x[3].map((t, k) => `
      <div class="mr">
        <div>${t[0]}</div>
        <select data-k="${k}">
          <option value="">-- Pilih Istilah --</option>
          ${x[2].map((o, j) => `<option value="${j}">${o}</option>`).join('')}
        </select>
      </div>
    `).join('')}
    <button class="cta w" id="ck">Periksa Pasangan</button>
  `,
  b: (x, fin) => {
    $('#ck').onclick = () => {
      let ok = 0;
      const idSet = KDJKStorage.hashId('mt', x[1]);

      app.querySelectorAll('select').forEach((e, k) => {
        const c = x[3][k][1];
        const r = e.value !== '' && +e.value === c;
        if (r) ok++;
        e.classList.add(r ? 'good' : 'wrong');
        e.disabled = true;
        if (!r) e.parentElement.firstElementChild.insertAdjacentHTML('beforeend', `<div class="hint" style="color:var(--yel)">Benar: ${x[2][c]}</div>`);

        const pairId = KDJKStorage.hashId('mt_pair', x[1] + ':' + x[3][k][0]);
        KDJKStorage.logAnswer({ id: pairId, kategori: 'mt_pair', bab: x[0], benar: r });
      });

      $('#ck').remove();

      const isSetAllCorrect = (ok === x[3].length);
      KDJKStorage.logAnswer({
        id: idSet,
        kategori: 'mt',
        bab: x[0],
        benar: isSetAllCorrect,
        detail: { ok, total: x[3].length }
      });

      fin(ok, `<b>${ok} dari ${x[3].length} cocok dengan tepat.</b>`, x[3].length);
    };
  }
};

// Levenshtein Distance & Fuzzy Matcher for Isian
function levenshteinDistance(a, b) {
  a = String(a).toLowerCase().trim();
  b = String(b).toLowerCase().trim();
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

function checkIsianAnswer(userVal, keywordPattern) {
  if (!userVal) return { ok: false, fuzzy: false };
  const v = String(userVal).trim().toLowerCase();
  const keywords = String(keywordPattern).split('/').map(k => k.trim().toLowerCase());

  for (const kw of keywords) {
    if (v === kw || v.includes(kw) || kw.includes(v)) {
      return { ok: true, fuzzy: false };
    }
  }

  const words = v.split(/\s+/);
  for (const kw of keywords) {
    for (const word of words) {
      if (word.length >= 4 && kw.length >= 4) {
        const dist = levenshteinDistance(word, kw);
        if (dist <= 1 || (kw.length >= 8 && dist <= 2)) {
          return { ok: true, fuzzy: true };
        }
      }
    }
  }

  return { ok: false, fuzzy: false };
}

// Isian Handlers with Fuzzy Matching
const FI_HELPER = {
  h: x => `
    <p class="q">${x[2]}</p>
    <input id="ans" placeholder="Ketik jawabanmu di sini..." autocomplete="off">
    <button class="cta w" id="ck">Periksa Jawaban</button>
  `,
  b: (x, fin) => {
    const goCheck = () => {
      const v = $('#ans').value;
      const res = checkIsianAnswer(v, x[3]);
      $('#ans').disabled = true;
      $('#ck').remove();

      const qId = KDJKStorage.hashId('fi', x[2]);
      KDJKStorage.logAnswer({ id: qId, kategori: 'fi', bab: x[0], benar: res.ok });

      let msg = res.ok
        ? (res.fuzzy ? '<b>Benar!</b> <i>(Tip: perhatikan ejaan resmi)</i>. ' : '<b>Benar!</b> ')
        : 'Belum tepat. ';
      msg += `Kunci Jawaban: <b>${x[4]}</b>`;
      if (x[5]) msg += `<br><br><span style="opacity:0.9">💡 <b>Penjelasan:</b> ${x[5]}</span>`;
      fin(+res.ok, msg);
    };
    $('#ck').onclick = goCheck;
    $('#ans').onkeydown = e => {
      if (e.key === 'Enter') goCheck();
    };
  }
};

// Mode: Ulangi Soal Salah
function wrong() {
  const wrongMap = KDJKStorage.get('wrongReview', {});
  const wrongEntries = Object.values(wrongMap).filter(w => !ch || w.bab === ch);

  if (!wrongEntries.length) {
    app.innerHTML = `
      <div class="dash-card c empty-state">
        <h3>Bank Soal Salah Bersih! 🎉</h3>
        <p>Tidak ada soal yang tercatat salah saat ini${ch ? ' untuk Bab ' + ch : ''}. Setiap soal yang salah otomatis lulus dari bank setelah kamu jawab benar 2 kali berturut-turut.</p>
        <div class="row">
          <button class="cta o" id="btn-home-back">Ke Beranda</button>
          <button class="cta" id="btn-to-pg">Latih Pilihan Ganda</button>
        </div>
      </div>
    `;
    $('#btn-home-back').onclick = () => { mode = 'home'; KDJKStorage.set('ui.mode', 'home'); go(); };
    $('#btn-to-pg').onclick = () => { mode = 'pg'; KDJKStorage.set('ui.mode', 'pg'); go(); };
    return;
  }

  // Resolve questions from bank
  const pool = [];
  wrongEntries.forEach(entry => {
    const q = getQuestionById(entry.id);
    if (q) {
      pool.push({ entry, type: q.type, data: q.data });
    }
  });

  if (!st['wrong_flow']) {
    st['wrong_flow'] = { list: sh(pool), idx: 0, correct: 0 };
  }
  const S = st['wrong_flow'];

  if (S.idx >= S.list.length) {
    app.innerHTML = `
      <div class="dash-card c">
        <h2>Selesai Review Soal Salah!</h2>
        <div class="info3">
          <div><b>${S.correct}</b>Benar</div>
          <div><b>${S.list.length - S.correct}</b>Masih Salah</div>
          <div><b>${Object.keys(KDJKStorage.get('wrongReview', {})).length}</b>Sisa di Bank</div>
        </div>
        <p>Soal yang dijawab benar 2 kali berturut-turut resmi lulus dari Bank Salah.</p>
        <div class="row">
          <button class="cta o" id="btn-back-home-w">Ke Beranda</button>
          <button class="cta" id="btn-retry-w">Ulangi Sisa Salah</button>
        </div>
      </div>
    `;
    $('#btn-back-home-w').onclick = () => { mode = 'home'; KDJKStorage.set('ui.mode', 'home'); go(); };
    $('#btn-retry-w').onclick = () => { delete st['wrong_flow']; wrong(); };
    return;
  }

  const currentItem = S.list[S.idx];
  const qType = currentItem.type;
  const qData = currentItem.data;
  const qId = currentItem.entry.id;
  const isBm = KDJKStorage.isBookmarked(qId);
  const consec = currentItem.entry.consecutiveCorrect || 0;

  const fin = (ok, msg, n = 1) => {
    if (ok) S.correct++;
    let note = msg;
    if (ok) {
      if (consec + 1 >= 2) {
        note += '<br><b style="color:var(--yel)">✨ Soal ini resmi lulus dari Bank Soal Salah!</b>';
      } else {
        note += '<br><i>(Dijawab benar 1x, butuh 1x benar lagi agar lulus bank salah)</i>';
      }
    }
    $('#fb').innerHTML = `
      <div class="exp">${note}</div>
      <button class="cta w" id="nx">${S.idx + 1 < S.list.length ? 'Lanjut' : 'Lihat Hasil'}</button>
    `;
    $('#nx').onclick = () => {
      S.idx++;
      wrong();
      window.scrollTo(0, Math.max(0, $('#chips').offsetTop - 70));
    };
  };

  const drawHelper = qType === 'pg' ? PG_HELPER : qType === 'bs' ? BS_HELPER : qType === 'mt' ? MT_HELPER : FI_HELPER;

  app.innerHTML = `
    <div class="bar"><i style="width:${(S.idx / S.list.length) * 100}%"></i></div>
    <div class="pn">
      <div class="top-bar-quiz">
        <div class="tag">Bab ${qData[0]} · Soal Salah ${S.idx + 1} dari ${S.list.length} (${qType.toUpperCase()})</div>
        <button class="bm-btn ${isBm ? 'on' : ''}" data-qid="${qId}" aria-label="Tandai penting">★ ${isBm ? 'Penting' : 'Tandai'}</button>
      </div>
      ${drawHelper.h(qData)}
      <div id="fb"></div>
    </div>
  `;

  const bmBtn = app.querySelector ? app.querySelector('.bm-btn') : null;
  if (bmBtn) {
    bmBtn.onclick = (e) => {
      e.stopPropagation();
      const on = KDJKStorage.toggleBookmark(qId);
      bmBtn.classList.toggle('on', on);
      bmBtn.innerHTML = `★ ${on ? 'Penting' : 'Tandai'}`;
      nav();
    };
  }

  drawHelper.b(qData, fin);
}

// Flashcards (Kartu)
function fc() {
  let cardPool = C.filter(c => (!ch || c[0] === ch));
  if (onlyBm) {
    cardPool = cardPool.filter(c => {
      const id = KDJKStorage.hashId('fc', c[1]);
      return KDJKStorage.isBookmarked(id);
    });
  }

  const leitner = KDJKStorage.get('leitner', {});
  const isMastered = c => {
    const id = KDJKStorage.hashId('fc', c[1]);
    return leitner[id] && leitner[id].box >= 3;
  };

  if (!deck.length || i >= deck.length) {
    deck = sh(cardPool.filter(c => !isMastered(c)));
    i = 0;
  }

  const tot = cardPool.length;
  const kn = cardPool.filter(c => isMastered(c)).length;

  if (!cardPool.length) {
    app.innerHTML = `<div class="pn">Belum ada kartu untuk filter ini.</div>`;
    return;
  }

  if (!deck.length) {
    app.innerHTML = `
      <div class="pn c">
        <h2>Semua kartu hafal! 🎉</h2>
        <p>Mantap! Seluruh kartu ringkasan pada bab ini sudah masuk kategori hafal. Ulangi dari awal untuk menyegarkan kembali ingatanmu jelang UTS.</p>
        <button class="cta" id="rs-cards">Ulang dari awal</button>
      </div>
    `;
    $('#rs-cards').onclick = () => {
      cardPool.forEach(c => {
        const id = KDJKStorage.hashId('fc', c[1]);
        if (leitner[id]) delete leitner[id];
      });
      KDJKStorage.set('leitner', leitner);
      deck = [];
      fc();
    };
    return;
  }

  const c = deck[i];
  const cId = KDJKStorage.hashId('fc', c[1]);
  const isBm = KDJKStorage.isBookmarked(cId);

  app.innerHTML = `
    <div class="bar"><i style="width:${tot ? (kn / tot) * 100 : 0}%"></i></div>
    <div class="pn fc" id="card">
      <div class="top-bar-quiz" style="width:100%">
        <div class="tag">Bab ${c[0]} · ${kn} dari ${tot} hafal</div>
        <button class="bm-btn ${isBm ? 'on' : ''}" data-qid="${cId}" aria-label="Tandai penting">★ ${isBm ? 'Penting' : 'Tandai'}</button>
      </div>
      ${flip ? `<div class="a" style="white-space:pre-line">${c[2]}</div>` : `<div class="t">${c[1]}</div><div class="hint">Ketuk kartu untuk melihat penjelasan materi.</div>`}
    </div>
    <div class="row">
      <button class="cta o" id="no">Belum hafal</button>
      <button class="cta" id="yes">Hafal</button>
    </div>
  `;

  const bmBtn = app.querySelector('.bm-btn');
  if (bmBtn) {
    bmBtn.onclick = (e) => {
      e.stopPropagation();
      const on = KDJKStorage.toggleBookmark(cId);
      bmBtn.classList.toggle('on', on);
      bmBtn.innerHTML = `★ ${on ? 'Penting' : 'Tandai'}`;
      nav();
    };
  }

  $('#card').onclick = () => { flip = !flip; fc(); };
  $('#no').onclick = () => {
    leitner[cId] = { box: 1, due: Date.now(), title: c[1] };
    KDJKStorage.set('leitner', leitner);
    flip = false;
    i++;
    fc();
  };
  $('#yes').onclick = () => {
    leitner[cId] = { box: 3, due: Date.now() + 86400000, title: c[1] };
    KDJKStorage.set('leitner', leitner);
    deck.splice(i, 1);
    flip = false;
    fc();
  };
}

// Summary (Ringkasan)
function rg() {
  let list = C.filter(c => (!ch || c[0] === ch) && (c[1] + c[2]).toLowerCase().includes(search));
  if (onlyBm) {
    list = list.filter(c => KDJKStorage.isBookmarked(KDJKStorage.hashId('fc', c[1])));
  }

  const leitner = KDJKStorage.get('leitner', {});
  const masteredCount = C.filter(c => {
    const id = KDJKStorage.hashId('fc', c[1]);
    return leitner[id] && leitner[id].box >= 3;
  }).length;

  app.innerHTML = `
    <div class="info3">
      <div><b>${list.length}</b>Konsep</div>
      <div><b>${PG.length + B.length + F.length}</b>Bank Soal</div>
      <div><b>${masteredCount}</b>Kartu Hafal</div>
    </div>
    <input id="s" placeholder="Cari konsep/istilah, misal: Nyquist, Shannon, ARQ, CSMA..." value="${search}" style="margin-bottom:16px" aria-label="Cari istilah KDJK">
    <div class="pn">
      ${list.map(c => {
        const id = KDJKStorage.hashId('fc', c[1]);
        const isBm = KDJKStorage.isBookmarked(id);
        return `
          <div class="item">
            <div class="top-bar-quiz">
              <div class="tag">Bab ${c[0]} · ${CHAPTER_NAMES[c[0]]}</div>
              <button class="bm-btn ${isBm ? 'on' : ''}" data-qid="${id}" aria-label="Tandai penting">★ ${isBm ? 'Penting' : 'Tandai'}</button>
            </div>
            <b>${c[1]}</b>
            <p style="white-space:pre-line">${c[2]}</p>
          </div>
        `;
      }).join('') || '<p>Tidak ada hasil pencarian untuk kata kunci tersebut.</p>'}
    </div>
  `;

  app.querySelectorAll('.bm-btn').forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      const id = b.dataset.qid;
      const on = KDJKStorage.toggleBookmark(id);
      b.classList.toggle('on', on);
      b.innerHTML = `★ ${on ? 'Penting' : 'Tandai'}`;
      nav();
    };
  });

  const s = $('#s');
  s.oninput = () => {
    search = s.value.toLowerCase();
    const p = s.selectionStart;
    rg();
    $('#s').focus();
    $('#s').setSelectionRange(p, p);
  };
}

// Essay Accordion (Esai)
function es() {
  try {
    let list = E.filter(x => !ch || x.bab === ch);
    if (onlyBm) {
      list = list.filter(x => KDJKStorage.isBookmarked(KDJKStorage.hashId('es', x.soal)));
    }

    const doneList = KDJKStorage.get('essays', []);
    const doneCount = Array.isArray(doneList) ? doneList.length : 0;

    app.innerHTML = `
      <div class="pn">
        <h2>Kemungkinan Soal Esai & Hitungan UTS KDJK</h2>
        <p class="hint" style="margin:0 0 16px">Pelajari pembahasan komprehensif, hitungan rumus, dan analisis arsitektur jaringan. ${doneCount} dari ${E.length} selesai dipelajari.</p>
        ${list.map(x => {
          const eId = KDJKStorage.hashId('es', x.soal);
          const isDone = KDJKStorage.isEssayDone(eId);
          const isBm = KDJKStorage.isBookmarked(eId);
          return `
            <details class="eq-card ${isDone ? 'dn' : ''}">
              <summary class="eq-summary">
                <span class="tag">Bab ${x.bab}: ${CHAPTER_NAMES[x.bab]}</span>
                <span class="eq-title">${x.soal}</span>
              </summary>
              <div class="eq-body">
                <div class="eq-content">${x.pembahasan}</div>
                <div class="eq-actions row" style="margin-top:16px">
                  <button class="cta ${isDone ? 'o' : ''} eq-btn" data-eid="${eId}">
                    ${isDone ? 'Tandai Belum Selesai' : 'Tandai Sudah Selesai'}
                  </button>
                  <button class="bm-btn ${isBm ? 'on' : ''}" data-qid="${eId}" aria-label="Tandai penting">
                    ★ ${isBm ? 'Penting' : 'Tandai'}
                  </button>
                </div>
              </div>
            </details>
          `;
        }).join('') || '<p>Belum ada soal esai untuk bab ini.</p>'}
      </div>
    `;

    app.querySelectorAll('.eq-btn').forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        const eId = b.dataset.eid;
        KDJKStorage.toggleEssay(eId);

        const openIndices = [];
        app.querySelectorAll('details.eq-card').forEach((el, idx) => {
          if (el.open) openIndices.push(idx);
        });

        const y = window.scrollY;
        es();
        window.scrollTo(0, y);

        app.querySelectorAll('details.eq-card').forEach((el, idx) => {
          if (openIndices.includes(idx)) el.open = true;
        });
      };
    });

    app.querySelectorAll('.bm-btn').forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        const id = b.dataset.qid;
        const on = KDJKStorage.toggleBookmark(id);
        b.classList.toggle('on', on);
        b.innerHTML = `★ ${on ? 'Penting' : 'Tandai'}`;
        nav();
      };
    });
  } catch (err) {
    console.error('es() error:', err);
    app.innerHTML = '<div class="pn"><p>Terjadi kesalahan memuat tab Esai.</p></div>';
  }
}

// Dashboard (Beranda)
function home() {
  const history = KDJKStorage.get('history', []);
  const totalAnswered = history.length;
  const correctCount = history.filter(h => h.benar).length;
  const overallAcc = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const streak = KDJKStorage.get('streak', { count: 0 }).count;

  // Daily target
  const dailyGoal = KDJKStorage.get('settings.dailyGoal', 20);
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const answersToday = history.filter(h => {
    const d = new Date(h.waktu);
    const s = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return s === todayStr;
  }).length;
  const dailyPct = Math.min(100, Math.round((answersToday / dailyGoal) * 100));

  // Chapter Progress Calculation (Bab 1 to 6)
  const leitner = KDJKStorage.get('leitner', {});
  const chStats = [];
  let weakestBab = null;
  let minAcc = 101;

  for (let b = 1; b <= 6; b++) {
    const bHist = history.filter(h => h.bab === b);
    const last30 = bHist.slice(-30);
    const acc = last30.length > 0 ? Math.round((last30.filter(h => h.benar).length / last30.length) * 100) : null;
    const cardsMastered = C.filter(c => c[0] === b && leitner[KDJKStorage.hashId('fc', c[1])] && leitner[KDJKStorage.hashId('fc', c[1])].box >= 3).length;
    const essaysDone = E.filter(e => e.bab === b && KDJKStorage.isEssayDone(KDJKStorage.hashId('es', e.soal))).length;

    if (last30.length >= 5 && acc !== null && acc < minAcc) {
      minAcc = acc;
      weakestBab = b;
    }

    chStats.push({
      bab: b,
      name: CHAPTER_NAMES[b],
      acc,
      totalAnswered: bHist.length,
      cardsMastered,
      cardsTotal: C.filter(c => c[0] === b).length,
      essaysDone,
      essaysTotal: E.filter(e => e.bab === b).length
    });
  }

  const wrongMap = KDJKStorage.get('wrongReview', {});
  const wrongCount = Object.keys(wrongMap).length;

  app.innerHTML = `
    <!-- Greeting & Header -->
    <div class="dash-header">
      <h2>Ringkasan Belajar KDJK</h2>
      <p>Latihan Mandiri UTS Komunikasi Data dan Jaringan Komputer</p>
    </div>

    <!-- 3-Column Stats -->
    <div class="dash-card">
      <div class="info3">
        <div><b>${totalAnswered}</b>Soal Dijawab</div>
        <div><b>${overallAcc}%</b>Akurasi Rata-rata</div>
        <div><b>${streak}</b>Hari Streak</div>
      </div>
    </div>

    <!-- Daily Target -->
    <div class="dash-card daily-card">
      <div class="daily-head">
        <div class="daily-title">🎯 Target Hari Ini: ${answersToday} / ${dailyGoal} Soal</div>
        <button class="daily-goal-btn" id="btn-edit-goal" aria-label="Ubah target harian">Ubah Target</button>
      </div>
      <div class="ch-meter">
        <div class="ch-meter-fill" style="width:${dailyPct}%"></div>
      </div>
    </div>

    <!-- Quick Mode Shortcuts -->
    <div class="dash-card">
      <div style="font-weight:800;font-size:15px;color:var(--yel);margin-bottom:12px">Mulai Latihan Cepat</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px">
        <button class="cta" id="btn-quick-pg" style="font-size:14px;padding:12px 10px">📝 Pilihan Ganda</button>
        <button class="cta" id="btn-quick-bs" style="font-size:14px;padding:12px 10px">⚖️ Benar/Salah</button>
        <button class="cta" id="btn-quick-fi" style="font-size:14px;padding:12px 10px">✍️ Isian Singkat</button>
        <button class="cta" id="btn-quick-mt" style="font-size:14px;padding:12px 10px">🔗 Cocokkan</button>
        <button class="cta o" id="btn-quick-fc" style="font-size:14px;padding:12px 10px">🗂 Flashcard</button>
        <button class="cta o" id="btn-quick-sim" style="font-size:14px;padding:12px 10px">⏱ Simulasi UTS</button>
      </div>
    </div>

    <!-- Weakest Chapter CTA -->
    <div class="dash-card">
      <div class="daily-head" style="margin-bottom:12px">
        <div>
          <b style="font-size:16px;color:var(--yel)">Fokus Penguatan Bab</b>
          <p style="margin:4px 0 0;font-size:13px;opacity:.9">
            ${weakestBab ? `Bab ${weakestBab} (${CHAPTER_NAMES[weakestBab]}) memiliki akurasi terendah (${minAcc}%). Disarankan perbanyak latihan di bab ini.` : 'Jawab minimal 5 soal di suatu bab untuk menemukan bab terlemahmu.'}
          </p>
        </div>
      </div>
      <div class="row">
        <button class="cta" id="btn-train-weak" style="width:100%">
          ${weakestBab ? `⚡ Latih Bab ${weakestBab} Sekarang` : '🚀 Mulai Latihan Pilihan Ganda'}
        </button>
      </div>
    </div>

    <!-- Bank Soal Salah Shortcut -->
    ${wrongCount > 0 ? `
      <div class="dash-card" style="border:2px solid var(--org)">
        <div class="daily-head">
          <div>
            <b style="color:var(--yel)">Bank Soal Salah (${wrongCount} Soal)</b>
            <p style="margin:4px 0 0;font-size:13px;opacity:.9">Soal-soal yang pernah kamu jawab salah. Latih kembali hingga benar 2x berturut-turut.</p>
          </div>
          <button class="cta" id="btn-train-wrong" style="padding:10px 16px;min-height:44px">Ulangi</button>
        </div>
      </div>
    ` : ''}

    <!-- Chapter Progress Breakdown (Bab 1–6) -->
    <div class="dash-card">
      <div class="chart-title">Progres per Bab (Bab 1–6)</div>
      <div class="ch-list">
        ${chStats.map(c => `
          <div class="ch-row ${weakestBab === c.bab ? 'weak' : ''}">
            <div class="ch-row-header">
              <div class="ch-name">Bab ${c.bab}: ${c.name}</div>
              <div class="ch-badges">
                ${weakestBab === c.bab ? '<span class="badge-weak">Perlu Latihan</span>' : ''}
                <span class="badge-acc">${c.acc !== null ? c.acc + '% Akurasi' : 'Belum Ada Data'}</span>
              </div>
            </div>
            <div class="ch-meter">
              <div class="ch-meter-fill" style="width:${c.acc !== null ? c.acc : 0}%"></div>
            </div>
            <div class="ch-meta">
              <span>Kartu: ${c.cardsMastered}/${c.cardsTotal} hafal</span>
              <span>Esai: ${c.essaysDone}/${c.essaysTotal} selesai</span>
              <span>${c.totalAnswered} soal dijawab</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach Event Handlers
  $('#btn-edit-goal').onclick = () => {
    const val = prompt('Masukkan target jumlah soal harian:', String(dailyGoal));
    if (val) {
      const n = parseInt(val, 10);
      if (!isNaN(n) && n > 0) {
        KDJKStorage.set('settings.dailyGoal', n);
        home();
      }
    }
  };

  $('#btn-quick-pg').onclick = () => { mode = 'pg'; KDJKStorage.set('ui.mode', 'pg'); go(); };
  $('#btn-quick-bs').onclick = () => { mode = 'bs'; KDJKStorage.set('ui.mode', 'bs'); go(); };
  $('#btn-quick-fi').onclick = () => { mode = 'fi'; KDJKStorage.set('ui.mode', 'fi'); go(); };
  $('#btn-quick-mt').onclick = () => { mode = 'mt'; KDJKStorage.set('ui.mode', 'mt'); go(); };
  $('#btn-quick-fc').onclick = () => { mode = 'fc'; KDJKStorage.set('ui.mode', 'fc'); go(); };
  $('#btn-quick-sim').onclick = () => { mode = 'sim'; KDJKStorage.set('ui.mode', 'sim'); go(); };

  $('#btn-train-weak').onclick = () => {
    if (weakestBab) {
      ch = weakestBab;
      KDJKStorage.set('ui.ch', ch);
      const wrongInWeak = Object.values(wrongMap).filter(w => w.bab === weakestBab);
      mode = wrongInWeak.length > 0 ? 'wrong' : 'pg';
    } else {
      mode = 'pg';
    }
    KDJKStorage.set('ui.mode', mode);
    delete st['pg'];
    delete st['bs'];
    delete st['wrong_flow'];
    go();
  };

  const btnTrainWrong = $('#btn-train-wrong');
  if (btnTrainWrong) {
    btnTrainWrong.onclick = () => {
      mode = 'wrong';
      KDJKStorage.set('ui.mode', 'wrong');
      delete st['wrong_flow'];
      go();
    };
  }
}

// Simulation Mode (Simulasi Ujian UTS KDJK)
function sim() {
  const active = KDJKStorage.get('active_sim', null);
  if (!active) {
    renderSimSetupScreen();
    return;
  }

  if (active.submitted) {
    renderSimResultScreen(active);
    return;
  }

  renderSimExamScreen(active);
}

function renderSimSetupScreen() {
  const history = KDJKStorage.get('simulations', []);
  const highest = history.reduce((max, h) => Math.max(max, h.skorTotal || 0), 0);
  const totalCount = history.length;
  const avg = totalCount ? Math.round(history.reduce((sum, h) => sum + (h.skorTotal || 0), 0) / totalCount) : 0;

  app.innerHTML = `
    <div class="sim-container">
      <div class="sim-result-hero">
        <h2 style="font-family:'Knewave',cursive;font-size:28px;color:var(--yel);margin:0 0 8px">Simulasi Ujian UTS KDJK</h2>
        <p style="margin:0 0 16px;opacity:0.9">Format ujian UTS komprehensif: 25 Soal Campuran (Pilihan Ganda, Benar/Salah, Isian, Cocokkan) dengan hitung mundur waktu.</p>
        <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
          <span class="sim-rank-badge">⚡ 25 Soal Acak</span>
          <span class="sim-rank-badge" style="background:var(--cy);color:var(--plum)">⏱ Timer Real-time</span>
          <span class="sim-rank-badge" style="background:var(--yel);color:var(--plum)">📊 Evaluasi Skor & Pembahasan</span>
        </div>
      </div>

      <div class="sim-stats-grid">
        <div class="sim-stat-card">
          <h4>Ujian Diikuti</h4>
          <div class="val">${totalCount} Kali</div>
        </div>
        <div class="sim-stat-card">
          <h4>Skor Tertinggi</h4>
          <div class="val" style="color:var(--mag)">${highest} / 100</div>
        </div>
        <div class="sim-stat-card">
          <h4>Rata-rata Skor</h4>
          <div class="val" style="color:var(--cy)">${avg} / 100</div>
        </div>
      </div>

      <div class="dash-card">
        <h3>Pengaturan Simulasi Ujian</h3>
        <div style="display:flex;flex-direction:column;gap:16px;margin:16px 0">
          <div>
            <label style="font-weight:800;display:block;margin-bottom:6px">Durasi Ujian:</label>
            <select id="sim-opt-duration" style="width:100%;padding:12px;border-radius:12px;border:2px solid #DDD;font-weight:700">
              <option value="35" selected>35 Menit (Standar UTS)</option>
              <option value="20">20 Menit (Tantangan Cepat)</option>
              <option value="50">50 Menit (Santai)</option>
            </select>
          </div>
          <div>
            <label style="font-weight:800;display:block;margin-bottom:6px">Cakupan Bab:</label>
            <select id="sim-opt-bab" style="width:100%;padding:12px;border-radius:12px;border:2px solid #DDD;font-weight:700">
              <option value="0" selected>Semua Bab (Bab 1–6 Kumulatif)</option>
              ${[1,2,3,4,5,6].map(b => `<option value="${b}">Bab ${b}: ${CHAPTER_NAMES[b]}</option>`).join('')}
            </select>
          </div>
        </div>

        <button class="cta" id="btn-start-sim" style="width:100%;min-height:52px;font-size:16px">🚀 Mulai Ujian Sekarang</button>
      </div>
    </div>
  `;

  $('#btn-start-sim').onclick = () => {
    const durMin = parseInt($('#sim-opt-duration').value, 10) || 35;
    const selectedBab = parseInt($('#sim-opt-bab').value, 10) || 0;

    let pgPool = PG.filter(x => !selectedBab || x[0] === selectedBab);
    let bsPool = B.filter(x => !selectedBab || x[0] === selectedBab);
    let fiPool = F.filter(x => !selectedBab || x[0] === selectedBab);
    let mtPool = M.filter(x => !selectedBab || x[0] === selectedBab);

    pgPool = sh(pgPool).slice(0, 10);
    bsPool = sh(bsPool).slice(0, 7);
    fiPool = sh(fiPool).slice(0, 5);
    mtPool = sh(mtPool).slice(0, 3);

    const questions = [];
    pgPool.forEach(item => questions.push({ type: 'pg', data: item, bab: item[0], id: KDJKStorage.hashId('pg', item[2]) }));
    bsPool.forEach(item => questions.push({ type: 'bs', data: item, bab: item[0], id: KDJKStorage.hashId('bs', item[2]) }));
    fiPool.forEach(item => questions.push({ type: 'fi', data: item, bab: item[0], id: KDJKStorage.hashId('fi', item[2]) }));
    mtPool.forEach(item => questions.push({ type: 'mt', data: item, bab: item[0], id: KDJKStorage.hashId('mt', item[1]) }));

    const shuffledQuestions = sh(questions);

    const activeSim = {
      id: 'sim_' + Date.now(),
      startTime: Date.now(),
      durationMin: durMin,
      endTimeMs: Date.now() + (durMin * 60 * 1000),
      questions: shuffledQuestions,
      answers: {},
      flags: {},
      currentIdx: 0,
      submitted: false
    };

    KDJKStorage.set('active_sim', activeSim);
    renderSimExamScreen(activeSim);
  };
}

function renderSimExamScreen(activeSim) {
  const qList = activeSim.questions;
  const currIdx = activeSim.currentIdx || 0;
  const q = qList[currIdx];

  const updateTimer = () => {
    const remainMs = activeSim.endTimeMs - Date.now();
    if (remainMs <= 0) {
      if (simInterval) clearInterval(simInterval);
      alert('Waktu ujian telah habis! Lembar jawaban dikumpulkan secara otomatis.');
      submitSim(activeSim);
      return;
    }

    const totalSec = Math.floor(remainMs / 1000);
    const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');

    const timerEl = $('#sim-timer-display');
    if (timerEl) {
      timerEl.textContent = `${m}:${s}`;
      if (totalSec < 300) {
        timerEl.classList.add('warning');
      } else {
        timerEl.classList.remove('warning');
      }
    }
  };

  if (simInterval) clearInterval(simInterval);
  simInterval = setInterval(updateTimer, 1000);

  const answeredCount = Object.keys(activeSim.answers).length;

  app.innerHTML = `
    <div class="sim-container">
      <div class="sim-header">
        <div>
          <span class="sim-tag">Ujian UTS Sedang Berlangsung</span>
          <h3 style="margin:4px 0 0;font-size:18px">${answeredCount} dari ${qList.length} Soal Terjawab</h3>
        </div>
        <div class="sim-timer" id="sim-timer-display">--:--</div>
      </div>

      <div class="sim-grid-nav">
        ${qList.map((item, idx) => {
          const isAns = activeSim.answers[idx] !== undefined && activeSim.answers[idx] !== '';
          const isFlg = !!activeSim.flags[idx];
          const isCurr = idx === currIdx;
          let cls = 'sim-grid-btn';
          if (isAns) cls += ' answered';
          if (isFlg) cls += ' flagged';
          if (isCurr) cls += ' current';
          return `<button class="${cls}" data-idx="${idx}">${idx + 1}</button>`;
        }).join('')}
      </div>

      <div class="sim-card">
        <div class="sim-card-top">
          <span class="sim-tag">Soal ${currIdx + 1} dari ${qList.length} · Bab ${q.bab} (${q.type.toUpperCase()})</span>
          <button class="sim-flag-btn ${activeSim.flags[currIdx] ? 'on' : ''}" id="btn-flag">
            ★ ${activeSim.flags[currIdx] ? 'Ragu-ragu' : 'Tandai Ragu'}
          </button>
        </div>

        <div class="sim-question-text">${q.type === 'pg' || q.type === 'bs' || q.type === 'fi' ? q.data[2] : q.data[1]}</div>

        <div id="sim-q-body"></div>

        <div class="sim-actions">
          <button class="cta o" id="btn-sim-prev" ${currIdx === 0 ? 'disabled' : ''}>← Sebelum</button>
          <button class="cta o" id="btn-sim-next" ${currIdx === qList.length - 1 ? 'disabled' : ''}>Lanjut →</button>
          <button class="cta w" id="btn-sim-submit" style="background:var(--mag);border-color:var(--mag);color:#FFF">✓ Kumpulkan Ujian</button>
        </div>
      </div>
    </div>
  `;

  updateTimer();

  // Render question body based on type
  const bodyEl = $('#sim-q-body');
  const userAns = activeSim.answers[currIdx];

  if (q.type === 'pg') {
    bodyEl.innerHTML = `
      <div class="pg-opts">
        ${q.data[3].map((opt, idx) => {
          const isSel = userAns === idx;
          return `
            <button class="opt sim-opt-btn ${isSel ? 'ok' : ''}" data-idx="${idx}">
              <span style="font-weight:900;margin-right:8px">${String.fromCharCode(65 + idx)}.</span>
              <span>${opt}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;
    bodyEl.querySelectorAll('.sim-opt-btn').forEach(btn => {
      btn.onclick = () => {
        activeSim.answers[currIdx] = +btn.dataset.idx;
        KDJKStorage.set('active_sim', activeSim);
        renderSimExamScreen(activeSim);
      };
    });
  } else if (q.type === 'bs') {
    bodyEl.innerHTML = `
      <div style="display:flex;gap:12px;margin:16px 0">
        <button class="opt sim-bs-btn ${userAns === 1 ? 'ok' : ''}" data-v="1" style="flex:1;text-align:center">Benar</button>
        <button class="opt sim-bs-btn ${userAns === 0 ? 'ok' : ''}" data-v="0" style="flex:1;text-align:center">Salah</button>
      </div>
    `;
    bodyEl.querySelectorAll('.sim-bs-btn').forEach(btn => {
      btn.onclick = () => {
        activeSim.answers[currIdx] = +btn.dataset.v;
        KDJKStorage.set('active_sim', activeSim);
        renderSimExamScreen(activeSim);
      };
    });
  } else if (q.type === 'fi') {
    bodyEl.innerHTML = `
      <div style="margin:16px 0">
        <input id="sim-fi-input" placeholder="Ketik jawabanmu..." value="${userAns || ''}" style="width:100%;margin-bottom:8px">
        <button class="cta" id="btn-save-fi" style="width:100%">Simpan Jawaban</button>
      </div>
    `;
    const fiInp = $('#sim-fi-input');
    const saveFi = () => {
      activeSim.answers[currIdx] = fiInp.value.trim();
      KDJKStorage.set('active_sim', activeSim);
      renderSimExamScreen(activeSim);
    };
    $('#btn-save-fi').onclick = saveFi;
    fiInp.onkeydown = e => { if (e.key === 'Enter') saveFi(); };
  } else if (q.type === 'mt') {
    const savedMt = activeSim.answers[currIdx] || {};
    bodyEl.innerHTML = `
      <div style="margin:16px 0">
        ${q.data[3].map((pair, pIdx) => `
          <div class="mr">
            <div>${pair[0]}</div>
            <select class="sim-mt-select" data-pidx="${pIdx}">
              <option value="">-- Pilih --</option>
              ${q.data[2].map((opt, oIdx) => `
                <option value="${oIdx}" ${savedMt[pIdx] === oIdx ? 'selected' : ''}>${opt}</option>
              `).join('')}
            </select>
          </div>
        `).join('')}
      </div>
    `;
    bodyEl.querySelectorAll('.sim-mt-select').forEach(sel => {
      sel.onchange = () => {
        const pIdx = sel.dataset.pidx;
        if (!activeSim.answers[currIdx]) activeSim.answers[currIdx] = {};
        if (sel.value !== '') {
          activeSim.answers[currIdx][pIdx] = +sel.value;
        } else {
          delete activeSim.answers[currIdx][pIdx];
        }
        KDJKStorage.set('active_sim', activeSim);
      };
    });
  }

  // Navigation handlers
  app.querySelectorAll('.sim-grid-btn').forEach(btn => {
    btn.onclick = () => {
      activeSim.currentIdx = parseInt(btn.dataset.idx, 10);
      KDJKStorage.set('active_sim', activeSim);
      renderSimExamScreen(activeSim);
    };
  });

  $('#btn-flag').onclick = () => {
    activeSim.flags[currIdx] = !activeSim.flags[currIdx];
    KDJKStorage.set('active_sim', activeSim);
    renderSimExamScreen(activeSim);
  };

  $('#btn-sim-prev').onclick = () => {
    if (currIdx > 0) {
      activeSim.currentIdx = currIdx - 1;
      KDJKStorage.set('active_sim', activeSim);
      renderSimExamScreen(activeSim);
    }
  };

  $('#btn-sim-next').onclick = () => {
    if (currIdx < qList.length - 1) {
      activeSim.currentIdx = currIdx + 1;
      KDJKStorage.set('active_sim', activeSim);
      renderSimExamScreen(activeSim);
    }
  };

  $('#btn-sim-submit').onclick = () => {
    const unans = qList.length - Object.keys(activeSim.answers).length;
    const confirmMsg = unans > 0
      ? `Masih ada ${unans} soal yang belum dijawab. Yakin ingin mengumpulkan ujian sekarang?`
      : 'Yakin ingin mengumpulkan lembar jawaban ujian sekarang?';
    if (confirm(confirmMsg)) {
      if (simInterval) clearInterval(simInterval);
      submitSim(activeSim);
    }
  };
}

function submitSim(activeSim) {
  activeSim.submitted = true;
  activeSim.finishTime = Date.now();

  let totalCorrect = 0;
  let totalPoints = 0;
  const reviews = [];
  const catScore = {
    pg: { ok: 0, tot: 0 },
    bs: { ok: 0, tot: 0 },
    fi: { ok: 0, tot: 0 },
    mt: { ok: 0, tot: 0 }
  };

  activeSim.questions.forEach((q, idx) => {
    const uAns = activeSim.answers[idx];
    let isOk = false;
    let userDisplay = '-';
    let correctDisplay = '-';

    if (q.type === 'pg') {
      catScore.pg.tot++;
      const corrIdx = q.data[4];
      correctDisplay = `${String.fromCharCode(65 + corrIdx)}. ${q.data[3][corrIdx]}`;
      if (uAns !== undefined) {
        userDisplay = `${String.fromCharCode(65 + uAns)}. ${q.data[3][uAns]}`;
        isOk = (uAns === corrIdx);
      }
      if (isOk) { totalCorrect++; catScore.pg.ok++; }
      KDJKStorage.logAnswer({ id: q.id, kategori: 'pg', bab: q.bab, benar: isOk });
    } else if (q.type === 'bs') {
      catScore.bs.tot++;
      correctDisplay = q.data[3] === 1 ? 'Benar' : 'Salah';
      if (uAns !== undefined) {
        userDisplay = uAns === 1 ? 'Benar' : 'Salah';
        isOk = (uAns === q.data[3]);
      }
      if (isOk) { totalCorrect++; catScore.bs.ok++; }
      KDJKStorage.logAnswer({ id: q.id, kategori: 'bs', bab: q.bab, benar: isOk });
    } else if (q.type === 'fi') {
      catScore.fi.tot++;
      correctDisplay = q.data[4];
      if (uAns) {
        userDisplay = uAns;
        const res = checkIsianAnswer(uAns, q.data[3]);
        isOk = res.ok;
      }
      if (isOk) { totalCorrect++; catScore.fi.ok++; }
      KDJKStorage.logAnswer({ id: q.id, kategori: 'fi', bab: q.bab, benar: isOk });
    } else if (q.type === 'mt') {
      catScore.mt.tot++;
      let pairOk = 0;
      const totalPairs = q.data[3].length;
      const uMt = uAns || {};
      q.data[3].forEach((pair, pIdx) => {
        if (uMt[pIdx] === pair[1]) pairOk++;
      });
      isOk = (pairOk === totalPairs);
      userDisplay = `${pairOk} dari ${totalPairs} pasangan cocok`;
      correctDisplay = `${totalPairs} dari ${totalPairs} cocok`;
      if (isOk) { totalCorrect++; catScore.mt.ok++; }
      KDJKStorage.logAnswer({ id: q.id, kategori: 'mt', bab: q.bab, benar: isOk });
    }

    reviews.push({ q, isOk, userDisplay, correctDisplay });
  });

  const finalScore = Math.round((totalCorrect / activeSim.questions.length) * 100);
  activeSim.skorTotal = finalScore;
  activeSim.result = { finalScore, totalCorrect, catScore, reviews };

  const simHistory = KDJKStorage.get('simulations', []);
  simHistory.push({
    id: activeSim.id,
    waktu: Date.now(),
    skorTotal: finalScore,
    durasiMenit: activeSim.durationMin
  });
  KDJKStorage.set('simulations', simHistory);
  KDJKStorage.set('active_sim', activeSim);

  renderSimResultScreen(activeSim);
}

function renderSimResultScreen(activeSim) {
  const res = activeSim.result;
  const score = res.finalScore;

  app.innerHTML = `
    <div class="sim-container">
      <div class="sim-result-hero">
        <h2 style="font-family:'Knewave',cursive;font-size:32px;color:var(--yel);margin:0 0 8px">Hasil Simulasi Ujian</h2>
        <div style="font-size:48px;font-family:'Anton',sans-serif;color:#FFF;margin:8px 0">${score} / 100</div>
        <p style="margin:0 0 16px;font-size:16px">${score >= 80 ? 'Luar biasa! Penguasaan materi KDJK kamu sangat matang. Siap dapat A di UTS!' : score >= 60 ? 'Bagus! Cukup baik, tinggal perbaiki beberapa konsep yang terlewat.' : 'Perlu belajar lagi. Coba ulas ringkasan materi dan flashcard bab-bab terkait.'}</p>
      </div>

      <div class="sim-stats-grid">
        <div class="sim-stat-card">
          <h4>Jawaban Benar</h4>
          <div class="val" style="color:var(--cy)">${res.totalCorrect} Soal</div>
        </div>
        <div class="sim-stat-card">
          <h4>Total Soal</h4>
          <div class="val">${activeSim.questions.length} Soal</div>
        </div>
        <div class="sim-stat-card">
          <h4>Akurasi Nilai</h4>
          <div class="val" style="color:var(--mag)">${score}%</div>
        </div>
      </div>

      <div class="dash-card">
        <h3>Evaluasi per Kategori Soal</h3>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:12px">
          <div>
            <div style="display:flex;justify-content:space-between;font-weight:800;font-size:13px;margin-bottom:4px">
              <span>Pilihan Ganda</span>
              <span>${Math.round((res.catScore.pg.ok / (res.catScore.pg.tot || 1)) * 100)}%</span>
            </div>
            <div class="ch-meter"><div class="ch-meter-fill" style="width:${(res.catScore.pg.ok / (res.catScore.pg.tot || 1)) * 100}%"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-weight:800;font-size:13px;margin-bottom:4px">
              <span>Benar / Salah</span>
              <span>${Math.round((res.catScore.bs.ok / (res.catScore.bs.tot || 1)) * 100)}%</span>
            </div>
            <div class="ch-meter"><div class="ch-meter-fill" style="width:${(res.catScore.bs.ok / (res.catScore.bs.tot || 1)) * 100}%"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-weight:800;font-size:13px;margin-bottom:4px">
              <span>Isian Singkat</span>
              <span>${Math.round((res.catScore.fi.ok / (res.catScore.fi.tot || 1)) * 100)}%</span>
            </div>
            <div class="ch-meter"><div class="ch-meter-fill" style="width:${(res.catScore.fi.ok / (res.catScore.fi.tot || 1)) * 100}%"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-weight:800;font-size:13px;margin-bottom:4px">
              <span>Cocokkan Pasangan</span>
              <span>${Math.round((res.catScore.mt.ok / (res.catScore.mt.tot || 1)) * 100)}%</span>
            </div>
            <div class="ch-meter"><div class="ch-meter-fill" style="width:${(res.catScore.mt.ok / (res.catScore.mt.tot || 1)) * 100}%"></div></div>
          </div>
        </div>
      </div>

      <div class="dash-card">
        <h3>Pembahasan & Evaluasi Jawaban</h3>
        <div style="margin-top:16px">
          ${res.reviews.map((rv, i) => `
            <div class="sim-review-item ${rv.isOk ? 'correct' : 'wrong'}">
              <div class="sim-review-header">
                <span>Soal ${i + 1} (Bab ${rv.q.bab}: ${CHAPTER_NAMES[rv.q.bab]}) · ${rv.q.type.toUpperCase()}</span>
                <span class="sim-review-status ${rv.isOk ? 'correct' : 'wrong'}">${rv.isOk ? '✓ BENAR' : '✗ SALAH'}</span>
              </div>
              <p style="font-weight:800;margin:0 0 8px;color:var(--plum)">${rv.q.type === 'pg' || rv.q.type === 'bs' || rv.q.type === 'fi' ? rv.q.data[2] : rv.q.data[1]}</p>
              <div style="font-size:13px;line-height:1.4">
                <div><b>Jawaban Kamu:</b> ${rv.userDisplay}</div>
                <div><b>Jawaban Benar:</b> ${rv.correctDisplay}</div>
              </div>
              ${rv.q.type === 'pg' && rv.q.data[5] ? `<div class="sim-review-exp"><b>Pembahasan:</b> ${rv.q.data[5]}</div>` : ''}
              ${rv.q.type === 'bs' && rv.q.data[4] ? `<div class="sim-review-exp"><b>Pembahasan:</b> ${rv.q.data[4]}</div>` : ''}
              ${rv.q.type === 'fi' && rv.q.data[5] ? `<div class="sim-review-exp"><b>Pembahasan:</b> ${rv.q.data[5]}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <div class="row" style="margin-top:16px">
        <button class="cta o" id="btn-sim-reset">🚀 Ujian Baru</button>
        <button class="cta" id="btn-sim-home">🏠 Ke Beranda</button>
      </div>
    </div>
  `;

  $('#btn-sim-reset').onclick = () => {
    KDJKStorage.set('active_sim', null);
    renderSimSetupScreen();
  };

  $('#btn-sim-home').onclick = () => {
    mode = 'home';
    KDJKStorage.set('ui.mode', 'home');
    go();
  };
}

// Master Router
function go() {
  if (window.location.hash !== '#' + mode) {
    history.replaceState(null, '', '#' + mode);
  }
  nav();
  try {
    const fn = {
      home,
      rg,
      fc,
      pg: () => flow('pg', PG, PG_HELPER, 1),
      bs: () => flow('bs', B, BS_HELPER, 1),
      mt: () => flow('mt', M, MT_HELPER, 1),
      fi: () => flow('fi', F, FI_HELPER, 1),
      wrong,
      es,
      sim
    }[mode];
    if (fn) {
      fn();
    } else {
      mode = 'home';
      home();
    }
  } catch (err) {
    console.error('go() routing error for mode=' + mode + ':', err);
    app.innerHTML = '<div class="pn"><p>Terjadi kesalahan memuat tab ini. Coba tab lain atau refresh halaman.</p></div>';
  }
}

// Global Tab Clicks
$('#tabs').onclick = e => {
  const m = e.target.dataset.m;
  if (m) {
    mode = m;
    KDJKStorage.set('ui.mode', m);
    flip = false;
    go();
  }
};

// Global Chip Clicks
$('#chips').onclick = e => {
  if (e.target.id === 'bm-filter-btn' || e.target.closest('#bm-filter-btn')) {
    onlyBm = !onlyBm;
    KDJKStorage.set('ui.onlyBookmarked', onlyBm);
    delete st['pg'];
    delete st['bs'];
    delete st['mt'];
    delete st['fi'];
    deck = [];
    go();
    return;
  }

  if (e.target.dataset.c != null) {
    ch = +e.target.dataset.c;
    KDJKStorage.set('ui.ch', ch);
    deck = [];
    flip = false;
    delete st['pg'];
    delete st['bs'];
    delete st['mt'];
    delete st['fi'];
    delete st['wrong_flow'];
    go();
  }
};

// Reset Progress Button
$('#rsall').onclick = () => {
  if (confirm('Hapus seluruh riwayat dan progres belajar KDJK? Data akan kembali bersih.')) {
    KDJKStorage.reset();
    ch = 0;
    onlyBm = false;
    mode = 'home';
    deck = [];
    st = {};
    go();
  }
};

function initStickyObserver() {
  const sentinel = $('#tabs-sentinel');
  const tabsWrap = $('#tabs-wrap');
  if (!sentinel || !tabsWrap || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const isStuck = !entry.isIntersecting && entry.boundingClientRect.top <= 0;
      tabsWrap.classList.toggle('is-stuck', isStuck);
    });
  }, {
    threshold: [0, 1]
  });

  observer.observe(sentinel);
}

// Initialize Container Interactions
function initContainerInteractions() {
  initStickyObserver();

  ['tabs', 'chips'].forEach(id => {
    const el = $('#' + id);
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    el.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      isDown = true;
      hasDragged = false;
      startX = e.pageX - el.offsetLeft;
      scrollStart = el.scrollLeft;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    });

    window.addEventListener('mousemove', e => {
      if (!isDown) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 4) hasDragged = true;
      el.scrollLeft = scrollStart - walk;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      el.style.cursor = '';
      el.style.removeProperty('user-select');
    });

    el.addEventListener('click', e => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    el.addEventListener('scroll', updateScrollFades, { passive: true });
  });

  window.addEventListener('resize', updateScrollFades);
  updateScrollFades();
}

// Hash Routing Listener
window.addEventListener('hashchange', () => {
  const h = window.location.hash.replace('#', '');
  if (h && TABS.some(t => t[0] === h)) {
    if (mode !== h) {
      mode = h;
      KDJKStorage.set('ui.mode', h);
      go();
    }
  }
});

// Initial Hash Check
if (window.location.hash) {
  const h = window.location.hash.replace('#', '');
  if (h && TABS.some(t => t[0] === h)) {
    mode = h;
    KDJKStorage.set('ui.mode', h);
  }
}

// Setup Export / Import
const btnExport = $('#btn-export');
if (btnExport) {
  btnExport.onclick = () => {
    const dataStr = KDJKStorage.export();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `belajar_kdjk_uts_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
}

const btnImport = $('#btn-import');
const fileInput = $('#file-import-input');
if (btnImport && fileInput) {
  btnImport.onclick = () => fileInput.click();
  fileInput.onchange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = evt => {
        const ok = KDJKStorage.import(evt.target.result);
        if (ok) {
          alert('Progres belajar KDJK berhasil diimpor!');
          mode = 'home';
          go();
        } else {
          alert('Gagal mengimpor file! Format JSON tidak valid.');
        }
      };
      reader.readAsText(file);
    }
  };
}

// Start application
initContainerInteractions();
go();
