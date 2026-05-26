"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Use useLayoutEffect for synchronous mount detection - avoids cascading render warning
  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router, isMounted]);

  // Don't render anything until we're mounted and done loading
  if (!isMounted || isLoading) return null;
  if (!user) return null;

  return <>{children}</>;
}
