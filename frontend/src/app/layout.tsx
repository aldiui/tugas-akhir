import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import Providers from "./provider";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bahana Mobile",
  icons: {
      icon: 'favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="top-right" reverseOrder={false} />
        <Providers>
            <SidebarProvider>
            <AppSidebar />
                <main className="w-full">
                    <div className="sticky top-0 z-1 p-4">
                        <SidebarTrigger className="hover:bg-blue-50" />
                    </div>
                    <div className="w-full">{children}</div>
                </main>
            </SidebarProvider>
      </Providers>
    </body>
  </html>
);
}
