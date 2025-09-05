'use client';

import { useState } from 'react';
import type { Project } from '@/lib/data';
import { Tag } from './tag';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { ProjectDetailModal } from './project-detail-modal';
import Link from 'next/link';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Icon, title, description, tech, href } = project;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent modal from opening if a link or button inside the card is clicked
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    if (href === '#') {
      e.preventDefault();
      setIsModalOpen(true);
    } else {
        window.location.href = href;
    }
  };

  const CardContent = () => (
    <>
      <Icon className="mb-4 h-8 w-8 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <div className="mt-auto pt-6">
        {href === '#' ? (
          <Button variant="ghost" size="sm" className="w-full justify-start px-0 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Link href={href} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="ghost" size="sm" className="w-full justify-start px-0 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground">
              Launch Tool
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </>
  );

  return (
    <>
      <div
        onClick={handleCardClick}
        className={cn(
          "group relative flex h-full cursor-pointer flex-col rounded-lg bg-card p-6 shadow-elevated transition-transform duration-300 ease-out hover:-translate-y-1"
        )}
      >
        <div className="absolute inset-[-1px] z-[-1] rounded-[9px] bg-gradient-to-b from-[#333333] to-[#222222] transition-all duration-300 group-hover:from-accent/50 group-hover:to-accent/20" />
        <div className="absolute inset-0 z-[-2] rounded-lg bg-black/50 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
        <CardContent />
      </div>
      {href === '#' && <ProjectDetailModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} project={project} />}
    </>
  );
}
