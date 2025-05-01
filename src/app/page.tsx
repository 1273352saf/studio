import { Newspaper } from 'lucide-react';
import { getNewsArticles, type NewsArticle } from '@/services/news';
import NewsSection from '@/components/NewsSection';

export default async function Home() {
  // Fetch initial articles on the server
  // In a real app, you might pass initial search params here
  const initialArticles = await getNewsArticles('');

  // Extract potential image URLs for the slider (using placeholders for now)
  const imageUrls = [
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3',
    'https://picsum.photos/800/400?random=4',
    'https://picsum.photos/800/400?random=5',
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header removed, title moved potentially to BreakingNewsBar or NewsSection */}
      <main>
        {/* Pass image URLs and potentially the latest article to NewsSection */}
        <NewsSection
          initialArticles={initialArticles}
          imageUrls={imageUrls}
          latestArticle={initialArticles[0]} // Pass the first article as the "latest"
        />
      </main>
      <footer className="mt-12 text-center text-muted-foreground text-sm">
        Powered by Firebase Studio & Genkit
      </footer>
    </div>
  );
}
