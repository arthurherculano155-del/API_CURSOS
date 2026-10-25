
import multer from 'multer';

const upload = multer({
    dest: 'uploads/',

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, callback) => {
        const formatosPermitidos = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ];

        if (formatosPermitidos.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(
                new Error('Formato inválido. Envie uma imagem JPEG, PNG ou WebP.')
            );
        }
    }
});

export { upload };