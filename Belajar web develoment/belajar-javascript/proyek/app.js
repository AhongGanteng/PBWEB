(() => {
  "use strict";

  // 1. Konfigurasi dan referensi DOM. State tetap terpisah dari DOM.
  const STORAGE_KEY = "ruang-belajar.tasks.v1";
  const TOPICS = { html: "HTML", css: "CSS", javascript: "JavaScript", dom: "DOM & Event" };
  const MAX_TASKS = 200;
  const form = document.querySelector("#task-form");
  const list = document.querySelector("#task-list");
  const titleInput = document.querySelector("#judul");
  const topicInput = document.querySelector("#topik");
  const minutesInput = document.querySelector("#menit");
  const noteInput = document.querySelector("#catatan");
  const searchInput = document.querySelector("#pencarian");
  const statusFilter = document.querySelector("#filter-status");
  const fields = [titleInput, topicInput, minutesInput, noteInput];
  const appStatus = document.querySelector("#app-status");
  const storageStatus = document.querySelector("#storage-status");
  const listTitle = document.querySelector("#list-title");
  const undoPanel = document.querySelector("#undo-panel");
  let storageBlocked = false;
  let editingId = null;
  let deletedTask = null;
  let fallbackSequence = 0;

  // 2. Memeriksa bentuk data, bukan sekadar keberhasilan JSON.parse().
  function isTask(task) {
    return task !== null && typeof task === "object"
      && typeof task.id === "string" && task.id.length > 0 && task.id.length <= 100
      && typeof task.title === "string" && task.title.trim().length >= 3 && task.title.length <= 80
      && typeof task.topic === "string" && Object.hasOwn(TOPICS, task.topic)
      && Number.isInteger(task.minutes) && task.minutes >= 5 && task.minutes <= 240 && task.minutes % 5 === 0
      && typeof task.note === "string" && task.note.length <= 400
      && typeof task.done === "boolean"
      && typeof task.createdAt === "string" && Number.isFinite(Date.parse(task.createdAt));
  }

  function readTasks() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === null) return [];
      const data = JSON.parse(raw);
      if (data === null || typeof data !== "object" || data.version !== 1
          || !Array.isArray(data.tasks) || data.tasks.length > MAX_TASKS
          || !data.tasks.every(isTask)
          || new Set(data.tasks.map(task => task.id)).size !== data.tasks.length) {
        throw new Error("Bentuk data tersimpan tidak sesuai.");
      }
      // Hanya ambil property yang memang dipakai aplikasi.
      return data.tasks.map(({ id, title, topic, minutes, note, done, createdAt }) =>
        ({ id, title, topic, minutes, note, done, createdAt }));
    } catch (error) {
      storageBlocked = true;
      storageStatus.textContent = "Data tersimpan tidak bisa dibaca atau penyimpanan tidak tersedia. Data lama tidak diubah. Perubahan baru hanya berlaku untuk sesi halaman ini.";
      console.warn("Ruang Belajar: gagal membaca penyimpanan.", error);
      return [];
    }
  }

  let tasks = readTasks();
  if (!storageBlocked) {
    storageStatus.textContent = "Catatan disimpan di browser ini saat kamu mengubah daftar. Gunakan alamat dan browser yang sama untuk membukanya kembali.";
  }

  function saveTasks() {
    if (storageBlocked) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, tasks }));
    } catch (error) {
      storageBlocked = true;
      storageStatus.textContent = "Perubahan tetap tampil, tetapi tidak dapat disimpan ke browser. Perubahan selanjutnya hanya berlaku untuk sesi halaman ini.";
      console.warn("Ruang Belajar: gagal menyimpan.", error);
    }
  }

  // 3. Validasi nilai yang sudah dibaca dan dinormalisasi.
  function getFormValues() {
    return { title: titleInput.value.trim(), topic: topicInput.value,
      minutes: minutesInput.value.trim() === "" ? NaN : Number(minutesInput.value), note: noteInput.value.trim() };
  }

  function validateValues(values) {
    const errors = {};
    if (values.title.length < 3 || values.title.length > 80) errors.judul = "Tulis judul sepanjang 3–80 karakter setelah spasi tepi dibuang.";
    if (!Object.hasOwn(TOPICS, values.topic)) errors.topik = "Pilih salah satu topik yang tersedia.";
    if (!Number.isInteger(values.minutes) || values.minutes < 5 || values.minutes > 240 || values.minutes % 5 !== 0) errors.menit = "Tulis 5–240 menit dalam kelipatan 5.";
    if (values.note.length > 400) errors.catatan = "Batasi catatan hingga 400 karakter.";
    return errors;
  }

  function showFieldError(field, message = "") {
    const errorElement = document.querySelector(`#${field.id}-error`);
    field.setCustomValidity(message);
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
    errorElement.textContent = message;
    errorElement.hidden = !message;
  }

  function clearFormErrors() {
    fields.forEach(field => showFieldError(field));
    document.querySelector("#form-error").hidden = true;
    document.querySelector("#form-error").textContent = "";
  }

  function resetEditor() {
    editingId = null;
    form.reset();
    clearFormErrors();
    document.querySelector("#form-title").textContent = "Tambah rencana";
    document.querySelector("#submit-button").textContent = "Tambah ke daftar";
    document.querySelector("#cancel-edit").hidden = true;
  }

  // 4. Render: state -> elemen. Input pengguna selalu dimasukkan sebagai teks.
  function makeButton(label, action, task) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.action = action;
    button.textContent = label;
    button.setAttribute("aria-label", `${label}: ${task.title}`);
    if (action === "delete") button.className = "delete-button";
    return button;
  }

  function makeTaskElement(task) {
    const item = document.createElement("li");
    item.className = "task-item";
    item.classList.toggle("is-done", task.done);
    item.dataset.id = task.id;
    const top = document.createElement("div");
    top.className = "task-top";
    const checkLabel = document.createElement("label");
    checkLabel.className = "task-check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.dataset.action = "toggle";
    const checkText = document.createElement("span");
    checkText.className = "visually-hidden";
    checkText.textContent = `Selesai: ${task.title}`;
    checkLabel.append(checkbox, checkText);
    const content = document.createElement("div");
    content.className = "task-content";
    const heading = document.createElement("h3");
    heading.textContent = task.title;
    const meta = document.createElement("p");
    meta.className = "task-meta";
    meta.textContent = `${TOPICS[task.topic]} · ${task.minutes} menit · ${task.done ? "Selesai" : "Belum selesai"}`;
    content.append(heading, meta);
    if (task.note) {
      const note = document.createElement("p");
      note.className = "task-note";
      note.textContent = task.note;
      content.append(note);
    }
    const actions = document.createElement("div");
    actions.className = "task-actions";
    actions.append(makeButton("Ubah", "edit", task), makeButton("Hapus", "delete", task));
    content.append(actions);
    top.append(checkLabel, content);
    item.append(top);
    return item;
  }

  function render() {
    const query = searchInput.value.trim().toLocaleLowerCase("id-ID");
    const visibleTasks = tasks.filter(task => {
      const matchesText = `${task.title} ${TOPICS[task.topic]} ${task.note}`.toLocaleLowerCase("id-ID").includes(query);
      const matchesStatus = statusFilter.value === "semua"
        || (statusFilter.value === "aktif" && !task.done)
        || (statusFilter.value === "selesai" && task.done);
      return matchesText && matchesStatus;
    });
    const fragment = document.createDocumentFragment();
    visibleTasks.forEach(task => fragment.append(makeTaskElement(task)));
    list.replaceChildren(fragment);
    const empty = document.querySelector("#empty-state");
    empty.hidden = visibleTasks.length > 0;
    empty.textContent = tasks.length === 0
      ? "Belum ada rencana. Mulai dari satu hal kecil yang ingin kamu pahami."
      : "Tidak ada rencana yang cocok. Coba kata pencarian atau filter lain.";
    document.querySelector("#result-count").textContent = `${visibleTasks.length} dari ${tasks.length} ditampilkan`;
    document.querySelector("#stat-total").textContent = tasks.length;
    document.querySelector("#stat-done").textContent = tasks.filter(task => task.done).length;
    document.querySelector("#stat-minutes").textContent = tasks.filter(task => task.done).reduce((total, task) => total + task.minutes, 0);
    document.querySelector("#undo-button").disabled = tasks.length >= MAX_TASKS;
  }

  function commit(nextTasks) {
    tasks = nextTasks;
    saveTasks();
    render();
  }

  function makeId() {
    let id;
    do {
      id = globalThis.crypto?.randomUUID
        ? globalThis.crypto.randomUUID()
        : `tugas-${Date.now().toString(36)}-${fallbackSequence++}`;
    } while (tasks.some(task => task.id === id));
    return id;
  }

  // 5. Event: baca -> validasi -> ubah state -> simpan -> render.
  form.addEventListener("submit", event => {
    event.preventDefault();
    clearFormErrors();
    const values = getFormValues();
    const errors = validateValues(values);
    fields.forEach(field => showFieldError(field, errors[field.id] ?? ""));
    const firstInvalid = fields.find(field => Boolean(errors[field.id]));
    if (firstInvalid) {
      const summary = document.querySelector("#form-error");
      summary.textContent = "Periksa isian yang ditandai sebelum melanjutkan.";
      summary.hidden = false;
      firstInvalid.focus();
      return;
    }
    if (editingId === null && tasks.length >= MAX_TASKS) {
      const summary = document.querySelector("#form-error");
      summary.textContent = "Batas 200 rencana tercapai. Hapus rencana yang tidak diperlukan sebelum menambah.";
      summary.hidden = false;
      return;
    }
    const wasEditing = editingId !== null;
    if (wasEditing) {
      commit(tasks.map(task => task.id === editingId ? { ...task, ...values } : task));
    } else {
      commit([...tasks, { id: makeId(), ...values, done: false, createdAt: new Date().toISOString() }]);
    }
    resetEditor();
    appStatus.textContent = wasEditing ? "Rencana diperbarui." : "Rencana ditambahkan ke daftar.";
    titleInput.focus();
  });

  fields.forEach(field => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        const errors = validateValues(getFormValues());
        showFieldError(field, errors[field.id] ?? "");
      }
    });
  });

  document.querySelector("#cancel-edit").addEventListener("click", () => {
    resetEditor();
    appStatus.textContent = "Perubahan isian dibatalkan.";
    titleInput.focus();
  });

  list.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest("button[data-action]");
    if (!button || !list.contains(button)) return;
    const item = button.closest("li[data-id]");
    if (!item) return;
    const task = tasks.find(task => task.id === item.dataset.id);
    if (!task) return;
    if (button.dataset.action === "edit") {
      editingId = task.id;
      titleInput.value = task.title;
      topicInput.value = task.topic;
      minutesInput.value = String(task.minutes);
      noteInput.value = task.note;
      clearFormErrors();
      document.querySelector("#form-title").textContent = "Ubah rencana";
      document.querySelector("#submit-button").textContent = "Simpan perubahan";
      document.querySelector("#cancel-edit").hidden = false;
      titleInput.focus();
    } else if (button.dataset.action === "delete") {
      deletedTask = { task, index: tasks.findIndex(item => item.id === task.id) };
      if (editingId === task.id) resetEditor();
      commit(tasks.filter(item => item.id !== task.id));
      document.querySelector("#undo-text").textContent = `“${task.title}” dihapus. Kamu dapat mengembalikan penghapusan terakhir sebelum halaman dimuat ulang.`;
      undoPanel.hidden = false;
      appStatus.textContent = "Rencana dihapus. Tombol Kembalikan tersedia.";
      listTitle.focus();
    }
  });

  list.addEventListener("change", event => {
    if (!(event.target instanceof HTMLInputElement) || event.target.dataset.action !== "toggle") return;
    const item = event.target.closest("li[data-id]");
    if (!item) return;
    const id = item.dataset.id;
    const checked = event.target.checked;
    commit(tasks.map(task => task.id === id ? { ...task, done: checked } : task));
    appStatus.textContent = checked ? "Rencana ditandai selesai." : "Rencana ditandai belum selesai.";
    const replacement = [...list.children].find(item => item.dataset.id === id)?.querySelector("input");
    (replacement ?? listTitle).focus();
  });

  document.querySelector("#undo-button").addEventListener("click", () => {
    if (!deletedTask || tasks.length >= MAX_TASKS) return;
    const nextTasks = [...tasks];
    nextTasks.splice(Math.min(deletedTask.index, nextTasks.length), 0, deletedTask.task);
    deletedTask = null;
    commit(nextTasks);
    undoPanel.hidden = true;
    appStatus.textContent = "Rencana dikembalikan.";
    listTitle.focus();
  });

  searchInput.addEventListener("input", render);
  statusFilter.addEventListener("change", render);
  window.addEventListener("storage", event => {
    if (event.key === STORAGE_KEY || event.key === null) document.querySelector("#external-change").hidden = false;
  });
  document.querySelector("#reload-button").addEventListener("click", () => window.location.reload());

  // Penangan submit sudah terpasang; aplikasi memakai pesan error sendiri.
  form.noValidate = true;
  render();
})();
