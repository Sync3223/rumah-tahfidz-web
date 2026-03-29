import { useState } from 'react';
import landingProfileImg from '../assets/denah-images/landingProfile(2).jpg';

export const useProfileData = () => {
  const [profileData] = useState({
    hero: {
      tag: "Tentang Kami",
      title: "Rumah Tahfiz NUFARA",
      description: "Membentuk generasi penghafal Al-Qur'an yang memiliki akhlak mulia, kecerdasan intelektual, penguasaan teknologi, jiwa kepemimpinan, dan kemandirian ekonomi.",
    },
    banner: {
      image: landingProfileImg,
      text: "Kenal Lebih Dekat Dengan NUFARA"
    },
    vision: {
      title: "Visi Kami",
      content: "Membentuk generasi Qur`ani yang berkarakter unggul, cerdas teknologi, dan berjiwa technopreneur."
    },
    mission: {
      title: "Misi",
      points: [
        "Mengintegrasikan pendidikan Islam dengan ilmu pengetahuan, teknologi informasi, dan kepemimpinan.",
        "Mengembangkan kreativitas dan inovasi dalam kewirausahaan.",
        "Memberikan akses pendidikan tahfiz yang terjangkau bagi masyarakat."
      ]
    },
    tujuanKhusus: [
      "Menghafal Al-Qur`an secara bertahap (minimal 1-5 juz, target maksimal 30 juz sesuai jenjang).",
      "Memiliki akhlak Islami dan karakter disiplin, tanggung jawab, dan empati sosial.",
      "Menguasai dasar-dasar teknologi informasi (komputer, internet, AI awareness).",
      "Mengembangkan kreativitas, inovasi, dan kemampuan problem solving.",
      "Memiliki jiwa kewirausahaan berbasis teknologi (technopreneur), kemampuan kepemimpinan dan komunikasi.",
      "Menjadi agen perubahan positif di masyarakat."
    ],
    programs: [
      { name: "Tahfiz Harian", detail: "Setoran hafalan, Murajaah bersama, & Tahsin Al-Qur`an" },
      { name: "Character Building", detail: "Shalat berjamaah, Adab harian, & Mentoring akhlak" },
      { name: "Teknologi", detail: "Kelas komputer, Kelas digital kreatif, & Literasi AI" },
      { name: "Technopreneur", detail: "Membuat/menjual produk digital & Kelas Digital Marketing" },
      { name: "Kepemimpinan", detail: "Kegiatan organisasi santri & Kelas Public Speaking" },
      { name: "Sosial & Kolaborasi", detail: "Bakti sosial & Dakwah masyarakat" }
    ],
    implementasi: [
      "Menggunakan rumah tahfiz secara fungsional",
      "Memberdayakan ekosistem lingkungan sebagai tempat belajar",
      "Sistem halaqah kecil",
      "Relawan pengajar dan Pengurus Rumah Tahfiz",
      "Kolaborasi dengan donatur, Perguruan Tinggi & Lembaga terkait"
    ]
  });

  return { profileData };
};
