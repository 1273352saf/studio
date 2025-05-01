'use client';

import Image from 'next/image';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Use ShadCN ScrollArea
import { cn } from '@/lib/utils'; // Import cn for conditional classes
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for placeholder
import { useState, useEffect } from 'react';

interface ImageSliderProps {
  images: string[];
  className?: string; // Allow passing className
}

export default function ImageSlider({ images, className }: ImageSliderProps) {
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set());

  // Effect to detect when window is available (client-side) - needed for Skeleton logic
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);


  if (!images || images.length === 0) {
    // Optionally show a placeholder if no images are provided
     return <div className={cn("relative w-full h-full bg-muted rounded-md border flex items-center justify-center text-muted-foreground", className)}>No Images</div>;
  }

  return (
    <div className={cn("relative w-full h-full", className)}> {/* Apply className */}
       <ScrollArea className="w-full h-full whitespace-nowrap rounded-md border">
         <div className="flex w-max space-x-4 p-4 h-full"> {/* Ensure flex container has height */}
           {images.map((src, index) => (
             <figure key={index} className="shrink-0 relative w-full sm:w-80 md:w-96 h-full overflow-hidden rounded-md"> {/* Use h-full and check parent height */}
               {/* Use a placeholder skeleton while loading, only render skeleton client-side */}
               {isClient && !loadedIndices.has(index) && (
                  <Skeleton className="absolute inset-0 w-full h-full" />
               )}
               {/* Always render Image, let Next.js handle SSR/hydration */}
               <Image
                 src={src}
                 alt={`Featured image ${index + 1}`}
                 layout="fill" // Requires parent to be relative and sized
                 objectFit="cover" // Ensure image covers the figure area
                 className={cn(
                   "transition-opacity duration-500 ease-in-out",
                   loadedIndices.has(index) ? "opacity-100" : "opacity-0" // Fade in on load
                 )}
                 priority={index < 2} // Prioritize loading first couple of images
                 data-ai-hint={
                   src.includes('wikimedia') ? 'basketball players action' :
                   src.includes('encrypted-tbn0.gstatic.com') ? 'soccer players action' :
                   'news landscape abstract'
                 }
                 onLoad={() => {
                   setLoadedIndices((prev) => new Set(prev).add(index));
                 }}
                 onError={(e) => {
                    console.error(`Error loading image ${index}:`, (e.target as HTMLImageElement).src);
                    // Optionally mark as loaded even on error to remove skeleton
                    setLoadedIndices((prev) => new Set(prev).add(index));
                 }}
               />
             </figure>
           ))}
         </div>
         <ScrollBar orientation="horizontal" />
       </ScrollArea>
     </div>
  );
}
