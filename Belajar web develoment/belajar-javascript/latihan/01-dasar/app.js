"use strict";
function hitungRataRata(daftar) {
  if (daftar.length === 0) return null;
  return daftar.reduce((total, nilai) => total + nilai, 0) / daftar.length;
}

document.querySelector("#run").addEventListener("click", () => {
  const nilai = [70, 80, 90];
  const contoh = [
    ['"5" + 2', "5" + 2, "Satu operand string: + menyusun teks."],
    ['Number("5") + 2', Number("5") + 2, "Konversi eksplisit menghasilkan number sebelum penjumlahan."],
    ['Boolean("false")', Boolean("false"), "String tidak kosong adalah truthy."],
    ['0 || 10', 0 || 10, "Operator || memakai operand kanan ketika kiri falsy."],
    ['0 ?? 10', 0 ?? 10, "?? hanya mengganti null atau undefined."],
    ['[70, 80, 90].map(n => n + 5)', nilai.map(n => n + 5), "map menghasilkan array baru."],
    ['hitungRataRata([70, 80, 90])', hitungRataRata(nilai), "Fungsi mengembalikan hasil hitung."],
    ['hitungRataRata([])', hitungRataRata([]), "Kasus kosong ditangani secara sengaja."]
  ];
  const fragment = document.createDocumentFragment();
  for (const [ekspresi, hasil, alasan] of contoh) {
    const row = document.createElement("tr");
    for (const value of [ekspresi, JSON.stringify(hasil), alasan]) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    }
    fragment.append(row);
  }
  document.querySelector("#hasil").replaceChildren(fragment);
  document.querySelector("#status").textContent = `${contoh.length} percobaan selesai. Baca alasan, lalu ubah kodenya.`;
});
