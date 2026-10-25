"use strict";
const form = document.querySelector("#form");
const input = document.querySelector("#teks");
const daftar = document.querySelector("#daftar");
const status = document.querySelector("#status");
let urutan = 0;

function perbaruiJumlah() {
  document.querySelector("#jumlah").textContent = `${daftar.children.length} catatan`;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const teks = input.value.trim();
  if (!teks || teks.length > 120) {
    input.setCustomValidity("Tulis catatan sepanjang 1–120 karakter, bukan hanya spasi.");
    input.reportValidity();
    return;
  }
  const item = document.createElement("div");
  item.className = "item";
  item.dataset.id = String(++urutan);
  const paragraf = document.createElement("p");
  paragraf.textContent = teks;
  const sorot = document.createElement("button");
  sorot.type = "button";
  sorot.textContent = "Sorot";
  sorot.setAttribute("aria-pressed", "false");
  sorot.addEventListener("click", () => {
    const aktif = item.classList.toggle("is-highlighted");
    sorot.setAttribute("aria-pressed", String(aktif));
  });
  const hapus = document.createElement("button");
  hapus.type = "button";
  hapus.textContent = "Hapus";
  hapus.setAttribute("aria-label", `Hapus catatan: ${teks}`);
  hapus.addEventListener("click", () => {
    item.remove();
    perbaruiJumlah();
    status.textContent = "Catatan dihapus.";
    input.focus();
  });
  item.append(paragraf, sorot, hapus);
  daftar.append(item);
  perbaruiJumlah();
  form.reset();
  status.textContent = "Catatan ditambahkan.";
  input.focus();
});
input.addEventListener("input", () => input.setCustomValidity(""));
