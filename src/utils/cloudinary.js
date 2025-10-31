import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
cloudinary.config({ 
    cloud_name: 'dpk4mqxrg', 
    api_key: '453671471594854', 
    api_secret: process.env.VITE_CLOUDINARY_API_SECRET // Utiliser les variables d'environnement pour la sécurité
});

// Fonction pour optimiser les URLs des vidéos
export const getOptimizedVideoUrl = (publicId, options = {}) => {
    return cloudinary.url(publicId, {
        resource_type: 'video',
        fetch_format: 'auto',
        quality: 'auto',
        ...options
    });
};

// Fonction pour générer des thumbnails/covers de vidéos
export const getVideoThumbnail = (publicId, options = {}) => {
    return cloudinary.url(publicId, {
        resource_type: 'video',
        format: 'jpg',
        transformation: [
            { start_offset: '0' }, // Prendre la première frame
            { width: 400, height: 300, crop: 'fill' },
            { quality: 'auto', fetch_format: 'auto' }
        ],
        ...options
    });
};

// Fonction pour uploader des vidéos (côté serveur uniquement)
export const uploadVideo = async (filePath, publicId, options = {}) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'video',
            public_id: publicId,
            ...options
        });
        return uploadResult;
    } catch (error) {
        console.error('Erreur upload Cloudinary:', error);
        throw error;
    }
};

// URLs optimisées pour différentes qualités
export const getVideoVariations = (publicId) => {
    return {
        hd: getOptimizedVideoUrl(publicId, { quality: 'hd' }),
        sd: getOptimizedVideoUrl(publicId, { quality: 'sd' }),
        thumbnail: getVideoThumbnail(publicId),
        preview: cloudinary.url(publicId, {
            resource_type: 'video',
            transformation: [
                { duration: '10' }, // 10 secondes de preview
                { quality: 'auto' }
            ]
        })
    };
};

export default cloudinary;