'use client';

import { TableDelete } from '@/components/table-delete';
import { TableSortableHeader } from '@/components/table-sortable-header';
import { Button } from '@/components/ui/button';
import { adminNegaraDelete } from '@/services/negara-service';
import useAppStore from '@/store/app-store';
import { Negara } from '@/types/negara';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Negara>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <TableSortableHeader column={column} columnName="id" label="No" />,
    cell: function Cell({ row }) {
      const { start } = useAppStore();
      return <div className="font-medium">{start + row.index}</div>;
    },
    size: 60,
    maxSize: 60,
  },
  {
    accessorKey: 'kode',
    header: ({ column }) => {
      return <TableSortableHeader column={column} columnName="kode" label="Kode" />;
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('kode')}</div>,
  },
  {
    accessorKey: 'nama',
    header: ({ column }) => {
      return <TableSortableHeader column={column} columnName="nama" label="Nama" />;
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('nama')}</div>,
  },
  {
    accessorKey: 'mata_uang',
    header: ({ column }) => {
      return <TableSortableHeader column={column} columnName="mata_uang" label="Mata Uang" />;
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('mata_uang')}</div>,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <TableSortableHeader column={column} columnName="created_at" label="Dibuat Pada" />
    ),
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
      const negara = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
            asChild
          >
            <Link href={`/admin/negara/${negara.id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <TableDelete
            id={negara.id}
            itemName={negara.nama}
            queryKey={['list-negara']}
            deleteFn={adminNegaraDelete}
          />
        </div>
      );
    },
    size: 60,
    maxSize: 60,
  },
];
