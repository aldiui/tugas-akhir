"use client"

import { 
    Sidebar, 
    SidebarContent, 
    SidebarGroup, 
    SidebarGroupLabel, 
    SidebarGroupContent, 
    SidebarMenu, 
    SidebarMenuItem, 
    SidebarMenuButton, 
    SidebarHeader 
} from "@/components/ui/sidebar"
import { 
    Home, 
    Users, 
    Shield, 
    Briefcase, 
    BookOpen, 
    Globe, 
    MapPin, 
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const items = [
    {
        group: "Dashboard",
        items: [
            { title: "Dashboard", url: "/", icon: Home },
        ]
    },
    {
        group: "Data Master",
        items: [
            { title: "User", url: "/user", icon: Users },
            { title: "Role", url: "/role", icon: Shield },
            { title: "Sektor", url: "/sektor", icon: Briefcase },
            { title: "Jenis Pekerjaan", url: "/jenis-pekerjaan", icon: Briefcase },
            { title: "Negara", url: "/negara", icon: Globe },
            { title: "Lokasi", url: "/lokasi", icon: MapPin },
            { title: "Mata Pelajaran", url: "/mata-pelajaran", icon: BookOpen },
            // { title: "Kelas", url: "//kelas", icon: GraduationCap },
        ]
    },
    // {
    //     group: "Data CPMI",
    //     items: [
    //         { title: "CPMI", url: "/admin/cpmi", icon: UserCheck },   
    //         { title: "Absensi", url: "/admin/absensi", icon: CalendarCheck },   
    //         { title: "Piket", url: "/admin/piket", icon: Clock },   
    //         { title: "Izin", url: "/admin/izin", icon: FileText },   
    //         { title: "Notifikasi", url: "/admin/notifikasi", icon: Bell },   
    //     ]
    // },
]

export function AppSidebar() {
    const pathname = usePathname()
    
    return (
        <Sidebar data-sidebar="sidebar">
            <SidebarHeader data-sidebar="header" className="border-b">
                <Link 
                    href="/admin" 
                    className="flex items-center justify-center rounded-lg transition-colors"
                >
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
                        <SidebarGroupLabel 
                            data-sidebar="group-label" 
                            className="py-2 capitalize"
                        >
                            {group.group}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const isActive = pathname === item.url || 
                                        (item.url !== "/admin" && pathname?.startsWith(item.url))
                                    
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