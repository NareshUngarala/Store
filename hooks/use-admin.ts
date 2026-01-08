"use client";

import { useState, useEffect } from "react";

export function useAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Add authentication logic here
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    isAuthenticated,
  };
}

