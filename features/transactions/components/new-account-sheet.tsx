import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { accountSchema } from "@/db/schema";

import { useNewAccount } from "../hooks/use-new-account";
import { useCreateAccount } from "../hooks/use-create-account";

import { AccountForm } from "./account-form";

import { z } from "zod";

const formSchema = accountSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount();
  const mutation = useCreateAccount();

  function handleFormSubmit(values: FormValues) {
    mutation.mutate(values,{
      onSuccess:()=>{
        onClose();
      }
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transcations.
          </SheetDescription>
        </SheetHeader>
        <AccountForm disabled={mutation.isPending} onSubmit={handleFormSubmit} />
      </SheetContent>
    </Sheet>
  );
}
