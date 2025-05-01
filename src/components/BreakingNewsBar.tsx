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
      "bg-accent text-accent-foreground p-3 rounded-md shadow flex items-center space-x-3 overflow-hidden",
      className
    )}>
      <AlertCircle className="h-5 w-5 flex-shrink-0 ms-2" /> {/* Use ms-2 for RTL margin */}
      <span className="font-semibold text-sm flex-shrink-0">أخبار عاجلة:</span>
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
