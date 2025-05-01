'use client';

import { useState, useEffect } from 'react';
import type { NewsArticle } from '@/services/news';
import { reasonAboutArticleContext, type ReasonAboutArticleContextOutput } from '@/ai/flows/reason-about-article-context';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Smile, Frown, Meh } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: NewsArticle;
}

const SentimentIcon = ({ sentiment }: { sentiment: ReasonAboutArticleContextOutput['sentiment'] | undefined }) => {
  if (sentiment === 'positive') {
    return <Smile className="h-4 w-4 text-green-600" />;
  }
  if (sentiment === 'negative') {
    return <Frown className="h-4 w-4 text-red-600" />;
  }
  return <Meh className="h-4 w-4 text-muted-foreground" />; // Neutral or loading
};

const getSentimentColor = (sentiment: ReasonAboutArticleContextOutput['sentiment'] | undefined): string => {
  switch (sentiment) {
    case 'positive':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'negative':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [sentimentData, setSentimentData] = useState<ReasonAboutArticleContextOutput | null>(null);
  const [isLoadingSentiment, setIsLoadingSentiment] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSentiment = async () => {
      setIsLoadingSentiment(true);
      setError(null);
      try {
        const result = await reasonAboutArticleContext({
          title: article.title,
          summary: article.summary,
          source: article.source,
        });
        setSentimentData(result);
      } catch (err) {
        console.error("Error fetching sentiment:", err);
        setError("تعذر تحميل التحليل."); // Translate error message
      } finally {
        setIsLoadingSentiment(false);
      }
    };

    fetchSentiment();
  }, [article]); // Re-run if the article prop changes

  return (
    <Card className="flex flex-col h-full transition-shadow duration-200 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg leading-tight">
           {article.title}
        </CardTitle>
         <CardDescription className="text-xs pt-1">{article.source}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{article.summary}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4">
         <div className="flex items-center gap-2">
            {isLoadingSentiment ? (
                <Skeleton className="h-6 w-24 rounded-full" />
            ) : error ? (
                 <Badge variant="destructive" className="text-xs">{error}</Badge>
            ) : sentimentData ? (
              <Badge
                variant="outline"
                className={cn("text-xs flex items-center gap-1", getSentimentColor(sentimentData.sentiment))}
                title={sentimentData.reasoning}
              >
                <SentimentIcon sentiment={sentimentData.sentiment} />
                {sentimentData.sentiment === 'positive' ? 'إيجابي' : sentimentData.sentiment === 'negative' ? 'سلبي' : 'محايد'} {/* Translate sentiment */}
                 ({sentimentData.score.toFixed(2)})
              </Badge>
            ) : null}
          </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline inline-flex items-center gap-1 text-sm"
          aria-label={`قراءة المقال كاملاً: ${article.title}`} // Translate aria-label
        >
          اقرأ المزيد {/* Translate "Read More" */}
          <ExternalLink className="h-3 w-3 ms-1" /> {/* Add margin start (ms-1) for RTL */}
        </a>
      </CardFooter>
    </Card>
  );
}
