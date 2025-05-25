import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const Announcements = async () => {
  const { userId, sessionClaims } = auth();

  const role = (
    sessionClaims?.metadata as {
      role?: "admin" | "teacher" | "student" | "parent";
    }
  )?.role;

  let whereClause = {};

  if (role !== "admin") {
    if (role === "teacher") {
      whereClause = {
        OR: [{ targetRole: "teacher" }, { targetRole: null }],
      };
    } else if (role === "student") {
      whereClause = {
        OR: [
          { class: { students: { some: { id: userId! } } } },
          { targetRole: "student" },
          { targetRole: null },
        ],
      };
    } else if (role === "parent") {
      whereClause = {
        OR: [{ targetRole: "parent" }, { targetRole: null }],
      };
    }
  }

  const announcements = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: whereClause,
  });

  const bgColors = ["bg-SkyLight", "bg-PurpleLight", "bg-YellowLight"];

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <Link href="/list/announcements" className="text-xs text-gray-400 hover:underline">
          View All
        </Link>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {announcements.length === 0 ? (
          <div className="text-gray-500 text-sm">No announcements available.</div>
        ) : (
          announcements.map((announcement, index) => (
            <div key={announcement.id} className={`${bgColors[index % bgColors.length]} rounded-md p-4`}>
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{announcement.title}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                  {new Intl.DateTimeFormat("en-GB").format(announcement.date)}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{announcement.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
