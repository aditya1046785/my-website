import type { ComponentType } from 'react';
import { ResumeIcon, ChatIcon, FileIcon, EyeIcon, BoltIcon } from '@/components/icons';

export type Project = {
  id: string;
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
  tech: string[];
  href: string;
  span?: 'col-span-2' | 'col-span-1';
};

export const projects: Project[] = [
  {
    id: 'resume-crafter',
    title: 'Resume Crafter AI',
    description: 'Guides users to articulate impact with structured prompts and ATS-ready export.',
    Icon: ResumeIcon,
    tech: ['Next.js', 'TypeScript', 'OpenAI'],
    href: '/resume-crafter',
    span: 'col-span-2',
  },
  {
    id: 'interview-genius',
    title: 'Interview Genius',
    description: 'Adaptive mock interviews with scoring and targeted feedback.',
    Icon: ChatIcon,
    tech: ['React', 'LLMs', 'RAG'],
    href: '#',
  },
  {
    id: 'doc-summarizer',
    title: 'Doc Summarizer',
    description: 'Chunking + citations for trustworthy summaries.',
    Icon: FileIcon,
    tech: ['Vercel', 'Embeddings'],
    href: '#',
  },
  {
    id: 'vision-notes',
    title: 'Vision Notes',
    description: 'Image understanding for study notes and flashcards.',
    Icon: EyeIcon,
    tech: ['Vision', 'Next.js'],
    href: '#',
  },
  {
    id: 'auto-scripts',
    title: 'Auto Scripts',
    description: 'Small automations for daily developer chores.',
    Icon: BoltIcon,
    tech: ['Node', 'CLI'],
    href: '#',
  },
];

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  ResumeIcon,
  ChatIcon,
  FileIcon,
  EyeIcon,
  BoltIcon,
};

export function getIconByName(name: string): ComponentType<{ className?: string }> {
  return iconMap[name] || FileIcon;
}
