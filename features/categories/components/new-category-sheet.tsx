import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { categoriesSchema } from "@/db/schema";


import { useNewCategory } from "../hooks/use-new-category";
import { useCreateCategory } from "../hooks/use-create-category";
import { CategoryForm } from "./category-form";

import { z } from "zod";

const formSchema = categoriesSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();

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
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to track your transcations.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm disabled={mutation.isPending} onSubmit={handleFormSubmit} />
      </SheetContent>
    </Sheet>
  );
}
