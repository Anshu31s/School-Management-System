// app/(dashboard)/announcements/page.tsx
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const AnnouncementsPage = async () => {
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
    orderBy: { date: "desc" },
    where: whereClause,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Announcements</h1>
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <p className="text-gray-500">No announcements found.</p>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white p-4 rounded-md border border-gray-200 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">{announcement.title}</h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  {new Intl.DateTimeFormat("en-GB").format(announcement.date)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{announcement.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
