'use client';

import { TableDelete } from '@/components/table-delete';
import { TableSortableHeader } from '@/components/table-sortable-header';
import { Button } from '@/components/ui/button';
import { adminKelasDelete } from '@/services/kelas-service';
import useAppStore from '@/store/app-store';
import { Kelas } from '@/types/kelas';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Kelas>[] = [
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
    accessorKey: 'nama',
    header: ({ column }) => {
      return <TableSortableHeader column={column} columnName="nama" label="Nama" />;
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('nama')}</div>,
  },
  {
    accessorKey: 'pengajar',
    header: ({ column }) => (
      <TableSortableHeader column={column} columnName="pengajar" label="Pengajar" />
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue('pengajar')}</div>,
  },
  {
    accessorKey: 'lokasi',
    header: ({ column }) => {
      return <TableSortableHeader column={column} columnName="lokasi" label="Lokasi" />;
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('lokasi')}</div>,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <TableSortableHeader column={column} columnName="created_at" label="Dibuat Pada" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      return (
        <div className="font-medium">
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
      const kelas = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
            asChild
          >
            <Link href={`/kelas/${kelas.id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <TableDelete
            id={kelas.id}
            itemName={kelas.nama}
            queryKey={['list-kelas']}
            deleteFn={adminKelasDelete}
          />
        </div>
      );
    },
    size: 60,
    maxSize: 60,
  },
];
