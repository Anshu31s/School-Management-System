import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { status } = await request.json();

  try {
    const student = await prisma.student.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(student);
  } catch (error) {
    console.error("Error updating student status:", error);
    return NextResponse.json({ error: "Failed to update student status" }, { status: 500 });
  }
}