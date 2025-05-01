import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a clean sans-serif alternative
import './globals.css';
import { Toaster } from "@/components/ui/toaster" // Import Toaster

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
      <body className={`${inter.className} antialiased`}> {/* Use Inter font class */}
        {children}
        <Toaster /> {/* Add Toaster here */}
      </body>
    </html>
  );
}
