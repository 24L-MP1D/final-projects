'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { fetcher } from '@/lib/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

export default function Page() {
  const params = useParams();
  const schoolId = params?.schoolId;
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
      const response = await fetcher().post('/api/courses', { ...values, schoolId });
      router.push(`/admin-app/${schoolId}/courses/${response.data._id}`);
      toast.success('Course created');
    } catch {
      toast.error('Something went wrong');
    }
  }

  return (
    <main className="max-w-5xl mx-auto flex items-center justify-center h-screen flex-col prose">
      <h2 className="">Та хичээлдээ нэр өгнө үү</h2>
      <p>Хичээлийн нэрийг дараа сольж болно</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mr-4 text-xl">Хичээлийн нэр :</FormLabel>
                <FormControl>
                  <input placeholder="Жишээ: Вэб хөгжүүлэлт" disabled={isSubmitting} {...field} className="input input-primary input-bordered " />
                </FormControl>
                <FormDescription>Та энэ хичээлд юуны талаар заах вэ?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2 justify-center">
            <Link href="/">
              <Button variant="ghost" type="button" className="text-xl">
                Cancel
              </Button>
            </Link>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="btn btn-primary
            text-xl"
            >
              Continue
            </button>
          </div>
        </form>
      </Form>
    </main>
  );
}
