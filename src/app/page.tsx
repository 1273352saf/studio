import { Facebook, Twitter, Instagram } from 'lucide-react';
import { getNewsArticles, type NewsArticle } from '@/services/news';
import NewsSection from '@/components/NewsSection';
import { Button } from '@/components/ui/button'; // Import Button for icons

export default async function Home() {
  // Fetch initial articles on the server
  // In a real app, you might pass initial search params here
  const initialArticles = await getNewsArticles('');

  // Extract potential image URLs for the slider (using placeholders for now)
   // Filter out articles without imageUrls and map to get the URLs
   const imageUrls = initialArticles
     .map(article => article.imageUrl)
     .filter((url): url is string => !!url); // Ensure only defined URLs are included

  const breakingNewsItems = [
    'موقع الكوله تجريبى',
    'الان يمكنك متابعة الاخبار بسهوله',
  ];

  return (
    // Remove container class to allow sidebar integration, apply padding within NewsSection or page content
    <div className="px-4 py-8">
      {/* New Header */}
      <header className="flex justify-between items-center mb-8 pb-4 border-b">
        {/* Right Side: Title and Subtitle */}
        <div className="text-right">
          <h1 className="text-3xl font-bold text-primary">الكوله اليوم</h1>
          <p className="text-muted-foreground">موقع اخبارى</p>
        </div>
        {/* Left Side: Social Media Icons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </a>
          </Button>
        </div>
      </header>

      <main>
        {/* Pass static news items and image URLs */}
        <NewsSection
          initialArticles={initialArticles}
          imageUrls={imageUrls}
          breakingNewsItems={breakingNewsItems} // Pass static items
        />
      </main>
      <footer className="mt-12 text-center text-muted-foreground text-sm">
        Powered by Firebase Studio & Genkit
      </footer>
    </div>
  );
}
