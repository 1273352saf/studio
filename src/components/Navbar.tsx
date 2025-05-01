
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
import { usePathname } from 'next/navigation'; // Import usePathname

interface NavbarProps {
  className?: string;
}

const navItems = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/archive', label: 'اخبار ارشيفيه', icon: Newspaper }, // Corrected path
  { href: '/about', label: 'من نحن', icon: Info }, // Corrected path
  { href: '/contact', label: 'اتصل بنا', icon: Mail }, // Corrected path
  { href: '/incidents', label: 'اخبار الحوادث', icon: AlertTriangle }, // Corrected path
  // Placeholder for "More" dropdown
];

const moreItems = [
    { href: '/politics', label: 'سياسة' },
    { href: '/economy', label: 'اقتصاد' },
    { href: '/sports', label: 'رياضة' },
    // Add more categories as needed
];

export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname(); // Get current path

  return (
    <nav
      className={cn(
        // Reverted padding to px-4 py-2
        'bg-primary dark:bg-gray-900 text-primary-foreground dark:text-gray-100 px-4 py-2 rounded-md shadow-md',
        className
      )}
      aria-label="Main navigation"
    >
      {/* Use flex container for right-to-left layout */}
      {/* Removed container mx-auto, changed justify-end to justify-start */}
      {/* Reverted spacing to space-x-4 */}
      <div className="flex justify-start items-center space-x-4 space-x-reverse">
        {/* Render main navigation items */}
        {navItems.map(({ href, label, icon: Icon }) => {
           const isActive = pathname === href; // Check if the current path matches the link href
           return (
             <Link
               key={href}
               href={href}
               className={cn(
                 // Reverted padding to px-3 py-1.5
                 'flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                 // Apply active state styling based on isActive
                 isActive ? 'bg-destructive text-destructive-foreground' : 'hover:bg-primary/80 dark:hover:bg-gray-700'
               )}
             >
                <Icon className="h-4 w-4 ml-1" /> {/* Keep reduced margin */}
                {label}
             </Link>
           );
        })}

        {/* More Dropdown Menu */}
        <DropdownMenu dir="rtl"> {/* Set direction for dropdown */}
            <DropdownMenuTrigger asChild>
                <Button
                   variant="ghost" // Make trigger look like other nav items
                   // Reverted padding to px-3 py-1.5
                   className={cn(
                      "flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-primary-foreground dark:text-gray-100 hover:bg-primary/80 dark:hover:bg-gray-700",
                       // Check if any 'moreItems' link is active
                      moreItems.some(item => pathname === item.href) && 'bg-destructive text-destructive-foreground'
                    )}
                >
                    <MoreHorizontal className="h-4 w-4 ml-1" /> {/* More icon */}
                    المزيد
                    <ChevronDown className="h-4 w-4 mr-1" /> {/* Dropdown arrow */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-popover text-popover-foreground"> {/* Style dropdown content */}
                {moreItems.map((item) => {
                  const isMoreActive = pathname === item.href;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                        <Link
                           href={item.href}
                           className={cn(
                              "flex justify-between items-center w-full cursor-pointer",
                              isMoreActive && "bg-accent text-accent-foreground" // Style active item in dropdown
                           )}
                        >
                            {item.label}
                        </Link>
                    </DropdownMenuItem>
                  )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
