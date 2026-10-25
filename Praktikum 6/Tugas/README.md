1. Jelaskan mengapa validasi client-side tidak boleh menjadi satu-satunya lapisan validasi pada aplikasi web!
   Jawab: Karena code di sisi client dijalankan dalam komputer user. User bisa saja menambah, melewati, bahkan mengabaikannya.
   Server tidak bisa tahu apakah data yang masuk sudah divalidasi oleh browser atau belum.
2. Sebutkan minimal tiga atribut validasi bawaan HTML5 beserta fungsinya masing-masing!
   1. required, mewajibkan user untuk menginput sebelum dikirim.
   2. pattern, mencocokan input dengan regular expression tertentu.
   3. minLength/maxLength, membatasi panjang teks minimum dan maksimum.
3. Jelaskan perbedaan antara input.checkValidity() dan input.reportValidity()!
   Input.checkValidity() digunakan untuk memeriksa input tanpa memberi tahu user apapun di layar.
   Input.checkValidity() hanya mengecek lalu mengembalikan hasil true (valid) atau false (tidak valid),
   dan tidak ada gelembung pesan atau tanda yang muncul.

   Sedangkan, Input.reportValidity() memeriksa dengan cara yang sama, tetapi kalau tidak valid,
   browser akan menampilkan gelembung pesan dan memfokuskan elemen yang bermasalah.
   Juga mengembalikan nilai true atau false.
4. Apa fungsi setCustomValidity("") (string kosong), dan mengapa penting memanggilnya kembali setelah error diperbaiki?
   setCustomValidity("") berfungsi untuk menghapus pesan error kustom, sehingga browser menganggap input itu tidak lagi punya error.
   Input kembali dinilai hanya berdasarkan aturan bawaannya (required, pattern, dan sebagainya).

   Penting karena pesan kustom bersifat menempel. Browser tidak menghapusnya otomatis ketika pengguna memperbaiki isian.
   Jika tidak direset maka, input terus dianggap tidak valid walau isinya sudah benar.
   User akan bingung karena merasa sudah mengisi dengan benar.
5. Rancang aturan validasi (beserta pseudocode) agar field “Tanggal Lahir” tidak boleh berada di masa depan.
   Psuedocode:
   Fungsi hariIni() {
       ambil tahun, bulan, hari dari jam perangkat();
       return tahun, bulan, hari;
   }

   input date;

   Fungsi validasiTanggalLahir() {
       reset error message 
       Jika (input tanggal lahir === kosong) {
           return;
       }
       Jika (input tanggal lahir > hariIni()) {
           kasi error message 
       }
   }

   Jika (input tanggal lahir) {
       validasiTanggalLahir()
       JIKA form tidak valid:
          tampilkan pesan, batalkan submit
   }

  Kode:
  const inputTglLahir = document.getElementById("tgl-lahir");
  function hariIniLokal() {
      const sekarang = new Date();
      const tahun = sekarang.getFullYear();
      const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
      const tanggal = String(sekarang.getDate()).padStart(2, "0");
      return `${tahun}-${bulan}-${tanggal}`;
  }
  function validasiTanggalLahir() {
      inputTglLahir.setCustomValidity("");
      if (inputTglLahir.value === "") 
          return;
      if (inputTglLahir.value > hariIniLokal()) {
          inputTglLahir.setCustomValidity("Tanggal lahir tidak boleh di masa depan!");
      }
  }
  if (inputTglLahir) {
      inputTglLahir.max = hariIniLokal();
      inputTglLahir.addEventListener("input", validasiTanggalLahir);
  }

Fitur-fitur:
1. Login menggunakan kode pendaftaran
2. Pesan kesalahan login
3. Pengisian formulir pendaftaran calon mahasiswa
4. Option grup dari javascript
5. Bisa menampilkan elemen yang hidden
6. Bisa pilih program studi
7. Bisa input file berkas
8. Atribut validasi input formulir
9. Halaman pendaftaran selesai
10. Tombol masuk ke formulir pendaftaran
11. Tombol kirim formulir
12. Tombol kembali ke halaman login
