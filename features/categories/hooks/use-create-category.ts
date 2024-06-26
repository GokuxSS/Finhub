"use client";
import type { InferRequestType, InferResponseType } from "hono/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";
import { toast } from "sonner"

// InferRequestType
type ReqType = InferRequestType<typeof client.api.categories.$post>["json"];

// InferResponseType
type ResType = InferResponseType<typeof client.api.categories.$post>;

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async (json) => {
      const res = await client.api.categories.$post({ json });
      return await res.json();
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["categories"]})
        toast.success("Created Category");
    },
    onError:()=>{
        toast.error("Failed to create category");
    }
  });

  return mutation;
}
