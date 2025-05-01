
import { AlertTriangle } from 'lucide-react';

export default function IncidentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <AlertTriangle className="h-7 w-7" />
          أخبار الحوادث
        </h1>
        <p className="text-muted-foreground mt-2">
          آخر الأخبار المتعلقة بالحوادث.
        </p>
      </header>
      <main>
        {/* TODO: Implement incidents news display logic */}
        <p className="text-muted-foreground">
          سيتم عرض أخبار الحوادث هنا قريباً.
        </p>
      </main>
    </div>
  );
}
