import { HeroWithMascot } from './components/hero/HeroWithMascot';
import { Header } from './components/layout/Header';
import { Portfolio } from './components/sections/Portfolio';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pb-8 md:pb-12 bg-gradient-to-br from-white via-pink-50 to-white">
        <HeroWithMascot />
      </div>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

