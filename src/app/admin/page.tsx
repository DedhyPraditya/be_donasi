"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "./AdminLayout";

type Statistik = {
  totalDonaturTetap: number;
  totalDonaturLepas: number;
  totalDonasi: number;
  rataRataDonasi: number;
};

type Aktivitas = {
  id: number;
  nama: string;
  nominal: number;
  waktu: string;
  pesan?: string;
};


export default function AdminDashboard() {
  // Hanya variabel yang dipakai saja
  const [sidebarCollapsed] = useState(false);
  const [statistik, setStatistik] = useState<Statistik | null>(null);
  const [statLoading, setStatLoading] = useState(true);
  const [statError, setStatError] = useState("");
  const [aktivitas, setAktivitas] = useState<Aktivitas[]>([]);
  const [aktivitasLoading, setAktivitasLoading] = useState(true);
  const [aktivitasError, setAktivitasError] = useState("");
  const [showAllAktivitas, setShowAllAktivitas] = useState(false);
  const [aktivitasPage, setAktivitasPage] = useState(1);
  const aktivitasPerPage = 10;

  const router = useRouter();

  // Redirect ke login hanya jika belum login
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("admin_login") === "true";
      if (!isLoggedIn) {
        router.push("/admin/login");
      }
    }
  }, [router]);

  // Fetch statistik
  useEffect(() => {
    async function fetchStatistik() {
      setStatLoading(true);
      setStatError("");
      try {
        const res = await fetch("/api/admin/statistik");
        if (!res.ok) throw new Error("Gagal fetch statistik");
          const data = await res.json();
          setStatistik(data.data);
          setStatLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setStatError(err.message);
        } else {
          setStatError("Gagal fetch statistik");
        }
      } 
    }
    fetchStatistik();
  }, []);

  // Fetch aktivitas
  useEffect(() => {
    async function fetchAktivitas() {
      setAktivitasLoading(true);
      setAktivitasError("");
      try {
        const res = await fetch("/api/admin/aktivitas");
        if (!res.ok) throw new Error("Gagal fetch aktivitas");
            const data = await res.json();
            setAktivitas(data.data);
            setAktivitasLoading(false)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setAktivitasError(err.message);
        } else {
          setAktivitasError("Gagal fetch aktivitas");
        }
      }
    }
    fetchAktivitas();
  }, []);

  const safeAktivitas = Array.isArray(aktivitas) ? aktivitas : [];
  const totalPages = Math.ceil(safeAktivitas.length / aktivitasPerPage);
  const currentAktivitas = safeAktivitas.slice(
    (aktivitasPage - 1) * aktivitasPerPage,
    aktivitasPage * aktivitasPerPage
  );

  return (
    <AdminLayout>
      {/* Dashboard Content */}
      <div
        className={`transition-all duration-300 px-4 md:px-6 ${
          sidebarCollapsed ? 'pl-4 md:pl-16' : 'pl-4 pr-4 md:pr-6'
        }`}
      >
        {/* Statistik Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 overflow-x-auto">
          {/* Card 1: Donatur Tetap */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donatur Tetap</p>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {statLoading ? (
                    <div className="h-7 w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : statError ? (
                    <span className="text-red-500">Error</span>
                  ) : (
                    typeof statistik?.totalDonaturTetap === 'number'
                      ? statistik.totalDonaturTetap.toLocaleString('id-ID')
                      : '0'
                    
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2: Donatur Lepas */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donasi Umum</p>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {statLoading ? (
                    <div className="h-7 w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : statError ? (
                    <span className="text-red-500">Error</span>
                  ) : (
                    typeof statistik?.totalDonaturLepas === 'number'
                      ? statistik.totalDonaturLepas.toLocaleString('id-ID')
                      : '0'
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3: Total Donasi */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donasi</p>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {statLoading ? (
                    <div className="h-7 w-24 bg-gray-200 rounded animate-pulse"></div>
                  ) : statError ? (
                    <span className="text-red-500">Error</span>
                  ) : (
                    typeof statistik?.totalDonasi === 'number'
                      ? `Rp ${statistik.totalDonasi.toLocaleString('id-ID')}`
                      : 'Rp 0'
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 4: Rata-rata Donasi */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rata-rata Donasi</p>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {statLoading ? (
                    <div className="h-7 w-24 bg-gray-200 rounded animate-pulse"></div>
                  ) : statError ? (
                    <span className="text-red-500">Error</span>
                  ) : (
                    typeof statistik?.rataRataDonasi === 'number'
                      ? `Rp ${statistik.rataRataDonasi.toLocaleString('id-ID')}`
                      : 'Rp -'
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h3>
            <button
              onClick={() => setShowAllAktivitas(true)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
            >
              Lihat Semua Aktivitas
              <span aria-hidden className="text-sm">→</span>
            </button>
          </div>

          <div className="p-6">
            {aktivitasLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : aktivitasError ? (
              <div className="text-red-600 text-sm">{aktivitasError}</div>
            ) : safeAktivitas.length === 0 ? (
              <div className="text-gray-500 text-sm">Tidak ada aktivitas terbaru.</div>
            ) : (
              <div className="space-y-4">
                {safeAktivitas.slice(0, 5).map((a) => (
                  <div key={a.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 leading-tight">
                        Donasi baru sebesar{' '}
                        <span className="font-semibold">Rp {a.nominal.toLocaleString("id-ID")}</span>{' '}
                        dari <span className="font-medium">{a.nama}</span>
                        {a.pesan && (
                          <span className="text-gray-600 block mt-1">&quot;{a.pesan}&quot;</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(a.waktu).toLocaleString("id-ID", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal: Lihat Semua Aktivitas */}
        {showAllAktivitas && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in"
            onClick={() => setShowAllAktivitas(false)}
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Semua Aktivitas</h3>
                <button
                  onClick={() => setShowAllAktivitas(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {aktivitas.length === 0 ? (
                  <p className="text-gray-500 text-sm">Tidak ada aktivitas.</p>
                ) : (
                  <div className="space-y-4">
                    {currentAktivitas.map((a) => (
                      <div key={a.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 leading-tight">
                            Donasi baru sebesar{' '}
                            <span className="font-semibold">Rp {a.nominal.toLocaleString("id-ID")}</span>{' '}
                            dari <span className="font-medium">{a.nama}</span>
                            {a.pesan && (
                              <span className="text-gray-600 block mt-1">&quot;{a.pesan}&quot;</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(a.waktu).toLocaleString("id-ID", {
                              dateStyle: "short",
                              timeStyle: "short",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pagination */}
              {aktivitas.length > aktivitasPerPage && (
                <div className="flex justify-center items-center gap-4 p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                  <button
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      aktivitasPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setAktivitasPage(aktivitasPage - 1)}
                    disabled={aktivitasPage === 1}
                  >
                    Sebelumnya
                  </button>
                  <span className="text-sm text-gray-600">
                    {aktivitasPage} dari {totalPages}
                  </span>
                  <button
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      aktivitasPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setAktivitasPage(aktivitasPage + 1)}
                    disabled={aktivitasPage === totalPages}
                  >
                    Berikutnya
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}