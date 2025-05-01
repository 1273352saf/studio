
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
  // 1. Validate the data
  // 2. Send an email or save to a database
  // 3. Redirect or show a success/error message

  // For now, just log and maybe show a toast (requires client-side handling)
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Mail className="h-7 w-7" />
          اتصل بنا
        </h1>
        <p className="text-muted-foreground mt-2">
          يسعدنا تواصلك معنا. املأ النموذج أدناه.
        </p>
      </header>
      <main>
        <form action={submitContactForm} className="max-w-lg mx-auto space-y-4">
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
      </main>
    </div>
  );
}
