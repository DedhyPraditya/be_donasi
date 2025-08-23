import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // Ambil 10 donasi terbaru
  const aktivitas = await prisma.donasi.findMany({
    orderBy: { waktu: 'desc' },
    take: 10,
    select: {
      id: true,
      nama: true,
      nominal: true,
      waktu: true,
      pesan: true,
    },
  });
  return NextResponse.json({ success: true, data: aktivitas });
}
