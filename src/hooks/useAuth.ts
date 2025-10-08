'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/src/config/env";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    const checkToken = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Token inválido");
        setLoading(false);
      } catch (err) {
        localStorage.removeItem("token");
        router.replace("/login");
      }
    };

    checkToken();
  }, [router]);

  return loading;
}
