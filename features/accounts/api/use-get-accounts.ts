"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";

export default function useGetAccounts() {
  const accounts = useQuery({
    queryKey: ["accoutns"],
    queryFn: async () => {
      const response = await client.api.accounts.$get();

      if (!response.ok) {
        throw new Error("Internal Error");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return accounts;
}
