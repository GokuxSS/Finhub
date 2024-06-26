"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";

export default function useGetCategories() {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await client.api.categories.$get();

      if (!response.ok) {
        throw new Error("Internal Error");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return categories;
}
