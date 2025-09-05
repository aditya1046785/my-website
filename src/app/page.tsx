import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div id="projects" className="scroll-mt-20">
          <Projects />
        </div>
        <div id="about" className="scroll-mt-20">
          <About />
        </div>
        <div id="contact" className="scroll-mt-20">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
