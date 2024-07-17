"use client";

import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeStudent = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/studentform?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeStudent} className="text-red-400">
      Delete
    </button>
  );
}