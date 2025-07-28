import Link from "next/link";
import { useState } from "react";

export default function HeaderTraining() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    window.location.href = "/training/auth/login";
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 no-underline">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EV</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  ELEVANA
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/training"
              className="text-black hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50 no-underline"
            >
              Home
            </Link>
            <Link
              href="/tentang-kami"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50 no-underline"
            >
              Tentang Kami
            </Link>
          </nav>

          {/* Auth Button - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleLoginClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="button"
            >
              Masuk / Daftar
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2"
              type="button"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 bg-white">
              <Link
                href="/training"
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/daftar-training"
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Daftar Training
              </Link>
              <Link
                href="/tentang-kami"
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </Link>

              {/* Mobile Auth Button */}
              <div className="pt-4 space-y-2 border-t border-gray-200 mt-4">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLoginClick();
                  }}
                  className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors duration-200"
                  type="button"
                >
                  Masuk / Daftar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}