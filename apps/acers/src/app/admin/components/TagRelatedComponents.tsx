import axios from 'axios';
import { useState } from 'react';
import { Button } from '../../(client)/components/ui/Button';
import { Input } from '../../(client)/components/ui/Input';
import { CustomDialog } from './customizeableDialog';
import { CheckResponse } from './responseChecker';

export const CreateTag = ({ resetTags }: { resetTags: () => void }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    // Reset states when dialog is closed
    setName('');
    setMessage(null);
    setDialogOpen(false);
  };

  const SubmitTag = async () => {
    try {
      const res = await axios.post('/api/tags', { name });
      const status = CheckResponse(res.status);

      if (status.success) {
        setMessage('Tag created successfully!');
        handleDialogClose();
        resetTags();
      } else {
        setMessage(`Error: ${status.message}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <CustomDialog
        triggerName="Шинээр таг үүсгэх"
        title={null}
        className="bg-white"
        open={dialogOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleDialogClose(); // Reset states when closing
          setDialogOpen(isOpen);
        }}
      >
        <div className="flex flex-col gap-5 p-5">
          <span className="text-lg font-semibold">Таг:</span>
          <Input
            placeholder="Тагын нэрийг оруулна уу"
            value={name} // Bind the input value to the state
            onChange={(e) => setName(e.target.value)}
            className="-mt-4"
          />
          <Button className="bg-green-600 text-white" onClick={SubmitTag}>
            Оруулах
          </Button>
          {message && <span className="text-sm mt-2 text-center">{message}</span>}
        </div>
      </CustomDialog>
    </div>
  );
};
