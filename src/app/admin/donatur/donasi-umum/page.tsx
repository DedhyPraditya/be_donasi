"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import AdminLayout from "../../AdminLayout";



type Donasi = {
  id: number;
  nama: string;
  nominal: number;
  pesan?: string;
  bukti?: string;
  status: string;
  waktu: string;
};

export default function DonasiUmumPage() {
  // Ambil state collapse sidebar dari localStorage (sinkron dengan AdminLayout), hanya untuk tombol aksi
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSidebarCollapsed(localStorage.getItem('sidebar-collapsed') === 'true');
      const syncSidebarCollapse = (e: StorageEvent) => {
        if (e.key === 'sidebar-collapsed') {
          setSidebarCollapsed(e.newValue === 'true');
        }
      };
      window.addEventListener('storage', syncSidebarCollapse);
      return () => window.removeEventListener('storage', syncSidebarCollapse);
    }
  }, []);
  const [donasi, setDonasi] = useState<Donasi[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalImg, setModalImg] = useState<string|null>(null);

  useEffect(() => {
    fetchDonasi();
  }, []);

  async function fetchDonasi() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/daftar-donasi");
      const data = await res.json();
      setDonasi(data.data || []);
    } catch {
      setError("Gagal memuat data donasi");
    }
    setLoading(false);
  }

  async function handleValidasi(id: number, status: string) {
    if (!confirm(`Yakin ingin ${status === "TERVERIFIKASI" ? "validasi" : "menolak"} donasi ini?`)) return;
    try {
      await fetch("/api/admin/validasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      fetchDonasi();
    } catch {
      alert("Gagal memproses validasi");
    }
  }

  return (
    <AdminLayout>
  <div className="grid grid-cols-1 gap-4 pl-2 md:pl-4 pr-2 md:pr-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-800 tracking-tight">Daftar Donasi Umum</h3>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-4">Memuat...</div>
            ) : error ? (
              <div className="text-red-600 p-4">{error}</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Donatur</th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Jumlah</th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Tanggal</th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donasi.length === 0 && (
                    <tr><td colSpan={5} className="text-center p-4">Belum ada donasi</td></tr>
                  )}
                  {donasi.slice((page-1)*perPage, page*perPage).map((d) => (
                    <tr key={d.id}>
                      {/* Donatur cell with avatar and email/anonim */}
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${stringToColor(d.nama)}`}>{d.nama?.[0]?.toUpperCase() || '?'}</div>
                          <div>
                            <span className="font-semibold text-gray-800">{d.nama}</span>
                            <div className="text-xs text-gray-500">{d.pesan || 'Anonim'}</div>
                          </div>
                        </div>
                      </td>
                      {/* Nominal */}
                      <td className="px-3 py-2 whitespace-nowrap font-bold text-green-700 text-center">Rp {d.nominal.toLocaleString("id-ID").replace(/,/g, '.')}</td>
                      {/* Tanggal dari field waktu */}
                      <td className="px-3 py-2 whitespace-nowrap text-gray-500 text-center">{d.waktu ? new Date(d.waktu).toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                      {/* Status badge */}
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${d.status === 'TERVERIFIKASI' ? 'bg-green-100 text-green-800' : d.status === 'DITOLAK' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {d.status.replace(/_/g, ' ')}
                        </span>
                        {d.status === 'TERVERIFIKASI' && (
                          <span className="ml-2 text-xs text-green-500 font-semibold">Terkonfirmasi</span>
                        )}
                      </td>
                      {/* Aksi */}
                      <td className={`px-3 py-2 whitespace-nowrap flex gap-2 transition-all duration-200 ${sidebarCollapsed ? 'flex-col items-center px-2 py-2' : ''}`}> 
                        <button onClick={() => handleValidasi(d.id, "TERVERIFIKASI")}
                          className={`bg-green-600 text-white p-2 rounded hover:bg-green-700 flex items-center justify-center transition-all duration-200 ${sidebarCollapsed ? 'w-9 h-9' : ''}`}
                          title="Validasi Donasi">
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button onClick={() => handleValidasi(d.id, "DITOLAK")}
                          className={`bg-red-600 text-white p-2 rounded hover:bg-red-700 flex items-center justify-center transition-all duration-200 ${sidebarCollapsed ? 'w-9 h-9' : ''}`}
                          title="Tolak Donasi">
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                        {typeof d.bukti === 'string' && d.bukti && (
                          <button onClick={() => setModalImg(d.bukti ?? null)}
                            className={`bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center transition-all duration-200 ${sidebarCollapsed ? 'w-9 h-9' : ''}`}
                            title="Lihat Bukti Transfer">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
            {/* Pagination */}
            {donasi.length > perPage && (
              <div className="flex justify-center items-center gap-2 py-3">
                <button
                  className="px-3 py-1 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => setPage(page-1)}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <span className="text-xs font-semibold"> {page} dari {Math.ceil(donasi.length/perPage)}</span>
                <button
                  className="px-3 py-1 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => setPage(page+1)}
                  disabled={page === Math.ceil(donasi.length/perPage)}
                >
                  Next
                </button>
              </div>
            )}
                </tbody>
              </table>
            )}
            {/* Modal Preview Bukti */}
            {modalImg && (
              <div className="fixed inset-0 flex items-center justify-center z-50" style={{background:'rgba(0,0,0,0.4)'}} onClick={(e)=>{if(e.target===e.currentTarget)setModalImg(null)}}>
                <div className="relative bg-white rounded-lg shadow-2xl p-4 flex flex-col items-center" style={{maxWidth:'400px', width:'90vw', maxHeight:'80vh'}}>
                  <button onClick={()=>setModalImg(null)} className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <Image src={modalImg} alt="Preview Bukti" width={400} height={400} className="max-w-full max-h-[60vh] rounded border-2 border-gray-200" style={{objectFit:'contain'}} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );

  // Helper: generate color class from string
  function stringToColor(str: string) {
    const colors = [
      'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 'bg-pink-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-teal-500',
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  }
}
