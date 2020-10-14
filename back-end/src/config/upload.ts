import multer from 'multer';
import path from 'path';

export default {
    storage: multer.diskStorage({
        // Diretório do upload
        destination: path.join(__dirname, '..', '..', 'uploads'), 
        filename: (req, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            // callback para dar um nome para a imagem.
            cb(null, fileName);
        }
    })
}