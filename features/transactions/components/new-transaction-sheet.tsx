import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {  transactionSchema } from "@/db/schema";

import { useNewTransaction } from "../hooks/use-new-transaction";
import { useCreateTransaction } from "../api/use-create-transaction";
 
import { z } from "zod";
import useGetCategories from './../../categories/api/use-get-categories';
import { useCreateCategory } from './../../categories/hooks/use-create-category';
import { useCreateAccount } from './../../accounts/hooks/use-create-account';
import useGetAccounts from './../../accounts/api/use-get-accounts';

const formSchema = transactionSchema.omit({ id: true });

type FormValues = z.infer<typeof formSchema>;

export function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransaction();
  const mutation = useCreateTransaction();

  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories(); 
  
  const accountMutation = useCreateAccount();
  const accountQuery = useGetAccounts();

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
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Add a new transaction
          </SheetDescription>
        </SheetHeader>
        <p>Transaction form</p>
        {/* <AccountForm disabled={mutation.isPending} onSubmit={handleFormSubmit} /> */}
      </SheetContent>
    </Sheet>
  );
}
