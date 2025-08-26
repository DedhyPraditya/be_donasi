import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil semua donatur tetap
export async function GET() {
  const donatur = await prisma.donaturTetap.findMany({
    select: { id: true, nama: true, email: true, phone: true, aktif: true },
    orderBy: { id: 'desc' },
  });
  return NextResponse.json({ success: true, data: donatur });
}

// POST: Tambah donatur tetap baru
export async function POST(request: Request) {
  const body = await request.json();
  if (!body.nama || !body.email) {
    return NextResponse.json({ success: false, message: 'Nama dan email wajib diisi.' }, { status: 400 });
  }
  try {
    const donatur = await prisma.donaturTetap.create({
      data: {
        nama: body.nama,
        email: body.email,
        phone: body.phone || null,
        aktif: true,
      },
    });
    return NextResponse.json({ success: true, data: donatur });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Terjadi kesalahan';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
