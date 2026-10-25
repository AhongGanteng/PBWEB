"use strict";
const KEY = "latihan-js.counter.v1";
const state = { memory: 0, session: 0, local: 0 };
const status = document.querySelector("#status");
const unavailable = new Set();

function area(name) {
  return name === "session" ? window.sessionStorage : window.localStorage;
}

for (const name of ["session", "local"]) {
  try {
    const raw = area(name).getItem(KEY);
    if (raw !== null) {
      const value = JSON.parse(raw);
      if (!Number.isSafeInteger(value) || value < 0) throw new Error("Penghitung tidak sesuai.");
      state[name] = value;
    }
  } catch (error) {
    unavailable.add(name);
    status.textContent = "Ada storage yang tidak bisa dibaca. Penghitung terkait hanya berlaku di memory pada sesi halaman ini.";
  }
}

function render() {
  for (const [name, value] of Object.entries(state)) document.querySelector(`#${name}-value`).textContent = value;
}

document.querySelectorAll("button[data-area]").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.area;
    if (!Number.isSafeInteger(state[name] + 1)) return;
    state[name] += 1;
    if (name !== "memory" && !unavailable.has(name)) {
      try {
        area(name).setItem(KEY, JSON.stringify(state[name]));
      } catch (error) {
        unavailable.add(name);
        status.textContent = "Penulisan storage gagal. Angka tetap berubah di memory, tetapi tidak dijamin bertahan setelah reload.";
      }
    }
    render();
  });
});

document.querySelector("#reset").addEventListener("click", () => {
  let failed = false;
  for (const name of ["session", "local"]) {
    try { area(name).removeItem(KEY); unavailable.delete(name); }
    catch (error) { failed = true; }
  }
  state.memory = state.session = state.local = 0;
  status.textContent = failed ? "Angka di halaman direset; sebagian storage tidak bisa dihapus." : "Penghitung demo direset.";
  render();
});
render();
