import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import HeaderTraining from "../../components/HeaderTraining";

export default function TrainingHomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Head>
        <title>Training Digital - Greenfields PSG</title>
        <meta
          name="description"
          content="Platform training digital terbaik untuk meningkatkan skill dan kompetensi Anda"
        />
      </Head>

      <HeaderTraining />

    {/* Hero Section */}
        <section
          className="bg-blue-600 text-white py-20"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Tingkatkan Skill Anda dengan
                <span className="text-yellow-400"> Training Digital</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                href="/daftar-training"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors duration-200 text-center"
                >
                Mulai Belajar Sekarang
                </Link>
                <Link
                href="/tentang-kami"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-800 transition-colors duration-200 text-center"
                >
                Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Statistik Platform</h3>
                <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    1000+
                  </div>
                  <div className="text-blue-100">Peserta Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    50+
                  </div>
                  <div className="text-blue-100">Program Training</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    95%
                  </div>
                  <div className="text-blue-100">Tingkat Kepuasan</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    24/7
                  </div>
                  <div className="text-blue-100">Akses Learning</div>
                </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Cari Training yang Tepat untuk Anda
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Cari berdasarkan nama training, kategori, atau instruktur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Program Training Unggulan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilihan program training terbaik yang dirancang khusus untuk
              meningkatkan kompetensi dan skill profesional Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((program, index) => (
              <ProgramCard key={index} {...program} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/daftar-training"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Lihat Semua Program
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Training Digital?
            </h2>
            <p className="text-xl text-gray-600">
              Keunggulan yang membuat kami menjadi pilihan terdepan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Memulai Perjalanan Learning Anda?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Bergabunglah dengan ribuan profesional yang telah merasakan manfaat
            training digital berkualitas tinggi dari kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors duration-200"
            >
              Daftar Gratis Sekarang
            </Link>
            <Link
              href="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Sudah Punya Akun? Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GF</span>
                </div>
                <span className="text-xl font-bold">Greenfields PSG</span>
              </div>
              <p className="text-gray-400">
                Platform training digital terdepan untuk pengembangan skill dan
                kompetensi profesional.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Program</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Training Produksi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Quality Control
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Maintenance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Safety & Health
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tentang-kami" className="hover:text-white">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Karir
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Bantuan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Panduan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Kebijakan Privasi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Greenfields PSG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

// Program Card Component
function ProgramCard({
  title,
  description,
  instructor,
  duration,
  level,
  price,
  image,
  category,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {level}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-4">👨‍🏫 {instructor}</span>
          <span>⏱️ {duration}</span>
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/daftar-training"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="text-center group">
      <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors duration-200">
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Sample Data
const featuredPrograms = [
  {
    title: "Training Produksi Modern",
    description:
      "Pelajari teknik produksi terdepan dengan teknologi Industry 4.0 dan optimasi proses manufaktur.",
    instructor: "Dr. Ahmad Wijaya",
    duration: "8 Minggu",
    level: "Intermediate",
    category: "Produksi",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
  },
  {
    title: "Quality Control & Assurance",
    description:
      "Menguasai sistem quality control yang efektif untuk memastikan standar produk berkualitas tinggi.",
    instructor: "Ir. Siti Nurhaliza",
    duration: "6 Minggu",
    level: "Beginner",
    category: "Quality",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
  },
  {
    title: "Maintenance & Troubleshooting",
    description:
      "Strategi maintenance preventif dan troubleshooting untuk meminimalkan downtime mesin produksi.",
    instructor: "Eng. Budi Santoso",
    duration: "10 Minggu",
    level: "Advanced",
    category: "Maintenance",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=250&fit=crop",
  },
];

const features = [
  {
    icon: "🎓",
    title: "Instruktur Berpengalaman",
    description:
      "Belajar dari para ahli industri dengan pengalaman puluhan tahun",
  },
  {
    icon: "📱",
    title: "Akses 24/7",
    description:
      "Belajar kapan saja, di mana saja dengan platform yang responsif",
  },
  {
    icon: "🏆",
    title: "Sertifikat Resmi",
    description:
      "Dapatkan sertifikat yang diakui industri setelah menyelesaikan training",
  },
  {
    icon: "🤝",
    title: "Support Community",
    description:
      "Bergabung dengan komunitas learner dan dapatkan support berkelanjutan",
  },
];
