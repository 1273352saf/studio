import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar"; // Import SidebarProvider
// AppSidebar is now rendered within page.tsx
import { Toaster } from "@/components/ui/toaster"; // For toast notifications

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "الكوله اليوم", // Or your app's title
  description: "موقع اخبارى", // Or your app's description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Set language to Arabic and direction to RTL globally
    <html lang="ar" dir="rtl">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        {/* Wrap the content with SidebarProvider */}
        {/* Sidebar is removed from here and placed in page.tsx */}
        <SidebarProvider defaultOpen={true} collapsible="icon"> {/* Keep sidebar open by default, make it icon collapsible */}
          {children}
        </SidebarProvider>
         <Toaster /> {/* Add Toaster for notifications */}
      </body>
    </html>
  );
}
