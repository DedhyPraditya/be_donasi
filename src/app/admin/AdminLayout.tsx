"use client";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_login");
      router.push("/admin/login");
    }
  }
  return (
    <div className="bg-gray-50 font-inter min-h-screen">
      {/* Sidebar */}
  <div id="sidebar" className={`fixed left-0 top-0 h-full ${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white shadow-sm border-r border-gray-200 transform transition-all duration-300 z-30 flex flex-col`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          {!sidebarCollapsed && <h1 className="text-xl font-semibold text-gray-800">Sistem Donasi</h1>}
          <button onClick={()=>setSidebarCollapsed(v=>!v)} className="ml-auto p-2 rounded hover:bg-green-100 transition-colors" title={sidebarCollapsed ? 'Tampilkan Sidebar' : 'Sembunyikan Sidebar'}>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sidebarCollapsed ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
            </svg>
          </button>
        </div>
        <nav className="mt-6">
          <div className="px-2 space-y-1">
            <a href="/admin" className={`nav-item flex items-center ${sidebarCollapsed ? 'justify-center' : ''} px-4 py-3 text-gray-700 rounded-lg group transition-colors active`}>
              <svg className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'} group-hover:text-green-600 transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
              </svg>
              {!sidebarCollapsed && 'Dashboard'}
            </a>
            {/* Donatur Group with Submenu */}
            <div className="nav-group">
              <button type="button" onClick={() => setSubmenuOpen((v) => !v)} className={`nav-item flex items-center w-full ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3 text-gray-700 rounded-lg group transition-colors`}>
                <div className="flex items-center">
                  <svg className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'} group-hover:text-green-600 transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {!sidebarCollapsed && 'Donatur'}
                </div>
                {!sidebarCollapsed && (
                  <svg className={`w-4 h-4 transition-transform ${submenuOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
              <div className={`${sidebarCollapsed ? 'hidden' : 'ml-8 mt-1 space-y-1'} ${submenuOpen ? "block" : "hidden"}`}>
                <a href="#" className="nav-subitem block px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  Donatur Tetap
                </a>
                <a href="/admin/donatur/donasi-umum" className="nav-subitem block px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  Donasi Umum
                </a>
              </div>
            </div>
            <a href="#" className={`nav-item flex items-center ${sidebarCollapsed ? 'justify-center' : ''} px-4 py-3 text-gray-700 rounded-lg group transition-colors`}>
              <svg className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'} group-hover:text-green-600 transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {!sidebarCollapsed && 'Analitik'}
            </a>
            <a href="#" className={`nav-item flex items-center ${sidebarCollapsed ? 'justify-center' : ''} px-4 py-3 text-gray-700 rounded-lg group transition-colors`}>
              <svg className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'} group-hover:text-green-600 transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {!sidebarCollapsed && 'Pengaturan'}
            </a>
          </div>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">A</div>
            {!sidebarCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@donasi.org</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 id="page-title" className="text-2xl font-semibold text-gray-800">Dashboard</h2>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h10V9H4v2z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5z" />
                  </svg>
                </button>
                <button onClick={handleLogout} className="ml-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium">Logout</button>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content Slot */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
