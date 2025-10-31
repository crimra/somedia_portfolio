// Configuration Cloudinary coté client 
const CLOUDINARY_CONFIG = {
    cloud_name: 'dpk4mqxrg',
    // Note: Seul cloud_name côté client pour les URLs publiques
};

// Fonction construction URLs Cloudinary manuellement (sans SDK)
const buildCloudinaryUrl = (publicId, options = {}) => {
    const {
        resourceType = 'image',
        format = 'auto',
        quality = 'auto',
        width,
        height,
        crop = 'fill',
        startOffset,
        transformation = []
    } = options;

    let transformations = [];
    
    // Ajout transformations de base
    if (quality !== 'none') transformations.push(`q_${quality}`);
    if (format !== 'none') transformations.push(`f_${format}`);
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (crop && (width || height)) transformations.push(`c_${crop}`);
    if (startOffset !== undefined) transformations.push(`so_${startOffset}`);
    
    // Ajout transformations personnalisées
    transformation.forEach(t => {
        if (typeof t === 'string') {
            transformations.push(t);
        } else if (typeof t === 'object') {
            Object.entries(t).forEach(([key, value]) => {
                const cloudinaryKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
                transformations.push(`${cloudinaryKey.charAt(0)}_${value}`);
            });
        }
    });

    const transformString = transformations.length > 0 ? `/${transformations.join(',')}` : '';
    
    // Ajouter l'extension appropriée
    const extension = resourceType === 'video' ? '.mp4' : '';
    
    return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloud_name}/${resourceType}/upload${transformString}/v1761904164/${publicId}${extension}`;
};

// Fonction pour optimiser les URLs des vidéos
export const getOptimizedVideoUrl = (publicId, options = {}) => {
    return buildCloudinaryUrl(publicId, {
        resourceType: 'video',
        format: 'mp4', // Format explicite pour ReactPlayer
        quality: 'auto',
        ...options
    });
};

// Fonction pour générer des thumbnails/covers de vidéos
export const getVideoThumbnail = (publicId, options = {}) => {
    return buildCloudinaryUrl(publicId, {
        resourceType: 'video',
        format: 'jpg',
        quality: 'auto',
        width: 400,
        height: 300,
        crop: 'fill',
        startOffset: 0,
        ...options
    });
};

// URLs good pour différentes qualités
export const getVideoVariations = (publicId) => {
    return {
        hd: getOptimizedVideoUrl(publicId, { quality: 'hd' }),
        sd: getOptimizedVideoUrl(publicId, { quality: 'sd' }),
        thumbnail: getVideoThumbnail(publicId),
        preview: getOptimizedVideoUrl(publicId, { 
            transformation: ['du_10'] // 10 secondes de preview
        })
    };
};

// Fonction pour générer des thumbnails à différents moments
export const getVideoThumbnailAtTime = (publicId, seconds = 0, options = {}) => {
    return getVideoThumbnail(publicId, {
        startOffset: seconds,
        ...options
    });
};

// Export par défaut d'un objet avec les configurations
export default {
    config: CLOUDINARY_CONFIG,
    url: buildCloudinaryUrl,
    video: {
        optimize: getOptimizedVideoUrl,
        thumbnail: getVideoThumbnail,
        variations: getVideoVariations,
        thumbnailAtTime: getVideoThumbnailAtTime
    }
};