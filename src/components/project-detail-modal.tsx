'use client';

import { useState, useTransition } from 'react';
import type { Project } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tag } from './tag';
import { Button } from './ui/button';
import { generateProjectDetailsAction } from '@/app/actions';
import { Loader2, Sparkles } from 'lucide-react';

type ProjectDetailModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  project: Project;
};

export function ProjectDetailModal({ isOpen, setIsOpen, project }: ProjectDetailModalProps) {
  const { Icon, title, description, tech } = project;
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGenerateDetails = () => {
    startTransition(async () => {
      const result = await generateProjectDetailsAction({ title, tech });
      setAiDescription(result.description);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl border-border bg-card shadow-elevated">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Icon className="h-10 w-10 flex-shrink-0 text-muted-foreground" />
            <div>
              <DialogTitle className="text-2xl text-foreground">{title}</DialogTitle>
              <DialogDescription className="mt-1 text-muted-foreground">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border/50 bg-background/50 p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">AI-Generated Details</h4>
              <Button size="sm" onClick={handleGenerateDetails} disabled={isPending}>
                 {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isPending ? 'Generating...' : 'Generate'}
              </Button>
            </div>
            {isPending && (
                 <p className="mt-4 text-sm text-muted-foreground text-center">Generating a detailed project breakdown...</p>
            )}
            {aiDescription && !isPending && (
              <p className="mt-4 text-sm text-muted-foreground">{aiDescription}</p>
            )}
             {!aiDescription && !isPending && (
                 <p className="mt-4 text-sm text-muted-foreground">Click "Generate" to see an AI-powered deep dive into this project's architecture and features.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
