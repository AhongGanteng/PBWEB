# Belajar CSS & CSS Responsif — dari paham aturan sampai mampu mendesain

> Panduan belajar mandiri dengan penjelasan berbahasa Indonesia, contoh kode, percobaan, proyek lengkap, dan latihan dengan pembahasan.
>
> Tujuan kita: kamu mampu **menjelaskan mengapa sebuah tampilan terbentuk, membuat tata letak sendiri, serta memperbaikinya ketika konten atau ukuran layar berubah**.

CSS tidak harus kamu hafal semuanya. Kamu perlu memahami cara browser memilih aturan, menghitung ukuran, dan menyusun elemen. Setelah itu, dokumentasi menjadi tempat mencari detail, bukan tempat menebak-nebak solusi.

Materi ini memakai HTML dan CSS biasa, tanpa framework dan tanpa proses build. Penjelasan, desain proyek, dan contoh disusun untuk latihan. Rujukan teknis primer tersedia pada [Bab 35](#bab-35). Materi diperiksa pada 19 Oktober 2026; dukungan fitur browser tetap perlu dilihat saat kamu memakainya untuk proyek nyata.

## Daftar isi

| Dasar | Tata letak dan desain | Responsif dan praktik |
| --- | --- | --- |
| [00. Cara belajar](#bab-00) | [12. Jarak dan whitespace](#bab-12) | [24. Komponen web](#bab-24) |
| [01. Cara kerja CSS](#bab-01) | [13. Tipografi](#bab-13) | [25. Aksesibilitas](#bab-25) |
| [02. Persiapan dan contoh pertama](#bab-02) | [14. Warna dan background](#bab-14) | [26. Transisi dan animasi](#bab-26) |
| [03. Sintaks dan pemasangan](#bab-03) | [15. Prinsip desain visual](#bab-15) | [27. Organisasi CSS](#bab-27) |
| [04. Selector](#bab-04) | [16. Flexbox](#bab-16) | [28. Fitur lanjutan](#bab-28) |
| [05. Pseudo-class dan pseudo-element](#bab-05) | [17. Grid](#bab-17) | [29. Performa dan kompatibilitas](#bab-29) |
| [06. Cascade dan specificity](#bab-06) | [18. Position dan z-index](#bab-18) | [30. Debugging](#bab-30) |
| [07. Inheritance](#bab-07) | [19. Pola pikir responsif](#bab-19) | [31. Proyek lengkap](#bab-31) |
| [08. Box model](#bab-08) | [20. Media query](#bab-20) | [32. Latihan dan pembahasan](#bab-32) |
| [09. Normal flow dan display](#bab-09) | [21. Ukuran fluid](#bab-21) | [33. Rencana belajar](#bab-33) |
| [10. Satuan CSS](#bab-10) | [22. Gambar, tabel, dan navigasi](#bab-22) | [34. Checklist dan ringkasan](#bab-34) |
| [11. Ukuran dan overflow](#bab-11) | [23. Container query](#bab-23) | [35. Glosarium dan sumber](#bab-35) |

<a id="bab-00"></a>
## 00. Cara menggunakan panduan ini

### Urutan yang kusarankan

1. **Bab 01–11:** pahami bagaimana CSS memilih aturan dan mengukur elemen.
2. **Bab 12–18:** belajar membuat tampilan yang rapi dengan sistem jarak, tipografi, Flexbox, dan Grid.
3. **Bab 19–26:** buat tampilan yang tetap nyaman ketika ukuran layar, cara interaksi, atau kebutuhan pengguna berubah.
4. **Bab 27–31:** rapikan kode, cari penyebab masalah, lalu bedah proyek lengkap.
5. **Bab 32–35:** latihan, periksa jawaban, dan gunakan ringkasan saat mengerjakan proyekmu sendiri.

Tidak perlu menamatkan semuanya sekali duduk. Kerjakan satu konsep sampai kamu bisa memprediksi hasil perubahan kecil.

### Siklus belajar yang kita pakai

**Prediksi → ubah satu hal → lihat hasil → jelaskan penyebabnya.**

Contoh: sebelum mengubah `padding: 16px` menjadi `padding: 32px`, tulis dugaanmu. Apakah jarak di dalam kotak bertambah? Apakah ukuran luar kotak ikut bertambah? Jawabannya bergantung pada box model yang dipakai. Pertanyaan seperti ini melatih pemahaman, bukan sekadar kemampuan menyalin kode.

### Tanda kamu sudah memahami suatu konsep

- Kamu bisa menjelaskan fungsinya tanpa membaca definisi.
- Kamu bisa memodifikasi contoh, bukan hanya menjalankannya.
- Kamu bisa memperkirakan apa yang terjadi ketika teks bertambah panjang.
- Ketika hasil berbeda dari dugaan, kamu tahu bagian mana yang perlu diperiksa.

**Tentang contoh:** potongan kecil umumnya berdiri sendiri. Jangan menempelkan semua potongan dalam satu stylesheet karena nama class dapat digunakan kembali untuk membahas konsep berbeda. Hanya kode pada Bab 31 yang merupakan satu proyek utuh.

<a id="bab-01"></a>
## 01. Apa yang sebenarnya dikerjakan CSS?

CSS adalah **Cascading Style Sheets**, bahasa untuk menjelaskan presentasi dokumen: warna, ukuran, jarak, susunan, dan beberapa bentuk interaksi visual.

| Bagian | Tanggung jawab | Contoh |
| --- | --- | --- |
| HTML | Struktur dan makna konten | Ini judul, ini navigasi, ini tombol |
| CSS | Presentasi dan tata letak | Judul besar, navigasi berjajar, tombol hijau |
| JavaScript | Logika dan perubahan perilaku | Menambah komentar, mengambil data, mengatur keadaan aplikasi |

Kamu mungkin pernah menulis `document.querySelector("#form-komentar")`. Selector CSS mengikuti ide serupa: memilih elemen yang sesuai. Bedanya, dalam stylesheet kamu mendeklarasikan bagaimana elemen tersebut ditampilkan.

```html
<article class="kartu">
  <h2>Belajar CSS</h2>
  <p>Mulai dari hubungan antarelemen.</p>
</article>
```

```css
.kartu {
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 1rem;
}
```

Arti kode: setiap elemen dengan class `kartu` mempunyai ruang dalam, garis tepi, dan sudut melengkung.

### CSS bersifat deklaratif

Kamu menyatakan hasil yang diinginkan, lalu browser menghitung rinciannya.

```css
.daftar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

Kamu tidak menulis perulangan untuk menghitung posisi setiap kartu. Kamu menyatakan bahwa daftar memakai tiga kolom dengan jarak tertentu. Browser menyusun anak-anaknya berdasarkan aturan layout.

### Hubungan induk, anak, dan saudara

Pada HTML di atas, `article` adalah induk dari `h2` dan `p`. Keduanya anak langsung `article` sekaligus saudara satu sama lain. Hubungan ini penting untuk selector, pewarisan, dan layout.

### Gambaran kerja browser

Secara ringkas, browser membaca struktur HTML dan aturan CSS, menentukan gaya yang berlaku, menghitung tata letak, menggambar tampilan, lalu menggabungkan lapisan visual jika diperlukan. Tahapan sebenarnya lebih rinci dan bisa diulang saat konten, font, ukuran viewport, atau gaya berubah.

**Maknanya untukmu:** perubahan `width` dapat mengubah susunan elemen lain. Perubahan `color` biasanya tidak perlu mengubah ukuran kotak. CSS selalu bekerja dalam konteks dokumen, bukan satu elemen yang terisolasi.

<a id="bab-02"></a>
## 02. Persiapan dan contoh pertama yang bisa dijalankan

### Yang kamu perlukan

- Editor teks, misalnya VS Code, atau editor lain yang sudah kamu gunakan.
- Browser yang mendukung HTML dan CSS modern.
- Folder khusus latihan agar file mudah ditemukan.

Untuk membuka README ini di VS Code, pilih file lalu gunakan **Open Preview**; pintasan yang umum adalah `Ctrl+Shift+V`. README merupakan Markdown: kode di dalamnya perlu disalin ke file HTML/CSS untuk dijalankan.

Jika kamu mengunduh paket pendamping, susunannya sebagai berikut:

| Lokasi | Isi |
| --- | --- |
| `README.md` | Panduan ini, termasuk kode proyek lengkap |
| `proyek/index.html` | Struktur halaman Ruang Kode |
| `proyek/styles.css` | Seluruh gaya proyek |
| `latihan/01-cascade.html` | Eksperimen specificity dan inheritance |
| `latihan/02-flex-grid.html` | Perbandingan Flexbox dan Grid |
| `latihan/03-container-query.html` | Kartu yang menyesuaikan ukuran wadah |

### Percobaan pertama: cukup satu file

Buat `index.html`, salin kode ini, simpan, lalu buka file itu di browser.

```html
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Percobaan CSS pertamaku</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 1rem;
      font-family: system-ui, sans-serif;
      line-height: 1.6;
      background: #eef5f2;
      color: #172b27;
    }

    .kartu {
      max-width: 32rem;
      margin: 2rem auto;
      padding: 1.5rem;
      background: white;
      border: 1px solid #c6d5cf;
      border-radius: 1rem;
    }

    h1 {
      margin-top: 0;
      line-height: 1.2;
    }

    a {
      color: #176b52;
      text-underline-offset: 0.2em;
    }
  </style>
</head>
<body>
  <article class="kartu">
    <h1>Halo, aku sedang belajar CSS.</h1>
    <p>Aku ingin memahami alasan di balik tampilan sebuah halaman.</p>
    <a href="#target">Lompat ke target latihan</a>
    <p id="target">Ini tujuan tautan. Coba ubah warna dan padding kartu.</p>
  </article>
</body>
</html>
```

**Hasil yang diharapkan:** sebuah kartu putih, sudut melengkung, latar hijau pucat, dan teks yang tetap berada di dalam layar sempit.

**Coba sendiri:** ganti `padding` kartu menjadi `3rem`. Lalu hapus `max-width`. Bandingkan hasil kedua perubahan tersebut. `padding` mengatur ruang dalam; `max-width` membatasi lebar kartu.

<a id="bab-03"></a>
## 03. Membaca sintaks dan menghubungkan stylesheet

```css
.judul {
  color: #176b52;
  font-size: 2rem;
}
```

| Bagian | Nama | Makna |
| --- | --- | --- |
| `.judul` | Selector | Elemen yang dituju |
| `{ ... }` | Declaration block | Kumpulan deklarasi |
| `color` | Property | Aspek yang diatur |
| `#176b52` | Value | Nilai yang diinginkan |
| `color: #176b52;` | Declaration | Satu pasangan property dan value |

Gunakan titik koma pada setiap deklarasi agar penambahan baris berikutnya tidak merusak sintaks. Komentar CSS ditulis dengan `/* ... */`, bukan `//`.

### Tiga cara menulis CSS

**External stylesheet — pilihan utama untuk proyek:**

```html
<link rel="stylesheet" href="styles.css">
```

Letakkan elemen `link` di dalam `head`. Buat `styles.css` pada folder yang sama. Jika stylesheet ada di folder `css`, path-nya menjadi `css/styles.css`.

**Internal stylesheet — praktis untuk eksperimen satu file:**

```html
<style>
  p { color: navy; }
</style>
```

**Inline style — gaya langsung pada elemen:**

```html
<p style="color: navy;">Contoh inline.</p>
```

Inline style bisa berguna ketika nilainya memang dinamis, tetapi menyulitkan pengelolaan pola tampilan berulang. Internal dan external **tidak memiliki peringkat kekuatan yang berbeda hanya karena lokasinya**. Cascade tetap menentukan pemenang.

### Path gambar dari CSS

```css
.banner {
  background-image: url("../images/banner.jpg");
}
```

Pada stylesheet eksternal, URL relatif tersebut dihitung dari **lokasi file CSS**, bukan lokasi file HTML. Kesalahan ini sering membuat gambar tidak muncul.

### Shorthand dan longhand

```css
.kotak {
  padding-top: 1rem;
  padding-right: 2rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
}

/* Efek yang sama untuk keempat sisi. */
.kotak {
  padding: 1rem 2rem;
}
```

Shorthand mengatur beberapa subproperty sekaligus. Waspadai reset yang tidak terlihat: `background: white` juga mengembalikan komponen background lain ke nilai awalnya jika tidak disebutkan. Gunakan `background-color` jika kamu hanya ingin mengubah warna dan mempertahankan gambar latar.

<a id="bab-04"></a>
## 04. Selector: memilih elemen dengan tepat

| Selector | Yang dipilih |
| --- | --- |
| `p` | Semua elemen `p` |
| `.kartu` | Elemen yang memiliki class `kartu` |
| `#menu-utama` | Elemen dengan ID tersebut |
| `*` | Semua elemen |
| `h1, h2` | Semua `h1` dan semua `h2` |
| `.kartu p` | Semua `p` yang merupakan keturunan `.kartu` |
| `.kartu > p` | `p` yang merupakan anak langsung `.kartu` |
| `h2 + p` | `p` yang langsung mengikuti `h2`, dengan induk yang sama |
| `h2 ~ p` | Semua saudara `p` sesudah `h2` |
| `.kartu.unggulan` | Satu elemen yang memiliki kedua class |
| `.kartu .unggulan` | Elemen `.unggulan` di dalam `.kartu` |
| `input[type="email"]` | Input dengan atribut `type="email"` |

### Class dapat digunakan ulang

```html
<article class="kartu">Materi HTML</article>
<article class="kartu unggulan">Materi CSS</article>
```

```css
.kartu {
  padding: 1rem;
  border: 1px solid #cbd5e1;
}

.kartu.unggulan {
  border-color: #176b52;
  background: #eef5f2;
}
```

Kartu kedua menerima kedua aturan karena kedua selector cocok dengannya.

### Perbedaan keturunan dan anak langsung

```html
<article class="kartu">
  <p>Paragraf A</p>
  <div>
    <p>Paragraf B</p>
  </div>
</article>
```

`.kartu p` memilih A dan B. `.kartu > p` hanya memilih A.

**Saran kerja:** gunakan class untuk komponen visual. Simpan ID terutama untuk identitas unik, tujuan anchor, atau hubungan seperti `label` dan `input`. Hindari selector panjang seperti `body main section div article h2`; perubahan struktur HTML dapat membuatnya tidak cocok lagi.

<a id="bab-05"></a>
## 05. Pseudo-class dan pseudo-element

Pseudo-class memilih berdasarkan keadaan atau hubungan. Pseudo-element menargetkan bagian tertentu dari tampilan elemen.

### Keadaan interaksi

```css
.tombol {
  background: #176b52;
  color: white;
}

.tombol:hover {
  background: #11513e;
}

.tombol:active {
  transform: translateY(1px);
}

.tombol:focus-visible {
  outline: 3px solid #123fbc;
  outline-offset: 3px;
}

.tombol:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
```

- `:hover`: penunjuk berada di atas elemen; jangan jadikan hover satu-satunya cara mengakses informasi.
- `:active`: elemen sedang diaktifkan, misalnya saat tombol mouse ditekan.
- `:focus`: elemen sedang menerima fokus.
- `:focus-visible`: browser menilai indikator fokus perlu ditampilkan; sangat berguna saat navigasi keyboard.
- `:focus-within`: elemen atau salah satu keturunannya memiliki fokus.
- `:disabled`: kontrol yang benar-benar berada dalam keadaan disabled menurut HTML.

Class `.disabled` sendiri **tidak menonaktifkan tombol**. Gunakan atribut `disabled` pada kontrol yang mendukungnya. `pointer-events: none` juga tidak setara dengan disabled karena tidak menyelesaikan semua cara aktivasi, termasuk keyboard.

### Posisi di antara saudara

```css
.daftar > li:first-child { font-weight: 700; }
.daftar > li:last-child { border-bottom: 0; }
.daftar > li:nth-child(2n) { background: #eef5f2; }
```

`nth-child` menghitung posisi di antara semua elemen saudara. `nth-of-type` menghitung di antara saudara dengan jenis elemen yang sama. Bedanya terlihat jika induk berisi campuran `h2`, `p`, dan elemen lain.

### Bagian tampilan

```css
.label::before {
  content: "";
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  margin-inline-end: 0.5rem;
  border-radius: 50%;
  background: currentColor;
}

li::marker {
  color: #176b52;
}

::selection {
  background: #c5e7d8;
  color: #172b27;
}
```

`::before` dan `::after` umumnya memerlukan `content` agar kotaknya terbentuk. Gunakan untuk dekorasi; simpan informasi penting, seperti pesan kesalahan atau label wajib, di HTML.

### Selector yang berguna setelah dasar dikuasai

```css
:is(h1, h2, h3) { line-height: 1.2; }
:where(.artikel) a { text-underline-offset: 0.2em; }
.form-field:has(input:focus-visible) { background: #eef5f2; }
```

`:is()` meringkas pilihan selector, `:where()` membuat kelompok dengan specificity nol untuk bagian di dalamnya, dan `:has()` mencocokkan berdasarkan relasi yang ditulis. Pada contoh terakhir, wadah dipilih karena mengandung input yang sedang `:focus-visible`. Periksa dukungan browser target dan gunakan peningkatan bertahap untuk fitur yang belum dapat kamu andalkan di seluruh lingkungan pengguna.

<a id="bab-06"></a>
## 06. Cascade dan specificity: mengapa aturanku kalah?

Jika beberapa deklarasi mengatur property yang sama pada elemen yang sama, browser harus memilih satu nilai. Proses inilah **cascade**.

### Model sederhana untuk kasus sehari-hari

Untuk deklarasi biasa dari stylesheet buatanmu, pada origin, layer, dan kondisi yang setara:

1. Cari selector yang cocok.
2. Bandingkan specificity.
3. Jika sama, deklarasi yang muncul lebih akhir menang.

```html
<p class="pesan">Warna apa yang muncul?</p>
```

```css
p { color: blue; }
.pesan { color: green; }
p { color: red; }
```

Hasilnya **hijau**. `.pesan` lebih spesifik daripada `p`. Posisi terakhir belum cukup untuk membuat merah menang.

### Menghitung specificity tanpa rumus menyesatkan

Gunakan tiga kolom yang dibandingkan **dari kiri ke kanan**: ID; class/atribut/pseudo-class; tipe elemen/pseudo-element.

| Selector | ID | Class, atribut, pseudo-class | Tipe, pseudo-element |
| --- | ---: | ---: | ---: |
| `p` | 0 | 0 | 1 |
| `.pesan` | 0 | 1 | 0 |
| `p.pesan` | 0 | 1 | 1 |
| `.panel .pesan` | 0 | 2 | 0 |
| `#konten p` | 1 | 0 | 1 |

`1,0,0` mengalahkan `0,20,0`; jangan menjumlahkannya menjadi angka desimal seperti 100 dan 200. Banyak class tidak otomatis mengalahkan satu ID. Universal selector dan combinator seperti `>` tidak menambah specificity.

`:where(...)` selalu menyumbang nol. `:is()`, `:not()`, dan `:has()` mengambil specificity dari argumen selector yang paling spesifik; ketiganya tidak sekadar dihitung sebagai satu pseudo-class biasa.

### Cascade sebenarnya lebih luas

Berikut urutan kelompok prioritas secara ringkas, dari rendah ke tinggi, untuk dokumen biasa tanpa rincian Shadow DOM:

| Prioritas naik | Kelompok |
| ---: | --- |
| 1 | Deklarasi normal bawaan browser |
| 2 | Deklarasi normal pengguna |
| 3 | Deklarasi normal pembuat halaman |
| 4 | Nilai dari CSS keyframe animations |
| 5 | Deklarasi `!important` pembuat halaman |
| 6 | Deklarasi `!important` pengguna |
| 7 | Deklarasi `!important` bawaan browser |
| 8 | Nilai yang sedang dihasilkan CSS transitions |

Keberlakuan selector dan kondisi seperti `@media` diperiksa terlebih dahulu. Di dalam kelompok yang relevan, aturan layer dan perlakuan khusus style atribut diperhitungkan sebelum specificity. Jika menggunakan `@scope`, kedekatan scope dapat memecahkan seri setelah specificity dan sebelum urutan kemunculan. Kamu belum perlu menghafal kasus lanjutannya; pahami mengapa “selector paling spesifik selalu menang” bukan aturan universal. Lihat [R01](#r01) dan [R02](#r02).

### Inline style

Inline normal, seperti `style="color: red"`, mengalahkan aturan normal dari stylesheet pembuat halaman. Namun deklarasi author `!important` dapat mengalahkan inline normal. Inline style mempunyai perlakuan tersendiri dalam cascade, jadi tidak perlu dipaksakan masuk ke tabel tiga kolom specificity.

### Layer

```css
@layer dasar, komponen;

@layer dasar {
  #konten .tombol { color: navy; }
}

@layer komponen {
  .tombol { color: green; }
}
```

Untuk deklarasi normal di atas, layer `komponen` menang walaupun selector-nya lebih sederhana. Urutan layer diputuskan sebelum specificity. Deklarasi normal di luar layer mengalahkan deklarasi normal di dalam layer pada origin yang sama. Untuk deklarasi important, urutan layer berbalik. Bahas layer lebih jauh setelah kamu nyaman dengan dasar cascade.

### Menggunakan `!important` dengan sadar

```css
.pesan { color: green !important; }
```

Ini mengubah prioritas deklarasi, bukan menambah specificity. Ada penggunaan yang sah, tetapi jika hampir setiap perbaikan memerlukannya, periksa selector, urutan stylesheet, inline style, atau strategi layer. Menambah `!important` berulang kali biasanya memperpanjang konflik.

**Latihan singkat:** dua aturan `.pesan` memiliki `color` berbeda tanpa layer dan tanpa important. Mengapa yang terakhir menang? Karena baru pada kondisi yang setara urutan kemunculan menentukan hasil.

<a id="bab-07"></a>
## 07. Inheritance: apa yang diwariskan dari induk?

Beberapa property, seperti `color` dan `font-family`, umumnya diwariskan. Property tata letak seperti `margin`, `padding`, `border`, dan `width` umumnya tidak.

```css
body {
  color: #172b27;
  font-family: system-ui, sans-serif;
}

.panel {
  padding: 2rem;
}
```

Paragraf di dalam body dapat memakai warna dan font tersebut. Paragraf di dalam panel tidak otomatis memperoleh `padding: 2rem` hanya karena induknya memiliki padding.

### Deklarasi langsung berbeda dari pewarisan

```css
#area {
  color: red;
}

p {
  color: blue;
}
```

```html
<div id="area"><p>Aku tetap biru.</p></div>
```

Tidak ada pertarungan specificity antara `#area` dan `p` untuk elemen yang sama. `#area` menargetkan induk. Paragraf mempunyai deklarasi langsung `color: blue`, sehingga tidak perlu mewarisi merah.

### Keyword yang perlu dikenali

| Keyword | Arti |
| --- | --- |
| `inherit` | Ambil computed value property itu dari induk |
| `initial` | Gunakan nilai awal property menurut spesifikasi |
| `unset` | Berperilaku seperti `inherit` untuk property inherited; `initial` untuk yang lain |
| `revert` | Mundur ke origin cascade sebelumnya; tidak sekadar mengambil nilai induk |
| `revert-layer` | Mundur dari layer yang sedang berlaku |

Kontrol form dapat memiliki gaya bawaan yang berbeda. Untuk menyamakan font dengan halaman:

```css
button,
input,
select,
textarea {
  font: inherit;
}
```

Custom properties biasa, misalnya `--warna-utama`, mewaris secara default. Pengecualian bisa dibuat melalui registrasi `@property`, yang bukan kebutuhan awal kita.

<a id="bab-08"></a>
## 08. Box model: cara browser menghitung kotak

Satu elemen dapat memiliki content, padding, border, dan margin.

| Bagian | Fungsi | Analogi praktis |
| --- | --- | --- |
| Content | Tempat teks atau media | Isi kartu |
| Padding | Ruang antara isi dan border | Napas di dalam kartu |
| Border | Garis tepi kotak | Pembatas kartu |
| Margin | Jarak terhadap kotak lain | Ruang di luar kartu |

### `content-box`

```css
.kotak {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 2px solid;
  margin: 16px;
}
```

Lebar border box = `300 + 20 + 20 + 2 + 2 = 344px`.

Jika menghitung kedua margin horizontalnya, kebutuhan ruang luar menjadi `344 + 16 + 16 = 376px`. Margin bukan bagian dari nilai `width`.

### `border-box`

```css
.kotak {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 2px solid;
  margin: 16px;
}
```

Sekarang border box tetap `300px`. Lebar isi menjadi `300 - 40 - 4 = 256px`, dan ruang luar termasuk margin horizontal menjadi `332px`.

Pola dasar yang memudahkan perhitungan:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

### Membaca shorthand jarak

| Penulisan | Urutan sisi |
| --- | --- |
| `padding: 16px` | Semua sisi |
| `padding: 16px 24px` | Atas-bawah; kiri-kanan |
| `padding: 8px 16px 24px` | Atas; kiri-kanan; bawah |
| `padding: 8px 16px 24px 32px` | Atas; kanan; bawah; kiri |

Urutan empat nilai mengikuti putaran searah jarum jam mulai dari atas.

### Margin collapse

Dua margin vertikal pada block biasa dapat menyatu. Misalnya margin bawah `h2` sebesar `24px` dan margin atas `p` sebesar `16px` dapat menghasilkan jarak `24px`, bukan `40px`. Detailnya bergantung pada struktur dan formatting context; margin negatif memiliki aturan tersendiri.

Margin anak juga dapat collapse dengan induknya pada kondisi tertentu. Jika margin atas anak pertama terasa “keluar” dari induk, periksa hal ini. Memberi padding atau border yang memang dibutuhkan desain, menggunakan `display: flow-root` sesuai konteks, atau mengelola jarak melalui `gap` pada Flexbox/Grid dapat membantu. Margin antar-flex/grid items tidak mengalami collapse seperti block biasa.

**Bedakan:** `outline` dan `box-shadow` tidak menambah ukuran layout kotak. Keduanya tetap bisa melampaui kotak secara visual. `border` ikut dihitung dalam box model.

**Coba sendiri:** pada contoh `border-box`, ubah padding menjadi `40px`. Lebar luar tetap 300px, tetapi ruang isi menyempit menjadi 216px.

<a id="bab-09"></a>
## 09. Normal flow dan `display`

Sebelum memakai Flexbox atau Grid, pahami susunan bawaan dokumen. Banyak elemen block tersusun dari atas ke bawah; teks dan elemen inline mengalir di dalam baris.

| Nilai display | Perilaku dasar |
| --- | --- |
| `block` | Dalam normal flow, memulai kotak block baru dan umumnya memakai lebar tersedia saat width auto |
| `inline` | Mengalir bersama teks; width/height pada inline non-replaced biasa tidak mengaturnya seperti block |
| `inline-block` | Berada dalam baris, tetapi dapat memiliki width/height seperti kotak |
| `flex` | Membuat flex container; anak langsungnya menjadi flex items |
| `grid` | Membuat grid container; anak langsungnya menjadi grid items |
| `none` | Tidak membentuk kotak layout dan umumnya dikeluarkan dari accessibility tree |

Nilai `display` tidak mengubah makna HTML. Membuat `span` menjadi block tidak menjadikannya heading. Gunakan elemen HTML berdasarkan makna, lalu atur tampilannya dengan CSS.

### Mengapa `width` pada link terasa tidak bekerja?

```css
a.tombol {
  display: inline-block;
  padding: 0.75rem 1rem;
  background: #176b52;
  color: white;
}
```

Link secara umum inline. Dengan `inline-block` atau `inline-flex`, kamu dapat mengelola kotaknya sebagai komponen. Padding pada inline biasa bisa terlihat, tetapi padding vertikalnya tidak memperbesar line box dengan cara yang sama seperti block; hasilnya dapat bertumpang tindih dengan baris lain.

### Menyembunyikan elemen: efeknya berbeda

| Cara | Ruang layout | Aksesibilitas dan interaksi |
| --- | --- | --- |
| `display: none` | Dihilangkan | Umumnya tidak tersedia bagi pembaca layar dan tidak dapat difokuskan |
| `visibility: hidden` | Tetap ada | Umumnya tersembunyi dari pembaca layar dan tidak dapat difokuskan |
| `opacity: 0` | Tetap ada | Dapat tetap terjangkau keyboard, pointer, dan pembaca layar |
| Pola visually hidden | Ruang visual sangat kecil | Dapat mempertahankan teks untuk pembaca layar |

Jangan memakai `opacity: 0` sendirian untuk menyembunyikan kontrol yang seharusnya tidak dapat digunakan. Jangan memakai `display: none` jika maksudmu hanya menyembunyikan label secara visual sambil mempertahankan nama aksesibelnya.

### Float masih berguna, tetapi untuk kebutuhan yang sesuai

`float` berguna ketika teks perlu mengalir mengelilingi gambar. Untuk susunan navigasi, kolom halaman, dan kartu, Flexbox atau Grid lebih mudah dikendalikan. `clear` dan clearfix termasuk pengetahuan yang berguna saat merawat kode lama; bukan fondasi utama layout baru kita.

<a id="bab-10"></a>
## 10. Satuan CSS: kapan memakai `px`, `rem`, `%`, dan lainnya?

| Satuan | Acuan | Penggunaan yang masuk akal |
| --- | --- | --- |
| `px` | CSS pixel, tidak selalu sama dengan satu pixel fisik | Border, detail kecil, ukuran yang perlu presisi |
| `rem` | Font size elemen root (`html`) | Ukuran teks dan skala jarak |
| `em` | Pada font-size: font induk; pada banyak property lain: font elemen itu sendiri | Padding komponen yang mengikuti ukuran teksnya |
| `%` | Bergantung property dan containing block | Lebar yang mengikuti wadah |
| `ch` | Lebar advance karakter `0` pada font yang dipakai | Membatasi panjang baris secara perkiraan |
| `vw` | 1% lebar viewport | Ukuran fluid; gunakan dengan batas |
| `vh` | 1% tinggi viewport menurut definisi unit viewport | Area setinggi layar; perhatikan UI browser ponsel |
| `svh` | 1% tinggi small viewport | Bagian yang perlu muat saat UI browser terlihat |
| `dvh` | 1% tinggi dynamic viewport | Area yang mengikuti perubahan viewport dinamis |
| `fr` | Bagian ruang fleksibel pada grid tracks | Membagi kolom Grid |

### `rem`: hitung dengan asumsi yang jelas

Jika root font size adalah 16px:

- `0.5rem` = 8px.
- `1rem` = 16px.
- `1.5rem` = 24px.
- `2rem` = 32px.

Namun 16px adalah **asumsi perhitungan**, bukan sifat permanen `rem`. Pengguna dan stylesheet dapat memengaruhi font size root.

```css
html { font-size: 100%; }
body { font-size: 1rem; }
```

Biarkan preferensi ukuran dasar pengguna bekerja. Mengubah root menjadi `62.5%` hanya untuk memudahkan hitungan bukan kebutuhan; angka `rem` biasa cukup mudah dihitung dan tidak memaksa kamu mengoreksi ukuran teks di banyak tempat.

### `em`: ukuran komponen mengikuti teks

```css
.tombol {
  font-size: 1rem;
  padding: 0.75em 1.2em;
}

.tombol--besar {
  font-size: 1.25rem;
}
```

Tombol besar memiliki teks dan padding yang ikut membesar. Dengan root 16px, padding vertikal tombol biasa adalah 12px, sedangkan tombol besar 15px.

### Persentase tidak selalu berarti “persentase tinggi/lebar induk” secara sederhana

`width: 50%` biasanya mengikuti lebar containing block. Untuk `height: 100%`, tinggi acuannya perlu dapat ditentukan; sekadar menulisnya tidak menjamin elemen mengisi layar. Persentase pada `padding`, `transform`, dan property lain memiliki aturan acuan masing-masing. Periksa property-nya, bukan hanya satuannya.

### Viewport unit di ponsel

```css
.halaman-penuh {
  min-height: 100vh;  /* fallback */
  min-height: 100svh; /* ruang minimum yang lebih stabil saat UI terlihat */
}
```

Gunakan `100dvh` jika mengikuti perubahan tinggi viewport memang sesuai kebutuhanmu. Perubahan itu dapat membuat layout bergerak saat bilah browser berubah. Gunakan `min-height`, bukan tinggi kaku, jika konten boleh bertambah panjang.

**Kesalahan umum:** `width: 100vw` bisa menimbulkan overflow horizontal pada lingkungan dengan scrollbar yang ikut masuk perhitungan viewport. Untuk blok yang cukup mengikuti wadah, `width: 100%` atau width auto sering lebih tepat.

<a id="bab-11"></a>
## 11. Ukuran fleksibel, batas ukuran, dan overflow

### Pola container yang nyaman

```css
.container {
  width: min(100% - 2rem, 70rem);
  margin-inline: auto;
}
```

Artinya: ambil nilai terkecil antara lebar wadah dikurangi 2rem dan batas 70rem. Di layar sempit ada ruang tepi sekitar 1rem per sisi; di layar lebar konten berhenti melebar.

Alternatif yang mudah dipahami:

```css
.container {
  width: 100%;
  max-width: 70rem;
  margin-inline: auto;
  padding-inline: 1rem;
}
```

Pakai `border-box`. Kedua pola memiliki cara menghitung ruang isi yang sedikit berbeda; pilih satu pola dan gunakan secara konsisten.

### `width`, `min-width`, dan `max-width`

```css
.kartu {
  width: 100%;
  max-width: 28rem;
}
```

Kartu mengikuti lebar tersedia hingga batas 28rem. Tetapi menambahkan `min-width: 30rem` dapat memaksanya terlalu lebar di layar sempit. Batas minimum bisa mengalahkan batas maksimum jika keduanya bertentangan; jangan memberi angka yang saling berlawanan tanpa alasan.

### Mengapa teks panjang mendorong Flexbox/Grid keluar layar?

Flex/grid items memiliki aturan minimum otomatis yang bisa mempertahankan ukuran berdasarkan konten. Beri kesempatan elemen yang tepat untuk menyusut:

```css
.isi-fleksibel {
  min-width: 0;
}

.isi-fleksibel p {
  overflow-wrap: anywhere;
}
```

`min-width: 0` mengizinkan penyusutan; `overflow-wrap` memberi peluang pemenggalan teks yang panjang. Keduanya menyelesaikan masalah yang berbeda. Dalam logical properties, gunakan `min-inline-size: 0`.

### Jangan mengunci tinggi kartu berisi teks

```css
/* Rentan ketika teks bertambah atau pengguna memperbesar font. */
.kartu { height: 200px; }

/* Memberi ruang minimum, tetapi tetap bisa bertambah. */
.kartu { min-height: 200px; }
```

Grid dan Flexbox juga dapat membuat kartu sejajar tanpa menyamakan tinggi kaku.

### Menangani overflow sesuai penyebab

| Nilai | Efek |
| --- | --- |
| `visible` | Konten boleh tampak di luar kotak |
| `hidden` | Konten dipotong; scroll container dapat terbentuk walau tanpa scrollbar |
| `clip` | Konten dipotong tanpa membentuk scroll container seperti hidden |
| `auto` | Scrollbar disediakan jika diperlukan |
| `scroll` | Area scroll disediakan; tampilan scrollbar bergantung sistem |

Jangan langsung menambahkan `overflow-x: hidden` pada body untuk menghilangkan scrollbar yang tidak diinginkan. Temukan elemen penyebabnya; menyembunyikan gejala dapat memotong konten dan indikator fokus.

### Logical properties

Pada tulisan horizontal seperti bahasa Indonesia:

| Logical property | Padanan yang sering kamu lihat |
| --- | --- |
| `inline-size` | `width` |
| `block-size` | `height` |
| `margin-inline` | Margin kiri dan kanan |
| `padding-block` | Padding atas dan bawah |
| `inset-inline-end` | Sisi kanan pada arah LTR |

Istilah inline/block mengikuti arah penulisan, sehingga komponen lebih mudah menyesuaikan bahasa dan writing mode lain. Kamu boleh memulai dari width/height, lalu membiasakan logical properties secara bertahap.

<a id="bab-12"></a>
## 12. Jarak dan whitespace: dasar tampilan yang rapi

Web yang terasa penuh sering mempunyai masalah jarak, bukan kekurangan dekorasi. Whitespace membantu mata mengenali kelompok informasi.

### Gunakan skala, bukan angka acak untuk setiap elemen

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
}
```

Ini titik awal desain, bukan hukum CSS. Pilih skala yang cocok dengan kepadatan kontenmu.

### Kapan memakai padding, margin, dan gap?

| Kebutuhan | Pilihan yang lazim |
| --- | --- |
| Teks jangan menempel ke tepi kartu | `padding` pada kartu |
| Jarak kartu satu dengan lainnya | `gap` pada grid/flex container |
| Jarak bagian halaman dengan bagian lain | Padding section atau margin yang terencana |
| Jarak antarelemen dalam artikel | Margin block atau pola stack |

```css
.daftar-kartu {
  display: grid;
  gap: var(--space-5);
}

.kartu {
  padding: var(--space-5);
}
```

Gap menciptakan jarak **antaritem**, tanpa otomatis menambah ruang di tepi luar container. Karena itu container tetap dapat memerlukan padding.

### Pola stack

```css
.stack > * + * {
  margin-block-start: 1rem;
}
```

Pilih setiap anak langsung yang memiliki saudara sebelumnya, lalu beri jarak di atasnya. Anak pertama tidak mendapatkan jarak tambahan. Pola ini enak untuk alur judul → paragraf → tombol. Jika elemen masih memiliki margin bawaan lain, perhitungkan atau reset margin tersebut agar hasilnya konsisten.

### Prinsip kedekatan

Jarak antara judul kartu dan deskripsinya sebaiknya lebih kecil daripada jarak antara kartu tersebut dan kartu berikutnya. Pengguna lalu dapat membaca kelompok informasi tanpa perlu garis pemisah berlebihan.

**Coba sendiri:** ubah gap daftar dari 1rem ke 2rem tanpa mengubah padding kartu. Jelaskan mengapa ruang di dalam kartu tidak ikut bertambah.

<a id="bab-13"></a>
## 13. Tipografi: desain yang bagus harus mudah dibaca

Mulai dari font yang jelas, ukuran yang nyaman, panjang baris yang terkendali, dan hierarki judul. Kamu tidak memerlukan banyak font agar halaman menarik.

```css
body {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.65;
}

h1, h2, h3 {
  line-height: 1.2;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.25rem; }

.artikel {
  max-inline-size: 65ch;
}
```

Ukuran tersebut merupakan titik awal untuk konten contoh. Ukuran yang tepat bergantung pada font, bahasa, panjang teks, dan konteks penggunaan.

### Mengapa line-height sebaiknya tanpa satuan?

`line-height: 1.65` adalah faktor pengali. Ketika diwariskan, faktor tersebut dapat digunakan bersama font size anak. Sebaliknya, nilai panjang seperti `26px` dapat diwariskan sebagai panjang yang sama meskipun teks anak jauh lebih besar.

### Panjang baris

Paragraf selebar seluruh layar desktop membuat mata sulit kembali ke awal baris berikutnya. Kisaran sekitar 60–75 karakter per baris sering menjadi titik awal yang nyaman untuk artikel; itu pedoman desain, bukan batas universal. `65ch` adalah perkiraan berdasarkan lebar karakter `0`, sehingga tidak menjamin tepat 65 karakter nyata.

### Hierarki visual dan hierarki semantik

- `h1` menjelaskan topik utama halaman.
- `h2` membagi topik menjadi bagian.
- `h3` menjelaskan subbagian di bawahnya.

Ukuran dapat diubah dengan CSS tanpa mengganti level heading demi tampilannya. Jangan memakai `h1` hanya karena kamu ingin teks besar.

### Detail yang sering membantu

```css
.judul-besar {
  letter-spacing: -0.025em;
}

.label-kecil {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.artikel a {
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}
```

Gunakan letter-spacing secara hati-hati; nilai negatif pada teks kecil bisa merusak keterbacaan. Huruf kapital panjang juga lebih sulit dipindai sebagai paragraf.

Hindari `text-align: justify` sebagai kebiasaan otomatis pada kolom sempit karena celah antarkata bisa tidak merata. Jangan memangkas informasi penting dengan ellipsis hanya agar tinggi komponen terlihat seragam.

### Font eksternal

Jika memakai webfont, sediakan fallback dan pertimbangkan `font-display: swap` dalam `@font-face`. Font fallback dan font akhir dapat memiliki ukuran glyph berbeda; perubahan ini dapat menggeser layout. Gunakan beberapa weight yang diperlukan saja, bukan seluruh variasi tanpa alasan.

**Pertanyaan pemahaman:** mengapa font yang indah belum menjamin web nyaman dibaca? Karena ukuran, kontras, panjang baris, jarak, dan struktur informasi ikut menentukan pengalaman membaca.

<a id="bab-14"></a>
## 14. Warna, background, border, dan bayangan

### Bentuk penulisan warna

```css
.contoh {
  color: #172b27;
  background-color: rgb(242 246 245);
  border-color: hsl(155 18% 78%);
  box-shadow: 0 12px 32px rgb(23 43 39 / 0.1);
}
```

Hex, RGB, dan HSL dapat menggambarkan warna. HSL memudahkan percobaan hue, saturation, dan lightness, tetapi lightness HSL bukan jaminan kontras perseptual yang seragam. Ukur kontras foreground-background, jangan menilainya dari angka lightness saja.

### Buat palet berdasarkan peran

```css
:root {
  --color-background: #ffffff;
  --color-surface: #f2f6f5;
  --color-text: #172b27;
  --color-muted: #4a625b;
  --color-primary: #176b52;
  --color-border: #c6d5cf;
}
```

Nama `--color-primary` menjelaskan peran. Ketika warna utama berubah, nama itu masih masuk akal. Nama `--hijau` lebih cocok jika kamu memang menyimpan warna mentah yang kemudian dipetakan ke peran.

### Gradient

```css
.hero {
  background: linear-gradient(135deg, #edf7f1, #f7faf8);
}
```

Gradient ringan dapat memberi kedalaman. Pastikan teks tetap kontras di seluruh daerah latarnya, terutama jika ada gambar atau gradient yang berubah dari terang ke gelap.

### Background image dan gambar konten

Gunakan background image untuk dekorasi. Jika gambar menyampaikan informasi, gunakan elemen `img` dengan alternatif teks yang tepat. CSS background tidak menyediakan `alt`.

### `opacity` berbeda dari alpha warna

```css
/* Seluruh panel, termasuk teks dan anaknya, menjadi transparan. */
.panel { opacity: 0.5; }

/* Hanya warna latarnya yang setengah transparan. */
.panel { background-color: rgb(255 255 255 / 0.5); }
```

Jika teks ikut memudar, periksa apakah opacity diterapkan pada induknya.

### Border dan shadow: pilih sesuai fungsi

- Border tipis membantu membedakan permukaan yang warnanya mirip.
- Shadow dapat memberi kesan terangkat, misalnya pada popover atau kartu tertentu.
- Radius yang konsisten membuat komponen terasa berasal dari sistem yang sama.

Jangan otomatis menambahkan shadow besar pada semua komponen. Jika semua elemen tampak paling menonjol, hierarki visual justru hilang.

### Tema gelap dengan token

```css
:root {
  color-scheme: light;
  --bg: #ffffff;
  --text: #172b27;
  --surface: #f2f6f5;
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --bg: #101b18;
    --text: #edf6f1;
    --surface: #192a24;
  }
}

body {
  background: var(--bg);
  color: var(--text);
}
```

Ini kerangka awal, bukan tema lengkap. Komponen lain perlu memakai token yang sesuai. `color-scheme` membantu browser memilih tampilan bawaan kontrol, tetapi tidak otomatis mengganti semua warna buatanmu. Uji ulang kontras, gambar, link, dan state fokus.

<a id="bab-15"></a>
## 15. Cara mendesain web agar menarik dan terasa profesional

Tampilan menarik biasanya berasal dari keputusan kecil yang konsisten: fokus halaman jelas, jarak teratur, teks nyaman dibaca, dan komponen mempunyai peran yang terlihat.

### Mulai dari tujuan halaman

Sebelum memilih warna, jawab: pengguna datang untuk apa? Membaca artikel, melihat portofolio, membeli produk, atau mendaftar kegiatan? Pilihan tata letak mengikuti prioritas tersebut.

Untuk halaman materi belajar, urutan yang masuk akal bisa berupa: judul yang menjelaskan manfaat → ringkasan → tindakan utama → daftar materi → cara belajar → pertanyaan umum.

### Prinsip yang bisa langsung kamu pakai

| Prinsip | Tindakan konkret |
| --- | --- |
| Hierarki | Bedakan judul, isi, dan informasi tambahan melalui ukuran, weight, dan jarak |
| Alignment | Sejajarkan tepi judul, paragraf, dan daftar pada garis yang konsisten |
| Proximity | Dekatkan informasi yang saling berkaitan |
| Repetition | Gunakan pola kartu, radius, dan gaya tombol yang berulang |
| Contrast | Buat tindakan penting terlihat jelas dan teks mudah dibaca |
| Whitespace | Sisakan ruang agar kelompok informasi dapat dikenali |
| Restraint | Batasi aksen, font, dan dekorasi sesuai tujuan halaman |

### Contoh: memperbaiki kartu yang terasa penuh

HTML yang digunakan:

```html
<article class="feature-card">
  <p class="feature-card__label">MATERI DASAR</p>
  <h2>Memahami CSS</h2>
  <p>Belajar memilih elemen, mengatur jarak, dan menyusun tata letak.</p>
  <a href="#materi-css">Lihat materi CSS</a>
</article>
```

Versi awal yang perlu diperbaiki:

```css
.feature-card {
  padding: 5px;
  background: #00ff00;
  color: red;
  border: 5px solid blue;
}
```

Masalahnya bukan karena warna tertentu “dilarang”. Warna teks dan latar perlu diuji kontrasnya; border sangat dominan; ruang dalam terlalu kecil; semua bagian berebut perhatian.

Versi yang lebih terkendali:

```css
.feature-card {
  max-inline-size: 28rem;
  padding: 1.5rem;
  border: 1px solid #c6d5cf;
  border-radius: 1rem;
  background: #ffffff;
  color: #172b27;
}

.feature-card > * {
  margin: 0;
}

.feature-card > * + * {
  margin-block-start: 1rem;
}

.feature-card__label {
  color: #176b52;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.feature-card h2 {
  font-size: 1.6rem;
  line-height: 1.2;
}

.feature-card a {
  display: inline-block;
  padding-block: 0.5rem;
  color: #176b52;
  font-weight: 700;
}
```

Sekarang isi mempunyai ruang, judul menonjol, label menjadi informasi pendukung, dan link mudah dikenali.

### Urutan mempercantik yang efisien

1. Rapikan isi dan urutan informasi.
2. Batasi lebar konten dan atur susunan utama.
3. Tetapkan skala jarak dan tipografi.
4. Pilih warna permukaan, teks, dan aksen.
5. Tambahkan border, radius, dan shadow seperlunya.
6. Buat state hover/focus/error yang sesuai.
7. Uji saat layar sempit, teks panjang, dan zoom meningkat.

### Kebiasaan yang membuat hasil lebih matang

- Gunakan satu tindakan utama yang jelas pada satu area; tindakan kedua bisa lebih tenang.
- Gunakan gambar dengan proporsi dan gaya yang konsisten.
- Hindari semua teks rata tengah. Paragraf panjang umumnya lebih mudah dipindai dengan rata awal.
- Pakai teks yang cukup realistis sejak awal. “Lorem ipsum” pendek dapat menyembunyikan masalah layout.
- Lihat halaman pada ukuran nyata, bukan hanya saat editor desain diperbesar.
- Ambil inspirasi berupa prinsip, seperti pengelompokan atau ritme jarak, lalu buat keputusan sesuai kontenmu.

**Latihan desain:** buat satu kartu dengan HTML yang sama dalam tiga tema: akademik, toko kopi, dan portofolio. Ubah warna, tipografi, dan ritme jarak. Jelaskan kesan yang dihasilkan setiap keputusan.

<a id="bab-16"></a>
## 16. Flexbox: mengatur hubungan item pada satu sumbu utama

Flexbox cocok ketika hubungan utamanya berupa **barisan atau kolom**: navigasi, deretan tombol, label dengan ikon, atau isi vertikal sebuah kartu. Flexbox bisa membungkus menjadi beberapa baris, tetapi setiap baris mengelola ruangnya sendiri.

### Mulai dari induknya

```html
<div class="baris">
  <div>Satu</div>
  <div>Dua</div>
  <div>Tiga</div>
</div>
```

```css
.baris {
  display: flex;
  gap: 1rem;
}
```

Anak langsung `.baris` menjadi flex items. Jika salah satunya memiliki paragraf di dalamnya, paragraf tersebut tidak otomatis menjadi flex item dari `.baris`.

### Sumbu utama dan sumbu silang

Dengan writing mode horizontal:

| `flex-direction` | Main axis | Cross axis | `justify-content` bekerja pada | `align-items` bekerja pada |
| --- | --- | --- | --- | --- |
| `row` | Mendatar | Vertikal | Mendatar | Vertikal |
| `column` | Vertikal | Mendatar | Vertikal | Mendatar |

Jadi, jangan menghafal “justify selalu horizontal”. Arah sumbunya mengikuti `flex-direction` dan writing mode.

```css
.baris {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

`space-between` membagi ruang kosong di antara item; `gap` tetap memberikan jarak minimum yang terencana. Jika tidak ada ruang kosong pada main axis, perubahan justify-content bisa tidak terlihat.

### Nilai yang sering dipakai

| Property | Contoh nilai | Tujuan |
| --- | --- | --- |
| `flex-direction` | `row`, `column` | Menentukan main axis |
| `flex-wrap` | `nowrap`, `wrap` | Mengizinkan baris baru |
| `justify-content` | `flex-start`, `center`, `space-between` | Distribusi/alignment pada main axis |
| `align-items` | `stretch`, `center`, `flex-start` | Alignment item pada cross axis |
| `align-self` | `auto`, `center`, `flex-end` | Mengubah alignment satu item |
| `align-content` | `start`, `center`, `space-between` | Mengatur kumpulan flex lines saat ada ruang silang |
| `gap` | `1rem`, `1rem 2rem` | Jarak antaritem/baris |

`align-content` baru berguna dalam konteks multi-line dengan ruang silang yang bisa dibagi. Menggunakannya pada satu baris biasanya tidak memberi hasil yang kamu cari. `justify-self` bukan alat untuk menempatkan satu flex item pada main axis; gunakan auto margin atau pola layout lain.

### `flex-grow`, `flex-shrink`, dan `flex-basis`

```css
.item {
  flex: 1 1 12rem;
}
```

Urutannya: grow, shrink, basis.

- Grow 1: item boleh menerima bagian ruang positif.
- Shrink 1: item boleh menyusut saat ruang kurang, tetap tunduk pada batas minimumnya.
- Basis 12rem: ukuran awal pada main axis sebelum proses distribusi ruang.

**Contoh hitungan sederhana:** wadah 700px, tiga item dengan basis 200px, serta dua gap 20px. Sisa ruang positif adalah `700 - 600 - 40 = 60px`. Jika ketiga grow sama-sama 1 dan tidak ada batas lain, masing-masing menerima 20px: ukuran akhirnya 220px.

Ketika ruang negatif, shrink bukan sekadar membagi kekurangan dengan rasio shrink saja. Basis item juga memengaruhi faktor penyusutannya. Untuk tahap awal, ingat bahwa ukuran akhir dipengaruhi basis, ruang tersedia, gap, isi, padding, dan batas minimum/maksimum.

### Pola kolom sama lebar

```css
.kolom {
  display: flex;
  gap: 1rem;
}

.kolom > * {
  flex: 1 1 0;
  min-width: 0;
}
```

Basis nol membuat ruang dibagikan dari acuan yang sama. Padding, border, atau batas minimum yang berbeda masih dapat memengaruhi ukuran luar. `flex: 1` sering digunakan sebagai singkatan; penulisan tiga nilai di atas membuat maksud kita lebih eksplisit.

### Pola navigasi yang membungkus

```css
.navigasi {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.5rem;
}
```

Jika item tidak muat, item berikutnya dapat pindah baris. Ini sering cukup untuk navigasi pendek tanpa harus menyembunyikannya di ponsel.

### Mendorong satu item ke ujung

```css
.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.toolbar__akun {
  margin-inline-start: auto;
}
```

Auto margin mengambil ruang kosong sehingga bagian akun terdorong ke ujung arah inline.

### Menjaga ikon tetap utuh

```css
.ringkasan {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.ringkasan__ikon {
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
}

.ringkasan__teks {
  min-width: 0;
}
```

Ikon tidak dipaksa menyusut; teks yang diberi ruang untuk beradaptasi.

### Kapan Flexbox tidak cukup nyaman?

Jika kamu ingin kolom baris kedua sejajar tepat dengan kolom baris pertama, Grid biasanya lebih sesuai. Flexbox wrapping mengelola distribusi ruang per baris, sehingga jumlah/lebar item pada baris terakhir dapat berbeda.

**Coba sendiri:** ubah `flex-direction: row` menjadi `column`, lalu pertahankan justify-content dan align-items. Jelaskan mengapa efek keduanya ikut berubah.

<a id="bab-17"></a>
## 17. CSS Grid: mengatur baris dan kolom bersama-sama

Grid cocok untuk galeri, daftar kartu, dashboard, serta struktur halaman yang membutuhkan hubungan antarbaris dan antarkolom.

### Tiga kolom

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}
```

`repeat(3, ...)` mengulang definisi track tiga kali. `fr` membagi ruang fleksibel. `minmax(0, 1fr)` mengizinkan track mengecil di bawah ukuran minimum berbasis konten yang bisa menjadi batas pada `1fr` biasa.

Jika lebar area grid 1000px dan kedua gap masing-masing 20px, ruang untuk tiga kolom adalah `1000 - 40 = 960px`, sehingga masing-masing 320px, dengan asumsi tidak ada batas lain yang mengubah perhitungan.

### Track, line, dan cell

- Track: satu kolom atau satu baris.
- Line: garis batas antartrack.
- Cell: pertemuan satu baris dan satu kolom.
- Grid area: wilayah persegi panjang yang dapat mencakup beberapa cell.

```css
.kartu-utama {
  grid-column: 1 / 3;
}
```

Item membentang dari garis kolom 1 sampai garis 3: dua kolom, bukan tiga. Penulisan `grid-column: span 2` berarti membentang dua track dari penempatan yang ditentukan algoritma atau aturan lain.

### Kolom otomatis berdasarkan ruang

```css
.daftar-kartu {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1.5rem;
}
```

Baca dari dalam ke luar:

1. `min(100%, 16rem)`: lebar minimum yang diinginkan 16rem, tetapi tidak melebihi lebar area yang tersedia.
2. `minmax(..., 1fr)`: kolom dapat tumbuh untuk berbagi ruang.
3. `auto-fit`: buat jumlah kolom yang muat, lalu runtuhkan track kosong yang sesuai agar item yang ada dapat memanfaatkan ruangnya.

Mengapa tidak selalu `minmax(16rem, 1fr)`? Karena wadah yang lebih sempit dari 16rem dapat meluber. Pola `min(100%, ...)` mengatasi batas minimum itu; konten di dalamnya tetap perlu bisa membungkus atau menyusut.

### `auto-fit` dan `auto-fill`

| Pilihan | Saat ruang cukup untuk track yang belum terisi |
| --- | --- |
| `auto-fill` | Mempertahankan track kosong |
| `auto-fit` | Meruntuhkan track kosong yang relevan sehingga track terisi bisa melebar |

Perbedaannya paling mudah terlihat ketika item lebih sedikit daripada jumlah kolom yang mungkin muat. Dengan cukup banyak item, keduanya sering tampak sama.

### Satu, dua, lalu tiga kolom secara eksplisit

```css
.daftar {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}

@media (min-width: 40rem) {
  .daftar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 64rem) {
  .daftar { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

Pakai pendekatan ini ketika jumlah kolom merupakan keputusan desain yang jelas. Pakai auto-fit ketika jumlah kolom sebaiknya mengikuti kapasitas wadah secara otomatis. Keduanya valid; pilih berdasarkan hubungan yang ingin kamu atur.

### Grid template areas

```css
.halaman {
  display: grid;
  gap: 1.5rem;
  grid-template-areas:
    "header"
    "main"
    "aside"
    "footer";
}

.kepala { grid-area: header; }
.utama { grid-area: main; }
.samping { grid-area: aside; }
.kaki { grid-area: footer; }

@media (min-width: 60rem) {
  .halaman {
    grid-template-columns: minmax(0, 1fr) 18rem;
    grid-template-areas:
      "header header"
      "main aside"
      "footer footer";
  }
}
```

Setiap named area harus membentuk persegi panjang. Susun HTML dalam urutan baca yang masuk akal sejak awal; jangan mengubah urutan visual sampai membingungkan pengguna keyboard atau pembaca layar.

### Tombol kartu sejajar tanpa height kaku

```css
.daftar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1.5rem;
}

.kartu {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.kartu__aksi {
  margin-block-start: auto;
  padding-block-start: 1rem;
}
```

Grid mengatur kartu sebagai kelompok, Flexbox mengatur isi setiap kartu. Dalam satu grid row, item default dapat meregang setinggi item tertinggi; auto margin mendorong aksi ke bawah. Baris berbeda tetap bisa memiliki tinggi berbeda.

### Flexbox atau Grid?

| Kebutuhan | Mulai dari |
| --- | --- |
| Ikon dan label | Flexbox |
| Navigasi yang membungkus | Flexbox |
| Deretan tombol | Flexbox |
| Galeri dengan kolom yang selaras | Grid |
| Main content dan sidebar dengan struktur area | Grid |
| Isi kartu dari atas ke bawah | Flexbox atau Grid, sesuai hubungan isinya |
| Memusatkan satu item | Keduanya dapat melakukannya |

Pertanyaan yang membantu: **apakah aku mengatur aliran item pada satu sumbu, atau hubungan track pada dua sumbu?** Jawabannya lebih berguna daripada aturan “Flexbox untuk kecil, Grid untuk besar”.

<a id="bab-18"></a>
## 18. Position, containing block, dan z-index

### Lima nilai position yang sering muncul

| Nilai | Hubungan dengan alur dokumen | Kegunaan |
| --- | --- | --- |
| `static` | Mengikuti alur normal | Kebanyakan elemen |
| `relative` | Ruang semula tetap dipertahankan meskipun tampak bergeser | Acuan badge absolute; penyesuaian visual terbatas |
| `absolute` | Keluar dari normal flow | Badge, dekorasi, overlay dalam komponen |
| `fixed` | Keluar dari flow; biasanya terkait viewport | Kontrol yang tetap terlihat saat scroll |
| `sticky` | Tetap memiliki tempat dalam flow, kemudian tertahan sesuai scroll dan batasnya | Judul/sidebar yang melekat sementara |

### Badge di sudut kartu

```html
<article class="produk">
  <span class="produk__badge">Baru</span>
  <h2>Keyboard mekanis</h2>
  <p>Contoh penempatan badge di dalam kartu.</p>
</article>
```

```css
.produk {
  position: relative;
  padding: 3.5rem 1.5rem 1.5rem;
}

.produk__badge {
  position: absolute;
  inset-block-start: 1rem;
  inset-inline-end: 1rem;
}
```

Relative pada produk menyediakan containing block bagi badge. Karena badge keluar dari flow, padding atas kartu tetap disediakan agar badge dan judul tidak bertabrakan.

“Absolute selalu relatif terhadap parent” kurang tepat. Ia mencari containing block yang sesuai; ancestor positioned yang paling dekat adalah kasus umum, tetapi transform, containment, dan property tertentu juga dapat membentuk containing block. Jika tidak ada yang sesuai, acuannya bisa initial containing block.

Fixed juga tidak selalu relatif terhadap viewport: ancestor dengan transform tertentu, misalnya, dapat mengubah containing block-nya.

### Sticky yang masuk akal

```css
.sidebar {
  position: sticky;
  top: 1rem;
  align-self: start;
}
```

Jika sticky tidak bekerja, periksa:

1. Apakah ada inset seperti `top` atau `inset-block-start`?
2. Scroll container mana yang menjadi acuan? Ancestor `overflow: auto/hidden` dapat mengubah konteksnya.
3. Apakah ada ruang cukup untuk bergerak di dalam batas containing block?
4. Apakah sidebar terlalu tinggi atau meregang setinggi area grid/flex?

Hindari header lengket yang sangat tinggi pada layar kecil atau zoom besar karena bisa menutupi sebagian besar ruang baca.

### Mengapa `z-index: 999999` kadang tetap kalah?

`z-index` tidak bekerja sebagai satu daftar angka global. Elemen dapat berada di **stacking context** berbeda. Stacking context anak dibandingkan sebagai bagian dari kelompok induknya.

```css
.panel-a { position: relative; z-index: 1; }
.panel-b { position: relative; z-index: 2; }
.panel-a .tooltip { position: absolute; z-index: 9999; }
```

Jika kedua panel berada pada stacking context induk yang sama dan bertumpuk, tooltip di panel A tidak otomatis melompati panel B. Ia tetap bagian dari stacking context A.

Stacking context dapat dibentuk oleh berbagai kondisi: positioned element dengan z-index non-auto, opacity kurang dari 1, transform non-none, isolation, dan lainnya. `z-index` juga dapat berlaku pada flex/grid items tanpa harus menambahkan position relative. Untuk dialog/popover tertentu, top layer mempunyai mekanisme tersendiri; jangan menyamakannya dengan z-index biasa.

### Prinsip penggunaan

Gunakan normal flow, Flexbox, dan Grid untuk struktur utama. Gunakan position saat memang ada hubungan menumpuk atau melekat. Jika setiap paragraf harus diberi `top` dan `left` manual, layout akan rapuh saat teks bertambah panjang.

<a id="bab-19"></a>
## 19. Pola pikir CSS responsif

Web responsif dapat menyesuaikan presentasinya dengan ruang dan kondisi penggunaan, sambil mempertahankan isi dan fungsi yang dibutuhkan.

Tiga kolom yang sekadar diperkecil sampai tulisannya nyaris tidak terbaca belum menjadi solusi responsif yang baik. Kadang susunannya perlu diubah, jaraknya dikurangi, atau navigasinya dibuat membungkus.

### Bedakan layar fisik dan viewport

Viewport adalah area tempat halaman ditampilkan. Laptop dengan layar besar bisa memiliki jendela browser yang sempit. Zoom, split screen, dan sidebar browser juga bisa mengubah ruang yang tersedia.

Media query `width` mendeteksi lebar viewport dalam CSS pixels, bukan langsung resolusi fisik panel layar. Karena itu jangan menentukan layout hanya dari label “ponsel”, “tablet”, dan “desktop”.

### Tiga fondasi awal

1. **Layout fleksibel:** container mempunyai batas yang masuk akal, track/item dapat menyesuaikan ruang.
2. **Media fleksibel:** gambar dan video tidak memaksa wadah melebar.
3. **Perubahan terencana:** media/container query dipakai ketika komposisi perlu berubah.

### Meta viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Ini membantu browser ponsel menggunakan viewport yang sesuai dengan lebar perangkat. Tanpanya, browser mobile dapat memakai layout viewport yang lebih lebar dan memperkecil seluruh halaman. Jangan tambahkan `user-scalable=no` atau pembatas zoom yang menghalangi pengguna memperbesar konten.

### Mobile-first sebagai strategi menulis

Tuliskan dasar yang muat pada ruang sempit, lalu tambahkan peningkatan ketika ruang mencukupi.

```css
.hero {
  display: grid;
  gap: 2rem;
}

@media (min-width: 60rem) {
  .hero {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}
```

Pada dasar: satu kolom, mengikuti auto-placement. Pada viewport lebar: dua kolom. Tidak perlu membuat versi HTML terpisah untuk setiap perangkat.

Mobile-first bukan berarti pengguna desktop kurang penting. Ini cara memulai dari batas ruang yang lebih ketat dan menambahkan susunan yang lebih luas saat tersedia ruang.

### Memilih breakpoint berdasarkan konten

1. Tampilkan halaman dari ukuran sempit.
2. Lebarkan secara perlahan.
3. Temukan saat dua bagian mulai cukup nyaman berdampingan.
4. Tambahkan breakpoint di sekitar kebutuhan itu.
5. Uji lagi di ukuran sebelum, tepat pada, dan sesudah breakpoint.

Angka 40rem dan 60rem pada panduan adalah keputusan untuk contoh, bukan angka wajib seluruh website. Dengan ukuran awal font 16px, keduanya setara sekitar 640px dan 960px untuk perhitungan media query. Aturan font-relative units dalam media query memakai **initial font size** browser, bukan perubahan `html { font-size: ... }` di stylesheet halaman.

**Pertanyaan kunci:** “Pada lebar berapa kontenku mulai sulit digunakan?” Jawaban itu menjadi dasar breakpoint yang lebih berguna daripada sekadar mengikuti nama perangkat.

<a id="bab-20"></a>
## 20. Media query dari dasar sampai pengujian

### Bentuk dasar

```css
@media (min-width: 48rem) {
  .layout {
    display: grid;
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}
```

Aturan di dalamnya berlaku ketika kondisi benar. `min-width` bersifat inklusif: pada batasnya sendiri aturan sudah berlaku. Media query tidak menambah specificity selector di dalamnya.

### `min-width`, `max-width`, dan range

```css
/* 48rem dan lebih lebar. */
@media (min-width: 48rem) { .menu { gap: 2rem; } }

/* 30rem dan lebih sempit. */
@media (max-width: 30rem) { .judul { font-size: 2rem; } }

/* Range syntax: batas atas tidak termasuk. */
@media (48rem <= width < 64rem) {
  .ringkasan { padding: 1.5rem; }
}
```

Range syntax mengekspresikan batas dengan jelas. Untuk target browser yang lebih lama, periksa kompatibilitas atau gunakan bentuk min/max yang sesuai. Jangan menambahkan variasi hanya karena ingin banyak breakpoint.

### Menggabungkan kondisi

```css
/* AND: kedua kondisi harus benar. */
@media (min-width: 48rem) and (orientation: landscape) {
  .panel { padding: 2rem; }
}

/* Koma: salah satu kondisi cukup. */
@media (max-width: 30rem), (prefers-reduced-motion: reduce) {
  .dekorasi-bergerak { animation: none; }
}
```

`orientation` membandingkan bentuk viewport, bukan memastikan perangkat sedang dipegang dengan posisi fisik tertentu.

### Fitur interaksi

```css
@media (hover: hover) and (pointer: fine) {
  .kartu:hover {
    transform: translateY(-2px);
  }
}
```

Kondisi ini menjelaskan kemampuan input utama, bukan nama perangkat. Perangkat dapat mempunyai beberapa jenis input, seperti layar sentuh sekaligus mouse. Efek hover boleh memperkaya tampilan, tetapi akses ke informasi dan fungsi harus tetap ada tanpa hover.

### Urutan media query tetap penting

```css
.judul { font-size: 2rem; }

@media (min-width: 40rem) {
  .judul { font-size: 2.5rem; }
}

@media (min-width: 60rem) {
  .judul { font-size: 3rem; }
}
```

Di viewport 70rem, kedua media query benar. Karena selector dan tingkat cascade-nya setara, deklarasi yang lebih akhir menang: 3rem. Browser tidak otomatis menganggap breakpoint lebih besar selalu lebih kuat.

### Matriks uji

| Kondisi | Yang diperiksa |
| --- | --- |
| Sekitar 320 CSS px | Tidak ada kehilangan isi dan scroll horizontal seluruh halaman yang tidak perlu |
| 375–430px | Navigasi, tombol, dan judul tetap nyaman |
| Sekitar breakpoint | Tidak ada satu rentang sempit yang membuat layout pecah |
| 768px, 1024px | Kolom dan ruang antarbagian masuk akal |
| 1440px atau lebih | Baris teks tidak terlalu panjang; konten tidak terlalu meregang |
| Teks 200% | Isi dan fungsi tetap tersedia; tidak terpotong oleh tinggi kaku |
| Reflow setara 320 CSS px | Konten biasa dapat dibaca dengan alur utama satu arah |
| Keyboard | Fokus mengikuti urutan yang masuk akal dan tetap terlihat |

Ini titik sampel, bukan bukti semua ukuran sudah benar. Tarik ukuran viewport secara kontinu di antara titik-titik tersebut. Untuk reflow, tabel atau konten dua dimensi yang benar-benar memerlukannya mempunyai ketentuan tersendiri; tempatkan scroll lokal dengan sengaja. Lihat [R15](#r15) dan [R19](#r19).

<a id="bab-21"></a>
## 21. Fluid layout: `calc()`, `min()`, `max()`, dan `clamp()`

### `calc()` untuk hubungan aritmetika

```css
.container {
  width: calc(100% - 2rem);
}
```

Lebarnya mengikuti wadah dikurangi total 2rem. Untuk operator `+` dan `-`, tuliskan spasi di sekeliling operator. Kamu dapat menggabungkan satuan ketika property dan fungsi tersebut mengizinkannya.

### `min()` dan `max()`

```css
.artikel {
  width: min(100% - 2rem, 65ch);
  margin-inline: auto;
}

.bagian {
  padding-block: max(2rem, 4vw);
}
```

`min` memilih nilai terkecil; `max` memilih terbesar. Contoh pertama memberi batas lebar artikel, contoh kedua menjamin padding minimal tertentu sambil membiarkannya tumbuh. Jika kamu juga membutuhkan batas atas untuk padding, pakai clamp.

### `clamp(minimum, preferred, maximum)`

```css
.judul {
  font-size: clamp(2rem, 1.25rem + 3vw, 3.5rem);
}

.section {
  padding-block: clamp(3rem, 2rem + 3vw, 6rem);
}
```

Pada judul, nilai pilihan mengikuti lebar viewport, tetapi hasilnya dibatasi antara 2rem dan 3.5rem.

Dengan asumsi root 16px:

| Lebar viewport | Nilai pilihan `20px + 3vw` | Hasil setelah batas 32–56px |
| ---: | ---: | ---: |
| 320px | 29.6px | 32px |
| 800px | 44px | 44px |
| 1440px | 63.2px | 56px |

### Mengapa tidak memakai `font-size: 5vw` saja?

Di layar sangat sempit teks dapat terlalu kecil; di layar sangat lebar dapat terlalu besar. Komponen berbasis viewport juga dapat merespons pembesaran secara tidak sesuai harapan.

Kombinasi rem dan vw memberi batas dan hubungan yang lebih terencana, tetapi **tidak otomatis menjamin** pembesaran teks memenuhi kebutuhan pengguna. Uji dengan zoom dan text resize. Batas clamp dapat membuat pembesaran efektif lebih kecil dari yang diharapkan di rentang tertentu.

Jika kamu belum mampu mengevaluasi hasilnya, gunakan font-size berbasis rem dengan perubahan pada beberapa breakpoint, seperti proyek Bab 31. Fluid spacing tetap bisa digunakan tanpa harus memfluidkan semua ukuran font.

### Apakah semua ukuran perlu fluid?

Tidak. Border 1px, radius tetap, atau ukuran ikon yang konsisten dapat menjadi keputusan yang tepat. Gunakan fluid sizing untuk hubungan yang memang perlu tumbuh bersama ruang, bukan sebagai hiasan sintaks.

<a id="bab-22"></a>
## 22. Gambar, tabel, kode, video, dan navigasi responsif

### Gambar jangan memaksa layout melebar

```css
img {
  display: block;
  max-width: 100%;
  height: auto;
}
```

`max-width` membatasi lebar tanpa memaksa gambar kecil selalu diperbesar. `height: auto` menjaga proporsi. `display: block` juga menghilangkan celah baseline yang umum pada gambar inline.

```html
<img
  src="images/kelas-800.jpg"
  width="800"
  height="600"
  alt="Mahasiswa berdiskusi dalam kelompok di ruang praktikum"
>
```

Atribut width/height membantu browser mengetahui rasio sejak awal. Untuk gambar dekoratif, gunakan `alt=""`. Deskripsikan informasi yang berguna, bukan semua detail visual tanpa tujuan.

### Memotong foto secara konsisten

```css
.foto-kartu {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

`cover` memenuhi area sambil mempertahankan rasio gambar, sehingga sebagian gambar bisa terpotong. `contain` mempertahankan seluruh gambar di dalam area, tetapi dapat menyisakan ruang. Gunakan contain untuk logo atau diagram yang seluruh bagiannya harus terlihat.

`aspect-ratio` menetapkan rasio pilihan. Jika width dan height keduanya sudah dikunci, rasio itu tidak otomatis mengalahkan keduanya.

### Tampilan responsif belum tentu unduhan responsif

CSS yang mengecilkan foto 4000px tidak otomatis membuat unduhannya kecil. Untuk menyediakan beberapa ukuran:

```html
<img
  src="images/kelas-800.jpg"
  srcset="images/kelas-400.jpg 400w,
          images/kelas-800.jpg 800w,
          images/kelas-1200.jpg 1200w"
  sizes="(min-width: 60rem) 50vw, 100vw"
  width="800"
  height="600"
  loading="lazy"
  alt="Mahasiswa bekerja dalam kelompok di laboratorium"
>
```

File bernama 400, 800, dan 1200 harus benar-benar tersedia dan memiliki lebar intrinsik sesuai descriptor `w`. `sizes` memperkirakan lebar tampilan gambar agar browser dapat memilih kandidat bersama kepadatan pixel dan kondisi lain. Pada layout dengan container maksimum, buat sizes yang lebih akurat daripada contoh sederhana ini.

Contoh di atas cocok untuk gambar di bawah area awal layar. Jangan otomatis memberi `loading="lazy"` pada gambar utama yang segera perlu ditampilkan.

### Art direction dengan `picture`

```html
<picture>
  <source media="(min-width: 48rem)" srcset="images/banner-lebar.jpg">
  <img src="images/banner-rapat.jpg" width="600" height="600"
       alt="Dua mahasiswa mengerjakan latihan web bersama">
</picture>
```

Gunakan ketika crop/komposisi memang perlu berbeda. Tetapkan dimensi atau rasio sumber secara sesuai jika variasinya mempunyai rasio berbeda, supaya ruang yang dicadangkan tidak keliru.

**Catatan berkas:** gambar pada contoh konsep bab ini bersifat ilustratif. Sediakan asetmu sendiri dengan nama/path yang sesuai jika ingin menjalankan contohnya. Proyek lengkap Bab 31 memakai ilustrasi CSS dan tidak bergantung pada file gambar tersebut.

### Tabel dan blok kode yang panjang

```html
<div class="table-scroll" role="region" aria-labelledby="judul-nilai" tabindex="0">
  <table>
    <caption id="judul-nilai">Nilai latihan mahasiswa</caption>
    <thead><tr><th scope="col">Nama</th><th scope="col">Latihan 1</th></tr></thead>
    <tbody><tr><th scope="row">Ayu</th><td>90</td></tr></tbody>
  </table>
</div>
```

```css
.table-scroll {
  max-inline-size: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: start;
  border-bottom: 1px solid #cbd5e1;
}

pre {
  max-inline-size: 100%;
  overflow-x: auto;
  padding: 1rem;
}
```

Scroll lokal mempertahankan hubungan dua dimensi tanpa membuat seluruh halaman ikut melebar. Indikator fokus region perlu tetap terlihat, dan pengguna perlu dapat mengenali bahwa area tersebut bisa digeser.

### Video/embed

```css
.embed {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
}
```

Tambahkan `title` deskriptif pada iframe, dan pastikan konten video memiliki kebutuhan aksesibilitasnya sendiri seperti takarir ketika diperlukan.

### Navigasi di ponsel

Untuk 3–4 tautan, baris yang membungkus sering cukup:

```css
.nav-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
```

Jika membutuhkan menu buka/tutup, pilih kontrol yang benar dan kelola statusnya, termasuk `aria-expanded` serta fokus, sesuai pola yang digunakan. CSS dapat menata menu, tetapi perubahan status aplikasi biasanya membutuhkan HTML interaktif native atau JavaScript. Ikon hamburger yang tidak bisa diaktifkan bukan solusi navigasi.

Jangan menyembunyikan semua navigasi dengan `display: none` di mobile tanpa menyediakan jalur lain untuk mencapai tujuannya.

<a id="bab-23"></a>
## 23. Container query: responsif terhadap wadah komponen

Media query cocok untuk hubungan dengan viewport. Container query berguna ketika komponen yang sama dapat berada di sidebar sempit atau area utama yang lebar.

```html
<div class="wadah-kartu">
  <article class="kartu-ringkas">
    <div class="kartu-ringkas__visual" aria-hidden="true">CSS</div>
    <div>
      <h2>Belajar container query</h2>
      <p>Susunannya mengikuti lebar wadah, bukan hanya layar.</p>
    </div>
  </article>
</div>
```

```css
.kartu-ringkas {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #c6d5cf;
}

.kartu-ringkas__visual {
  display: grid;
  place-items: center;
  min-block-size: 8rem;
  background: #dcece5;
}

@supports (container-type: inline-size) {
  .wadah-kartu {
    container: kartu / inline-size;
  }

  @container kartu (min-width: 32rem) {
    .kartu-ringkas {
      grid-template-columns: 10rem minmax(0, 1fr);
      align-items: center;
    }
  }
}
```

Pada wadah sempit, visual dan teks bertumpuk. Saat wadah `kartu` cukup lebar, keduanya berdampingan. Browser yang tidak mendukung peningkatan tersebut tetap mendapat versi dasar satu kolom.

### Hal yang harus dipahami

- Untuk size query, buat container pada **ancestor** elemen yang ingin diubah.
- Query tidak memakai ukuran elemen yang sedang ditata untuk memutuskan ukuran dirinya sendiri dalam pola ini.
- `inline-size` memungkinkan query ukuran pada sumbu inline; dalam writing mode horizontal, ini berkaitan dengan lebar.
- Size containment memengaruhi cara ukuran dihitung. Jangan sembarang memberi `container-type: size` jika kamu tidak menyediakan strategi ukuran kedua sumbu.
- Nama container membantu memilih ancestor yang sesuai jika ada beberapa container bersarang.

Ada unit seperti `cqi` untuk ukuran relatif terhadap query container yang sesuai. Pelajari setelah ukuran dasar dan media query terasa jelas. Untuk kebutuhan layar keseluruhan, media query tetap berguna; container query melengkapi alat yang sudah ada.

Buka `latihan/03-container-query.html` untuk membandingkan komponen yang sama dalam dua wadah berbeda. Ubah lebar wadah melalui kode atau panel resize yang disediakan oleh CSS pada contoh itu.

<a id="bab-24"></a>
## 24. Komponen yang perlu kamu kuasai

### Link dan button punya fungsi berbeda

- Gunakan `<a href="...">` untuk berpindah ke tujuan.
- Gunakan `<button>` untuk menjalankan tindakan, misalnya membuka panel atau mengirim form.
- Jangan membuat `div` dapat diklik hanya karena lebih mudah diberi gaya.

```html
<a class="button" href="materi.html">Buka materi</a>
<button class="button" type="button">Buka pengaturan</button>
```

Tombol kedua memerlukan perilaku tambahan untuk benar-benar membuka pengaturan. CSS di bawah hanya mengatur presentasinya. Dalam form, tulis `type` dengan sengaja; button tanpa type dapat berperilaku sebagai submit.

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-block-size: 2.75rem;
  padding: 0.75rem 1.2rem;
  border: 2px solid #176b52;
  border-radius: 0.65rem;
  background: #176b52;
  color: white;
  font: inherit;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.button:focus-visible {
  outline: 3px solid #123fbc;
  outline-offset: 3px;
}
```

### Form field: label, input, petunjuk, dan error

```html
<div class="form-field">
  <label for="email">Alamat email</label>
  <input id="email" name="email" type="email" autocomplete="email"
         aria-describedby="email-hint email-error" aria-invalid="true"
         value="contoh-email">
  <p id="email-hint" class="hint">Gunakan alamat yang masih aktif.</p>
  <p id="email-error" class="error">Masukkan alamat email dengan format nama@domain.</p>
</div>
```

Ini contoh **keadaan error**, bukan validasi otomatis yang lengkap. Dalam aplikasi, tampilkan status error pada waktu yang sesuai dan perbarui `aria-invalid` serta pesan ketika keadaan berubah. `type="email"` menyediakan pemeriksaan format bawaan tertentu, tetapi tidak memastikan alamat benar-benar dimiliki pengguna.

```css
.form-field {
  display: grid;
  gap: 0.5rem;
}

.form-field label {
  font-weight: 650;
}

.form-field input {
  width: 100%;
  min-width: 0;
  min-height: 2.75rem;
  padding: 0.75rem;
  border: 1px solid #526861;
  border-radius: 0.5rem;
  font: inherit;
  background: white;
  color: #172b27;
}

.form-field input:focus-visible {
  outline: 3px solid #123fbc;
  outline-offset: 2px;
}

.form-field input[aria-invalid="true"] {
  border-color: #a12828;
}

.hint, .error {
  margin: 0;
  font-size: 0.875rem;
}

.hint { color: #4a625b; }
.error { color: #a12828; }
```

Placeholder bukan pengganti label. Warna merah bukan satu-satunya penjelasan error; pengguna memerlukan teks yang mengatakan apa masalahnya dan bagaimana memperbaikinya. Validasi pada server tetap diperlukan pada aplikasi yang memproses data; tampilan CSS tidak mengamankan data form.

### Accordion sederhana dengan HTML native

```html
<details class="faq">
  <summary>Apakah aku harus hafal semua property?</summary>
  <p>Tidak. Pahami konsep dan gunakan dokumentasi untuk detail.</p>
</details>
```

```css
.faq {
  border: 1px solid #c6d5cf;
  border-radius: 0.75rem;
}

.faq summary {
  padding: 1rem;
  cursor: pointer;
  font-weight: 700;
}

.faq p {
  padding: 0 1rem 1rem;
}

.faq[open] summary {
  color: #176b52;
}
```

Elemen details menyediakan perilaku buka/tutup tanpa menulis JavaScript sendiri. Pertahankan indikator dan fokus yang jelas; jangan hanya mempercantik summary sambil menghilangkan petunjuk bahwa ia bisa diaktifkan.

### Komponen kartu

Kartu umumnya memuat label, judul, ringkasan, dan tindakan. Mulai dengan satu tautan yang jelas. Jika seluruh kartu dibuat link, hindari link/button lain yang bersarang di dalam link tersebut. Pikirkan juga bagaimana pengguna memilih teks dan memahami tujuan tautannya.

<a id="bab-25"></a>
## 25. Aksesibilitas adalah bagian dari desain

Web yang nyaman dipakai perlu mengakomodasi cara membaca, melihat, dan berinteraksi yang berbeda. Beberapa keputusan CSS berpengaruh langsung pada hal itu.

### Kontras: ukur pasangan warna

Menurut WCAG 2.2, kontras minimum untuk teks biasa umumnya **4.5:1**, sedangkan large text **3:1**, dengan pengecualian yang dijelaskan standar. Large text umumnya setidaknya 18pt atau 14pt bold, sekitar 24 CSS px atau 18.67 CSS px bold. Ini bukan alasan untuk mengecilkan/menipiskan teks sampai sulit dibaca. Lihat [R16](#r16).

Untuk informasi visual yang diperlukan guna mengenali kontrol, state, atau bagian grafis, terdapat ketentuan non-text contrast 3:1 terhadap warna bersebelahan yang relevan, dengan cakupan dan pengecualian tersendiri. Tidak setiap border dekoratif wajib 3:1. Lihat [R17](#r17).

Gunakan pemeriksaan kontras pada DevTools atau alat yang menghitung rasio dari warna sebenarnya. Periksa juga state hover, disabled sesuai konteks, dan latar transparan/bergambar.

### Fokus keyboard

```css
:focus-visible {
  outline: 3px solid #123fbc;
  outline-offset: 3px;
}
```

Jangan menghapus outline secara global tanpa pengganti. Coba tekan Tab, Shift+Tab, Enter, serta Space pada kontrol yang sesuai. Pastikan kamu dapat mengetahui elemen mana yang sedang aktif dan fokusnya tidak tertutup header atau panel lain.

### Skip link

```html
<a class="skip-link" href="#konten">Lewati navigasi</a>
<main id="konten" tabindex="-1">...</main>
```

```css
.skip-link {
  position: absolute;
  top: 0.75rem;
  left: 1rem;
  z-index: 100;
  padding: 0.75rem 1rem;
  background: #172b27;
  color: white;
  transform: translateY(-200%);
}

.skip-link:focus {
  transform: translateY(0);
}
```

Tautan muncul ketika menerima fokus dan memungkinkan pengguna melewati navigasi berulang. `tabindex="-1"` membuat main dapat menerima fokus tanpa menjadi pemberhentian Tab biasa.

### Target sentuh

WCAG 2.2 kriteria 2.5.8 menetapkan target pointer minimum 24×24 CSS px atau kondisi pengecualian yang relevan, termasuk aturan jarak. Untuk desain sehari-hari, sasaran sekitar 44×44px atau lebih pada kontrol penting sering lebih nyaman; angka 44 bukan minimum universal kriteria AA tersebut. Lihat [R18](#r18).

```css
.icon-button {
  display: inline-grid;
  place-items: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
}
```

Dengan root 16px, 2.75rem menjadi 44px. Ikon visual boleh lebih kecil daripada area interaksinya.

### Teks hanya untuk pembaca layar

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

Gunakan pada teks pendamping yang perlu tersedia secara aksesibel. Jangan menerapkan pola ini pada kontrol fokus tanpa menyediakan cara agar kontrolnya terlihat saat fokus. Jika yang dibutuhkan hanya nama tombol ikon, teks tersembunyi atau label aksesibel yang tepat dapat digunakan sesuai konteks.

### Hormati preferensi gerak dan high contrast

```css
@media (prefers-reduced-motion: reduce) {
  .kartu {
    transition: none;
  }

  .dekorasi {
    animation: none;
  }
}

@media (forced-colors: active) {
  .button {
    border: 2px solid ButtonText;
  }
}
```

Pakai system colors ketika sesuai. Hindari memaksa warna dengan `forced-color-adjust: none` secara luas; kamu bisa menghalangi penyesuaian yang dibutuhkan pengguna.

### Pengujian yang penting

- Perbesar teks hingga 200% dan pastikan tidak ada kehilangan isi atau fungsi.
- Uji reflow setara lebar 320 CSS px untuk halaman vertikal biasa.
- Jangan mengandalkan warna saja untuk error, pilihan aktif, atau status.
- Jangan menaruh instruksi penting hanya pada hover.
- Pertahankan urutan DOM yang sesuai dengan urutan membaca dan menggunakan kontrol.
- Pastikan informasi penting tidak hilang karena crop, ellipsis, atau overflow hidden.

Memenuhi satu rasio kontras atau menambahkan satu class fokus belum berarti seluruh halaman telah diaudit aksesibilitasnya. Gunakan pemeriksaan tersebut sebagai bagian dari proses desain dan pengujian yang berulang.

<a id="bab-26"></a>
## 26. Transisi, transform, dan animasi

Gerak sebaiknya membantu pengguna memahami perubahan, memberi umpan balik, atau mengarahkan perhatian pada hal yang relevan.

### Transition: menghaluskan perubahan nilai

```css
.button {
  background-color: #176b52;
  color: white;
  transition: background-color 160ms ease, transform 160ms ease;
}

@media (hover: hover) and (pointer: fine) {
  .button:hover {
    background-color: #11513e;
    transform: translateY(-2px);
  }
}
```

Transition diletakkan pada state dasar agar perubahan ke dan dari hover sama-sama bisa dihaluskan. Pilih property secara eksplisit. `transition: all` dapat membuat perubahan layout tak terduga ikut dianimasikan.

### Transform tidak memindahkan ruang layout

`transform: translateY(-2px)` menggeser hasil visual elemen, tetapi tempat yang disediakan layout tetap. Sementara itu, perubahan margin atau ukuran dapat mengubah alur elemen di sekitarnya. Transform besar tetap dapat menimbulkan tumpang tindih atau overflow visual.

### Keyframes: urutan animasi

```css
@keyframes muncul {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notifikasi {
  animation: muncul 180ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .button { transition: none; }
  .button:hover { transform: none; }
  .notifikasi { animation: none; }
}
```

Animasi ini berjalan ketika aturan animasi mulai diterapkan pada elemen, bukan otomatis setiap kali elemen masuk viewport. Untuk perilaku tertentu, kamu perlu mekanisme pemicu yang sesuai.

### Kebiasaan yang membantu

- Untuk respons kontrol kecil, durasi singkat sekitar 120–250ms bisa menjadi titik awal; sesuaikan dengan tugasnya.
- Hindari gerakan berulang yang tidak diperlukan saat pengguna membaca.
- Jangan membuat isi baru dapat dibaca hanya setelah animasi panjang.
- Jangan mengandalkan opacity/transisi untuk mengatur status aksesibilitas atau focusability.
- Uji apakah gerak membantu memahami perubahan, lalu sediakan versi dengan gerak berkurang.

Transform dan opacity sering dapat dianimasikan tanpa menghitung ulang layout, tetapi bukan jaminan seluruh proses menjadi murah atau selalu memakai GPU. Performa tetap perlu diukur.

<a id="bab-27"></a>
## 27. Mengorganisasi CSS seperti proyek yang akan terus tumbuh

### Susun dari umum ke khusus

1. Token: warna, jarak, radius, ukuran konten.
2. Dasar: box-sizing, body, tipografi umum.
3. Layout: container, grid halaman, section.
4. Komponen: button, card, navbar, form field.
5. Utilities: beberapa class kecil yang dipakai berulang.
6. State, variasi responsif, dan preferensi pengguna sesuai strategi proyek.

Untuk proyek kecil, semuanya boleh berada dalam satu stylesheet dengan komentar bagian. Pisahkan file ketika pemisahan itu membantu navigasi dan kepemilikan, bukan karena jumlah file yang banyak terlihat lebih profesional.

### Custom properties

```css
:root {
  --brand: #176b52;
  --radius-card: 1rem;
}

.kartu {
  border-radius: var(--radius-card);
  border-color: var(--brand);
}

.tema-ungu {
  --brand: #5b3aa4;
}
```

Kartu di dalam `.tema-ungu` dapat memakai brand yang berbeda melalui pewarisan custom property. Ini membuat komponen bisa disesuaikan tanpa menyalin seluruh aturannya.

```css
.badge {
  color: var(--warna-badge, #176b52);
}
```

Fallback dipakai jika custom property tidak tersedia atau bernilai invalid menurut mekanisme var. Namun jika `--warna-badge: 20px` ada, fallback tersebut tidak otomatis menyelamatkan `color`: substitusinya menghasilkan nilai yang tidak valid untuk color pada tahap computed value. Fallback var bukan pemeriksa tipe universal.

### Penamaan komponen

```html
<article class="course-card course-card--featured">
  <h2 class="course-card__title">CSS responsif</h2>
</article>
```

```css
.course-card { padding: 1.5rem; }
.course-card__title { font-size: 1.5rem; }
.course-card--featured { border: 2px solid var(--brand); }
```

Ini pola penamaan bergaya BEM: block, element, modifier. Tanda `__` dan `--` hanyalah kesepakatan nama class; browser tidak memberikan makna hierarki khusus padanya.

### Utility yang terarah

```css
.text-center { text-align: center; }
.full-width { width: 100%; }
.visually-hidden { /* gunakan implementasi Bab 25 */ }
```

Utility bisa membantu, begitu juga class komponen. Pilih kombinasi yang timmu dapat baca dan rawat. Menghafal framework utility tidak menggantikan pemahaman box model, cascade, atau layout; framework menggunakan mekanisme CSS yang sama di bawahnya.

### Strategi layer untuk stylesheet yang lebih besar

```css
@layer reset, base, layout, components, utilities;

@layer base {
  body { margin: 0; font-family: system-ui, sans-serif; }
}

@layer components {
  .button { padding: 0.75rem 1rem; }
}

@layer utilities {
  .compact { padding: 0.5rem; }
}
```

Untuk normal declarations, utility di layer terakhir dapat mengalahkan property yang sama di layer components pada origin yang setara. Jika sebagian aturan tetap di luar layer, aturan normal tersebut dapat mengalahkan normal declarations dalam layer. Gunakan layer sebagai strategi yang disengaja.

### Tanda stylesheet mulai sulit dirawat

- Satu perubahan warna harus dilakukan pada banyak angka hex yang sama.
- Nama class menjelaskan tampilan sesaat, misalnya `.kotak-biru-kiri-200px`.
- Selector semakin panjang hanya untuk mengalahkan aturan sebelumnya.
- Breakpoint yang sama tersebar dengan aturan yang bertentangan.
- Nilai z-index besar terus ditambah tanpa memeriksa stacking context.

Rapikan berdasarkan hubungan komponen dan tanggung jawab. Jangan membuat abstraksi untuk setiap nilai yang hanya muncul sekali.

<a id="bab-28"></a>
## 28. Fitur lanjutan: pelajari setelah fondasinya kuat

CSS berkembang melalui modul, sehingga sebutan “CSS3” tidak berarti satu paket tertutup yang seluruh fiturnya selalu tersedia bersamaan.

### Native nesting

```css
.card {
  padding: 1rem;

  & > .card__title {
    margin: 0;
  }

  &:hover {
    border-color: #176b52;
  }
}
```

Pada contoh sederhana ini, `&` merujuk selector induk. Hasil pencocokan dapat dibaca seperti `.card > .card__title` dan `.card:hover`. Nesting native memiliki aturan dan specificity tersendiri pada kasus lebih kompleks; jangan menganggap seluruh sintaks preprocessor langsung berlaku di browser. Lihat [R21](#r21).

Jaga nesting tetap dangkal. Jika harus membuka lima lapis untuk menemukan satu aturan, kode makin sulit ditelusuri.

### Subgrid

Subgrid memungkinkan grid anak memakai track dari grid induk. Ini dapat membantu menyelaraskan judul, isi, dan aksi antar-kartu yang struktur isinya serupa.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.card {
  display: grid;
  gap: 1rem;
}

@supports (grid-template-rows: subgrid) {
  .card {
    grid-row: span 3;
    grid-template-rows: subgrid;
  }
}
```

Contoh ini mengasumsikan setiap card mempunyai tiga anak langsung yang mengisi tiga row. Struktur, penempatan, dan breakpoint tetap harus dirancang; menambahkan kata `subgrid` sendiri tidak otomatis menyelaraskan semua elemen. Untuk mulai belajar, kuasai Grid biasa lebih dahulu. Lihat [R22](#r22).

### Relational selector `:has()`

```css
.field:has(input[aria-invalid="true"]) {
  border-inline-start: 3px solid #a12828;
  padding-inline-start: 0.75rem;
}
```

Wadah menyesuaikan tampilannya berdasarkan keadaan keturunan yang cocok. Ini tidak menggantikan logika validasi atau pembaruan atribut error. Lihat [R23](#r23).

### Progressive enhancement dengan `@supports`

```css
.komponen {
  display: block;
}

@supports (display: grid) {
  .komponen {
    display: grid;
    gap: 1rem;
  }
}
```

Mulai dari versi yang dapat dibaca dan dipakai, lalu tambahkan peningkatan ketika fitur dikenali. `@supports` memeriksa dukungan sintaks/fitur yang ditanyakan, bukan menjamin implementasinya bebas bug atau hasil desainnya selalu benar. Lihat [R20](#r20).

### Cabang materi yang bisa kamu lanjutkan

- `@scope` untuk membatasi penerapan aturan dengan scoping root.
- `@property` untuk registrasi custom property bertipe.
- Scroll snap untuk hubungan posisi scroll yang memang membutuhkannya.
- Print CSS, multicolumn, serta pengaturan tulisan internasional.
- Sistem warna modern dan fungsi warna untuk kebutuhan desain lanjutan.

Kamu tidak perlu menggunakan semuanya dalam satu halaman. Kemampuan memilih fitur yang tepat lebih berguna daripada jumlah fitur yang berhasil dimasukkan.

<a id="bab-29"></a>
## 29. Performa, kompatibilitas, dan kebiasaan kerja

### Ukur masalah yang benar

Halaman lambat tidak selalu disebabkan selector CSS. Gambar besar, font, script, jaringan, dan perubahan layout dapat jauh lebih berpengaruh. Mulai dari apa yang terukur, bukan mitos optimasi.

### Tindakan yang biasanya lebih berarti

- Siapkan ukuran gambar yang sesuai dan format yang efisien untuk kontennya.
- Beri informasi dimensi/rasio media agar ruang dapat dicadangkan sebelum media selesai dimuat.
- Muat font dan weight yang benar-benar diperlukan.
- Hindari urutan `@import` bertingkat yang menunda penemuan stylesheet berikutnya jika tidak diperlukan.
- Untuk animasi, pertimbangkan transform/opacity dan ukur hasilnya.
- Hindari shadow, blur, atau efek visual berat yang dianimasikan terus tanpa manfaat.
- Jangan memberi `will-change` pada semua elemen. Penggunaan berlebihan dapat menambah biaya sumber daya.

### Layout shift

Bayangkan pengguna hendak menekan link, lalu gambar yang baru selesai dimuat mendorong link tersebut ke bawah. Menyediakan dimensi atau rasio gambar membantu mencegah pergeseran semacam ini. Font, konten yang disisipkan, dan tinggi komponen yang berubah juga perlu diperiksa.

### Dukungan browser

1. Tentukan browser/perangkat yang memang digunakan pengguna proyek.
2. Periksa dokumentasi kompatibilitas untuk fitur yang kamu pilih.
3. Sediakan fallback yang mempertahankan isi dan fungsi bila diperlukan.
4. Uji pada browser nyata, bukan hanya asumsi dari sintaks yang diterima editor.

Status Baseline dapat membantu memahami ketersediaan fitur lintas browser, tetapi tidak menggantikan kebutuhan browser target, aksesibilitas, atau pengujian desainmu. Jangan menambahkan vendor prefix berdasarkan tebakan. Tool build seperti autoprefixing dapat membantu bila proyek membutuhkan, setelah target dan pipeline-nya jelas.

### Reset yang masuk akal

Mulai dari reset kecil dan pahami efeknya:

```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; }
img { display: block; max-width: 100%; height: auto; }
button, input, select, textarea { font: inherit; }
```

Jangan menghapus semua border, outline, list marker, dan tampilan form secara global tanpa membuat pengganti yang berguna. Reset bertugas memberi dasar yang konsisten, bukan menghapus petunjuk penggunaan.

### Print CSS

```css
@media print {
  nav,
  .aksi-interaktif {
    display: none;
  }

  body {
    background: white;
    color: black;
  }

  .kartu {
    box-shadow: none;
    break-inside: avoid;
  }
}
```

Uji Print Preview. Nilai break-inside membantu menghindari pemisahan, tetapi elemen yang lebih tinggi daripada halaman tetap memerlukan strategi lain. Konten dalam details yang tertutup juga perlu diperiksa jika harus tersedia pada cetakan.

### Gaya kerja profesional

Gunakan version control untuk menyimpan perubahan proyek, beri nama perubahan sesuai tujuannya, dan periksa perbedaan sebelum menggabungkannya. Untuk belajar, catatan “aku mengubah X dan melihat Y karena Z” juga sangat membantu.

<a id="bab-30"></a>
## 30. Debugging CSS tanpa menebak-nebak

### Urutan diagnosis

1. **Elemen:** apakah HTML yang kamu maksud benar-benar ada dan class-nya sesuai?
2. **Pemuatan:** apakah stylesheet berhasil dimuat dari path yang benar?
3. **Pencocokan:** apakah selector cocok? Apakah media/support/container query berlaku?
4. **Cascade:** deklarasi mana yang menang? Apakah ada inline, layer, atau important?
5. **Computed value:** berapa nilai akhir property yang relevan?
6. **Layout:** bagaimana box model, containing block, flex/grid sizing, dan overflow bekerja?
7. **Konten/kondisi:** apakah masalah hanya muncul pada teks tertentu, zoom, atau viewport tertentu?

### Menggunakan DevTools

- Klik kanan elemen lalu pilih **Inspect** atau menu setara pada browsermu.
- Pada panel **Styles**, cari aturan yang cocok dan deklarasi yang dicoret.
- Pada **Computed**, lihat nilai yang akhirnya berlaku.
- Buka tampilan **Box Model** untuk mengukur content, padding, border, dan margin.
- Aktifkan overlay Flexbox/Grid jika tersedia.
- Nonaktifkan satu deklarasi untuk menguji hipotesis.
- Gunakan mode perangkat untuk mencoba viewport; tetap periksa perangkat/browser nyata bila tersedia.

Nama tab dapat berbeda antarbrowser. Prinsipnya sama: cari nilai yang berlaku dan penyebabnya. Perubahan di DevTools biasanya sementara; pindahkan hasil yang benar kembali ke file sumber. Lihat [R14](#r14).

### Tabel masalah yang sering muncul

| Gejala | Penyebab yang perlu dicek | Langkah awal |
| --- | --- | --- |
| Semua CSS tidak terlihat | Path salah, file belum tersimpan, link salah | Periksa link stylesheet dan Network |
| Satu property tidak bekerja | Salah ketik, nilai tidak valid, deklarasi kalah | Lihat Styles dan Computed |
| Class tidak berpengaruh | Nama tidak sama atau selector tidak cocok | Cocokkan HTML dan CSS |
| Warna berubah tanpa diduga | Inheritance, aturan lain, custom property | Cari sumber computed color |
| `width: 100%` meluber | Content-box, padding, margin, min-width | Periksa box-sizing dan ukuran induk |
| Flex item tidak menyusut | Minimum otomatis atau konten tak terputus | Coba min-width: 0 pada item yang sesuai |
| Grid meluber | Track minimum terlalu besar atau konten lebar | Periksa minmax, min-width, dan konten |
| Center vertikal tidak terlihat | Tak ada ruang kosong; sumbu berbeda | Lihat flex-direction dan ukuran wadah |
| `margin: auto` tidak memusatkan | Tidak ada sisa ruang atau konteks tidak sesuai | Periksa width/max-width dan layout |
| Jarak antarparagraf aneh | Margin bawaan atau margin collapse | Periksa Box Model dan formatting context |
| Gambar punya celah di bawah | Gambar inline ikut baseline teks | Gunakan display: block jika sesuai |
| Foto terdistorsi | Width dan height dipaksa tanpa strategi rasio | Gunakan height auto atau object-fit |
| Sticky diam saja | Inset, scroll ancestor, atau ruang gerak | Periksa daftar pada Bab 18 |
| z-index tinggi tetap kalah | Stacking context atau clipping ancestor | Periksa ancestor, bukan hanya angkanya |
| Header menutupi anchor | Header fixed/sticky tanpa ruang scroll | Atur scroll-padding/scroll-margin yang sesuai |
| Tampilan mobile seperti desktop kecil | Meta viewport hilang | Tambahkan meta viewport |
| Breakpoint benar tetapi style kalah | Query berlaku, cascade tetap kalah | Bandingkan selector dan urutan stylesheet |
| Teks terpotong saat zoom | Height kaku, overflow hidden, clamp | Uji tinggi auto dan ukuran font |
| Gambar background hilang | Path relatif dihitung dari file CSS | Cocokkan struktur folder |
| Fokus keyboard tidak terlihat | Outline dihapus atau terpotong | Beri indikator dan periksa overflow |
| Scrollbar horizontal seluruh halaman | Width tetap, 100vw, track/item, transform | Temukan elemen yang melebihi viewport |

### Trik melihat batas kotak

```css
/* Hanya saat debugging. */
* {
  outline: 1px solid rgb(255 0 0 / 0.18);
}
```

Outline membantu melihat kotak tanpa mengubah ukuran layout. Hapus aturan ini setelah diagnosis. Jangan membiarkannya menggantikan indikator fokus pada hasil akhir.

### Pola berpikir yang perlu dilatih

Hindari pertanyaan “angka apa yang harus kutambah supaya pas?”. Ganti dengan hipotesis seperti “item menolak menyusut karena minimum berbasis kontennya”. Lalu uji satu perubahan yang memang berkaitan dengan hipotesis itu.

Jika menambahkan `left: 17px` memperbaiki satu ukuran tetapi merusak ukuran lain, kemungkinan hubungan layout yang kamu atur belum tepat. Periksa container, alignment, gap, dan ukuran fleksibel sebelum menambah offset lagi.

<a id="bab-31"></a>
## 31. Proyek lengkap: halaman komunitas Ruang Kode

Proyek ini menggabungkan dasar yang sudah kamu pelajari. Semua tautan menuju bagian halaman yang tersedia. FAQ memakai details/summary native. Ilustrasi kartu dibuat melalui CSS sehingga tidak perlu mengunduh gambar, font, framework, atau paket tambahan.

### Menjalankan

1. Jika memakai paket pendamping, ekstrak ZIP lalu buka `proyek/index.html` di browser.
2. Jika hanya memakai README, buat folder `proyek` berisi `index.html` dan `styles.css`, lalu salin dua blok lengkap di bawah.
3. Ubah file di editor, simpan, dan muat ulang browser.
4. Perkecil/perbesar jendela dan periksa elemen melalui DevTools.

Ini proyek statis pembelajaran. Tidak ada akun, pendaftaran, server, atau proses pengiriman data. Teks dan tindakan disusun sesuai fungsi yang memang tersedia.

### Keputusan desain dan teknis

| Bagian | Keputusan | Alasan |
| --- | --- | --- |
| Lebar konten | Maksimum 70rem, dengan ruang tepi | Menghindari konten terlalu lebar |
| Navigasi | Flexbox dan wrapping | Tiga tujuan tetap dapat diakses di layar sempit |
| Hero | Satu kolom, menjadi dua di 60rem | Memberi ruang baca sebelum berdampingan |
| Font judul | Rem, berubah di breakpoint | Memudahkan evaluasi pembesaran teks |
| Kartu materi | Grid auto-fit dengan minimum fleksibel | Jumlah kolom mengikuti kapasitas wadah |
| Isi kartu | Flex column dan auto margin | Aksi dapat sejajar tanpa tinggi kaku |
| Warna | Token berdasarkan peran | Mudah mengubah tema secara konsisten |
| FAQ | details/summary | Perilaku native dengan kode ringkas |
| Keyboard | Skip link dan focus-visible | Mempermudah navigasi dan pelacakan fokus |
| Motion | Hover terbatas dan reduced-motion | Umpan balik visual dengan penyesuaian preferensi |

### Cara membedah kodenya

Pertama, baca HTML tanpa CSS: urutan informasi harus tetap masuk akal. Kedua, temukan `.container`, `.hero-layout`, dan `.course-grid`. Ketiga, periksa token warna/jarak. Terakhir, baca state interaksi, media query, dan aturan cetak.

Kode lengkap berikut sama dengan file pendamping. Kamu tidak perlu menebak potongan yang hilang.

<!-- PROJECT_SOURCE_START -->

### File: `proyek/index.html`

```html
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Proyek latihan HTML dan CSS responsif: halaman komunitas belajar Ruang Kode.">
  <title>Ruang Kode — Belajar, coba, pahami</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip-link" href="#konten">Lewati navigasi</a>

  <header class="site-header">
    <div class="container header-layout">
      <a class="brand" href="#beranda" aria-label="Ruang Kode, ke beranda">
        <span class="brand-mark" aria-hidden="true">{ }</span>
        Ruang Kode
      </a>
      <nav aria-label="Navigasi utama">
        <ul class="nav-list">
          <li><a href="#materi">Materi</a></li>
          <li><a href="#cara-belajar">Cara belajar</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="konten" tabindex="-1">
    <section class="hero section" id="beranda" aria-labelledby="hero-title">
      <div class="container hero-layout">
        <div class="hero-copy stack">
          <p class="eyebrow">KOMUNITAS BELAJAR WEB</p>
          <h1 id="hero-title">Web yang rapi dimulai dari dasar yang kamu pahami.</h1>
          <p class="lead">Belajar HTML dan CSS lewat contoh kecil, percobaan langsung, dan proyek yang tumbuh bersama kemampuanmu.</p>
          <div class="actions">
            <a class="button" href="#materi">Jelajahi materi</a>
            <a class="button button--secondary" href="#cara-belajar">Lihat cara belajar</a>
          </div>
          <ul class="hero-notes" aria-label="Keunggulan materi">
            <li>Tanpa framework</li>
            <li>Contoh bisa diubah</li>
            <li>Nyaman di ponsel</li>
          </ul>
        </div>

        <aside class="learning-board" aria-labelledby="board-title">
          <div class="board-heading">
            <p class="eyebrow">PETA BELAJARMU</p>
            <span class="pill">Mulai dari sini</span>
          </div>
          <h2 id="board-title">Satu konsep, satu percobaan.</h2>
          <ol class="steps">
            <li><span class="step-number" aria-hidden="true">01</span><div><h3>Pahami strukturnya</h3><p>Kenali elemen dan hubungan induk-anak.</p></div></li>
            <li><span class="step-number" aria-hidden="true">02</span><div><h3>Atur tampilannya</h3><p>Mulai dari jarak, ukuran, lalu tata letak.</p></div></li>
            <li><span class="step-number" aria-hidden="true">03</span><div><h3>Uji di berbagai lebar</h3><p>Amati kapan konten perlu disusun ulang.</p></div></li>
          </ol>
          <p class="board-footnote">Coba perkecil jendela browser. Perhatikan kapan dua kolom berubah menjadi satu.</p>
        </aside>
      </div>
    </section>

    <section class="section section--muted" id="materi" aria-labelledby="materi-title">
      <div class="container">
        <div class="section-heading stack">
          <p class="eyebrow">MATERI PILIHAN</p>
          <h2 id="materi-title">Bangun pemahamanmu, selangkah demi selangkah.</h2>
          <p>Kartu di bawah memakai CSS Grid. Lebar yang tersedia menentukan berapa kolom yang muat.</p>
        </div>
        <div class="course-grid">
          <article class="course-card">
            <div class="course-art course-art--html" aria-hidden="true"><span>&lt;html&gt;</span></div>
            <div class="course-body stack">
              <p class="eyebrow">01 / STRUKTUR</p>
              <h3>HTML yang bermakna</h3>
              <p>Susun judul, navigasi, artikel, dan tautan dengan elemen yang sesuai.</p>
              <a class="text-link" href="#cara-belajar">Lihat langkah latihan HTML</a>
            </div>
          </article>
          <article class="course-card">
            <div class="course-art course-art--css" aria-hidden="true"><span>.kartu { }</span></div>
            <div class="course-body stack">
              <p class="eyebrow">02 / TAMPILAN</p>
              <h3>CSS yang masuk akal</h3>
              <p>Pelajari cascade, box model, Flexbox, dan Grid melalui perubahan kecil yang bisa kamu jelaskan.</p>
              <a class="text-link" href="#cara-belajar">Lihat langkah latihan CSS</a>
            </div>
          </article>
          <article class="course-card">
            <div class="course-art course-art--responsive" aria-hidden="true"><span>@media</span></div>
            <div class="course-body stack">
              <p class="eyebrow">03 / RESPONSIF</p>
              <h3>Nyaman di berbagai layar</h3>
              <p>Jaga keterbacaan dan susun ulang konten berdasarkan ruang yang benar-benar tersedia.</p>
              <a class="text-link" href="#cara-belajar">Lihat langkah latihan responsif</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section" id="cara-belajar" aria-labelledby="cara-title">
      <div class="container practice-layout">
        <div class="stack">
          <p class="eyebrow">CARA BELAJAR</p>
          <h2 id="cara-title">Prediksi dulu. Ubah kode. Periksa hasilnya.</h2>
          <p>Setiap percobaan punya tujuan. Dengan begitu, kamu tahu mengapa tampilan berubah.</p>
        </div>
        <ol class="practice-list">
          <li><h3>Ubah satu hal</h3><p>Ganti nilai <code>gap</code> dari <code>1.5rem</code> menjadi <code>3rem</code>. Amati jarak antarkartu.</p></li>
          <li><h3>Periksa ukuran</h3><p>Buka DevTools, pilih elemen, lalu lihat bagian Box Model dan Computed.</p></li>
          <li><h3>Jelaskan dengan kalimatmu</h3><p>Misalnya: “Kartu turun ke baris baru karena lebar minimum setiap kolom tidak lagi muat.”</p></li>
        </ol>
      </div>
    </section>

    <section class="section section--muted" id="faq" aria-labelledby="faq-title">
      <div class="container faq-container">
        <div class="section-heading stack">
          <p class="eyebrow">PERTANYAAN UMUM</p>
          <h2 id="faq-title">Mulai dengan yang kamu punya.</h2>
        </div>
        <div class="faq-list">
          <details><summary>Apakah perlu menginstal framework?</summary><p>Tidak. Proyek ini cukup dibuka di browser. Kamu dapat mengedit index.html dan styles.css memakai editor teks.</p></details>
          <details><summary>Mengapa navigasinya tetap terlihat di ponsel?</summary><p>Tautannya sedikit, jadi navigasi bisa membungkus ke baris berikutnya. Ini menjaga semua tujuan tetap bisa diakses.</p></details>
          <details><summary>Apa yang harus kucoba lebih dulu?</summary><p>Ubah warna utama, jarak antarkartu, dan lebar maksimum container. Lakukan satu per satu agar hubungan sebab-akibatnya jelas.</p></details>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-layout">
      <p>Ruang Kode — proyek latihan HTML &amp; CSS.</p>
      <a href="#beranda">Kembali ke atas</a>
    </div>
  </footer>
</body>
</html>
```

### File: `proyek/styles.css`

```css
/* 1. Token desain: ubah nilai di sini untuk mencoba tema baru. */
:root {
  color-scheme: light;
  --color-bg: #ffffff;
  --color-surface: #f2f6f5;
  --color-text: #172b27;
  --color-muted: #4a625b;
  --color-primary: #176b52;
  --color-primary-hover: #11513e;
  --color-border: #c6d5cf;
  --color-focus: #123fbc;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --radius: 1rem;
  --shadow: 0 1rem 3rem rgb(23 43 39 / 0.09);
  --content-width: 70rem;
}

/* 2. Dasar halaman. */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-padding-block-start: 1.5rem;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  overflow-wrap: anywhere;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1,
h2,
h3 {
  line-height: 1.18;
}

h1 {
  max-inline-size: 18ch;
  font-size: 2.25rem;
  letter-spacing: -0.035em;
}

h2 {
  font-size: 1.75rem;
  letter-spacing: -0.025em;
}

h3 {
  font-size: 1.2rem;
}

p {
  color: var(--color-muted);
}

a {
  color: var(--color-primary);
  text-underline-offset: 0.2em;
}

button,
input,
select,
textarea {
  font: inherit;
}

code {
  font-family: ui-monospace, Consolas, monospace;
  font-size: 0.93em;
}

:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 4px;
}

.skip-link {
  position: absolute;
  inset-block-start: 0.75rem;
  inset-inline-start: 1rem;
  z-index: 100;
  padding: 0.75rem 1rem;
  transform: translateY(-200%);
  background: var(--color-text);
  color: var(--color-bg);
  border-radius: 0.5rem;
}

.skip-link:focus {
  transform: translateY(0);
}

/* 3. Pola tata letak yang dipakai ulang. */
.container {
  inline-size: min(100% - 2rem, var(--content-width));
  margin-inline: auto;
}

.section {
  padding-block: clamp(3rem, 2rem + 3vw, 6rem);
}

.section--muted {
  background: var(--color-surface);
}

.stack > * + * {
  margin-block-start: var(--space-5);
}

.eyebrow {
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 750;
  letter-spacing: 0.09em;
}

.section-heading {
  max-inline-size: 42rem;
  margin-block-end: var(--space-6);
}

/* 4. Header dan navigasi: membungkus jika ruang habis. */
.site-header {
  border-block-end: 1px solid var(--color-border);
}

.header-layout,
.footer-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding-block: var(--space-4);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  min-block-size: 2.75rem;
  color: var(--color-text);
  font-weight: 800;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  place-items: center;
  inline-size: 2.5rem;
  block-size: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.7rem;
  background: var(--color-primary);
  color: white;
  font-family: ui-monospace, Consolas, monospace;
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-list a {
  display: inline-flex;
  align-items: center;
  min-block-size: 2.75rem;
  font-weight: 600;
}

/* 5. Hero: satu kolom sebagai dasar; dua kolom saat konten muat. */
.hero-layout {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

.hero-copy,
.learning-board {
  min-inline-size: 0;
}

.lead {
  max-inline-size: 54ch;
  font-size: 1.125rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-block-size: 2.75rem;
  padding: 0.8rem 1.2rem;
  border: 2px solid var(--color-primary);
  border-radius: 0.65rem;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: background-color 160ms ease, transform 160ms ease;
}

.button--secondary {
  background: transparent;
  color: var(--color-primary);
}

.hero-notes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
  padding-inline-start: 1.25rem;
  color: var(--color-muted);
  font-size: 0.875rem;
}

.learning-board {
  padding: clamp(1.25rem, 1rem + 1vw, 2rem);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  box-shadow: var(--shadow);
}

.board-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-block-end: var(--space-5);
}

.pill {
  padding: 0.3rem 0.65rem;
  border: 1px solid var(--color-border);
  border-radius: 100vmax;
  background: var(--color-bg);
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 650;
}

.steps {
  display: grid;
  gap: var(--space-5);
  margin-block: var(--space-6);
  padding: 0;
  list-style: none;
}

.steps li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.steps h3 {
  margin-block-end: var(--space-1);
  font-size: 1rem;
}

.steps p,
.board-footnote {
  font-size: 0.875rem;
}

.step-number {
  display: grid;
  place-items: center;
  inline-size: 2.25rem;
  block-size: 2.25rem;
  flex-shrink: 0;
  border-radius: 0.6rem;
  background: var(--color-primary);
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
}

.board-footnote {
  padding-block-start: var(--space-5);
  border-block-start: 1px solid var(--color-border);
}

/* 6. Kartu: grid otomatis dan tombol sejajar di bagian bawah. */
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: var(--space-5);
}

.course-card {
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-bg);
}

.course-art {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 9;
  border-radius: calc(var(--radius) - 1px) calc(var(--radius) - 1px) 0 0;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 1.8rem;
  font-weight: 700;
}

.course-art--html {
  background: #fce7d8;
  color: #843b1c;
}

.course-art--css {
  background: #dcece5;
  color: #15523e;
}

.course-art--responsive {
  background: #e5e7fb;
  color: #3d4383;
}

.course-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: var(--space-5);
}

.course-body .text-link {
  margin-block-start: auto;
  padding-block: 1.25rem 0.25rem;
  font-weight: 700;
}

/* 7. Bagian latihan, FAQ, dan footer. */
.practice-layout {
  display: grid;
  gap: 2.5rem;
}

.practice-list {
  display: grid;
  gap: var(--space-5);
  margin: 0;
  padding-inline-start: 1.5rem;
}

.practice-list li {
  padding-inline-start: var(--space-2);
}

.practice-list li::marker {
  color: var(--color-primary);
  font-weight: 800;
}

.practice-list h3 {
  margin-block-end: var(--space-2);
}

.faq-container {
  max-inline-size: 50rem;
}

.faq-list {
  display: grid;
  gap: var(--space-4);
}

.faq-list details {
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-bg);
}

.faq-list summary {
  padding: var(--space-4) var(--space-5);
  cursor: pointer;
  font-weight: 700;
}

.faq-list details p {
  padding: 0 var(--space-5) var(--space-5);
}

.site-footer {
  border-block-start: 1px solid var(--color-border);
  font-size: 0.875rem;
}

.site-footer a {
  display: inline-flex;
  align-items: center;
  min-block-size: 2.75rem;
}

/* 8. Responsif: angka ini dipilih untuk komposisi konten contoh. */
@media (min-width: 40rem) {
  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
  }
}

@media (min-width: 60rem) {
  .hero-layout {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  }

  .practice-layout {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 4rem;
  }
}

/* 9. Interaksi dengan mouse dan preferensi gerak pengguna. */
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    background: var(--color-primary-hover);
    border-color: var(--color-primary-hover);
    transform: translateY(-2px);
  }

  .button--secondary:hover {
    background: var(--color-surface);
    color: var(--color-primary-hover);
  }
}

@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }

  .button:hover {
    transform: none;
  }
}

/* 10. Cetak: sederhanakan area yang tidak diperlukan di kertas. */
@media print {
  .site-header,
  .site-footer,
  .actions,
  .skip-link {
    display: none;
  }

  .section {
    padding-block: 1.25rem;
    background: white;
  }

  .learning-board {
    box-shadow: none;
  }

  .course-grid,
  .hero-layout,
  .practice-layout {
    display: block;
  }

  .course-card {
    break-inside: avoid;
    margin-block-end: 1rem;
  }
}
```

<!-- PROJECT_SOURCE_END -->

### Eksperimen setelah halaman berjalan

1. Ubah `--content-width` dari 70rem ke 58rem. Apa yang terjadi pada hero dan jumlah kolom kartu?
2. Ubah `--space-5` dari 1.5rem ke 2rem. Bagian mana saja yang ikut berubah?
3. Tambahkan kartu keempat dengan judul dan deskripsi lebih panjang.
4. Ubah batas hero dari 60rem ke 50rem. Pada lebar mendekati batas, apakah isinya masih nyaman?
5. Hapus `min(100%, 18rem)` dan gunakan minimum `30rem`. Temukan mengapa layar sempit mulai bermasalah.
6. Ubah palet dengan mengganti token. Ukur lagi kontras teks utama, teks muted, dan tombol.
7. Gunakan Tab sejak awal halaman. Pastikan skip link muncul dan semua tautan/FAQ dapat dicapai.
8. Uji ukuran teks 200%, string panjang tanpa spasi, mode reduced-motion, dan Print Preview.

Jangan menilai keberhasilan hanya dari satu screenshot desktop. Sebuah layout yang baik tetap berguna ketika kondisinya berubah.

<a id="bab-32"></a>
## 32. Dua puluh latihan dan pembahasannya

Kerjakan dulu tanpa membuka jawaban. Untuk setiap latihan, tulis **prediksi, percobaan, dan alasan**. Pada soal cascade, anggap aturan berasal dari stylesheet author yang sama, tanpa layer/important kecuali disebutkan.

### Latihan 01 — Membaca selector

Apa perbedaan `.kartu.judul` dengan `.kartu .judul`? Beri satu contoh HTML yang cocok untuk masing-masing.

<details>
<summary>Pembahasan 01</summary>

`.kartu.judul` memilih satu elemen dengan kedua class:

```html
<h2 class="kartu judul">Satu elemen, dua class</h2>
```

`.kartu .judul` memilih keturunan dengan class judul di dalam elemen berkelas kartu:

```html
<article class="kartu"><h2 class="judul">Dua elemen</h2></article>
```

Spasi adalah combinator keturunan, bukan hiasan penulisan.

</details>

### Latihan 02 — Specificity

```html
<p id="pesan" class="teks">Warna apa?</p>
```

```css
#pesan { color: red; }
.teks { color: blue; }
p.teks { color: green; }
```

Warna apa yang muncul? Bisakah memindahkan `.teks` ke akhir membuatnya menang?

<details>
<summary>Pembahasan 02</summary>

Merah. Selector ID memiliki specificity `1,0,0`. `.teks` `0,1,0` dan `p.teks` `0,1,1`. Urutan kemunculan tidak mengalahkan perbedaan specificity pada kondisi tersebut. Rapikan strategi selector jika ingin perubahan gaya lebih mudah.

</details>

### Latihan 03 — Dua media query sama-sama berlaku

Dengan initial font 16px dan viewport 1200px:

```css
@media (min-width: 60rem) { .judul { font-size: 3rem; } }
@media (min-width: 40rem) { .judul { font-size: 2rem; } }
```

Berapa font size judul dalam rem, dan mengapa?

<details>
<summary>Pembahasan 03</summary>

2rem. Kedua query benar, specificity sama, deklarasi 2rem muncul terakhir. Breakpoint yang lebih besar tidak otomatis lebih kuat. Untuk strategi mobile-first yang dimaksudkan naik bertahap, urutkan batas minimum dari kecil ke besar atau buat struktur aturan yang tidak saling bertentangan.

</details>

### Latihan 04 — Inheritance bukan pertarungan antarinduk dan anak

```css
#wadah { color: red; }
p { color: blue; }
```

```html
<div id="wadah"><p>Halo</p></div>
```

Mengapa paragraf tidak merah? Apa yang terjadi jika `p` diberi `color: inherit`?

<details>
<summary>Pembahasan 04</summary>

Paragraf mempunyai deklarasi langsung biru. Selector ID mengatur induk, bukan paragraf, sehingga tidak dibandingkan sebagai specificity untuk elemen yang sama. Dengan color inherit, paragraf mengambil computed color induknya dan menjadi merah.

</details>

### Latihan 05 — Menghitung box model

Elemen memiliki width 240px, padding 16px pada semua sisi, border 2px pada semua sisi, serta margin horizontal 10px per sisi. Hitung border box dan ruang luar horizontal pada content-box. Ulangi untuk border-box dan hitung lebar content-nya.

<details>
<summary>Pembahasan 05</summary>

- Content-box: border box `240 + 32 + 4 = 276px`; termasuk kedua margin menjadi `296px`.
- Border-box: border box `240px`; termasuk margin `260px`; lebar content `240 - 32 - 4 = 204px`.

Margin tetap di luar ukuran width. Angka ini mengasumsikan width yang ditentukan dapat dipakai tanpa batas lain yang mengubah used size.

</details>

### Latihan 06 — Memahami em

Induk mempunyai font size 20px. Anak diberi `font-size: 1.5em` dan `padding: 1em`. Berapa ukuran font dan padding anak?

<details>
<summary>Pembahasan 06</summary>

Font size anak 30px karena em pada font-size mengacu font size induk. Padding anak 30px karena em pada padding mengacu computed font size anak itu sendiri. Jangan menganggap semua em selalu mengacu font induk.

</details>

### Latihan 07 — Sumbu Flexbox

Wadah memakai `display: flex; flex-direction: column; min-height: 24rem;`. Property apa yang kamu gunakan untuk memusatkan item pada main axis, dan arah mana main axis tersebut dalam writing mode horizontal?

<details>
<summary>Pembahasan 07</summary>

Gunakan justify-content: center. Pada flex-direction column dalam writing mode horizontal, main axis vertikal. Wadah harus mempunyai ruang positif yang bisa dibagi; min-height membantu menyediakan ruang jika isi lebih pendek daripada batas itu.

</details>

### Latihan 08 — Grid dan gap

Area grid lebarnya 1000px dan memiliki tiga kolom setara, dengan gap 20px. Berapa lebar setiap kolom jika tidak ada batas lain yang mengubah pembagian?

<details>
<summary>Pembahasan 08</summary>

Ada dua gap, total 40px. Ruang kolom `1000 - 40 = 960px`, sehingga setiap kolom 320px. Menetapkan masing-masing width 33.333% lalu menambah gap dapat membuat kebutuhan ruang melebihi 100%.

</details>

### Latihan 09 — Menemukan penyebab overflow

Sebuah item flex berisi URL sangat panjang. Container mempunyai width yang benar, tetapi halaman tetap meluber. Sebutkan dua aturan yang layak dicoba dan fungsi masing-masing.

<details>
<summary>Pembahasan 09</summary>

```css
.item { min-width: 0; }
.item p { overflow-wrap: anywhere; }
```

Aturan pertama mengizinkan item menyusut melampaui minimum otomatis yang semula mempertahankan isi. Aturan kedua menyediakan peluang pemenggalan teks panjang. Periksa elemen yang benar melalui DevTools; jangan mengganti diagnosis dengan overflow hidden pada body.

</details>

### Latihan 10 — Memilih Flexbox atau Grid

Pilih titik awal untuk: (a) tiga tombol aksi, (b) galeri dengan kolom selaras antarbaris, (c) isi kartu dengan tombol di bagian bawah. Jelaskan alasanmu.

<details>
<summary>Pembahasan 10</summary>

(a) Flexbox, karena hubungan utamanya deretan tombol. (b) Grid, karena track kolom perlu dibagi antarbaris. (c) Flexbox column dengan auto margin adalah pilihan sederhana; Grid juga bisa jika struktur row lebih sesuai. Pilihan dinilai dari hubungan layout yang hendak diatur, bukan hanya ukuran komponen.

</details>

### Latihan 11 — Membuat daftar kartu responsif

Buat daftar yang satu kolom pada ruang sempit, dua kolom mulai 40rem, dan tiga kolom mulai 64rem. Jangan memakai width 33% pada setiap kartu.

<details>
<summary>Pembahasan 11</summary>

```css
.daftar {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}

@media (min-width: 40rem) {
  .daftar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 64rem) {
  .daftar { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

Periksa teks dan gambar di dalamnya. Track fleksibel tidak bisa memperbaiki semua konten dengan width/min-width tetap yang terlalu lebar.

</details>

### Latihan 12 — Menentukan breakpoint

Navigasi mulai saling bertabrakan pada lebar tertentu. Mengapa memilih breakpoint berdasarkan label “tablet” saja kurang cukup? Tuliskan cara menentukannya dari konten.

<details>
<summary>Pembahasan 12</summary>

Panjang teks, font, jumlah tautan, zoom, dan lebar jendela berbeda-beda. Lebarkan/persempit viewport perlahan, temukan saat komposisi tidak lagi nyaman, lalu atur wrapping atau perubahan susunan di sekitar kebutuhan itu. Uji sebelum dan sesudah batas dengan konten realistis.

</details>

### Latihan 13 — Menghitung clamp

Dengan root 16px, berapa hasil `clamp(2rem, 1.25rem + 3vw, 3.5rem)` pada viewport 800px? Apakah satu hitungan ini cukup untuk menjamin perilaku zoom benar?

<details>
<summary>Pembahasan 13</summary>

Batas bawah 32px, pilihan `20 + 24 = 44px`, batas atas 56px. Hasil 44px. Satu hitungan tidak menjamin perilaku zoom atau text resizing; uji di beberapa lebar dan tingkat pembesaran. Jika perlu, gunakan skala rem dengan breakpoint yang lebih mudah dievaluasi.

</details>

### Latihan 14 — `cover` atau `contain`?

Kamu mempunyai foto sampul artikel dan gambar diagram jaringan yang seluruh labelnya penting. Pilih object-fit yang sesuai jika keduanya dimasukkan dalam area berasio tetap.

<details>
<summary>Pembahasan 14</summary>

Foto sampul dapat memakai cover jika pemotongan tidak menghilangkan informasi penting. Diagram lebih sesuai contain agar seluruh label terlihat, atau jangan memaksanya masuk rasio yang tidak cocok. Cover dapat memangkas gambar; contain dapat menyisakan ruang.

</details>

### Latihan 15 — Fokus dan status error

Desainmu menghapus seluruh outline dan menandai input salah hanya dengan border merah. Apa dua perbaikan utama?

<details>
<summary>Pembahasan 15</summary>

Sediakan indikator focus-visible yang jelas dan tidak terpotong. Tambahkan pesan error berbentuk teks yang dikaitkan dengan kontrol, serta perbarui status seperti aria-invalid pada waktu yang tepat. Warna saja tidak cukup, dan tampilan CSS tidak menggantikan logika validasi.

</details>

### Latihan 16 — Stacking context

Panel A mempunyai z-index 1, panel B z-index 2, dan tooltip di A z-index 9999. Pada konteks seperti Bab 18, mengapa tooltip tetap di belakang panel B?

<details>
<summary>Pembahasan 16</summary>

Tooltip berada dalam stacking context panel A. Kelompok A dibandingkan terhadap B pada induknya. Angka anak yang besar tidak melompati kelompok induknya. Perbaiki penempatan/konteks yang tepat atau gunakan mekanisme overlay yang sesuai, bukan sekadar menaikkan angka.

</details>

### Latihan 17 — Media query atau container query?

Kartu yang sama dipakai dalam sidebar 300px dan area utama 800px, sementara viewport keduanya sama. Apa pilihan yang memungkinkan tampilan berbeda berdasarkan ruang masing-masing?

<details>
<summary>Pembahasan 17</summary>

Container size query pada ancestor masing-masing kartu. Media query width melihat viewport yang sama, sehingga tidak membedakan kedua lebar wadah. Sediakan versi dasar yang tetap berguna jika peningkatan container query tidak tersedia.

</details>

### Latihan 18 — Mendesain ulang kartu

Ambil kartu Bab 15. Buat dua versi yang sama-sama nyaman: satu untuk materi kuliah, satu untuk portofolio pribadi. Pertahankan isi dan struktur HTML.

<details>
<summary>Kriteria pembahasan 18</summary>

Tidak ada satu jawaban visual. Periksa apakah kedua versi mempunyai hierarki yang jelas, kontras terukur, jarak konsisten, tautan yang dikenali, dan perilaku yang baik saat teks bertambah. Jelaskan keputusan dengan tujuan pengguna, misalnya label formal pada materi dan aksen lebih personal pada portofolio.

</details>

### Latihan 19 — Perluas proyek

Tambahkan bagian “Proyek siswa” berisi empat kartu ke Ruang Kode. Buat satu kartu mempunyai judul panjang, satu berisi URL panjang, dan satu memakai ringkasan dua kali lebih panjang daripada yang lain.

<details>
<summary>Kriteria pembahasan 19</summary>

- Section mempunyai heading dan tujuan anchor yang benar jika ditautkan dari navigasi.
- Grid tidak memaksa seluruh halaman melebar pada 320 CSS px.
- Isi tidak dipotong demi menyamakan tinggi.
- Tautan mempunyai tujuan nyata dan nama yang menjelaskan tindakannya.
- Fokus keyboard tetap terlihat dan urutan baca masuk akal.
- Warna, radius, dan jarak menggunakan sistem yang sudah ada.

Reuse pola kartu atau buat variasi kecil yang jelas. Hindari menyalin seluruh stylesheet hanya untuk mengubah satu warna.

</details>

### Latihan 20 — Jelaskan, jangan hanya tunjukkan

Buat laporan singkat tentang halamanmu: satu masalah, satu hipotesis penyebab, perubahan yang kamu lakukan, hasil pengujian, dan kondisi yang belum kamu periksa.

<details>
<summary>Contoh pembahasan 20</summary>

“Pada viewport 320px, kartu membuat seluruh halaman bisa digeser mendatar. Aku menduga lebar minimum track 24rem melebihi ruang container. Aku menggantinya dengan minmax(min(100%, 16rem), 1fr). Pada 320px dan 375px kartu sekarang mengikuti ruang, sementara 1024px tetap mempunyai beberapa kolom. Aku sudah memeriksa judul panjang dan fokus keyboard, tetapi belum menguji browser di ponsel fisik.”

Laporan ini lebih berguna daripada “sudah responsif”, karena menyatakan penyebab, perubahan, bukti, dan batas pemeriksaan.

</details>

<a id="bab-33"></a>
## 33. Rencana belajar 14 sesi

Gunakan sekitar 45–90 menit per sesi jika cocok dengan jadwalmu. Kamu boleh mengulang satu sesi beberapa kali. Pindah materi setelah bisa mengerjakan tugas kecilnya tanpa menyalin seluruh solusi.

| Sesi | Fokus | Hasil yang harus kamu buat |
| ---: | --- | --- |
| 1 | HTML, pemasangan CSS, sintaks | Kartu pertama yang bisa dibuka di browser |
| 2 | Selector dan state | Variasi kartu dan fokus tautan yang jelas |
| 3 | Cascade dan inheritance | Penjelasan tiga eksperimen pada Lab 01 |
| 4 | Box model dan display | Perbandingan dua kotak dengan hitungan ukuran |
| 5 | Unit, sizing, overflow | Container yang tidak meluber dan teks panjang yang tertangani |
| 6 | Spacing dan tipografi | Halaman artikel dengan ritme baca yang nyaman |
| 7 | Warna dan hierarki | Dua tema visual memakai struktur HTML yang sama |
| 8 | Flexbox | Navigasi, toolbar, dan kartu dengan aksi di bawah |
| 9 | Grid | Galeri dengan track yang sejajar dan minimum yang aman |
| 10 | Responsif dan media query | Layout satu kolom yang berubah saat konten cukup ruang |
| 11 | Media dan container query | Gambar proporsional dan Lab 03 yang bisa dijelaskan |
| 12 | Komponen dan aksesibilitas | Form error, FAQ, serta uji keyboard/resize |
| 13 | Proyek dan debugging | Modifikasi Ruang Kode sesuai tema pilihanmu |
| 14 | Evaluasi dan penyempurnaan | Proyek kecil mandiri dengan catatan pengujian |

### Format catatan belajarmu

```text
Konsep:
Prediksi sebelum mencoba:
Perubahan yang kulakukan:
Hasil yang kulihat:
Penjelasan penyebab:
Hal yang masih ingin kuperiksa:
```

### Proyek setelah panduan ini

Pilih satu: portofolio mahasiswa, katalog materi praktikum, halaman kegiatan kampus, atau artikel tutorial. Batasi ruang lingkup pertama menjadi satu halaman dengan 4–6 bagian. Selesaikan struktur, responsivitas, dan aksesibilitas dasarnya sebelum menambah banyak dekorasi.

<a id="bab-34"></a>
## 34. Checklist, resep cepat, dan ringkasan

### Sebelum menyatakan halaman selesai

- [ ] HTML memakai elemen sesuai makna dan urutan heading masuk akal.
- [ ] Semua link menuju tujuan yang tersedia; semua kontrol mempunyai fungsi yang jelas.
- [ ] Meta viewport ada dan pengguna tetap dapat melakukan zoom.
- [ ] Layout menggunakan normal flow/Flexbox/Grid sesuai hubungan kontennya.
- [ ] Container mempunyai lebar yang nyaman di layar luas.
- [ ] Tidak ada scroll horizontal seluruh halaman yang tidak diperlukan pada ruang sempit.
- [ ] Teks panjang, judul dua baris, dan item tambahan sudah diuji.
- [ ] Gambar tidak terdistorsi; dimensi/rasio dan alternatif teks sesuai kebutuhan.
- [ ] Skala jarak, tipografi, radius, serta warna konsisten.
- [ ] Kontras telah diperiksa untuk pasangan foreground-background yang relevan.
- [ ] Fokus keyboard terlihat, urutan fokus masuk akal, dan tujuan anchor tidak tertutup.
- [ ] Hover bukan satu-satunya jalur menuju fungsi atau informasi.
- [ ] Teks 200% dan reflow sempit tidak menghilangkan isi/fungsi.
- [ ] Preferensi reduced-motion dihormati jika ada gerak.
- [ ] Error form mempunyai penjelasan teks dan hubungan dengan kontrolnya.
- [ ] Browser/perangkat target diuji sesuai kebutuhan proyek.
- [ ] Aturan debug sementara dan deklarasi konflik telah dirapikan.

Checklist ini alat kerja, bukan sertifikat bahwa semua kriteria aksesibilitas atau kompatibilitas sudah terpenuhi.

### Resep 1 — Pusatkan satu kotak dalam area

```css
.area {
  display: grid;
  place-items: center;
  min-height: 20rem;
}
```

Pusat pada dua sumbu. Tanpa ruang ekstra, pemusatan bisa tidak terlihat.

### Resep 2 — Container dengan ruang tepi

```css
.container {
  width: min(100% - 2rem, 70rem);
  margin-inline: auto;
}
```

### Resep 3 — Kumpulan kartu otomatis

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1.5rem;
}
```

### Resep 4 — Sidebar pada layar cukup lebar

```css
.layout {
  display: grid;
  gap: 2rem;
}

@media (min-width: 60rem) {
  .layout {
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}
```

### Resep 5 — Label dan tombol dalam satu baris yang bisa membungkus

```css
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
```

### Resep 6 — Teks panjang tidak memaksa item melebar

```css
.flex-item,
.grid-item {
  min-inline-size: 0;
  overflow-wrap: anywhere;
}
```

### Resep 7 — Anchor tidak tertutup header lengket

```css
html {
  scroll-padding-block-start: 6rem;
}

.tujuan-anchor {
  scroll-margin-block-start: 1rem;
}
```

Sesuaikan dengan header nyata, termasuk saat header menjadi lebih tinggi akibat wrapping atau pembesaran teks. Kedua property dapat bekerja bersama; jangan menggandakan ruang tanpa memeriksa hasilnya.

### Resep 8 — Gambar kartu dengan rasio seragam

```css
.foto {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
```

Pakai contain atau rasio alami jika seluruh isi gambar perlu terlihat.

### Property yang perlu cepat kamu kenali

| Kelompok | Property penting | Pertanyaan yang dijawab |
| --- | --- | --- |
| Pemilihan model | `display` | Bagaimana elemen/anaknya ditata? |
| Ukuran | `width`, `height`, `min-*`, `max-*`, `aspect-ratio` | Seberapa besar dan apa batasnya? |
| Ruang | `margin`, `padding`, `gap` | Jarak luar, dalam, atau antaritem? |
| Kotak | `box-sizing`, `border`, `border-radius`, `outline` | Bagaimana tepi dan ukuran dihitung? |
| Teks | `font-*`, `line-height`, `letter-spacing`, `text-*` | Bagaimana teks dibaca dan ditekankan? |
| Permukaan | `color`, `background-*`, `box-shadow`, `opacity` | Bagaimana warna dan kedalaman terlihat? |
| Flexbox | `flex-*`, `justify-content`, `align-*` | Bagaimana ruang pada sumbu dibagi? |
| Grid | `grid-template-*`, `grid-column`, `grid-row`, `grid-area` | Bagaimana track dan area diatur? |
| Penempatan | `position`, `inset-*`, `z-index` | Bagaimana elemen melekat atau bertumpuk? |
| Overflow | `overflow-*`, `overflow-wrap`, `white-space` | Apa yang terjadi saat isi tidak muat? |
| Gerak | `transform`, `transition`, `animation` | Bagaimana perubahan divisualisasikan? |
| Token | `--nama`, `var()` | Nilai apa yang perlu konsisten/dapat diganti? |
| Kondisi | `@media`, `@container`, `@supports` | Kapan aturan tertentu diterapkan? |

### Lima pertanyaan sebelum menambahkan property baru

1. Hubungan apa yang sebenarnya ingin kuatur?
2. Apakah elemen yang kutargetkan sudah benar?
3. Apakah ada aturan yang mengalahkan deklarasiku?
4. Apa yang terjadi jika teks dua kali lebih panjang?
5. Apa yang terjadi jika ruang berkurang atau pengguna memperbesar teks?

Jika kamu bisa menjawabnya, keputusan CSS-mu akan makin terarah.

<a id="bab-35"></a>
## 35. Glosarium dan rujukan untuk melanjutkan

### Glosarium singkat

| Istilah | Makna praktis |
| --- | --- |
| Accessibility tree | Representasi informasi aksesibel yang digunakan teknologi bantu |
| Alignment | Penempatan item terhadap sumbu atau area tertentu |
| Ancestor | Elemen induk, induk dari induk, dan seterusnya |
| Breakpoint | Kondisi batas yang memicu perubahan presentasi |
| Cascade | Proses memilih deklarasi yang menang |
| Class | Label yang dapat dipakai ulang untuk memilih elemen |
| Computed value | Nilai property setelah proses perhitungan tertentu, sebelum/terlepas dari rincian used size layout |
| Containing block | Kotak acuan untuk ukuran atau penempatan tertentu |
| Custom property | Property bernama `--...` yang nilainya dapat dipakai melalui var() |
| Declaration | Pasangan property dan value |
| Descendant | Elemen anak, cucu, dan keturunan berikutnya |
| DOM | Representasi struktur dokumen yang dapat dibaca browser dan dimanipulasi program |
| Flow | Alur penempatan kotak dalam dokumen |
| Formatting context | Lingkungan dengan aturan penyusunan kotak tertentu |
| Intrinsic size | Ukuran yang berkaitan dengan karakteristik/isi elemen itu sendiri |
| Inheritance | Mekanisme mengambil nilai property dari induk bila sesuai |
| Main/cross axis | Sumbu utama dan silang pada Flexbox |
| Normal flow | Susunan dasar kotak sebelum penempatan khusus seperti absolute |
| Overflow | Isi atau tampilan yang melampaui batas yang tersedia |
| Progressive enhancement | Menjaga dasar yang berguna, lalu menambah kemampuan ketika didukung |
| Pseudo-class | Selector berdasarkan state atau hubungan tertentu |
| Pseudo-element | Bagian tampilan yang ditargetkan seperti before atau marker |
| Reflow | Penyusunan ulang presentasi agar konten tetap dapat dibaca pada ruang berubah; istilah ini juga dipakai dalam konteks layout browser |
| Responsive | Presentasi yang beradaptasi terhadap ruang/kondisi penggunaan |
| Selector | Pola untuk mencocokkan elemen |
| Source order | Urutan kemunculan deklarasi/stylesheet yang relevan |
| Specificity | Perbandingan kekhususan selector pada tahap cascade yang sesuai |
| Stacking context | Kelompok penumpukan yang diperlakukan sebagai unit terhadap konteks induk |
| Style token | Nilai bernama yang mewakili keputusan desain berulang |
| Track | Satu baris atau kolom pada Grid |
| Used value | Nilai yang digunakan saat layout setelah rincian yang diperlukan dapat ditentukan |
| Viewport | Area tempat halaman ditampilkan |
| Whitespace | Ruang kosong yang membantu pemisahan dan pengelompokan visual |

### Cara membaca dokumentasi property

Saat menemukan property baru, cari: fungsi, nilai yang diterima, initial value, apakah diwariskan, elemen/konteks tempat ia berlaku, acuan persentasenya, serta kompatibilitas. Lalu buat contoh paling kecil untuk membuktikan pemahamanmu.

Spesifikasi W3C/CSSWG menjelaskan aturan formal. Materi web.dev dan dokumentasi DevTools lebih mudah dijadikan pendamping praktik. Beberapa modul di bawah masih berstatus draft; keberadaan suatu fitur dalam draft **bukan** bukti bahwa semua browser sudah menerapkannya.

### Rujukan primer

Referensi diperiksa pada 19 Oktober 2026. Link menuju dokumentasi aslinya, bukan salinan tulisan pihak lain. Contoh proyek dan latihan pada README ini dibuat untuk panduan ini; referensi dipakai untuk memeriksa perilaku teknis dan ketentuan aksesibilitas.

| ID | Sumber | Gunakan untuk |
| --- | --- | --- |
| <a id="r01"></a>R01 | [W3C — CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/) | Cascade, layer, pewarisan |
| <a id="r02"></a>R02 | [W3C — CSS Cascading and Inheritance Level 6](https://www.w3.org/TR/css-cascade-6/) | Perkembangan scope dan cascade; perhatikan status draft |
| <a id="r03"></a>R03 | [web.dev — Box Model](https://web.dev/learn/css/box-model) | Content, padding, border, margin |
| <a id="r04"></a>R04 | [web.dev — Selectors](https://web.dev/learn/css/selectors) | Pola selector dan pencocokan elemen |
| <a id="r05"></a>R05 | [web.dev — Inheritance](https://web.dev/learn/css/inheritance) | Pewarisan dan keyword |
| <a id="r06"></a>R06 | [web.dev — Sizing Units](https://web.dev/learn/css/sizing) | Satuan dan acuan ukurannya |
| <a id="r07"></a>R07 | [web.dev — Text and Typography](https://web.dev/learn/css/typography) | Font dan pengaturan teks |
| <a id="r08"></a>R08 | [web.dev — Logical Properties](https://web.dev/learn/css/logical-properties) | Inline/block dan writing mode |
| <a id="r09"></a>R09 | [web.dev — Flexbox](https://web.dev/learn/css/flexbox) | Sumbu, distribusi ruang, wrapping |
| <a id="r10"></a>R10 | [web.dev — Grid](https://web.dev/learn/css/grid) | Track, penempatan, ukuran fleksibel |
| <a id="r11"></a>R11 | [web.dev — Media Queries](https://web.dev/learn/design/media-queries) | Kondisi viewport dan responsif |
| <a id="r12"></a>R12 | [web.dev — Responsive Images](https://web.dev/learn/design/responsive-images) | srcset, sizes, picture |
| <a id="r13"></a>R13 | [web.dev — Container Queries](https://web.dev/learn/css/container-queries) | Responsif berdasarkan wadah |
| <a id="r14"></a>R14 | [Chrome for Developers — View and Change CSS](https://developer.chrome.com/docs/devtools/css/) | Styles, Computed, debugging |
| <a id="r15"></a>R15 | [W3C WAI — Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | Reflow dan ruang setara 320 CSS px |
| <a id="r16"></a>R16 | [W3C WAI — Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Rasio kontras teks dan large text |
| <a id="r17"></a>R17 | [W3C WAI — Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Kontras kontrol, state, dan grafis yang relevan |
| <a id="r18"></a>R18 | [W3C WAI — Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Target pointer dan pengecualiannya |
| <a id="r19"></a>R19 | [W3C WAI — Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) | Pembesaran teks 200% |
| <a id="r20"></a>R20 | [W3C — CSS Conditional Rules Level 3](https://www.w3.org/TR/css-conditional-3/) | Feature query dan supports |
| <a id="r21"></a>R21 | [W3C — CSS Nesting Level 1](https://www.w3.org/TR/css-nesting-1/) | Aturan nesting native |
| <a id="r22"></a>R22 | [W3C — CSS Grid Layout Level 2](https://www.w3.org/TR/css-grid-2/) | Subgrid dan aturan grid lanjutan |
| <a id="r23"></a>R23 | [W3C — Selectors Level 4](https://www.w3.org/TR/selectors-4/) | is, where, has, dan specificity |
| <a id="r24"></a>R24 | [web.dev — Animations](https://web.dev/learn/css/animations) | Keyframes dan property animasi |
| <a id="r25"></a>R25 | [web.dev — Z-index and Stacking Contexts](https://web.dev/learn/css/z-index) | Kelompok penumpukan |
| <a id="r26"></a>R26 | [W3C — CSS Values and Units Level 4](https://www.w3.org/TR/css-values-4/) | Unit viewport, calc, min, max, clamp |
| <a id="r27"></a>R27 | [W3C — Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/) | Preferensi pengguna dan fitur media |

### Pegangan saat kamu mulai membuat halaman sendiri

Bangun satu komponen yang bisa kamu jelaskan. Uji dengan isi dan ruang yang berbeda. Ketika hasilnya belum sesuai, periksa pencocokan aturan, cascade, ukuran kotak, lalu hubungan layout-nya. Kebiasaan ini akan membantumu menggunakan fitur CSS baru tanpa kehilangan pemahaman atas dasar-dasarnya.
