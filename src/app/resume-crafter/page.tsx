'use client';

import { useState, useTransition } from 'react';
import { Container } from '@/components/container';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { enhanceResumeAction } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import type { EnhanceResumeForATSOutput } from '@/ai/flows/enhance-resume-ats';

export default function ResumeCrafterPage() {
  const [resumeText, setResumeText] = useState('');
  const [result, setResult] = useState<EnhanceResumeForATSOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleEnhance = () => {
    if (resumeText.trim().length < 50) {
      toast({
        variant: 'destructive',
        title: 'Input too short',
        description: 'Please enter a resume with at least 50 characters.',
      });
      return;
    }

    startTransition(async () => {
      try {
        const enhancedResult = await enhanceResumeAction({ resumeText });
        setResult(enhancedResult);
        toast({
          title: 'Resume Enhanced!',
          description: 'Your resume has been optimized for ATS.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Enhancement Failed',
          description: 'There was an error enhancing your resume. Please try again.',
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow py-12 sm:py-20">
        <Container>
          <div className="text-center">
            <h1 className="mb-4 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-4xl text-transparent md:text-5xl [-webkit-background-clip:text]">
              Resume Crafter AI
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Paste your resume below to get AI-powered suggestions and an ATS-friendly version.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-8">
            <Card className="border-border bg-card shadow-elevated">
              <CardHeader>
                <CardTitle>Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-[300px] bg-background focus:ring-accent focus:ring-offset-0 focus:ring-2"
                />
                <Button onClick={handleEnhance} disabled={isPending} className="mt-4">
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  {isPending ? 'Enhancing...' : 'Enhance with AI'}
                </Button>
              </CardContent>
            </Card>

            {isPending && (
               <div className="flex justify-center items-center flex-col text-center">
                 <Loader2 className="h-8 w-8 animate-spin text-accent" />
                 <p className="mt-4 text-muted-foreground">Analyzing your resume...</p>
               </div>
            )}

            {result && !isPending && (
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="border-border bg-card shadow-elevated">
                  <CardHeader>
                    <CardTitle>Enhanced Resume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      readOnly
                      value={result.enhancedResumeText}
                      className="min-h-[300px] bg-background focus:outline-none"
                    />
                  </CardContent>
                </Card>
                <Card className="border-border bg-card shadow-elevated">
                  <CardHeader>
                    <CardTitle>Optimization Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.optimizationSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Wand2 className="h-4 w-4 flex-shrink-0 text-accent mt-1" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
