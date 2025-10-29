import { motion } from 'framer-motion';
import mascot from '../../assets/Kichoto.png';
import BounceCards from '../covers/BounceCards';

const heroCardImages = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23FF1493' rx='15'/%3E%3C/svg%3E", // Rose
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23FBBF24' rx='15'/%3E%3C/svg%3E", // Jaune
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%2322D3EE' rx='15'/%3E%3C/svg%3E", // Cyan
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23111827' rx='15'/%3E%3C/svg%3E", // Noir
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23FBBF24' rx='15'/%3E%3C/svg%3E", // Jaune
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23FF1493' rx='15'/%3E%3C/svg%3E"  // Rose
];

const heroTransformStyles = [
  "rotate(8deg) translate(-200px, 10px)",
  "rotate(-3deg) translate(-120px, -5px)", 
  "rotate(2deg) translate(-40px, 8px)",
  "rotate(-1deg) translate(40px, -3px)",
  "rotate(4deg) translate(120px, 5px)",
  "rotate(-6deg) translate(200px, -8px)"
];

const heroTooltips = [
  "Design & Branding",
  "Développement Web",
  "Marketing Digital", 
  "Stratégie Creative",
  "Communication",
  "Innovation"
];

export const HeroWithMascot = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-pink-50 to-white px-6 overflow-hidden pt-20">
      <div className="container mx-auto flex flex-col items-center justify-center gap-0 max-w-7xl">

        {/* Titre en haut */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Chaque projet est une <span className="text-primary">signature</span>,<br />
            voici la <span className="text-primary">nôtre</span>.
          </h1>
        </motion.div>

        {/* Mascotte + BounceCards sur la même ligne */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-0">
          {/* Mascotte à gauche */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center relative"
          >
            <img 
              src={mascot} 
              alt="Mascotte SoMedia" 
              className="w-40 md:w-48 lg:w-56 drop-shadow-2xl"
            />
          </motion.div>

          {/* BounceCards à droite */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative">
              <BounceCards
                images={heroCardImages}
                containerWidth={500}
                containerHeight={160}
                animationDelay={1.2}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.5)"
                transformStyles={heroTransformStyles}
                enableHover={true}
                tooltips={heroTooltips}
              />
            </div>
          </motion.div>
        </div>

        {/* Texte et boutons en bas */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center space-y-3 text-center"
        >
          <p className="text-sm md:text-base text-gray-600 max-w-sm p-3 rounded">
            L'agence de communication qui booste votre notoriété
          </p>
          
          <div className="flex gap-3 justify-center flex-wrap">
            <button className="px-5 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm">
              Contact
            </button>
            <button className="px-5 py-2 text-gray-700 font-semibold hover:text-gray-900 transition-colors text-sm">
              Explore
            </button>
          </div>
        </motion.div>
      </div>

      {/* Sticky note animée */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-20 right-10 rotate-12 hidden lg:block"
      >
        <div className="bg-yellow-300 p-3 rounded-lg shadow-lg text-sm font-bold text-gray-800 whitespace-nowrap">
          Idée #1
        </div>
      </motion.div>
    </section>
  );
};