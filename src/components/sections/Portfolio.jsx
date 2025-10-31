import { motion } from 'framer-motion';
import DomeVideoGallery from '../gallery/DomeVideoGallery';

const portfolioVideos = [
  {
    video: 'https://res.cloudinary.com/demo/video/upload/v1/portfolio/brand_2025.mp4',
    cover: 'https://res.cloudinary.com/demo/image/upload/v1/portfolio/brand_2025.jpg',
    title: 'Campagne LCFM',
    client: 'LCFM',
    year: 2025,
  },
  {
    video: 'https://res.cloudinary.com/demo/video/upload/v1/portfolio/marketing_2025.mp4',
    cover: 'https://res.cloudinary.com/demo/image/upload/v1/portfolio/marketing_2025.jpg',
    title: 'Stratégie Digitale',
    client: 'sOmedia',
    year: 2025,
  },
  {
    video: 'https://res.cloudinary.com/demo/video/upload/v1/portfolio/design_2025.mp4',
    cover: 'https://res.cloudinary.com/demo/image/upload/v1/portfolio/design_2025.jpg',
    title: 'Identité Visuelle',
    client: 'Portfolio',
    year: 2025,
  },
  // Ajout vidéos ici
];

export const Portfolio = () => {
  return (
    <section className="min-h-screen bg-black relative">
      {/* Header section */}
      <div className="relative z-10 pt-20 pb-8 text-center">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Notre <span className="text-primary">Portfolio</span>
          </h2>
          {/*<p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez nos créations et réalisations. Chaque projet raconte une histoire unique.
          </p>*/}
          <div className="mt-6 text-sm text-gray-400">
            Glissez pour explorer • Cliquez pour voir les vidéos
          </div>
        </motion.div>
      </div>

      {/* Gallery section */}
      <div className="absolute inset-0 pt-32">
        <DomeVideoGallery videos={portfolioVideos} />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-5 pointer-events-none" />
    </section>
  );
};