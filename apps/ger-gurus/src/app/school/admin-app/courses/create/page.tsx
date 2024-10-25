'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
 
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
})
const CLOUDINARY_CLOUD_NAME = 'dw85vgzlk';
const CLOUDINARY_UPLOAD_PRESET = 'zojuemkn';

useRouter

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function createCourse(values) {
    await fetch(`/api/courses`, {
      method: 'POST',
      body: JSON.stringify({
        title: values.title,
        author,
        description,
        thumbnail: imageUrl,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    await reset();
  }

  function reset() {
    setTitle(''), setAuthor(''), setDescription('');
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      setLoading(true);

      fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImageUrl(data.secure_url);
          setLoading(false);
        })
        .catch((err) => {
          alert('An Error Occured While Uploading');
        });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const {isSubmitting, isValid}=form.formState

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createCourse(values)
    console.log(values)
  }


  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto ">
      <div>
        <h1 className='text-2xl'>Name your course</h1>
        <p>What would you want to name your course?</p>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
              <Input placeholder="course title" disabled={isSubmitting} {...field}/>
              </FormControl>
              <FormDescription>
                What will you teach in this course?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </div>
      
      <Input placeholder="course author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <Input placeholder="Write description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input id="picture" disabled={loading} type="file" onChange={handleUpload} />
        {imageUrl && <img src={imageUrl} alt="" />}
      </div>
      <Button onClick={createCourse}>Continue</Button>
    </div>
  );
}
