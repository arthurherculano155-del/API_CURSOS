import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function enviarFotoPerfil(caminhoArquivo) {
    const resultado = await cloudinary.uploader.upload(
        caminhoArquivo,
        {
            folder: 'cursinho-pertinho/perfis',
            resource_type: 'image'
        }
    );

    return {
        imagem_url: resultado.secure_url,
        public_id: resultado.public_id
    };
}

export default cloudinary;