'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Logo } from './icons';
import { Button } from './ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScrollTo = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled ? 'border-b border-border/50 bg-background/80 backdrop-blur-lg' : ''
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#" onClick={(e) => handleScrollTo(e, '#')} aria-label="Back to top">
          <Logo />
        </a>
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={(e) => handleScrollTo(e, '#contact')}
        >
          Get in Touch
        </Button>
      </Container>
    </header>
  );
}
