import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // Hitung total donatur tetap
  const donaturTetap = await prisma.donaturTetap.count();
  // Hitung total donatur lepas dari jumlah seluruh baris di tabel Donasi (realtime, tanpa unique by nama)
  const totalDonaturLepas = await prisma.donasi.count();
  // Hitung total donasi
  const sum = await prisma.donasi.aggregate({ _sum: { nominal: true } });
  // Hitung rata-rata donasi
  const avg = await prisma.donasi.aggregate({ _avg: { nominal: true } });

  return NextResponse.json({
    success: true,
    data: {
  totalDonaturTetap: donaturTetap,
  totalDonaturLepas: totalDonaturLepas,
      totalDonasi: sum._sum.nominal || 0,
      rataRataDonasi: Math.round(avg._avg.nominal || 0),
    },
  });
}
