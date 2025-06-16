"use client";

import { fetchTools } from "@/Service/Tools/page";
import { useQuery } from "@tanstack/react-query";

export const useGetTools = () => {
  return useQuery({
    queryKey: ["tools"],
    queryFn: fetchTools,
    staleTime: 1000 * 60 * 5,
  });
};
