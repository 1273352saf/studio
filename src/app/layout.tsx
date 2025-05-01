import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a clean sans-serif alternative
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar'; // Import Sidebar components
import AppSidebar from '@/components/AppSidebar'; // Import the new AppSidebar component
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] }) // Initialize Inter font

export const metadata: Metadata = {
  title: 'الكوله اليوم', // Update title
  description: 'موقع اخبارى تجريبي.', // Update description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl"> {/* Set lang to "ar" and dir to "rtl" */}
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider>
          <Sidebar side="left" variant="sidebar" collapsible="icon"> {/* Configure sidebar on the left */}
            <AppSidebar /> {/* Place the sidebar content component here */}
          </Sidebar>
          <SidebarInset> {/* Main content area */}
            {/* Add a trigger button for mobile/collapsible sidebar */}
            <div className="p-2 md:hidden"> {/* Only show on smaller screens */}
               <SidebarTrigger>
                 <PanelLeft />
               </SidebarTrigger>
             </div>
            {children}
            <Toaster /> {/* Add Toaster here */}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
