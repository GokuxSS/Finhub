"use client"

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Plus } from "lucide-react";
import { columns } from "./columns";

export default function AccountPage() {
  const newAccount = useNewAccount();

  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edfdd52f",
      amount: 123400,
      status: "processing",
      email: "mxvd@example.com",
    },
    {
      id: "728xcdved52f",
      amount: 112400,
      status: "pending",
      email: "xvdvm@example.com",
    },
   ]

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">Accounts</CardTitle>
            <Button size='sm' onClick={newAccount.onOpen}>
                <Plus className="size-4 mr-2"/>
                Add New
            </Button>
            </CardHeader>
            <DataTable filterKey="email" columns={columns} data={data} disabled={false} />
        </Card>
    </div>
  );    
}
