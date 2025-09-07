'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus('submitting');
    
    try {
      const response = await fetch('https://formspree.io/f/xpwjkrdd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <div className="relative rounded-lg border border-border bg-card p-8 text-left shadow-elevated">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your Name" 
                    {...field}
                    name="name"
                    className="bg-background focus:ring-accent focus:ring-offset-0 focus:ring-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your.email@example.com"
                    type="email"
                    {...field}
                    name="email"
                    className="bg-background focus:ring-accent focus:ring-offset-0 focus:ring-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me about your project or idea..."
                    {...field}
                    name="message"
                    className="min-h-[120px] bg-background focus:ring-accent focus:ring-offset-0 focus:ring-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={status === 'submitting'}
            className="group relative w-full bg-gradient-to-b from-zinc-800 to-zinc-900 text-foreground transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50"
          >
             {status === 'submitting' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <div className="absolute inset-0 rounded-lg border border-white/10 transition-all duration-200 group-hover:border-white/20" />
            {status === 'submitting' ? 'Sending...' : 'Submit'}
          </Button>
          {status === 'success' && (
            <p className="text-center text-green-600 mt-4">Thank you for your message!</p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-600 mt-4">Something went wrong. Please try again.</p>
          )}
        </form>
      </Form>
    </div>
  );
}
