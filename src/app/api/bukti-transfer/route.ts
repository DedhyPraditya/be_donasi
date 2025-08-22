import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const nama = formData.get('nama') as string;
    const nominal = formData.get('nominal') as string;
    const pesan = formData.get('pesan') as string;
    const file = formData.get('bukti') as File;


    // Validasi tipe file dan ukuran
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const allowedExts = ['jpg', 'jpeg', 'png', 'pdf'];
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedTypes.includes(file.type) || !allowedExts.includes(ext)) {
      return NextResponse.json({ error: 'File harus berupa JPG, PNG, atau PDF' }, { status: 400 });
    }
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'Ukuran file maksimal 2MB' }, { status: 400 });
    }

    // Simpan file ke folder public/bukti-transfer
    const uploadDir = path.join(process.cwd(), 'public', 'bukti-transfer');
    await mkdir(uploadDir, { recursive: true });
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2,8)}.${ext}`;
    const filePath = path.join(uploadDir, fileName);
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(arrayBuffer));

    // Simpan data ke database
    const donasi = await prisma.donasi.create({
      data: {
        nama,
        nominal: parseInt(nominal.replace(/[^\d]/g, '')),
        pesan,
        bukti: `/bukti-transfer/${fileName}`,
        status: 'MENUNGGU_VERIFIKASI',
      },
    });

    return NextResponse.json({ success: true, donasi });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal upload bukti transfer', detail: String(err) }, { status: 500 });
  }
}
