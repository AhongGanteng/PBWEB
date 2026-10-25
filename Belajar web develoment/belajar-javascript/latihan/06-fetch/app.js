"use strict";
const source = document.querySelector("#sumber");
const loadButton = document.querySelector("#muat");
const cancelButton = document.querySelector("#batal");
const status = document.querySelector("#status");
const list = document.querySelector("#hasil");
let latestRequest = 0;
let controller = null;

function validData(data) {
  return data !== null && typeof data === "object" && Array.isArray(data.materi)
    && data.materi.every(item => item !== null && typeof item === "object"
      && typeof item.judul === "string" && Number.isFinite(item.menit) && item.menit > 0);
}

async function load() {
  const requestId = ++latestRequest;
  controller?.abort();
  controller = new AbortController();
  const activeController = controller;
  cancelButton.disabled = false;
  list.setAttribute("aria-busy", "true");
  list.replaceChildren();
  status.textContent = "Memuat data…";
  try {
    const response = await fetch(`data/${source.value}`, { signal: activeController.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}: data tidak dapat dimuat.`);
    const data = await response.json();
    if (!validData(data)) throw new Error("JSON diterima, tetapi bentuk datanya tidak sesuai.");
    if (requestId !== latestRequest) return;
    const fragment = document.createDocumentFragment();
    for (const item of data.materi) {
      const li = document.createElement("li");
      li.textContent = `${item.judul} — ${item.menit} menit`;
      fragment.append(li);
    }
    list.replaceChildren(fragment);
    status.textContent = data.materi.length ? `${data.materi.length} materi dimuat.` : "Request berhasil, tetapi belum ada materi.";
  } catch (error) {
    if (requestId !== latestRequest) return;
    status.textContent = error.name === "AbortError" ? "Request dibatalkan." : `Gagal: ${error.message}`;
  } finally {
    if (requestId === latestRequest) {
      list.setAttribute("aria-busy", "false");
      cancelButton.disabled = true;
    }
  }
}

loadButton.addEventListener("click", load);
cancelButton.addEventListener("click", () => controller?.abort());
if (window.location.protocol === "file:") {
  document.querySelector("#server-hint").hidden = false;
  loadButton.disabled = true;
}
