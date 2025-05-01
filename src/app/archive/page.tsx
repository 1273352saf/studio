
import { Newspaper } from 'lucide-react';

export default function ArchivePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Newspaper className="h-7 w-7" />
          أخبار أرشيفية
        </h1>
        <p className="text-muted-foreground mt-2">استعرض الأخبار السابقة.</p>
      </header>
      <main>
        {/* TODO: Implement archive news display logic */}
        <p className="text-muted-foreground">
          سيتم عرض الأخبار المؤرشفة هنا قريباً.
        </p>
      </main>
    </div>
  );
}
