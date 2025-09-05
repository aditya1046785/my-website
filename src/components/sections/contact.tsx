import { Container } from '@/components/container';
import { ContactForm } from '@/components/contact-form';

export function Contact() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-2xl text-center">
        <h2 className="mb-4">Get in Touch</h2>
        <p className="mb-8 text-muted-foreground">
          Have a project in mind, want to collaborate, or just say hi? I'd love to hear from you.
        </p>
        <ContactForm />
      </Container>
    </section>
  );
}
