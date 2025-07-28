import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./HeaderTraining";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// Sidebar dengan fixed position
function Sidebar() {
  const router = useRouter();
  const [expandedMenus, setExpandedMenus] = useState({ training: false });
  
  const menuItems = [
    { 
      icon: "📚", 
      text: "Dashboard", 
      href: "/training/dashboard-superuser" 
    },
    { 
      icon: "📄", 
      text: "Training", 
      href: "/training/dashboard-superuser/training",
      hasSubmenu: true,
      submenu: [
        { text: "Training Data", href: "/training/dashboard-superuser/training" },
        { text: "Module", href: "/training/dashboard-superuser/module" },
        { text: "Training Participant", href: "/training/dashboard-superuser/participant" },
        { text: "Training Schedule", href: "/training/dashboard-superuser/schedule" },
        { text: "Assessment", href: "/training/dashboard-superuser/assessment" },
        { text: "Approval", href: "/training/dashboard-superuser/approval" },
        { text: "Test Result", href: "/training/dashboard-superuser/result" }
      ]
    },
    { 
      icon: "🎯", 
      text: "Competency", 
      href: "/training/dashboard-superuser/competency" 
    },
    { 
      icon: "👥", 
      text: "People Development", 
      href: "/training/dashboard-superuser/people-development" 
    }
  ];

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const isSubmenuActive = (submenu) => {
    return submenu.some(item => router.pathname === item.href);
  };

  // Effect untuk menjaga submenu tetap terbuka jika salah satu submenu aktif
  useEffect(() => {
    const trainingSubmenu = menuItems.find(item => item.text === "Training")?.submenu;
    if (trainingSubmenu && isSubmenuActive(trainingSubmenu)) {
      setExpandedMenus(prev => ({
        ...prev,
        training: true
      }));
    }
  }, [router.pathname]);

  // Check apakah submenu harus ditampilkan (expanded atau ada submenu yang aktif)
  const shouldShowSubmenu = (menuKey, submenu) => {
    return expandedMenus[menuKey] || isSubmenuActive(submenu);
  };

  return (
    <aside className="fixed left-0 top-16 w-64 bg-white shadow-lg border-r border-gray-200 h-screen overflow-y-auto z-10">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.hasSubmenu ? (
                <>
                  <SidebarItemWithSubmenu 
                    icon={item.icon} 
                    text={item.text} 
                    href={item.href}
                    active={router.pathname === item.href || isSubmenuActive(item.submenu)}
                    expanded={shouldShowSubmenu('training', item.submenu)}
                    onToggle={() => toggleSubmenu('training')}
                  />
                  {shouldShowSubmenu('training', item.submenu) && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <SidebarSubItem
                          key={subIndex}
                          text={subItem.text}
                          href={subItem.href}
                          active={router.pathname === subItem.href}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <SidebarItem 
                  icon={item.icon} 
                  text={item.text} 
                  href={item.href}
                  active={router.pathname === item.href}
                />
              )}
            </div>
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

function SidebarItemWithSubmenu({ icon, text, href, active, expanded, onToggle }) {
  return (
    <div>
      <div 
        onClick={onToggle}
        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
            active 
                ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-500" 
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        <div className="flex items-center space-x-3">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-medium">{text}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

function SidebarSubItem({ text, href, active }) {
  return (
    <Link href={href} className="block">
      <div className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
          active 
              ? "bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-500" 
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
      }`}>
          <span className="text-sm">{text}</span>
      </div>
    </Link>
  );
}

LayoutDashboardUser.defaultProps = {
  title: "Greenfields PSG | User Dashboard",
  description: "User dashboard for Greenfields PSG",
  keywords: "dashboard, user, profile, settings",
};