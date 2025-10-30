import { HeroWithMascot } from './components/hero/HeroWithMascot';
import { Header } from './components/layout/Header';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroWithMascot />
    </div>
  );
}