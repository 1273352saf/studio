// NewsSection.tsx
'use client';

import { useState } from 'react';
import type { NewsArticle } from '@/services/news';
import ArticleCard from '@/components/ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import BreakingNewsBar from '@/components/BreakingNewsBar';
import ImageSlider from '@/components/ImageSlider';
import { Card } from '@/components/ui/card'; // Import Card
import { Video } from 'lucide-react'; // Import Video icon

interface NewsSectionProps {
  initialArticles: NewsArticle[];
  imageUrls: string[];
  breakingNewsItems: string[];
}

export default function NewsSection({ initialArticles, imageUrls, breakingNewsItems }: NewsSectionProps) {
  const [articles] = useState<NewsArticle[]>(initialArticles);
  const [isLoading] = useState(false); // Data is loaded server-side

  return (
    <section className="space-y-6">
      {/* Breaking News Bar */}
      <BreakingNewsBar newsItems={breakingNewsItems} />

      {/* Image Slider and Live Stream Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"> {/* Use grid and items-stretch */}
        <div className="lg:col-span-2 h-full"> {/* Slider takes 2/3 width on large screens */}
          <ImageSlider images={imageUrls} className="h-64 lg:h-full" /> {/* Add specific height */}
        </div>
        <div className="lg:col-span-1 h-full"> {/* Live stream takes 1/3 width, ensure full height */}
           {/* Placeholder for live stream */}
           <Card className="h-full flex flex-col items-center justify-center bg-muted text-muted-foreground p-4 min-h-[200px] lg:min-h-[200px]"> {/* Ensure min-height */}
             <Video className="h-12 w-12 mx-auto mb-2 text-foreground" />
             <p className="font-semibold">مساحة البث المباشر</p>
             <p className="text-sm text-center mt-1">سيتم إضافة البث المباشر هنا قريبًا.</p>
           </Card>
        </div>
      </div>

      {/* Article Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
             <Skeleton key={index} className="h-48 rounded-lg" />
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ArticleCard key={`${article.url}-${index}`} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">لا توجد مقالات متاحة.</p>
      )}
    </section>
  );
}
