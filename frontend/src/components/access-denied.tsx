import LayoutAdmin from '@/components/layout-admin';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AccessDeniedProps {
  title?: string;
  message?: string;
  backUrl?: string;
  backLabel?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function AccessDenied({
  title = 'Akses Ditolak',
  message = 'Anda tidak memiliki akses untuk halaman ini.',
  backUrl = '/',
  backLabel = 'Kembali',
  breadcrumbs = [],
}: AccessDeniedProps) {
  return (
    <LayoutAdmin>
      <div className="w-full h-full p-6 space-y-4">
        {breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {item.href ? (
                      <Link href={item.href}>{item.label}</Link>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground mb-4">{message}</p>
              <Link href={backUrl}>
                <Button variant="outline">{backLabel}</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutAdmin>
  );
}
