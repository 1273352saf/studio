'use client';

import { Calendar, CircleDollarSign, Home, CloudSun, Newspaper, Globe, MessageSquare } from 'lucide-react'; // Added MessageSquare for WhatsApp
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from '@/components/ui/sidebar';
import { Calendar as ShadCalendar } from '@/components/ui/calendar'; // Alias import
import { useState, useEffect } from 'react';
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
import { cn } from '@/lib/utils';
import Link from 'next/link'; // Import Link

// Placeholder for Currency Rates
const CurrencyRates = () => {
  // Placeholder data - replace with actual API call
  const rates = {
    USD: 30.85,
    EUR: 33.20,
    SAR: 8.22,
  };

  return (
    <div className="space-y-2 text-xs">
      {Object.entries(rates).map(([currency, rate]) => (
        <div key={currency} className="flex justify-between items-center">
          <span>{currency}</span>
          <span className="font-mono">{rate.toFixed(2)}</span>
        </div>
      ))}
      <p className="text-muted-foreground text-[10px] pt-1">أسعار وهمية للعرض</p>
    </div>
  );
};

// Placeholder for Weather
const WeatherInfo = () => {
  return (
    <div className="space-y-2 text-xs">
      <div className="flex justify-between items-center">
        <span>القاهرة</span>
        <span className="font-mono">32°C مشمس</span>
      </div>
      <p className="text-muted-foreground text-[10px] pt-1">بيانات الطقس للعرض</p>
    </div>
  );
};

// Placeholder for Sports News
const SportsNews = () => {
  return (
    <div className="space-y-2 text-xs">
      <p className="font-medium">الأهلي يفوز بالدوري</p>
      <p className="text-muted-foreground">ريال مدريد يتعادل في مباراة مثيرة</p>
      <p className="text-muted-foreground text-[10px] pt-1">أخبار رياضية للعرض</p>
    </div>
  );
};

// Placeholder for Breaking News (Arab/World)
const BreakingNews = () => {
  return (
    <div className="space-y-2 text-xs">
       <p className="font-medium text-red-600">عاجل: حدث هام في الشرق الأوسط</p>
      <p className="text-muted-foreground">تطورات جديدة في الأزمة العالمية</p>
      <p className="text-muted-foreground text-[10px] pt-1">أخبار عاجلة للعرض</p>
    </div>
  );
};

// WhatsApp Chat Component
const WhatsAppChat = () => {
  // Replace with your actual WhatsApp number including country code (without + or spaces)
  const whatsappNumber = "201234567890"; // Example: Egyptian number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="text-xs text-center">
      <p className="mb-2 text-muted-foreground">تواصل معنا مباشرة عبر واتساب!</p>
      <Button variant="outline" size="sm" asChild className="w-full bg-green-600 hover:bg-green-700 text-white border-green-700 hover:border-green-800">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
           <MessageSquare className="h-4 w-4 mr-2" /> دردشة واتساب
        </a>
      </Button>
       <p className="text-muted-foreground text-[10px] pt-2">انقر للبدء</p>
    </div>
  );
}


interface AppSidebarProps {
  className?: string; // Accept className prop
}

export default function AppSidebar({ className }: AppSidebarProps) {
  // Initialize date state to undefined to avoid server/client mismatch
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { state, isMobile, toggleSidebar } = useSidebar(); // Get sidebar state and toggle function

  // Set the date only on the client side after mounting
  useEffect(() => {
    setDate(new Date());
  }, []);

  // Helper function to render sidebar group content with collapse handling
  const renderSidebarGroup = (
     icon: React.ReactNode,
     content: React.ReactNode,
     label: string,
     ariaLabel: string
   ) => (
     <SidebarGroupContent className={cn(
       'transition-opacity duration-300 relative', // Added relative positioning
       state === 'collapsed'
         ? 'flex justify-center items-center h-10 opacity-0 pointer-events-none' // Icon centered, hidden when collapsed
         : 'opacity-100' // Visible when expanded
     )}>
       {/* Content, only visible when expanded */}
       <div className={cn(state === 'expanded' ? 'block' : 'hidden')}>
         {content}
       </div>
       {/* Button with icon, only visible when collapsed */}
       <Button
         variant="ghost"
         size="icon"
         onClick={toggleSidebar}
         className={cn(
           'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300', // Center icon
           state === 'collapsed' ? 'opacity-100' : 'opacity-0 pointer-events-none' // Show only when collapsed
         )}
         aria-label={ariaLabel} // Accessibility label
       >
         {icon}
       </Button>
     </SidebarGroupContent>
   );


  return (
    // Use Sidebar component with appropriate props and apply className
     <Sidebar side="right" variant="sidebar" collapsible="icon" className={cn("border rounded-lg", className)}> {/* Changed side to right, apply border and className */}
       <SidebarHeader className="items-center">
         {/* Show trigger only when collapsed or on mobile */}
         {(state === 'collapsed' || isMobile) && (
           <SidebarTrigger className="md:hidden" />
         )}
         {/* Hide title when collapsed */}
         <h2
           className={cn(
             'text-lg font-semibold text-primary truncate transition-opacity duration-200',
             state === 'collapsed' && 'opacity-0'
           )}
         >
           القائمة
         </h2>
       </SidebarHeader>

      <SidebarContent className="p-2 space-y-4"> {/* Add space-y for vertical spacing */}
         {/* Navigation Menu */}
         <SidebarMenu>
           <SidebarMenuItem>
             {/* Use Link component directly for client-side navigation */}
              <Link href="/" legacyBehavior passHref>
                <SidebarMenuButton tooltip="الرئيسية" isActive={false}> {/* Set isActive based on route if needed */}
                    <Home />
                    <span>الرئيسية</span>
                </SidebarMenuButton>
              </Link>
           </SidebarMenuItem>
           {/* Add other menu items here using Link */}
         </SidebarMenu>

          {/* WhatsApp Chat Section */}
         <SidebarGroup>
           <SidebarGroupLabel>تواصل معنا</SidebarGroupLabel>
           {renderSidebarGroup(
              <MessageSquare className="h-5 w-5 text-green-600" />, // WhatsApp Icon
              <WhatsAppChat />,
              'دردشة واتساب',
              'فتح دردشة واتساب'
           )}
         </SidebarGroup>

         {/* Calendar Section */}
         <SidebarGroup>
           <SidebarGroupLabel>التقويم</SidebarGroupLabel>
            {renderSidebarGroup(
              <Calendar className="h-5 w-5" />,
              // Only render Calendar if date is set (client-side) to prevent hydration mismatch
              date ? (
                <ShadCalendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  dir="rtl" // Explicitly set direction for calendar
                  // Customize appearance for sidebar: reduce padding, make cells smaller
                  className="rounded-md border p-1 w-full" // Ensure it takes container width, smaller overall padding
                  classNames={{
                    caption_label: "text-xs", // Smaller caption label
                    head_cell: "text-muted-foreground rounded-md w-7 font-normal text-[0.7rem]", // Smaller head cells
                    cell: "h-7 w-7 text-center text-xs p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", // Smaller day cells
                    day: cn(buttonVariants({ variant: "ghost" }), "h-7 w-7 p-0 font-normal aria-selected:opacity-100 text-xs"), // Smaller day button
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "text-muted-foreground opacity-50",
                    nav_button: cn(buttonVariants({ variant: "outline" }), "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100"), // Smaller nav buttons
                    nav_button_previous: "absolute right-1", // Adjusted position for RTL - Changed from left-1
                    nav_button_next: "absolute left-1", // Adjusted position for RTL - Changed from right-1
                  }}
                />
               ) : (
                 // You might show a simple loading state or nothing while date is undefined
                 <div className="rounded-md border p-1 w-full h-[200px] flex items-center justify-center text-muted-foreground text-xs">
                   Loading Calendar...
                 </div>
               ),
              'التقويم',
              'إظهار التقويم'
            )}
         </SidebarGroup>

         {/* Currency Rates Section */}
         <SidebarGroup>
           <SidebarGroupLabel>أسعار العملات</SidebarGroupLabel>
            {renderSidebarGroup(
               <CircleDollarSign className="h-5 w-5" />,
               <CurrencyRates />,
               'أسعار العملات',
               'إظهار أسعار العملات'
            )}
         </SidebarGroup>

          {/* Weather Section */}
         <SidebarGroup>
           <SidebarGroupLabel>حالة الطقس</SidebarGroupLabel>
           {renderSidebarGroup(
             <CloudSun className="h-5 w-5" />,
             <WeatherInfo />,
             'حالة الطقس',
             'إظهار حالة الطقس'
           )}
         </SidebarGroup>

         {/* Sports News Section */}
         <SidebarGroup>
           <SidebarGroupLabel>أخبار رياضية</SidebarGroupLabel>
           {renderSidebarGroup(
             <Newspaper className="h-5 w-5" />, // Using Newspaper icon for sports
             <SportsNews />,
             'أخبار رياضية',
             'إظهار الأخبار الرياضية'
           )}
         </SidebarGroup>

         {/* Breaking News (Arab/World) Section */}
         <SidebarGroup>
           <SidebarGroupLabel>أخبار عاجلة</SidebarGroupLabel>
            {renderSidebarGroup(
             <Globe className="h-5 w-5" />, // Using Globe icon for world news
             <BreakingNews />,
             'أخبار عاجلة',
             'إظهار الأخبار العاجلة'
           )}
         </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="p-2 text-center text-xs text-muted-foreground">
         {/* Footer content */}
          {state === 'expanded' && <span>&copy; {new Date().getFullYear()} الكوله اليوم</span>}
      </SidebarFooter>
    </Sidebar>
  );
}
