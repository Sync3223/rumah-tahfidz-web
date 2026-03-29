# Rumah Tahfidz Web (YRT)

Website resmi untuk Rumah Tahfidz yang dibangun menggunakan teknologi web modern. Proyek ini berfungsi sebagai platform informasi, branding yayasan, dan portal donasi dengan integrasi pembayaran aman.

## 🛠 Teknologi Utama

### Frontend
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 7](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **State & Routing:** [React Router 7](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend & Infrastructure
- **Platform:** [Firebase](https://firebase.google.com/) (Hosting, Firestore, Functions)
- **Payment Gateway:** [Midtrans Snap API](https://midtrans.com/)
- **Runtime:** Node.js 24 (Functions)

## 📂 Struktur Proyek

```text
.
├── functions/              # Backend (Firebase Functions)
│   ├── src/
│   │   ├── midtrans.ts     # Logika pembayaran & Webhook
│   │   └── models/         # Firestore data models
│   └── package.json
├── src/                    # Frontend
│   ├── assets/             # Asset statis
│   ├── components/         # Komponen reusable
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Halaman web (Landing, Donation, dll)
│   ├── services/           # Integrasi API/Firebase
│   └── App.tsx             # Root component & Routing
├── firebase.json           # Konfigurasi Firebase
└── package.json            # Dependensi Frontend
```

## 💳 Fitur Donasi & Pembayaran

Sistem donasi menggunakan integrasi Midtrans Snap yang dirancang untuk kemudahan tanpa perlu akun pengguna:
1.  **Formulir Donasi:** Data diri opsional (Email/WA) tetap didukung untuk notifikasi.
2.  **Persistent Overlay:** Jika jendela pembayaran ditutup, sistem akan menampilkan modal overlay agar pengguna bisa melanjutkan pembayaran tanpa mengisi ulang formulir.
3.  **Webhook Integration:** Status transaksi di Firestore diperbarui otomatis via midtrans-webhook.
4.  **Keamanan:** Dilengkapi dengan rate-limiting per-IP untuk mencegah penyalahgunaan backend.

## 🚀 Pengoperasian & Deployment

### Menjalankan di Lokal
1.  **Frontend:**
    ```bash
    npm install
    npm run dev
    ```
2.  **Functions (Emulator):**
    ```bash
    cd functions
    npm install
    npm run serve
    ```

### Deployment

#### 🖥 Frontend (Otomatis)
Setiap *push* atau *merge* ke branch `main` akan memicu **GitHub Actions** yang secara otomatis melakukan build dan deploy ke Firebase Hosting.

#### ⚙️ Backend / Functions (Manual)
Karena integrasi CI/CD diprioritaskan untuk frontend, deployment fungsi dilakukan secara manual untuk menghindari deployment berulang yang tidak perlu (dan menghemat kuota build).

**Langkah Deploy Functions:**
1. Pastikan Anda sudah login ke Firebase CLI (`firebase login`).
2. Jalankan perintah dari root project:
   ```bash
   firebase deploy --only functions
   ```
   *Catatan: Pastikan environment variables (MIDTRANS_SERVER_KEY, dll) sudah dikonfigurasi di Google Cloud / Firebase Console.*

---
