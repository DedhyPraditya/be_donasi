import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const target = 15000000;

export async function GET() {
  // Hitung total donasi terkumpul dari database
  const sum = await prisma.donasi.aggregate({
    _sum: { nominal: true }
  });
  const donasiTerkumpul = sum._sum.nominal || 0;
  const persen = Math.floor((donasiTerkumpul / target) * 100);
  return NextResponse.json({
    success: true,
    data: {
      target,
      terkumpul: donasiTerkumpul,
      persen,
    },
  });
}
