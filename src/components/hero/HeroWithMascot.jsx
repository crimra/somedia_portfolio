import { motion } from 'framer-motion';
import mascot from '../../assets/Kichoto.png';
import BounceCards from '../covers/BounceCards';
import { getVideoThumbnailDirect } from '../../utils/cloudinary-debug';

const heroCardImages = [
  getVideoThumbnailDirect('BCI_OBOSSO_UB_z5qwhe', 0), // BCI
  getVideoThumbnailDirect('video_publicitaire_de_la_nouvelle_boisson_jcxhme', 0), // Boisson
  getVideoThumbnailDirect('AERCO_0_rsit2u', 0), // AERCO ZERO
  getVideoThumbnailDirect('Lays_nouveau_look_exacfk', 0), // Lays
  getVideoThumbnailDirect('AERCO_1er_Mai_hnnvbh', 0), // AERCO 1er mai
  getVideoThumbnailDirect('AERCO_1_oqycrm', 0) // AERCO premier
];

// Couleurs d'overlay pour chaque carte (gardées comme avant)
const heroCardColors = [
  "rgba(255, 20, 147, 0.7)", // Rose pour BCI
  "rgba(251, 191, 36, 0.7)", // Jaune pour Boisson  
  "rgba(34, 211, 238, 0.7)", // Cyan pour AERCO ZERO
  "rgba(17, 24, 39, 0.7)", // Noir pour Lays
  "rgba(251, 191, 36, 0.7)", // Jaune pour AERCO 1er mai
  "rgba(255, 20, 147, 0.7)"  // Rose pour AERCO premier
];

// Couleurs des bulles d'information (correspondantes aux cartes)
const heroTooltipColors = [
  "#FF1493", // Rose pour BCI
  "#FBBF24", // Jaune pour Boisson  
  "#22D3EE", // Cyan pour AERCO ZERO
  "#111827", // Noir pour Lays
  "#FBBF24", // Jaune pour AERCO 1er mai
  "#FF1493"  // Rose pour AERCO premier
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
  "BCI",
  "Boisson",
  "AERCO Lutte corruption", 
  "Lays",
  "AERCO 1er Mai",
  "AERCO Travaux AA Neto"
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
                overlayColors={heroCardColors}
                tooltipColors={heroTooltipColors}
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
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 hover:scale-105 hover:shadow-lg transition-all duration-300 transform text-sm"
            >
              Contact
            </button>
            <button 
              onClick={() => {
                const portfolioSection = document.getElementById('portfolio');
                portfolioSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300 transform rounded-lg text-sm"
            >
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
        #Kichoto
        </div>
      </motion.div>
    </section>
  );
};