'use client';

import { useState, useEffect } from 'react';
import type { NewsArticle } from '@/services/news';
import { getNewsArticles } from '@/services/news'; // Import the function
import ArticleCard from '@/components/ArticleCard';
import ImageSlider from '@/components/ImageSlider';
import BreakingNewsBar from '@/components/BreakingNewsBar';
import { Skeleton } from '@/components/ui/skeleton'; // For loading states
import { Input } from '@/components/ui/input'; // Import Input
import { Button } from '@/components/ui/button'; // Import Button
import { Search } from 'lucide-react'; // Import Search icon

interface NewsSectionProps {
  initialArticles: NewsArticle[];
  imageUrls: string[]; // Receive image URLs as props
  breakingNewsItems: string[]; // Receive breaking news items
}

// Placeholder for Live Stream component
const LiveStreamPlaceholder = () => (
  <div className="bg-card border rounded-lg shadow-sm h-full flex items-center justify-center text-muted-foreground">
    <p>بث مباشر (قريبا)</p>
  </div>
);

export default function NewsSection({ initialArticles, imageUrls, breakingNewsItems }: NewsSectionProps) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch articles based on search term
  const handleSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault(); // Prevent default form submission if used
    setIsLoading(true);
    try {
      const fetchedArticles = await getNewsArticles(searchTerm);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      // Handle error state, maybe show a toast notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
       {/* Search Bar */}
       <form onSubmit={handleSearch} className="flex gap-2 mb-6">
         <Input
           type="search"
           placeholder="ابحث عن أخبار..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="flex-grow"
           aria-label="بحث الأخبار"
         />
         <Button type="submit" disabled={isLoading}>
           {isLoading ? 'جار البحث...' : <Search className="h-4 w-4" />}
         </Button>
       </form>

       {/* Breaking News Bar */}
       <BreakingNewsBar newsItems={breakingNewsItems} />

      {/* Top section with Slider and Live Stream */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-64 md:h-80 lg:h-96"> {/* Adjust height as needed */}
        <div className="md:col-span-2 h-full">
          <ImageSlider images={imageUrls} className="h-full" />
        </div>
        <div className="md:col-span-1 h-full">
          <LiveStreamPlaceholder />
        </div>
      </div>

      {/* Articles Grid */}
      <h2 className="text-2xl font-semibold border-b pb-2 mb-4">أحدث الأخبار</h2>
      {isLoading ? (
         // Skeleton loading state
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           {[...Array(8)].map((_, index) => (
             <Skeleton key={index} className="h-64 w-full rounded-lg" />
           ))}
         </div>
      ) : articles.length > 0 ? (
         // Display articles
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           {articles.map((article, index) => (
             <ArticleCard key={index} article={article} />
           ))}
         </div>
       ) : (
         // No articles found message
         <p className="text-center text-muted-foreground col-span-full">
            لم يتم العثور على مقالات تطابق بحثك.
         </p>
      )}
    </div>
  );
}
