import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

// POST /api/class → Create a class
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, capacity } = body;

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Class name is required and must be a string.' }, { status: 400 });
  }

  if (!capacity || typeof capacity !== 'number' || capacity <= 0) {
    return NextResponse.json({ error: 'Capacity must be a positive number.' }, { status: 400 });
  }

  try {
    const newClass = await prisma.class.create({
      data: {
        name,
        capacity
      }
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Class name must be unique.' }, { status: 409 });
    }
    console.error('Error creating class:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// PATCH /api/class → Update class (assign supervisor)
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { classId, supervisorId } = body;

  if (!classId || typeof classId !== 'number') {
    return NextResponse.json({ error: 'Valid classId is required.' }, { status: 400 });
  }

  if (!supervisorId || typeof supervisorId !== 'string') {
    return NextResponse.json({ error: 'Valid supervisorId is required.' }, { status: 400 });
  }

  try {
    const updatedClass = await prisma.class.update({
      where: { id: classId },
      data: {
        supervisor: {
          connect: { id: supervisorId }
        }
      }
    });

    return NextResponse.json(updatedClass, { status: 200 });
  } catch (error) {
    console.error('Error updating class:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
