import { Container } from './container';

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <Container className="flex h-16 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} cerecrafts. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
