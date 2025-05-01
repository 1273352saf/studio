
import { TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar'; // Import Navbar
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components

export default function EconomyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navbar */}
      <Navbar className="mb-6" />

      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <TrendingUp className="h-7 w-7" />
          أخبار الاقتصاد
        </h1>
        <p className="text-muted-foreground mt-2">
          آخر المستجدات الاقتصادية والمالية المحلية والعالمية.
        </p>
      </header>
      <main>
        <Card>
           <CardHeader>
             <CardTitle>آخر الأخبار الاقتصادية</CardTitle>
           </CardHeader>
           <CardContent>
             {/* TODO: Implement economy news display logic */}
             {/* Fetch and display articles tagged with 'economy' */}
             <p className="text-muted-foreground">
               سيتم عرض أخبار الاقتصاد هنا قريباً. تابعونا للحصول على تحليلات السوق، أسعار العملات، وأخبار الشركات.
             </p>
             {/* Placeholder for potential charts or data */}
             {/* <div className="mt-4 h-64 bg-muted rounded-md flex items-center justify-center">
                Chart Placeholder
             </div> */}
           </CardContent>
         </Card>
      </main>
    </div>
  );
}
