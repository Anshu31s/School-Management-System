import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";
  const classId = searchParams.get("classId") || "";
  const bloodType = searchParams.get("bloodType") || "";
  const sex = searchParams.get("sex") || "";
  const sortBy = searchParams.get("sortBy") || "name";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const ITEM_PER_PAGE = 50;

  const query: any = {};

  if (search) {
    query.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { username: { contains: search, mode: "insensitive" } },
    ];
  }

  if (classId) {
    query.classId = parseInt(classId);
  }

  if (bloodType) {
    query.bloodType = bloodType;
  }

  if (sex) {
    query.sex = sex;
  }

  try {
    const [students, count] = await prisma.$transaction([
      prisma.student.findMany({
        where: query,
        include: {
          class: true,
          parent: true,
        },
        orderBy: { [sortBy]: sortOrder },
        take: ITEM_PER_PAGE,
        skip: (page - 1) * ITEM_PER_PAGE,
      }),
      prisma.student.count({ where: query }),
    ]);

    return NextResponse.json({ students, count });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}