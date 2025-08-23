import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // Ambil donasi yang statusnya MENUNGGU_VERIFIKASI
  const donasi = await prisma.donasi.findMany({
    where: { status: 'MENUNGGU_VERIFIKASI' },
    orderBy: { id: 'desc' },
  });
  return NextResponse.json({ success: true, data: donasi });
}
