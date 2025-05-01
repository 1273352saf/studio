'use client';

import Image from 'next/image';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Use ShadCN ScrollArea
import { cn } from '@/lib/utils'; // Import cn for conditional classes

interface ImageSliderProps {
  images: string[];
  className?: string; // Allow passing className
}

export default function ImageSlider({ images, className }: ImageSliderProps) {
  if (!images || images.length === 0) {
    return null; // Don't render anything if there are no images
  }

  return (
    <div className={cn("relative w-full h-full", className)}> {/* Apply className */}
       <ScrollArea className="w-full h-full whitespace-nowrap rounded-md border">
         <div className="flex w-max space-x-4 p-4 h-full">
           {images.map((src, index) => (
             <figure key={index} className="shrink-0 relative w-64 sm:w-80 md:w-96 h-full"> {/* Use relative, set base width and height */}
               <div className="overflow-hidden rounded-md h-full">
                 <Image
                   src={src}
                   alt={`Featured image ${index + 1}`}
                   // Use layout="fill" and objectFit="cover" for responsive image filling
                   layout="fill" // Use fill layout
                   objectFit="cover" // Use cover to fill the container
                   className="rounded-md" // Keep rounded corners if desired
                   priority={index < 2} // Prioritize loading first couple of images
                   // Add specific hint if it's the provided image, otherwise use generic
                   data-ai-hint={
                     src.includes('wikimedia') ? 'basketball players action' :
                     src.includes('encrypted-tbn0.gstatic.com') ? 'soccer players action' : // Hint for the new image
                     'news landscape'
                   }
                    // Add unoptimized prop for external domains not explicitly listed in next.config.js or known CDNs
                   unoptimized={!src.startsWith('/') && !src.includes('picsum.photos') && !src.includes('upload.wikimedia.org')}
                 />
               </div>
             </figure>
           ))}
         </div>
         <ScrollBar orientation="horizontal" />
       </ScrollArea>
     </div>
  );
}
