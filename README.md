# Tikwork API - Job Vacancy Service

Project ini adalah layanan API backend untuk mengelola data dan feed lowongan pekerjaan (Job Vacancy). Aplikasi ini dibangun menggunakan Node.js, Express, dan MySQL dengan Sequelize sebagai ORM.

## 🛠 Tech Stack
- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Tools**: Body-parser, Dotenv, Nodemon

## 🚀 Cara Menjalankan Project

1. **Install Dependencies**
   Pastikan Node.js sudah terinstall, lalu jalankan:
   ```bash
   npm install
   ```

2. **Konfigurasi Database**
   Sesuaikan konfigurasi database MySQL kamu. Pastikan database server berjalan.
   Cek file `config/database.js` atau buat file `.env` berdasarkan `env.example` (jika ada) untuk setup koneksi.

3. **Jalankan Server**
   ```bash
   npm start
   ```
   Server akan berjalan secara default di `http://localhost:3000`.

## 📡 Dokumentasi API

Base URL: `/api/jobs`

### Fitur Utama (Feeds)
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/jobs/for-you` | Mendapatkan daftar lowongan rekomendasi "For You" |
| `GET` | `/api/jobs/explore` | Mendapatkan daftar lowongan untuk halaman jelajah |

### Manajemen Data (CRUD)
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/jobs` | Mengambil semua data lowongan |
| `GET` | `/api/jobs/:id` | Mengambil detail satu lowongan berdasarkan ID (Primary Key) |
| `POST` | `/api/jobs` | Membuat data lowongan baru |
| `PUT` | `/api/jobs/:id` | Mengupdate data lowongan |
| `DELETE` | `/api/jobs/:id` | Menghapus data lowongan |

## 🗃 Skema Database
Model: **JobVacancy** (Tabel: `job_vacancies`)

| Field | Tipe Data | Keterangan |
|-------|-----------|------------|
| `job_id` | STRING | ID unik pekerjaan (Wajib) |
| `job_title` | STRING | Judul pekerjaan (Wajib) |
| `job_company_name` | STRING | Nama perusahaan (Wajib) |
| `job_location` | STRING | Lokasi kerja |
| `job_salary` | STRING | Kisaran gaji |
| `job_type` | STRING | Tipe pekerjaan (Full-time, Contract, dll) |
| `job_category` | JSON | Kategori/Tags pekerjaan |
| `job_description` | TEXT | Deskripsi lengkap |
| `view_count` | INTEGER | Jumlah dilihat (Default: 0) |
| `love_count` | INTEGER | Jumlah disukai (Default: 0) |
| `card_color` | STRING | Warna background kartu UI |
| `card_image` | STRING | Gambar aset kartu UI |
