'use client';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { fetcher } from '@/lib/fetcher';
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
  function deleteCookie() {
    document.cookie = 'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn;  Secure; SameSite=Lax;';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn;  Secure; SameSite=Lax';
    window.location.reload();
  }
  const router = useRouter();
  const [isExisting, setIsExisting] = useState<boolean | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { domain: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(`/api/check-domain`, { domain: `${values.domain}.verse.mn` });
      setIsExisting(response.data); // instant
      toast.success('Checked if domain is available');
    } catch {
      toast.error('Something went wrong');
    }
  }
  async function createSchool(domain: string) {
    try {
      await fetcher().post(`/api/schools`, { domain: `${domain}.verse.mn` }); // Send domain in the request
      toast.success('Your space has been created!'); // Optionally handle success
      router.push(`/schools`);
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <main className="flex justify-center h-screen items-center p-6">
      <div onClick={deleteCookie} className="absolute top-4 right-8 cursor-pointer">
        Log out
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center text-primary">Контент Бүтээх Адал Явдалд Тавтай Морилно Уу!</h1>
        <p className="mb-6 text-center text-gray-700">Дэлхийтэй хуваалцах чадвар болон мэдлэгээ оруулан өөрийн өвөрмөц орон зайг бий болгох гэж байгаа танд баяр хүргэе!</p>
        <p className="mb-6 text-center text-base-content">Та давтагдашгүй домайн нэр оруулна уу.</p>

        <div className="flex flex-col items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex gap-4 items-start justify-center">
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center">
                        <input
                          {...field}
                          type="text"
                          placeholder="Энд нэрээ оруулна уу"
                          className="w-full max-w-xs text-base-content text-right input input-bordered input-primary"
                          onChange={(e) => {
                            field.onChange(e);
                            setIsExisting(null);
                          }}
                        />
                        <div className="ml-2">.verse.mn</div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 !mt-0">
                <button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting} className="btn btn-primary">
                  <p className="text-base-content">Давтагдсан эсэхийг шалгах</p>
                  <Search />
                </button>
              </div>
            </form>
          </Form>

          <div className="h-10 mt-4">
            {isExisting === true && form.formState.isValid && (
              <div role="alert" className="alert alert-error">
                Домен ашиглах боломжгүй! <p className="text-2xl text-center">😬</p>
              </div>
            )}
            {isExisting === false && form.formState.isValid && (
              <div role="success" className="alert alert-success">
                Домайн ашиглах боломжтой! <p className="text-2xl text-center">😀</p>
              </div>
            )}
          </div>

          <button className="w-full max-w-xs mt-10 btn btn-primary" disabled={isExisting === null || isExisting === true} onClick={() => createSchool(form.getValues().domain)}>
            <p className="text-base-content">Миний орон зайг үүсгэх</p>
          </button>
        </div>
      </div>
    </main>
  );
}
