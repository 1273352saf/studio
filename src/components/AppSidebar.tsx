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

interface AppSidebarProps {
  className?: string; // Accept className prop
}

export default function AppSidebar({ className }: AppSidebarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
   const { state, isMobile, toggleSidebar } = useSidebar(); // Get sidebar state and toggle function

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
           {/* Apply flex styles for centering icon when collapsed */}
           <SidebarGroupContent className={cn(
                'transition-all duration-300', // Smooth transition
                state === 'collapsed'
                  ? 'flex justify-center items-center h-10 opacity-0 pointer-events-none' // Icon centered, hidden when collapsed
                  : 'opacity-100' // Visible when expanded
              )}>
               {/* Calendar container ensures it takes width, only visible when expanded */}
               {/* Removed w-full from calendar to allow natural sizing */}
               <div className={cn(state === 'expanded' ? 'block' : 'hidden')}>
                 <ShadCalendar
                   mode="single"
                   selected={date}
                   onSelect={setDate}
                   // Removed p-0 to allow default padding, potentially fixing button issue
                   className="rounded-md border"
                   dir="rtl" // Explicitly set direction for calendar
                 />
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
                  aria-label="Show Calendar" // Accessibility label
                >
                  <Calendar className="h-5 w-5" />
               </Button>
           </SidebarGroupContent>
         </SidebarGroup>


         {/* Currency Rates Section */}
         <SidebarGroup className="mt-4">
           <SidebarGroupLabel>أسعار العملات</SidebarGroupLabel>
            <SidebarGroupContent className={cn(
               'transition-opacity duration-300',
               state === 'collapsed'
                  ? 'flex justify-center items-center h-10 opacity-0 pointer-events-none' // Icon centered, hidden when collapsed
                  : 'opacity-100' // Visible when expanded
            )}>
              {/* Currency rates content, only visible when expanded */}
               <div className={cn(state === 'expanded' ? 'block' : 'hidden')}>
                 <CurrencyRates />
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
                  aria-label="Show Currency Rates" // Accessibility label
                >
                  <CircleDollarSign className="h-5 w-5" />
                </Button>
            </SidebarGroupContent>
         </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 text-center text-xs text-muted-foreground">
         {/* Footer content */}
          {state === 'expanded' && <span>&copy; {new Date().getFullYear()} الكوله اليوم</span>}
      </SidebarFooter>
    </Sidebar>
  );
}
