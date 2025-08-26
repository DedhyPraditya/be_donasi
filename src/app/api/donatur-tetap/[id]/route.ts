import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: ambil donatur tetap by id
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const data = await prisma.donaturTetap.findUnique({
      where: { id: Number(id) }
    })
    return NextResponse.json({ success: true, data })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Terjadi kesalahan';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    )
  }
}

// PATCH: update donatur tetap
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  try {
    const updated = await prisma.donaturTetap.update({
      where: { id: Number(id) },
      data: {
        nama: body.nama,
        email: body.email,
        phone: body.phone,
        aktif: body.aktif
      }
    })
    return NextResponse.json({ success: true, data: updated })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Terjadi kesalahan';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    )
  }
}

// DELETE: hapus donatur tetap
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.donaturTetap.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Terjadi kesalahan';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    )
  }
}
