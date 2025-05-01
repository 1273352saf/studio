import { Facebook, Twitter, Instagram } from 'lucide-react';
import { getNewsArticles, type NewsArticle } from '@/services/news';
import NewsSection from '@/components/NewsSection';
import { Button } from '@/components/ui/button'; // Import Button for icons
import AppSidebar from '@/components/AppSidebar'; // Import sidebar
import ImageSlider from '@/components/ImageSlider'; // Import ImageSlider
import BreakingNewsBar from '@/components/BreakingNewsBar'; // Import BreakingNewsBar
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

// Placeholder for Live Stream component
const LiveStreamPlaceholder = () => (
  <div className="bg-card border rounded-lg shadow-sm h-full flex items-center justify-center text-muted-foreground">
    <p>بث مباشر (قريبا)</p>
  </div>
);

export default async function Home() {
  // Fetch initial articles on the server
  // In a real app, you might pass initial search params here
  const initialArticles = await getNewsArticles('');

  // Extract potential image URLs for the slider (using placeholders and the new image)
  const imageUrls = initialArticles
     .map(article => article.imageUrl)
     .filter((url): url is string => !!url); // Ensure only defined URLs are included

  // Add the new image URL
   imageUrls.push('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm1hQ5ZqXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXQ&usqp=CAU');


  const breakingNewsItems = [
    'موقع الكوله تجريبى',
    'الان يمكنك متابعة الاخبار بسهوله',
  ];

  return (
    <div className="flex"> {/* Use flex for sidebar layout */}
       {/* Main content area */}
       <div className="flex-1 px-4 py-8">
         {/* Header */}
         <header className="flex justify-between items-center mb-8 pb-4 border-b">
           {/* Right Side: Title and Subtitle */}
           <div className="text-right">
             <h1 className="text-3xl font-bold text-primary">الكوله اليوم</h1>
             <p className="text-muted-foreground">موقع اخبارى</p>
           </div>
           {/* Left Side: Social Media Icons */}
           <div className="flex items-center space-x-2">
             <Button variant="ghost" size="icon" asChild>
               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                 <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
               </a>
             </Button>
             <Button variant="ghost" size="icon" asChild>
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                 <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
               </a>
             </Button>
             <Button variant="ghost" size="icon" asChild>
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                 <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
               </a>
             </Button>
           </div>
         </header>

         <main>
           {/* Breaking News Bar */}
           <BreakingNewsBar newsItems={breakingNewsItems} className="mb-6" />

           {/* Top section with Slider and Live Stream */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-64 md:h-80 lg:h-96 mb-6"> {/* Adjust height and add margin */}
             <div className="md:col-span-2 h-full">
               <ImageSlider images={imageUrls} className="h-full" />
             </div>
             <div className="md:col-span-1 h-full">
               <LiveStreamPlaceholder />
             </div>
           </div>

           {/* Bottom section: Sidebar and NewsSection */}
           <div className="flex flex-col md:flex-row gap-6">
             {/* Sidebar - moved here */}
             {/* Make sidebar sticky within its container */}
             <div className="w-full md:w-[var(--sidebar-width)] md:sticky md:top-8 self-start">
                {/* Pass a class to limit height and allow scrolling if needed */}
               <AppSidebar className="h-auto md:max-h-[calc(100vh-4rem)] md:overflow-y-auto" />
             </div>

             {/* News Section takes remaining space */}
             <div className="flex-1">
               <NewsSection
                 initialArticles={initialArticles}
                 // Remove props passed directly above, they are handled inside NewsSection now
               />
             </div>
           </div>
         </main>
         <footer className="mt-12 text-center text-muted-foreground text-sm">
           Powered by Firebase Studio & Genkit
         </footer>
       </div>
    </div>
  );
}
