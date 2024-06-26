"use client"

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";

import { Skeleton } from "@/components/ui/skeleton";

import { useBulkDeleteCategories } from "@/features/categories/hooks/use-bulk-delete-categories";


import useGetCategories from "@/features/categories/api/use-get-categories";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";

export default function AccountPage() {
  const newCategory = useNewCategory();
  const getCategoriesQuery = useGetCategories();
  const deleteCategoriesQuery = useBulkDeleteCategories();

  const accountsData = getCategoriesQuery.data || [];

  const isDisabled = getCategoriesQuery.isLoading || deleteCategoriesQuery.isPending;

  if (getCategoriesQuery.isLoading){
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
        <CardHeader>
          <Skeleton className="h-8 w-48"/>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin"/>
          </div>
        </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm p-5">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">Accounts</CardTitle>
            <Button size='sm' onClick={newCategory.onOpen}>
                <Plus className="size-4 mr-2"/>
                Add New
            </Button>
            </CardHeader>
            <DataTable filterKey="name" columns={columns} data={accountsData} disabled={isDisabled} onDelete={(row)=>{
              const ids = row.map(r=>r.original.id);
              deleteCategoriesQuery.mutate({ids});
            }}/>
        </Card>
    </div>
  );    
}
