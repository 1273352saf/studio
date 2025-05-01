
'use client';

import Image from 'next/image';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Use ShadCN ScrollArea
import { cn } from '@/lib/utils'; // Import cn for conditional classes
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for placeholder
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button'; // Import Button
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import Icons

interface ImageSliderProps {
  images: string[];
  className?: string; // Allow passing className
}

// Helper function to get AI hint based on index for new images
const getAiHint = (index: number, totalImages: number): string => {
  const aiImageStartIndex = totalImages - 5; // Assuming the last 5 are AI images
  if (index >= aiImageStartIndex) {
    const aiImageIndex = index - aiImageStartIndex + 1;
    switch (aiImageIndex) {
      case 1: return 'futuristic cityscape night';
      case 2: return 'abstract geometric patterns vibrant';
      case 3: return 'serene nature landscape mountain lake';
      case 4: return 'close up macro technology circuit board';
      case 5: return 'wildlife animal portrait majestic lion';
      default: return 'news landscape abstract';
    }
  }
  // Fallback for existing images (or if logic is slightly off)
  return 'news landscape abstract';
}

export default function ImageSlider({ images, className }: ImageSliderProps) {
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLElement | null)[]>([]); // Ref array for figures

  useEffect(() => {
    setIsClient(true);
    // Initialize refs array
    imageRefs.current = imageRefs.current.slice(0, images.length);
  }, [images.length]);

  const handleScroll = (direction: 'prev' | 'next') => {
    if (!scrollContainerRef.current || imageRefs.current.length === 0) return;

    const container = scrollContainerRef.current;
    const { scrollLeft, clientWidth } = container;
    let targetScrollLeft = scrollLeft;

    // Find the index of the first fully or partially visible image on the left
    let currentVisibleIndex = -1;
    for (let i = 0; i < imageRefs.current.length; i++) {
        const imgElement = imageRefs.current[i];
        if (imgElement) {
            // Check if the image start is within or before the current view
            if (imgElement.offsetLeft >= scrollLeft) {
                currentVisibleIndex = i;
                break;
            }
            // Check if image partially overlaps from the left
            if (imgElement.offsetLeft + imgElement.offsetWidth > scrollLeft) {
                 currentVisibleIndex = i;
                 break;
            }
        }
    }
     if (currentVisibleIndex === -1) currentVisibleIndex = 0; // Fallback

    if (direction === 'next') {
        // Find the next image to scroll to
        let nextIndex = -1;
        for (let i = currentVisibleIndex; i < imageRefs.current.length; i++) {
            const imgElement = imageRefs.current[i];
            // Find the first image starting *after* the current scroll position
            if (imgElement && imgElement.offsetLeft > scrollLeft + 10) { // Add small tolerance
                 nextIndex = i;
                 break;
             }
        }
         // If no image starts after the current view, but there are images further right
         if (nextIndex === -1 && currentVisibleIndex < images.length -1) {
              // Try scrolling to the image right after the current one if it exists
              const nextElement = imageRefs.current[currentVisibleIndex + 1];
              if (nextElement) {
                 targetScrollLeft = nextElement.offsetLeft;
              } else {
                 // Or just scroll by client width if the next element isn't found (edge case)
                 targetScrollLeft += clientWidth;
              }

         } else if (nextIndex !== -1) {
             targetScrollLeft = imageRefs.current[nextIndex]?.offsetLeft ?? targetScrollLeft;
         } else {
             // If already at or near the end, maybe scroll fully to the end
             targetScrollLeft = container.scrollWidth - clientWidth;
         }

    } else { // direction === 'prev'
         // Find the image to scroll back to
         let prevIndex = -1;
         for (let i = currentVisibleIndex; i >= 0; i--) {
              const imgElement = imageRefs.current[i];
              // Find the first image starting significantly *before* the current scroll position
               if (imgElement && imgElement.offsetLeft < scrollLeft - clientWidth * 0.5) { // Heuristic: scroll back if more than half a screen away
                   prevIndex = i;
                   break;
               }
                // Or if it's the image immediately before the currently visible one
               if (i === currentVisibleIndex -1 && imgElement) {
                   prevIndex = i;
                   break;
               }
         }

        // If we are near the beginning, scroll to the start
        if (scrollLeft < clientWidth / 2 && scrollLeft > 0) {
            targetScrollLeft = 0;
        } else if (prevIndex !== -1) {
            targetScrollLeft = imageRefs.current[prevIndex]?.offsetLeft ?? 0;
        } else {
            // Fallback: scroll back by clientWidth or to the beginning
            targetScrollLeft = Math.max(0, scrollLeft - clientWidth);
        }
    }

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
  };


  if (!images || images.length === 0) {
     return <div className={cn("relative w-full h-full bg-muted rounded-md border flex items-center justify-center text-muted-foreground", className)}>No Images</div>;
  }

  return (
    <div className={cn("relative w-full h-full group", className)}> {/* Add group for button visibility */}
       <ScrollArea className="w-full h-full whitespace-nowrap rounded-md border">
         {/* The div inside ScrollArea's Viewport needs the ref */}
         <div ref={scrollContainerRef} className="flex w-max space-x-4 p-4 h-full"> {/* Ensure flex container has height */}
           {images.map((src, index) => (
             <figure
               key={index}
               ref={el => imageRefs.current[index] = el} // Assign ref to each figure
               className="shrink-0 relative w-full sm:w-80 md:w-96 h-full overflow-hidden rounded-md"> {/* Use h-full and check parent height */}
               {/* Use a placeholder skeleton while loading, only render skeleton client-side */}
               {isClient && !loadedIndices.has(index) && (
                  <Skeleton className="absolute inset-0 w-full h-full" />
               )}
               {/* Always render Image, let Next.js handle SSR/hydration */}
               <Image
                 // Ensure image URLs are valid and accessible
                 src={src || 'https://picsum.photos/600/400?grayscale'} // Provide a fallback URL
                 alt={`Featured image ${index + 1}`}
                 fill // Use fill layout
                 sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 96vw" // Provide sizes attribute
                 style={{ objectFit: "cover" }} // Use style prop for objectFit with fill
                 className={cn(
                   "transition-opacity duration-500 ease-in-out",
                   loadedIndices.has(index) ? "opacity-100" : "opacity-0" // Fade in on load
                 )}
                 priority={index < 2} // Prioritize loading first couple of images
                 data-ai-hint={
                    src.includes('picsum') ? getAiHint(index, images.length) : // Use helper for picsum placeholders
                    src.includes('wikimedia') ? 'basketball players action' :
                    src.includes('encrypted-tbn0.gstatic.com') ? 'soccer players action' :
                    'news landscape abstract' // Default
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

        {/* Navigation Buttons */}
        {/* Position buttons absolutely within the relative parent */}
        {/* Show buttons on group hover */}
        <Button
           variant="outline"
           size="icon"
           className="absolute top-1/2 -translate-y-1/2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 hover:bg-background/80"
           onClick={() => handleScroll('prev')}
           aria-label="Previous Image"
         >
           <ChevronLeft className="h-6 w-6" />
         </Button>
         <Button
           variant="outline"
           size="icon"
           className="absolute top-1/2 -translate-y-1/2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 hover:bg-background/80"
           onClick={() => handleScroll('next')}
           aria-label="Next Image"
         >
           <ChevronRight className="h-6 w-6" />
         </Button>

     </div>
  );
}
