import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    JoinColumn
} from 'typeorm';

import Orphanage from './Orphanage';

// Utilizando um Decorator
// classes, propriedades e funções.

@Entity('images') // Associa a classe a tabela orphanage
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;
    
    @ManyToOne(() => Orphanage, (orphanage) => orphanage.images)
    @JoinColumn({ name: 'orphanage_id' })
    orphanage: Orphanage;
}