
import Navbar from '@/components/Navbar'; // Import Navbar
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components

// Using an inline SVG for 'Gavel' or similar icon as it's not directly in lucide-react
const PoliticsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7" // Applied size class here
    aria-hidden="true" // Added for accessibility
  >
    {/* Simplified Gavel Icon */}
    <path d="M14.5 12.5 5 22" />
    <path d="M17 10.5 13.5 7 6 14.5l3.5 3.5Z" />
    <path d="m14 2-8 8" />
    <path d="M11 5 2 14" />
    <path d="M21 15.5 10.5 5" />

  </svg>
);


export default function PoliticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navbar */}
      <Navbar className="mb-6" />

      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <PoliticsIcon />
          أخبار السياسة
        </h1>
        <p className="text-muted-foreground mt-2">
          آخر التطورات في عالم السياسة المحلية والدولية.
        </p>
      </header>
      <main>
         <Card>
           <CardHeader>
             <CardTitle>أخبار سياسية</CardTitle>
           </CardHeader>
           <CardContent>
             {/* TODO: Implement politics news display logic */}
             {/* Fetch and display articles tagged with 'politics' */}
             <p className="text-muted-foreground">
               سيتم عرض أخبار السياسة هنا قريباً. تغطية شاملة للقرارات الحكومية، العلاقات الدولية، والتحليلات السياسية.
             </p>
           </CardContent>
         </Card>
      </main>
    </div>
  );
}
