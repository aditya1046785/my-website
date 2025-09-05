'use client';

import { useState, useTransition } from 'react';
import { Container } from '@/components/container';
import { ProjectCard } from '@/components/project-card';
import { projects as initialProjects, type Project } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { filterProjectsAction } from '@/app/actions';
import { Search } from 'lucide-react';
import { getIconByName } from '@/lib/data';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [keywords, setKeywords] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    startTransition(async () => {
      if (keywords.trim() === '') {
        setProjects(initialProjects);
        return;
      }
      const filteredProjectsResult = await filterProjectsAction({
        projects: initialProjects,
        keywords,
      });

      const filteredProjectsWithIcons = filteredProjectsResult.map(p => ({
        ...p,
        Icon: getIconByName(p.icon),
      })).filter(p => p.Icon);

      setProjects(filteredProjectsWithIcons as Project[]);
    });
  };

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4">AI-Powered Tools</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A collection of projects where I explore the intersection of AI, design, and development.
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-lg">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Filter projects by keywords (e.g., 'React', 'OpenAI')..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-card"
            />
            <Button onClick={handleSearch} disabled={isPending}>
              <Search className="mr-2 h-4 w-4" />
              {isPending ? 'Filtering...' : 'Filter'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className={project.span}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        {projects.length === 0 && !isPending && (
          <p className="mt-8 text-center text-muted-foreground">No projects found for these keywords.</p>
        )}
      </Container>
    </section>
  );
}
