'use client';

import { AlertCircle } from 'lucide-react'; // Using AlertCircle for visual cue
import { cn } from '@/lib/utils';

interface BreakingNewsBarProps {
  newsItems: string[];
  className?: string;
}

export default function BreakingNewsBar({ newsItems, className }: BreakingNewsBarProps) {
  if (!newsItems || newsItems.length === 0) {
    return null;
  }

  // Combine news items with a separator for continuous scrolling effect
  const combinedNews = newsItems.join(' ••• ');

  return (
    <div className={cn(
      // Changed background to card for the bar itself
      "bg-card border border-border text-foreground p-3 rounded-md shadow flex items-center space-x-3 space-x-reverse overflow-hidden", // Added space-x-reverse for RTL
      className
    )}>
       {/* Changed background to red (destructive) and text to white for the label */}
       <span className="bg-destructive text-destructive-foreground font-semibold text-sm flex-shrink-0 px-3 py-1 rounded-md flex items-center gap-2">
         <AlertCircle className="h-4 w-4" /> {/* Icon within the red label */}
         أخبار عاجلة:
       </span>
      <div className="flex-grow overflow-hidden whitespace-nowrap">
        {/* Apply the marquee animation */}
        <span className="inline-block animate-marquee-rtl px-4">
          {combinedNews}
        </span>
        {/* Duplicate the content for seamless looping */}
         <span className="inline-block animate-marquee-rtl px-4" aria-hidden="true">
           {combinedNews}
         </span>
      </div>
    </div>
  );
}
