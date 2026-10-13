# Latihan UTS Komunikasi Data dan Jaringan Komputer (KDJK)

Aplikasi web latihan mandiri interaktif untuk menghadapi Ujian Tengah Semester (UTS) mata kuliah Komunikasi Data dan Jaringan Komputer (KDJK), mengacu pada silabus resmi IPB & buku teks referensi *Leon-Garcia & Widjaja*.

---

## 1. Fitur Utama

- **Beranda (Dashboard):**
  - Statistik total soal dijawab, akurasi rata-rata, dan penghitung streak harian.
  - Target harian interaktif (dapat disesuaikan) dengan progress bar.
  - Tombol mulai latihan cepat (Pilihan Ganda, Benar/Salah, Isian, Cocokkan, Flashcard, Simulasi UTS).
  - Fokus Penguatan: Rekomendasi otomatis bab dengan akurasi terendah untuk dipelajari lebih dalam.
  - Progres per Bab (Bab 1–6): Menampilkan akurasi, status hafal kartu, esai selesai, dan total soal dijawab.
- **Ringkasan:**
  - 66 konsep inti dan rangkuman komprehensif Bab 1–6 berdasarkan materi kuliah & rangkuman PDF.
  - Pencarian konsep real-time (misal: *Nyquist*, *Shannon*, *Manchester*, *ARQ*, *ALOHA*, *CSMA/CD*, dll).
  - Tombol bookmark (★) untuk menandai konsep penting.
- **Kartu Flashcard:**
  - Sistem pengulangan berjarak (Spaced Repetition / Leitner Box 1–3).
  - Kartu dengan animasi flip untuk melatih memori aktif sebelum membaca jawaban.
  - Status penguasaan kartu (Hafal / Belum Hafal) tersimpan permanen.
- **Pilihan Ganda (90 Soal):**
  - 15 soal per bab lengkap dengan 4 opsi pilihan jawaban (A, B, C, D).
  - Validasi seketika (hijau untuk benar, oranye/merah untuk salah) dan pembahasan detail.
- **Benar / Salah (90 Soal):**
  - Pernyataan konsep dan jebakan ujian dengan penjelasan logis di setiap soal.
- **Cocokkan Pasangan (18 Set):**
  - 3 set pasangan per bab (masing-masing 5 pasangan istilah & deskripsi/fungsi).
  - Evaluasi skor otomatis dan petunjuk jawaban benar untuk pasangan yang salah.
- **Isian Singkat (90 Soal):**
  - Soal isian terminologi dan angka hitungan dengan algoritma pencocokan cerdas Levenshtein Distance (toleran terhadap typo kecil & spasi).
- **Ulangi Soal Salah (Wrong Review Bank):**
  - Mengumpulkan seluruh soal yang pernah salah di mode PG, BS, Isian, maupun Cocokkan.
  - Soal resmi lulus dari bank salah setelah dijawab benar 2 kali berturut-turut.
- **Esai Komprehensif (18 Soal):**
  - Soal hitungan dan arsitektur berbobot tinggi dengan accordion dan pembahasan mendalam bertabel/berpoin.
  - Tombol tandai sudah dipelajari.
- **Simulasi Ujian UTS:**
  - Mock exam 25 soal acak dari semua bab dengan proporsi campuran (PG, BS, Isian, Cocokkan).
  - Timer hitung mundur (pilihan 20, 35, atau 50 menit), grid navigator soal, dan penanda ragu-ragu.
  - Evaluasi nilai akhir (0–100), grafik evaluasi per kategori soal, serta review pembahasan lengkap per butir.
- **Alat Pendukung Belajar:**
  - Pomodoro Timer (Fokus, Istirahat Pendek, Istirahat Panjang).
  - Generator Suara Ambien Web Audio API (White Noise, Rain, Cafe, Pink Noise).
- **Offline & Portabilitas:**
  - PWA Offline Ready via Service Worker (`sw.js`).
  - Ekspor dan Impor progres belajar dalam format JSON.
  - Tombol reset progres untuk mengulang dari awal.

---

## 2. Struktur Folder & Modul

```
BelajarKDJK/
├── index.html            # File utama aplikasi
├── PLAN.md               # Dokumentasi arsitektur dan panduan
├── manifest.json         # Konfigurasi PWA (Progressive Web App)
├── sw.js                 # Service worker untuk akses offline
├── vercel.json           # Konfigurasi deployment hosting
├── css/
│   ├── style.css         # Styling tema neo-brutalist pop, tombol & layout
│   ├── tools.css         # Styling timer Pomodoro & ambient sound
│   └── sim.css           # Styling ruang simulasi ujian & lembar hasil
└── js/
    ├── data.js           # Bank soal (PG, B, F, M, E, C) Bab 1–6
    ├── storage.js        # Manajemen state persisten namespace 'kdjk_v1'
    ├── app.js            # Controller UI, router, quiz engine, & simulasi
    └── tools.js          # Web Audio API ambient sound & Pomodoro controller
```

---

## 3. Cakupan Materi Bab 1–6

1. **Bab 1: Pengantar Jaringan Komunikasi**
   - Layanan vs Aplikasi, Masalah N(N-1)/2, Tiga Arsitektur Switching (Telegraf, Telepon, Internet), PCM 64 kbps, T-1 1.544 Mbps, ARPANET, Hukum Moore & Metcalfe, Standar IETF/ITU/IEEE.
2. **Bab 2: Arsitektur Berlapis, OSI, TCP/IP & Socket**
   - Layering, SAP, SDU/PDU, Encapsulation, 7 Layer OSI vs 4 Layer TCP/IP, Addressing (MAC 48-bit, IP 32-bit, Port 16-bit), Alur Web Browsing, Berkeley Socket API (TCP SOCK_STREAM vs UDP SOCK_DGRAM), HTTP 1.0 vs 1.1, Email (SMTP, POP3, IMAP), Utilitas IP (Ping, Traceroute, ARP, DNS).
3. **Bab 3: Dasar-Dasar Transmisi Digital**
   - Block vs Stream, Delay Transmisi vs Delay Propagasi, Teorema Sampling Nyquist (fs ≥ 2fm), Kuantisasi & SQNR, Batas Nyquist Noiseless (C = 2B log2 M), Kapasitas Shannon Noisy (C = B log2(1 + SNR)), Line Coding (NRZ, NRZ-I, Bipolar AMI, Manchester), Modulasi Digital (ASK, FSK, PSK, QAM), Media Transmisi, Deteksi Error (Parity, Checksum, CRC).
4. **Bab 4: Multiplexing, Switching, Jaringan Telepon & Seluler**
   - FDM, WDM, TDM Sinkron vs Statistik, Space Division Switching (Crossbar & Multistage Clos), Time Division Switching (TSI - Speech & Connection Memory), Arsitektur PSTN, Signaling In-band vs Out-of-band (SS7), Evolusi Seluler 1G s.d. 5G (eMBB, mMTC, URLLC), Frequency Reuse & Handoff, Arsitektur GSM (MS, BSS, NSS).
5. **Bab 5: Peer-to-Peer Protocols & Data Link Layer**
   - Service Models, Prinsip ARQ, Stop-and-Wait ARQ (Efisiensi η = (1-Pf)/(1+2a)), Go-Back-N ARQ (Window Ws ≤ 2^m - 1), Selective Repeat ARQ (Ws = Wr ≤ 2^(m-1)), Sliding Window Flow Control, Timing Recovery & Play-out buffer (RTP), TCP Three-Way Handshake & Teardown, RTT Estimation, Framing Data Link (Byte Stuffing & Bit Stuffing '01111110'), Protokol HDLC & PPP.
6. **Bab 6: Medium Access Control (MAC) & Local Area Networks (LAN)**
   - Broadcast Networks & Peran MAC, Pure ALOHA (S_max = 18.4% pada G=0.5), Slotted ALOHA (S_max = 36.8% pada G=1.0), CSMA (1-persistent, non-persistent, p-persistent), CSMA/CD & Binary Exponential Backoff, Syarat Panjang Frame Minimum (64 Byte pada Ethernet), Scheduling (Polling & Token Ring), Evolusi Ethernet (10Base5, 10Base2, 10Base-T, Fast & Gigabit), Format Frame Ethernet 802.3 & Alamat MAC OUI, Transparent Bridge / Switch (Learning, Filtering, Forwarding, Flooding), Spanning Tree Protocol (STP), VLAN (802.1Q), Wireless LAN (802.11 CSMA/CA & RTS/CTS).
