
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar'; // Import Navbar
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components

// Simple server action placeholder
async function submitContactForm(formData: FormData) {
  'use server';
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  console.log('Contact Form Submission:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  // Here you would typically:
  // 1. Validate the data (using Zod on the server is a good practice)
  // 2. Send an email (using a service like Resend/SendGrid) or save to a database (like Firestore)
  // 3. Redirect or show a success/error message (using react-hot-toast or similar)

  // For now, just log
  // Consider adding a success/error state and displaying it to the user.
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       {/* Navbar */}
       <Navbar className="mb-6" />

      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Mail className="h-7 w-7" />
          اتصل بنا
        </h1>
        <p className="text-muted-foreground mt-2">
          يسعدنا تواصلك معنا. املأ النموذج أدناه أو استخدم معلومات الاتصال.
        </p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
             <CardTitle>نموذج الاتصال</CardTitle>
          </CardHeader>
          <CardContent>
             <form action={submitContactForm} className="space-y-4">
               <div>
                 <Label htmlFor="name">الاسم</Label>
                 <Input
                   id="name"
                   name="name"
                   type="text"
                   required
                   placeholder="اسمك الكامل"
                   className="mt-1"
                 />
               </div>
               <div>
                 <Label htmlFor="email">البريد الإلكتروني</Label>
                 <Input
                   id="email"
                   name="email"
                   type="email"
                   required
                   placeholder="you@example.com"
                   className="mt-1"
                 />
               </div>
               <div>
                 <Label htmlFor="message">رسالتك</Label>
                 <Textarea
                   id="message"
                   name="message"
                   required
                   placeholder="اكتب رسالتك هنا..."
                   className="mt-1"
                   rows={5}
                 />
               </div>
               <Button type="submit" className="w-full">
                 إرسال الرسالة
               </Button>
             </form>
          </CardContent>
        </Card>

         <Card>
            <CardHeader>
               <CardTitle>معلومات أخرى</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <h3 className="font-semibold">البريد الإلكتروني للدعم:</h3>
                  <a href="mailto:support@example.com" className="text-accent hover:underline">support@example.com</a>
               </div>
               <div>
                  <h3 className="font-semibold">العنوان (مثال):</h3>
                  <p className="text-muted-foreground">123 شارع الأخبار، مدينة الكوله، محافظة سوهاج، مصر</p>
               </div>
                {/* Add social media links again if desired */}
            </CardContent>
         </Card>
      </main>
    </div>
  );
}
