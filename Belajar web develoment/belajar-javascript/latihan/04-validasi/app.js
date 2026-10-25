"use strict";
const form = document.querySelector("#form");
const nama = document.querySelector("#nama");
const email = document.querySelector("#email");
const konfirmasi = document.querySelector("#konfirmasi");
const setuju = document.querySelector("#setuju");
const fields = [nama, email, konfirmasi, setuju];
const ringkasan = document.querySelector("#ringkasan");
const hasil = document.querySelector("#hasil");
let pernahSubmit = false;

function validate() {
  // Pesan custom lama harus dihapus sebelum memeriksa ulang validity.
  fields.forEach(field => field.setCustomValidity(""));
  const errors = {};
  if (nama.value.trim().length < 3 || nama.value.trim().length > 60) errors.nama = "Tulis nama sepanjang 3–60 karakter setelah spasi tepi dibuang.";
  if (!email.value.trim()) errors.email = "Tulis alamat email.";
  else if (email.validity.typeMismatch || email.value.length > 120) errors.email = "Tulis format email yang sesuai, maksimal 120 karakter.";
  if (!konfirmasi.value.trim()) errors.konfirmasi = "Tulis kembali emailmu.";
  else if (konfirmasi.validity.typeMismatch || konfirmasi.value.length > 120) errors.konfirmasi = "Tulis format email yang sesuai, maksimal 120 karakter.";
  else if (konfirmasi.value.trim() !== email.value.trim()) errors.konfirmasi = "Email konfirmasi harus sama dengan email pertama.";
  if (!setuju.checked) errors.setuju = "Centang pernyataan pemahaman demo.";
  for (const field of fields) {
    const message = errors[field.id] ?? "";
    field.setCustomValidity(message);
    const el = document.querySelector(`#${field.id}-error`);
    el.textContent = message;
    el.hidden = !message;
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }
  ringkasan.hidden = Object.keys(errors).length === 0;
  ringkasan.textContent = ringkasan.hidden ? "" : "Periksa isian yang ditandai.";
  return fields.find(field => Boolean(errors[field.id])) ?? null;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  pernahSubmit = true;
  hasil.hidden = true;
  const firstInvalid = validate();
  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }
  hasil.textContent = `Aturan demo terpenuhi, ${nama.value.trim()}. Tidak ada data yang dikirim atau disimpan.`;
  hasil.hidden = false;
});
form.addEventListener("input", () => {
  hasil.hidden = true;
  if (pernahSubmit) validate();
});
// Native constraints tetap di HTML. Setelah handler siap, pakai pesan custom.
form.noValidate = true;
