/*
 * Loom — a quiet, local-first notebook.
 * Everything is stored in this browser. There is no account, API, or server-side data.
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'loom.notebook.v1';
  const PREFERENCES_KEY = 'loom.preferences.v1';
  const MAX_GRAPH_NOTES = 110;
  const dictionaries = {
    en: {
      newNote: 'New note', searchPlaceholder: 'Search notes...', workspace: 'WORKSPACE', allNotes: 'All notes', pinned: 'Pinned', knowledgeMap: 'Knowledge map', yourTags: 'YOUR TAGS', clear: 'Clear', recentNotes: 'RECENT NOTES', smallThoughts: 'SMALL THOUGHTS, BIG PICTURE', cardCopy: 'Link notes with [[double brackets]] and watch your ideas find each other.', exploreMap: 'Explore your map', yourNotebook: 'Your notebook', savedOnDevice: 'Saved on this device', exportData: 'Export notebook', importData: 'Import notebook', toggleTheme: 'Toggle dark mode', allChangesSaved: 'All changes saved', openMap: 'Open map', quietCorner: 'A QUIET CORNER FOR YOUR IDEAS', nothingHere: 'Nothing here yet.', emptyDescription: 'Start with a small thought. Your notes will grow into a map of what matters to you.', createFirstNote: 'Create your first note', untitled: 'Untitled note', tagPlaceholder: 'Add tags, separated by commas', write: 'Write', preview: 'Preview', contentPlaceholder: 'Write something worth remembering… Use [[double brackets]] to connect ideas.', markdownSupported: 'Markdown supported', linkedFrom: 'LINKED FROM', onThisPage: 'ON THIS PAGE', addHeadings: 'Add headings to build an outline', aThoughtForYou: 'A THOUGHT FOR YOU', thoughtPrompt: 'What idea has been quietly asking for your attention?', writeAboutIt: 'Write about it', tip: 'TIP', keyboardTip: 'Press ⌘ + K anytime to find a note.', yourIdeas: 'YOUR IDEAS, IN ORBIT', mapNeedsNotes: 'Your map is waiting for a few thoughts.', mapNeedsNotesCopy: 'Create notes and connect them with [[double brackets]] to see them here.', createNote: 'Create a note', currentNote: 'Current note', linkedNotes: 'Linked notes', mapControls: 'Drag to pan · scroll to zoom · click a note to open', mapFooter: 'Every connection starts with a thought.', noTags: 'Tags will appear here', noNotes: 'No notes yet', noSearchResults: 'No notes match your search', noTagNotes: 'No notes with this tag', createNoteHint: 'Create a note to get started.', noBacklinks: 'Nothing links here yet. Add [[this note]] to another thought to connect it.', linkedNote: 'Linked note', noOutline: 'Add headings to build an outline', words: 'words', minute: 'min read', saved: 'All changes saved', saving: 'Saving…', noteCreated: 'A fresh page, ready when you are.', noteDeleted: 'Note deleted.', confirmDelete: 'Delete this note? This cannot be undone.', confirmImport: 'Replace this notebook with the imported one? Export your current notes first if you want a backup.', imported: 'Notebook imported.', invalidImport: 'That file does not look like a Loom notebook.', exported: 'Notebook exported.', missingLinkCreated: 'New linked note created.', searchEmpty: 'No matching notes', untitledFallback: 'Untitled note', writeThought: 'A thought to follow', thoughtSeed: 'What has your attention today?\n\nStart with one sentence. Follow it wherever it leads.', noteUpdated: 'Note updated', notePinned: 'Pinned', noteUnpinned: 'Unpinned', graphLimit: 'Showing the newest 110 notes', importFailed: 'Could not read that file.', noNotesFound: 'No notes found', noteListRecent: 'Recently edited', writing: 'Write', notebookLoaded: 'Your ideas are right where you left them.', noteCount: 'notes', linkCount: 'links', pinnedOnly: 'Pinned notes', allNotesFilter: 'All notes'
    },
    tr: {
      newNote: 'Yeni not', searchPlaceholder: 'Notlarda ara...', workspace: 'ÇALIŞMA ALANI', allNotes: 'Tüm notlar', pinned: 'Sabitlenenler', knowledgeMap: 'Fikir haritası', yourTags: 'ETİKETLERİN', clear: 'Temizle', recentNotes: 'SON NOTLAR', smallThoughts: 'KÜÇÜK FİKİRLER, BÜYÜK RESİM', cardCopy: 'Notları [[çift köşeli parantezle]] bağla; fikirlerinin birbirini bulmasını izle.', exploreMap: 'Haritanı keşfet', yourNotebook: 'Defterin', savedOnDevice: 'Bu cihazda saklanır', exportData: 'Defteri dışa aktar', importData: 'Defteri içe aktar', toggleTheme: 'Koyu modu aç / kapat', allChangesSaved: 'Tüm değişiklikler kaydedildi', openMap: 'Haritayı aç', quietCorner: 'FİKİRLERİN İÇİN SAKİN BİR KÖŞE', nothingHere: 'Burada henüz bir şey yok.', emptyDescription: 'Küçük bir fikirle başla. Notların, senin için önemli olanların haritasına dönüşsün.', createFirstNote: 'İlk notunu oluştur', untitled: 'Başlıksız not', tagPlaceholder: 'Etiket ekle, virgülle ayır', write: 'Yaz', preview: 'Önizleme', contentPlaceholder: 'Hatırlamaya değer bir şey yaz… Fikirleri bağlamak için [[çift köşeli parantez]] kullan.', markdownSupported: 'Markdown desteklenir', linkedFrom: 'BURAYA BAĞLANANLAR', onThisPage: 'BU SAYFADA', addHeadings: 'İçindekiler için başlık ekle', aThoughtForYou: 'SANA BİR SORU', thoughtPrompt: 'Hangi fikir bir süredir dikkatini çekmeye çalışıyor?', writeAboutIt: 'Üzerine yaz', tip: 'İPUCU', keyboardTip: 'Not bulmak için istediğin zaman ⌘ + K tuşlarına bas.', yourIdeas: 'FİKİRLERİN YÖRÜNGEDE', mapNeedsNotes: 'Haritan birkaç fikir bekliyor.', mapNeedsNotesCopy: 'Not oluşturup onları [[çift köşeli parantezle]] bağladığında burada görebilirsin.', createNote: 'Not oluştur', currentNote: 'Açık not', linkedNotes: 'Bağlantılı notlar', mapControls: 'Taşımak için sürükle · yakınlaştırmak için kaydır · açmak için nota tıkla', mapFooter: 'Her bağlantı bir fikirle başlar.', noTags: 'Etiketler burada görünür', noNotes: 'Henüz not yok', noSearchResults: 'Aramana uygun not yok', noTagNotes: 'Bu etikette not yok', createNoteHint: 'Başlamak için bir not oluştur.', noBacklinks: 'Buraya bağlanan not yok. Bağlantı kurmak için başka bir nota [[bu notu]] ekle.', linkedNote: 'Bağlantılı not', noOutline: 'İçindekiler için başlık ekle', words: 'kelime', minute: 'dk okuma', saved: 'Tüm değişiklikler kaydedildi', saving: 'Kaydediliyor…', noteCreated: 'Yeni sayfan hazır.', noteDeleted: 'Not silindi.', confirmDelete: 'Bu not silinsin mi? Bu işlem geri alınamaz.', confirmImport: 'Bu defter içe aktarılanla değiştirilsin mi? Yedek için önce dışa aktar.', imported: 'Defter içe aktarıldı.', invalidImport: 'Bu dosya bir Loom defteri gibi görünmüyor.', exported: 'Defter dışa aktarıldı.', missingLinkCreated: 'Yeni bağlantılı not oluşturuldu.', searchEmpty: 'Eşleşen not yok', untitledFallback: 'Başlıksız not', writeThought: 'Aklındaki fikir', thoughtSeed: 'Bugün aklını ne meşgul ediyor?\n\nTek bir cümleyle başla. Seni götürdüğü yere git.', noteUpdated: 'Not güncellendi', notePinned: 'Sabitlendi', noteUnpinned: 'Sabitleme kaldırıldı', graphLimit: 'En yeni 110 not gösteriliyor', importFailed: 'Dosya okunamadı.', noNotesFound: 'Not bulunamadı', noteListRecent: 'Son düzenlenenler', writing: 'Yaz', notebookLoaded: 'Fikirlerin bıraktığın yerde.', noteCount: 'not', linkCount: 'bağlantı', pinnedOnly: 'Sabitlenen notlar', allNotesFilter: 'Tüm notlar'
    }
  };

  const sampleNotes = [
    {
      id: 'sample-noticing', title: 'Dikkat bir tasarım kararıdır',
      content: '# Dikkat bir tasarım kararıdır\n\nBir günün nasıl hissettirdiğini, çoğu zaman neye dikkat ettiğimiz belirler. Küçük bir merak, büyük bir yön değişikliğinin başlangıcı olabilir.\n\n> Fark etmek, değiştirmenin ilk biçimidir.\n\nBu fikri [[Küçük deneyler, büyük yönler]] ile birlikte düşün. Daha iyi sorular sormak için [[İyi soru nereye bakacağını söyler]] notuna da göz at.',
      tags: ['fikirler', 'alışkanlıklar'], pinned: true, createdAt: '2026-10-20T09:00:00.000Z', updatedAt: '2026-10-26T14:10:00.000Z'
    },
    {
      id: 'sample-experiments', title: 'Küçük deneyler, büyük yönler',
      content: '# Küçük deneyler, büyük yönler\n\nBir değişikliği sonsuza kadar sürdürmek zorunda değilsin. Onu bir haftalığına dene, ne olduğunu gözlemle ve sonra karar ver.\n\n- Soruyu küçült\n- Başlangıç noktasını not et\n- Bir hafta sonra neyin değiştiğine bak\n\nBazen en iyi deney, [[Dikkat bir tasarım kararıdır]] fikrini gün içinde bir kez hatırlamaktır.',
      tags: ['deneyler', 'alışkanlıklar'], pinned: false, createdAt: '2026-10-22T10:20:00.000Z', updatedAt: '2026-10-25T11:25:00.000Z'
    },
    {
      id: 'sample-questions', title: 'İyi soru nereye bakacağını söyler',
      content: '# İyi soru nereye bakacağını söyler\n\nSorular, düşüncenin yönünü belirler. “Yeterince iyi mi?” yerine “Bir sonraki küçük adım ne?” diye sormak hareket alanı açar.\n\nBir soruyu daha kullanışlı kılmak için onu [[Dikkat bir tasarım kararıdır]] ile bağla; sonra [[Küçük deneyler, büyük yönler]] fikrini bir haftalığına dene.',
      tags: ['fikirler', 'sorular'], pinned: false, createdAt: '2026-10-24T08:15:00.000Z', updatedAt: '2026-10-24T16:40:00.000Z'
    }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const state = {
    notes: loadNotebook(), activeId: null, filter: 'all', selectedTag: '', query: '',
    mode: 'write', language: loadPreferences().language || 'tr', dark: Boolean(loadPreferences().dark),
    saveTimer: null, renderTimer: null, toastTimer: null, graphFrame: 0, graphNodes: [], graphLinks: [],
    graphView: { zoom: 1, x: 0, y: 0 }, graphDrag: null, graphSize: { width: 0, height: 0 }
  };
  state.activeId = state.notes[0]?.id || null;

  function loadPreferences() {
    try { return JSON.parse(localStorage.getItem(PREFERENCES_KEY) || '{}'); }
    catch { return {}; }
  }

  function loadNotebook() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (parsed && parsed.version === 1 && Array.isArray(parsed.notes)) return parsed.notes.map(normalizeNote).filter(Boolean);
    } catch (error) { console.warn('Loom could not read its saved notebook.', error); }
    return sampleNotes.map(note => ({ ...note, tags: [...note.tags] }));
  }

  function normalizeNote(note) {
    if (!note || typeof note !== 'object') return null;
    return {
      id: typeof note.id === 'string' && note.id ? note.id : makeId(),
      title: typeof note.title === 'string' ? note.title.slice(0, 240) : '',
      content: typeof note.content === 'string' ? note.content.slice(0, 500000) : '',
      tags: Array.isArray(note.tags) ? [...new Set(note.tags.filter(tag => typeof tag === 'string').map(tag => tag.trim().slice(0, 40)).filter(Boolean))].slice(0, 30) : [],
      pinned: Boolean(note.pinned),
      createdAt: validDate(note.createdAt) || new Date().toISOString(),
      updatedAt: validDate(note.updatedAt) || validDate(note.createdAt) || new Date().toISOString()
    };
  }

  function validDate(value) {
    return typeof value === 'string' && !Number.isNaN(Date.parse(value)) ? value : '';
  }

  function makeId() {
    return globalThis.crypto?.randomUUID?.() || `note-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function tr(key) { return dictionaries[state.language]?.[key] || dictionaries.en[key] || key; }
  function applyLanguage() {
    document.documentElement.lang = state.language;
    $$('[data-i18n]').forEach(element => {
      const value = tr(element.dataset.i18n);
      if (value !== undefined) element.textContent = value;
    });
    $$('[data-i18n-placeholder]').forEach(element => { element.placeholder = tr(element.dataset.i18nPlaceholder); });
    $('#save-status').textContent = tr('saved');
    renderSidebar();
    if (state.activeId) renderNote(state.activeId);
    updateGraphStats();
  }

  function savePreferences() {
    try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify({ language: state.language, dark: state.dark })); }
    catch (error) { console.warn('Loom could not save preferences.', error); }
  }

  function persistNotebook() {
    const status = $('.save-indicator');
    status.classList.add('saving');
    $('#save-status').textContent = tr('saving');
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, notes: state.notes }));
        status.classList.remove('saving');
        $('#save-status').textContent = tr('saved');
      } catch (error) {
        status.classList.remove('saving');
        $('#save-status').textContent = state.language === 'tr' ? 'Depolama alanı dolu' : 'Storage is full';
        showToast(state.language === 'tr' ? 'Kaydedilemedi. Defterini dışa aktararak yedek al.' : 'Could not save. Export your notebook to make a backup.');
        console.error('Loom could not save the notebook.', error);
      }
    }, 160);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  }

  function normalizeTitle(value) { return String(value || '').trim().toLocaleLowerCase(); }

  function sortedNotes(notes = state.notes) {
    return [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned) || Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  }

  function visibleNotes() {
    let result = state.notes;
    if (state.filter === 'pinned') result = result.filter(note => note.pinned);
    if (state.selectedTag) result = result.filter(note => note.tags.includes(state.selectedTag));
    const query = normalizeTitle(state.query);
    if (query) result = result.filter(note => normalizeTitle(`${note.title} ${note.content} ${note.tags.join(' ')}`).includes(query));
    return sortedNotes(result);
  }

  function renderSidebar() {
    const noteList = $('#note-list');
    const notes = visibleNotes();
    noteList.replaceChildren();
    $('#note-count').textContent = String(state.notes.length);
    $('#breadcrumb-current').textContent = state.selectedTag ? `# ${state.selectedTag}` : state.filter === 'pinned' ? tr('pinned') : state.query ? (state.language === 'tr' ? 'Arama sonuçları' : 'Search results') : tr('allNotes');
    $('#all-notes-button').classList.toggle('active', state.filter === 'all' && !state.selectedTag);
    $('#pinned-button').classList.toggle('active', state.filter === 'pinned' && !state.selectedTag);
    $('#clear-tag').classList.toggle('hidden', !state.selectedTag);

    const tags = new Map();
    state.notes.forEach(note => note.tags.forEach(tag => tags.set(tag, (tags.get(tag) || 0) + 1)));
    const tagList = $('#tag-list');
    tagList.replaceChildren();
    const tagColors = ['#9c91e5', '#9bc4aa', '#e3b58f', '#94bac8', '#d69fb4', '#aab47c'];
    [...tags.entries()].sort(([a], [b]) => a.localeCompare(b, state.language)).slice(0, 12).forEach(([tag, count], index) => {
      const button = document.createElement('button');
      button.className = `tag-filter${state.selectedTag === tag ? ' active' : ''}`;
      button.dataset.tag = tag;
      button.style.setProperty('--tag-color', tagColors[index % tagColors.length]);
      button.innerHTML = `<span class="tag-dot"></span><span>${escapeHtml(tag)}</span><small>${count}</small>`;
      tagList.append(button);
    });
    if (!tags.size) {
      const empty = document.createElement('div'); empty.className = 'no-tags'; empty.textContent = tr('noTags'); tagList.append(empty);
    }

    if (!notes.length) {
      const empty = document.createElement('div'); empty.className = 'no-sidebar-notes';
      empty.textContent = state.query ? tr('searchEmpty') : state.selectedTag ? tr('noTagNotes') : state.filter === 'pinned' ? tr('noNotes') : tr('noNotes');
      noteList.append(empty);
    }
    notes.forEach(note => {
      const button = document.createElement('button');
      button.className = `note-row${note.id === state.activeId ? ' active' : ''}`;
      button.dataset.id = note.id;
      const title = note.title.trim() || tr('untitledFallback');
      const excerpt = plainText(note.content).slice(0, 57) || tr('createNoteHint');
      button.innerHTML = `<span class="note-row-icon">${note.pinned ? '✳' : '◌'}</span><span class="note-row-copy"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(excerpt)}</small></span>`;
      noteList.append(button);
    });
  }

  function plainText(markdown) {
    return String(markdown || '').replace(/```[\s\S]*?```/g, ' ').replace(/!?(\[([^\]]*)\])\([^)]*\)/g, '$2').replace(/[#>*_~`]/g, '').replace(/\[\[([^\]]+)\]\]/g, '$1').replace(/\s+/g, ' ').trim();
  }

  function currentNote() { return state.notes.find(note => note.id === state.activeId) || null; }

  function renderNote(id = state.activeId) {
    const note = state.notes.find(item => item.id === id);
    if (!note) { state.activeId = null; renderEmpty(); return; }
    state.activeId = note.id;
    $('#empty-state').classList.add('hidden');
    $('#note-editor').classList.remove('hidden');
    $('#title-input').value = note.title;
    $('#tags-input').value = note.tags.join(', ');
    $('#content-input').value = note.content;
    $('#pin-note-button').classList.toggle('pinned', note.pinned);
    $('#pin-note-button').setAttribute('aria-label', note.pinned ? (state.language === 'tr' ? 'Sabitlemeyi kaldır' : 'Unpin note') : (state.language === 'tr' ? 'Notu sabitle' : 'Pin note'));
    $('#note-date').textContent = formatDate(note.updatedAt);
    setEditorMode(state.mode);
    updateWritingStats();
    renderBacklinks();
    renderOutline();
    renderSidebar();
    if (!$('#graph-overlay').classList.contains('hidden')) buildGraph();
  }

  function renderEmpty() {
    $('#note-editor').classList.add('hidden');
    $('#empty-state').classList.remove('hidden');
    const hasFilter = state.query || state.selectedTag || state.filter === 'pinned';
    $('#empty-title').textContent = state.query ? tr('noSearchResults') : state.selectedTag ? tr('noTagNotes') : state.filter === 'pinned' ? tr('noNotes') : tr('nothingHere');
    $('#empty-description').textContent = hasFilter ? tr('createNoteHint') : tr('emptyDescription');
    $('#empty-create').classList.toggle('hidden', Boolean(hasFilter));
    renderSidebar();
  }

  function formatDate(dateString) {
    try {
      return new Intl.DateTimeFormat(state.language === 'tr' ? 'tr-TR' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(dateString));
    } catch { return ''; }
  }

  function updateWritingStats() {
    const note = currentNote();
    if (!note) return;
    const text = plainText(note.content);
    const count = text ? text.split(/\s+/).length : 0;
    $('#word-count').textContent = `${count} ${tr('words')}`;
    $('#reading-time').textContent = `${Math.max(1, Math.ceil(count / 220))} ${tr('minute')}`;
  }

  function renderInline(text) {
    let result = escapeHtml(text);
    const placeholders = [];
    const hold = html => { const token = `\u0000${placeholders.length}\u0000`; placeholders.push(html); return token; };
    result = result.replace(/`([^`]+)`/g, (_, code) => hold(`<code>${code}</code>`));
    result = result.replace(/\[\[([^\]]+)\]\]/g, (_, title) => hold(`<button class="wiki-link" data-wiki="${title.trim()}" type="button">${title.trim()}</button>`));
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, destination) => {
      const safe = /^https?:\/\//i.test(destination) ? destination : '';
      return safe ? hold(`<a href="${safe}" target="_blank" rel="noopener noreferrer">${label}</a>`) : label;
    });
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/__(.+?)__/g, '<strong>$1</strong>').replace(/_(.+?)_/g, '<em>$1</em>');
    return result.replace(/\u0000(\d+)\u0000/g, (_, index) => placeholders[Number(index)] || '');
  }

  function renderMarkdown(markdown) {
    const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
    const html = [];
    let paragraph = [], listType = '', codeLines = [];
    const flushParagraph = () => { if (paragraph.length) { html.push(`<p>${paragraph.map(renderInline).join('<br>')}</p>`); paragraph = []; } };
    const closeList = () => { if (listType) { html.push(`</${listType}>`); listType = ''; } };
    const flushCode = () => { html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`); codeLines = []; };
    let inCode = false;
    for (const line of lines) {
      if (/^\s*```/.test(line)) {
        flushParagraph(); closeList();
        if (inCode) flushCode();
        inCode = !inCode; continue;
      }
      if (inCode) { codeLines.push(line); continue; }
      const heading = line.match(/^(#{1,3})\s+(.+)$/);
      const unordered = line.match(/^\s*[-*+]\s+(.+)$/);
      const ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);
      if (!line.trim()) { flushParagraph(); closeList(); continue; }
      if (heading) {
        flushParagraph(); closeList();
        const level = heading[1].length;
        html.push(`<h${level} id="${slugify(plainText(heading[2]))}">${renderInline(heading[2])}</h${level}>`);
      } else if (/^\s*>/.test(line)) {
        flushParagraph(); closeList(); html.push(`<blockquote>${renderInline(line.replace(/^\s*>\s?/, ''))}</blockquote>`);
      } else if (/^\s*(---+|\*\*\*+)\s*$/.test(line)) {
        flushParagraph(); closeList(); html.push('<hr>');
      } else if (unordered || ordered) {
        flushParagraph();
        const nextType = unordered ? 'ul' : 'ol';
        if (listType !== nextType) { closeList(); html.push(`<${nextType}>`); listType = nextType; }
        html.push(`<li>${renderInline((unordered || ordered)[1])}</li>`);
      } else { closeList(); paragraph.push(line); }
    }
    flushParagraph(); closeList(); if (inCode) flushCode();
    return html.join('') || `<p class="preview-empty">${escapeHtml(state.language === 'tr' ? 'Henüz yazı yok.' : 'Nothing written yet.')}</p>`;
  }

  function slugify(text) {
    return String(text).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'heading';
  }

  function setEditorMode(mode) {
    state.mode = mode;
    const writing = mode === 'write';
    $('#content-input').classList.toggle('hidden', !writing);
    $('#markdown-preview').classList.toggle('hidden', writing);
    $('#write-tab').classList.toggle('active', writing);
    $('#preview-tab').classList.toggle('active', !writing);
    $('#write-tab').setAttribute('aria-selected', String(writing));
    $('#preview-tab').setAttribute('aria-selected', String(!writing));
    if (!writing) $('#markdown-preview').innerHTML = renderMarkdown(currentNote()?.content || '');
  }

  function renderBacklinks() {
    const note = currentNote();
    const list = $('#backlink-list'); list.replaceChildren();
    if (!note) return;
    const target = normalizeTitle(note.title);
    const backlinks = state.notes.filter(item => item.id !== note.id && [...item.content.matchAll(/\[\[([^\]]+)\]\]/g)].some(match => normalizeTitle(match[1]) === target));
    $('#backlink-count').textContent = String(backlinks.length);
    if (!backlinks.length) { const empty = document.createElement('div'); empty.className = 'no-backlinks'; empty.textContent = tr('noBacklinks'); list.append(empty); return; }
    backlinks.forEach(item => {
      const button = document.createElement('button'); button.className = 'backlink-card'; button.dataset.id = item.id;
      const snippet = plainText(item.content).slice(0, 85);
      button.innerHTML = `<span class="backlink-icon">↗</span><span class="backlink-copy"><strong>${escapeHtml(item.title || tr('untitledFallback'))}</strong><span>${escapeHtml(snippet)}</span></span>`;
      list.append(button);
    });
  }

  function renderOutline() {
    const content = currentNote()?.content || '';
    const headings = [...content.matchAll(/^(#{1,3})\s+(.+)$/gm)];
    const outline = $('#outline-list'); outline.replaceChildren();
    if (!headings.length) { const empty = document.createElement('span'); empty.className = 'outline-muted'; empty.textContent = tr('noOutline'); outline.append(empty); return; }
    headings.slice(0, 14).forEach(match => {
      const link = document.createElement('a');
      link.className = match[1].length === 3 ? 'level-3' : '';
      link.href = `#${slugify(plainText(match[2]))}`; link.textContent = plainText(match[2]);
      link.addEventListener('click', event => {
        event.preventDefault();
        const heading = $(`#${CSS.escape(slugify(plainText(match[2])))}`, $('#markdown-preview'));
        if (state.mode === 'preview' && heading) heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
        else {
          const source = $('#content-input'); const target = `# ${plainText(match[2])}`; const index = source.value.indexOf(target);
          source.focus(); if (index >= 0) source.setSelectionRange(index, index + target.length);
        }
      });
      outline.append(link);
    });
  }

  function updateNoteFromEditor(field, value) {
    const note = currentNote(); if (!note) return;
    if (field === 'tags') {
      note.tags = [...new Set(value.split(',').map(tag => tag.trim().replace(/^#/, '').slice(0, 40)).filter(Boolean))].slice(0, 30);
    } else note[field] = value;
    note.updatedAt = new Date().toISOString();
    $('#note-date').textContent = formatDate(note.updatedAt);
    persistNotebook(); updateWritingStats();
    if (field === 'content') {
      if (state.mode === 'preview') $('#markdown-preview').innerHTML = renderMarkdown(note.content);
      renderOutline(); renderBacklinks();
    }
    clearTimeout(state.renderTimer);
    state.renderTimer = setTimeout(() => { renderSidebar(); if (!$('#graph-overlay').classList.contains('hidden')) buildGraph(); }, 240);
  }

  function createNote(options = {}) {
    const now = new Date().toISOString();
    const note = normalizeNote({ id: makeId(), title: options.title || '', content: options.content || '', tags: options.tags || [], pinned: false, createdAt: now, updatedAt: now });
    state.notes.unshift(note); state.activeId = note.id; state.filter = 'all'; state.selectedTag = ''; state.query = '';
    state.mode = 'write';
    $('#search-input').value = '';
    persistNotebook(); renderNote(note.id); showToast(options.toast === false ? '' : tr('noteCreated'));
    setTimeout(() => $('#title-input').focus(), 0);
    return note;
  }

  function selectNote(id) {
    if (!state.notes.some(note => note.id === id)) return;
    state.activeId = id; state.mode = 'write'; renderNote(id); document.body.classList.remove('sidebar-open');
  }

  function deleteCurrentNote() {
    const note = currentNote(); if (!note) return;
    if (!window.confirm(tr('confirmDelete'))) return;
    state.notes = state.notes.filter(item => item.id !== note.id);
    const next = sortedNotes()[0]; state.activeId = next?.id || null;
    persistNotebook(); if (next) renderNote(next.id); else renderEmpty(); showToast(tr('noteDeleted'));
  }

  function togglePin() {
    const note = currentNote(); if (!note) return;
    note.pinned = !note.pinned; note.updatedAt = new Date().toISOString(); persistNotebook();
    renderNote(note.id); showToast(tr(note.pinned ? 'notePinned' : 'noteUnpinned'));
  }

  function formatSelection(kind) {
    const input = $('#content-input'); const start = input.selectionStart; const end = input.selectionEnd;
    const selected = input.value.slice(start, end) || (kind === 'wiki' ? (state.language === 'tr' ? 'Not başlığı' : 'Note title') : (state.language === 'tr' ? 'metin' : 'text'));
    const markers = { bold: ['**', '**'], italic: ['*', '*'], code: ['`', '`'], wiki: ['[[', ']]'] }[kind];
    const replacement = `${markers[0]}${selected}${markers[1]}`;
    input.setRangeText(replacement, start, end, 'select'); input.focus();
    updateNoteFromEditor('content', input.value);
  }

  function openWikiTarget(title) {
    const cleaned = String(title || '').trim(); if (!cleaned) return;
    const found = state.notes.find(note => normalizeTitle(note.title) === normalizeTitle(cleaned));
    if (found) { selectNote(found.id); return; }
    const note = createNote({ title: cleaned, toast: false }); showToast(tr('missingLinkCreated'));
    setTimeout(() => $('#content-input').focus(), 0);
    return note;
  }

  function showToast(message) {
    if (!message) return;
    const toast = $('#toast'); toast.textContent = message; toast.classList.remove('hidden');
    clearTimeout(state.toastTimer); state.toastTimer = setTimeout(() => toast.classList.add('hidden'), 2500);
  }

  function exportNotebook() {
    const payload = { format: 'loom-notebook', version: 1, exportedAt: new Date().toISOString(), notes: state.notes };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
    anchor.href = url; anchor.download = `loom-notebook-${new Date().toISOString().slice(0, 10)}.json`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000); showToast(tr('exported'));
  }

  function importNotebook(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!data || data.version !== 1 || !Array.isArray(data.notes)) throw new Error('Unexpected notebook format');
        const imported = data.notes.map(normalizeNote).filter(Boolean);
        if (!window.confirm(tr('confirmImport'))) return;
        state.notes = imported; state.activeId = sortedNotes()[0]?.id || null; state.filter = 'all'; state.selectedTag = ''; state.query = '';
        $('#search-input').value = ''; persistNotebook();
        if (state.activeId) renderNote(state.activeId); else renderEmpty();
        showToast(tr('imported'));
      } catch (error) { console.error('Loom could not import this file.', error); showToast(tr('invalidImport')); }
      finally { $('#import-file').value = ''; }
    };
    reader.onerror = () => { $('#import-file').value = ''; showToast(tr('importFailed')); };
    reader.readAsText(file);
  }

  function toggleGraph(open = true) {
    const overlay = $('#graph-overlay');
    if (!open) {
      overlay.classList.add('hidden'); document.body.style.overflow = '';
      if (state.graphFrame) cancelAnimationFrame(state.graphFrame); state.graphFrame = 0; return;
    }
    overlay.classList.remove('hidden'); document.body.style.overflow = 'hidden'; buildGraph(); $('#graph-close').focus();
  }

  function graphData() {
    const selected = sortedNotes().slice(0, MAX_GRAPH_NOTES);
    const notesByTitle = new Map(selected.filter(note => note.title.trim()).map(note => [normalizeTitle(note.title), note.id]));
    const links = []; const seen = new Set();
    selected.forEach(note => {
      for (const match of note.content.matchAll(/\[\[([^\]]+)\]\]/g)) {
        const target = notesByTitle.get(normalizeTitle(match[1]));
        if (!target || target === note.id) continue;
        const key = [note.id, target].sort().join('|');
        if (!seen.has(key)) { links.push({ source: note.id, target }); seen.add(key); }
      }
    });
    return { notes: selected, links };
  }

  function buildGraph() {
    const canvas = $('#graph-canvas'); const wrap = $('.graph-canvas-wrap');
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    if (!rect.width || !rect.height) { requestAnimationFrame(buildGraph); return; }
    const ctx = canvas.getContext('2d'); const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr); canvas.height = Math.floor(rect.height * dpr);
    state.graphSize = { width: rect.width, height: rect.height };
    const { notes, links } = graphData(); state.graphLinks = links;
    const oldPositions = new Map(state.graphNodes.map(node => [node.id, node]));
    const radius = Math.min(rect.width, rect.height) * .36;
    state.graphNodes = notes.map((note, index) => {
      const previous = oldPositions.get(note.id);
      if (previous) return { ...previous, title: note.title || tr('untitledFallback'), pinned: note.pinned, degree: 0 };
      const angle = index * 2.399963229728653;
      const distance = 15 + radius * Math.sqrt((index + 1) / Math.max(notes.length, 1));
      return { id: note.id, title: note.title || tr('untitledFallback'), x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, vx: 0, vy: 0, pinned: note.pinned, degree: 0 };
    });
    const map = new Map(state.graphNodes.map(node => [node.id, node]));
    links.forEach(link => { if (map.has(link.source)) map.get(link.source).degree++; if (map.has(link.target)) map.get(link.target).degree++; });
    $('#graph-empty').classList.toggle('hidden', notes.length > 0);
    $('#graph-legend').classList.toggle('hidden', notes.length === 0);
    if (notes.length > MAX_GRAPH_NOTES) showToast(tr('graphLimit'));
    updateGraphStats();
    if (state.graphFrame) cancelAnimationFrame(state.graphFrame);
    const draw = () => {
      state.graphFrame = requestAnimationFrame(draw);
      const { width, height } = state.graphSize;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
      const nodes = state.graphNodes; const byId = new Map(nodes.map(node => [node.id, node]));
      if (!nodes.length) return;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]; let dx = b.x - a.x, dy = b.y - a.y;
          const distanceSquared = Math.max(dx * dx + dy * dy, 20); const distance = Math.sqrt(distanceSquared);
          const force = Math.min(1.2, 1800 / distanceSquared) * .022;
          dx = dx / distance * force; dy = dy / distance * force;
          a.vx -= dx; a.vy -= dy; b.vx += dx; b.vy += dy;
        }
      }
      for (const link of links) {
        const a = byId.get(link.source), b = byId.get(link.target); if (!a || !b) continue;
        const dx = b.x - a.x, dy = b.y - a.y, distance = Math.max(Math.hypot(dx, dy), 1);
        const force = (distance - 105) * .0007;
        a.vx += dx / distance * force; a.vy += dy / distance * force;
        b.vx -= dx / distance * force; b.vy -= dy / distance * force;
      }
      nodes.forEach(node => {
        node.vx += -node.x * .00016; node.vy += -node.y * .00016;
        node.vx *= .91; node.vy *= .91; node.x += node.vx; node.y += node.vy;
      });
      ctx.save(); ctx.translate(width / 2 + state.graphView.x, height / 2 + state.graphView.y); ctx.scale(state.graphView.zoom, state.graphView.zoom);
      ctx.lineWidth = 1 / state.graphView.zoom;
      links.forEach(link => {
        const a = byId.get(link.source), b = byId.get(link.target); if (!a || !b) return;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = state.dark ? '#58564f' : '#d4d1c8'; ctx.stroke();
      });
      nodes.forEach(node => {
        const isCurrent = node.id === state.activeId; const radiusNode = isCurrent ? 6.5 : 4.4 + Math.min(2.2, node.degree * .45);
        if (isCurrent) { ctx.beginPath(); ctx.arc(node.x, node.y, radiusNode + 7, 0, Math.PI * 2); ctx.fillStyle = state.dark ? '#8175ed1e' : '#7569dd1a'; ctx.fill(); }
        ctx.beginPath(); ctx.arc(node.x, node.y, radiusNode, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? '#6458d8' : node.degree ? '#a4c8b3' : (state.dark ? '#797b71' : '#c4c2b8'); ctx.fill();
        ctx.strokeStyle = state.dark ? '#292a26' : '#faf9f6'; ctx.lineWidth = 2 / state.graphView.zoom; ctx.stroke();
        if (state.graphView.zoom > .58 || isCurrent) {
          const maxChars = Math.floor(25 / state.graphView.zoom);
          const label = node.title.length > maxChars ? `${node.title.slice(0, maxChars - 1)}…` : node.title;
          ctx.font = `${isCurrent ? '600 ' : ''}${10 / state.graphView.zoom}px ${getComputedStyle(document.body).fontFamily}`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillStyle = state.dark ? '#d4d4cc' : '#696b63';
          ctx.fillText(label, node.x, node.y + radiusNode + 5 / state.graphView.zoom);
        }
      });
      ctx.restore();
    };
    draw();
  }

  function updateGraphStats() {
    const stats = $('#graph-stat'); if (!stats) return;
    stats.textContent = `${state.graphNodes.length || graphData().notes.length} ${tr('noteCount')} · ${state.graphLinks.length || graphData().links.length} ${tr('linkCount')}`;
  }

  function graphPoint(event) {
    const rect = $('#graph-canvas').getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function graphHit(point) {
    const { width, height } = state.graphSize; const view = state.graphView;
    const x = (point.x - width / 2 - view.x) / view.zoom, y = (point.y - height / 2 - view.y) / view.zoom;
    return [...state.graphNodes].reverse().find(node => Math.hypot(node.x - x, node.y - y) < (12 / view.zoom));
  }

  function bindEvents() {
    $('#new-note-button').addEventListener('click', () => createNote());
    $('#empty-create').addEventListener('click', () => createNote());
    $('#graph-create-note').addEventListener('click', () => { toggleGraph(false); createNote(); });
    $('#all-notes-button').addEventListener('click', () => { state.filter = 'all'; state.selectedTag = ''; renderSidebar(); if (!visibleNotes().some(note => note.id === state.activeId)) renderEmpty(); else renderNote(state.activeId); });
    $('#pinned-button').addEventListener('click', () => { state.filter = 'pinned'; state.selectedTag = ''; renderSidebar(); if (!visibleNotes().some(note => note.id === state.activeId)) { const note = visibleNotes()[0]; if (note) renderNote(note.id); else renderEmpty(); } });
    $('#graph-button').addEventListener('click', () => toggleGraph(true));
    $('#card-graph').addEventListener('click', () => toggleGraph(true));
    $('#top-graph-button').addEventListener('click', () => toggleGraph(true));
    $('#graph-close').addEventListener('click', () => toggleGraph(false));
    $('.graph-backdrop').addEventListener('click', () => toggleGraph(false));
    $('#graph-reset').addEventListener('click', () => { state.graphView = { zoom: 1, x: 0, y: 0 }; buildGraph(); });
    $('#graph-export').addEventListener('click', exportNotebook);
    $('#delete-note-button').addEventListener('click', deleteCurrentNote);
    $('#pin-note-button').addEventListener('click', togglePin);
    $('#title-input').addEventListener('input', event => updateNoteFromEditor('title', event.target.value));
    $('#tags-input').addEventListener('change', event => updateNoteFromEditor('tags', event.target.value));
    $('#content-input').addEventListener('input', event => updateNoteFromEditor('content', event.target.value));
    $('#content-input').addEventListener('keydown', event => {
      const mod = event.ctrlKey || event.metaKey;
      if (mod && event.key.toLowerCase() === 'b') { event.preventDefault(); formatSelection('bold'); }
      if (mod && event.key.toLowerCase() === 'i') { event.preventDefault(); formatSelection('italic'); }
    });
    $$('.format-button').forEach(button => button.addEventListener('click', () => formatSelection(button.dataset.format)));
    $('#write-tab').addEventListener('click', () => setEditorMode('write'));
    $('#preview-tab').addEventListener('click', () => setEditorMode('preview'));
    $('#note-list').addEventListener('click', event => { const row = event.target.closest('[data-id]'); if (row) selectNote(row.dataset.id); });
    $('#backlink-list').addEventListener('click', event => { const row = event.target.closest('[data-id]'); if (row) selectNote(row.dataset.id); });
    $('#tag-list').addEventListener('click', event => {
      const button = event.target.closest('[data-tag]'); if (!button) return;
      state.selectedTag = state.selectedTag === button.dataset.tag ? '' : button.dataset.tag; state.filter = 'all';
      const notes = visibleNotes(); renderSidebar(); if (notes.some(note => note.id === state.activeId)) renderNote(state.activeId); else if (notes[0]) renderNote(notes[0].id); else renderEmpty();
    });
    $('#clear-tag').addEventListener('click', () => { state.selectedTag = ''; renderSidebar(); if (state.activeId) renderNote(state.activeId); });
    $('#search-input').addEventListener('input', event => {
      state.query = event.target.value; const notes = visibleNotes(); renderSidebar();
      if (notes.some(note => note.id === state.activeId)) renderNote(state.activeId); else if (notes[0]) renderNote(notes[0].id); else renderEmpty();
    });
    $('#markdown-preview').addEventListener('click', event => { const button = event.target.closest('[data-wiki]'); if (button) openWikiTarget(button.dataset.wiki); });
    $('#outline-list').addEventListener('click', event => { if (event.target.matches('a')) event.preventDefault(); });
    $('#more-button').addEventListener('click', () => $('#more-menu').classList.toggle('hidden'));
    document.addEventListener('click', event => { if (!event.target.closest('.profile-row')) $('#more-menu').classList.add('hidden'); });
    $('#export-button').addEventListener('click', exportNotebook);
    $('#top-export-button').addEventListener('click', exportNotebook);
    $('#import-button').addEventListener('click', () => $('#import-file').click());
    $('#import-file').addEventListener('change', event => importNotebook(event.target.files?.[0]));
    $('#theme-button').addEventListener('click', () => { state.dark = !state.dark; document.body.classList.toggle('dark-theme', state.dark); savePreferences(); if (!$('#graph-overlay').classList.contains('hidden')) buildGraph(); });
    $('#language-button').addEventListener('click', () => { state.language = state.language === 'tr' ? 'en' : 'tr'; savePreferences(); applyLanguage(); });
    $('#prompt-button').addEventListener('click', () => createNote({ title: tr('writeThought'), content: tr('thoughtSeed') }));
    $('#sidebar-toggle').addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
    $('#mobile-menu-button').addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
    document.addEventListener('pointerdown', event => {
      if (document.body.classList.contains('sidebar-open') && !event.target.closest('.sidebar') && !event.target.closest('#mobile-menu-button')) document.body.classList.remove('sidebar-open');
    });
    document.addEventListener('keydown', event => {
      const mod = event.metaKey || event.ctrlKey;
      if (mod && event.key.toLowerCase() === 'k') { event.preventDefault(); $('#search-input').focus(); $('#search-input').select(); }
      if (mod && event.key.toLowerCase() === 'n') { event.preventDefault(); createNote(); }
      if (mod && event.shiftKey && event.key.toLowerCase() === 'g') { event.preventDefault(); toggleGraph(true); }
      if (mod && event.key.toLowerCase() === 's') { event.preventDefault(); persistNotebook(); }
      if (event.key === 'Escape') {
        if (!$('#graph-overlay').classList.contains('hidden')) toggleGraph(false);
        else document.body.classList.remove('sidebar-open');
      }
    });

    const canvas = $('#graph-canvas');
    canvas.addEventListener('pointerdown', event => {
      const point = graphPoint(event); const node = graphHit(point);
      state.graphDrag = { pointerId: event.pointerId, nodeId: node?.id || '', x: point.x, y: point.y, originX: state.graphView.x, originY: state.graphView.y, moved: false };
      canvas.setPointerCapture(event.pointerId); canvas.classList.add('dragging');
    });
    canvas.addEventListener('pointermove', event => {
      const point = graphPoint(event); const drag = state.graphDrag;
      if (drag && drag.pointerId === event.pointerId) {
        const dx = point.x - drag.x, dy = point.y - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
        if (drag.moved && drag.nodeId) {
          const node = state.graphNodes.find(item => item.id === drag.nodeId);
          if (node) { const scale = state.graphView.zoom; node.x += dx / scale; node.y += dy / scale; node.vx = 0; node.vy = 0; }
          drag.x = point.x; drag.y = point.y;
        } else if (drag.moved) {
          state.graphView.x = drag.originX + dx; state.graphView.y = drag.originY + dy;
        }
        return;
      }
      canvas.classList.toggle('node-hover', Boolean(graphHit(point)));
    });
    canvas.addEventListener('pointerup', event => {
      const drag = state.graphDrag; if (!drag || drag.pointerId !== event.pointerId) return;
      const node = !drag.moved ? state.graphNodes.find(item => item.id === drag.nodeId) : null;
      state.graphDrag = null; canvas.classList.remove('dragging');
      if (node) { selectNote(node.id); toggleGraph(false); }
    });
    canvas.addEventListener('pointercancel', () => { state.graphDrag = null; canvas.classList.remove('dragging'); });
    canvas.addEventListener('wheel', event => {
      event.preventDefault(); const point = graphPoint(event); const oldZoom = state.graphView.zoom;
      const newZoom = Math.max(.35, Math.min(2.6, oldZoom * (event.deltaY < 0 ? 1.1 : .9)));
      const { width, height } = state.graphSize;
      const worldX = (point.x - width / 2 - state.graphView.x) / oldZoom;
      const worldY = (point.y - height / 2 - state.graphView.y) / oldZoom;
      state.graphView.zoom = newZoom;
      state.graphView.x = point.x - width / 2 - worldX * newZoom;
      state.graphView.y = point.y - height / 2 - worldY * newZoom;
    }, { passive: false });
    window.addEventListener('resize', () => { if (!$('#graph-overlay').classList.contains('hidden')) buildGraph(); });
  }

  document.body.classList.toggle('dark-theme', state.dark);
  bindEvents(); applyLanguage();
  if (state.activeId) renderNote(state.activeId); else renderEmpty();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(error => console.info('Offline cache is unavailable in this browser.', error)));
  }
})();
