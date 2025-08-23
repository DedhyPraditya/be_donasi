"use client";
import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  // Load state sidebar dari localStorage saat pertama kali mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-collapsed');
      setSidebarCollapsed(saved === 'true');
    }
  }, []);

  // Simpan ke localStorage saat berubah
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-collapsed', sidebarCollapsed.toString());
      // Broadcast perubahan ke tab lain
      window.dispatchEvent(new Event('storage'));
    }
  }, [sidebarCollapsed]);

  function handleLogout() {
    if (confirm("Yakin ingin keluar?")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin_login");
        localStorage.removeItem("sidebar-collapsed"); // opsional
        router.push("/admin/login");
      }
    }
  }

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex">
      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed left-0 top-0 h-full ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } bg-white shadow-lg border-r border-gray-200 transition-all duration-300 z-30 flex flex-col`}
      >
       
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            {!sidebarCollapsed ? (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon 
                  icon={faHandHoldingDollar} 
                  className="w-6 h-6 text-green-600" 
                />
                <h1 className="text-xl font-semibold text-gray-800">Sistem Donasi</h1>
              </div>
            ) : (
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <FontAwesomeIcon 
                  icon={faHandHoldingDollar} 
                  className="w-5 h-5 text-white" 
                />
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed((v) => !v)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={sidebarCollapsed ? 'Tampilkan Sidebar' : 'Sembunyikan Sidebar'}
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={sidebarCollapsed ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                />
              </svg>
            </button>
          </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {/* Dashboard */}
          <a
            href="/admin"
            className={`flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-green-50 transition-all duration-200 ${
              sidebarCollapsed ? 'justify-center' : 'gap-3'
            }`}
          >
            <svg
              className={`w-5 h-5 ${
                sidebarCollapsed ? '' : ''
              } text-gray-500 group-hover:text-green-600`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
              />
            </svg>
            {!sidebarCollapsed && <span>Dashboard</span>}
          </a>

          {/* Donatur Group */}
          <div>
            <button
              type="button"
              onClick={() => setSubmenuOpen((v) => !v)}
              className={`flex items-center w-full px-3 py-3 text-gray-700 rounded-lg hover:bg-green-50 transition-all duration-200 ${
                sidebarCollapsed ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className={`flex items-center ${sidebarCollapsed ? '' : 'gap-3'}`}>
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {!sidebarCollapsed && <span>Donatur</span>}
              </div>

              {/* Panah hanya muncul saat tidak collapsed */}
              {!sidebarCollapsed && (
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    submenuOpen ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>

            {/* Submenu */}
            {!sidebarCollapsed && (
              <div
                className={`ml-3 mt-1 space-y-1 overflow-hidden transition-all duration-200 ${
                  submenuOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Donatur Tetap
                </a>
                <a
                  href="/admin/donatur/donasi-umum"
                  className="block px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Donasi Umum
                </a>
              </div>
            )}
          </div>

          {/* Analitik */}
          <a
            href="#"
            className={`flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-green-50 transition-all duration-200 ${
              sidebarCollapsed ? 'justify-center' : 'gap-3'
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            {!sidebarCollapsed && <span>Analitik</span>}
          </a>

          {/* Pengaturan */}
          <a
            href="#"
            className={`flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-green-50 transition-all duration-200 ${
              sidebarCollapsed ? 'justify-center' : 'gap-3'
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {!sidebarCollapsed && <span>Pengaturan</span>}
          </a>
        </nav>

        {/* Footer: User Profile */}
        <div className="p-4 border-t border-gray-100">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            {!sidebarCollapsed && (
              <div>
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@donasi.org</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5z" />
                  </svg>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 bg-gray-50 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}