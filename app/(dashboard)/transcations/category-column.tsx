import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  id: string
  categoryName : string | null;
  categoryId: string | null
}

export function CategoryColumn({id,categoryName,categoryId}:Props){

  const {onOpen: onOpenCategory} = useOpenCategory();
  const {onOpen: onOpenTransaction} = useOpenTransaction();

  function handleClick(){
    if (categoryId){
      onOpenCategory(categoryId)
    }
    else{
      onOpenTransaction(id)
    }
  }

  return (
    <div
     onClick={handleClick}
     className={cn("flex items-center cursor-pointer hover:underline",
      !categoryName && "text-rose-500"
     )}
    >
      {!categoryName && <TriangleAlert className="mr-2 size-4 shrink-0"/>}
      {categoryName || "Uncategorized"}
    </div>
  )
}