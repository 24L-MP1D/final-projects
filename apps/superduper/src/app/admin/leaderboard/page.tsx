'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselSize() {

  const approveButton = true;
  const approveRequest = true;

  const approvedSellRequest = async () => {
    const response = await fetch('/api/sellerRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(approveButton),
    });
    if (response.ok) {
      alert('Request approved successfully');
    } else {
      alert('Failed to approve request');
    }
  }
  function cancelSellRequest(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container w-[550px] peer-has-[]: mx-auto flex justify-center p-6 bg-slate-100 rounded-sm">
    <div>
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                  
                </CardContent>
              </Card>
            </div>
            
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div className="p-8">
      <CardFooter>     
        <Button onClick={approveButton ? approvedSellRequest : cancelSellRequest}>{approveRequest ? "Approve the seller's request" : "Cancel"}</Button>
        <div className="flex-auto"><Button variant="outline" onClick={() => window.location.href="http://localhost:3000/admin"}>Cancel</Button></div>
      </CardFooter>
      </div>
    </Carousel>
    </div>
    
   
 </div>
  )
}




