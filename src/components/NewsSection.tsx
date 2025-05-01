'use client';

import { useState, useEffect } from 'react';
import type { NewsArticle } from '@/services/news';
import ArticleCard from '@/components/ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import BreakingNewsBar from '@/components/BreakingNewsBar'; // Import new component
import ImageSlider from '@/components/ImageSlider'; // Import new component
import { Newspaper } from 'lucide-react'; // Import icon for title

interface NewsSectionProps {
  initialArticles: NewsArticle[];
  imageUrls: string[]; // Add prop for image URLs
  latestArticle?: NewsArticle; // Add prop for the latest article
}

export default function NewsSection({ initialArticles, imageUrls, latestArticle }: NewsSectionProps) {
  // Remove search-related state and effects
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [isLoading, setIsLoading] = useState(false); // No initial loading needed if data is passed directly

  // If filtering logic is ever needed again, it can be re-added here.
  // For now, we just display the initial articles.

  // Remove the useEffect for debounced search filtering

  // Remove initial loading effect if data is always present
  // useEffect(() => {
  //    setIsLoading(false);
  // }, []);

  // Remove handleSearchChange function

  return (
    <section className="space-y-6">
       {/* Add the App Title here */}
       <div className="mb-8 flex items-center gap-3">
         <Newspaper className="h-8 w-8 text-primary" />
         <h1 className="text-3xl font-bold text-primary">NewsFlash</h1>
       </div>

      {/* Add BreakingNewsBar */}
      <BreakingNewsBar latestArticleTitle={latestArticle?.title} />

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
        <p className="text-center text-muted-foreground py-8">No articles available.</p> // Updated message
      )}
    </section>
  );
}
