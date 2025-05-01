'use client';

import { useState } from 'react';
import type { NewsArticle } from '@/services/news';
import ArticleCard from '@/components/ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import BreakingNewsBar from '@/components/BreakingNewsBar'; // Import new component
import ImageSlider from '@/components/ImageSlider'; // Import new component
// Removed Newspaper import

interface NewsSectionProps {
  initialArticles: NewsArticle[];
  imageUrls: string[];
  breakingNewsItems: string[]; // Changed from latestArticle to breakingNewsItems
}

export default function NewsSection({ initialArticles, imageUrls, breakingNewsItems }: NewsSectionProps) {
  // Keep state for articles and loading, but remove search functionality
  const [articles] = useState<NewsArticle[]>(initialArticles);
  const [isLoading] = useState(false); // Data is loaded server-side

  return (
    <section className="space-y-6">
      {/* Removed the App Title and Newspaper icon here */}

      {/* Add BreakingNewsBar with static items */}
      <BreakingNewsBar newsItems={breakingNewsItems} />

      {/* Add ImageSlider */}
      <ImageSlider images={imageUrls} />

      {/* Keep the article grid */}
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
        <p className="text-center text-muted-foreground py-8">لا توجد مقالات متاحة.</p> // Updated message in Arabic
      )}
    </section>
  );
}
