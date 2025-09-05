import type { ReactNode } from 'react';

type TagProps = {
  children: ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-block rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
      {children}
    </span>
  );
}
