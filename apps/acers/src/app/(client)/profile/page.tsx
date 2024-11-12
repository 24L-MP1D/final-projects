'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/Accordion';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { ObjectId } from 'mongodb';
import { Input } from '../components/ui/Input';
import { useRouter } from 'next/navigation';

export default function page() {
  interface users {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    role: string;
  }

  const [name, setName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [role, setRole] = useState('');

  const token = localStorage.getItem('authtoken');

  const router = useRouter();

  if (!window) {
    return null;
  }

  if (!token) {
    return router.push('/login');
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/api/profile', {
          headers: { authtoken: token },
        });
        const user = response.data;
        setName(user.firstName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUser();
  }, [name]);

  return (
    <div className="flex justify-center">
      <div className="flex gap-20 max-w-screen-xl ">
        <div className="">
          <div className="">
            <Button className="text-xl font-semibold" variant="ghost">
              | Account
            </Button>
          </div>
          <div className="">
            <Button className="text-xl text-slate-600" variant="ghost">
              Email and settings
            </Button>
          </div>
        </div>
        <div className="">
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
                  <p className="text-m">{}</p>
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
                  <p className="text-m">{name}</p>
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
                  <p className="text-m">lastnamehere</p>
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
