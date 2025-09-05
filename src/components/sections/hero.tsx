'use client';

import { Container } from '@/components/container';
import { TypingAnimation } from '@/components/typing-animation';
import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

const H1_PHRASES = [
  'Building clean, fast, thoughtful software.',
  'Designing AI‑powered tools people love.',
];

export function Hero() {
  const handleScrollTo = useSmoothScroll();

  return (
    <section className="py-24 text-center sm:py-32 md:py-40">
      <Container>
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Full-Stack Developer & AI Enthusiast
        </p>
        <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl">
          <TypingAnimation phrases={H1_PHRASES} typingSpeed={80} deletingSpeed={40} />
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
          With years of experience in crafting high-quality digital experiences, I specialize in building intelligent, user-centric applications. My focus is on combining clean design with powerful AI functionalities to create tools that are not only useful but also a pleasure to use.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="group relative bg-gradient-to-b from-zinc-800 to-zinc-900 text-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 rounded-lg border border-white/10 transition-all duration-200 group-hover:border-white/20" />
            View My Work
          </Button>
        </div>
      </Container>
    </section>
  );
}
