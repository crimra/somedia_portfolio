import { motion } from 'framer-motion';
import DomeVideoGallery from '../gallery/DomeVideoGallery';
// Import temporaire pour test
import { getVideoUrlDirect, getVideoThumbnailDirect } from '../../utils/cloudinary-debug';

const portfolioVideos = [
  {
    video: getVideoUrlDirect('BGFI_zmkb55'),
    cover: getVideoThumbnailDirect('BGFI_zmkb55', 0),
    title: 'Campagne BGFI Bank',
    client: 'BGFI Bank',
  },
  {
    video: getVideoUrlDirect('Aerco_2_ani9li'),
    cover: getVideoThumbnailDirect('Aerco_2_ani9li', 0),
    title: 'Aérco Campaign 2',
    client: 'Aérco',
  },
  {
    video: getVideoUrlDirect('IMMO_vfgboy'),
    cover: getVideoThumbnailDirect('IMMO_vfgboy', 0),
    title: 'Immobilier Digital',
    client: 'Immobilier',
  },
  {
    video: getVideoUrlDirect('aerco_14_gcwe31'),
    cover: getVideoThumbnailDirect('aerco_14_gcwe31', 0),
    title: 'Aérco Série 14',
    client: 'Aérco',
  },
  {
    video: getVideoUrlDirect('Aerco_4_jrupjv'),
    cover: getVideoThumbnailDirect('Aerco_4_jrupjv', 0),
    title: 'Aérco Campaign 4',
    client: 'Aérco',
  },
  {
    video: getVideoUrlDirect('PEA_s8omps'),
    cover: getVideoThumbnailDirect('PEA_s8omps', 0),
    title: 'PEA Corporate',
    client: 'PEA',
  },
  {
    video: getVideoUrlDirect('Aerco_salon_EBENE_s9jwa9'),
    cover: getVideoThumbnailDirect('Aerco_salon_EBENE_s9jwa9', 0),
    title: 'Salon Ébène Aérco',
    client: 'Aérco',
  },
  {
    video: getVideoUrlDirect('BGFI_SPOT_2_gwqp2i'),
    cover: getVideoThumbnailDirect('BGFI_SPOT_2_gwqp2i', 0),
    title: 'BGFI Spot 2',
    client: 'BGFI Bank',
  },
  {
    video: getVideoUrlDirect('Aerco_16_bgwe68'),
    cover: getVideoThumbnailDirect('Aerco_16_bgwe68', 0),
    title: 'Aérco Série 16',
    client: 'Aérco',
  },
  {
    video: getVideoUrlDirect('AERCO_1_oqycrm'),
    cover: getVideoThumbnailDirect('AERCO_1_oqycrm', 0),
    title: 'Aérco Premier',
    client: 'Aérco',
  },
  {
    video: getVideoUrlDirect('BCI_OBOSSO_UB_z5qwhe'),
    cover: getVideoThumbnailDirect('BCI_OBOSSO_UB_z5qwhe', 0),
    title: 'BCI Obosso UB',
    client: 'BCI',
  },
  {
    video: getVideoUrlDirect('AERCO_1er_Mai_hnnvbh'),
    cover: getVideoThumbnailDirect('AERCO_1er_Mai_hnnvbh', 0),
    title: 'Aérco 1er Mai',
    client: 'Aérco',
  },
  {
    video: getVideoUrlDirect('A_tkmxoz'),
    cover: getVideoThumbnailDirect('A_tkmxoz', 0),
    title: 'Projet A',
    client: 'sOmedia',
  },
  {
    video: getVideoUrlDirect('Lays_nouveau_look_exacfk'),
    cover: getVideoThumbnailDirect('Lays_nouveau_look_exacfk', 0),
    title: 'Lays Nouveau Look',
    client: 'Lays',
  },
  {
    video: getVideoUrlDirect('video_publicitaire_de_la_nouvelle_boisson_jcxhme'),
    cover: getVideoThumbnailDirect('video_publicitaire_de_la_nouvelle_boisson_jcxhme', 0),
    title: 'Nouvelle Boisson',
    client: 'Boisson',
  },
  {
    video: getVideoUrlDirect('Spot_publicitaire_La_cathedrale_tcnwtq'),
    cover: getVideoThumbnailDirect('Spot_publicitaire_La_cathedrale_tcnwtq', 0),
    title: 'La Cathédrale',
    client: 'Cathédrale',
  },
  {
    video: getVideoUrlDirect('AERCO_0_rsit2u'),
    cover: getVideoThumbnailDirect('AERCO_0_rsit2u', 0),
    title: 'Aérco Zéro',
    client: 'Aérco',
  }
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