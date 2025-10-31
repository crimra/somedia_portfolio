import { motion } from 'framer-motion';
import DomeGallery from '../gallery/DomeGallery';

export const Portfolio = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white relative">
      {/* Header section */}
      <div className="relative z-10 pt-20 pb-8 text-center">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Notre <span className="text-primary">Portfolio</span>
          </h2>
          {/*<p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Découvrez nos créations et réalisations. Chaque projet raconte une histoire unique.
          </p>*/}
          <div className="mt-6 text-sm text-gray-600">
            Glissez pour explorer la galerie
          </div>
        </motion.div>
      </div>

      {/* Gallery section */}
      <div className="absolute inset-0 pt-32">
        <DomeGallery />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-pink-50 to-transparent z-5 pointer-events-none" />
    </section>
  );
};