"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit,Trash, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useOpenCategory } from "@/features/categories/hooks/use-open-category"
import { useDeleteCategory } from "@/features/categories/api/use-delete-category"

import useConfirm from "@/hooks/useConfirm"

type Props = {
    id:string
}

export function Actions({id}:Props){

    const  {onClose,onOpen} = useOpenCategory();
    const [ConfirmDialog,confirm] = useConfirm("Are you sure?","You are about to delete category.");
    const deleteMutation = useDeleteCategory(id);
  
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