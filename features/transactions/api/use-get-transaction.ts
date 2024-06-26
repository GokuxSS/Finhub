"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";

export default function useGetTranscation(id?:string) {
  const transactions = useQuery({
    enabled:!!id,
    queryKey: ["transaction",{id}],
    queryFn: async () => {
      const response = await client.api.transactions[":id"].$get({
        param:{id}
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transaction");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return transactions;
}
