"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash } from 'lucide-react';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { categoriesSchema } from "@/db/schema";

const formSchema = categoriesSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export function CategoryForm({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:defaultValues
  });

 

  function handleDelete(){
    onDelete?.();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g Food,Travel,Gadgets"
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create category"}
        </Button>

        {!!id && (
        <Button type="button" variant="outline" onClick={()=>handleDelete()} className="w-full">
          <Trash />
          Delete Category
        </Button>
        )}

      </form>
    </Form>
  );
}
