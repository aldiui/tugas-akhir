'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Shield, Briefcase, Globe, MapPin, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Page() {
    const dashboardCards = [
        {
            title: "User",
            description: "Total pengguna terdaftar",
            total: 1234,
            icon: <Users className="h-8 w-8 text-blue-500" />,
            url: "/admin/user"
        },
        {
            title: "Role",
            description: "Total role yang tersedia",
            total: 8,
            icon: <Shield className="h-8 w-8 text-purple-500" />,
            url: "/admin/role"
        },
        {
            title: "Sektor",
            description: "Total sektor pekerjaan",
            total: 15,
            icon: <Briefcase className="h-8 w-8 text-green-500" />,
            url: "/admin/sektor"
        },
        {
            title: "Jenis Pekerjaan",
            description: "Total jenis pekerjaan",
            total: 42,
            icon: <Briefcase className="h-8 w-8 text-orange-500" />,
            url: "/admin/jenis-pekerjaan"
        },
        {
            title: "Negara",
            description: "Total negara tujuan",
            total: 12,
            icon: <Globe className="h-8 w-8 text-cyan-500" />,
            url: "/admin/negara"
        },
        {
            title: "Lokasi",
            description: "Total lokasi tersedia",
            total: 28,
            icon: <MapPin className="h-8 w-8 text-red-500" />,
            url: "/admin/lokasi"
        },
        {
            title: "Mata Pelajaran",
            description: "Total mata pelajaran",
            total: 18,
            icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
            url: "/admin/mata-pelajaran"
        },
    ]

    return (
        <div className="w-full h-full p-6 space-y-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {dashboardCards.map((card, index) => (
                    <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="space-y-1 flex-1">
                                <CardTitle className="text-base sm:text-lg font-semibold">
                                    {card.title}
                                </CardTitle>
                                <CardDescription className="text-xs line-clamp-2">
                                    {card.description}
                                </CardDescription>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                                {card.icon}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 sm:space-y-4">
                            <div className="text-2xl sm:text-3xl font-bold">{card.total}</div>
                            <Link href={card.url} className="block">
                                <Button variant="outline" size="sm" className="w-full group text-xs sm:text-sm">
                                    Lihat Detail
                                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}