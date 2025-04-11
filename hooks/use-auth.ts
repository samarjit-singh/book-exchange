"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const sessionCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("service_session="));

    setIsLoggedIn(!!sessionCookie);
  }, []);

  return { isLoggedIn };
}
