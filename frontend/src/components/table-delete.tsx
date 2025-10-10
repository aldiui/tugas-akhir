'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Trash2 } from 'lucide-react';
import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';

interface TableDeleteProps {
  id: string;
  itemName: string;
  queryKey: string[];
  deleteFn: (id: string) => Promise<{ status: number; data: { message: string } }>;
  onSuccess?: () => void;
}
export function TableDelete({ id, itemName, queryKey, deleteFn, onSuccess }: TableDeleteProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteFn(id),
    onSuccess: (data: { status: number; data: { message: string } }) => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });

      if (data?.status === 200) {
        toast.success(data?.data.message || 'Data berhasil dihapus');
        onSuccess?.();
      } else {
        toast.error(data?.data.message || 'Gagal menghapus data');
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message || 'Terjadi kesalahan');
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  return (
    <Fragment>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600 text-center">
              Konfirmasi Penghapusan
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <DialogDescription className="text-center text-gray-700">
              Apakah Anda yakin ingin menghapus <span className="font-semibold">{itemName}</span>?
            </DialogDescription>
            <DialogDescription className="text-center text-gray-500 text-sm mt-2">
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-center">
            <Button
              variant="destructive"
              onClick={() => mutation.mutate(id)}
              disabled={mutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {mutation.isPending ? 'Menghapus...' : 'Hapus'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={mutation.isPending}
              className="hover:bg-gray-100"
            >
              Batal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
