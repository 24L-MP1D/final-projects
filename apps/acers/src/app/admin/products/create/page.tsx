'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../../(client)/components/ui/Input';
import { ImageInput } from './imageInput';
import { VideoInput } from './videoInput';

const Page = () => {
  interface RecipeForm {
    title: string;
    description: string;
    imagesFile: File[];
    prepTime: string;
    servings: number;
    videoFile: File | null;
    ingredients: string[];
    instructions: string[];
    nutritionFacts: { name: string; value: string }[];
    category: string | null;
    difficulty: number;
    availability: 'Gold' | 'Silver' | 'Bronze' | 'Free';
    images: string[];
    video: string;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RecipeForm>();

  const onSubmit: SubmitHandler<RecipeForm> = (data) => {
    Submit(data);
  };

  function Submit(data: RecipeForm) {
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <ComponentParent>
            <Input {...register('title')} placeholder="Title" />
            <Input {...register('description')} placeholder="Description" />
          </ComponentParent>
          <ComponentParent>
            <ImageInput register={(name: string, value: File[]) => setValue(name, value)} />
            <VideoInput register={(name: string, value: File | null) => setValue(name, value)} />
          </ComponentParent>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const ComponentParent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 flex flex-col gap-4">{children}</div>;
};

export default Page;
