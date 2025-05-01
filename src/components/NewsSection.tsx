'use client';

import { useState, useEffect, useMemo } from 'react';
import type { NewsArticle } from '@/services/news';
import SearchInput from '@/components/SearchInput';
import ArticleCard from '@/components/ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';

interface NewsSectionProps {
  initialArticles: NewsArticle[];
}

export default function NewsSection({ initialArticles }: NewsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>(initialArticles);
  const [isLoading, setIsLoading] = useState(true); // Start loading initially

  // Debounce effect for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setIsLoading(true); // Set loading before filtering
      const lowerCaseQuery = searchQuery.toLowerCase();
      const results = initialArticles.filter(
        article =>
          article.title.toLowerCase().includes(lowerCaseQuery) ||
          article.summary.toLowerCase().includes(lowerCaseQuery) ||
          article.source.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredArticles(results);
      // Simulate loading time for visual feedback, remove in production
      setTimeout(() => setIsLoading(false), 300);
    }, 300); // Debounce time: 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, initialArticles]);

  // Set initial loading state to false after mount
  useEffect(() => {
     setIsLoading(false);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="space-y-6">
      <SearchInput value={searchQuery} onChange={handleSearchChange} />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
             <Skeleton key={index} className="h-48 rounded-lg" />
          ))}
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <ArticleCard key={`${article.url}-${index}`} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">No articles found matching your search.</p>
      )}
    </section>
  );
}
