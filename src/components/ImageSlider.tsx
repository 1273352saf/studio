'use client';

import Image from 'next/image';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Use ShadCN ScrollArea

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  if (!images || images.length === 0) {
    return null; // Don't render anything if there are no images
  }

  return (
    <div className="relative w-full">
       <ScrollArea className="w-full whitespace-nowrap rounded-md border">
         <div className="flex w-max space-x-4 p-4">
           {images.map((src, index) => (
             <figure key={index} className="shrink-0">
               <div className="overflow-hidden rounded-md">
                 <Image
                   src={src}
                   alt={`Featured image ${index + 1}`}
                   // Using fixed dimensions for consistency in the slider
                   width={600}
                   height={300}
                   className="aspect-[2/1] h-fit w-full object-cover" // Maintain aspect ratio
                   priority={index < 2} // Prioritize loading first couple of images
                   data-ai-hint="news landscape" // Add AI hint for image search
                 />
               </div>
                {/* Optional: Add caption */}
               {/* <figcaption className="pt-2 text-xs text-muted-foreground">
                 Caption for image {index + 1}
               </figcaption> */}
             </figure>
           ))}
         </div>
         <ScrollBar orientation="horizontal" />
       </ScrollArea>
     </div>
  );
}
