'use client';

import { DataTable } from '@/components/data-table';
import LayoutAdmin from '@/components/layout-admin';
import LoadingTable from '@/components/loading-table';
import Pagination from '@/components/pagination';
import TableFunction from '@/components/table-function';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { adminMataPelajaranGetAll } from '@/services/mata-pelajaran-service';
import useAppStore from '@/store/app-store';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { columns } from './columns';

export default function Page() {
  const { limit, start, setStart, search, sort } = useAppStore();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await adminMataPelajaranGetAll({
        page,
        limit,
        search,
        sort_by: sort?.type,
        order_by: sort?.column,
      }),
    queryKey: ['list-mata-pelajaran', page, limit, search, sort],
  });

  useEffect(() => {
    setStart((page - 1) * Number(limit) + 1);
  }, [page, limit, setStart]);

  useEffect(() => {
    setPage(1);
  }, [limit, search]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return (
    <LayoutAdmin>
      <div className="w-full h-full p-6 space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/">Dashboar</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Mata Pelajaran</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-blue-900">Mata Pelajaran</h3>
              <div className="flex gap-2">
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/mata-pelajaran/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="w-full space-y-4">
              <TableFunction />

              <div className="w-full overflow-auto rounded-lg border border-blue-200 bg-white relative">
                <DataTable data={data?.data.data.data ?? []} columns={columns} />
                {isLoading && <LoadingTable />}
              </div>

              {data && !isLoading && (
                <div className="flex flex-col xl:flex-row gap-4 justify-between items-center pt-4 border-t border-blue-100">
                  <div className="text-sm text-gray-600">
                    Menampilkan {start} sampai {data.data.data.to} dari {data.data.data.total} data
                  </div>
                  <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(
                      (data.data.data.total === 0 ? 1 : data.data.data.total) /
                        data.data.data.per_page
                    )}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutAdmin>
  );
}
