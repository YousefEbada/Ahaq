import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export function useAuth() {
  const [authChecked, setAuthChecked] = useState(false);
  
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    enabled: !authChecked, // Only run once
  });

  // If we get a 401 error or complete successfully, mark auth as checked
  useEffect(() => {
    if (error || user || (!isLoading && !user)) {
      setAuthChecked(true);
    }
  }, [error, user, isLoading]);

  // If we get a 401 error, the user is not authenticated
  const is401Error = error && (error as any).message?.includes('401');

  return {
    user,
    isLoading: isLoading && !authChecked,
    isAuthenticated: !!user && !is401Error,
  };
}
