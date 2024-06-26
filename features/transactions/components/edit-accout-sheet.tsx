import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { accountSchema } from "@/db/schema";

import { useOpenAccount } from "../hooks/use-open-account";

import { AccountForm } from "./account-form";

import { z } from "zod";
import {Loader2} from 'lucide-react';

import useGetAccount from "../api/use-get-account";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";
import useConfirm from "@/hooks/useConfirm";

const formSchema = accountSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export function EditAccountSheet() {
  const { isOpen, onClose,id } = useOpenAccount();

  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const [ConfirmDialog,confirm] = useConfirm("Are you sure?","You are about to delete transaction.");


  const defaultValues = accountQuery.data ? {
    name:accountQuery.data.name
  }:{
    name:""
  }

  const isLoading = accountQuery.isLoading;

  function handleFormSubmit(values: FormValues) {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  async function handleDelete(){
    const ok = await confirm();

    if(ok){
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }

  return (
  <>
    <ConfirmDialog/>
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>
            Edit an existing account
          </SheetDescription>
        </SheetHeader>
        { isLoading  ? 
        (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin"/>
          </div>
        )
        : (<AccountForm
          id={id}
          disabled={isPending}
          onSubmit={handleFormSubmit}
          defaultValues={defaultValues}
          onDelete={handleDelete}
        />)}
      </SheetContent>
    </Sheet>  
  </>
  );
}
