
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

// Define categories - added 'sohag'
type NewsCategory = 'local' | 'sohag' | 'governorate' | 'world'; // Added 'sohag'

// Helper to map display category to API category
const getApiCategory = (category: NewsCategory): 'local' | 'governorate' | 'world' => {
  if (category === 'sohag') {
    return 'governorate'; // Map 'sohag' to 'governorate' for the API call
  }
   if (category === 'governorate') {
    return 'governorate';
  }
   if (category === 'world') {
      return 'world';
   }
  return 'local'; // Default to 'local'
};

// Helper to get display name for category
const getCategoryDisplayName = (category: NewsCategory): string => {
  switch (category) {
    case 'local': return 'محلية';
    case 'sohag': return 'سوهاج';
    case 'governorate': return 'محافظات';
    case 'world': return 'عالمية'; // Keep world for message consistency if needed elsewhere
    default: return 'أخبار';
  }
}


export default function NewsSection({ initialArticles }: NewsSectionProps) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('local'); // Default to 'local'

  // Function to fetch articles based on search term and selected display category
  const fetchArticles = async (term: string, displayCategory: NewsCategory) => {
    setIsLoading(true);
    const apiCategory = getApiCategory(displayCategory); // Map display category to API category
    try {
      console.log(`Fetching articles for: term="${term}", category="${apiCategory}" (Display: ${displayCategory})`); // Log fetching parameters
      const fetchedArticles = await getNewsArticles(term, apiCategory);
      // Filter further if needed, e.g., if API returns all governorates for 'sohag'
      // For now, assume API handles it or display all governorate news under 'sohag' tab
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
      {/* Changed layout: Heading first, then Tabs, using flex and gap */}
      <div className="flex items-center gap-4 mb-4">
        <h2 className="bg-primary text-primary-foreground font-semibold text-lg flex-shrink-0 px-4 py-2 rounded-md flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          أحدث الأخبار
        </h2>
        <Tabs defaultValue={selectedCategory} onValueChange={handleTabChange} className="w-auto"> {/* Removed w-full */}
           {/* Changed grid-cols-3 to grid-flow-col for dynamic width */}
          <TabsList className="grid grid-flow-col auto-cols-max"> {/* Adjust grid for content size */}
            <TabsTrigger value="local">محلية</TabsTrigger>
            <TabsTrigger value="sohag">سوهاج</TabsTrigger> {/* New Sohag Tab */}
            <TabsTrigger value="governorate">محافظات</TabsTrigger>
             {/* Removed world tab as per request */}
          </TabsList>
        </Tabs>
      </div>

      {/* Articles Grid - Content is now dynamically updated based on state */}
      {isLoading ? (
        // Skeleton loading state
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : articles.length > 0 ? (
        // Display articles
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {articles.map((article, index) => (
             // Use display category in key
            <ArticleCard key={`${selectedCategory}-${article.url}-${index}`} article={article} />
          ))}
        </div>
      ) : (
        // No articles found message - Updated text
        <p className="text-center text-muted-foreground col-span-full py-10">
          {searchTerm
             ? `لم يتم العثور على مقالات تطابق بحثك "${searchTerm}" في قسم ${getCategoryDisplayName(selectedCategory)}.`
             : `لا توجد مقالات متاحة حاليًا في قسم ${getCategoryDisplayName(selectedCategory)}.`
           }
        </p>
      )}
    </div>
  );
}
