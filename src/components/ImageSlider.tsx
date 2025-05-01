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

  // Effect to detect when window is available (client-side)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);


  if (!images || images.length === 0) {
    // Optionally show a placeholder if no images are provided
     return <div className={cn("relative w-full h-full bg-muted rounded-md border flex items-center justify-center text-muted-foreground", className)}>No Images</div>;
  }

  // Don't render image component on server if using layout=fill to avoid potential hydration issues
  // Although Next.js aims to handle this, sometimes explicit client rendering helps.
  // However, let's try without this first, as it adds complexity.

  return (
    <div className={cn("relative w-full h-full", className)}> {/* Apply className */}
       <ScrollArea className="w-full h-full whitespace-nowrap rounded-md border">
         <div className="flex w-max space-x-4 p-4 h-full">
           {images.map((src, index) => (
             <figure key={index} className="shrink-0 relative w-full sm:w-80 md:w-96 h-full overflow-hidden rounded-md"> {/* Combine relative, overflow, rounded */}
               {/* Use a placeholder skeleton while loading */}
               {!loadedIndices.has(index) && isClient && (
                  <Skeleton className="absolute inset-0 w-full h-full" />
               )}
               {/* Render Image only on client if using fill to be safe, or rely on Next.js */}
               {isClient && (
                 <Image
                   src={src}
                   alt={`Featured image ${index + 1}`}
                   layout="fill"
                   objectFit="cover"
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
                   // If still having issues, uncomment onError and check console
                   // onError={(e) => console.error(`Error loading image ${index}:`, e.target.src)}
                 />
               )}
             </figure>
           ))}
         </div>
         <ScrollBar orientation="horizontal" />
       </ScrollArea>
     </div>
  );
}
