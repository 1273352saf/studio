
'use client';

import Link from 'next/link';
import { Home, Newspaper, Info, Mail, AlertTriangle, MoreHorizontal, ChevronDown } from 'lucide-react'; // Import relevant icons
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import Dropdown components
import { Button } from './ui/button'; // Import Button for Dropdown trigger

interface NavbarProps {
  className?: string;
}

const navItems = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/archive', label: 'اخبار ارشيفيه', icon: Newspaper },
  { href: '/about', label: 'من نحن', icon: Info },
  { href: '/contact', label: 'اتصل بنا', icon: Mail },
  { href: '/incidents', label: 'اخبار الحوادث', icon: AlertTriangle },
  // Placeholder for "More" dropdown
];

const moreItems = [
    { href: '/politics', label: 'سياسة' },
    { href: '/economy', label: 'اقتصاد' },
    { href: '/sports', label: 'رياضة' },
    // Add more categories as needed
];

export default function Navbar({ className }: NavbarProps) {
  return (
    <nav
      className={cn(
        // Dark blue background, white text, padding
        // Reduced horizontal padding to px-2 and vertical padding to py-1
        'bg-primary dark:bg-gray-900 text-primary-foreground dark:text-gray-100 px-2 py-1 rounded-md shadow-md',
        className
      )}
      aria-label="Main navigation"
    >
      {/* Use flex container for right-to-left layout */}
      {/* Reduced spacing to space-x-2 */}
      <div className="container mx-auto flex justify-end items-center space-x-2 space-x-reverse">
        {/* Render main navigation items */}
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              // Reduced horizontal padding to px-2, kept vertical padding py-1
              'flex items-center px-2 py-1 rounded-md text-sm font-medium transition-colors',
              // Add active state styling if needed (e.g., based on current path)
              // Example active style: 'bg-destructive text-destructive-foreground'
              href === '/' ? 'bg-destructive text-destructive-foreground' : 'hover:bg-primary/80 dark:hover:bg-gray-700' // Highlight "الرئيسية"
            )}
          >
             <Icon className="h-4 w-4 ml-1" /> {/* Reduced margin to ml-1 in RTL */}
             {label}
          </Link>
        ))}

        {/* More Dropdown Menu */}
        <DropdownMenu dir="rtl"> {/* Set direction for dropdown */}
            <DropdownMenuTrigger asChild>
                <Button
                   variant="ghost" // Make trigger look like other nav items
                   // Reduced horizontal padding to px-2, kept vertical padding py-1
                   className="flex items-center px-2 py-1 rounded-md text-sm font-medium text-primary-foreground dark:text-gray-100 hover:bg-primary/80 dark:hover:bg-gray-700"
                >
                    <MoreHorizontal className="h-4 w-4 ml-1" /> {/* More icon */}
                    المزيد
                    <ChevronDown className="h-4 w-4 mr-1" /> {/* Dropdown arrow */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-popover text-popover-foreground"> {/* Style dropdown content */}
                {moreItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex justify-between items-center w-full cursor-pointer">
                            {item.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
