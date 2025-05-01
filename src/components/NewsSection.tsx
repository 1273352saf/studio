'use client';

import { useState, useEffect } from 'react';
import type { NewsArticle } from '@/services/news';
import { getNewsArticles } from '@/services/news'; // Import the function
import ArticleCard from '@/components/ArticleCard';
// Remove imports for ImageSlider, BreakingNewsBar as they are in page.tsx
import { Skeleton } from '@/components/ui/skeleton'; // For loading states
import { Input } from '@/components/ui/input'; // Import Input
import { Button } from '@/components/ui/button'; // Import Button
import { Search, Newspaper } from 'lucide-react'; // Import Search and Newspaper icons
import { cn } from '@/lib/utils'; // Import cn

interface NewsSectionProps {
  initialArticles: NewsArticle[];
  // Remove imageUrls and breakingNewsItems props
}

// Remove LiveStreamPlaceholder as it's in page.tsx

export default function NewsSection({ initialArticles }: NewsSectionProps) {
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

       {/* Remove Breaking News Bar */}
       {/* Remove Top section with Slider and Live Stream */}

       {/* Articles Grid */}
       {/* Apply styling similar to BreakingNewsBar title */}
       <div className="flex items-center justify-between mb-4">
         <h2 className="bg-primary text-primary-foreground font-semibold text-lg flex-shrink-0 px-4 py-2 rounded-md flex items-center gap-2">
           <Newspaper className="h-5 w-5" /> {/* Icon for Latest News */}
           أحدث الأخبار
         </h2>
         {/* Add any other controls if needed, like sorting or filtering */}
       </div>

       {isLoading ? (
         // Skeleton loading state
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
           {[...Array(8)].map((_, index) => (
             <Skeleton key={index} className="h-64 w-full rounded-lg" />
           ))}
         </div>
       ) : articles.length > 0 ? (
         // Display articles
         // Adjust grid columns for sidebar layout (e.g., reduce cols on larger screens if needed)
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"> {/* Adjusted columns */}
           {articles.map((article, index) => (
             <ArticleCard key={index} article={article} />
           ))}
         </div>
       ) : (
         // No articles found message
         <p className="text-center text-muted-foreground col-span-full py-10">
            لم يتم العثور على مقالات تطابق بحثك.
         </p>
       )}
    </div>
  );
}
