import Image from 'next/image';
import { Container } from '@/components/container';
import { CheckCircle } from 'lucide-react';

const skills = [
  'Next.js & React',
  'TypeScript & JavaScript',
  'Node.js & Python',
  'Tailwind CSS',
  'AI & LLM Integration',
  'UI/UX Design',
];

export function About() {
  return (
    <section className="bg-card/50 py-24 sm:py-32">
      <Container>
        <div className="relative rounded-lg border border-border bg-card p-8 shadow-elevated md:p-12">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="relative mb-6 h-32 w-32 md:h-40 md:w-40">
                <Image
                  src="https://picsum.photos/200/200"
                  alt="Portrait of the author"
                  width={200}
                  height={200}
                  className="rounded-full object-cover"
                  data-ai-hint="professional headshot"
                />
                 <div className="absolute inset-[-2px] z-[-1] rounded-full bg-gradient-to-b from-accent/50 to-accent/20" />
              </div>
              <h2 className="mb-2 text-2xl">About Me</h2>
              <p className="text-sm text-muted-foreground">
                A brief look into my background and skills.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Hello! I'm Aditya , a Computer Science student with a core belief: the best way to understand technology is to build with it. My fascination isn't just with the theory of AI, but with its practical application in creating clean, fast, and thoughtful software.
                </p>
                <p>
                  This portfolio is a showcase of that philosophy. Each project here is a tool I've built to solve a real-world problem, combining intelligent design with powerful AI functionalities. My focus is on delivering experiences that are not only useful but also a pleasure to use.
                </p>
                 <p>
                  I'm on a journey to build impactful digital products, one line of code at a time.
                </p>
                <div className="space-y-4 rounded-lg border border-border/50 bg-background/50 p-6">
                  <h4 className="font-semibold text-foreground">Core Skills</h4>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
