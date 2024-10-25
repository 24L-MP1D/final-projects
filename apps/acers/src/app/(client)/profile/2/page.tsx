'use client;';
import { use } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

export default function page() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="flex justify-center">
      <div className="flex gap-20 max-w-screen-xl ">
        <div className="">
          <div className="">
            <Button className="text-xl text-slate-600" variant="ghost">
              Account
            </Button>
          </div>
          <div className="">
            <Button className="text-xl font-semibold" variant="ghost">
              | Email and settings
            </Button>
          </div>
        </div>
        <div className="bg-slate-300">
          <div className="">
            <p className="text-3xl">Good afternoon</p>
            <p className="pb-8">You’ve supported independent journalism since 2024.</p>
          </div>
          <div className="pb-6 border-black border-t-2">
            <p className="text-xl">Account information</p>
          </div>
          <div className="pb-6 border-slate-400 border-t-[1px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <div className="">
                  <AccordionTrigger className="text-xl">
                    <p>Account number</p>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="flex items-center justify-between">
                  <p className="text-m">247247247247247</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="pb-6 border-slate-400 border-t-[1px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <div className="">
                  <AccordionTrigger className="text-xl">
                    <p>Email</p>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="flex items-center justify-between">
                  <p className="text-m">nyambaatar@pinecone.mn</p>
                  <Button className="text-xs" variant="outline">
                    change
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="pb-6 border-slate-400 border-t-[1px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <div className="">
                  <AccordionTrigger className="text-xl">
                    <p>Password</p>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="flex items-center justify-between">
                  <p className="text-m">*********</p>
                  <Button className="text-xs" variant="outline">
                    change
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="pb-6 border-black border-t-2">
            <p className="text-2xl font-semibold">Your profile</p>
          </div>
          <div className="pb-6 border-slate-400 border-t-[1px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <div className="">
                  <AccordionTrigger className="text-xl">
                    <p>Name</p>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="flex items-center justify-between">
                  <p className="text-m">Nyambaatar</p>
                  <Button className="text-xs" variant="outline">
                    change
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="pb-6 border-slate-400 border-t-[1px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <div className="">
                  <AccordionTrigger className="text-xl">
                    <p>Last Name</p>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="flex items-center justify-between">
                  <p className="text-m">Nyambaaa</p>
                  <Button className="text-xs" variant="outline">
                    change
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="pb-6 border-slate-400 border-t-[1px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <div className="">
                  <AccordionTrigger className="text-xl">
                    <p>Phone number</p>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="flex items-center justify-between">
                  <p className="text-m">(+976) 9111-1111</p>
                  <Button className="text-xs" variant="outline">
                    change
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="pb-6 border-black border-t-2">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <div className="">
                  <AccordionTrigger className="text-xl">
                    <p>Subscribe</p>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="flex items-center justify-between">
                  <Badge variant="destructive">FREE</Badge>
                  <Button className="text-xs" variant="outline">
                    change
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
