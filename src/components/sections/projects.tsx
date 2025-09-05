'use client';

import { useState } from 'react';
import { Container } from '@/components/container';
import { ProjectCard } from '@/components/project-card';
import { projects as initialProjects, type Project } from '@/lib/data';

export function Projects() {
  const [projects] = useState<Project[]>(initialProjects);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4">AI-Powered Tools</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A collection of projects where I explore the intersection of AI, design, and development.
          </p>
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
        {projects.length === 0 && (
          <p className="mt-8 text-center text-muted-foreground">No projects found.</p>
        )}
      </Container>
    </section>
  );
}
