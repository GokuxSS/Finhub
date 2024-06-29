import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { transactionSchema } from '@/db/schema';

import { useNewTransaction } from '../hooks/use-new-transaction';
import { useCreateTransaction } from '../api/use-create-transaction';

import { z } from 'zod';
import useGetCategories from './../../categories/api/use-get-categories';
import { useCreateCategory } from './../../categories/hooks/use-create-category';
import { useCreateAccount } from './../../accounts/hooks/use-create-account';
import useGetAccounts from './../../accounts/api/use-get-accounts';
import { TransactionForm } from './transaction-form';
import { Loader2 } from 'lucide-react';

const formSchema = transactionSchema.omit({ id: true });

type FormValues = z.infer<typeof formSchema>;

export function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransaction();
  const createMutation = useCreateTransaction();

  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories();

  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountMutation = useCreateAccount();
  const accountQuery = useGetAccounts();

  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    createMutation.isPending ||
    accountMutation.isPending ||
    categoryMutation.isPending;

  const isLoading = accountQuery.isLoading || categoryQuery.isLoading;

  function handleFormSubmit(values: FormValues) {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className='size-4 text-muted-foreground animate-spin'/>
          </div>
        ) : (
          <TransactionForm
            onSubmit={handleFormSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}

      </SheetContent>
    </Sheet>
  );
}
