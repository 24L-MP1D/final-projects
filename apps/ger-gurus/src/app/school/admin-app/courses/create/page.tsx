'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post('/api/courses', values);
      router.push(`/admin-app/courses/${response.data._id}`);
      toast.success('Course created');
    } catch {
      toast.error('Something went wrong');
    }
  }

  return (
    <div className="max-w-5xl mx-auto ">
      <div>
        <h1 className="text-2xl">Та хичээлдээ нэр өгнө үү</h1>
        <p>Хичээлийн нэрийг дараа сольж болно</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Хичээлийн нэр</FormLabel>
                  <FormControl>
                    <Input placeholder="Жишээ: Вэб хөгжүүлэлт" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormDescription>Та энэ хичээлд юуны талаар заах вэ?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button variant="ghost" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
