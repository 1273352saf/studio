'use client';

import { SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarSeparator } from '@/components/ui/sidebar';
import { Calendar } from '@/components/ui/calendar';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Euro, PoundSterling } from 'lucide-react'; // Example icons

export default function AppSidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true after mounting to avoid hydration mismatch with Calendar
    setIsClient(true);
  }, []);

  // Dummy currency data - replace with actual data fetching
  const currencyRates = [
    { currency: 'USD', rate: '30.85', icon: DollarSign },
    { currency: 'EUR', rate: '33.50', icon: Euro },
    { currency: 'GBP', rate: '39.20', icon: PoundSterling },
  ];

  return (
    <>
      <SidebarHeader className="items-center">
         {/* Optional Header Content, e.g., Logo */}
         <span className="text-lg font-semibold text-primary">التقويم والعملات</span>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>التقويم</SidebarGroupLabel>
          {isClient ? ( // Render Calendar only on the client
             <div className="flex justify-center px-2">
               <Calendar
                 mode="single"
                 selected={date}
                 onSelect={setDate}
                 className="rounded-md border w-auto inline-block"
                 dir="rtl" // Ensure calendar direction is RTL
                 locale={require('date-fns/locale/ar-EG')} // Example Arabic locale
               />
             </div>
          ) : (
             <div className="p-4 text-center text-muted-foreground">جار تحميل التقويم...</div> // Placeholder during SSR
          )}
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>أسعار العملات (مقابل EGP)</SidebarGroupLabel>
           <div className="space-y-2 px-2">
             {currencyRates.map(({ currency, rate, icon: Icon }) => (
               <div key={currency} className="flex items-center justify-between p-2 bg-muted rounded-md">
                 <div className="flex items-center gap-2">
                   <Icon className="h-4 w-4 text-muted-foreground" />
                   <span className="text-sm font-medium">{currency}</span>
                 </div>
                 <Badge variant="secondary">{rate}</Badge>
               </div>
             ))}
             <p className="text-xs text-muted-foreground text-center pt-2">أسعار استرشادية</p>
           </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* Optional Footer Content */}
      </SidebarFooter>
    </>
  );
}
