"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";

export default function useGetAccount(id?:string) {
  const accounts = useQuery({
    enabled:!!id,
    queryKey: ["accoutns",{id}],
    queryFn: async () => {
      const response = await client.api.accounts[":id"].$get({
        param:{id}
      });

      if (!response.ok) {
        throw new Error("Failed to fetch account");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return accounts;
}
