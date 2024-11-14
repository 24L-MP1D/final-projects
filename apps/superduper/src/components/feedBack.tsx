import { zodResolver } from '@hookform/resolvers/zod';
import * as Ably from 'ably';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/Input';
const client = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLYKEY });

type FeedBackInput = {
  setFeedBackInput: (value: boolean) => void;

  loadProduct: () => void;

  userId: string;

  productId: string;
};
export const FeedBackInput = ({ setFeedBackInput, userId, loadProduct, productId }: FeedBackInput) => {
  const messageSchema = z.object({
    feedback: z.string().min(5, { message: 'хамгийн багадаа 5 үсэг байх ёстой' }).max(100, { message: 'дээд тал нь 100 үсэг' }),
  });

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
          userId: userId,
          message: values.feedback,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const channel = client.channels.get('notifications');

      channel.publish('new-notifications', { status: 'Deny', isSeen: false, message: values.feedback, userId });

      loadProduct();
      toast('амжилттай илгээсэн');
      setFeedBackInput(false);
    } catch (err) {
      throw new Error('update hiihed aldaa garlaa');
    }
  };

  return (
    <form className="bg-white fixed p-4 rounded-lg translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] max-w-[400px] w-full" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="sm:max-w-md flex flex-col gap-3">
          <div>
            <div className="flex justify-between">
              <div>Санал хүсэлтийн мессеж</div>
              <X className="hover:cursor-pointer" onClick={() => setFeedBackInput(false)} />
            </div>
          </div>
          <div>
            <Input id="feedback" {...register('feedback', { required: true })} placeholder="санал хүсэлтийг илгээнэ үү" />
            {touchedFields.feedback && errors.feedback && <p className="text-red-400">{errors.feedback.message}</p>}
          </div>
          <Button type="submit">Илгээх</Button>
        </div>
      </div>
    </form>
  );
};
