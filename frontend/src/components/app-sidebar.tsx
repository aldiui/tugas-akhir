"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader } from "@/components/ui/sidebar"
import { Home, Users, Shield, Briefcase, GraduationCap, BookOpen, Globe, Bell, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const items = [
    {
        group: "Dashboard",
        items: [
            { title: "Dashboard", url: "/admin", icon: Home },
        ]
    },
    {
        group: "Manajemen Pengguna",
        items: [
            { title: "User", url: "/admin/user", icon: Users },
            { title: "Role", url: "/admin/role", icon: Shield },
        ]
    },
    {
        group: "Master Data",
        items: [
            { title: "Sektor", url: "/admin/sektor", icon: Briefcase },
            { title: "Jenis Pekerjaan", url: "/admin/jenis-pekerjaan", icon: Briefcase },
            { title: "Negara", url: "/admin/negara", icon: Globe },
            { title: "Lokasi", url: "/admin/lokasi", icon: MapPin },
        ]
    },
    {
        group: "Pengajar",
        items: [
            { title: "Kelas", url: "/admin/kelas", icon: GraduationCap },
            { title: "Mata Pelajaran", url: "/admin/mata-pelajaran", icon: BookOpen },
        ]
    },
    {
        group: "Lainnya",
        items: [
            { title: "Notifikasi", url: "/admin/notifikasi", icon: Bell },
        ]
    },
]

export function AppSidebar() {
    const pathname = usePathname()
    
    return (
        <Sidebar>
            <SidebarHeader className="border-b">
                <Link href="/admin" className="flex items-center justify-center bg-blue-600 rounded-md p-2">
                    <Image 
                        src="/logo.png" 
                        alt="Logo" 
                        width={150} 
                        height={50}
                        className="object-contain"
                        priority
                    />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                {items.map((group) => (
                    <SidebarGroup key={group.group}>
                        <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const isActive = pathname === item.url || 
                                    (item.url !== "/admin" && pathname?.startsWith(item.url))
                                    
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild isActive={isActive}>
                                                <Link href={item.url}>
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}