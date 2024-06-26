"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";
import { useSearchParams } from "next/navigation";

export default function useGetTrasactions() {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const accounts = useQuery({
    queryKey: ["transactions",{from,to,accountId}],
    queryFn: async () => {
      const response = await client.api.transactions.$get({query:{
        from,
        to,
        accountId
      }});
      if (!response.ok) {
        throw new Error("Internal Error");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return accounts;
}
