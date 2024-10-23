import { SubmitHandler, useForm } from 'react-hook-form';

const Page = () => {
  interface RecipeForm {
    title: string;
    description: string; // Corrected the typo here
    images: string[];
    prepTime: string;
    servings: number;
    video: string;
    ingredients: string[];
    instructions: string[];
    nutritionFacts: { name: string; value: string }[];
    category: string | null;
    difficulty: number;
    availability: 'Gold' | 'Silver' | 'Bronze' | 'Free'; // Fixed the string syntax
  }

  const onSubmit: SubmitHandler<RecipeForm> = (data) => {
    Submit(data);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RecipeForm>();

  function Submit(data: RecipeForm) {
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} placeholder="Title" />
        <input {...register('description')} placeholder="Description" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
