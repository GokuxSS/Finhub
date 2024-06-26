"use client";
import type { InferRequestType, InferResponseType } from "hono/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";
import { toast } from "sonner"

// InferResponseType
type ResType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>;

export function useDeleteTransaction(id?:string) {

  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error>({
    mutationFn: async () => {
      const res = await client.api.transactions[":id"]["$delete"]({param:{
        id
      }});
      return await res.json();
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["transactions"]})
        queryClient.invalidateQueries({queryKey:["transaction",{id}]})
        toast.success("Transaction Deleted");
    },
    onError:()=>{
        toast.error("Failed to delete transaction");
    }
  });

  return mutation;
}
