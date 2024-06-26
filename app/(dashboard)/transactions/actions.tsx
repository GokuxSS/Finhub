"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit,Trash, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account"
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account"

import useConfirm from "@/hooks/useConfirm"

type Props = {
    id:string
}

export function Actions({id}:Props){

    const  {onClose,onOpen} = useOpenAccount();
    const [ConfirmDialog,confirm] = useConfirm("Are you sure?","You are about to delete account.");
    const deleteMutation = useDeleteAccount(id);
  
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
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant="ghost" className="size-8 p-0">
                <MoreHorizontal className="size-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem
                disabled={deleteMutation.isPending}
              onClick={()=>onOpen(id)}
            >
                <Edit className="size-4 mr-2"/>
                Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={deleteMutation.isPending}
              onClick={handleDelete}
            >
                <Trash className="size-4 mr-2"/>
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>)
}