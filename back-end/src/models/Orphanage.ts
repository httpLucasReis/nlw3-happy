import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    OneToMany, 
    JoinColumn 
} from 'typeorm';
import Image from './Image';
// Utilizando um Decorator
// classes, propriedades e funções.

@Entity('orphanages') // Associa a classe a tabela orphanage
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // Indica que é uma coluna da tabela.
    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, (image) => image.orphanage, {
        cascade: ["insert", "update"],
    })
    @JoinColumn({ name: "orphanage_id" })
    images: Image[];
}