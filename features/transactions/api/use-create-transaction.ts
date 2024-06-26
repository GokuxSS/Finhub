"use client";
import type { InferRequestType, InferResponseType } from "hono/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";
import { toast } from "sonner"

// InferRequestType
type ReqType = InferRequestType<typeof client.api.transactions.$post>["json"];

// InferResponseType
type ResType = InferResponseType<typeof client.api.transactions.$post>;

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async (json) => {
      const res = await client.api.transactions.$post({ json });
      return await res.json();
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["transactions"]})
        toast.success("Created Transaction");
    },
    onError:()=>{
        toast.error("Failed to create transaction");
    }
  });

  return mutation;
}
