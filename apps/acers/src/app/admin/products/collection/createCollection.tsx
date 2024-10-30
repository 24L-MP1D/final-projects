import { ObjectId } from 'mongodb';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../../(client)/components/ui/Input';
import { useEffect } from 'react';

interface collectionInterface {
  name: string;
  collection: [ObjectId];
}

const CreateCollection = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<collectionInterface>();

  const onSubmit: SubmitHandler<collectionInterface> = (data) => {
    console.log(data);
  };

  useEffect(()=>, [])
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('name', { required: 'Нэр оруулна уу.' })} placeholder="Нэр" />
      </form>
    </div>
  );
};

export default CreateCollection;
