const videoVersions = {
    'BGFI_zmkb55': 'v1761904164',
    'Aerco_2_ani9li': 'v1761904171',
    'IMMO_vfgboy': 'v1761904172',
    'aerco_14_gcwe31': 'v1761904160',
    'Aerco_4_jrupjv': 'v1761904143',
    'PEA_s8omps': 'v1761904142',
    'Aerco_salon_EBENE_s9jwa9': 'v1761904124',
    'BGFI_SPOT_2_gwqp2i': 'v1761904083',
    'Aerco_16_bgwe68': 'v1761904057',
    'AERCO_1_oqycrm': 'v1761904015',
    'BCI_OBOSSO_UB_z5qwhe': 'v1761903985',
    'AERCO_1er_Mai_hnnvbh': 'v1761903891',
    'A_tkmxoz': 'v1761903970',
    'Lays_nouveau_look_exacfk': 'v1761903876',
    'video_publicitaire_de_la_nouvelle_boisson_jcxhme': 'v1761903821',
    'Spot_publicitaire_La_cathedrale_tcnwtq': 'v1761903810',
    'AERCO_0_rsit2u': 'v1761903797'
};

export const getVideoUrlDirect = (publicId) => {
    const version = videoVersions[publicId] || 'v1761904164';
    return `https://res.cloudinary.com/dpk4mqxrg/video/upload/${version}/${publicId}.mp4`;
};

export const getVideoThumbnailDirect = (publicId, seconds = 0) => {
    const version = videoVersions[publicId] || 'v1761904164';
    return `https://res.cloudinary.com/dpk4mqxrg/video/upload/so_${seconds}/${version}/${publicId}.jpg`;
};