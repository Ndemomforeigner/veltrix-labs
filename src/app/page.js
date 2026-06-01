import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Features from "@/sections/Features";
import Stats from "@/sections/Stats";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <Stats />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}