/**
 * data.js - Bank Soal & Materi Lengkap UTS Komunikasi Data dan Jaringan Komputer (KDJK)
 * Referensi: 6 Bab Resmi (Leon-Garcia & Widjaja) + Bank Soal JSON (90 PG, 90 BS, 90 Isian, 18 Cocokkan) + 18 Esai Komprehensif
 */

const CHAPTER_NAMES = {
  1: 'Pengantar Jaringan Komunikasi',
  2: 'Arsitektur Berlapis, OSI & TCP/IP',
  3: 'Dasar-Dasar Transmisi Digital',
  4: 'Multiplexing, Switching & Seluler',
  5: 'Peer-to-Peer Protocols & Data Link',
  6: 'Medium Access Control & LAN'
};

// Ringkasan & Kartu Flashcard: [bab, judul, penjelasan]
const C = [
  [
    1,
    "Layanan vs Aplikasi Komunikasi",
    "Communication network = sekumpulan node dan tautan yang menyediakan layanan komunikasi.\nCommunication service = kemampuan bertukar informasi antar-pengguna di lokasi berbeda.\nApplication = perangkat lunak pengguna yang memanfaatkan service (contoh: browser adalah aplikasi, transfer berkas HTTP adalah service)."
  ],
  [
    1,
    "Masalah N² (The N² Problem)",
    "Menghubungkan N pengguna secara langsung (full mesh) membutuhkan N(N-1)/2 sambungan fisik.\nContoh: 1.000 pengguna butuh 499.500 kabel!\nSolusinya adalah circuit switching dengan Central Office (CO), mereduksi koneksi menjadi cukup N kabel ke saklar pusat."
  ],
  [
    1,
    "Tiga Arsitektur Switching",
    "1. Telegraf: Message switching (store-and-forward seluruh pesan sebelum diteruskan).\n2. Telepon: Circuit switching (koneksi dedicated end-to-end dibangun saat call setup).\n3. Internet: Packet switching (pesan dipecah menjadi paket-paket kecil dengan header alamat, dirutekan independen secara connectionless)."
  ],
  [
    1,
    "Jaringan Telegraf",
    "Dikembangkan oleh Morse (1844). Menggunakan kode Morse (titik & garis) yang merupakan bentuk kode biner awal.\nSistem store-and-forward menyimpan pesan di stasiun transit sebelum dikirim ke link berikutnya bila link sedang sibuk."
  ],
  [
    1,
    "Digitalisasi Telepon & PCM",
    "Paten telepon Bell (1876). Saklar otomatis pertama ditemukan oleh Strowger (1888).\nSuara analog dikonversi ke PCM digital (1962): sampling 8.000 sampel/detik × 8 bit/sampel = 64 kbps (kanal standar DS0)."
  ],
  [
    1,
    "Carrier T-1 & Transmisi Serat Optik",
    "Sistem transmisi digital carrier T-1 (1961) memultipleks 24 kanal suara 64 kbps menghasilkan laju 1,544 Mbps.\nSerat optik modern dengan WDM dapat membawa 160 sinyal OC-192 (10 Gbps) mencapai kapasitas 1,6 Tbps per serat tunggal."
  ],
  [
    1,
    "Evolusi Internet & ARPANET",
    "ARPANET (1969) mempelopori packet switching dengan IMP (Interface Message Processor).\nPesan dipecah jadi paket di sumber dan disusun ulang (reassembly) di saklar tujuan.\nIP menyediakan layanan transfer paket best-effort tanpa jaminan retransmisi di network layer."
  ],
  [
    1,
    "TCP vs UDP",
    "TCP: connection-oriented, menyediakan aliran byte andal (reliable byte stream), flow control, dan retransmisi.\nUDP: connectionless, transfer blok informasi individual tanpa retransmisi (best-effort), latensi rendah untuk real-time (DNS, video/voice)."
  ],
  [
    1,
    "Hukum Moore vs Metcalfe",
    "Moore's Law: jumlah transistor per keping IC berlipat dua setiap 18-24 bulan (daya komputasi naik eksponensial, harga turun drastis).\nMetcalfe's Law: nilai/kegunaan suatu jaringan sebanding dengan kuadrat jumlah penggunanya (V ∝ N²), mendorong efek jaringan (network effect)."
  ],
  [
    1,
    "Faktor Sukses Layanan Baru",
    "Tiga pilar penentu keberhasilan teknologi: Technology (kelayakan teknis), Market (kebutuhan nyata pengguna & skala), dan Regulation (kebijakan pemerintah, tarif, alokasi spektrum)."
  ],
  [
    1,
    "Organisasi Standarisasi",
    "IETF (Internet Engineering Task Force): menerbitkan dokumen RFC untuk protokol Internet.\nIEEE 802: standar LAN & MAN (802.3 Ethernet, 802.11 WiFi).\nITU-T: standar telekomunikasi global (PSTN, seluler, modem)."
  ],
  [
    2,
    "Konsep Layering & Encapsulation",
    "Layering memecah fungsi komunikasi rumit menjadi modul-modul bertingkat.\nTiap layer N memberi layanan (service) ke layer N+1 di atasnya melalui Service Access Point (SAP).\nEncapsulation: Layer N membungkus Service Data Unit (SDU) dari atasnya dengan menambahkan Header (PCI) menghasilkan Protocol Data Unit (PDU)."
  ],
  [
    2,
    "7 Layer OSI Model",
    "Dari bawah ke atas:\n1. Physical: transmisi bit mentah di media.\n2. Data Link: transfer frame andal bebas error antar-hop.\n3. Network: routing paket end-to-end melintasi banyak jaringan.\n4. Transport: komunikasi proses-ke-proses end-to-end.\n5. Session: manajemen dialog/sesi.\n6. Presentation: enkripsi, kompresi, format data.\n7. Application: antarmuka langsung ke aplikasi pengguna."
  ],
  [
    2,
    "Arsitektur 4-5 Layer TCP/IP",
    "TCP/IP dirancang pragmatis: Application (gabungan OSI 5-7), Transport (TCP/UDP), Internet (IP, ICMP, ARP), dan Network Interface / Link (Data Link & Physical).\nPrinsip Hourglass: IP berada di pinggang sempit menjadi pemersatu berbagai aplikasi di atasnya dan beragam fisik di bawahnya."
  ],
  [
    2,
    "Hierarki Pengalamatan (Addressing)",
    "1. Alamat Fisik / MAC: 48-bit (EUI-48) di Data Link layer, unik pabrikan NIC, untuk komunikasi lokal dalam subnet.\n2. Alamat Logis / IP: 32-bit (IPv4) atau 128-bit (IPv6) di Network layer, hierarkis (Net ID + Host ID) untuk routing global.\n3. Port Number: 16-bit (0–65535) di Transport layer, mengidentifikasi proses/aplikasi spesifik di dalam host."
  ],
  [
    2,
    "Alur Web Browsing Lengkap",
    "1. Resolusi nama www.example.com ke IP via DNS query (UDP port 53).\n2. Host membuka koneksi ke IP server via TCP Three-Way Handshake (port 80/443).\n3. Klien mengirim HTTP GET request.\n4. Server merespons dengan HTTP 200 OK beserta payload HTML/gambar."
  ],
  [
    2,
    "Berkeley Sockets API",
    "Antarmuka pemrograman standar untuk komunikasi jaringan via socket.\nServer TCP: socket() → bind() ke port → listen() → accept() menunggu klien → recv()/send() → close().\nKlien TCP: socket() → connect() ke server IP & port → send()/recv() → close()."
  ],
  [
    2,
    "Socket TCP vs Socket UDP",
    "TCP menggunakan SOCK_STREAM: berorientasi koneksi, urutan data terjamin, aliran byte kontinu, butuh connect() dan accept().\nUDP menggunakan SOCK_DGRAM: connectionless, batas pesan/datagram utuh dipertahankan, kirim langsung via sendto() dan terima via recvfrom()."
  ],
  [
    2,
    "Evolusi HTTP: 1.0 vs 1.1",
    "HTTP/1.0: non-persistent (tiap objek web butuh 1 koneksi TCP baru, memicu overhead handshake berulang).\nHTTP/1.1: persistent connection default (satu koneksi TCP dipakai untuk banyak request objek), mendukung request pipelining dan header wajib Host."
  ],
  [
    2,
    "Protokol Email: SMTP, POP3, IMAP",
    "SMTP (port 25): protokol push untuk mengirim surat antar mail server dan dari klien ke server pengirim.\nPOP3 (port 110): protokol pull untuk mengunduh email ke perangkat lokal (biasanya dihapus dari server).\nIMAP (port 143): sinkronisasi email dua arah antar perangkat langsung di server."
  ],
  [
    2,
    "Utilitas Diagnostik Jaringan IP",
    "Ping: menguji konektivitas end-to-end memakai ICMP Echo Request dan Echo Reply.\nTraceroute: memetakan rute router dengan menaikkan nilai TTL (Time to Live) IP mulai dari 1 sampai tujuan (memicu ICMP Time Exceeded).\nARP: memetakan IP logis ke alamat fisik MAC di LAN."
  ],
  [
    2,
    "Domain Name System (DNS)",
    "Database terdistribusi hierarkis untuk memetakan nama domain ke alamat IP.\nStruktur pohon: Root DNS (.) → Top-Level Domain (.com, .id) → Authoritative Name Server.\nUmumnya berjalan di atas UDP port 53 untuk query cepat, beralih ke TCP bila payload zona > 512 byte."
  ],
  [
    3,
    "Tipe Informasi: Block vs Stream",
    "Block: berorientasi data utuh (teks, program, berkas); sangat sensitif terhadap kesalahan bit (harus 0% error), tetapi toleran terhadap variasi delay.\nStream: berorientasi aliran kontinu real-time (suara, video); toleran terhadap sedikit error bit, namun sangat sensitif terhadap delay dan variasi delay (jitter)."
  ],
  [
    3,
    "Komponen Total Delay Transmisi",
    "Total Delay = Delay Transmisi + Delay Propagasi + Queuing Delay + Processing Delay.\nDelay Transmisi = L / R (L = panjang paket dalam bit, R = laju link bps).\nDelay Propagasi = d / v (d = jarak meter, v = kecepatan rambat ~2×10⁸ m/s di kabel tembaga/optik)."
  ],
  [
    3,
    "Digitalisasi Suara: Nyquist Sampling",
    "Teorema Sampling Nyquist: sinyal band-limited dengan frekuensi maksimum fm dapat direkonstruksi sempurna jika disampling dengan laju fs ≥ 2 fm.\nSuara telepon dibatasi pada 4 kHz (frekuensi nyata 300–3400 Hz), sehingga disampling 2 × 4.000 = 8.000 sampel/detik."
  ],
  [
    3,
    "Kuantisasi & SNR Quantization",
    "Sampel analog diaproksimasi ke tingkat diskret terdekat (L tingkat kuantisasi, n bit = log2 L).\nSetiap penambahan 1 bit kuantisasi meningkatkan Signal-to-Quantization-Noise Ratio (SQNR) sebesar kurang lebih 6 dB (SQNR ≈ 6n + 1,76 dB).\nTelepon PCM menggunakan n = 8 bit (256 tingkat), menghasilkan laju 64 kbps."
  ],
  [
    3,
    "Batas Nyquist (Kanal Noiseless)",
    "Untuk kanal ideal tanpa derau dengan bandwidth B Hz dan sinyal M tingkat diskret:\nKapasitas C = 2B log2(M) bps.\nMenunjukkan bahwa laju data maksimal dibatasi oleh bandwidth kanal dan jumlah simbol diskret yang dapat dibedakan."
  ],
  [
    3,
    "Kapasitas Shannon (Kanal Berderau)",
    "Untuk kanal riil dengan derau termal putih Gaussian (AWGN):\nKapasitas C = B log2(1 + SNR) bps, di mana SNR = S / N (daya sinyal per daya derau dalam rasio linear).\nKonversi dB ke linear: SNR_dB = 10 log10(SNR). Batas Shannon adalah batas teoritis absolut transmisi bebas error."
  ],
  [
    3,
    "Line Coding: NRZ & AMI",
    "NRZ-L: level tegangan mewakili bit (0 tinggi, 1 rendah; ada DC component & kehilangan sinkronisasi pada rentetan bit sama).\nNRZ-I: ada transisi tegangan untuk bit 1, tidak ada transisi untuk bit 0.\nBipolar AMI: bit 0 tegangan 0V, bit 1 bergantian positif dan negatif (+V dan -V), mengeliminasi komponen DC."
  ],
  [
    3,
    "Line Coding Self-Clocking: Manchester",
    "Manchester: selalu ada transisi tegangan tepat di tengah interval bit (0 = transisi tinggi ke rendah, 1 = rendah ke tinggi).\nMemastikan pemulihan clock (self-clocking) dan tanpa komponen DC, tetapi membutuhkan bandwidth 2× lipat dibanding NRZ.\nDigunakan pada Ethernet klasik 10Base-T."
  ],
  [
    3,
    "Modulasi Digital: ASK, FSK, PSK, QAM",
    "ASK: amplitudo pembawa bervariasi sesuai bit.\nFSK: frekuensi pembawa bergeser sesuai bit.\nPSK: fasa gelombang pembawa bergeser (BPSK = 2 fasa / 1 bit; QPSK = 4 fasa / 2 bit per simbol).\nQAM: modulasi kombinasi amplitudo dan fasa (misal 16-QAM = 4 bit/simbol, 64-QAM = 6 bit/simbol) untuk efisiensi spektral tinggi."
  ],
  [
    3,
    "Media Transmisi Fisik",
    "Twisted Pair (UTP/STP): lilitan kabel membatalkan interferensi elektromagnetik (Cat5e/Cat6 hingga 1-10 Gbps pada jarak 100m).\nCoaxial: pelindung logam kuat terhadap noise (10Base5/10Base2, TV kabel).\nSerat Optik: pulsa cahaya via pantulan internal total; redaman sangat rendah, kebal EMI, kapasitas Tbps."
  ],
  [
    3,
    "Deteksi Error: Parity, Checksum & CRC",
    "Parity check: menambahkan 1 bit genap/ganjil (hanya mendeteksi jumlah error ganjil).\nInternet Checksum: penjumlahan one's complement 16-bit dari blok data (digunakan di IP/TCP/UDP).\nCRC (Cyclic Redundancy Check): pembagian polinomial biner modulo-2 menghasilkan Frame Check Sequence (FCS); sangat kuat mendeteksi burst error."
  ],
  [
    4,
    "Konsep Multiplexing: FDM vs WDM vs TDM",
    "Multiplexing menggabungkan banyak aliran sinyal ke dalam satu media transmisi bersama.\nFDM: membagi spektrum frekuensi menjadi kanal-kanal kecil (radio, TV analog, DSL).\nWDM: FDM pada serat optik dengan membagi panjang gelombang cahaya (λ).\nTDM: membagi domain waktu menjadi slot-slot waktu bergantian."
  ],
  [
    4,
    "TDM Sinkron vs TDM Statistik",
    "TDM Sinkron: setiap pengguna mendapat slot waktu tetap pada frame secara periodik; jika pengguna diam, slot tetap kosong (terbuang).\nTDM Statistik (Asinkron): slot waktu hanya diberikan kepada pengguna yang aktif mengirim data via antrean buffer; efisiensi link jauh lebih tinggi."
  ],
  [
    4,
    "Space Division Switching: Crossbar & Clos",
    "Crossbar Switch: matriks N input × N output dengan N² titik sambung (crosspoint). Kelemahan: boros komponen untuk N besar dan single point of failure.\nMultistage Clos Network: jaringan saklar 3 tingkat (N/n × k); kondisi non-blocking penuh tercapai jika jumlah saklar tengah k ≥ 2n - 1."
  ],
  [
    4,
    "Time Division Switching: TSI",
    "Time Slot Interchange (TSI) menukar urutan slot waktu antar frame menggunakan memori RAM.\nTerdiri atas Speech Memory (menyimpan byte suara yang masuk) dan Connection Memory (menentukan urutan pembacaan byte ke output).\nMenghilangkan kebutuhan saklar fisik silang yang rumit."
  ],
  [
    4,
    "Hierarki Jaringan Telepon (PSTN)",
    "Subscriber Loop (Local Loop): sepasang kabel tembaga dari rumah pelanggan ke Central Office (CO/End Office).\nToll/Tandem Switch: saklar perantara menghubungkan antar-CO di area metropolitan.\nHierarki berjenjang (Class 5 End Office hingga Class 1 Regional Center) untuk efisiensi rute trunk antar-kota."
  ],
  [
    4,
    "Signaling: In-Band vs Out-of-Band (SS7)",
    "In-band signaling: sinyal kontrol (nada panggil, pulsa digit) dikirim di kanal pembicaraan yang sama (rawan manipulasi/phreaking).\nOut-of-band / CCS (Common Channel Signaling): sinyal kontrol dikirim melalui kanal data digital terpisah.\nSS7 (Signaling System No. 7) adalah standar global CCS untuk setup panggilan, SMS, dan mobilitas seluler."
  ],
  [
    4,
    "Evolusi Seluler: 1G hingga 3G",
    "1G (1980-an): sistem analog, modulasi suara FM dengan FDMA (contoh AMPS, NMT).\n2G (1990-an): sistem digital pertama, TDMA/CDMA (GSM, D-AMPS, IS-95); memperkenalkan SMS dan kartu SIM enkripsi.\n3G (2000-an): CDMA broadband (WCDMA/UMTS, CDMA2000); internet seluler pita lebar mencapai 2-14 Mbps."
  ],
  [
    4,
    "Evolusi Seluler: 4G LTE & 5G",
    "4G LTE: arsitektur all-IP (flat network), modulasi OFDMA di downlink dan SC-FDMA di uplink, MIMO multi-antena, hingga 100 Mbps-1 Gbps.\n5G (NR): latensi < 1 ms, spektrum gelombang milimeter (mmWave), massive MIMO, dan Network Slicing untuk membagi infrastruktur fisik menjadi jaringan logis mandiri."
  ],
  [
    4,
    "Tiga Kasus Penggunaan Kunci 5G",
    "1. eMBB (Enhanced Mobile Broadband): streaming video 4K/8K, AR/VR dengan laju multi-Gbps.\n2. mMTC (Massive Machine Type Communications): konektivitas jutaan sensor IoT densitas tinggi dan hemat daya.\n3. URLLC (Ultra-Reliable Low-Latency Communications): latensi sub-milidetik untuk mobil otonom dan operasi jarak jauh."
  ],
  [
    4,
    "Konsep Frequency Reuse & Handoff",
    "Wilayah geografis dibagi menjadi sel-sel heksagonal kecil, masing-masing dilayani Base Station (BS).\nFrequency Reuse: pita frekuensi yang sama dapat dipakai ulang di sel lain yang berjarak aman (Cluster size N = 4, 7, 12) untuk melipatgandakan kapasitas.\nHandoff: pengalihan panggilan secara mulus dari satu sel ke sel tetangga saat pengguna bergerak."
  ],
  [
    4,
    "Komponen Inti Jaringan GSM",
    "MS (Mobile Station): perangkat pengguna + SIM card.\nBSS (Base Station Subsystem): BTS (antena pemancar) dikontrol oleh BSC (Base Station Controller).\nNSS (Network & Switching Subsystem): MSC (saklar utama), HLR (Home Location Register - data permanen pelanggan), dan VLR (Visitor Location Register - pelanggan tamu)."
  ],
  [
    5,
    "Model Layanan Peer-to-Peer",
    "Protokol peer-to-peer berkomunikasi antar entitas pada layer yang sama di mesin berbeda.\nKarakteristik layanan: Connection-oriented (setup, transfer, teardown) vs Connectionless (datagram independen); Reliable (bebas error & berurutan) vs Unreliable (best-effort); Hop-by-hop vs End-to-end."
  ],
  [
    5,
    "Prinsip ARQ (Automatic Repeat Request)",
    "Mekanisme kendali kesalahan pada Data Link dan Transport layer.\nMenggabungkan tiga elemen: deteksi error (CRC/Checksum), konfirmasi penerimaan (ACK positif / NAK negatif), dan batas waktu transmisi ulang (Timeout timer)."
  ],
  [
    5,
    "Stop-and-Wait ARQ",
    "Pengirim mengirim 1 frame, lalu berhenti menunggu ACK sebelum mengirim frame berikutnya.\nEfisiensi η = (1 - Pf) / (1 + 2a), di mana a = t_prop / t_trans dan Pf adalah probabilitas frame error.\nSangat tidak efisien jika delay propagasi jauh lebih besar dari waktu transmisi (nilai a >> 1, seperti pada link satelit atau serat optik jarak jauh)."
  ],
  [
    5,
    "Go-Back-N (GBN) ARQ",
    "Pengirim dapat mengirim hingga Ws frame secara beruntun tanpa menunggu ACK (sliding window pengirim Ws).\nPenerima hanya menerima frame yang tiba tepat berurutan (window penerima Wr = 1); jika satu frame rusak/hilang, frame berikutnya dibuang dan pengirim harus mengirim ulang seluruh Ws frame mulai dari yang rusak.\nUkuran window maksimum: Ws ≤ 2^m - 1 (m = jumlah bit sequence number)."
  ],
  [
    5,
    "Selective Repeat (SR) ARQ",
    "Penerima memiliki buffer penerima (Wr > 1) dan menerima frame yang tiba di luar urutan selama masih dalam rentang window.\nPengirim hanya mentransmisikan ulang frame yang spesifik dilaporkan rusak/timeout (selective retransmit).\nUkuran window maksimum: Ws + Wr ≤ 2^m (umumnya optimal jika Ws = Wr = 2^(m-1)). Sangat efisien untuk kanal dengan delay-bandwidth tinggi."
  ],
  [
    5,
    "Perbandingan Efisiensi ARQ",
    "Stop-and-Wait: sederhana, buffer 1 frame, efisiensi anjlok bila a besar.\nGBN: buffer penerima 1 frame, efisiensi tinggi pada link minim error, namun retransmisi membengkak bila bit error rate tinggi.\nSelective Repeat: buffer kompleks di kedua sisi, efisiensi tertinggi di segala kondisi delay dan error rate."
  ],
  [
    5,
    "Flow Control: Sliding Window",
    "Mencegah pengirim membanjiri buffer penerima yang lebih lambat.\nPenerima mengirimkan Advertised Window (W) yang menyatakan berapa banyak ruang buffer yang masih tersedia.\nPengirim membatasi jumlah data yang melayang di jaringan (in-flight data) tidak boleh melebihi nilai W tersebut."
  ],
  [
    5,
    "Timing Recovery & Layanan Real-Time",
    "Pada transmisi suara/video streaming, variasi delay jaringan (jitter) merusak kelancaran pemutaran.\nSolusi: Play-out buffer di sisi penerima menahan paket sesaat untuk menyerap jitter.\nProtokol RTP (Real-time Transport Protocol) menyertakan Sequence Number (deteksi paket hilang) dan Timestamp (waktu pengambilan sampel untuk sinkronisasi pemutaran)."
  ],
  [
    5,
    "TCP Three-Way Handshake",
    "Membangun koneksi andal sebelum pertukaran data:\n1. Klien → Server: paket SYN dengan Initial Sequence Number (ISN klien = x).\n2. Server → Klien: paket SYN-ACK dengan ISN server = y dan ACK = x + 1.\n3. Klien → Server: paket ACK dengan ACK = y + 1 (dapat membawa data payload pertama)."
  ],
  [
    5,
    "TCP Flow Control & Estimasi RTT",
    "TCP memakai sliding window byte-stream; penerima mengontrol laju lewat field Advertised Window di header TCP.\nRetransmission Timeout (RTO) dihitung dinamis adaptif terhadap Round-Trip Time (RTT) memakai algoritma Jacobson: RTT estimasi dihitung dari rata-rata berbobot (SRTT) dan deviasi RTT (RTTVAR)."
  ],
  [
    5,
    "Metode Framing di Data Link Layer",
    "1. Character Count: byte pertama menyatakan panjang frame (bencana bila byte panjang korup).\n2. Byte Stuffing: frame diawali dan diakhiri Flag byte khusus (misal DLE STX dan DLE ETX); jika pola flag muncul di data, sisipkan escape byte (DLE).\n3. Bit Stuffing: frame dibatasi pola Flag 01111110 (enam angka 1); di dalam data, pengirim otomatis menyisipkan bit 0 setiap kali menemukan lima angka 1 berurutan."
  ],
  [
    5,
    "Protokol HDLC & PPP",
    "HDLC (High-level Data Link Control): protokol data link berorientasi bit standar ISO, menggunakan bit stuffing, mendukung mode NRM dan ABM.\nPPP (Point-to-Point Protocol): protokol standar Internet untuk link langsung (misal DSL, dial-up), menyediakan enkapsulasi multi-protokol, LCP (Link Control Protocol), dan NCP untuk negosiasi IP."
  ],
  [
    6,
    "Broadcast Networks & Peran MAC",
    "Pada jaringan broadcast, banyak stasiun berbagi media transmisi tunggal yang sama.\nJika dua atau lebih stasiun mentransmisikan sinyal secara bersamaan, sinyal bertabrakan (collision) dan data rusak.\nMAC (Medium Access Control) adalah sublayer Data Link yang mengatur alokasi hak transmisi agar tabrakan diminimalkan."
  ],
  [
    6,
    "Taksonomi Protokol MAC",
    "1. Random Access: tidak ada koordinasi pusat, stasiun bersaing mengirim; jika tabrakan, jadwalkan ulang (ALOHA, CSMA, CSMA/CD).\n2. Scheduling / Controlled Access: hak kirim diatur secara berurutan tanpa tabrakan (Polling, Token Passing, Reservation).\n3. Channelization: kanal dibagi secara matematis/fisik (FDMA, TDMA, CDMA)."
  ],
  [
    6,
    "Pure ALOHA",
    "Dikembangkan di University of Hawaii (1970). Stasiun langsung mentransmisikan frame begitu siap.\nVulnerable period = 2 × T_frame (tabrakan terjadi jika ada stasiun lain kirim pada [t - T, t + T]).\nThroughput S = G · e^(-2G); Throughput maksimum S_max = 1/(2e) ≈ 18,4% pada beban traffic G = 0,5."
  ],
  [
    6,
    "Slotted ALOHA",
    "Waktu dibagi menjadi slot-slot diskret sebesar durasi 1 frame (T_frame); stasiun hanya boleh mulai kirim pada awal slot waktu.\nVulnerable period menyusut menjadi 1 × T_frame.\nThroughput S = G · e^(-G); Throughput maksimum berlipat dua menjadi S_max = 1/e ≈ 36,8% pada beban traffic G = 1,0."
  ],
  [
    6,
    "CSMA (Carrier Sense Multiple Access)",
    "Prinsip 'Listen before talk': stasiun memeriksa (sense) apakah medium sedang sibuk sebelum mulai mengirim.\n1-persistent CSMA: jika idle langsung kirim; jika sibuk terus pantau sampai idle lalu segera kirim (agresif, rawan tabrakan jika >1 stasiun menunggu).\nNon-persistent CSMA: jika sibuk, tunggu waktu acak sebelum memeriksa ulang (mengurangi tabrakan, delay rata-rata naik).\np-persistent CSMA: pada slotted channel, jika idle kirim dengan probabilitas p, tunda ke slot berikut dengan probabilitas (1-p)."
  ],
  [
    6,
    "CSMA/CD (Collision Detection)",
    "Prinsip 'Listen while talk': stasiun terus memantau medium saat sedang mentransmisikan data.\nJika terdeteksi tabrakan (kenaikan amplitudo tegangan abnormal):\n1. Segera batalkan transmisi frame.\n2. Kirim sinyal Jam (32-48 bit) agar stasiun lain sadar ada tabrakan.\n3. Jalankan algoritma Binary Exponential Backoff untuk memilih waktu tunggu acak sebelum retransmisi."
  ],
  [
    6,
    "Syarat Panjang Frame Minimum CSMA/CD",
    "Agar stasiun pengirim pasti mendeteksi tabrakan sebelum selesai mentransmisikan seluruh frame:\nWaktu Transmisi ≥ 2 × Delay Propagasi maksimum (t_trans ≥ 2 t_prop).\nPada Ethernet klasik 10 Mbps kabel 2,5 km (round-trip ~51,2 μs): panjang frame minimum = 512 bit = 64 byte. Frame yang lebih pendek dari 64 byte (runt frame) dianggap akibat tabrakan."
  ],
  [
    6,
    "Binary Exponential Backoff (BEB)",
    "Setelah collision ke-k (k = 1 s.d. 10), stasiun memilih delay acak r slot waktu (1 slot = 51,2 μs pada 10 Mbps), di mana 0 ≤ r < 2^k.\nSetelah 10 tabrakan berturut-turut, rentang dibatasi pada 2^10 = 1024 (k = 10 s.d. 15).\nJika mencapai 16 kali tabrakan berturut-turut, transmisi digagalkan dan dilaporkan error ke layer atas."
  ],
  [
    6,
    "Scheduling MAC: Polling & Token Passing",
    "Polling: stasiun master menginterogasi stasiun slave satu per satu (ada polling overhead & master single point of failure).\nToken Passing: frame khusus (token) beredar mengelilingi cincin logika; hanya stasiun pemegang token yang berhak mengirim data (contoh IEEE 802.5 Token Ring, FDDI).\nBebas tabrakan (collision-free) dan adil pada beban tinggi, namun ada token passing latency."
  ],
  [
    6,
    "Evolusi Ethernet (IEEE 802.3)",
    "10Base5 (Thicknet, kabel koaksial kuning, tap vampir, bus fisik).\n10Base2 (Thinnet, koaksial RG-58, BNC T-connector).\n10Base-T (Twisted pair UTP, topologi bintang fisik via Hub/Switch, jarak maks 100m).\nFast Ethernet 100 Mbps (802.3u), Gigabit Ethernet 1 Gbps (802.3z/ab), 10 Gbps (802.3ae)."
  ],
  [
    6,
    "Format Frame Ethernet & Alamat MAC",
    "Struktur frame IEEE 802.3:\nPreamble (7 byte) + SFD (1 byte) + Dest MAC (6 byte) + Source MAC (6 byte) + Type/Length (2 byte) + Payload (46–1500 byte) + FCS/CRC (4 byte).\nTotal ukuran frame sah: 64 byte s.d. 1518 byte.\nAlamat MAC 48-bit (6 byte): 3 byte pertama = OUI (Organizationally Unique Identifier pabrikan), 3 byte terakhir = nomor seri kartu jaringan."
  ],
  [
    6,
    "Bridges, Switches & VLAN (802.1Q)",
    "Bridge & Switch beroperasi di Data Link layer (Layer 2); memecah collision domain tetapi tetap dalam 1 broadcast domain.\nTransparent Bridge membangun Forwarding Table secara dinamis dari Source MAC paket masuk (learning, filtering, forwarding, flooding).\nSpanning Tree Protocol (STP IEEE 802.1D): menonaktifkan link redundan untuk mencegah loop dan broadcast storm.\nVLAN (Virtual LAN 802.1Q): menambahkan tag 12-bit pada header frame untuk memecah broadcast domain secara logis tanpa mengubah kabel fisik."
  ]
];

// Pilihan Ganda: [bab, id, soal, opsi, jawaban_idx, penjelasan]
const PG = [
  [
    1,
    "b1-pg-01",
    "Berapa jumlah koneksi langsung (full mesh) yang dibutuhkan untuk menghubungkan 1000 pengguna?",
    [
      "1000",
      "499.500",
      "999.000",
      "1.000.000"
    ],
    1,
    "N(N-1)/2 = 1000×999/2 = 499.500."
  ],
  [
    1,
    "b1-pg-02",
    "Teknologi kunci pada arsitektur jaringan telegraf adalah ...",
    [
      "Circuit switching",
      "Packet switching",
      "Message switching",
      "Optical switching"
    ],
    2,
    "Telegraf = message switching, store-and-forward."
  ],
  [
    1,
    "b1-pg-03",
    "Siapa yang menemukan saklar otomatis (1888) yang mengurangi kebutuhan operator manusia?",
    [
      "Bell",
      "Strowger",
      "Metcalfe",
      "Abramson"
    ],
    1,
    "Strowger 1888: tiap pulsa arus memajukan wiper satu posisi."
  ],
  [
    1,
    "b1-pg-04",
    "Bit rate suara digital PCM pada jaringan telepon adalah ...",
    [
      "8 kbps",
      "32 kbps",
      "64 kbps",
      "128 kbps"
    ],
    2,
    "8 bit × 8000 sampel/detik = 64 kbps."
  ],
  [
    1,
    "b1-pg-05",
    "Sistem T-1 membawa ... sinyal suara dengan laju total ...",
    [
      "24 sinyal; 1,544 Mbps",
      "30 sinyal; 2,048 Mbps",
      "12 sinyal; 1,544 Mbps",
      "24 sinyal; 64 kbps"
    ],
    0,
    "T-1 (1961): 24 kanal = 1,544 Mbps."
  ],
  [
    1,
    "b1-pg-06",
    "Layanan transfer packet pada IP bersifat ...",
    [
      "Reliable dengan retransmisi",
      "Best-effort tanpa retransmisi",
      "Connection-oriented",
      "Dijamin berurutan"
    ],
    1,
    "IP best-effort, tanpa retransmisi."
  ],
  [
    1,
    "b1-pg-07",
    "Protokol transport yang menyediakan transfer reliable byte stream adalah ...",
    [
      "UDP",
      "IP",
      "TCP",
      "RTP"
    ],
    2,
    "TCP = reliable stream; UDP = best-effort blok."
  ],
  [
    1,
    "b1-pg-08",
    "Hukum yang menyatakan jumlah transistor per IC berlipat dua tiap dua tahun adalah ...",
    [
      "Metcalfe's Law",
      "Moore's Law",
      "Shannon's Law",
      "Nyquist's Law"
    ],
    1,
    "Moore's Law."
  ],
  [
    1,
    "b1-pg-09",
    "Metcalfe's Law menyatakan bahwa kegunaan jaringan sebanding dengan ...",
    [
      "Jumlah pengguna",
      "Akar jumlah pengguna",
      "Kuadrat jumlah pengguna",
      "Log jumlah pengguna"
    ],
    2,
    "Network effect: nilai ∝ n²."
  ],
  [
    1,
    "b1-pg-10",
    "Dokumen standar Internet berupa RFC dikeluarkan oleh ...",
    [
      "ITU",
      "IEEE 802",
      "IETF",
      "W3C"
    ],
    2,
    "IETF menerbitkan RFC (Request for Comments)."
  ],
  [
    1,
    "b1-pg-11",
    "Tiga faktor keberhasilan layanan baru adalah ...",
    [
      "Technology, Market, Regulation",
      "Cost, Speed, Security",
      "Hardware, Software, Network",
      "Voice, Data, Video"
    ],
    0,
    "Teknologi, pasar, regulasi."
  ],
  [
    1,
    "b1-pg-12",
    "Pada ARPANET, pesan dipecah menjadi packet dan disusun ulang (reassemble) oleh ...",
    [
      "Host sumber",
      "Source packet switch",
      "Destination packet switch",
      "Setiap router di tengah"
    ],
    2,
    "Destination packet switch yang menyusun ulang lalu mengirim ke host."
  ],
  [
    1,
    "b1-pg-13",
    "Fungsi 'routing' pada switch adalah ...",
    [
      "Memindahkan informasi dari input ke output",
      "Memutuskan titik keluar (exit point)",
      "Meregenerasi sinyal",
      "Menambah CRC"
    ],
    1,
    "Routing = menentukan exit point; forwarding = memindahkan."
  ],
  [
    1,
    "b1-pg-14",
    "Mengapa optical packet switching belum akan terjadi dan tren di core adalah optical circuit switching?",
    [
      "Serat optik kapasitasnya kecil",
      "Pemrosesan sinyal optik terbatas dan konversi optik-elektronik mahal",
      "Packet tidak bisa dikirim di serat",
      "Regulasi melarang"
    ],
    1,
    "Logika optik besar/mahal; elektronik << Tbps."
  ],
  [
    1,
    "b1-pg-15",
    "Protokol Internet berikut yang berjalan di atas UDP adalah ...",
    [
      "HTTP",
      "SMTP",
      "DNS",
      "FTP"
    ],
    2,
    "DNS dan RTP di atas UDP; HTTP, SMTP, FTP, Telnet di atas TCP."
  ],
  [
    2,
    "b2-pg-01",
    "Layer OSI yang bertanggung jawab atas transfer data end-to-end antara dua proses adalah ...",
    [
      "Network",
      "Transport",
      "Data Link",
      "Session"
    ],
    1,
    "Transport = proses ke proses; Network = node ke node."
  ],
  [
    2,
    "b2-pg-02",
    "Urutan layer OSI dari atas ke bawah yang benar adalah ...",
    [
      "Application, Session, Presentation, Transport, Network, Data Link, Physical",
      "Application, Presentation, Session, Transport, Network, Data Link, Physical",
      "Application, Presentation, Transport, Session, Network, Data Link, Physical",
      "Application, Presentation, Session, Network, Transport, Data Link, Physical"
    ],
    1,
    "APSTNDP: Application–Presentation–Session–Transport–Network–Data link–Physical."
  ],
  [
    2,
    "b2-pg-03",
    "Pada TCP/IP, fungsi Presentation dan Session OSI digabungkan ke layer ...",
    [
      "Transport",
      "Network",
      "Application",
      "Data Link"
    ],
    2,
    "Dimasukkan ke Application layer."
  ],
  [
    2,
    "b2-pg-04",
    "Data yang diserahkan layer n+1 ke layer n disebut ...",
    [
      "PDU",
      "SDU",
      "SAP",
      "Frame"
    ],
    1,
    "SDU dienkapsulasi menjadi PDU (header + SDU)."
  ],
  [
    2,
    "b2-pg-05",
    "Well-known port untuk HTTP dan DNS berturut-turut adalah ...",
    [
      "80 dan 53",
      "21 dan 80",
      "53 dan 80",
      "25 dan 53"
    ],
    0,
    "HTTP 80; DNS 53 (UDP)."
  ],
  [
    2,
    "b2-pg-06",
    "Panjang alamat Ethernet (MAC) adalah ...",
    [
      "32 bit",
      "48 bit",
      "64 bit",
      "128 bit"
    ],
    1,
    "24 bit pabrikan + 24 bit serial."
  ],
  [
    2,
    "b2-pg-07",
    "Saat IP packet melewati router ke jaringan lain, yang BERUBAH adalah ...",
    [
      "IP address sumber",
      "IP address tujuan",
      "Alamat fisik (MAC) hop berikutnya",
      "Port number"
    ],
    2,
    "IP end-to-end tetap; MAC berubah tiap hop."
  ],
  [
    2,
    "b2-pg-08",
    "Header yang berisi source & destination port number adalah header ...",
    [
      "Ethernet",
      "IP",
      "TCP",
      "HTTP"
    ],
    2,
    "TCP header; IP header berisi IP address; Ethernet berisi MAC."
  ],
  [
    2,
    "b2-pg-09",
    "Urutan pemanggilan socket pada server TCP adalah ...",
    [
      "socket, connect, write, read",
      "socket, bind, listen, accept",
      "socket, listen, bind, accept",
      "socket, bind, connect, accept"
    ],
    1,
    "Server: socket-bind-listen-accept; client: socket-connect."
  ],
  [
    2,
    "b2-pg-10",
    "Fungsi accept() pada socket TCP mengembalikan ...",
    [
      "0 jika sukses",
      "Descriptor baru untuk koneksi tersebut",
      "Jumlah byte diterima",
      "Alamat server"
    ],
    1,
    "Socket asli tetap listen; accept memberi descriptor baru."
  ],
  [
    2,
    "b2-pg-11",
    "Pada UDP socket, fungsi untuk menerima data beserta alamat pengirim adalah ...",
    [
      "read()",
      "accept()",
      "recvfrom()",
      "listen()"
    ],
    2,
    "UDP: sendto/recvfrom; tanpa listen/accept/connect."
  ],
  [
    2,
    "b2-pg-12",
    "Port FTP untuk control connection dan data connection (sisi server) adalah ...",
    [
      "21 dan 20",
      "20 dan 21",
      "80 dan 21",
      "21 dan 22"
    ],
    0,
    "Control 21; data 20."
  ],
  [
    2,
    "b2-pg-13",
    "Kode balasan FTP 5yz berarti ...",
    [
      "Positive completion",
      "Transient negative (coba lagi)",
      "Permanent negative (jangan kirim ulang)",
      "Positive intermediary"
    ],
    2,
    "4yz sementara; 5yz permanen."
  ],
  [
    2,
    "b2-pg-14",
    "Utilitas yang memakai ICMP Time Exceeded dan TTL yang naik bertahap untuk menemukan rute adalah ...",
    [
      "ping",
      "traceroute",
      "netstat",
      "ipconfig"
    ],
    1,
    "Traceroute: UDP dengan TTL=1,2,3,..."
  ],
  [
    2,
    "b2-pg-15",
    "Metode HTTP untuk mengambil meta-information saja tanpa objeknya adalah ...",
    [
      "GET",
      "POST",
      "HEAD",
      "PUT"
    ],
    2,
    "HEAD."
  ],
  [
    3,
    "b3-pg-01",
    "Satuan ukuran blok informasi: 1 Mbyte sama dengan ...",
    [
      "10⁶ byte",
      "2²⁰ byte",
      "10⁹ byte",
      "2³⁰ byte"
    ],
    1,
    "Byte memakai pangkat 2; bps memakai pangkat 10."
  ],
  [
    3,
    "b3-pg-02",
    "Pesan 10⁶ bit dikirim pada 1 Mbps melewati jarak 3×10⁶ m (c = 3×10⁸ m/s). Waktu total satu arah adalah ...",
    [
      "1,00 s",
      "1,01 s",
      "1,10 s",
      "10 s"
    ],
    1,
    "d/c + L/R = 0,01 + 1 = 1,01 s."
  ],
  [
    3,
    "b3-pg-03",
    "Kanal 3000 Hz tanpa noise dengan sinyal 4 level dapat membawa bit rate maksimum ...",
    [
      "6 kbps",
      "12 kbps",
      "24 kbps",
      "3 kbps"
    ],
    1,
    "2·Wc·m = 2·3000·2 = 12 kbps."
  ],
  [
    3,
    "b3-pg-04",
    "Kapasitas Shannon kanal 3000 Hz dengan SNR = 255 adalah ...",
    [
      "8 kbps",
      "16 kbps",
      "24 kbps",
      "765 kbps"
    ],
    2,
    "3000·log2(256) = 24.000 bps."
  ],
  [
    3,
    "b3-pg-05",
    "SNR sebesar 100 kali setara dengan ... dB",
    [
      "10",
      "20",
      "40",
      "100"
    ],
    1,
    "10·log10(100) = 20 dB."
  ],
  [
    3,
    "b3-pg-06",
    "Daya rata-rata line code unipolar NRZ (pulsa +A untuk '1', 0 untuk '0') adalah ...",
    [
      "A²/4",
      "A²/2",
      "A²",
      "2A²"
    ],
    1,
    "0,5·A² + 0,5·0; polar NRZ = A²/4."
  ],
  [
    3,
    "b3-pg-07",
    "Line code yang dipakai Ethernet 10 Mbps dan memakai 2× bandwidth minimum adalah ...",
    [
      "Bipolar",
      "NRZ-Inverted",
      "Manchester",
      "Unipolar"
    ],
    2,
    "Transisi di tengah tiap bit memudahkan timing."
  ],
  [
    3,
    "b3-pg-08",
    "Sebuah blok 7 bit info = 1 0 1 1 0 1 0 diberi bit paritas genap tunggal. Bit paritasnya adalah ...",
    [
      "0",
      "1",
      "Bisa 0 atau 1",
      "Tidak dapat ditentukan"
    ],
    0,
    "Jumlah 1 = 4 (genap) → bit paritas 0."
  ],
  [
    3,
    "b3-pg-09",
    "Internet checksum 4-bit dari dua kata 1100 dan 1010 (aritmetika one's complement) adalah ...",
    [
      "0111",
      "1000",
      "0110",
      "1001"
    ],
    1,
    "1100+1010=10110 → wrap = 0111 → komplemen = 1000."
  ],
  [
    3,
    "b3-pg-10",
    "Dengan g(x) = x³+x+1 dan info 1100 (k=4), codeword CRC adalah ...",
    [
      "1100010",
      "1100101",
      "1100001",
      "1100111"
    ],
    0,
    "1100000 ÷ 1011 → sisa 010 → 1100010."
  ],
  [
    3,
    "b3-pg-11",
    "Untuk kode Hamming dengan m = 4 bit paritas, panjang codeword n dan jumlah bit info k adalah ...",
    [
      "n=7, k=4",
      "n=15, k=11",
      "n=31, k=26",
      "n=16, k=12"
    ],
    1,
    "n = 2^m − 1 = 15; k = n − m = 11."
  ],
  [
    3,
    "b3-pg-12",
    "Jarak minimum (minimum distance) kode Hamming adalah ...",
    [
      "1",
      "2",
      "3",
      "4"
    ],
    2,
    "d_min = 3 → mengoreksi 1 error."
  ],
  [
    3,
    "b3-pg-13",
    "Syarat pemantulan sempurna (total internal reflection) pada serat optik adalah ...",
    [
      "Indeks bias cladding > core",
      "Indeks bias core > cladding",
      "Indeks bias sama",
      "Sudut datang lebih besar dari sudut kritis ke arah luar"
    ],
    1,
    "Core punya indeks bias lebih tinggi dari cladding."
  ],
  [
    3,
    "b3-pg-14",
    "Satu serat dengan WDM 160 panjang gelombang @ 10 Gbps membawa total ...",
    [
      "160 Gbps",
      "1,6 Tbps",
      "16 Tbps",
      "10 Gbps"
    ],
    1,
    "160 × 10 Gbps = 1,6 Tbps."
  ],
  [
    3,
    "b3-pg-15",
    "Frame video 720×480 piksel dengan 30 frame/detik menghasilkan sekitar ... piksel/detik",
    [
      "760 ribu",
      "10,4 juta",
      "67 juta",
      "1,6 miliar"
    ],
    1,
    "720×480×30 ≈ 10,4×10⁶."
  ],
  [
    4,
    "b4-pg-01",
    "Lima kanal @100 kHz di-FDM dengan guard band 10 kHz antar kanal. Bandwidth minimum link adalah ...",
    [
      "500 kHz",
      "510 kHz",
      "540 kHz",
      "550 kHz"
    ],
    2,
    "5×100 + 4×10 = 540 kHz (4 guard band)."
  ],
  [
    4,
    "b4-pg-02",
    "Satu group FDM telco terdiri atas ... kanal suara 4 kHz pada rentang 60–108 kHz",
    [
      "5",
      "10",
      "12",
      "24"
    ],
    2,
    "Group = 12 kanal; supergroup = 5 group (60); mastergroup = 10 supergroup (600)."
  ],
  [
    4,
    "b4-pg-03",
    "Mastergroup membawa ... sinyal suara",
    [
      "60",
      "120",
      "600",
      "1200"
    ],
    2,
    "10 supergroup × 60 = 600."
  ],
  [
    4,
    "b4-pg-04",
    "WDM disebut ...",
    [
      "Versi optik dari FDM",
      "Versi optik dari TDM",
      "Versi digital dari CDMA",
      "Versi analog dari TDM"
    ],
    0,
    "Panjang gelombang berbeda = channel berbeda."
  ],
  [
    4,
    "b4-pg-05",
    "Empat kanal @100 kbps di-TDM dengan slot 2 bit. Frame rate-nya adalah ...",
    [
      "25.000 frame/s",
      "50.000 frame/s",
      "100.000 frame/s",
      "400.000 frame/s"
    ],
    1,
    "100.000 / 2 = 50.000; frame = 8 bit; bit rate link 400 kbps."
  ],
  [
    4,
    "b4-pg-06",
    "Bit rate DS-1/T-1 dihitung dengan ...",
    [
      "24×8×8000",
      "(1+24×8)×8000",
      "(24×8+8)×8000",
      "32×64.000"
    ],
    1,
    "193 bit × 8000 = 1,544 Mbps (1 framing bit)."
  ],
  [
    4,
    "b4-pg-07",
    "Perbedaan utama synchronous TDM dan statistical TDM adalah ...",
    [
      "Statistical memakai frekuensi berbeda",
      "Statistical mengalokasikan slot dinamis berdasarkan permintaan",
      "Synchronous memakai kode",
      "Tidak ada perbedaan"
    ],
    1,
    "Synchronous: slot tetap, boros."
  ],
  [
    4,
    "b4-pg-08",
    "Mengapa jaringan virtual-circuit disebut 'virtual'?",
    [
      "Tidak memakai kabel",
      "Resource (switch, buffer, saluran) dibagi oleh banyak koneksi, tidak dedicated",
      "Hanya berjalan di perangkat lunak",
      "Tidak butuh signaling"
    ],
    1,
    "Berbeda dari circuit switching sejati."
  ],
  [
    4,
    "b4-pg-09",
    "Pada jaringan datagram ...",
    [
      "Jalur ditetapkan sebelum pengiriman",
      "Tiap packet di-switch secara independen",
      "Resource dedicated per panggilan",
      "Selalu ada 3 fase koneksi"
    ],
    1,
    "Virtual circuit: jalur pra-tetap."
  ],
  [
    4,
    "b4-pg-10",
    "Tiga fase komunikasi connection-oriented pada telepon adalah ...",
    [
      "Dial, ring, talk",
      "Setup, transfer, teardown",
      "Request, grant, release",
      "SYN, ACK, FIN"
    ],
    1,
    "Call setup, transfer, teardown."
  ],
  [
    4,
    "b4-pg-11",
    "Komponen SS7 yang menerjemahkan 'global titles' dan setara DNS adalah ...",
    [
      "MTP level 3",
      "ISUP",
      "SCCP",
      "TCAP"
    ],
    2,
    "SCCP; ISUP = setup/release call; TCAP = komunikasi aplikasi."
  ],
  [
    4,
    "b4-pg-12",
    "E-1 memiliki laju ...",
    [
      "1,544 Mbps = 24×64 kbps",
      "2,048 Mbps = 32×64 kbps",
      "64 kbps",
      "56 kbps"
    ],
    1,
    "E-1 = 32 kanal @64 kbps."
  ],
  [
    4,
    "b4-pg-13",
    "Generasi seluler yang menandai 'mobile broadband' dengan WCDMA/HSPA+ adalah ...",
    [
      "1G",
      "2G",
      "3G",
      "4G"
    ],
    2,
    "3G: 63+ Mbps; 4G LTE: 300+ Mbps."
  ],
  [
    4,
    "b4-pg-14",
    "Pada inti jaringan 3G, GGSN berfungsi sebagai ...",
    [
      "Pengelola panggilan circuit-switched",
      "Router kompleks ke jaringan packet eksternal",
      "Server pelanggan",
      "Gateway MSC"
    ],
    1,
    "SGSN: mobility/session/billing; GGSN: gateway packet."
  ],
  [
    4,
    "b4-pg-15",
    "Kode yang dinamis (berubah menurut posisi) pada identifikasi lokasi ponsel adalah ...",
    [
      "MCC dan MNC",
      "LAC dan CID",
      "MCC dan LAC",
      "MNC dan CID"
    ],
    1,
    "MCC/MNC tetap; LAC/CID dinamis."
  ],
  [
    5,
    "b5-pg-01",
    "Elemen dasar yang dibutuhkan semua protokol ARQ adalah ...",
    [
      "Kompresi, enkripsi, ACK, window",
      "Error-detecting code, ACK, NAK, timeout",
      "Routing, ACK, NAK, CRC",
      "Hanya ACK dan window"
    ],
    1,
    "CRC + ACK + NAK + timeout (+ sequence number)."
  ],
  [
    5,
    "b5-pg-02",
    "Pada Stop-and-Wait ARQ, nomor urut yang diperlukan cukup ...",
    [
      "1 bit",
      "2 bit",
      "3 bit",
      "8 bit"
    ],
    0,
    "Global state (S_last, R_next) bergantian 0/1."
  ],
  [
    5,
    "b5-pg-03",
    "Ukuran send window maksimum Go-Back-N dengan sequence number m = 3 bit adalah ...",
    [
      "3",
      "4",
      "7",
      "8"
    ],
    2,
    "W_s ≤ 2^m − 1 = 7."
  ],
  [
    5,
    "b5-pg-04",
    "Pada Selective Repeat dengan m = 4 dan W_s = W_r, ukuran window maksimum masing-masing adalah ...",
    [
      "4",
      "7",
      "8",
      "15"
    ],
    2,
    "W_s + W_r ≤ 2^m = 16 → 8 + 8."
  ],
  [
    5,
    "b5-pg-05",
    "Frame 10.000 bit dikirim @1 Mbps (10 ms). Jika menunggu ACK 20 ms, efisiensi Stop-and-Wait adalah ...",
    [
      "91%",
      "50%",
      "33%",
      "10%"
    ],
    2,
    "10/(10+20) = 33%."
  ],
  [
    5,
    "b5-pg-06",
    "Frame 1000 bit, R = 1 Mbps, 2(t_prop+t_proc) = 4 ms, overhead diabaikan. Efisiensi Stop-and-Wait = ...",
    [
      "80%",
      "50%",
      "25%",
      "20%"
    ],
    3,
    "η = 1/(1 + 2tR/nf) = 1/(1+4) = 20%."
  ],
  [
    5,
    "b5-pg-07",
    "Pada soal sebelumnya, window Go-Back-N minimum agar kanal sibuk terus adalah ...",
    [
      "1",
      "4",
      "5",
      "8"
    ],
    2,
    "W_s ≈ 1 + L = 1 + 4 = 5."
  ],
  [
    5,
    "b5-pg-08",
    "Untuk frame 10.000 bit dengan p = 10⁻⁴, probabilitas frame sukses 1−P_f ≈ ...",
    [
      "0,99",
      "0,905",
      "0,368",
      "0,01"
    ],
    2,
    "e^(−n_f·p) = e^(−1) = 0,368."
  ],
  [
    5,
    "b5-pg-09",
    "Dengan P_f = 0,1; W_s = 11; overhead diabaikan, efisiensi GBN = ...",
    [
      "0,90",
      "0,45",
      "0,10",
      "0,99"
    ],
    1,
    "0,9/(1 + 10×0,1) = 0,45; SR = 0,9."
  ],
  [
    5,
    "b5-pg-10",
    "Perbedaan Selective Repeat dibanding Go-Back-N adalah ...",
    [
      "SR receive window = 1",
      "SR hanya mengirim ulang frame yang salah dan mem-buffer frame out-of-order",
      "SR tidak memakai timer",
      "SR tidak memakai sequence number"
    ],
    1,
    "GBN membuang out-of-order & mengirim ulang semua."
  ],
  [
    5,
    "b5-pg-11",
    "Frame supervisory HDLC yang meminta retransmisi hanya frame N(R) (selective) adalah ...",
    [
      "RR",
      "REJ",
      "RNR",
      "SREJ"
    ],
    3,
    "REJ = go-back (N(R) dan sesudahnya); RNR = jangan kirim lagi."
  ],
  [
    5,
    "b5-pg-12",
    "Kombinasi bit pertama field control HDLC untuk Information frame, Supervisory frame, dan Unnumbered frame berturut-turut adalah ...",
    [
      "0, 10, 11",
      "1, 10, 11",
      "0, 11, 10",
      "10, 0, 11"
    ],
    0,
    "I: 0; S: 10; U: 11."
  ],
  [
    5,
    "b5-pg-13",
    "Bit stuffing HDLC: transmitter menyisipkan bit 0 setelah ...",
    [
      "Tiga bit 1 berurutan",
      "Lima bit 1 berurutan",
      "Enam bit 1 berurutan",
      "Setiap bit 0"
    ],
    1,
    "Agar flag 01111110 tidak muncul di data."
  ],
  [
    5,
    "b5-pg-14",
    "Urutan fase PPP yang benar adalah ...",
    [
      "Dead → Establish → Authenticate → Network → Open → Terminate",
      "Dead → Authenticate → Establish → Network → Open → Terminate",
      "Establish → Dead → Network → Authenticate → Open → Terminate",
      "Dead → Network → Establish → Authenticate → Open → Terminate"
    ],
    0,
    "LCP saat Establish; NCP saat Network."
  ],
  [
    5,
    "b5-pg-15",
    "Pada TCP, penerima mengiklankan window W_A = ...",
    [
      "W_R",
      "W_R − (R_new − R_last)",
      "R_new − R_last",
      "S_recent − S_last"
    ],
    1,
    "Pengirim harus menjaga (S_recent − S_last) ≤ W_A."
  ],
  [
    6,
    "b6-pg-01",
    "Pendekatan berbagi medium yang mempartisi medium dan mengalokasikannya secara dedicated adalah ...",
    [
      "Random access",
      "Polling",
      "Channelization",
      "Reservation"
    ],
    2,
    "Static: channelization (FDMA/TDMA/CDMA)."
  ],
  [
    6,
    "b6-pg-02",
    "Dua stasiun berbagi medium dengan a = t_prop/X = 0,25. Efisiensi maksimum 1/(1+2a) adalah ...",
    [
      "50%",
      "66,7%",
      "75%",
      "80%"
    ],
    1,
    "1/(1+0,5) = 0,667."
  ],
  [
    6,
    "b6-pg-03",
    "Throughput maksimum pure ALOHA adalah ...",
    [
      "18,4% pada G = 0,5",
      "36,8% pada G = 1",
      "50% pada G = 1",
      "100%"
    ],
    0,
    "S = G e^(−2G); maks 1/(2e)."
  ],
  [
    6,
    "b6-pg-04",
    "Throughput maksimum slotted ALOHA adalah ... pada G = 1",
    [
      "18,4%",
      "36,8%",
      "50%",
      "63,2%"
    ],
    1,
    "S = G e^(−G); maks 1/e."
  ],
  [
    6,
    "b6-pg-05",
    "Perilaku 1-persistent CSMA ketika kanal sibuk adalah ...",
    [
      "Menunggu backoff lalu sense ulang",
      "Mengirim segera setelah kanal idle",
      "Mengirim dengan probabilitas p",
      "Menyerah"
    ],
    1,
    "Paling rakus: delay rendah, efisiensi rendah."
  ],
  [
    6,
    "b6-pg-06",
    "Dengan a = 0,1, efisiensi maksimum CSMA/CD 1/(1+6,44a) adalah ≈ ...",
    [
      "61%",
      "50%",
      "86%",
      "94%"
    ],
    0,
    "1/(1+0,644) = 0,608."
  ],
  [
    6,
    "b6-pg-07",
    "Setelah tabrakan ke-12 pada Ethernet, nilai backoff dipilih acak dari ...",
    [
      "{0..11}",
      "{0..1023}",
      "{0..4095}",
      "{0..15}"
    ],
    1,
    "k = min(n,10) → 2¹⁰ − 1 = 1023 (menyerah setelah 16 retransmisi)."
  ],
  [
    6,
    "b6-pg-08",
    "Ukuran frame minimum dan slot time Ethernet 10 Mbps adalah ...",
    [
      "46 byte; 5,12 µs",
      "64 byte; 51,2 µs",
      "512 byte; 51,2 µs",
      "1518 byte; 512 µs"
    ],
    1,
    "512 bit / 10 Mbps = 51,2 µs."
  ],
  [
    6,
    "b6-pg-09",
    "Layanan LLC Type 2 adalah ...",
    [
      "Unacknowledged connectionless",
      "Reliable connection-oriented (setara ABM HDLC)",
      "Acknowledged connectionless",
      "Broadcast"
    ],
    1,
    "Type 1: unacknowledged connectionless; Type 3: acknowledged connectionless."
  ],
  [
    6,
    "b6-pg-10",
    "Masalah hidden terminal pada wireless LAN diatasi dengan ...",
    [
      "CSMA/CD",
      "RTS/CTS (CSMA/CA)",
      "Token passing",
      "Bit stuffing"
    ],
    1,
    "A kirim RTS, B balas CTS, C diam."
  ],
  [
    6,
    "b6-pg-11",
    "Urutan IFS pada 802.11 dari terpendek (prioritas tertinggi) adalah ...",
    [
      "DIFS < PIFS < SIFS",
      "SIFS < PIFS < DIFS",
      "PIFS < SIFS < DIFS",
      "SIFS < DIFS < PIFS"
    ],
    1,
    "SIFS untuk ACK, CTS; DIFS untuk data biasa."
  ],
  [
    6,
    "b6-pg-12",
    "Transparent bridge yang menerima frame dengan alamat tujuan belum dikenal akan ...",
    [
      "Membuang frame",
      "Melakukan flooding",
      "Menolak dengan REJ",
      "Mengirim ke root bridge saja"
    ],
    1,
    "Backward learning dari alamat sumber."
  ],
  [
    6,
    "b6-pg-13",
    "Pada Spanning Tree Algorithm, root bridge dipilih berdasarkan ...",
    [
      "Bridge ID terendah",
      "Jumlah port terbanyak",
      "Biaya terbesar",
      "Alamat IP tertinggi"
    ],
    0,
    "Lalu root port = jalur biaya terkecil ke root."
  ],
  [
    6,
    "b6-pg-14",
    "Token ring R = 4 Mbps, M = 20 stasiun, jarak antar stasiun 100 m, ν = 2×10⁸ m/s, b = 2,5 bit. Ring latency = ...",
    [
      "40 bit",
      "50 bit",
      "90 bit",
      "840 bit"
    ],
    2,
    "40 (propagasi) + 50 (stasiun) = 90 bit."
  ],
  [
    6,
    "b6-pg-15",
    "Urutan efisiensi spektrum seluler dari terendah ke tertinggi adalah ...",
    [
      "IS-95 < GSM < IS-54 < AMPS",
      "AMPS < IS-54 < GSM < IS-95",
      "GSM < AMPS < IS-95 < IS-54",
      "IS-54 < AMPS < GSM < IS-95"
    ],
    1,
    "2,26 < 3 < 6,61 < 12–45 calls/cell/MHz."
  ]
];

// Benar/Salah: [bab, id, pernyataan, jawaban_int, penjelasan]
const B = [
  [
    1,
    "b1-bs-01",
    "Circuit switching mengurangi jumlah koneksi dari N(N-1)/2 menjadi N koneksi ke central office.",
    1,
    "Solusi masalah N²."
  ],
  [
    1,
    "b1-bs-02",
    "Pada packet switching ARPANET, diperlukan connection setup sebelum packet dikirim.",
    0,
    "Tidak ada connection setup; tiap packet membawa alamat."
  ],
  [
    1,
    "b1-bs-03",
    "Traffic Internet pernah melampaui traffic suara.",
    1,
    "Era 1980–90-an."
  ],
  [
    1,
    "b1-bs-04",
    "TCP dan UDP keduanya menyediakan transfer yang reliable.",
    0,
    "Hanya TCP; UDP best-effort."
  ],
  [
    1,
    "b1-bs-05",
    "Protokol adalah aturan yang mengatur interaksi dua atau lebih pihak yang berkomunikasi.",
    1,
    "Definisi protocol."
  ],
  [
    1,
    "b1-bs-06",
    "Moore's Law menyatakan nilai jaringan berbanding lurus dengan kuadrat jumlah pengguna.",
    0,
    "Itu Metcalfe's Law."
  ],
  [
    1,
    "b1-bs-07",
    "Router (gateway) dipakai untuk menghubungkan jaringan-jaringan yang berbeda dalam Internet.",
    1,
    "Internet = network of networks."
  ],
  [
    1,
    "b1-bs-08",
    "Ethernet MAC memakai alamat unik global pada NIC dan mendeteksi collision.",
    1,
    "Collision → abort & jadwal ulang."
  ],
  [
    1,
    "b1-bs-09",
    "Pada ARPANET, flow control dilakukan antar packet switch sumber dan tujuan.",
    0,
    "Flow control antar host; congestion control antar packet switch sumber–tujuan."
  ],
  [
    1,
    "b1-bs-10",
    "Standar membantu interoperabilitas dan memanfaatkan network effect.",
    1,
    "Manfaat standar."
  ],
  [
    1,
    "b1-bs-11",
    "Satu serat optik dapat membawa 160 sinyal OC-192 sekitar 1,6 Tbps.",
    1,
    "160 × 10 Gbps."
  ],
  [
    1,
    "b1-bs-12",
    "Layanan (service) dan aplikasi (application) adalah hal yang sama.",
    0,
    "Aplikasi dibangun di atas service."
  ],
  [
    1,
    "b1-bs-13",
    "Telegraf, telepon, dan Internet masing-masing berbasis message, circuit, dan packet switching.",
    1,
    "Tiga arsitektur."
  ],
  [
    1,
    "b1-bs-14",
    "Faktor regulasi tidak berpengaruh terhadap keberhasilan layanan baru.",
    0,
    "Technology, Market, Regulation."
  ],
  [
    1,
    "b1-bs-15",
    "Peer-to-peer membentuk overlay network dan berbagi pemrosesan serta file antar komputer.",
    1,
    "Tren P2P."
  ],
  [
    2,
    "b2-bs-01",
    "Peer-to-peer communication antar layer yang sama bersifat virtual dan sebenarnya tidak langsung.",
    1,
    "Fisiknya lewat layer bawah."
  ],
  [
    2,
    "b2-bs-02",
    "TCP bersifat connection-oriented dan UDP bersifat connectionless.",
    1,
    "TCP 3 fase; UDP tanpa setup."
  ],
  [
    2,
    "b2-bs-03",
    "Alamat IP berubah di setiap hop, sedangkan alamat MAC tetap end-to-end.",
    0,
    "Sebaliknya."
  ],
  [
    2,
    "b2-bs-04",
    "DNS memakai UDP dengan well-known port 53.",
    1,
    "Pesan pendek."
  ],
  [
    2,
    "b2-bs-05",
    "Header Ethernet berisi source dan destination IP address.",
    0,
    "Berisi MAC address + protocol type."
  ],
  [
    2,
    "b2-bs-06",
    "Pada OSI, layer Network bekerja node-to-node sedangkan Transport end-to-end.",
    1,
    "Benar."
  ],
  [
    2,
    "b2-bs-07",
    "Server socket mendapat ephemeral port, klien memakai well-known port.",
    0,
    "Terbalik."
  ],
  [
    2,
    "b2-bs-08",
    "Socket TCP mempertahankan batas pesan (message boundaries).",
    0,
    "TCP byte stream; UDP menjaga batas."
  ],
  [
    2,
    "b2-bs-09",
    "Pada UDP socket tidak ada fungsi listen, accept, maupun connect.",
    1,
    "Pakai sendto/recvfrom."
  ],
  [
    2,
    "b2-bs-10",
    "FTP memerlukan data connection baru untuk setiap transfer file.",
    1,
    "Control tetap, data baru tiap transfer."
  ],
  [
    2,
    "b2-bs-11",
    "HTTP 1.0 memakai persistent connection sebagai default.",
    0,
    "Persistent default di HTTP 1.1."
  ],
  [
    2,
    "b2-bs-12",
    "Traceroute memakai TTL yang meningkat dan balasan ICMP Time Exceeded.",
    1,
    "Mengungkap router per hop."
  ],
  [
    2,
    "b2-bs-13",
    "Telnet memakai Network Virtual Terminal (NVT).",
    1,
    "Terminal lowest common denominator."
  ],
  [
    2,
    "b2-bs-14",
    "PPP memakai alamat 48 bit seperti Ethernet.",
    0,
    "PPP tidak memakai alamat individual."
  ],
  [
    2,
    "b2-bs-15",
    "Encapsulation adalah kunci layering: tiap layer menambahkan header (dan trailer di data link).",
    1,
    "Header AH, TH, NH, DH + CRC."
  ],
  [
    3,
    "b3-bs-01",
    "Jika laju transmisi R < kapasitas Shannon C, komunikasi arbitrarily reliable dimungkinkan.",
    1,
    "Dengan coding cukup kompleks."
  ],
  [
    3,
    "b3-bs-02",
    "Repeater analog mampu memulihkan urutan bit asli sehingga kualitas tidak turun.",
    0,
    "Itu regenerator digital; repeater analog menumpuk noise."
  ],
  [
    3,
    "b3-bs-03",
    "Manchester memakai bandwidth dua kali bandwidth minimum.",
    1,
    "Tetapi timing recovery mudah."
  ],
  [
    3,
    "b3-bs-04",
    "Parity check tunggal dapat mendeteksi semua pola error, termasuk jumlah bit error genap.",
    0,
    "Error genap tidak terdeteksi."
  ],
  [
    3,
    "b3-bs-05",
    "Two-dimensional parity selalu mendeteksi 1, 2, atau 3 error.",
    1,
    "≥4 error tertentu lolos."
  ],
  [
    3,
    "b3-bs-06",
    "Kode Hamming (7,4) mampu mengoreksi semua pola single error.",
    1,
    "Syndrome cocok dengan kolom H."
  ],
  [
    3,
    "b3-bs-07",
    "Atenuasi pada media wireless bergantung secara eksponensial pada jarak.",
    0,
    "Wired eksponensial; wireless logaritmik (path loss exponent)."
  ],
  [
    3,
    "b3-bs-08",
    "Serat multimode mengalami dispersi sehingga membatasi bit rate.",
    1,
    "Sinar di jalur berbeda saling interferensi."
  ],
  [
    3,
    "b3-bs-09",
    "1 kbps = 2¹⁰ bps.",
    0,
    "1 kbps = 10³ bps."
  ],
  [
    3,
    "b3-bs-10",
    "Kompresi lossy seperti JPEG memulihkan data persis sama dengan aslinya.",
    0,
    "Itu lossless."
  ],
  [
    3,
    "b3-bs-11",
    "Internet checksum dihitung ulang di setiap router sehingga dipilih algoritma yang mudah di software.",
    1,
    "One's complement."
  ],
  [
    3,
    "b3-bs-12",
    "Sampling rate minimum sama dengan bandwidth sinyal Ws.",
    0,
    "Minimum 2·Ws."
  ],
  [
    3,
    "b3-bs-13",
    "Pada PSK, bit '1' dan '0' dibedakan dengan fase 0 dan π.",
    1,
    "A cos(2πft) vs −A cos(2πft)."
  ],
  [
    3,
    "b3-bs-14",
    "Transmisi sinkron dapat menyinkronkan clock penerima memakai PLL pada kode Manchester.",
    1,
    "R transisi mengandung sinus R Hz."
  ],
  [
    3,
    "b3-bs-15",
    "Crosstalk adalah noise elektronik akibat agitasi termal.",
    0,
    "Itu thermal noise; crosstalk = efek sinyal lain."
  ],
  [
    4,
    "b4-bs-01",
    "FDM memakai carrier berbeda dan guard band untuk menghindari overlap.",
    1,
    "Contoh: radio, TV kabel, GSM."
  ],
  [
    4,
    "b4-bs-02",
    "Pada TDM sinkron, slot tidak dialokasikan bila sumber tidak punya data.",
    0,
    "Slot tetap dialokasikan meski kosong."
  ],
  [
    4,
    "b4-bs-03",
    "T-1 membawa 24 kanal suara dengan 1 framing bit per frame.",
    1,
    "193 bit per frame."
  ],
  [
    4,
    "b4-bs-04",
    "Statistical TDM memungkinkan data rate link lebih rendah daripada agregat input.",
    1,
    "Slot dialokasikan sesuai permintaan."
  ],
  [
    4,
    "b4-bs-05",
    "WDM adalah versi optik dari TDM.",
    0,
    "Versi optik dari FDM."
  ],
  [
    4,
    "b4-bs-06",
    "Pada virtual-circuit switching, jalur ditetapkan sebelumnya.",
    1,
    "Datagram: independen."
  ],
  [
    4,
    "b4-bs-07",
    "Signaling network membawa informasi user, transport network mengontrol koneksi.",
    0,
    "Terbalik."
  ],
  [
    4,
    "b4-bs-08",
    "SCCP pada SS7 mirip DNS.",
    1,
    "Menerjemahkan global titles."
  ],
  [
    4,
    "b4-bs-09",
    "MTP level 3 menyediakan routing dan congestion control pada SS7.",
    1,
    "Level 2 = data link."
  ],
  [
    4,
    "b4-bs-10",
    "Generasi 1G memakai suara digital.",
    0,
    "1G analog voice."
  ],
  [
    4,
    "b4-bs-11",
    "Jaringan 3G memiliki ranah circuit-switched (MSC, GMSC) dan packet-switched (SGSN, GGSN).",
    1,
    "Empat fungsi utama."
  ],
  [
    4,
    "b4-bs-12",
    "LTE (4G) memiliki komponen MME, SGW, PGW, dan HSS.",
    1,
    "PDN = public data network."
  ],
  [
    4,
    "b4-bs-13",
    "Network slicing dan massive MIMO termasuk penggerak (enabler) 5G.",
    1,
    "Bersama mmWave, LDPC."
  ],
  [
    4,
    "b4-bs-14",
    "MCC dan MNC bersifat dinamis, LAC dan CID bersifat tetap.",
    0,
    "MCC/MNC tetap; LAC/CID dinamis."
  ],
  [
    4,
    "b4-bs-15",
    "Pada FDM, tiga kanal suara 4 kHz dapat digabung tanpa guard band ke pita 12 kHz dengan menggeser tiap kanal ke pita berbeda.",
    1,
    "Contoh 1 di slide."
  ],
  [
    5,
    "b5-bs-01",
    "Go-Back-N membuang frame out-of-sequence dan mengirim ulang semua frame outstanding.",
    1,
    "Receive window = 1."
  ],
  [
    5,
    "b5-bs-02",
    "Selective Repeat memiliki receive window berukuran 1.",
    0,
    "W_r > 1 untuk mem-buffer."
  ],
  [
    5,
    "b5-bs-03",
    "Efisiensi Stop-and-Wait tidak terpengaruh oleh delay-bandwidth product.",
    0,
    "Turun drastis saat 2(tprop+tproc)R besar."
  ],
  [
    5,
    "b5-bs-04",
    "Urutan efisiensi ARQ adalah SR ≥ GBN ≥ S&W.",
    1,
    "SR terbaik."
  ],
  [
    5,
    "b5-bs-05",
    "TCP memakai variasi Selective Repeat ARQ.",
    1,
    "Seq # = byte pertama segmen."
  ],
  [
    5,
    "b5-bs-06",
    "N(R) pada HDLC mengakui semua frame sampai N(R) saja (inklusif).",
    0,
    "Sampai N(R)−1; N(R) = frame berikutnya yang diharapkan."
  ],
  [
    5,
    "b5-bs-07",
    "Frame REJ HDLC menyebabkan pengiriman ulang N(R) dan semua frame sesudahnya.",
    1,
    "Setara Go-Back-N."
  ],
  [
    5,
    "b5-bs-08",
    "HDLC memakai bit stuffing, sedangkan PPP memakai byte stuffing.",
    1,
    "PPP = HDLC berorientasi karakter."
  ],
  [
    5,
    "b5-bs-09",
    "PPP memiliki field Protocol sehingga dapat membawa banyak protokol network sekaligus.",
    1,
    "LCP, NCP, IP, IPX."
  ],
  [
    5,
    "b5-bs-10",
    "PAP mengirim password terenkripsi sehingga aman dari penyadapan.",
    0,
    "PAP plaintext; CHAP challenge-response."
  ],
  [
    5,
    "b5-bs-11",
    "Three-way handshake TCP: SYN → SYN+ACK → ACK.",
    1,
    "Ack_no = x+1 dan y+1."
  ],
  [
    5,
    "b5-bs-12",
    "TCP menggabungkan error control dan flow control dalam satu mekanisme window.",
    0,
    "TCP memisahkannya."
  ],
  [
    5,
    "b5-bs-13",
    "Pada HDLC window maksimum dengan penomoran 3 bit adalah 7.",
    1,
    "2^m − 1 (7 bit → 127)."
  ],
  [
    5,
    "b5-bs-14",
    "Pendekatan end-to-end error control lebih sulit di transport layer karena segment bisa tidak berurutan.",
    1,
    "Rute berbeda, delay panjang."
  ],
  [
    5,
    "b5-bs-15",
    "Statistical multiplexing menukar sebagian delay dengan efisiensi saluran.",
    1,
    "Packet di-buffer."
  ],
  [
    6,
    "b6-bs-01",
    "Pure ALOHA memiliki vulnerable period 2X, slotted ALOHA X.",
    1,
    "Slotted menggandakan throughput maks."
  ],
  [
    6,
    "b6-bs-02",
    "CSMA/CD mendeteksi tabrakan sambil mengirim sehingga hanya membuang waktu deteksi, bukan seluruh frame.",
    1,
    "Reaction time 2 t_prop."
  ],
  [
    6,
    "b6-bs-03",
    "Untuk a besar, ALOHA dan slotted ALOHA dapat lebih baik daripada CSMA/CD.",
    1,
    "CSMA/CD terbaik hanya untuk a kecil."
  ],
  [
    6,
    "b6-bs-04",
    "Token ring memakai CSMA/CD.",
    0,
    "Memakai token passing (polling terdistribusi)."
  ],
  [
    6,
    "b6-bs-05",
    "Channelization sangat efisien untuk trafik constant bit rate tetapi tidak untuk trafik bursty.",
    1,
    "Delay naik bersama M."
  ],
  [
    6,
    "b6-bs-06",
    "CDMA mengalikan data dengan pola pseudorandom sehingga bandwidth menyebar G kali.",
    1,
    "W = G·W₁."
  ],
  [
    6,
    "b6-bs-07",
    "Pada CDMA 3 pengguna di slide, integrator receiver 2 menghasilkan −4, +4, −4 sehingga bit 0, 1, 0.",
    1,
    "Sesuai contoh."
  ],
  [
    6,
    "b6-bs-08",
    "Frame Ethernet DIX II memakai field Length, IEEE 802.3 memakai field Type.",
    0,
    "Terbalik: DIX = Type; 802.3 = Length."
  ],
  [
    6,
    "b6-bs-09",
    "Hub membentuk satu collision domain, sedangkan switch memisahkan collision domain.",
    1,
    "Switch: full duplex."
  ],
  [
    6,
    "b6-bs-10",
    "Gigabit Ethernet meningkatkan slot time menjadi 512 byte dan memakai frame bursting.",
    1,
    "CSMA/CD praktis ditinggalkan."
  ],
  [
    6,
    "b6-bs-11",
    "Pada 802.11 prioritas tertinggi diberikan kepada frame yang menunggu DIFS.",
    0,
    "SIFS yang tertinggi."
  ],
  [
    6,
    "b6-bs-12",
    "Pada To DS = 1 dan From DS = 1, frame 802.11 adalah WDS antar-AP dengan 4 alamat.",
    1,
    "Addr4 dipakai."
  ],
  [
    6,
    "b6-bs-13",
    "Transparent bridge belajar dengan mengamati alamat sumber frame.",
    1,
    "Backward learning + aging timer."
  ],
  [
    6,
    "b6-bs-14",
    "Source routing bridge dipakai untuk 802.3 Ethernet.",
    0,
    "Untuk IEEE 802.5 token ring."
  ],
  [
    6,
    "b6-bs-15",
    "LLC PDU memakai DSAP/SSAP; contoh SAP 06 = IP dan AA = SNAP.",
    1,
    "E0 IPX, FE OSI."
  ]
];

// Isian Singkat: [bab, id, soal, keywords, display_jawaban, penjelasan]
const F = [
  [
    1,
    "b1-is-01",
    "Jumlah koneksi full mesh untuk 100 pengguna adalah ... (angka)",
    "4950",
    "4950",
    "100×99/2 = 4950."
  ],
  [
    1,
    "b1-is-02",
    "Kepanjangan PCM adalah ...",
    "Pulse Code Modulation",
    "Pulse Code Modulation",
    "Digitalisasi suara telepon."
  ],
  [
    1,
    "b1-is-03",
    "Paten telepon Bell diberikan pada tahun ...",
    "1876",
    "1876",
    "Bell Telephone Company berdiri 1877."
  ],
  [
    1,
    "b1-is-04",
    "Kapasitas satu serat optik dengan 160 sinyal OC-192 (10 Gbps) adalah ... Tbps",
    "1,6/1.6",
    "1,6",
    "160 × 10 Gbps = 1,6 Tbps."
  ],
  [
    1,
    "b1-is-05",
    "Nama arsitektur telegraf yang menyimpan pesan di node lalu meneruskannya adalah ...",
    "message switching/store-and-forward",
    "message switching",
    "Store-and-forward."
  ],
  [
    1,
    "b1-is-06",
    "Protokol yang mengonversi nama host menjadi alamat IP adalah ...",
    "DNS",
    "DNS",
    "Domain Name System."
  ],
  [
    1,
    "b1-is-07",
    "Panjang alamat IP dalam bit adalah ...",
    "32",
    "32",
    "Notasi dotted-decimal."
  ],
  [
    1,
    "b1-is-08",
    "Komite standar untuk LAN dan MAN adalah IEEE ...",
    "802",
    "802",
    "IEEE 802 Committee."
  ],
  [
    1,
    "b1-is-09",
    "Badan internasional standar telekomunikasi bernama ...",
    "ITU",
    "ITU",
    "International Telecommunications Union."
  ],
  [
    1,
    "b1-is-10",
    "Jaringan komputer pertama berbasis packet switching adalah ...",
    "ARPANET",
    "ARPANET",
    "ARPANET (1970-an)."
  ],
  [
    1,
    "b1-is-11",
    "Protokol yang memungkinkan timing recovery pada voice/video Internet adalah ... (singkatan)",
    "RTP",
    "RTP",
    "Real-time Transport Protocol; timestamp & sequence number."
  ],
  [
    1,
    "b1-is-12",
    "Singkatan OAM&B adalah Operations, Administration, Maintenance & ...",
    "Billing",
    "Billing",
    "Mirip jaringan transportasi (tol)."
  ],
  [
    1,
    "b1-is-13",
    "Jenis switching pada jaringan telepon adalah ... switching",
    "circuit",
    "circuit",
    "Rute dipilih saat setup."
  ],
  [
    1,
    "b1-is-14",
    "Efek pertumbuhan layanan berbentuk huruf ... (curve)",
    "S/S-curve",
    "S",
    "Menuju critical mass."
  ],
  [
    1,
    "b1-is-15",
    "Alamat IP hierarkis terdiri atas Net ID dan ...",
    "Host ID/hostid",
    "Host ID",
    "Routing berdasarkan Net ID."
  ],
  [
    2,
    "b2-is-01",
    "Layer OSI yang mentransfer 'frame' lewat koneksi langsung adalah layer ...",
    "Data Link/data link",
    "Data Link",
    "Data link: frame; Network: packet."
  ],
  [
    2,
    "b2-is-02",
    "Unit data protokol (singkatan) yang dipertukarkan antar peer process adalah ...",
    "PDU",
    "PDU",
    "Protocol Data Unit."
  ],
  [
    2,
    "b2-is-03",
    "Titik layanan tempat layer n+1 memanggil layanan layer n disebut ... (singkatan)",
    "SAP",
    "SAP",
    "Service Access Point."
  ],
  [
    2,
    "b2-is-04",
    "Protokol aplikasi yang memakai well-known port 80 adalah ...",
    "HTTP",
    "HTTP",
    "Server HTTP mendengarkan di port 80."
  ],
  [
    2,
    "b2-is-05",
    "Jumlah root name server DNS di dunia adalah ...",
    "13",
    "13",
    "Local → Root → Authoritative."
  ],
  [
    2,
    "b2-is-06",
    "Layanan IP bersifat connection... (connection-oriented / connectionless)",
    "connectionless",
    "connectionless",
    "UDP dan IP connectionless; TCP connection-oriented."
  ],
  [
    2,
    "b2-is-07",
    "Alamat fisik Ethernet 48 bit: 24 bit pertama menunjukkan ...",
    "pabrikan/manufacturer/vendor",
    "pabrikan",
    "24 bit kedua = nomor seri."
  ],
  [
    2,
    "b2-is-08",
    "Fungsi socket yang memulai TCP three-way handshake di sisi klien adalah ...",
    "connect/connect()",
    "connect",
    "Active open."
  ],
  [
    2,
    "b2-is-09",
    "Fungsi socket yang menetapkan alamat lokal dan port ke socket adalah ...",
    "bind/bind()",
    "bind",
    "Bisa wildcard IP."
  ],
  [
    2,
    "b2-is-10",
    "Fungsi socket UDP untuk mengirim data ke alamat tujuan adalah ...",
    "sendto/sendto()",
    "sendto",
    "Alamat tujuan boleh broadcast."
  ],
  [
    2,
    "b2-is-11",
    "Protokol yang dipakai ping adalah ... (singkatan)",
    "ICMP",
    "ICMP",
    "ICMP Echo."
  ],
  [
    2,
    "b2-is-12",
    "Field pada IP packet yang dikurangi 1 oleh setiap router adalah ... (singkatan)",
    "TTL",
    "TTL",
    "Time-to-Live; 0 → dibuang."
  ],
  [
    2,
    "b2-is-13",
    "Header yang menambahkan FCS sebagai trailer adalah header ...",
    "Ethernet/Data Link/data link",
    "Ethernet",
    "CRC/FCS hanya di data link."
  ],
  [
    2,
    "b2-is-14",
    "Method HTTP untuk menyimpan informasi pada lokasi URL adalah ...",
    "PUT",
    "PUT",
    "POST mengirim data form."
  ],
  [
    2,
    "b2-is-15",
    "Protocol HTTP bersifat ... (stateless/stateful); cookie dipakai untuk memberi konteks",
    "stateless",
    "stateless",
    "Server tidak menyimpan info klien."
  ],
  [
    3,
    "b3-is-01",
    "Bit rate suara telepon digital (8000 sampel/s × 8 bit) adalah ... kbps",
    "64",
    "64",
    "Rs = bit/sampel × sampel/detik."
  ],
  [
    3,
    "b3-is-02",
    "Sinyal dengan bandwidth 4 kHz minimal disampling pada ... sampel/detik",
    "8000/8.000",
    "8000",
    "Nyquist: 2·Ws."
  ],
  [
    3,
    "b3-is-03",
    "Kanal 3 kHz noise-free, sinyal 8 level. Bit rate maksimum = ... kbps",
    "18",
    "18",
    "2·3000·3 = 18.000 bps."
  ],
  [
    3,
    "b3-is-04",
    "Kapasitas Shannon telepon (Wc=3400 Hz, SNR=10000) kira-kira ... bps",
    "45200/45.200/45,2 kbps",
    "45200",
    "3400·log2(10001) ≈ 45.200."
  ],
  [
    3,
    "b3-is-05",
    "SNR 20 dB sama dengan rasio daya ... kali",
    "100",
    "100",
    "10^(20/10)."
  ],
  [
    3,
    "b3-is-06",
    "Jika pesan 1,6 Mbit dikirim pada 64 kbps (abaikan propagasi) waktu transmisi = ... detik",
    "25",
    "25",
    "L/R = 1.600.000/64.000."
  ],
  [
    3,
    "b3-is-07",
    "Bit paritas genap untuk info 0101100 adalah ...",
    "1",
    "1",
    "Jumlah 1 = 3 (ganjil) → tambah 1."
  ],
  [
    3,
    "b3-is-08",
    "Pada CRC, codeword valid jika sisa pembagian oleh g(x) bernilai ...",
    "0/nol",
    "0",
    "Sisa tak nol = error."
  ],
  [
    3,
    "b3-is-09",
    "Line code 3 level dengan '1' bergantian +A/−A dan '0' tanpa pulsa disebut ...",
    "bipolar/Bipolar",
    "bipolar",
    "Dengan zero substitution (B6ZS) mengatasi deretan 0."
  ],
  [
    3,
    "b3-is-10",
    "Skema 8B10B dipakai pada standar ...",
    "Gigabit Ethernet/1000 Mbps Ethernet",
    "Gigabit Ethernet",
    "4B5B → 100 Mbps; 64B66B → 10G."
  ],
  [
    3,
    "b3-is-11",
    "Jumlah codeword pada Hamming (7,4) adalah ...",
    "16",
    "16",
    "2⁴ = 16."
  ],
  [
    3,
    "b3-is-12",
    "Kecepatan propagasi sinyal di kawat tembaga adalah ... ×10⁸ m/s",
    "2,3/2.3",
    "2,3",
    "Serat optik 2,0; vakum 3,0."
  ],
  [
    3,
    "b3-is-13",
    "Jendela serat optik untuk jaringan jarak jauh (long haul) adalah ... nm",
    "1550",
    "1550",
    "850 LAN; 1300 MAN."
  ],
  [
    3,
    "b3-is-14",
    "Kepanjangan DTE pada RS-232 adalah Data Terminal ...",
    "Equipment",
    "Equipment",
    "DCE = modem."
  ],
  [
    3,
    "b3-is-15",
    "Pada transmisi asinkron, setiap karakter diakhiri dengan ... bit",
    "stop",
    "stop",
    "Idle → start → 8 data → stop."
  ],
  [
    4,
    "b4-is-01",
    "Tiga kategori multiplexing adalah FDM, WDM, dan ...",
    "TDM",
    "TDM",
    "Time Division Multiplexing."
  ],
  [
    4,
    "b4-is-02",
    "Bandwidth minimum untuk 3 kanal @ 50 kHz dengan guard band 5 kHz adalah ... kHz",
    "160",
    "160",
    "3×50 + 2×5 = 160."
  ],
  [
    4,
    "b4-is-03",
    "Satu supergroup berisi ... group",
    "5",
    "5",
    "= 60 kanal suara (312–552 kHz)."
  ],
  [
    4,
    "b4-is-04",
    "16 channel OC-48 (2,5 Gbps) = ... Gbps",
    "40",
    "40",
    "16 × 2,5."
  ],
  [
    4,
    "b4-is-05",
    "Bit rate DS-1 = ... Mbps",
    "1,544/1.544",
    "1,544",
    "(1+24×8)×8000."
  ],
  [
    4,
    "b4-is-06",
    "Empat kanal 100 byte/s, 1 byte per kanal. Ukuran frame = ... bit",
    "32",
    "32",
    "4 byte × 8; bit rate link = 3200 bps."
  ],
  [
    4,
    "b4-is-07",
    "Pada kasus tersebut frame rate = ... frame/s",
    "100",
    "100",
    "100 byte/s per kanal, 1 byte per frame."
  ],
  [
    4,
    "b4-is-08",
    "Multiplexer 4 kanal @100 kbps slot 2 bit: bit rate link = ... kbps",
    "400",
    "400",
    "4 × 100 kbps."
  ],
  [
    4,
    "b4-is-09",
    "Durasi satu frame pada soal sebelumnya = ... mikrodetik",
    "20",
    "20",
    "1/50.000 s."
  ],
  [
    4,
    "b4-is-10",
    "Singkatan SS7 adalah Signaling System ...",
    "7/tujuh",
    "7",
    "Jaringan packet pengontrol panggilan."
  ],
  [
    4,
    "b4-is-11",
    "Layanan SS7 setara layer data link OSI adalah MTP level ...",
    "2",
    "2",
    "Level 1 fisik, level 3 routing & congestion control."
  ],
  [
    4,
    "b4-is-12",
    "Switch yang membentuk kanal dedicated sebelum komunikasi disebut ... switching",
    "circuit",
    "circuit",
    "Space-division atau time-division."
  ],
  [
    4,
    "b4-is-13",
    "Singkatan MSC pada jaringan seluler adalah Mobile Switching ...",
    "Center/Centre",
    "Center",
    "Terhubung ke base station dan PSTN."
  ],
  [
    4,
    "b4-is-14",
    "Pada LTE, entitas yang mengelola mobilitas adalah ... (singkatan)",
    "MME",
    "MME",
    "Mobility Management Entity."
  ],
  [
    4,
    "b4-is-15",
    "Teknologi coding kanal baru pada 5G adalah ... (singkatan)",
    "LDPC",
    "LDPC",
    "Low-Density Parity-Check."
  ],
  [
    5,
    "b5-is-01",
    "Varian ARQ selain Stop-and-Wait dan Go-Back-N adalah ...",
    "Selective Repeat/selective repeat",
    "Selective Repeat",
    "Dipakai TCP."
  ],
  [
    5,
    "b5-is-02",
    "Ukuran window Go-Back-N maksimum untuk m = 4 adalah ...",
    "15",
    "15",
    "2^4 − 1."
  ],
  [
    5,
    "b5-is-03",
    "Pada Selective Repeat m = 3, W_s = W_r maksimum = ...",
    "4",
    "4",
    "W_s + W_r ≤ 8."
  ],
  [
    5,
    "b5-is-04",
    "Frame 1000 bit @1 Mbps, 2(t_prop+t_proc) = 4 ms. Efisiensi S&W (abaikan overhead) = ... %",
    "20",
    "20",
    "1/(1+4)."
  ],
  [
    5,
    "b5-is-05",
    "n_f = 10.000 bit, p = 10⁻⁵. Nilai 1−P_f ≈ ... (3 desimal, titik)",
    "0.905",
    "0.905",
    "e^(−0,1)."
  ],
  [
    5,
    "b5-is-06",
    "Dengan P_f = 0,1; W_s = 11 (abaikan overhead) efisiensi GBN = ...",
    "0.45/0,45",
    "0.45",
    "0,9/(1+10×0,1)."
  ],
  [
    5,
    "b5-is-07",
    "Pola flag pada HDLC dan PPP adalah ... (8 bit)",
    "01111110",
    "01111110",
    "0x7E."
  ],
  [
    5,
    "b5-is-08",
    "Hasil bit stuffing data 0111110 adalah ...",
    "01111100",
    "01111100",
    "Sisipkan 0 setelah lima 1."
  ],
  [
    5,
    "b5-is-09",
    "Byte stuffing PPP mengganti 0x7E menjadi ... (heksadesimal, dua byte)",
    "7D 5E/0x7D 0x5E",
    "7D 5E",
    "Escape 0x7D + (0x7E XOR 0x20)."
  ],
  [
    5,
    "b5-is-10",
    "Frame supervisory HDLC yang meminta pengirim berhenti mengirim I-frame adalah ...",
    "RNR",
    "RNR",
    "Receive Not Ready."
  ],
  [
    5,
    "b5-is-11",
    "Frame unnumbered HDLC untuk membuka mode ABM adalah ...",
    "SABM",
    "SABM",
    "Dijawab UA; DISC menutup."
  ],
  [
    5,
    "b5-is-12",
    "Protokol PPP untuk membangun, menguji, dan menurunkan link adalah ... (singkatan)",
    "LCP",
    "LCP",
    "NCP mengonfigurasi network layer."
  ],
  [
    5,
    "b5-is-13",
    "Pada estimasi timeout TCP, t_out = t_RTT + ... × d_RTT",
    "4",
    "4",
    "α = 7/8."
  ],
  [
    5,
    "b5-is-14",
    "Mode HDLC untuk polling multidrop line adalah ... (singkatan)",
    "NRM",
    "NRM",
    "ABM untuk point-to-point full-duplex."
  ],
  [
    5,
    "b5-is-15",
    "Metode autentikasi PPP berbasis challenge dan shared secret adalah ...",
    "CHAP",
    "CHAP",
    "PAP mengirim password tanpa enkripsi."
  ],
  [
    6,
    "b6-is-01",
    "Slot time Ethernet 10 Mbps = ... mikrodetik",
    "51,2/51.2",
    "51,2",
    "512 bit / 10 Mbps."
  ],
  [
    6,
    "b6-is-02",
    "Ukuran maksimum frame Ethernet 802.3 (tanpa preamble & SD) = ... byte",
    "1518",
    "1518",
    "Informasi maks 1500 byte (0x05DC)."
  ],
  [
    6,
    "b6-is-03",
    "Preamble Ethernet terdiri atas 7 byte berpola ...",
    "10101010",
    "10101010",
    "SD = 10101011."
  ],
  [
    6,
    "b6-is-04",
    "Alamat MAC broadcast Ethernet berisi bit semua ...",
    "1",
    "1",
    "111…111 (FF-FF-FF-FF-FF-FF)."
  ],
  [
    6,
    "b6-is-05",
    "Ring latency token ring R = 16 Mbps, M = 80 adalah ... bit",
    "840",
    "840",
    "Dari slide contoh 2."
  ],
  [
    6,
    "b6-is-06",
    "Lebar kanal suara analog AMPS = ... kHz",
    "30",
    "30",
    "416 kanal dua arah per provider."
  ],
  [
    6,
    "b6-is-07",
    "Satu sinyal IS-95 (CDMA) menempati bandwidth ... MHz",
    "1,23/1.23",
    "1,23",
    "Setara 41 sinyal AMPS."
  ],
  [
    6,
    "b6-is-08",
    "Bit data per slot GSM adalah ... bit (dari 156,25 bit total)",
    "114",
    "114",
    "Kanal penuh: 22,8 kbps."
  ],
  [
    6,
    "b6-is-09",
    "Standar kecepatan 11 Mbps pada pita 2,4 GHz dengan CCK adalah IEEE 802.11 ...",
    "b",
    "b",
    "802.11g 54 Mbps (OFDM)."
  ],
  [
    6,
    "b6-is-10",
    "Standar IEEE untuk VLAN tagged adalah 802.1 ...",
    "Q/q",
    "Q",
    "Tag disisipkan setelah MAC sumber."
  ],
  [
    6,
    "b6-is-11",
    "Algoritma yang mencegah loop pada bridge disebut ... Tree",
    "Spanning",
    "Spanning",
    "Port root & designated → forwarding; lainnya blocking."
  ],
  [
    6,
    "b6-is-12",
    "Rata-rata slot yang dibutuhkan untuk resolusi contention CSMA/CD = e ≈ ... (3 desimal)",
    "2.718/2,718",
    "2.718",
    "1/P_max."
  ],
  [
    6,
    "b6-is-13",
    "Dua stasiun a = 0,25: efisiensi maksimum = ... (desimal, titik, 3 angka)",
    "0.667",
    "0.667",
    "1/(1+2×0,25)."
  ],
  [
    6,
    "b6-is-14",
    "Station management 802.11 untuk virtual carrier sensing memakai ... (singkatan)",
    "NAV",
    "NAV",
    "Network Allocation Vector dari field Duration RTS/CTS."
  ],
  [
    6,
    "b6-is-15",
    "Pada token ring 802.5, bit PPP pada AC menyediakan ... level prioritas",
    "8",
    "8",
    "Bit RRR untuk reservasi/bid-up."
  ]
];

// Cocokkan Pasangan: [bab, judul, opsi_kiri, [[kasus_kanan, idx_kiri]...]]
const M = [
  [
    1,
    "Pengantar Jaringan Komunikasi (Set 1)",
    [
      "Message switching",
      "Circuit switching",
      "Packet switching",
      "Polling protocol",
      "Statistical multiplexer"
    ],
    [
      [
        "Teknologi kunci jaringan telegraf",
        0
      ],
      [
        "Rute dipilih saat setup, koneksi end-to-end",
        1
      ],
      [
        "Pesan dipecah jadi packet dengan panjang maksimum",
        2
      ],
      [
        "MAC awal di multidrop line terminal",
        3
      ],
      [
        "Satu jalur membawa frame dari banyak terminal (buffer)",
        4
      ]
    ]
  ],
  [
    1,
    "Pengantar Jaringan Komunikasi (Set 2)",
    [
      "CRC",
      "ARPANET",
      "IP",
      "UDP",
      "TCP"
    ],
    [
      [
        "Deteksi error ditambahkan di akhir frame",
        0
      ],
      [
        "Jaringan packet switching awal; email, remote login, file transfer",
        1
      ],
      [
        "Best-effort connectionless tanpa retransmisi",
        2
      ],
      [
        "Transfer best-effort blok informasi individual",
        3
      ],
      [
        "Transfer reliable stream byte",
        4
      ]
    ]
  ],
  [
    1,
    "Pengantar Jaringan Komunikasi (Set 3)",
    [
      "DNS",
      "Moore's Law",
      "Metcalfe's Law",
      "IETF",
      "Strowger"
    ],
    [
      [
        "Konversi nama ↔ alamat IP",
        0
      ],
      [
        "Transistor per IC berlipat dua tiap dua tahun",
        1
      ],
      [
        "Kegunaan ∝ kuadrat jumlah pengguna",
        2
      ],
      [
        "Standar Internet (RFC)",
        3
      ],
      [
        "Penemu saklar otomatis 1888",
        4
      ]
    ]
  ],
  [
    2,
    "Arsitektur Berlapis, OSI, TCP/IP, Socket & Protokol Aplikasi (Set 1)",
    [
      "Physical layer",
      "Data Link layer",
      "Network layer",
      "Transport layer",
      "Presentation layer"
    ],
    [
      [
        "Mentransfer bit lewat link",
        0
      ],
      [
        "Mentransfer frame, deteksi error, flow control",
        1
      ],
      [
        "Mentransfer packet lintas jaringan, routing",
        2
      ],
      [
        "Komunikasi proses ke proses (TCP/UDP)",
        3
      ],
      [
        "Representasi data independen mesin",
        4
      ]
    ]
  ],
  [
    2,
    "Arsitektur Berlapis, OSI, TCP/IP, Socket & Protokol Aplikasi (Set 2)",
    [
      "Session layer",
      "SDU",
      "ARP",
      "Port 21",
      "Port 53"
    ],
    [
      [
        "Dialog management dan pemulihan error",
        0
      ],
      [
        "Data dari layer atas yang dienkapsulasi",
        1
      ],
      [
        "Resolusi alamat IP ke alamat fisik",
        2
      ],
      [
        "FTP control connection",
        3
      ],
      [
        "DNS",
        4
      ]
    ]
  ],
  [
    2,
    "Arsitektur Berlapis, OSI, TCP/IP, Socket & Protokol Aplikasi (Set 3)",
    [
      "ICMP Echo",
      "TTL",
      "listen()",
      "accept()",
      "HEAD"
    ],
    [
      [
        "Dipakai ping",
        0
      ],
      [
        "Dikurangi 1 tiap router; dipakai traceroute",
        1
      ],
      [
        "Server siap menerima permintaan koneksi (antrean)",
        2
      ],
      [
        "Memberi descriptor baru untuk koneksi masuk",
        3
      ],
      [
        "Method HTTP mengambil meta-information saja",
        4
      ]
    ]
  ],
  [
    3,
    "Dasar-Dasar Transmisi Digital (Set 1)",
    [
      "ASK",
      "FSK",
      "PSK",
      "Unipolar NRZ",
      "Manchester"
    ],
    [
      [
        "Modulasi amplitudo: 1 = ada sinusoid, 0 = tidak ada",
        0
      ],
      [
        "Modulasi frekuensi fc±δ",
        1
      ],
      [
        "Modulasi fase 0 atau π",
        2
      ],
      [
        "Daya rata-rata A²/2, komponen frekuensi rendah",
        3
      ],
      [
        "Transisi di tengah tiap bit, 2× bandwidth",
        4
      ]
    ]
  ],
  [
    3,
    "Dasar-Dasar Transmisi Digital (Set 2)",
    [
      "Bipolar",
      "4B5B",
      "Nyquist",
      "Shannon",
      "Thermal noise"
    ],
    [
      [
        "3 level, '1' bergantian +A/−A",
        0
      ],
      [
        "Line code Fast Ethernet / FDDI",
        1
      ],
      [
        "Laju pulsa maksimum 2Wc tanpa ISI",
        2
      ],
      [
        "C = Wc log2(1+SNR)",
        3
      ],
      [
        "Noise elektronik akibat agitasi termal",
        4
      ]
    ]
  ],
  [
    3,
    "Dasar-Dasar Transmisi Digital (Set 3)",
    [
      "Impulse noise",
      "Crosstalk",
      "Single-mode fiber",
      "CCITT-16",
      "DTE"
    ],
    [
      [
        "Burst noise tiba-tiba dan acak",
        0
      ],
      [
        "Satu sinyal mengganggu sinyal lain",
        1
      ],
      [
        "Inti sangat tipis, satu jalur, laser mahal",
        2
      ],
      [
        "Generator CRC x¹⁶+x¹²+x⁵+1 (HDLC)",
        3
      ],
      [
        "Komputer pada antarmuka RS-232",
        4
      ]
    ]
  ],
  [
    4,
    "Multiplexing, Switching, Jaringan Telepon & Seluler (Set 1)",
    [
      "FDM",
      "TDM",
      "WDM",
      "Group",
      "Supergroup"
    ],
    [
      [
        "Dibagi berdasarkan pita frekuensi + guard band",
        0
      ],
      [
        "Dibagi berdasarkan time slot dalam frame",
        1
      ],
      [
        "FDM optik: banyak warna laser dalam satu serat",
        2
      ],
      [
        "12 kanal suara, 60–108 kHz",
        3
      ],
      [
        "60 sinyal suara, 312–552 kHz",
        4
      ]
    ]
  ],
  [
    4,
    "Multiplexing, Switching, Jaringan Telepon & Seluler (Set 2)",
    [
      "Mastergroup",
      "DS-1",
      "E-1",
      "Datagram network",
      "Virtual-circuit network"
    ],
    [
      [
        "600 sinyal suara, 564–3084 kHz",
        0
      ],
      [
        "1,544 Mbps",
        1
      ],
      [
        "2,048 Mbps (32×64 kbps)",
        2
      ],
      [
        "Tiap packet di-switch independen",
        3
      ],
      [
        "Jalur pra-tetap, resource dibagi",
        4
      ]
    ]
  ],
  [
    4,
    "Multiplexing, Switching, Jaringan Telepon & Seluler (Set 3)",
    [
      "ISUP",
      "TCAP",
      "SGSN",
      "2G",
      "LAC & CID"
    ],
    [
      [
        "Setup, manajemen, release panggilan telepon",
        0
      ],
      [
        "Pesan & protokol antar aplikasi di SS7",
        1
      ],
      [
        "Mobility management & billing pada packet core 3G",
        2
      ],
      [
        "Digital voice + data sederhana (<0,5 Mbps)",
        3
      ],
      [
        "Kode lokasi dinamis pada identifikasi ponsel",
        4
      ]
    ]
  ],
  [
    5,
    "Peer-to-Peer Protocols, ARQ, Flow Control & Data Link Layer (Set 1)",
    [
      "Stop-and-Wait",
      "Go-Back-N",
      "Selective Repeat",
      "XON/XOFF",
      "RR"
    ],
    [
      [
        "Kirim satu frame lalu tunggu ACK",
        0
      ],
      [
        "Pipelining; kirim ulang semua frame outstanding",
        1
      ],
      [
        "Kirim ulang hanya frame yang salah; receive window > 1",
        2
      ],
      [
        "Flow control dengan threshold buffer",
        3
      ],
      [
        "ACK / siap menerima (HDLC supervisory)",
        4
      ]
    ]
  ],
  [
    5,
    "Peer-to-Peer Protocols, ARQ, Flow Control & Data Link Layer (Set 2)",
    [
      "REJ",
      "SREJ",
      "SABM",
      "DISC",
      "NRM"
    ],
    [
      [
        "NAK; ulang dari N(R) dan seterusnya",
        0
      ],
      [
        "NAK; ulang hanya N(R)",
        1
      ],
      [
        "Set Asynchronous Balanced Mode",
        2
      ],
      [
        "Mengakhiri koneksi logis HDLC",
        3
      ],
      [
        "Primary mem-poll secondary di multidrop",
        4
      ]
    ]
  ],
  [
    5,
    "Peer-to-Peer Protocols, ARQ, Flow Control & Data Link Layer (Set 3)",
    [
      "ABM",
      "LCP",
      "NCP",
      "GFP",
      "RTP"
    ],
    [
      [
        "Stasiun gabungan di link point-to-point full duplex",
        0
      ],
      [
        "Setup, uji, negosiasi, autentikasi link PPP",
        1
      ],
      [
        "Konfigurasi network layer (IP, IPX, AppleTalk) di PPP",
        2
      ],
      [
        "Framing dengan PLI + cHEC (CRC-16), mode frame-mapped/transparent",
        3
      ],
      [
        "Timestamp + sequence number untuk timing recovery",
        4
      ]
    ]
  ],
  [
    6,
    "Medium Access Control & Local Area Networks (Set 1)",
    [
      "ALOHA",
      "Slotted ALOHA",
      "1-persistent CSMA",
      "Non-persistent CSMA",
      "CSMA/CD"
    ],
    [
      [
        "Kirim kapan saja, backoff acak bila collision; maks 18,4%",
        0
      ],
      [
        "Transmisi pada awal slot; maks 36,8%",
        1
      ],
      [
        "Kirim segera setelah kanal idle",
        2
      ],
      [
        "Backoff dulu lalu sense ulang",
        3
      ],
      [
        "Deteksi collision saat mengirim (Ethernet)",
        4
      ]
    ]
  ],
  [
    6,
    "Medium Access Control & Local Area Networks (Set 2)",
    [
      "CSMA/CA",
      "FDMA",
      "TDMA",
      "CDMA",
      "LLC (802.2)"
    ],
    [
      [
        "Hindari collision dengan RTS/CTS (802.11)",
        0
      ],
      [
        "Alokasi pita frekuensi per pengguna (AMPS)",
        1
      ],
      [
        "Alokasi slot waktu (IS-54, GSM)",
        2
      ],
      [
        "Alokasi kode pseudorandom/ortogonal (IS-95)",
        3
      ],
      [
        "Sublayer di atas MAC; Type 1/2/3 dan SAP",
        4
      ]
    ]
  ],
  [
    6,
    "Medium Access Control & Local Area Networks (Set 3)",
    [
      "FDDI",
      "SIFS",
      "NAV",
      "Spanning tree",
      "802.1Q"
    ],
    [
      [
        "Dual ring counter-rotating 100 Mbps, timed token",
        0
      ],
      [
        "Interframe space terpendek: ACK, CTS",
        1
      ],
      [
        "Virtual carrier sensing 802.11",
        2
      ],
      [
        "Mencegah loop pada bridge",
        3
      ],
      [
        "Tagged VLAN",
        4
      ]
    ]
  ]
];

// Esai & Pembahasan Komprehensif: [{bab, soal, pembahasan}...]
const E = [
  {
    "bab": 1,
    "soal": "Bandingkan tiga arsitektur jaringan komunikasi (telegraf, telepon, dan Internet) ditinjau dari teknik switching, koneksi (setup/koneksi), penanganan error, dan efisiensinya.",
    "pembahasan": "<p>Tiga arsitektur dasar jaringan komunikasi menunjukkan evolusi kebutuhan transfer informasi:</p>\n<div style=\"overflow-x:auto\"><table border=\"1\" style=\"width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;text-align:left\">\n<thead><tr style=\"background:var(--plum);color:var(--yel)\"><th>Karakteristik</th><th>Telegraf</th><th>Telepon (PSTN)</th><th>Internet</th></tr></thead>\n<tbody>\n<tr><td><b>Teknik Switching</b></td><td>Message Switching (store-and-forward)</td><td>Circuit Switching</td><td>Packet Switching (datagram)</td></tr>\n<tr><td><b>Setup Koneksi</b></td><td>Tidak ada setup (pesan dikirim stasiun per stasiun)</td><td>Wajib Connection Setup sebelum bicara</td><td>Connectionless pada IP (tiap paket mandiri)</td></tr>\n<tr><td><b>Alokasi Sumber Daya</b></td><td>Buffer di stasiun transit</td><td>Dedicated bandwidth (64 kbps per sirkuit)</td><td>Statistical multiplexing (on-demand dinamis)</td></tr>\n<tr><td><b>Ketahanan Jaringan</b></td><td>Rendah, stasiun manual</td><td>Sirkuit putus bila link tengah putus</td><td>Sangat tinggi (paket dapat memutar rute alternatif)</td></tr>\n<tr><td><b>Karakteristik Trafik</b></td><td>Teks diskret pendek</td><td>Suara analog kontinu</td><td>Data bursty (lonjakan tinggi bervariasi)</td></tr>\n</tbody></table></div>\n<p><b>Catatan Ujian:</b> Masalah N² diatasi oleh circuit switching dengan menaruh saklar pusat (central office), mereduksi koneksi dari N(N-1)/2 menjadi N sambungan ke kantor pusat.</p>"
  },
  {
    "bab": 1,
    "soal": "Jelaskan proses digitalisasi jaringan telepon (PCM 64 kbps), mengapa laju 64 kbps menjadi standar global, dan bagaimana sistem carrier T-1 menyatukan saluran suara.",
    "pembahasan": "<p><b>Proses Digitalisasi Suara (PCM - Pulse Code Modulation):</b></p>\n<ol>\n<li><b>Filtering:</b> Sinyal suara manusia difilter oleh low-pass filter untuk membatasi frekuensi pada rentang 300 Hz – 3400 Hz (nominal 4 kHz).</li>\n<li><b>Sampling:</b> Berdasarkan Teorema Nyquist, sampling rate harus minimal 2 × frekuensi tertinggi: <code>fs = 2 × 4.000 Hz = 8.000 sampel/detik</code>.</li>\n<li><b>Kuantisasi & Encoding:</b> Tiap sampel dipetakan ke tingkat diskret menggunakan 8 bit (256 level amplitudo).</li>\n</ol>\n<p><b>Laju Bit Standar DS0:</b><br>\n<code>Bit Rate = 8.000 sampel/detik × 8 bit/sampel = 64.000 bps = 64 kbps</code>. Kanal ini disebut DS0 (Digital Signal 0).</p>\n<p><b>Carrier T-1 (Digital Signal 1 / DS-1):</b></p>\n<ul>\n<li>Sistem T-1 menggabungkan <b>24 kanal suara</b> menggunakan TDM (Time Division Multiplexing).</li>\n<li>Tiap frame memuat: 24 kanal × 8 bit = 192 bit + 1 framing bit = <b>193 bit/frame</b>.</li>\n<li>Frekuensi frame = 8.000 frame/detik.</li>\n<li><b>Laju Total T-1:</b> <code>193 bit/frame × 8.000 frame/detik = 1.544.000 bps = 1,544 Mbps</code>.</li>\n</ul>"
  },
  {
    "bab": 1,
    "soal": "Jelaskan Hukum Moore dan Hukum Metcalfe beserta relevansinya terhadap pertumbuhan eksponensial jaringan komputer dan internet.",
    "pembahasan": "<p><b>1. Hukum Moore (Gordon Moore, 1965):</b></p>\n<ul>\n<li><b>Pernyataan:</b> Jumlah transistor yang dapat dipadatkan dalam satu keping sirkuit terpadu (IC) berlipat ganda kira-kira setiap 18 hingga 24 bulan dengan harga yang tetap atau menurun.</li>\n<li><b>Dampak Jaringan:</b> Pemrosesan komputer (router, switch, server) menjadi berlipat ganda lebih cepat dan murah, memungkinkan pemrosesan paket data berkecepatan gigabit dan memori buffer yang besar pada perangkat konsumen.</li>\n</ul>\n<p><b>2. Hukum Metcalfe (Robert Metcalfe, penemu Ethernet):</b></p>\n<ul>\n<li><b>Pernyataan:</b> Nilai atau utilitas ekonomi dari suatu jaringan telekomunikasi berbanding lurus dengan kuadrat dari jumlah pengguna yang terhubung (<code>Nilai ∝ N²</code>).</li>\n<li><b>Dampak Jaringan:</b> Jaringan dengan 10 pengguna memiliki nilai proporsional 100, tetapi jaringan dengan 1.000 pengguna bernilai 1.000.000. Fenomena ini menciptakan <i>network effect</i> yang masif: semakin banyak orang menggunakan internet, semakin tinggi nilai gabungan bagi setiap peserta, memicu pertumbuhan berbentuk S-Curve menuju adopsi massal.</li>\n</ul>"
  },
  {
    "bab": 2,
    "soal": "Bandingkan arsitektur Model Referensi 7 Layer OSI dengan Model 4 Layer TCP/IP. Jelaskan fungsi utama masing-masing layer dan mengapa TCP/IP yang menjadi standar de facto Internet.",
    "pembahasan": "<div style=\"overflow-x:auto\"><table border=\"1\" style=\"width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;text-align:left\">\n<thead><tr style=\"background:var(--plum);color:var(--yel)\"><th>OSI (7 Layer)</th><th>TCP/IP (4 Layer)</th><th>Fungsi Utama & Protokol Kunci</th></tr></thead>\n<tbody>\n<tr><td>7. Application<br>6. Presentation<br>5. Session</td><td>Application</td><td>Antarmuka aplikasi, enkripsi, format data, dan sesi dialog.<br><i>Protokol: HTTP, DNS, SMTP, FTP, SSH</i></td></tr>\n<tr><td>4. Transport</td><td>Transport (Host-to-Host)</td><td>Transfer data end-to-end proses-ke-proses, multiplexing port, kendali aliran & keandalan.<br><i>Protokol: TCP, UDP</i></td></tr>\n<tr><td>3. Network</td><td>Internet</td><td>Routing paket melintasi internetwork heterogen, pengalamatan logis global.<br><i>Protokol: IP, ICMP, ARP</i></td></tr>\n<tr><td>2. Data Link<br>1. Physical</td><td>Network Interface (Link)</td><td>Transmisi frame bebas error antar hop lokal dan modulasi bit di media kabel/nirkabel.<br><i>Protokol: Ethernet, WiFi, PPP</i></td></tr>\n</tbody></table></div>\n<p><b>Mengapa TCP/IP Menang:</b></p>\n<ol>\n<li><b>Pragmatis & Teruji:</b> TCP/IP dikembangkan bersama implementasi nyata kode sumber BSD Unix, sedangkan OSI dirancang oleh komite teoretis sebelum protokolnya selesai diuji.</li>\n<li><b>Prinsip Hourglass:</b> Lapisan Internet (IP) sengaja dibuat minimalis dan agnostik (best-effort datagram), memungkinkan berbagai macam aplikasi berjalan di atasnya dan berbagai media fisik di bawahnya.</li>\n</ol>"
  },
  {
    "bab": 2,
    "soal": "Uraikan urutan langkah dan panggilan Berkeley Socket API untuk komunikasi TCP antara Server dan Client, dari inisialisasi hingga penutupan koneksi.",
    "pembahasan": "<p><b>Alur Pemrograman Socket TCP:</b></p>\n<div style=\"display:flex;flex-direction:column;gap:8px;margin:12px 0;font-family:monospace;font-size:12px\">\n<div style=\"padding:10px;background:#f3f4f6;border-left:4px solid var(--mag);color:#111\">\n<b>SISI SERVER:</b><br>\n1. <code>s = socket(AF_INET, SOCK_STREAM, 0)</code> → Membuat endpoint socket TCP.<br>\n2. <code>bind(s, &server_addr, sizeof)</code> → Mengikat socket ke IP dan Port tertentu.<br>\n3. <code>listen(s, backlog)</code> → Mengubah socket menjadi passive listener siap menerima koneksi.<br>\n4. <code>conn = accept(s, &client_addr, &len)</code> → <b>BLOCKING</b> sampai ada klien masuk (menghasilkan socket baru untuk sesi).<br>\n5. <code>recv(conn, buf, len, 0)</code> & <code>send(conn, buf, len, 0)</code> → Pertukaran data dua arah.<br>\n6. <code>close(conn)</code> & <code>close(s)</code> → Menutup koneksi klien dan server listener.\n</div>\n<div style=\"padding:10px;background:#f3f4f6;border-left:4px solid var(--cy);color:#111\">\n<b>SISI KLIEN:</b><br>\n1. <code>s = socket(AF_INET, SOCK_STREAM, 0)</code> → Membuat socket klien.<br>\n2. <code>connect(s, &server_addr, sizeof)</code> → Memulai TCP 3-Way Handshake ke Server.<br>\n3. <code>send(s, data, len, 0)</code> & <code>recv(s, buf, len, 0)</code> → Kirim request & terima respons.<br>\n4. <code>close(s)</code> → Menutup socket koneksi.\n</div>\n</div>\n<p><i>Perbedaan dengan UDP:</i> UDP tidak menggunakan listen, accept, dan connect; melainkan langsung menggunakan <code>sendto()</code> dan <code>recvfrom()</code> dengan socket tipe <code>SOCK_DGRAM</code>.</p>"
  },
  {
    "bab": 2,
    "soal": "Jelaskan perbedaan physical address (MAC), logical address (IP), dan port number ditinjau dari layer, format/panjang bit, sifat hierarkis, dan protokol pemetaannya.",
    "pembahasan": "<p>Tiga lapis pengalamatan bekerja sama agar paket data sampai ke aplikasi target:</p>\n<div style=\"overflow-x:auto\"><table border=\"1\" style=\"width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;text-align:left\">\n<thead><tr style=\"background:var(--plum);color:var(--yel)\"><th>Atribut</th><th>MAC Address</th><th>IP Address</th><th>Port Number</th></tr></thead>\n<tbody>\n<tr><td><b>Layer</b></td><td>Data Link Layer (Layer 2)</td><td>Network / Internet Layer (Layer 3)</td><td>Transport Layer (Layer 4)</td></tr>\n<tr><td><b>Panjang & Format</b></td><td>48 bit (6 byte)<br>Contoh: <code>00:1A:2B:3C:4D:5E</code></td><td>32 bit (IPv4) / 128 bit (IPv6)<br>Contoh: <code>192.168.1.1</code></td><td>16 bit (0 s.d. 65535)<br>Contoh: <code>80 (HTTP), 443 (HTTPS)</code></td></tr>\n<tr><td><b>Cakupan & Sifat</b></td><td>Datar (flat), terikat ke perangkat keras NIC (OUI + serial), hanya berlaku di link lokal</td><td>Hierarkis (Network ID + Host ID), dapat dirutekan melintasi dunia</td><td>Lokal pada sistem operasi, mengidentifikasi proses / program yang berjalan</td></tr>\n<tr><td><b>Protokol Pemeta</b></td><td colspan=\"2\"><b>ARP (Address Resolution Protocol):</b> mencari MAC address dari IP tujuan yang diketahui dalam subnet lokal.</td><td>Dikelola oleh Kernel OS dan port listening table (netstat).</td></tr>\n</tbody></table></div>"
  },
  {
    "bab": 3,
    "soal": "Diberikan sebuah kanal suara telepon dengan bandwidth B = 3.100 Hz dan SNR = 30 dB. Hitung kapasitas maksimum menurut Teorema Shannon, dan tentukan berapa level pensinyalan (M) yang dibutuhkan menurut Formula Nyquist agar kanal noiseless mencapai kapasitas tersebut.",
    "pembahasan": "<p><b>Langkah 1: Konversi SNR dari dB ke rasio linear</b><br>\n<code>SNR_dB = 10 log10(SNR) = 30 dB</code><br>\n<code>log10(SNR) = 30 / 10 = 3</code><br>\n<code>SNR = 10³ = 1.000</code></p>\n<p><b>Langkah 2: Hitung Kapasitas Shannon</b><br>\n<code>C = B × log2(1 + SNR)</code><br>\n<code>C = 3.100 × log2(1 + 1.000) = 3.100 × log2(1.001)</code><br>\nKarena <code>2¹⁰ = 1.024 ≈ 1.001</code>, maka <code>log2(1.001) ≈ 9,967</code><br>\n<code>C = 3.100 × 9,967 ≈ 30.898 bps ≈ 30,9 kbps</code>.</p>\n<p><b>Langkah 3: Hitung Level Pensinyalan Nyquist (M)</b><br>\nMenurut Formula Nyquist: <code>C = 2B × log2(M)</code><br>\n<code>30.898 = 2 × 3.100 × log2(M)</code><br>\n<code>30.898 = 6.200 × log2(M)</code><br>\n<code>log2(M) = 30.898 / 6.200 ≈ 4,98 ≈ 5 bit/simbol</code><br>\n<code>M = 2⁵ = 32 level pensinyalan</code>.</p>\n<p><b>Kesimpulan:</b> Kapasitas kanal riil dibatasi sekitar 30,9 kbps. Untuk mendekati kapasitas ini secara teknis, diperlukan modulasi dengan sekurang-kurangnya 32 level/simbol (misal 32-QAM).</p>"
  },
  {
    "bab": 3,
    "soal": "Bandingkan skema line coding: NRZ-L, NRZ-I, Bipolar AMI, dan Manchester ditinjau dari aturan transisi, kemampuan self-clocking, komponen DC, dan kebutuhan bandwidth.",
    "pembahasan": "<div style=\"overflow-x:auto\"><table border=\"1\" style=\"width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;text-align:left\">\n<thead><tr style=\"background:var(--plum);color:var(--yel)\"><th>Skema</th><th>Aturan Transisi</th><th>Self-Clocking</th><th>Komponen DC</th><th>Bandwidth Relatif</th></tr></thead>\n<tbody>\n<tr><td><b>NRZ-L</b></td><td>Level tegangan: bit 0 = +V, bit 1 = -V</td><td>Buruk pada deretan 0 atau 1 panjang</td><td>Ada DC component signifikan</td><td>Rendah (B = R/2)</td></tr>\n<tr><td><b>NRZ-I</b></td><td>Transisi di awal bit jika bit 1; tidak ada transisi jika bit 0</td><td>Buruk jika deretan bit 0 panjang</td><td>Ada DC component</td><td>Rendah (B = R/2)</td></tr>\n<tr><td><b>Bipolar AMI</b></td><td>Bit 0 = 0V; bit 1 bergantian +V dan -V</td><td>Buruk pada rentetan bit 0 panjang (perlu B8ZS/HDB3)</td><td>Nol (0% DC bias, sangat bagus)</td><td>Rendah (B = R/2)</td></tr>\n<tr><td><b>Manchester</b></td><td>Transisi di tengah bit: 0 = tinggi→rendah, 1 = rendah→tinggi</td><td>Sempurna (selalu ada transisi tiap bit)</td><td>Nol (seimbang di tengah)</td><td>Tinggi (2× lipat NRZ, B = R)</td></tr>\n</tbody></table></div>\n<p><b>Catatan Jebakan Ujian:</b> Manchester dipakai di 10Base-T Ethernet karena mengintegrasikan clock recovery tanpa jalur kabel clock terpisah, meskipun konsekuensinya membutuhkan bandwidth kanal dua kali lebih lebar.</p>"
  },
  {
    "bab": 3,
    "soal": "Diberikan sebuah berkas berukuran L = 1 Mbyte (8 × 10⁶ bit) yang dikirim melalui link berjarak d = 2.000 km dengan kecepatan rambat v = 2 × 10⁸ m/s dan laju transmisi R = 10 Mbps. Hitung delay propagasi, delay transmisi, dan total delay transfer.",
    "pembahasan": "<p><b>Parameter:</b></p>\n<ul>\n<li>Panjang data: <code>L = 1 MB = 10⁶ Byte = 8 × 10⁶ bit</code></li>\n<li>Jarak link: <code>d = 2.000 km = 2 × 10⁶ meter</code></li>\n<li>Kecepatan rambat: <code>v = 2 × 10⁸ m/s</code></li>\n<li>Laju link: <code>R = 10 Mbps = 10 × 10⁶ bps</code></li>\n</ul>\n<p><b>Perhitungan:</b></p>\n<ol>\n<li><b>Delay Propagasi (t_prop):</b><br>\n<code>t_prop = d / v = (2 × 10⁶ m) / (2 × 10⁸ m/s) = 0,01 detik = 10 ms</code>.<br>\n<i>(Hanya bergantung pada jarak fisik kabel dan media, tidak dipengaruhi ukuran file!)</i></li>\n<li><b>Delay Transmisi (t_trans):</b><br>\n<code>t_trans = L / R = (8 × 10⁶ bit) / (10 × 10⁶ bps) = 0,8 detik = 800 ms</code>.<br>\n<i>(Hanya bergantung pada ukuran data dan kapasitas bandwidth link!)</i></li>\n<li><b>Total Delay One-Way:</b><br>\n<code>Total Delay = t_prop + t_trans = 10 ms + 800 ms = 810 ms = 0,81 detik</code>.</li>\n</ol>"
  },
  {
    "bab": 4,
    "soal": "Jelaskan prinsip kerja Time Slot Interchange (TSI) pada digital circuit switching, struktur memori yang digunakan, dan bagaimana time slot input ditukar ke time slot output.",
    "pembahasan": "<p><b>Prinsip Kerja TSI (Time Slot Interchange):</b></p>\n<p>TSI adalah teknik switching digital domain waktu yang menukar urutan slot waktu antar frame TDM tanpa memerlukan saklar silang fisik elektromekanik.</p>\n<p><b>Komponen Memori TSI:</b></p>\n<ul>\n<li><b>Speech Memory (Data RAM):</b> Memiliki N lokasi penyimpanan yang menampung sampel suara 8-bit dari N kanal input. Ditulis secara berurutan (sequential write) mengikuti tibanya slot waktu 1, 2, ..., N.</li>\n<li><b>Connection Memory (Control RAM):</b> Berisi tabel rute koneksi yang diprogram saat setup panggilan. Menentukan slot input mana yang harus dibaca pada setiap slot output.</li>\n</ul>\n<p><b>Mekanisme Pertukaran:</b></p>\n<ol>\n<li><b>Fase Tulis (Sequential):</b> Slot waktu masuk 1, 2, 3 ditulis berurutan ke Speech Memory alamat 1, 2, 3.</li>\n<li><b>Fase Baca (Random Read):</b> Pada slot waktu keluar 1, Connection Memory alamat 1 menginstruksikan untuk membaca Speech Memory alamat 3. Dengan demikian, data dari slot 3 berpindah ke slot 1!</li>\n</ol>\n<p><i>Keterbatasan TSI:</i> Waktu akses memori membatasi kapasitas kanal maksimum. Untuk jutaan sambungan, digunakan kombinasi saklar Time-Space-Time (T-S-T).</p>"
  },
  {
    "bab": 4,
    "soal": "Bandingkan TDM Sinkron dengan TDM Statistik (Asinkron), jelaskan kelemahan TDM sinkron saat menangani trafik data komputer, dan bagaimana TDM statistik mengatasi pemborosan tersebut.",
    "pembahasan": "<p><b>Perbandingan Dua Tipe TDM:</b></p>\n<div style=\"overflow-x:auto\"><table border=\"1\" style=\"width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;text-align:left\">\n<thead><tr style=\"background:var(--plum);color:var(--yel)\"><th>Fitur</th><th>TDM Sinkron</th><th>TDM Statistik (Asinkron)</th></tr></thead>\n<tbody>\n<tr><td><b>Alokasi Slot</b></td><td>Slot waktu dialokasikan secara permanen & kaku untuk tiap sumber</td><td>Slot dialokasikan secara dinamis hanya untuk stasiun yang memiliki data</td></tr>\n<tr><td><b>Penanganan Stasiun Idle</b></td><td>Slot tetap dikirim dalam keadaan kosong (idle byte), bandwidth terbuang</td><td>Slot dilewati; bandwidth diberikan penuh ke stasiun yang aktif</td></tr>\n<tr><td><b>Kebutuhan Header</b></td><td>Tidak butuh header alamat (posisi slot menentukan pemilik)</td><td>Wajib menyertakan alamat pengirim/tujuan di setiap frame/slot</td></tr>\n<tr><td><b>Buffer & Antrean</b></td><td>Tidak butuh buffer besar</td><td>Wajib memiliki buffer memori untuk menampung antrean saat lonjakan data</td></tr>\n<tr><td><b>Kesesuaian Trafik</b></td><td>Sangat cocok untuk trafik suara kontinu (PSTN T-1)</td><td>Sangat cocok untuk trafik data komputer yang bersifat lonjakan (bursty)</td></tr>\n</tbody></table></div>\n<p><b>Inti Konsep:</b> Rasio puncak-ke-rata-rata trafik komputer sering kali mencapai 10:1. TDM statistik melipatgandakan efisiensi pemanfaatan link melalui <i>statistical multiplexing gain</i>.</p>"
  },
  {
    "bab": 4,
    "soal": "Uraikan evolusi teknologi jaringan seluler dari 1G hingga 5G, soroti teknik multiple access, jenis switching, layanan kunci, dan latensinya.",
    "pembahasan": "<div style=\"overflow-x:auto\"><table border=\"1\" style=\"width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;text-align:left\">\n<thead><tr style=\"background:var(--plum);color:var(--yel)\"><th>Generasi</th><th>Multiple Access</th><th>Core Switching</th><th>Laju Data / Latensi</th><th>Layanan Kunci</th></tr></thead>\n<tbody>\n<tr><td><b>1G</b></td><td>FDMA Analog</td><td>Circuit Switched</td><td>~2,4 kbps<br>Delay ratusan ms</td><td>Panggilan suara analog saja (AMPS, NMT)</td></tr>\n<tr><td><b>2G</b></td><td>TDMA / CDMA Digital</td><td>Circuit + Packet (GPRS)</td><td>9,6 – 64 kbps (GSM)<br>~100–300 kbps (EDGE)</td><td>Suara digital jernih, SMS teks, enkripsi SIM</td></tr>\n<tr><td><b>3G</b></td><td>CDMA Broadband (WCDMA)</td><td>Hybrid Circuit + Packet</td><td>384 kbps – 14 Mbps<br>Delay ~100 ms</td><td>Mobile internet, video call awal, MMS</td></tr>\n<tr><td><b>4G (LTE)</b></td><td>OFDMA (DL) / SC-FDMA (UL)</td><td>All-IP Packet Switched</td><td>100 Mbps – 1 Gbps<br>Delay ~20–50 ms</td><td>Streaming video HD, game online mobile, VoLTE</td></tr>\n<tr><td><b>5G (NR)</b></td><td>OFDMA Scalable + mmWave</td><td>All-IP Service-Based</td><td>Up to 10–20 Gbps<br>Delay < 1 ms (URLLC)</td><td>eMBB (4K/8K), mMTC (miliaran IoT), URLLC (mobil otonom)</td></tr>\n</tbody></table></div>"
  },
  {
    "bab": 5,
    "soal": "Bandingkan tiga mekanisme ARQ: Stop-and-Wait, Go-Back-N, dan Selective Repeat dari segi ukuran window pengirim/penerima, penanganan frame out-of-order, dan rumus efisiensinya.",
    "pembahasan": "<div style=\"overflow-x:auto\"><table border=\"1\" style=\"width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;text-align:left\">\n<thead><tr style=\"background:var(--plum);color:var(--yel)\"><th>Kriteria</th><th>Stop-and-Wait</th><th>Go-Back-N (GBN)</th><th>Selective Repeat (SR)</th></tr></thead>\n<tbody>\n<tr><td><b>Window Pengirim (Ws)</b></td><td>Ws = 1</td><td>Ws ≤ 2^m - 1</td><td>Ws ≤ 2^(m-1)</td></tr>\n<tr><td><b>Window Penerima (Wr)</b></td><td>Wr = 1</td><td>Wr = 1</td><td>Wr = Ws ≤ 2^(m-1)</td></tr>\n<tr><td><b>Frame Out-of-Order</b></td><td>Ditolak/diabaikan</td><td>Dibuang seluruhnya (discarded), kirim ACK terakhir</td><td>Disimpan sementara di buffer penerima</td></tr>\n<tr><td><b>Aksi Saat Error/Timeout</b></td><td>Kirim ulang 1 frame yang belum di-ACK</td><td>Kirim ulang seluruh Ws frame mulai dari frame yang hilang</td><td>Kirim ulang HANYA frame spesifik yang rusak/timeout</td></tr>\n<tr><td><b>Efisiensi Kanal (P_f = prob. error)</b></td><td><code>η = (1 - P_f) / (1 + 2a)</code></td><td><code>η = (1 - P_f) / (1 + 2a P_f)</code><br><i>(jika Ws ≥ 1 + 2a)</i></td><td><code>η = 1 - P_f</code><br><i>(jika Ws ≥ 1 + 2a)</i></td></tr>\n</tbody></table></div>\n<p><b>Poin Kunci Ujian:</b> Pada link dengan <code>a = t_prop / t_trans</code> yang sangat besar (seperti serat optik cepat atau satelit), Stop-and-Wait sangat lambat. Selective Repeat memberikan efisiensi teoritis tertinggi mendekati <code>1 - Pf</code> tanpa membuang frame benar yang tiba belakangan.</p>"
  },
  {
    "bab": 5,
    "soal": "Jelaskan proses TCP Three-Way Handshake saat membangun koneksi dan Four-Way Teardown saat memutuskan koneksi, sertakan flag SYN, FIN, ACK dan nomor urutnya.",
    "pembahasan": "<p><b>1. TCP Three-Way Handshake (Membangun Koneksi):</b></p>\n<ol>\n<li><b>Langkah 1 (Klien → Server):</b> Klien mengirim segmen dengan flag <code>SYN = 1</code> dan memilih Initial Sequence Number acak: <code>Seq = x</code>. (State: SYN_SENT).</li>\n<li><b>Langkah 2 (Server → Klien):</b> Server merespons dengan flag <code>SYN = 1, ACK = 1</code>, memilih <code>Seq = y</code>, dan mengonfirmasi <code>Ack = x + 1</code>. (State: SYN_RCVD).</li>\n<li><b>Langkah 3 (Klien → Server):</b> Klien mengonfirmasi dengan <code>ACK = 1</code>, <code>Seq = x + 1</code>, dan <code>Ack = y + 1</code>. Koneksi resmi berstatus <b>ESTABLISHED</b>.</li>\n</ol>\n<p><b>2. TCP Four-Way Teardown (Menutup Koneksi):</b></p>\n<ol>\n<li><b>Klien → Server:</b> Mengirim segmen <code>FIN = 1</code> (Klien tidak punya data lagi untuk dikirim; state FIN_WAIT_1).</li>\n<li><b>Server → Klien:</b> Server mengirim <code>ACK</code> (Server mungkin masih memiliki sisa data di buffer untuk dikirim ke klien; state CLOSE_WAIT).</li>\n<li><b>Server → Klien:</b> Setelah selesai mengirim sisa data, Server mengirim <code>FIN = 1</code> (Server siap tutup; state LAST_ACK).</li>\n<li><b>Klien → Server:</b> Klien membalas dengan <code>ACK</code>, lalu masuk ke state <b>TIME_WAIT</b> selama 2MSL (Maximum Segment Lifetime) sebelum benar-benar ditutup, memastikan ACK terakhir sampai di server.</li>\n</ol>"
  },
  {
    "bab": 5,
    "soal": "Jelaskan metode Bit Stuffing pada Data Link framing: mengapa diperlukan, bagaimana aturan pengirim menyisipkan bit, bagaimana penerima memulihkan data asli, dan berikan contoh penelusurannya.",
    "pembahasan": "<p><b>Mengapa Bit Stuffing Diperlukan:</b></p>\n<p>Pada framing berorientasi bit (seperti HDLC), awal dan akhir frame ditandai dengan pola flag khusus: <code>01111110</code> (0, diikuti enam angka 1, lalu 0). Jika data muatan pengguna kebetulan memuat pola <code>01111110</code>, penerima akan salah mengiranya sebagai akhir frame prematur.</p>\n<p><b>Aturan Bit Stuffing:</b></p>\n<ul>\n<li><b>Sisi Pengirim:</b> Pengirim memindai bit data. Setiap kali menemukan <b>lima angka 1 berturut-turut (11111)</b>, pengirim WAJIB menyisipkan (stuff) satu <b>bit 0</b> tepat setelahnya, terlepas dari bit berikutnya 0 atau 1!</li>\n<li><b>Sisi Penerima (De-stuffing):</b> Jika penerima mendeteksi lima angka 1 berturut-turut diikuti bit 0, bit 0 tersebut dihapus (destuffed). Jika diikuti bit 1 dan bit 0 (01111110), itu adalah tanda FLAG akhir frame! Jika diikuti dua angka 1 (01111111), itu sinyal abort.</li>\n</ul>\n<p><b>Contoh Penelusuran:</b></p>\n<ul>\n<li>Data asli: <code>0110 11111 1010</code></li>\n<li>Setelah Bit Stuffing: <code>0110 11111<b>0</b> 1010</code> (bit 0 tebal disisipkan setelah lima angka 1).</li>\n<li>Penerima membaca: <code>0110 111110</code> → buang 0 → dipulihkan menjadi data asli: <code>0110 11111 1010</code>.</li>\n</ul>"
  },
  {
    "bab": 6,
    "soal": "Bandingkan Pure ALOHA dan Slotted ALOHA: gambarkan konsep vulnerable period, turunkan rumus throughput S terhadap beban lalu lintas G, dan tentukan throughput maksimum masing-masing.",
    "pembahasan": "<p><b>1. Pure ALOHA:</b></p>\n<ul>\n<li>Stasiun bebas mengirim frame kapan saja saat data tiba.</li>\n<li><b>Vulnerable Period:</b> Jika sebuah frame berdurasi T dikirim pada waktu <code>t0</code>, frame tersebut akan tabrakan jika ada frame lain yang mulai dikirim dalam rentang <code>[t0 - T, t0 + T]</code>. Jadi periode rentan tabrakan adalah <b>2T</b>.</li>\n<li>Probabilitas tidak ada transmisi lain (Poisson): <code>P(0) = e^(-2G)</code>.</li>\n<li><b>Throughput:</b> <code>S = G × e^(-2G)</code>.</li>\n<li>Nilai maksimum dicapai saat turunan <code>dS/dG = (1 - 2G)e^(-2G) = 0 → G = 0,5</code>.</li>\n<li><b>S_max Pure ALOHA:</b> <code>0,5 × e^(-1) = 1 / (2e) ≈ 0,184 = 18,4%</code>.</li>\n</ul>\n<p><b>2. Slotted ALOHA:</b></p>\n<ul>\n<li>Waktu dibagi menjadi slot diskret berdurasi T. Stasiun hanya diizinkan mulai mengirim pada batas awal slot.</li>\n<li><b>Vulnerable Period:</b> Tabrakan hanya terjadi jika stasiun lain memilih slot yang persis sama. Periode rentan berkurang separuhnya menjadi <b>1T</b>.</li>\n<li>Probabilitas bebas tabrakan: <code>P(0) = e^(-G)</code>.</li>\n<li><b>Throughput:</b> <code>S = G × e^(-G)</code>.</li>\n<li>Nilai maksimum dicapai saat <code>dS/dG = (1 - G)e^(-G) = 0 → G = 1,0</code>.</li>\n<li><b>S_max Slotted ALOHA:</b> <code>1,0 × e^(-1) = 1 / e ≈ 0,368 = 36,8%</code>.</li>\n</ul>\n<p><b>Kesimpulan:</b> Slotted ALOHA melipatgandakan throughput maksimum dari 18,4% menjadi 36,8% dengan syarat adanya sinkronisasi clock global antar stasiun.</p>"
  },
  {
    "bab": 6,
    "soal": "Jelaskan protokol CSMA/CD pada Ethernet: prinsip 'listen while talk', mengapa ada syarat panjang frame minimum, dan bagaimana algoritma Truncated Binary Exponential Backoff bekerja.",
    "pembahasan": "<p><b>1. Prinsip CSMA/CD (Carrier Sense Multiple Access with Collision Detection):</b></p>\n<p>Stasiun mendengarkan kabel sebelum mengirim (Carrier Sense). Saat mengirim, stasiun terus mendengarkan sinyal di kabel (Collision Detection). Jika tegangan melebihi ambang batas normal, tabrakan terdeteksi; stasiun langsung membatalkan transmisi dan mengirim <i>jam signal</i> 32-bit.</p>\n<p><b>2. Syarat Panjang Frame Minimum:</b></p>\n<ul>\n<li>Kasus terburuk tabrakan: Stasiun A di ujung kabel mulai kirim. Tepat sesaat sebelum sinyal A tiba di stasiun B di ujung seberang (pada waktu <code>t_prop - ε</code>), B mulai kirim. Tabrakan terjadi di dekat B, dan sinyal tabrakan butuh waktu <code>t_prop</code> lagi untuk merambat kembali ke A.</li>\n<li>Maka A baru sadar ada tabrakan setelah <code>2 × t_prop</code> (Round-Trip Propagation Time / Slot Time).</li>\n<li>Agar A tidak menyelesaikan pengiriman frame sebelum sadar terjadi tabrakan, durasi transmisi frame harus: <code>t_trans ≥ 2 × t_prop → (Panjang Frame / R) ≥ 2 × t_prop</code>.</li>\n<li>Pada Ethernet klasik 10 Mbps kabel 2,5 km: <code>2 × t_prop ≈ 51,2 μs</code>. Panjang frame minimum: <code>51,2 μs × 10 Mbps = 512 bit = 64 Byte</code>.</li>\n</ul>\n<p><b>3. Truncated Binary Exponential Backoff:</b></p>\n<ol>\n<li>Setelah tabrakan ke-k (untuk <code>k = 1 s.d. 10</code>), stasiun memilih bilangan acak r secara seragam dari rentang <code>0 ≤ r < 2^k</code>.</li>\n<li>Stasiun menunggu selama <code>r × 51,2 μs</code> sebelum mencoba mengirim ulang.</li>\n<li>Untuk <code>k = 11 s.d. 15</code>, rentang dibatasi pada <code>2^10 = 1024</code> (truncated).</li>\n<li>Jika gagal setelah 16 kali tabrakan berturut-turut, transmisi digugurkan dan dilaporkan error.</li>\n</ol>"
  },
  {
    "bab": 6,
    "soal": "Jelaskan cara kerja Transparent Learning Bridge / Layer 2 Switch dalam memproses frame (Learning, Filtering, Forwarding, Flooding), dan jelaskan peran Spanning Tree Protocol (STP).",
    "pembahasan": "<p><b>1. Empat Operasi Transparent Bridge / Switch:</b></p>\n<ul>\n<li><b>Learning:</b> Setiap kali frame tiba di suatu port, switch mencatat <code>Source MAC</code> dan <code>Nomor Port Masuk</code> ke dalam Forwarding Table (MAC Table) beserta waktu kadaluarsa (aging timer).</li>\n<li><b>Filtering:</b> Jika <code>Destination MAC</code> berada di port yang SAMA dengan port masuknya frame, frame dibuang (filtered), karena node tujuan sudah menerima sinyal langsung di segmen tersebut.</li>\n<li><b>Forwarding:</b> Jika <code>Destination MAC</code> sudah ada di tabel dan berada di port BERBEDA, switch meneruskan frame HANYA ke port tujuan spesifik tersebut (unicast terisolasi).</li>\n<li><b>Flooding:</b> Jika <code>Destination MAC</code> belum tercatat di tabel (unknown unicast) ATAU berupa alamat Broadcast/Multicast (<code>FF:FF:FF:FF:FF:FF</code>), switch menyalin dan menyebarkan frame ke SEMUA port kecuali port masuk.</li>\n</ul>\n<p><b>2. Peran Spanning Tree Protocol (STP - IEEE 802.1D):</b></p>\n<p>Jika jaringan switch dipasang secara redundan (memiliki siklus/loop fisik untuk cadangan toleransi kegagalan), operasi <i>flooding</i> akan menyebabkan frame broadcast berputar tanpa henti (Broadcast Storm), menduplikasi frame, dan mengacaukan tabel MAC.<br>\nSTP memilih satu <b>Root Bridge</b> dan secara dinamis menonaktifkan (blocking) port redundan untuk membentuk topologi pohon bebas siklus (spanning tree). Jika link utama putus, STP otomatis membuka port cadangan.</p>"
  }
];

if (typeof window !== 'undefined') {
  window.CHAPTER_NAMES = CHAPTER_NAMES;
  window.C = C;
  window.PG = PG;
  window.B = B;
  window.F = F;
  window.M = M;
  window.E = E;
} else if (typeof globalThis !== 'undefined') {
  globalThis.CHAPTER_NAMES = CHAPTER_NAMES;
  globalThis.C = C;
  globalThis.PG = PG;
  globalThis.B = B;
  globalThis.F = F;
  globalThis.M = M;
  globalThis.E = E;
}
