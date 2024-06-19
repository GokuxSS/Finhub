"use client";
import type { InferRequestType, InferResponseType } from "hono/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";
import { toast } from "sonner"

// InferRequestType
type ReqType = InferRequestType<typeof client.api.accounts.$post>["json"];

// InferResponseType
type ResType = InferResponseType<typeof client.api.accounts.$post>;

export function useCreateAccount() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async (json) => {
      const res = await client.api.accounts.$post({ json });
      return res.json();
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["accoutns"]})
        toast.success("Created Account");
    },
    onError:()=>{
        toast.error("Failed to create account");
    }
  });

  return mutation;
}
