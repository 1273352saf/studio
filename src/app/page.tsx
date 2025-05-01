
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { getNewsArticles, type NewsArticle } from '@/services/news';
import NewsSection from '@/components/NewsSection';
import { Button } from '@/components/ui/button'; // Import Button for icons
import AppSidebar from '@/components/AppSidebar'; // Import sidebar
import ImageSlider from '@/components/ImageSlider'; // Import ImageSlider
import BreakingNewsBar from '@/components/BreakingNewsBar'; // Import BreakingNewsBar
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton
import Link from 'next/link'; // Import Link for footer
import Navbar from '@/components/Navbar'; // Import Navbar

// Placeholder for Live Stream component
const LiveStreamPlaceholder = () => (
  <div className="bg-card border rounded-lg shadow-sm h-full flex items-center justify-center text-muted-foreground">
    <p>بث مباشر (قريبا)</p>
  </div>
);

export default async function Home() {
  // Fetch initial articles for the 'local' category on the server
  const initialArticles = await getNewsArticles('', 'local'); // Fetch 'local' articles initially

  // Extract potential image URLs for the slider
  const imageUrls = initialArticles
     .map(article => article.imageUrl)
     .filter((url): url is string => !!url) // Ensure only defined URLs are included
     // Add more placeholder images if needed, ensuring diversity
     .concat([
         'https://picsum.photos/600/400?random=9',
         'https://picsum.photos/600/400?random=10',
         'https://picsum.photos/600/400?random=11',
      ])
      // Ensure unique URLs if placeholders might repeat
     .filter((url, index, self) => self.indexOf(url) === index);


  const breakingNewsItems = [
    'موقع الكوله تجريبى',
    'الان يمكنك متابعة الاخبار بسهوله',
  ];

  return (
    <div className="flex flex-col min-h-screen"> {/* Ensure full height */}
       {/* Main content area */}
       {/* Changed padding for better responsiveness px-2 sm:px-4 */}
       <div className="flex-1 px-2 sm:px-4 py-8">
         {/* Header */}
         <header className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b gap-4 sm:gap-0">
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
           {/* Navbar */}
           <Navbar className="mb-6" /> {/* Add Navbar here */}

           {/* Breaking News Bar */}
           <BreakingNewsBar newsItems={breakingNewsItems} className="mb-6" />

           {/* Top section with Slider and Live Stream */}
           {/* Adjusted height classes for better scaling */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[30vh] md:h-[40vh] lg:h-[50vh] mb-6">
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
             {/* Added width constraint for smaller screens too */}
             {/* Use a specific width and adjust sticky position */}
              <div className="w-full md:w-[var(--sidebar-width)] md:sticky md:top-8 self-start md:h-[calc(100vh-4rem)] md:overflow-y-auto">
                 {/* Removed className from AppSidebar - styling applied to container div */}
                 <AppSidebar />
              </div>


             {/* News Section takes remaining space */}
             <div className="flex-1">
               <NewsSection
                 initialArticles={initialArticles}
                 // No need to pass category prop, handled internally
               />
             </div>
           </div>
         </main>
       </div>
        {/* Enhanced Footer */}
        {/* Changed footer background to primary (dark blue/gray in light mode) and card (darker gray in dark mode) */}
        <footer className="bg-primary dark:bg-card border-t mt-auto py-6 px-4 sm:px-6">
           <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground dark:text-card-foreground">
             <div className="mb-4 md:mb-0">
               &copy; {new Date().getFullYear()} الكوله اليوم. جميع الحقوق محفوظة.
             </div>
             <div className="flex space-x-4 space-x-reverse"> {/* space-x-reverse for RTL */}
                {/* Use appropriate text color for links based on footer background */}
               <Link href="/privacy" className="text-primary-foreground dark:text-card-foreground hover:text-accent dark:hover:text-accent transition-colors">
                 سياسة الخصوصية
               </Link>
               <Link href="/contact" className="text-primary-foreground dark:text-card-foreground hover:text-accent dark:hover:text-accent transition-colors">
                 اتصل بنا
               </Link>
               <span className="hidden md:inline">|</span> {/* Separator for desktop */}
               <span>
                 Powered by Firebase Studio & Genkit
               </span>
             </div>
           </div>
         </footer>
    </div>
  );
}
