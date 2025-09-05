'use client';

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
import { useToast } from '@/hooks/use-toast';
import { contactFormAction } from '@/app/actions';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await contactFormAction(values);
      if (result.success) {
        toast({
          title: 'Message Sent!',
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error(result.error || 'An unexpected error occurred.');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error instanceof Error ? error.message : 'There was a problem with your request.',
      });
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
                    className="min-h-[120px] bg-background focus:ring-accent focus:ring-offset-0 focus:ring-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full bg-gradient-to-b from-zinc-800 to-zinc-900 text-foreground transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50"
          >
             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <div className="absolute inset-0 rounded-lg border border-white/10 transition-all duration-200 group-hover:border-white/20" />
            {isSubmitting ? 'Sending...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
