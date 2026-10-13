/**
 * storage.js - Centralized Storage Management for BelajarKDJK
 * Namespace: 'kdjk_v1'
 * Handles versioning, stable IDs, answer tracking (history max 2000),
 * wrong review bank (removes after 2 consecutive correct answers),
 * bookmarks, leitner flashcard boxes, simulations, and daily streak.
 */

(function (root) {
  'use strict';

  // djb2 hash function for deterministic stable IDs
  function hashId(category, text) {
    const str = category + ':' + String(text).trim().toLowerCase();
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return category + '_' + Math.abs(hash).toString(36);
  }

  const STORAGE_KEY = 'kdjk_v1';
  const CURRENT_VERSION = 1;
  const MAX_HISTORY_ITEMS = 2000;

  let inMemoryData = null;

  function getTodayString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getYesterdayString() {
    const d = new Date(Date.now() - 86400000);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getDefaultState() {
    return {
      version: CURRENT_VERSION,
      settings: {
        dailyGoal: 20,
        pomodoro: {
          focusMin: 25,
          shortBreakMin: 5,
          longBreakMin: 15
        },
        sound: {
          type: 'none',
          volume: 0.25
        }
      },
      ui: {
        mode: 'home',
        ch: 0,
        onlyBookmarked: false,
        reviewMistakes: false
      },
      bookmarks: [],
      history: [],
      wrongReview: {},
      leitner: {},
      essays: [],
      simulations: [],
      streak: {
        lastDate: '',
        count: 0
      }
    };
  }

  function readRawStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(STORAGE_KEY);
        return item ? JSON.parse(item) : null;
      }
    } catch (e) {
      console.warn('Storage read warning:', e);
    }
    return inMemoryData;
  }

  function writeRawStorage(data) {
    inMemoryData = data;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (e) {
      console.warn('Storage write warning:', e);
    }
  }

  function getInitialState() {
    let state = readRawStorage();
    if (!state || !state.version || state.version < CURRENT_VERSION) {
      let fresh = getDefaultState();
      if (state) {
        Object.assign(fresh, state);
      }
      fresh.version = CURRENT_VERSION;
      writeRawStorage(fresh);
      return fresh;
    }
    return state;
  }

  let currentState = getInitialState();

  const KDJKStorage = {
    hashId,

    get(path, defaultVal) {
      if (!path) return currentState;
      const keys = path.split('.');
      let curr = currentState;
      for (const k of keys) {
        if (curr == null || typeof curr !== 'object' || !(k in curr)) {
          return defaultVal;
        }
        curr = curr[k];
      }
      return curr !== undefined ? curr : defaultVal;
    },

    set(path, val) {
      if (!path) return;
      const keys = path.split('.');
      let curr = currentState;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!curr[k] || typeof curr[k] !== 'object') {
          curr[k] = {};
        }
        curr = curr[k];
      }
      curr[keys[keys.length - 1]] = val;
      writeRawStorage(currentState);
      return val;
    },

    update(updaterFn) {
      if (typeof updaterFn === 'function') {
        const res = updaterFn(currentState);
        if (res) currentState = res;
        writeRawStorage(currentState);
      }
      return currentState;
    },

    reset() {
      currentState = getDefaultState();
      writeRawStorage(currentState);
      return currentState;
    },

    export() {
      return JSON.stringify(currentState, null, 2);
    },

    import(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (parsed && typeof parsed === 'object') {
          parsed.version = CURRENT_VERSION;
          currentState = parsed;
          writeRawStorage(currentState);
          return true;
        }
      } catch (e) {
        console.error('Import error:', e);
      }
      return false;
    },

    // Record question answer (PG, BS, MT, FI, etc.)
    logAnswer({ id, kategori, bab, benar, waktu = Date.now(), detail = null }) {
      if (!id || !kategori) return;

      const entry = {
        id,
        kategori,
        bab: Number(bab) || 0,
        benar: Boolean(benar),
        waktu,
        detail
      };

      // 1. Append history (FIFO max 2000 items)
      currentState.history.push(entry);
      if (currentState.history.length > MAX_HISTORY_ITEMS) {
        currentState.history.splice(0, currentState.history.length - MAX_HISTORY_ITEMS);
      }

      // 2. Update wrong bank (wrongReview)
      if (!currentState.wrongReview) currentState.wrongReview = {};
      if (!entry.benar) {
        const prev = currentState.wrongReview[id] || { consecutiveCorrect: 0 };
        currentState.wrongReview[id] = {
          id,
          kategori,
          bab: entry.bab,
          consecutiveCorrect: 0,
          lastWrongTime: waktu
        };
      } else {
        if (currentState.wrongReview[id]) {
          currentState.wrongReview[id].consecutiveCorrect = (currentState.wrongReview[id].consecutiveCorrect || 0) + 1;
          if (currentState.wrongReview[id].consecutiveCorrect >= 2) {
            delete currentState.wrongReview[id];
          }
        }
      }

      // 3. Update streak
      const today = getTodayString();
      const yesterday = getYesterdayString();
      if (!currentState.streak) currentState.streak = { lastDate: '', count: 0 };

      if (currentState.streak.lastDate === today) {
        // active today already
      } else if (currentState.streak.lastDate === yesterday) {
        currentState.streak.count += 1;
        currentState.streak.lastDate = today;
      } else {
        currentState.streak.count = 1;
        currentState.streak.lastDate = today;
      }

      writeRawStorage(currentState);
      return entry;
    },

    // Bookmark toggle
    toggleBookmark(id) {
      if (!id) return false;
      if (!Array.isArray(currentState.bookmarks)) currentState.bookmarks = [];
      const idx = currentState.bookmarks.indexOf(id);
      if (idx > -1) {
        currentState.bookmarks.splice(idx, 1);
        writeRawStorage(currentState);
        return false;
      } else {
        currentState.bookmarks.push(id);
        writeRawStorage(currentState);
        return true;
      }
    },

    isBookmarked(id) {
      return Array.isArray(currentState.bookmarks) && currentState.bookmarks.includes(id);
    },

    // Essay progress toggle
    toggleEssay(id) {
      if (!id) return false;
      if (!Array.isArray(currentState.essays)) currentState.essays = [];
      const idx = currentState.essays.indexOf(id);
      if (idx > -1) {
        currentState.essays.splice(idx, 1);
        writeRawStorage(currentState);
        return false;
      } else {
        currentState.essays.push(id);
        writeRawStorage(currentState);
        return true;
      }
    },

    isEssayDone(id) {
      return Array.isArray(currentState.essays) && currentState.essays.includes(id);
    }
  };

  root.KDJKStorage = KDJKStorage;
  root.AIStorage = KDJKStorage; // Alias for seamless compatibility
})(typeof window !== 'undefined' ? window : globalThis);
