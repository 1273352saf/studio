
import { AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar'; // Import Navbar
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components

export default function IncidentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navbar */}
      <Navbar className="mb-6" />

      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <AlertTriangle className="h-7 w-7" />
          أخبار الحوادث
        </h1>
        <p className="text-muted-foreground mt-2">
          آخر الأخبار المتعلقة بالحوادث والتطورات الأمنية.
        </p>
      </header>
      <main>
         <Card>
           <CardHeader>
             <CardTitle>آخر الحوادث</CardTitle>
           </CardHeader>
           <CardContent>
             {/* TODO: Implement incidents news display logic */}
             {/* Fetch and display articles tagged with 'incidents' */}
             <p className="text-muted-foreground">
               سيتم عرض أخبار الحوادث هنا قريباً. نغطي آخر التطورات الأمنية وتقارير الحوادث بموضوعية.
             </p>
             {/* You might add specific filters or categories for incidents */}
           </CardContent>
         </Card>
      </main>
    </div>
  );
}
