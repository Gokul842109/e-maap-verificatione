import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmVariant?: 'primary' | 'danger';
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  confirmVariant = 'primary'
}: Props) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const footer = (
    <>
      <button onClick={onClose} className="btn-ghost">
        Cancel
      </button>
      <button 
        onClick={handleConfirm} 
        className={confirmVariant === 'danger' ? 'btn-danger' : 'btn-primary'}
      >
        {confirmText}
      </button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer} size="sm">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full flex-shrink-0 ${confirmVariant === 'danger' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
          <AlertTriangle size={24} />
        </div>
        <p className="text-gray-600 mt-1">{message}</p>
      </div>
    </Modal>
  );
}
