"use client";
import type { InferRequestType, InferResponseType } from "hono/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";
import { toast } from "sonner"

// InferRequestType
type ReqType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"];

// InferResponseType
type ResType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>;

export function useEditTransaction(id?:string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async (json) => {
      const res = await client.api.transactions[":id"]["$patch"]({param:{
        id
      }, json });
      return await res.json();
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["transactions"]})
        queryClient.invalidateQueries({queryKey:["transaction",{id}]})
        toast.success("Transaction Updated");
    },
    onError:()=>{
        toast.error("Failed to edit transaction");
    }
  });

  return mutation;
}
