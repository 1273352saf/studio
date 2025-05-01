
import { Trophy } from 'lucide-react'; // Using Trophy icon

export default function SportsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Trophy className="h-7 w-7" />
          أخبار الرياضة
        </h1>
        <p className="text-muted-foreground mt-2">
          آخر الأخبار والتغطيات الرياضية.
        </p>
      </header>
      <main>
        {/* TODO: Implement sports news display logic */}
        <p className="text-muted-foreground">
          سيتم عرض أخبار الرياضة هنا قريباً.
        </p>
      </main>
    </div>
  );
}
