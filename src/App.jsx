import { HeroWithMascot } from './components/hero/HeroWithMascot';
import { Header } from './components/layout/Header';
import { Portfolio } from './components/sections/Portfolio';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroWithMascot />
      <Portfolio />
      <Contact />
    </div>
  );
}