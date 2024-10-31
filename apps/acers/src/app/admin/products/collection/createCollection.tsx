'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Badge } from '../../../(client)/components/ui/Badge';
import { Input } from '../../../(client)/components/ui/Input';
import { CheckResponse } from '../../components/responseChecker';

interface CollectionInterface {
  name: string;
  collection: ObjectId[];
}

interface Tag {
  _id: ObjectId;
  tagName: string;
}

const CreateCollection = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CollectionInterface>();

  const addCollection = async (data: CollectionInterface) => {
    const res = await axios.post('/api/collection', data);
    if (!CheckResponse(res.status)) {
      return false;
    }
    return true;
  };

  const onSubmit: SubmitHandler<CollectionInterface> = (data) => {
    const successful = addCollection(data);
  };

  const getTags = async () => {
    try {
      const res = await axios.get('/api/tags');
      setTags(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className="max-w-[500px] w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ReUsableDiv name="Коллекц нэр">
          <Input {...register('name', { required: 'Нэр оруулна уу.' })} placeholder="Нэр" />
        </ReUsableDiv>
        {errors.name && <p>{errors.name.message}</p>}
        <TagSelector tags={tags} setValue={(val: ObjectId[]) => setValue('collection', val)} />
        <div className="mt-8 flex justify-around">
          <button className="text-white py-2 px-4 rounded-xl bg-green-600" type="submit">
            Submit
          </button>
          <button type="button" className="text-white bg-slate-600 py-2 px-4 rounded-xl">
            Шинээр Таг оруулах
          </button>
        </div>
      </form>
    </div>
  );
};

const TagSelector = ({ tags, setValue }: { tags: Tag[]; setValue: (val: ObjectId[]) => void }) => {
  const [searchName, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  setValue(selectedTags.map((tag) => tag._id));

  return (
    <div>
      <ReUsableDiv name={'Таг:'}>
        <div className="flex flex-wrap gap-3">
          {selectedTags.map((tag) => (
            <Badge
              key={`selectedTag_${tag._id.toString()}`}
              onClick={() => {
                setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
              }}
              variant={'outline'}
            >
              {tag.tagName}
            </Badge>
          ))}
        </div>
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <div className="flex flex-wrap gap-3">
          {tags
            .filter((tag) => tag.tagName.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()))
            .map((tag) => (
              <Badge
                key={`tag_${tag._id.toString()}`}
                onClick={() => {
                  if (!selectedTags.includes(tag)) {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
                variant={(selectedTags.includes(tag) && 'outline') || 'secondary'}
              >
                {tag.tagName}
              </Badge>
            ))}
        </div>
      </ReUsableDiv>
    </div>
  );
};

const ReUsableDiv = ({ children, name }: { children: React.ReactNode; name: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <span>{name}</span>
      {children}
    </div>
  );
};

export default CreateCollection;
