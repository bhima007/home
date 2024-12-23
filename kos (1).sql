-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 23 Des 2024 pada 07.26
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kos`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `bangunan`
--

CREATE TABLE `bangunan` (
  `id` int(11) NOT NULL,
  `lokasi` varchar(255) NOT NULL,
  `bangunan` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `bangunan`
--

INSERT INTO `bangunan` (`id`, `lokasi`, `bangunan`, `alamat`, `createdAt`, `updatedAt`) VALUES
(1, 'lokasi', 'rukita', 'alamat', '2024-12-05 04:18:22', '2024-12-06 08:56:47'),
(2, 'Jakarta Pusat', 'oke', 'Jl. Kudus No.6 No.4, Dukuh Atas, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310', '2024-12-05 04:21:35', '2024-12-07 03:25:59'),
(3, 'Jakarta Pusat', '3', 'Jl. Kudus No.6 No.4, Dukuh Atas, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310	', '2024-12-05 05:00:45', '2024-12-06 08:57:57'),
(4, 'Jakarta Pusat', 'bangun', 'Jl. Kudus No.6 No.4, Dukuh Atas, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310', '2024-12-05 06:00:30', '2024-12-22 10:54:19');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kamar`
--

CREATE TABLE `kamar` (
  `id` int(11) NOT NULL,
  `bangunan` int(11) NOT NULL,
  `kamar` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kamar`
--

INSERT INTO `kamar` (`id`, `bangunan`, `kamar`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Kamar 1', '2024-12-06 09:42:18', '2024-12-06 09:42:18'),
(2, 3, 'oke', '2024-12-07 03:26:31', '2024-12-07 03:26:31'),
(3, 2, 'kamar 999', '2024-12-12 08:59:59', '2024-12-12 08:59:59'),
(4, 1, 'kamar 131', '2024-12-14 10:27:27', '2024-12-22 12:11:31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengaduan`
--

CREATE TABLE `pengaduan` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `pengaduan` varchar(255) NOT NULL,
  `bangunan` int(11) NOT NULL,
  `kamar` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengaduan`
--

INSERT INTO `pengaduan` (`id`, `nama`, `pengaduan`, `bangunan`, `kamar`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Budi', 'genteng bocor\npintu rusak\nlantai meledak\nbau bangkai\nada ular\nkaki saya sakit', 2, 3, 'DALAM PROSES', '2024-12-15 12:29:49', '2024-12-22 15:53:55'),
(2, 'sarni', 'genteng bocor\npintu rusak\nlantai meledak\nbau bangkai\nada ular\nkaki saya sakit	\n', 2, 3, 'SELESAI', '2024-12-15 12:49:42', '2024-12-15 12:49:42'),
(3, 'woke', 'ngadu mulu', 3, 2, 'TINDAK LANJUT', '2024-12-15 12:52:13', '2024-12-15 12:52:13');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengumuman`
--

CREATE TABLE `pengumuman` (
  `id` int(11) NOT NULL,
  `pengumuman` varchar(255) NOT NULL,
  `bangunan` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengumuman`
--

INSERT INTO `pengumuman` (`id`, `pengumuman`, `bangunan`, `createdAt`, `updatedAt`) VALUES
(1, 'Diharap membayar biaya kamar kos paling lambat tanggal 10 setiap bulannya', 4, '2024-12-15 14:05:00', '2024-12-22 13:07:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penyewa`
--

CREATE TABLE `penyewa` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `bangunan` int(11) NOT NULL,
  `kamar` int(11) NOT NULL,
  `tgl_masuk` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `penyewa`
--

INSERT INTO `penyewa` (`id`, `nama`, `bangunan`, `kamar`, `tgl_masuk`, `createdAt`, `updatedAt`) VALUES
(1, 'Rudi', 1, 1, '2024-12-12 00:00:00', '2024-12-15 10:47:58', '2024-12-22 12:31:11'),
(2, 'budi dordor', 3, 2, '2024-12-01 00:00:00', '2024-12-15 11:03:27', '2024-12-22 12:31:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `peraturan_kos`
--

CREATE TABLE `peraturan_kos` (
  `id` int(11) NOT NULL,
  `bangunan` int(11) NOT NULL,
  `aturan` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `peraturan_kos`
--

INSERT INTO `peraturan_kos` (`id`, `bangunan`, `aturan`, `createdAt`, `updatedAt`) VALUES
(1, 4, 'Dilarang merusak bangunan\nDilarang makan sambil berdiri\nWajib sholat 5 waktu', '2024-12-15 13:55:10', '2024-12-22 13:03:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `penyewa` int(11) NOT NULL,
  `bangunan` int(11) NOT NULL,
  `kamar` int(11) NOT NULL,
  `nominal` float NOT NULL,
  `tgl_pembayaran` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id`, `penyewa`, `bangunan`, `kamar`, `nominal`, `tgl_pembayaran`, `createdAt`, `updatedAt`) VALUES
(5, 2, 3, 2, 9999, '2024-12-23 00:00:00', '2024-12-22 18:44:18', '2024-12-22 18:44:18'),
(6, 2, 3, 2, 1000000, '2024-12-20 00:00:00', '2024-12-22 18:50:32', '2024-12-22 18:50:32'),
(7, 1, 1, 1, 10000, '2024-12-10 00:00:00', '2024-12-22 18:53:30', '2024-12-22 18:53:30');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `nama`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(19, 'admin', 'admin', 'admin1234', '2024-12-14 08:44:11', '2024-12-22 10:53:44');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `bangunan`
--
ALTER TABLE `bangunan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kamar`
--
ALTER TABLE `kamar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bangunan` (`bangunan`);

--
-- Indeks untuk tabel `pengaduan`
--
ALTER TABLE `pengaduan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bangunan` (`bangunan`),
  ADD KEY `kamar` (`kamar`);

--
-- Indeks untuk tabel `pengumuman`
--
ALTER TABLE `pengumuman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bangunan` (`bangunan`);

--
-- Indeks untuk tabel `penyewa`
--
ALTER TABLE `penyewa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bangunan` (`bangunan`),
  ADD KEY `kamar` (`kamar`);

--
-- Indeks untuk tabel `peraturan_kos`
--
ALTER TABLE `peraturan_kos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bangunan` (`bangunan`);

--
-- Indeks untuk tabel `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `penyewa` (`penyewa`),
  ADD KEY `bangunan` (`bangunan`),
  ADD KEY `kamar` (`kamar`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `bangunan`
--
ALTER TABLE `bangunan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `kamar`
--
ALTER TABLE `kamar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `pengaduan`
--
ALTER TABLE `pengaduan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `pengumuman`
--
ALTER TABLE `pengumuman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `penyewa`
--
ALTER TABLE `penyewa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `peraturan_kos`
--
ALTER TABLE `peraturan_kos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `kamar`
--
ALTER TABLE `kamar`
  ADD CONSTRAINT `kamar_ibfk_1` FOREIGN KEY (`bangunan`) REFERENCES `bangunan` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pengaduan`
--
ALTER TABLE `pengaduan`
  ADD CONSTRAINT `pengaduan_ibfk_11` FOREIGN KEY (`bangunan`) REFERENCES `bangunan` (`id`),
  ADD CONSTRAINT `pengaduan_ibfk_12` FOREIGN KEY (`kamar`) REFERENCES `pengaduan` (`id`),
  ADD CONSTRAINT `pengaduan_ibfk_2` FOREIGN KEY (`kamar`) REFERENCES `kamar` (`id`);

--
-- Ketidakleluasaan untuk tabel `pengumuman`
--
ALTER TABLE `pengumuman`
  ADD CONSTRAINT `pengumuman_ibfk_1` FOREIGN KEY (`bangunan`) REFERENCES `bangunan` (`id`);

--
-- Ketidakleluasaan untuk tabel `penyewa`
--
ALTER TABLE `penyewa`
  ADD CONSTRAINT `penyewa_ibfk_621` FOREIGN KEY (`bangunan`) REFERENCES `bangunan` (`id`),
  ADD CONSTRAINT `penyewa_ibfk_622` FOREIGN KEY (`kamar`) REFERENCES `kamar` (`id`);

--
-- Ketidakleluasaan untuk tabel `peraturan_kos`
--
ALTER TABLE `peraturan_kos`
  ADD CONSTRAINT `peraturan_kos_ibfk_1` FOREIGN KEY (`bangunan`) REFERENCES `bangunan` (`id`);

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_687` FOREIGN KEY (`penyewa`) REFERENCES `penyewa` (`id`),
  ADD CONSTRAINT `transaksi_ibfk_688` FOREIGN KEY (`bangunan`) REFERENCES `bangunan` (`id`),
  ADD CONSTRAINT `transaksi_ibfk_689` FOREIGN KEY (`kamar`) REFERENCES `kamar` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
