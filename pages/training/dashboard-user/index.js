import React from "react";
import Layout from "@/components/LayoutDashboardUser";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-6 overflow-auto">
        {/* Header */}
        <header className="bg-gradient-to-r bg-blue-600  from-blue-400 to-blue-500 p-6 rounded-xl text-white flex items-center justify-between mb-6 shadow-lg">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">
              Pelajari modul di sini kapan saja dan dimana saja
            </h2>
            <p className="text-blue-100 mb-4 text-sm">
              Tingkatkan skill dan pengetahuan dengan training berkualitas
            </p>
            <button className="px-6 py-3 bg-white text-blue-500 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg">
              Coba request training sekarang
            </button>
          </div>
          {/* <div className="ml-6"> */}
            <img
              src="/images/search.png"
              alt="Training illustration"
              className="w-60 h-auto  p-5"
            />
          {/* </div> */}
        </header>

        {/* Tabs */}
        <div className="flex space-x-6 text-lg font-semibold mb-6 border-b border-gray-200">
          <button className=" text-sm text-blue-500 font-semibold hover:text-blue-700 transition-colors py-2 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50">
            Training yang tersedia
          </button>
          <button className=" text-sm text-blue-500 font-semibold hover:text-blue-700 transition-colors py-2 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50">
            Training saya
          </button>
        </div>

        {/* Class Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classData.map((cls, idx) => (
            <ClassCard key={idx} {...cls} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Link href="/training/show">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md">
              Lihat Training Lainnya
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

function ClassCard({ title, date, time, teacher, status, img }) {
  const getStatusColor = (status) => {
    if (status.includes("lagi")) return "bg-green-100 text-green-600";
    if (status === "Selesai") return "bg-gray-100 text-gray-600";
    return "bg-blue-100 text-blue-600";
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-gray-100">
      <div className="relative">
        <img
          src={img}
          alt={title}
          className="rounded-lg w-full h-36 object-cover mb-4"
        />
        <span
          className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </div>
      <div className="text-sm text-gray-500 mb-2 flex items-center">
        <span className="mr-2">📅</span>
        {date} | {time}
      </div>
      <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 flex items-center">
        <span className="mr-2">👨‍🏫</span>
        {teacher}
      </p>
      <Link href="/training/dashboard-user/training-details">
        <button className="w-full text-sm text-blue-500 font-semibold hover:text-blue-700 transition-colors py-2 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50">
          Lihat Detail
        </button>
      </Link>
    </div>
  );
}

const classData = [
  {
    title: "Training Produksi",
    date: "Jumat, 18 Jul 2025",
    time: "18:20 - 19:45 WIB",
    teacher: "Kak Max",
    status: "1 hari lagi",
    img: "/images/training.png",
  },
  {
    title: "Training Quality Control",
    date: "Kamis, 17 Jul 2025",
    time: "18:50 - 20:15 WIB",
    teacher: "Kak Hanif",
    status: "10 jam lagi",
    img: "/images/training.png",
  },
  {
    title: "Training Maintenance",
    date: "Selasa, 15 Jul 2025",
    time: "18:20 - 19:40 WIB",
    teacher: "Kak Abelle",
    status: "Selesai",
    img: "/images/training.png",
  },
];
