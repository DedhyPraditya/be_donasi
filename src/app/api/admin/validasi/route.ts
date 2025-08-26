import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !['TERVERIFIKASI', 'DITOLAK'].includes(status)) {
      return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 });
    }
    await prisma.donasi.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Gagal memproses validasi' }, { status: 500 });
  }
}
