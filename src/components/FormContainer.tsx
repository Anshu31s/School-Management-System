"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const FormContainer = ({
  table,
  type,
  id,
  status,
}: {
  table: string;
  type: "create" | "update" | "delete";
  id?: string;
  status?: boolean;
}) => {
  const router = useRouter();

  const handleStatusToggle = async () => {
    if (type !== "update" || !id) return;

    try {
      const res = await fetch(`/api/students/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !status }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        console.error("Failed to toggle status");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  if (type === "create") {
    return (
      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
        <Image src="/plus.png" alt="Create" width={14} height={14} />
      </button>
    );
  }

  if (type === "update" && id && status !== undefined) {
    return (
      <button
        onClick={handleStatusToggle}
        className={`w-7 h-7 flex items-center justify-center rounded-full ${
          status ? "bg-lamaPurple" : "bg-lamaGreen"
        }`}
      >
        <Image
          src={status ? "/deactivate.png" : "/activate.png"}
          alt={status ? "Deactivate" : "Activate"}
          width={16}
          height={16}
        />
      </button>
    );
  }

  return null;
};

export default FormContainer;