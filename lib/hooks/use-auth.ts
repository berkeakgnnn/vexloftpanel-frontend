"use client";

import { useState, useEffect } from "react";
import { getUser, isAuthenticated, type User } from "../auth";

export function useAuth(): { user: User | null; loading: boolean; isAdmin: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser());
    }
    setLoading(false);
  }, []);

  return { user, loading, isAdmin: user?.role === "ADMIN" };
}
