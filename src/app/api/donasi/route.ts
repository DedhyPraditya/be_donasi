import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil semua donasi (terbaru dulu)
export async function GET() {
  const donasi = await prisma.donasi.findMany({
    where: { status: 'TERVERIFIKASI' },
    orderBy: { waktu: 'desc' },
    select: { id: true, nama: true, nominal: true, waktu: true },
  });
  return NextResponse.json({ success: true, data: donasi });
}

// POST: Tambah donasi baru
export async function POST(request: Request) {
  const body = await request.json();
  if (!body.nama || !body.nominal) {
    return NextResponse.json({ success: false, message: 'Nama dan nominal wajib diisi.' }, { status: 400 });
  }
  try {
    const newDonasi = await prisma.donasi.create({
      data: {
        nama: body.nama,
        nominal: body.nominal,
      },
    });
    return NextResponse.json({ success: true, data: newDonasi });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Terjadi kesalahan';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
