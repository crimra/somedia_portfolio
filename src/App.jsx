import { HeroWithMascot } from './components/hero/HeroWithMascot';
import { Header } from './components/layout/Header';
import BounceCards from './components/covers/BounceCards';

const coverImages = [
  "https://picsum.photos/400/400?grayscale",
  "https://picsum.photos/500/500?grayscale",
  "https://picsum.photos/600/600?grayscale",
  "https://picsum.photos/700/700?grayscale",
  "https://picsum.photos/300/300?grayscale",
  "https://picsum.photos/450/450?grayscale",
  "https://picsum.photos/550/550?grayscale",
  "https://picsum.photos/350/350?grayscale",
  "https://picsum.photos/650/650?grayscale"
];

const transformStyles = [
  "rotate(10deg) translate(-240px)",
  "rotate(5deg) translate(-170px)",
  "rotate(0deg) translate(-85px)",
  "rotate(-3deg)",
  "rotate(0deg) translate(85px)",
  "rotate(-3deg) translate(170px)",
  "rotate(-5deg) translate(240px)",
  "rotate(-5deg) translate(310px)",
  "rotate(-8deg) translate(380px)"
];

// Ordre z-index personnalisé : 6e derrière 5e, 7e derrière 6e, 8e derrière 7e, 9e derrière 8e
const zIndexOrder = [
  0, // carte 1
  1, // carte 2  
  2, // carte 3
  3, // carte 4
  5, // carte 5 (plus haut)
  4, // carte 6 (derrière carte 5)
  3, // carte 7 
  2, // carte 8 (plus haut)
  1  // carte 9 (derrière carte 8)
];

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroWithMascot />
      
      {/* Section Portfolio séparée si nécessaire plus tard */}
      {/* 
      <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            Explorez nos projets
          </h2>
          <BounceCards
            className="custom-bounceCards"
            images={coverImages}
            containerWidth={900}
            containerHeight={300}
            animationDelay={1}
            animationStagger={0.06}
            easeType="elastic.out(1, 0.5)"
            transformStyles={transformStyles}
            zIndexOrder={zIndexOrder}
            enableHover={true}
          />
        </div>
      </section>
      */}
    </div>
  );
}