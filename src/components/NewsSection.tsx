
'use client';

import { useState, useEffect } from 'react';
import type { NewsArticle } from '@/services/news';
import { getNewsArticles } from '@/services/news'; // Import the function
import ArticleCard from '@/components/ArticleCard';
import { Skeleton } from '@/components/ui/skeleton'; // For loading states
import { Input } from '@/components/ui/input'; // Import Input
import { Button } from '@/components/ui/button'; // Import Button
import { Search, Newspaper } from 'lucide-react'; // Import Search and Newspaper icons
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import { cn } from '@/lib/utils'; // Import cn

interface NewsSectionProps {
  initialArticles: NewsArticle[];
}

// Define categories
type NewsCategory = 'local' | 'governorate' | 'world';

export default function NewsSection({ initialArticles }: NewsSectionProps) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('local'); // Default to 'local'

  // Function to fetch articles based on search term and category
  const fetchArticles = async (term: string, category: NewsCategory) => {
    setIsLoading(true);
    try {
      console.log(`Fetching articles for: term="${term}", category="${category}"`); // Log fetching parameters
      const fetchedArticles = await getNewsArticles(term, category);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      // Handle error state, maybe show a toast notification
      setArticles([]); // Clear articles on error
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch articles when search term or category changes
  useEffect(() => {
    fetchArticles(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Fetching is already handled by the useEffect hook when searchTerm changes
    // No need to call fetchArticles here directly unless debouncing is added
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setSelectedCategory(value as NewsCategory);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-6">
        <Input
          type="search"
          placeholder="ابحث عن أخبار..."
          value={searchTerm}
          // Update searchTerm immediately on change to trigger useEffect
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
          aria-label="بحث الأخبار"
        />
        {/* Keep submit button, though useEffect handles fetching */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'جار البحث...' : <Search className="h-4 w-4" />}
        </Button>
      </form>

      {/* News Categories Tabs and Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h2 className="bg-primary text-primary-foreground font-semibold text-lg flex-shrink-0 px-4 py-2 rounded-md flex items-center gap-2 order-1 sm:order-none">
          <Newspaper className="h-5 w-5" />
          أحدث الأخبار
        </h2>
        <Tabs defaultValue={selectedCategory} onValueChange={handleTabChange} className="w-full sm:w-auto order-2 sm:order-none">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="local">محلية</TabsTrigger>
            <TabsTrigger value="governorate">محافظات</TabsTrigger>
            <TabsTrigger value="world">عالمية</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Articles Grid - Content is now dynamically updated based on state */}
      {isLoading ? (
        // Skeleton loading state
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => ( // Reduced skeleton count slightly
            <Skeleton key={index} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : articles.length > 0 ? (
        // Display articles
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {articles.map((article, index) => (
            <ArticleCard key={`${selectedCategory}-${article.url}-${index}`} article={article} /> // Add category to key for potential re-renders
          ))}
        </div>
      ) : (
        // No articles found message
        <p className="text-center text-muted-foreground col-span-full py-10">
          {searchTerm
             ? `لم يتم العثور على مقالات تطابق بحثك "${searchTerm}" في قسم ${selectedCategory === 'local' ? 'محلية' : selectedCategory === 'governorate' ? 'محافظات' : 'عالمية'}.`
             : `لا توجد مقالات متاحة حاليًا في قسم ${selectedCategory === 'local' ? 'محلية' : selectedCategory === 'governorate' ? 'محافظات' : 'عالمية'}.`
           }
        </p>
      )}
    </div>
  );
}

