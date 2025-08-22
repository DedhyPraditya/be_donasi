import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH: Update donatur tetap
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await request.json();
  try {
    const updated = await prisma.donaturTetap.update({
      where: { id },
      data: {
        nama: body.nama,
        email: body.email,
        phone: body.phone,
        aktif: body.aktif,
      },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

// DELETE: Hapus donatur tetap
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  try {
    await prisma.donaturTetap.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
