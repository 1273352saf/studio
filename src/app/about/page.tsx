
import { Info } from 'lucide-react';
import Navbar from '@/components/Navbar'; // Import Navbar
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navbar */}
      <Navbar className="mb-6" />

      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Info className="h-7 w-7" />
          من نحن
        </h1>
        <p className="text-muted-foreground mt-2">تعرف على الكوله اليوم.</p>
      </header>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>مهمتنا</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <p>
               موقع الكوله اليوم هو موقع إخباري تجريبي يهدف إلى تقديم أحدث الأخبار
               المحلية والعالمية. نحن نسعى لتوفير تغطية شاملة وموثوقة للأحداث
               الجارية في منطقة الكوله والمناطق المحيطة بها، بالإضافة إلى أهم الأخبار على الساحة المصرية والعالمية.
             </p>
             <p>
               نؤمن بأهمية الإعلام المستقل والشفافية في نقل المعلومة. فريقنا يعمل بجد لتقديم محتوى دقيق وموضوعي يلبي اهتمامات القراء.
             </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>تقنيتنا</CardTitle>
          </CardHeader>
          <CardContent>
             <p>
               تم تطوير هذا الموقع باستخدام أحدث التقنيات، بما في ذلك Next.js، Firebase Studio، و Genkit. نسعى للاستفادة من الذكاء الاصطناعي لتحسين تجربة المستخدم وتقديم ميزات مبتكرة مثل تحليل المشاعر للأخبار.
             </p>
          </CardContent>
        </Card>

         {/* Add more content sections as needed */}
      </main>
    </div>
  );
}
