'use client';

import { Calendar, CircleDollarSign, Home } from 'lucide-react';
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
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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


export default function AppSidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
   const { state, isMobile, toggleSidebar } = useSidebar(); // Get sidebar state and toggle function

  return (
    // Use Sidebar component with appropriate props
     <Sidebar side="left" variant="sidebar" collapsible="icon">
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

      <SidebarContent className="p-2"> {/* Adjust padding */}
         {/* Navigation Menu */}
         <SidebarMenu>
           <SidebarMenuItem>
             <SidebarMenuButton href="#" tooltip="الرئيسية"> {/* Add tooltip */}
               <Home />
               <span>الرئيسية</span>
             </SidebarMenuButton>
           </SidebarMenuItem>
           {/* Add other menu items here */}
         </SidebarMenu>

         {/* Calendar Section */}
         <SidebarGroup className="mt-4">
           <SidebarGroupLabel>التقويم</SidebarGroupLabel>
           <SidebarGroupContent className={cn(state === 'collapsed' && 'flex justify-center items-center h-full')}>
             {/* Show only icon when collapsed */}
             {state === 'collapsed' ? (
               <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <Calendar className="h-5 w-5" />
                </Button>
             ) : (
               <ShadCalendar
                 mode="single"
                 selected={date}
                 onSelect={setDate}
                 className="rounded-md border w-full" // Ensure calendar fits
                 dir="rtl" // Explicitly set direction for calendar
               />
             )}
           </SidebarGroupContent>
         </SidebarGroup>

         {/* Currency Rates Section */}
         <SidebarGroup className="mt-4">
           <SidebarGroupLabel>أسعار العملات</SidebarGroupLabel>
            <SidebarGroupContent className={cn(state === 'collapsed' && 'flex justify-center items-center h-full')}>
              {/* Show only icon when collapsed */}
              {state === 'collapsed' ? (
                 <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <CircleDollarSign className="h-5 w-5" />
                  </Button>
              ) : (
                <CurrencyRates />
              )}
            </SidebarGroupContent>
         </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 text-center text-xs text-muted-foreground">
         {/* Footer content */}
          {state === 'expanded' && <span>&copy; 2024 الكوله اليوم</span>}
      </SidebarFooter>
    </Sidebar>
  );
}
