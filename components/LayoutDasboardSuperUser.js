import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./HeaderTraining";
// import Footer from "./Footer";
import React from "react";

// Contoh Sidebar sederhana
function Sidebar() {
return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
        <div className="p-6">
            <h1 className="text-xl font-bold text-blue-600 mb-8">Training Dashboard</h1>
            <nav className="space-y-2">
                <SidebarItem icon="🏠" text="Dashboard" active />
                <SidebarItem icon="📚" text="Training" active />
                <SidebarItem icon="📖" text="Modul" />
                <SidebarItem icon="👥" text="Peserta" />
                <SidebarItem icon="📅" text="Jadwal Training" />
                <SidebarItem icon="⭐" text="Penilaian" />
                <SidebarItem icon="✅" text="Persetujuan" />
                <SidebarItem icon="📊" text="Hasil Test" />
            </nav>
        </div>
    </aside>
);
}

export default function LayoutDashboardUser({ title, keywords, description, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-100">{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

function SidebarItem({ icon, text, active }) {
    return (
        <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
            active 
                ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-500" 
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        }`}>
            <span className="text-lg">{icon}</span>
            <span className="text-sm font-medium">{text}</span>
        </div>
    );
}

LayoutDashboardUser.defaultProps = {
  title: "Greenfields PSG | User Dashboard",
  description: "User dashboard for Greenfields PSG",
  keywords: "dashboard, user, profile, settings",
};
