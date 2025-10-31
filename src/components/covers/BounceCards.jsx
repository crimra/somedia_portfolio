import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function BounceCards({
  className = '',
  images = [],
  overlayColors = [], // Nouvelle prop pour les couleurs d'overlay
  tooltipColors = [], // Nouvelle prop pour les couleurs des tooltips
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = false,
  zIndexOrder = null, // Ordre z-index personnalisé
  tooltips = [
    'Design graphique',
    'Développement web',
    'Marketing digital',
    'Stratégie de marque',
    'Communication',
    'Innovation'
  ] // Textes des bulles d'info
}) {
  useEffect(() => {
    gsap.fromTo(
      '.card',
      { scale: 0 },
      {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay
      }
    );
  }, [animationDelay, animationStagger, easeType]);

  const getNoRotationTransform = transformStr => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = hoveredIdx => {
    if (!enableHover) return;

    images.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform);
        gsap.to(selector, {
          transform: noRotation,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto'
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto'
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover) return;

    images.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || 'none';
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto'
      });
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight
      }}
    >
      {images.map((src, idx) => {
        // Calcul du z-index : par défaut c'est l'index, sinon utilise zIndexOrder
        const zIndex = zIndexOrder ? zIndexOrder[idx] || idx : idx;
        
        return (
          <div
            key={idx}
            className={`card card-${idx} absolute w-[200px] aspect-square group`}
            style={{
              transform: transformStyles[idx] || 'none',
              zIndex: zIndex
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            {/* Image avec bordure et overflow */}
            <div className="w-full h-full border-8 border-white rounded-[30px] overflow-hidden relative bg-white" style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
              <img 
                className="w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-opacity duration-300" 
                src={src} 
                alt={`card-${idx}`} 
              />
              
              {/* Overlay color disparait au hover */}
              {overlayColors[idx] && (
                <div 
                  className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${overlayColors[idx]}, ${overlayColors[idx].replace('0.7', '0.4')})`,
                    mixBlendMode: 'multiply'
                  }}
                />
              )}
            </div>
            
            {/* Bulle d'information au hover */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[100]">
              <div className="text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap" style={{ backgroundColor: tooltipColors[idx] || '#E84361' }}>
                {tooltips[idx] || `Carte ${idx + 1}`}
                {/* Petite flèche vers le bas */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{ borderTopColor: tooltipColors[idx] || '#E84361' }}></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}