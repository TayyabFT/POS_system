"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // list of public routes that don't require auth
    const publicPaths = ["/login", "/setupbusiness"];

    try {
      const userId = localStorage.getItem("userid");

      if (!userId) {
        // Not logged in: if not already on a public path, redirect to login
        if (pathname && !publicPaths.includes(pathname)) {
          router.push("/login");
        }
      } else {
        // Logged in: avoid staying on login/root pages
        if (pathname === "/login" || pathname === "/") {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      // In case accessing localStorage fails, ensure user lands on login
      if (pathname && pathname !== "/login") router.push("/login");
    }
  // run this effect on pathname changes
  }, [pathname, router]);

  return null;
}
