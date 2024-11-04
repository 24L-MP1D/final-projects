import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import { useState } from "react"; // Import useState

export function DialogDemo() {
  // State for dialog description
  const [count, setCount] = useState(20)
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><ShoppingCart /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your cart ({count})</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
