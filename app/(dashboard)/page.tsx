"use client"
import { Button } from '@/components/ui/button';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';

export default function DashBoardPage() {
  const {onOpen} = useNewAccount();

  return (
    <div>
          <p>Dashboard Page</p>
          <Button variant="outline" onClick={()=>onOpen()}>
            Open Form
          </Button>
    </div>
  );
}


