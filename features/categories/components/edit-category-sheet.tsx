import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { categoriesSchema } from "@/db/schema";

import { useOpenCategory } from "../hooks/use-open-category";

import { CategoryForm } from "./category-form";

import { z } from "zod";
import {Loader2} from 'lucide-react';

import useGetCategory from "../api/use-get-category";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";

import useConfirm from "@/hooks/useConfirm";

const formSchema = categoriesSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export function EditCategorySheet() {
  const { isOpen, onClose,id } = useOpenCategory();

  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const [ConfirmDialog,confirm] = useConfirm("Are you sure?","You are about to delete category.");


  const defaultValues = categoryQuery.data ? {
    name:categoryQuery.data.name
  }:{
    name:""
  }

  const isLoading = categoryQuery.isLoading;

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
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>
            Edit an existing category
          </SheetDescription>
        </SheetHeader>
        { isLoading  ? 
        (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin"/>
          </div>
        )
        : (<CategoryForm
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
