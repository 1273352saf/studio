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
      // Use card background for the main bar, remove border for cleaner look like image
      "bg-card text-foreground p-2 rounded-md shadow flex items-center overflow-hidden", // Reduced padding p-2
      className
    )}>
      {/* Label on the right */}
       {/* Using destructive background (red) and foreground (white) */}
       {/* Removed icon, adjusted padding */}
       <span className="bg-destructive text-destructive-foreground font-semibold text-sm flex-shrink-0 px-4 py-1 rounded-sm"> {/* Use rounded-sm for sharper corners */}
         عاجل
       </span>

       {/* Marquee Text Area - Takes up remaining space on the left */}
      <div className="flex-grow overflow-hidden whitespace-nowrap">
        {/* Apply the marquee animation */}
        {/* Add padding-left to separate from the label in RTL */}
        <span className="inline-block animate-marquee-rtl pl-4"> {/* Use padding-left in RTL */}
          {combinedNews}
        </span>
        {/* Duplicate the content for seamless looping */}
         <span className="inline-block animate-marquee-rtl pl-4" aria-hidden="true"> {/* Use padding-left in RTL */}
           {combinedNews}
         </span>
      </div>

    </div>
  );
}
