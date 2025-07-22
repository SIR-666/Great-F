import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
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
                Empowering Growth,
                <span className="text-yellow-400"> Elevating Potential</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Tingkatkan kompetensi dan raih potensi terbaik Anda bersama platform Elevana Greenfields.
              </p>
            </div>
            <div className="lg:text-right">
              <Image
                src="/images/hero-image.png"
                alt="Hero Image"
                width={550}
                height={350}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Temukan berbagai fitur terbaik yang dirancang untuk mendukung
              pengalaman belajar digital Anda secara optimal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
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
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
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

// Feature Card Component - Updated untuk fitur aplikasi
// Feature Card Component - Updated agar seluruh card dapat diklik
function FeatureCard({
  title,
  description,
  iconImage,
  linkUrl,
  category,
  features,
  isComingSoon = false,
}) {
  if (isComingSoon) {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-not-allowed opacity-75">
        <div className="relative h-48 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
          <div className="w-20 h-20 relative group-hover:scale-110 transition-transform duration-300">
            <Image
              src={iconImage}
              alt={title}
              width={80}
              height={80}
              className="object-contain filter brightness-0 invert"
            />
          </div>
          <div className="absolute top-4 left-4">
            <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              Coming Soon
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

          {features && (
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between">
            <button
              disabled
              className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-medium cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={linkUrl} className="block">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1">
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
          <div className="w-260 h-160 relative group-hover:scale-110 transition-transform duration-300">
            <Image
              src={iconImage}
              alt={title}
              width={160}
              height={160}
              className="object-contain filter brightness-0 invert"
            />
          </div>
          <div className="absolute top-4 left-4">
            <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
          </div>
          {/* Hover indicator */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

          {features && (
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium group-hover:bg-blue-700 pointer-events-none">
              Akses Fitur
            </button>
            {/* Arrow indicator */}
            <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Benefit Card Component - Dipisah dari Feature Card
function BenefitCard({ icon, title, description }) {
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

// Sample Data - Updated untuk fitur aplikasi
const featuredFeatures = [
  {
    title: "Training Management",
    description:
      "Kelola seluruh program training, jadwal, dan materi pembelajaran dengan sistem yang terintegrasi dan mudah digunakan.",
    iconImage: "/images/book-stack.png",
    linkUrl: "/training/dashboard-superuser/training",
    category: "Core Feature",
    features: [
      "Manajemen program training",
      "Penjadwalan otomatis",
      "Tracking progress peserta",
    ],
  },
  {
    title: "Competency Management",
    description:
      "Buat dan kelola modul pembelajaran interaktif dengan berbagai format konten multimedia yang engaging.",
    iconImage: "/images/20943633.jpg",
    linkUrl: "/training/dashboard-superuser/module",
    category: "Content",
    features: [
      "Editor konten multimedia",
      "Template modul siap pakai",
      "Assessment terintegrasi",
    ],
  },
  {
    title: "People Development",
    description:
      "Kelola peserta training dengan sistem role-based access control dan monitoring aktivitas real-time.",
    iconImage: "/images/book-stack.png",
    linkUrl: "/training/dashboard-superuser/user",
    category: "Management",
    features: [
      "Role-based access control",
      "Bulk user management",
      "Activity monitoring",
    ],
  },
];

const benefits = [
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
