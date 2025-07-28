import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./HeaderTraining";
import Link from "next/link";
import React from "react";

// Sidebar dengan fixed position
function Sidebar() {
  const router = useRouter();
  
  const menuItems = [
    { icon: "📚", text: "Training Modul", href: "/training/dashboard-user" },
    { icon: "📚", text: "Competency", href: "/training/dashboard-user" },
    { icon: "📄", text: "Module", href: "/training/dashboard-user/module" },
    { icon: "📄", text: "Development People", href: "/training/dashboard-user/module" },
    { icon: "🌐", text: "Test Result", href: "/training/dashboard-user/test-result" }
  ];

  return (
    <aside className="fixed left-0 top-16 w-64 bg-white shadow-lg border-r border-gray-200 h-screen overflow-y-auto z-10">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600 mb-8">Training Dashboard</h1>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <SidebarItem 
              key={index}
              icon={item.icon} 
              text={item.text} 
              href={item.href}
              active={router.pathname === item.href}
            />
          ))}
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
      
      {/* Header dengan fixed position */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Header />
      </div>

      {/* Layout dengan margin untuk header dan sidebar */}
      <div className="pt-16"> {/* Padding top untuk header */}
        <Sidebar />
        <main className="ml-64 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, href, active }) {
  return (
    <Link href={href} className="block">
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
          active 
              ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-500" 
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}>
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-medium">{text}</span>
      </div>
    </Link>
  );
}

LayoutDashboardUser.defaultProps = {
  title: "Greenfields PSG | User Dashboard",
  description: "User dashboard for Greenfields PSG",
  keywords: "dashboard, user, profile, settings",
};