import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/Diaglog';

interface CustomDialogProps {
  children: React.ReactNode;
  triggerName: string;
  title: string | null;
  className: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CustomDialog = ({ children, triggerName, title = null, className = '', open, onOpenChange }: CustomDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{triggerName}</DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
