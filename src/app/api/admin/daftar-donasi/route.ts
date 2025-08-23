import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Endpoint: /api/admin/daftar-donasi
// Ambil semua donasi (untuk daftar donasi umum admin)
export async function GET() {
  const donasi = await prisma.donasi.findMany({
    orderBy: { id: 'desc' },
  });
  return NextResponse.json({ success: true, data: donasi });
}
