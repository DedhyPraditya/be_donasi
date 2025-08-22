import { NextResponse } from 'next/server';

// Simulasi donatur terbaru (ambil dari donasiList di real app)
const donaturTerbaru = [
  { nama: 'Ahmad S.', nominal: 200000, waktu: '2025-08-18T10:00:00Z' },
  { nama: 'Siti F.', nominal: 100000, waktu: '2025-08-18T12:00:00Z' },
  { nama: 'Rizki R.', nominal: 150000, waktu: '2025-08-19T08:00:00Z' },
];

export async function GET() {
  return NextResponse.json({ success: true, data: donaturTerbaru });
}
