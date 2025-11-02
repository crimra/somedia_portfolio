import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import ReactPlayer from 'react-player';
import { getOptimizedVideoUrl, getVideoThumbnailAtTime } from '../../utils/cloudinary';

const DEFAULT_VIDEOS = [
  {
    video: getOptimizedVideoUrl('BGFI_zmkb55'),
    cover: getVideoThumbnailAtTime('BGFI_zmkb55', 0),
    title: 'Campagne Publicitaire',
    client: 'sOmedia',
    year: '2024'
  },
  {
    video: getOptimizedVideoUrl('BGFI_zmkb55'),
    cover: getVideoThumbnailAtTime('BGFI_zmkb55', 5),
    title: 'Motion Design',
    client: 'Studio Creative',
    year: '2024'
  },
  {
    video: getOptimizedVideoUrl('BGFI_zmkb55'),
    cover: getVideoThumbnailAtTime('BGFI_zmkb55', 10),
    title: 'Film Corporate',
    client: 'Entreprise Tech',
    year: '2023'
  }
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const normalizeAngle = d => ((d % 360) + 360) % 360;
const wrapAngleSigned = deg => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map(c => ({ ...c, video: '', cover: '', title: '', client: '', year: '' }));
  }

  const normalizedVideos = pool.map(video => ({
    video: video.video || '',
    cover: video.cover || '',
    title: video.title || '',
    client: video.client || '',
    year: video.year || ''
  }));

  const usedVideos = Array.from({ length: totalSlots }, (_, i) => normalizedVideos[i % normalizedVideos.length]);

  return coords.map((c, i) => ({
    ...c,
    video: usedVideos[i].video,
    cover: usedVideos[i].cover,
    title: usedVideos[i].title,
    client: usedVideos[i].client,
    year: usedVideos[i].year
  }));
}

export default function DomeVideoGallery({
  videos = DEFAULT_VIDEOS,
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#060010',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedVideoWidth = '80%',
  openedVideoHeight = '80%',
  videoBorderRadius = '20px',
  openedVideoBorderRadius = '20px'
}) {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const sphereRef = useRef(null);
  const frameRef = useRef(null);
  const viewerRef = useRef(null);
  const scrimRef = useRef(null);
  const focusedElRef = useRef(null);
  const playerRef = useRef(null);

  const [playingVideo, setPlayingVideo] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef(null);
  const draggingRef = useRef(false);
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef(null);
  const autoRotationRAF = useRef(null);
  const pointerTypeRef = useRef('mouse');
  const tapTargetRef = useRef(null);
  const openingRef = useRef(false);
  const lastDragEndAt = useRef(0);

  const scrollLockedRef = useRef(false);
  
  const preventScrollEvent = useCallback((e) => {
    // Empêcher le scroll seulement si l'événement vient de notre galerie
    const target = e.target;
    if (target.closest('.sphere-root')) {
      e.preventDefault();
    }
  }, []);
  
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    // Ne plus utiliser position: fixed, juste ajouter des listeners pour preventDefault
    document.addEventListener('touchmove', preventScrollEvent, { passive: false });
    document.addEventListener('wheel', preventScrollEvent, { passive: false });
  }, [preventScrollEvent]);
  
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
    scrollLockedRef.current = false;
    
    // Retirer les listeners
    document.removeEventListener('touchmove', preventScrollEvent);
    document.removeEventListener('wheel', preventScrollEvent);
  }, [preventScrollEvent]);

  const items = useMemo(() => buildItems(videos, segments), [videos, segments]);

  const applyTransform = (xDeg, yDeg) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis;
      switch (fitBasis) {
        case 'min':
          basis = minDim;
          break;
        case 'max':
          basis = maxDim;
          break;
        case 'width':
          basis = w;
          break;
        case 'height':
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', videoBorderRadius);
      root.style.setProperty('--enlarge-radius', openedVideoBorderRadius);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    videoBorderRadius,
    openedVideoBorderRadius
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx, vy) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          // Redémarrer l'auto-rotation après l'inertie
          setTimeout(() => {
            if (!draggingRef.current && !focusedElRef.current) {
              startAutoRotation();
            }
          }, 2000);
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          // Redémarrer l'auto-rotation après l'inertie
          setTimeout(() => {
            if (!draggingRef.current && !focusedElRef.current) {
              startAutoRotation();
            }
          }, 2000);
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  // Fonctions d'auto-rotation
  const stopAutoRotation = useCallback(() => {
    if (autoRotationRAF.current) {
      cancelAnimationFrame(autoRotationRAF.current);
      autoRotationRAF.current = null;
    }
  }, []);

  const startAutoRotation = useCallback(() => {
    if (!isAutoRotating) return;
    
    let startTime = Date.now();
    const rotationSpeed = 0.1; // degrés par frame 
    
    const animate = () => {
      if (!isAutoRotating || draggingRef.current || focusedElRef.current) {
        autoRotationRAF.current = null;
        return;
      }
      
      const currentY = rotationRef.current.y;
      const newY = currentY + rotationSpeed;
      rotationRef.current = { ...rotationRef.current, y: newY };
      applyTransform(rotationRef.current.x, rotationRef.current.y);
      
      autoRotationRAF.current = requestAnimationFrame(animate);
    };
    
    stopAutoRotation();
    autoRotationRAF.current = requestAnimationFrame(animate);
  }, [isAutoRotating]);

  // Démarrer l'auto-rotation au montage
  useEffect(() => {
    startAutoRotation();
    return stopAutoRotation;
  }, [startAutoRotation, stopAutoRotation]);

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        stopAutoRotation(); // Arrêter l'auto-rotation quand l'utilisateur glisse

        pointerTypeRef.current = event.pointerType || 'mouse';
        if (pointerTypeRef.current === 'touch') event.preventDefault();
        if (pointerTypeRef.current === 'touch') lockScroll();
        draggingRef.current = true;
        cancelTapRef.current = false;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: event.clientX, y: event.clientY };
        const potential = event.target.closest?.('.item__video');
        tapTargetRef.current = potential || null;
      },
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;

        if (pointerTypeRef.current === 'touch') event.preventDefault();

        const dxTotal = event.clientX - startPosRef.current.x;
        const dyTotal = event.clientY - startPosRef.current.y;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

        const cur = rotationRef.current;
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          draggingRef.current = false;
          let isTap = false;

          if (startPosRef.current) {
            const dx = event.clientX - startPosRef.current.x;
            const dy = event.clientY - startPosRef.current.y;
            const dist2 = dx * dx + dy * dy;
            const TAP_THRESH_PX = pointerTypeRef.current === 'touch' ? 10 : 6;
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {
              isTap = true;
            }
          }

          let [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;

          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement;
            vx = (mx / dragSensitivity) * 0.02;
            vy = (my / dragSensitivity) * 0.02;
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy);
          } else {
            // Redémarrer l'auto-rotation après 3 secondes d'inactivité
            setTimeout(() => {
              if (!draggingRef.current && !focusedElRef.current) {
                startAutoRotation();
              }
            }, 3000);
          }
          startPosRef.current = null;
          cancelTapRef.current = !isTap;

          if (isTap && tapTargetRef.current && !focusedElRef.current) {
            openVideoFromElement(tapTargetRef.current);
          }
          tapTargetRef.current = null;

          if (cancelTapRef.current) setTimeout(() => (cancelTapRef.current = false), 120);
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
          if (pointerTypeRef.current === 'touch') unlockScroll();
        }
      }
    },
    { target: mainRef, eventOptions: { passive: false } }
  );

  const openVideoFromElement = el => {
    if (openingRef.current) return;
    openingRef.current = true;
    lockScroll();
    stopAutoRotation(); // Arrêter l'auto-rotation quand on ouvre une vidéo
    const parent = el.parentElement;
    focusedElRef.current = el;

    const videoData = {
      video: parent.dataset.video,
      cover: parent.dataset.cover,
      title: parent.dataset.title,
      client: parent.dataset.client,
      year: parent.dataset.year
    };

    setPlayingVideo(videoData);
    setIsVideoPlaying(false); // Reset l'état de lecture
    setIsMuted(true); // Commencer en muet pour l'autoplay
    rootRef.current?.setAttribute('data-enlarging', 'true');
  };

  const closeVideo = useCallback(() => {
    setPlayingVideo(null);
    setIsVideoPlaying(false);
    setIsMuted(true); // Reset le son en muet
    focusedElRef.current = null;
    rootRef.current?.removeAttribute('data-enlarging');
    openingRef.current = false;
    unlockScroll();
    
    // Maintenir la position sur la section Portfolio
    setTimeout(() => {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
      setIsAutoRotating(true);
    }, 100);
  }, [unlockScroll]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') closeVideo();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeVideo]);

  // Effect pour gérer l'ouverture du modal vidéo
  useEffect(() => {
    if (playingVideo && playerRef.current) {
      // Attendre que le player soit prêt puis forcer le démarrage
      const timer = setTimeout(() => {
        try {
          if (playerRef.current && playerRef.current.getInternalPlayer) {
            const internalPlayer = playerRef.current.getInternalPlayer();
            if (internalPlayer && internalPlayer.play) {
              internalPlayer.play().catch(err => {
                // Autoplay bloqué par le navigateur
              });
            }
          }
        } catch (error) {
          // Erreur lors du démarrage automatique
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [playingVideo]);

  useEffect(() => {
    return () => {
      // Cleanup: retirer les listeners au démontage
      document.removeEventListener('touchmove', preventScrollEvent);
      document.removeEventListener('wheel', preventScrollEvent);
    };
  }, [preventScrollEvent]);

  const cssStyles = `
    .sphere-root {
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    
    .sphere-root * {
      box-sizing: border-box;
    }
    .sphere, .sphere-item, .item__video { transform-style: preserve-3d; }
    
    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }
    
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    
    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) 
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) 
                 translateZ(var(--radius));
    }
    
    .item__video {
      position: absolute;
      inset: 10px;
      border-radius: var(--tile-radius, 12px);
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: auto;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      border: 2px solid rgba(232, 67, 97, 0.2);
    }
    
    .item__video:hover {
      transform: translateZ(8px) scale(1.08);
      border-color: rgba(232, 67, 97, 0.8);
      box-shadow: 0 15px 40px rgba(232, 67, 97, 0.4);
    }
    
    .item__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      align-items: flex-end;
      padding: 12px;
      z-index: 10;
    }
    
    .item__video:hover .item__overlay {
      opacity: 1;
    }
    
    .video-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    
    .sphere-root[data-enlarging="true"] .scrim {
      opacity: 1 !important;
      pointer-events: all !important;
    }
    
    .video-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 40px;
    }
    
    .video-modal-player {
      width: 80%;
      height: 60%;
      max-width: 1000px;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
    }
    
    .video-modal-info {
      color: white;
      text-align: center;
      margin-top: 20px;
    }
    
    .video-modal-title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 10px;
      color: #E84361;
    }
    
    .video-modal-details {
      font-size: 1.2rem;
      opacity: 0.8;
    }
    
    .video-modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;
    }
    
    .video-modal-close:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div
        ref={rootRef}
        className="sphere-root relative w-full h-full bg-black"
        style={{
          ['--segments-x']: segments,
          ['--segments-y']: segments,
          ['--overlay-blur-color']: overlayBlurColor,
          ['--tile-radius']: videoBorderRadius,
          ['--enlarge-radius']: openedVideoBorderRadius
        }}
      >
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"
          style={{
            touchAction: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item absolute m-auto"
                  data-video={it.video}
                  data-cover={it.cover}
                  data-title={it.title}
                  data-client={it.client}
                  data-year={it.year}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={{
                    ['--offset-x']: it.x,
                    ['--offset-y']: it.y,
                    ['--item-size-x']: it.sizeX,
                    ['--item-size-y']: it.sizeY,
                    top: '-999px',
                    bottom: '-999px',
                    left: '-999px',
                    right: '-999px'
                  }}
                >
                  <div
                    className="item__video absolute block overflow-hidden cursor-pointer bg-gray-800 transition-all duration-300"
                    aria-label={it.title || 'Vidéo portfolio sOmedia'}
                    onClick={e => {
                      if (draggingRef.current) return;
                      if (movedRef.current) return;
                      if (performance.now() - lastDragEndAt.current < 80) return;
                      if (openingRef.current) return;
                      openVideoFromElement(e.currentTarget);
                    }}
                    onPointerUp={e => {
                      if (e.pointerType !== 'touch') return;
                      if (draggingRef.current) return;
                      if (movedRef.current) return;
                      if (performance.now() - lastDragEndAt.current < 80) return;
                      if (openingRef.current) return;
                      openVideoFromElement(e.currentTarget);
                    }}
                    onMouseEnter={() => {
                      setHoveredItem(i);
                      stopAutoRotation(); // Arrêter la rotation au survol
                    }}
                    onMouseLeave={() => {
                      setHoveredItem(null);
                      // Redémarrer la rotation après un délai
                      setTimeout(() => {
                        if (!focusedElRef.current && !draggingRef.current) {
                          setIsAutoRotating(true);
                        }
                      }, 2000); // 2 secondes de pause après avoir quitté le survol
                    }}
                    style={{
                      inset: '10px',
                      borderRadius: `var(--tile-radius, ${videoBorderRadius})`,
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    {it.cover && (
                      <img
                        src={it.cover}
                        draggable={false}
                        alt={it.title}
                        className="video-thumbnail pointer-events-none transition-all duration-300"
                        style={{
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    )}
                    <div className="item__overlay">
                      <div className="text-white">
                        <p className="font-bold text-sm">{it.title}</p>
                        <p className="text-xs opacity-80">{it.client} • {it.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(6, 0, 16, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`
            }}
          />

          <div
            className="absolute left-0 right-0 top-0 h-[120px] z-[5] pointer-events-none rotate-180"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`
            }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`
            }}
          />

          <div
            ref={viewerRef}
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
            style={{ padding: 'var(--viewer-pad)' }}
          >
            <div
              ref={scrimRef}
              className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)'
              }}
            />
            <div
              ref={frameRef}
              className="viewer-frame h-full aspect-square flex"
              style={{ borderRadius: `var(--enlarge-radius, ${openedVideoBorderRadius})` }}
            />
          </div>
        </main>

        {playingVideo && (
          <div className="video-modal" onClick={closeVideo}>
            <button className="video-modal-close" onClick={closeVideo}>
              ×
            </button>
            <div className="video-modal-player" onClick={e => e.stopPropagation()}>
              {/* Bouton de contrôle du son */}
              <button
                className="absolute top-4 right-16 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
                onClick={() => {
                  const newMutedState = !isMuted;
                  setIsMuted(newMutedState);
                  if (playerRef.current) {
                    playerRef.current.muted = newMutedState;
                  }
                }}
              >
                {isMuted ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </button>
              
              {/* Test avec élément video natif */}
              <video
                ref={playerRef}
                src={playingVideo.video}
                controls
                autoPlay
                muted={isMuted}
                playsInline
                style={{ width: '100%', height: '100%' }}
                onPlay={() => {
                  setIsVideoPlaying(true);
                }}
                onPause={() => {
                  setIsVideoPlaying(false);
                }}
              />
              {!isVideoPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                  onClick={() => {
                    if (playerRef.current) {
                      playerRef.current.play().catch(err => {
                        // Erreur play
                      });
                    }
                  }}
                >
                  <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                    <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="video-modal-info">
              <h2 className="video-modal-title">{playingVideo.title}</h2>
              <p className="video-modal-details">{playingVideo.client}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}