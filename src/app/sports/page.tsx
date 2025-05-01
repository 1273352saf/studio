
import { Trophy } from 'lucide-react';
import Navbar from '@/components/Navbar'; // Import Navbar
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components

export default function SportsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navbar */}
      <Navbar className="mb-6" />

      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Trophy className="h-7 w-7" />
          أخبار الرياضة
        </h1>
        <p className="text-muted-foreground mt-2">
          آخر الأخبار والتغطيات الرياضية المحلية والعالمية.
        </p>
      </header>
      <main>
         <Card>
           <CardHeader>
             <CardTitle>أخبار رياضية</CardTitle>
           </CardHeader>
           <CardContent>
             {/* TODO: Implement sports news display logic */}
             {/* Fetch and display articles tagged with 'sports' */}
             <p className="text-muted-foreground">
               سيتم عرض أخبار الرياضة هنا قريباً. تابعوا نتائج المباريات، أخبار الأندية واللاعبين، وتحليلات الأحداث الرياضية الكبرى.
             </p>
             {/* Placeholder for scores or upcoming matches */}
             {/* <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4 border rounded-md">Placeholder: Match Score 1</div>
               <div className="p-4 border rounded-md">Placeholder: Upcoming Match</div>
             </div> */}
           </CardContent>
         </Card>
      </main>
    </div>
  );
}
