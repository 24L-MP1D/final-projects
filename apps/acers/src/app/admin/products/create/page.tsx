'use client';

'use client';

import { X } from 'lucide-react';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Badge } from '../../../(client)/components/ui/Badge';
import { Input } from '../../../(client)/components/ui/Input';
import { ComboboxDemo } from '../../components/customizableComboBox';
import { ImageInput } from './imageInput';

import { VideoInput } from './videoInput';

import { uploadFilesInCloudinary } from './cloudinary';
import fetchAddRecipe from './fetchNewRecipe';
import Loading from './loading';

const Page = () => {
  const [tags, setTags] = useState<tag[]>([]);
  const [categories, setCategories] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [activeTags, setActiveTags] = useState<tag[]>([]);
  const [loading, setLoading] = useState(false);

  interface tag {
    _id: ObjectId;
    tagName: string;
  }

  interface RecipeForm {
    title: string;
    description: string;
    imagesFile: File[];
    prepTime: string;
    servings: number;
    videoFile: File | null;
    ingredients: { name: string }[]; // Update ingredient structure to use an object
    instructions: { step: string }[];
    nutritionFacts: { name: string; value: string }[];
    category: ObjectId;
    difficulty: number;
    availability: ObjectId | null;
    images: string[];
    video: string;
    tags: ObjectId[];
  }

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<RecipeForm>();

  const {
    fields: nutritionFields,
    append: appendNutrition,
    remove: removeNutrition,
  } = useFieldArray({
    control,
    name: 'nutritionFacts',
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({ control, name: 'instructions' });

  register('category', { required: 'Бүтээгдхүүний төрлийг оруулна уу.' });
  register('tags', { required: 'Таг оруулна уу?' });
  register('imagesFile', { required: 'Ядаж 1 зураг оруулна уу.' });

  // For nutritionFacts, you need to register each item in the array
  nutritionFields.forEach((_, index) => {
    register(`nutritionFacts.${index}.name`, { required: 'Тэжээлийн нэрийг оруулна уу.' });
    register(`nutritionFacts.${index}.value`, { required: 'Хэмжээг оруулна уу.' });
  });
  register('instructions', { required: 'Бүтээгдхүүний алхамыг оруулна уу.', minLength: { value: 1, message: 'Алхам нь 1 тэмдэгтээс их байх ёстой.' } });
  register('ingredients', { required: 'Та орцоо оруулна уу.', minLength: { value: 1, message: 'Орц нь 1 тэмдэгтээс их байх ёстой.' } });

  const onSubmit: SubmitHandler<RecipeForm> = (data) => {
    Submit(data);
  };

  async function Submit(data: RecipeForm) {
    setLoading(true);
    const imageURLs = await Promise.all(data.imagesFile.map(async (file) => await uploadFilesInCloudinary(file)));
    setValue('images', imageURLs);
    if (data.videoFile) {
      const videoURL = await uploadFilesInCloudinary(data.videoFile);
      setValue('video', videoURL);
    }
    const updatedData = getValues();
    fetchAddRecipe(updatedData);
    setLoading(false);
  }

  const getDatas = async () => {
    const categoryResponse = await fetch('/api/category');
    const tierResponse = await fetch('/api/tiers');
    const tagResponse = await fetch('/api/tags');
    setTiers(await tierResponse.json());
    setCategories(await categoryResponse.json());
    setTags(await tagResponse.json());
  };

  const addCategory = async (categoryName: string) => {
    const res = await fetch('/api/category', { method: 'POST', body: JSON.stringify({ categoryName }) });
    await getDatas();
  };

  useEffect(() => {
    getDatas();
  }, []);

  useEffect(() => {
    setValue(
      'tags',
      activeTags.map((tag) => tag._id)
    );
  }, [activeTags, setValue]);
  if (loading) return <Loading />;
  return (
    <div className="w-full bg-slate-100 ">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-9">
        <div className="grid grid-cols-2 gap-4 ">
          <ComponentParent>
            <ReUsableDiv name={'Бүтээгдхүүний нэр'}>
              <Input {...register('title', { required: 'Нэр оруулна уу.' })} placeholder="Нэр" />
              {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            </ReUsableDiv>
            <ReUsableDiv name="Бүтээгдхүүний тайлбар">
              <textarea {...register('description', { required: 'Тайлбар оруулна уу.' })} placeholder="Тайлбар" className="w-full p-2 border rounded-lg resize-none h-40" rows={6} />
              {errors.description && <span className="text-red-500">{errors.description?.message}</span>}
            </ReUsableDiv>
            <ReUsableDiv name="Бэлдэх хугацаа">
              <Input {...register('prepTime', { required: 'Бэлдэх хугацааг оруулна уу.' })} placeholder="Бэлдэх хугацаа" />
              {errors.prepTime && <span className="text-red-500">{errors.prepTime?.message}</span>}
            </ReUsableDiv>
          </ComponentParent>
          <ComponentParent>
            <div className="grid grid-cols-2 gap-2">
              <ReUsableDiv name="Порц">
                <Input {...register('servings', { required: 'Порцын хэмжээг оруулна уу' })} placeholder="Порц" type="number" />
                {errors.servings && <span className="text-red-500">{errors.servings?.message}</span>}
              </ReUsableDiv>
              <ReUsableDiv name="Хүндрэл">
                <Input {...register('difficulty', { required: 'Төвшинг оруулна уу.' })} placeholder="1 ээс 5-ын хооронд үнэлбэл" type="number" max={5} min={1} />
                {errors.difficulty && <span className="text-red-500">{errors.difficulty?.message}</span>}
              </ReUsableDiv>
              <div className="grid grid-cols-2">
                <ReUsableDiv name="Хүртээмж">
                  <ComboboxDemo
                    data={tiers.map((item: { name: string; _id: ObjectId }) => ({ label: item.name, value: item._id }))}
                    change={(val: ObjectId) => setValue('availability', val)}
                    {...register('availability', { required: 'Хүртээмжийг оруулна уу.' })}
                  />
                  {errors.availability && <span className="text-red-500">{errors.availability?.message}</span>}
                </ReUsableDiv>
              </div>
              <ReUsableDiv name="Ангилал">
                <ComboboxDemo
                  data={categories.map((item: { categoryName: string; _id: ObjectId }) => ({ label: item.categoryName, value: item._id }))}
                  change={(val: ObjectId) => setValue('category', val)}
                  addNew={(val: string) => {
                    addCategory(val);
                  }}
                  {...register('category', { required: 'Бүтээгдхүүний төрлийг оруулна уу.' })}
                />
                {errors.category && <span className="text-red-500">{errors.category?.message}</span>}
              </ReUsableDiv>
            </div>
            <ReUsableDiv name="Таг">
              <div className="border-[1px] border-slate-400 ">
                <div className="flex flex-wrap gap-2">
                  <span>Сонгосон: </span>
                  {activeTags.map(({ _id, tagName }) => (
                    <TagComponent
                      activeTagName={tagName}
                      key={_id.toString()}
                      id={_id}
                      delete={(id) => {
                        setActiveTags(activeTags.filter((tag) => tag._id !== id));
                      }}
                    />
                  ))}
                </div>
                <SearchTag
                  tags={tags}
                  selectTarget={(id, name) => {
                    setActiveTags([...activeTags, { _id: id, tagName: name }]);
                  }}
                />
              </div>
              {errors.tags && <span className="text-red-500">{errors.tags?.message}</span>}
            </ReUsableDiv>
          </ComponentParent>
          <ComponentParent>
            <ImageInput register={(name: string, value: File[]) => setValue('imagesFile', value)} />
            {errors.imagesFile && <span className="text-red-500">{errors.imagesFile?.message}</span>}
            <VideoInput register={(name: string, value: File | null) => setValue('videoFile', value)} />
          </ComponentParent>
          <ComponentParent>
            <ReUsableDiv name="Шошго">
              <div className="space-y-2">
                {nutritionFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input {...register(`nutritionFacts.${index}.name`)} placeholder="Тэжээлийн нэр" />
                    <Input {...register(`nutritionFacts.${index}.value`)} placeholder="Хэмжээ" />
                    <button type="button" onClick={() => removeNutrition(index)} className="text-red-500">
                      Устгах
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => appendNutrition({ name: '', value: '' })} className="mt-2 bg-blue-500 text-white p-1 rounded">
                  Шошгонд нэмэх
                </button>
              </div>
              {nutritionFields.map((_, index) => (
                <div key={index}>
                  {errors.nutritionFacts?.[index]?.name && <span className="text-red-500">{errors.nutritionFacts[index].name.message}</span>}
                  {errors.nutritionFacts?.[index]?.value && <span className="text-red-500">{errors.nutritionFacts[index].value.message}</span>}
                </div>
              ))}
            </ReUsableDiv>
          </ComponentParent>
          <ComponentParent>
            <ReUsableDiv name="Дараалал">
              <div className="space-y-2">
                {instructionFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input
                      {...register(`instructions.${index}.step`, { required: 'Алхамыг оруулна уу.' })} // Add required validation
                      placeholder="Алхам"
                    />
                    {errors.instructions?.[index]?.step && ( // Display error for this specific step
                      <span className="text-red-500">{errors.instructions[index].step.message}</span>
                    )}
                    <button type="button" onClick={() => removeInstruction(index)} className="text-red-500">
                      Устгах
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => appendInstruction({ step: '' })} className="mt-2 bg-blue-500 text-white p-1 rounded">
                  Заавар нэмэх
                </button>
              </div>
            </ReUsableDiv>
            {errors.instructions &&
              errors.instructions.message && ( // Display a general error for the instructions array
                <span className="text-red-500">{errors.instructions.message}</span>
              )}
          </ComponentParent>
          <ComponentParent>
            <ReUsableDiv name="Орц">
              <div className="space-y-2">
                {ingredientFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input
                      {...register(`ingredients.${index}.name`, { required: 'Орцны нэрийг оруулна уу.' })} // Register with validation
                      placeholder="Орцны нэр"
                    />
                    {errors.ingredients?.[index]?.name && ( // Display error for this specific ingredient
                      <span className="text-red-500">{errors.ingredients[index].name.message}</span>
                    )}
                    <button type="button" onClick={() => removeIngredient(index)} className="text-red-500">
                      Устгах
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => appendIngredient({ name: '' })} className="mt-2 bg-blue-500 text-white p-1 rounded">
                  Орц нэмэх
                </button>
              </div>
            </ReUsableDiv>
            {errors.ingredients &&
              errors.ingredients.message && ( // Display a general error for the ingredients array
                <span className="text-red-500">{errors.ingredients.message}</span>
              )}
          </ComponentParent>
        </div>
        <div className="mt-4 col-span-2 flex flex-row-reverse">
          <button className="text-white py-2 px-4 rounded-xl bg-green-600" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// Other components...

interface TagProps {
  activeTagName: string;
  id: ObjectId;
  delete: (id: ObjectId) => void;
}

const SearchTag = ({ tags, selectTarget }: { tags: any; selectTarget: (id: ObjectId, name: string) => void }) => {
  const [search, setSearch] = useState('');

  // Filter tags based on search input
  const filteredTags = tags.filter(({ tagName }: { tagName: string }) => tagName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Input
        placeholder="Таг хайх..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <span>Тагууд: </span>
      {filteredTags.map(({ _id, tagName }: { _id: ObjectId; tagName: string }) => (
        <BadgeTag id={_id} name={tagName} addTag={(id, name) => selectTarget(id, name)} key={`selectTag${_id.toString()}`} />
      ))}
    </div>
  );
};

const BadgeTag = ({ name, addTag, id }: { id: ObjectId; name: string; addTag: (id: ObjectId, name: string) => void }) => {
  return <Badge onClick={() => addTag(id, name)}>{name}</Badge>;
};

const TagComponent = ({ activeTagName, id, delete: deleteTag }: TagProps) => {
  return (
    <Badge>
      {activeTagName}
      <button onClick={() => deleteTag(id)}>
        <X />
      </button>
    </Badge>
  );
};

const ComponentParent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <div className={`p-4 flex flex-col gap-4 bg-white rounded-2xl ${className}`}>{children}</div>;
};

const ReUsableDiv = ({ children, name = '' }: { children: React.ReactNode; name?: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold text-sm">{name}</span>
      {children}
    </div>
  );
};

export default Page;
