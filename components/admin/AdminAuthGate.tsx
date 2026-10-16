"use client";

import { isAdminSession } from "@/lib/admin-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!isAdminSession()) {
      router.replace("/admin/login");
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-surface text-sm text-stone-500">
        Loading admin…
      </div>
    );
  }

  if (!isAdminSession()) return null;

  return <>{children}</>;
}
