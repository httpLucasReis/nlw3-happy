import { getRepository } from 'typeorm'; // Toda operação passa por um repositório. Como um dado por ser criado ou excluído.
import Orphanage from '../models/Orphanage';
import { Request, Response } from 'express'; // importando a tipagem de request e  um response.
import orphanageView from '../views/orphanages_view'; // como os dados serão enviados
import * as Yup from 'yup';
export default {
    async index(req: Request, res: Response){
        const orphanagesRepository = getRepository(Orphanage);
        
        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
        });

        return res.json(orphanageView.renderMany(orphanages));
    },

    async show(req: Request, res: Response){
    
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, { relations: ['images'], });

        return res.json(orphanageView.render(orphanage));
    },

    async create(req: Request, res: Response){
        
        //console.log(req.files);

        // Desestruturando os dados da requisição
        const { 
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;    
    
        const orphanagesRepository = getRepository(Orphanage);

        // Imagens
        // as Express.Multer.File[] -> Força a tipagem a ser um array

        const reqImages = req.files as Express.Multer.File[];
        const images = reqImages.map(image => {
            return { path: image.filename };
        });

        console.log(`reqImage: ${reqImages}`);
        console.log(images);

        // Validação de dados com yup
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        }

        // Validando 
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required('Latitude obrigatória'),
            longitude: Yup.number().required('Longitude obrigatória'),
            about: Yup.string().required('Informação obrigatória').max(300),
            instructions: Yup.string().required('Instruções obrigatórias'),
            opening_hours: Yup.string().required('Horário obrigatório'),
            open_on_weekends: Yup.boolean().required('Informação obrigatória'),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required('Caminho obrigatório')
                })
            )
        })


        await schema.validate(data, {
            abortEarly: false, // Retorna todos os erros juntos.
        })

        // Criando um orfanato
        const orphanage = orphanagesRepository.create(data);
        
        // Salvando os dados no banco
        await orphanagesRepository.save(orphanage);

        res.send({orphanage});
    }
}