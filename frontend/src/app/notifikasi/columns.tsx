'use client';

import { TableDelete } from '@/components/table-delete';
import { TableSortableHeader } from '@/components/table-sortable-header';
import { Button } from '@/components/ui/button';
import { adminNotifikasiDelete } from '@/services/notifikasi-service';
import useAppStore from '@/store/app-store';
import { Notifikasi } from '@/types/notifikasi';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Notifikasi>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <TableSortableHeader column={column} columnName="id" label="No" />;
    },
    cell: function Cell({ row }) {
      const { start } = useAppStore();
      return <div className="font-medium">{start + row.index}</div>;
    },
    size: 60,
    maxSize: 60,
  },
  {
    accessorKey: 'judul',
    header: ({ column }) => {
      return <TableSortableHeader column={column} columnName="judul" label="Judul" />;
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('judul')}</div>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <TableSortableHeader column={column} columnName="status" label="Status" />;
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('status')}</div>,
  },
  {
    accessorKey: 'target',
    header: ({ column }) => {
      return <TableSortableHeader column={column} columnName="target" label="Target" />;
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('target')}</div>,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return <TableSortableHeader column={column} columnName="created_at" label="Dibuat Pada" />;
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      return (
        <div>
          {date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => {
      const notifikasi = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
            asChild
          >
            <Link href={`/admin/notifikasi/${notifikasi.id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <TableDelete
            id={notifikasi.id}
            itemName={notifikasi.judul}
            queryKey={['list-notifikasi']}
            deleteFn={adminNotifikasiDelete}
          />
        </div>
      );
    },
    size: 60,
    maxSize: 60,
  },
];
