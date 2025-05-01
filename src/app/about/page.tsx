
import { Info } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Info className="h-7 w-7" />
          من نحن
        </h1>
        <p className="text-muted-foreground mt-2">تعرف على الكوله اليوم.</p>
      </header>
      <main className="space-y-4">
        <p>
          موقع الكوله اليوم هو موقع إخباري تجريبي يهدف إلى تقديم أحدث الأخبار
          المحلية والعالمية. نحن نسعى لتوفير تغطية شاملة وموثوقة للأحداث
          الجارية.
        </p>
        <p>
          هذا الموقع تم تطويره باستخدام Firebase Studio و Genkit لتوفير تجربة
          مستخدم حديثة وميزات مدعومة بالذكاء الاصطناعي.
        </p>
        {/* Add more content about the website/team here */}
      </main>
    </div>
  );
}
