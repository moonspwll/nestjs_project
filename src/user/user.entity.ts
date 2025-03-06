import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ default: '' })
    bio: string;

    @Column({ default: '' })
    image: string;

    @Column()
    password: string;
}
