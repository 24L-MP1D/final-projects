import { notifications } from '@/app/components/layout/header';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react'; // Tailwind CSS icon ашиглах эсвэл дурын icon ашиглаж болно
import Image from 'next/image';

type NotificationProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  notifications: notifications;
  loadNotif: () => void;
};

export const Notification = ({ message, loadNotif, notifications, type = 'info', onClose }: NotificationProps) => {
  const deleteNotif = async () => {
    await fetch(`/api/notifications/${notifications._id}`, {
      method: 'DELETE',
    });
    onClose();
    loadNotif();
  };
  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between p-4 mb-4 w-full shadow-lg rounded-lg  max-w-sm mx-auto`}
    >
      <div className="p-2 rounded-full border-2">
        <Image className="rounded-full object-cover w-10 h-10" src={notifications.productInfo[0].frontImage} alt="зураг" width={50} height={50} />
      </div>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={deleteNotif} className="ml-4">
        <XIcon className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Demo component to show the Notification
