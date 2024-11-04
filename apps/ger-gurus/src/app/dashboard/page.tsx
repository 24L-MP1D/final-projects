"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  domain: z.string().min(1, {
    message: 'Domain name is required',
  }),
});

export default function Page() {
  const router=useRouter()
  const [isExisting, setIsExisting]=useState<boolean| null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { domain: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      
      const response = await axios.post(`/api/check-domain`, values);
      setIsExisting(response.data) // instant
      toast.success('Checked if domain is available');
    } catch {
      toast.error('Something went wrong');
    }
  }
  async function createSchool(domain: string) {
    try {
      await axios.post(`/api/schools`, { domain }); // Send domain in the request
      toast.success('Your space has been created!'); // Optionally handle success
      router.push('/schools')
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <div className="flex justify-center h-screen items-center p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center text-sky-600">Welcome to Your Content Creating Adventure!</h1>
        <p className="mb-6 text-center text-gray-700">We're excited to have you here! Start by creating your unique space where you can share your skills and knowledge with the world.</p>
        <div className="flex flex-col items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 flex gap-4 items-start justify-center">
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center">
                        <Input {...field} type="text" placeholder="Enter your unique name" className="w-full max-w-xs text-base" 
                                                  onChange={(e) => {
                                                    field.onChange(e); 
                                                    setIsExisting(null)
                                                  }}/>
                        <p className="ml-2">.verse.mn</p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-start gap-2">
                <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting }>
                Check if available
                <Search />
                </Button>
              </div>
            </form>
          </Form>

          <div className='h-10'>

          {
            isExisting===true && form.formState.isValid && 
            <div> Domain is not available</div>
          }
          {
            isExisting===false && form.formState.isValid && 
            <div> Domain is available </div>
          }
          </div>

          <Button className="w-full max-w-xs mt-10" disabled={isExisting === null || isExisting===true }  onClick={() => createSchool(form.getValues().domain)}>
            Create My Space
           
          </Button>
        </div>
      </div>
    </div>
  );
}
