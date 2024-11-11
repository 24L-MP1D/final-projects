'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import React from 'react';
interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

export default function ConfirmModal({ children, onConfirm }: ConfirmModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Та үнэхээр итгэлтэй байна уу?</AlertDialogTitle>
          <AlertDialogDescription>Энэ үйлдлийг буцаах боломжгүй. Энэ үйлдэл нь манай серверээс таны өгөгдлийг бүрмөсөн устгана.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Цуцлах</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Үргэлжлүүлэх</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
