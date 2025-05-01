'use client';

import { AlertCircle } from 'lucide-react'; // Using AlertCircle for visual cue

interface BreakingNewsBarProps {
  latestArticleTitle?: string;
}

export default function BreakingNewsBar({ latestArticleTitle }: BreakingNewsBarProps) {
  return (
    <div className="bg-accent text-accent-foreground p-3 rounded-md shadow flex items-center space-x-3 overflow-hidden">
      <AlertCircle className="h-5 w-5 flex-shrink-0" />
      <span className="font-semibold text-sm flex-shrink-0">Breaking News:</span>
      {latestArticleTitle ? (
        <p className="text-sm truncate flex-grow">
          {latestArticleTitle}
        </p>
      ) : (
        <p className="text-sm text-accent-foreground/80 italic">No breaking news available.</p>
      )}
       {/* Potential future enhancement: Add scrolling effect for long titles */}
    </div>
  );
}
