'use client';

import { Label } from '@/components/label';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/input';
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from '@tabler/icons-react';
import { oauth_github, oauth_google } from 'config';
import { z } from 'zod';

const SignInSchema = z.object({
  email: z.string().email({ message: 'invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be longer than 6 characters.' })
    .max(20, { message: ' Password must be shorter than 20 characters.' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter.',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'Password must include at least one number. ' })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'Password must contain at least one special character',
    }),
});

type SignInSchemaType = z.infer<typeof SignInSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInSchemaType>({ resolver: zodResolver(SignInSchema) });

  async function onSubmit(values: SignInSchemaType) {
    console.log('submitting the form');
    console.log(values);
    const res = await fetch('/api/admins/sign-in', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    window.location.href = '/admin';
    if (res.ok) {
      console.log('successfully signed in');
      window.location.href = '/admin';
    } else {
      console.log('unsuccessful');
    }
  }
  function SignInbyGoogle() {
    const query = {
      client_id: oauth_google.client_id || '',
      redirect_uri: oauth_google.redirect_uri,
      response_type: 'code',
      scope: oauth_google.scopes,
      prompt: 'consent',
    };

    const url = new URL(oauth_google.endpoint);
    url.search = new URLSearchParams(query).toString();

    window.location.href = url.toString();
  }
  function SignInbyGithub() {
    const query = {
      client_id: oauth_github.client_id || '',
      redirect_uri: oauth_github.redirect_uri,
      scope: oauth_github.scopes,
      prompt: 'consent',
    };
    const url = new URL(oauth_github.endpoint);
    url.search = new URLSearchParams(query).toString();
    window.location.href = url.toString();
  }

  return (


    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 ml-6">🤗 Bidscape-ийн админд тавтай морилно уу 🤗</h2>



      <form className="my-8 form" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Имэйл хаяг</Label>
          <Input
            {...register('email', { required: true })}
            id="email"
            name="email"
            type="text"
            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
            placeholder="john@doe.com"
            autoComplete="off"
          />
          {errors?.email && <p className="text-red-600 text-sm">{errors?.email?.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Нууц үг</Label>
          <Input
            {...register('password', { required: true })}
            id="password"
            name="password"
            type="text"
            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
            placeholder="**********"
            autoComplete="off"
          />
          {errors?.password && <p className="text-red-600 text-sm">{errors?.password?.message}</p>}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Sign-in'}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button" // Change type to button to avoid form submission
            onClick={SignInbyGoogle}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">Гүүгл</span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button" // Change type to button to avoid form submission
            onClick={SignInbyGithub}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">ГитХаб</span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button" // Change type to button to avoid form submission
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">Фэйсбүүк</span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>;
};
