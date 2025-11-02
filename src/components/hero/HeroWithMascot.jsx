import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
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

const heroCardColors = [
  "rgba(255, 20, 147, 0.7)", // Rose pour BCI
  "rgba(251, 191, 36, 0.7)", // Jaune pour Boisson  
  "rgba(34, 211, 238, 0.7)", // Cyan pour AERCO ZERO
  "rgba(17, 24, 39, 0.7)", // Noir pour Lays
  "rgba(251, 191, 36, 0.7)", // Jaune pour AERCO 1er mai
  "rgba(255, 20, 147, 0.7)"  // Rose pour AERCO premier
];

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

// Composant de cartes swipe pour mobile avec effet pile inclinée
const SwipeCards = ({ cards, overlayColors, tooltipColors, tooltips }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [draggedCards, setDraggedCards] = useState([]);
  const [clickedCard, setClickedCard] = useState(null);
  
  const dragConstraints = { left: -200, right: 200 };
  
  const handleDragEnd = (cardIndex, info) => {
    const threshold = 100;
    const offset = info.offset.x;
    
    if (Math.abs(offset) > threshold) {
      // Carte swipée - ajouter à la liste des cartes supprimées
      setDraggedCards(prev => [...prev, cardIndex]);
      
      // Passer à la carte suivante après un délai
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        // Réinitialiser les cartes supprimées si on a fait le tour
        if (draggedCards.length >= cards.length - 1) {
          setDraggedCards([]);
        }
      }, 300);
    }
  };
  
  const getVisibleCards = () => {
    const visibleCount = 3; // Nombre de cartes visibles dans la pile
    const result = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const cardIndex = (currentIndex + i) % cards.length;
      if (!draggedCards.includes(cardIndex)) {
        result.push({
          index: cardIndex,
          zIndex: visibleCount - i,
          scale: 1 - i * 0.05,
          rotate: (i * 2 - 1) * (i + 1), // Rotation alternée
          y: i * 8,
          opacity: 1 - i * 0.1
        });
      }
    }
    
    return result;
  };
  
  const resetCards = () => {
    setDraggedCards([]);
    setCurrentIndex(0);
  };
  
  return (
    <div className="relative w-full max-w-xs mx-auto h-96 flex items-center justify-center">
      <div className="relative w-64 h-80">
        {/* Pile de cartes */}
        {getVisibleCards().map((cardData, stackIndex) => (
          <motion.div
            key={`${cardData.index}-${currentIndex}`}
            drag={stackIndex === 0 ? "x" : false} // Seule la première carte est draggable
            dragConstraints={dragConstraints}
            dragElastic={0.2}
            onDragEnd={(event, info) => handleDragEnd(cardData.index, info)}
            initial={{
              scale: cardData.scale,
              rotate: cardData.rotate,
              y: cardData.y,
              opacity: cardData.opacity,
              zIndex: cardData.zIndex
            }}
            animate={{
              scale: cardData.scale,
              rotate: cardData.rotate,
              y: cardData.y,
              opacity: cardData.opacity,
              zIndex: cardData.zIndex
            }}
            exit={{
              x: 300,
              rotate: 30,
              opacity: 0,
              transition: { duration: 0.3 }
            }}
            whileDrag={{
              scale: 1.05,
              rotate: 0,
              zIndex: 10,
              transition: { duration: 0.1 }
            }}
            style={{
              zIndex: cardData.zIndex
            }}
            className={`absolute w-full h-full group ${stackIndex === 0 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
            onClick={(e) => {
              e.stopPropagation();
              setClickedCard(clickedCard === cardData.index ? null : cardData.index);
            }}
          >
            <div className="w-full h-full border-4 border-white rounded-2xl overflow-hidden bg-white shadow-2xl relative">
              <img 
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  clickedCard === cardData.index ? 'opacity-100' : 'opacity-20'
                }`}
                src={cards[cardData.index]} 
                alt={`card-${cardData.index}`} 
                draggable={false}
              />
              
              {/* Overlay avec couleur - disparaît au clic comme sur grand écran */}
              {overlayColors[cardData.index] && (
                <div 
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    clickedCard === cardData.index ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{ 
                    background: `linear-gradient(135deg, ${overlayColors[cardData.index]}, ${overlayColors[cardData.index].replace('0.7', '0.4')})`,
                    mixBlendMode: 'multiply'
                  }}
                />
              )}
              
              {/* Infos en bas - visible seulement sur la première carte */}
              {stackIndex === 0 && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.8,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                >
                  <h3 className="text-white font-bold text-lg">{tooltips[cardData.index]}</h3>
                  <p className="text-white/80 text-sm">Projet sOmedia</p>
                </motion.div>
              )}
            </div>

            {/* Bulle d'information au clic - centrée à l'écran */}
            {clickedCard === cardData.index && (
              <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none z-[100]">
                <div 
                  className="text-white text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap font-medium" 
                  style={{ backgroundColor: tooltipColors[cardData.index] || '#E84361' }}
                >
                  {tooltips[cardData.index] || `Carte ${cardData.index + 1}`}
                  {/* Petite flèche vers le bas */}
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" 
                    style={{ borderTopColor: tooltipColors[cardData.index] || '#E84361' }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Indicateur de progression */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* Instructions */}
      <motion.div 
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-xs text-gray-500">Glissez la carte du dessus</p>
      </motion.div>
      
      {/* Bouton reset (caché, apparaît après avoir swipé toutes les cartes) */}
      {draggedCards.length >= cards.length - 1 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={resetCards}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all"
        >
          Recommencer
        </motion.button>
      )}
    </div>
  );
};

export const HeroWithMascot = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
            Chaque projet a une <span className="text-primary">signature</span>,<br />
            voici la <span className="text-primary">nôtre</span>.
          </h1>
        </motion.div>

        {/* Mascotte + Cards - Layout adaptatif */}
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-col lg:flex-row'} items-center justify-center gap-4 lg:gap-0`}>
          {/* Mascotte */}
          <motion.div
            initial={{ x: isMobile ? 0 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center relative"
          >
            <img 
              src={mascot} 
              alt="Mascotte SoMedia" 
              className={`${isMobile ? 'w-32 md:w-40' : 'w-40 md:w-48 lg:w-56'} drop-shadow-2xl`}
            />
          </motion.div>

          {/* Cards - Conditionnel mobile/desktop */}
          <motion.div
            initial={{ x: isMobile ? 0 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex justify-center w-full"
          >
            {isMobile ? (
              <SwipeCards
                cards={heroCardImages}
                overlayColors={heroCardColors}
                tooltipColors={heroTooltipColors}
                tooltips={heroTooltips}
              />
            ) : (
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
            )}
          </motion.div>
        </div>

        {/* Texte et boutons en bas */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center space-y-3 text-center mt-8 md:mt-12"
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