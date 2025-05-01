
import { TrendingUp } from 'lucide-react';

export default function EconomyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <TrendingUp className="h-7 w-7" />
          أخبار الاقتصاد
        </h1>
        <p className="text-muted-foreground mt-2">
          آخر المستجدات الاقتصادية والمالية.
        </p>
      </header>
      <main>
        {/* TODO: Implement economy news display logic */}
        <p className="text-muted-foreground">
          سيتم عرض أخبار الاقتصاد هنا قريباً.
        </p>
      </main>
    </div>
  );
}
