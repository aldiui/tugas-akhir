'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { adminAuthLogout } from '@/services/auth-service';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  Bell,
  BookOpen,
  Briefcase,
  CalendarCheck,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  Home,
  LogOut,
  MapPin,
  Shield,
  UserCheck,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from './ui/button';

const items = [
  {
    group: 'Dashboard',
    items: [{ title: 'Dashboard', url: '/', icon: Home }],
  },
  {
    group: 'Data Master',
    items: [
      { title: 'User', url: '/user', icon: Users },
      { title: 'Role', url: '/role', icon: Shield },
      { title: 'Sektor', url: '/sektor', icon: Briefcase },
      { title: 'Jenis Pekerjaan', url: '/jenis-pekerjaan', icon: Briefcase },
      { title: 'Negara', url: '/negara', icon: Globe },
      { title: 'Lokasi', url: '/lokasi', icon: MapPin },
      { title: 'Mata Pelajaran', url: '/mata-pelajaran', icon: BookOpen },
      { title: 'Kelas', url: '/kelas', icon: GraduationCap },
    ],
  },
  {
    group: 'Data CPMI',
    items: [
      { title: 'CPMI', url: '/cpmi', icon: UserCheck },
      { title: 'Absensi', url: '/absensi', icon: CalendarCheck },
      { title: 'Piket', url: '/piket', icon: Clock },
      { title: 'Izin', url: '/izin', icon: FileText },
      { title: 'Notifikasi', url: '/notifikasi', icon: Bell },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => adminAuthLogout(),
    onSuccess: (data) => {
      if (data?.status === 200) {
        document.cookie = 'token=; Path=/; Max-Age=0';
        toast.success(data?.data.message || 'Logout berhasil');
        router.push('/login');
      } else {
        toast.error(data?.data.message || 'Gagal logout');
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message || 'Terjadi kesalahan');
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
      document.cookie = 'token=; Path=/; Max-Age=0';
      router.push('/login');
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <Sidebar data-sidebar="sidebar">
      <SidebarHeader data-sidebar="header" className="border-b">
        <Link href="/" className="flex items-center justify-center rounded-lg transition-colors">
          <Image
            src="/logo.png"
            alt="Logo Bahana Mobile"
            width={120}
            height={100}
            className="object-contain"
            priority
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="py-2">
        {items.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel data-sidebar="group-label" className="py-2 capitalize">
              {group.group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.url || (item.url !== '/' && pathname?.startsWith(item.url));

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        data-sidebar="menu-button"
                        data-active={isActive}
                      >
                        <Link href={item.url} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          onClick={handleLogout}
          disabled={mutation.isPending}
        >
          <LogOut className="h-4 w-4" />
          <span>{mutation.isPending ? 'Keluar...' : 'Keluar'}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
