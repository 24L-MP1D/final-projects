import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/Input';
type FeedBackInput = {
  setFeedBackInput: (value: boolean) => void;

  loadProduct: () => void;

  productId: string;
};
export const FeedBackInput = ({ setFeedBackInput, loadProduct, productId }: FeedBackInput) => {
  const messageSchema = z.object({
    feedback: z.string().min(5, { message: 'at least must be 5 letters' }).max(100, { message: 'max letters 100' }),
  });
  const mocId = '6718b9dc39bfecd2dfd94fd1';
  type messageSchemaType = z.infer<typeof messageSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm<messageSchemaType>({
    resolver: zodResolver(messageSchema),
  });
  const onSubmit = async (values: messageSchemaType) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: 'Deny',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await fetch(`/api/users/${mocId}`, {
        method: 'PUT',
        body: JSON.stringify({ message: values.feedback }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      loadProduct();
      toast('succesfully sent');
      setFeedBackInput(false);
    } catch (err) {
      throw new Error('update hiihed aldaa garlaa');
    }
  };

  return (
    <form className="bg-white absolute p-4 rounded-lg translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] max-w-[400px] w-full" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="sm:max-w-md flex flex-col gap-3">
          <div>
            <div className="flex justify-between">
              <div>Feedback Message</div>
              <X className="hover:cursor-pointer" onClick={() => setFeedBackInput(false)} />
            </div>
          </div>
          <div>
            <Input id="feedback" {...register('feedback', { required: true })} placeholder="send a feedback" />
            {touchedFields.feedback && errors.feedback && <p className="text-red-400">{errors.feedback.message}</p>}
          </div>
          <Button type="submit">Send</Button>
        </div>
      </div>
    </form>
  );
};
