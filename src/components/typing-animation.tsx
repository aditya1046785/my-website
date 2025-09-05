'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type TypingAnimationProps = {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
};

export function TypingAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className,
}: TypingAnimationProps) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        if (charIndex > 0) {
          setText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
          timeoutRef.current = setTimeout(handleTyping, deletingSpeed);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      } else {
        if (charIndex < currentPhrase.length) {
          setText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
          timeoutRef.current = setTimeout(handleTyping, typingSpeed);
        } else {
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, typingSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={cn('relative', className)}>
      {text}
      <span className="animate-pulse">|</span>
      <span className="sr-only">{phrases[phraseIndex]}</span>
    </span>
  );
}
