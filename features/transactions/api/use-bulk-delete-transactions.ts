"use client";
import type { InferRequestType, InferResponseType } from "hono/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";
import { toast } from "sonner"

// InferRequestType
type ReqType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"];

// InferResponseType
type ResType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>;

export function useBulkDeleteTransactions() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async (json) => {
      const res = await client.api.transactions["bulk-delete"]["$post"]({ json });
      return await res.json();
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["transactions"]})
        toast.success("Succefully Deleted Transactions");
    },
    onError:()=>{
        toast.error("Failed to delete transactions");
    }
  });

  return mutation;
}
