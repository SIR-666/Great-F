import React from "react";
import Layout from "@/components/LayoutDashboardUser";
import Link from "next/link";

const testResults = [
  {
    module: "Network Fundamentals",
    img: "/images/training.png",
    date: "18 Jul 2025",
    pretest: { score: 70, status: "Lulus" },
    posttest: { score: 85, status: "Lulus" },
  },
  {
    module: "Quality Control",
    img: "/images/training.png",
    date: "10 Jul 2025",
    pretest: { score: 60, status: "Tidak Lulus" },
    posttest: { score: 72, status: "Lulus" },
  },
  {
    module: "Maintenance",
    img: "/images/training.png",
    date: "28 Jun 2025",
    pretest: { score: 55, status: "Tidak Lulus" },
    posttest: { score: 60, status: "Tidak Lulus" },
  },
];

export default function TestResultCardPage() {
return (
    <Layout title="Daftar Hasil Test">
        <div className="p-6 overflow-auto">
            <header className="bg-gradient-to-r bg-purple-600 from-purple-400 to-pink-500 p-6 rounded-xl text-white flex items-center justify-between mb-6 shadow-lg">
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-2">
                        Lihat hasil pre-test & post-test setiap modul
                    </h2>
                    <p className="text-pink-100 mb-4 text-sm">
                        Pantau perkembangan hasil belajar Anda pada setiap modul training yang telah diikuti.
                    </p>
                </div>
                <img
                    src="/images/exam-time.png"
                    alt="Module illustration"
                    className="w-60 h-auto p-5"
                />
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {testResults.map((result, idx) => (
                    <TestResultCard key={idx} {...result} />
                ))}
            </div>
        </div>
    </Layout>
);
}

function TestResultCard({ module, img, date, pretest, posttest }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-gray-100">
      <div className="relative">
        <img
          src={img}
          alt={module}
          className="rounded-lg w-full h-36 object-cover mb-4"
        />
        <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-600`}>
          {date}
        </span>
      </div>
      <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
        {module}
      </h3>
      <div className="mb-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-blue-700">Pre-test:</span>
          <span className="font-medium">{pretest.score}</span>
          <span className={pretest.status === "Lulus" ? "text-green-600" : "text-red-600"}>
            {pretest.status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-blue-700">Post-test:</span>
          <span className="font-medium">{posttest.score}</span>
          <span className={posttest.status === "Lulus" ? "text-green-600" : "text-red-600"}>
            {posttest.status}
          </span>
        </div>
      </div>
      <Link href="/training/dashboard-user/test-result/show">
        <button className="w-full text-sm text-blue-500 font-semibold hover:text-blue-700 transition-colors py-2 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 mt-2">
          Lihat Hasil Test
        </button>
      </Link>
    </div>
  );
}