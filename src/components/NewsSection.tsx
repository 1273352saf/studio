
'use client';

import { useState, useEffect } from 'react';
import type { NewsArticle } from '@/services/news';
import { getNewsArticles } from '@/services/news'; // Import the function
import ArticleCard from '@/components/ArticleCard';
import { Skeleton } from '@/components/ui/skeleton'; // For loading states
import { Input } from '@/components/ui/input'; // Import Input
import { Button } from '@/components/ui/button'; // Import Button
import { Search, ChevronLeft } from 'lucide-react'; // Import Search and ChevronLeft icons
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import Link from 'next/link'; // Import Link for 'More'
import { cn } from '@/lib/utils'; // Import cn

interface NewsSectionProps {
  initialArticles: NewsArticle[];
}

// Define categories - updated to match new requirement
type NewsCategory = 'local' | 'sohag' | 'egypt';

// Helper to map display category to API category
const getApiCategory = (category: NewsCategory): 'local' | 'governorate' => {
  if (category === 'sohag' || category === 'egypt') {
    // Map 'sohag' and 'egypt' to 'governorate' for the API call
    return 'governorate';
  }
  return 'local'; // Default to 'local'
};

// Helper to get display name for category
const getCategoryDisplayName = (category: NewsCategory): string => {
  switch (category) {
    case 'local': return 'أخبارنا المحلية';
    case 'sohag': return 'أخبار محافظة سوهاج';
    case 'egypt': return 'أخبار مصر';
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
      // TODO: If 'egypt' needs specific filtering beyond 'governorate', add it here.
      // For now, display all governorate news under 'sohag' and 'egypt' tabs.
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

      {/* News Categories Section - Styled to match image */}
      {/* Container with bottom border */}
      <div className="flex items-center justify-between border-b-2 border-destructive pb-1 mb-4 relative">
         {/* Tabs on the left */}
        <Tabs defaultValue={selectedCategory} onValueChange={handleTabChange} className="w-auto">
          {/* Remove TabsList background and padding */}
          <TabsList className="bg-transparent p-0 h-auto justify-start gap-4">
            {/* Style TabsTrigger as red links */}
            <TabsTrigger
              value="local"
              className="text-destructive data-[state=active]:underline data-[state=active]:font-bold data-[state=active]:shadow-none p-0 text-sm"
            >
              أخبارنا المحلية
            </TabsTrigger>
            <TabsTrigger
              value="sohag"
              className="text-destructive data-[state=active]:underline data-[state=active]:font-bold data-[state=active]:shadow-none p-0 text-sm"
            >
              أخبار محافظة سوهاج
            </TabsTrigger>
            <TabsTrigger
              value="egypt"
              className="text-destructive data-[state=active]:underline data-[state=active]:font-bold data-[state=active]:shadow-none p-0 text-sm"
            >
              أخبار مصر
            </TabsTrigger>
             {/* More Link */}
            <Link href="#" className="text-destructive text-sm flex items-center hover:underline">
               المزيد
               <ChevronLeft className="h-4 w-4 mr-1" /> {/* Use marginRight in RTL */}
            </Link>
          </TabsList>
        </Tabs>

         {/* Heading on the right - Styled like the image */}
         {/* Using destructive background and foreground */}
         {/* Adding padding and a slight skew effect using clip-path (optional, can be simplified) */}
        <h2 className="bg-destructive text-destructive-foreground font-semibold text-lg flex-shrink-0 px-6 py-2 relative">
           {/* Optional: Add the angled edge effect */}
           <div className="absolute inset-y-0 left-0 w-4 bg-destructive transform -skew-x-12 -translate-x-2"></div>
           <span className="relative z-10">أحدث الأخبار</span>
           {/* You might need adjustments for perfect shape matching */}
        </h2>
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
