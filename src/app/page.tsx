import { Newspaper } from 'lucide-react';
import { getNewsArticles, type NewsArticle } from '@/services/news';
import NewsSection from '@/components/NewsSection';

export default async function Home() {
  // Fetch initial articles on the server
  // In a real app, you might pass initial search params here
  const initialArticles = await getNewsArticles('');

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex items-center gap-3">
        <Newspaper className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">NewsFlash</h1>
      </header>
      <main>
        <NewsSection initialArticles={initialArticles} />
      </main>
      <footer className="mt-12 text-center text-muted-foreground text-sm">
        Powered by Firebase Studio & Genkit
      </footer>
    </div>
  );
}
