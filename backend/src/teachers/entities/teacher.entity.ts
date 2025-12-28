import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Schedule } from '../../schedules/entities/schedule.entity';

@Entity('teachers')
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    lastname: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column({ type: 'text', nullable: true })
    summary: string;

    @Column({ length: 255, nullable: true })
    linkedin: string;

    @Column({ length: 255, nullable: true })
    photoUrl: string;

    @Column('simple-array')
    skills: string[];

    @OneToMany(() => Schedule, schedule => schedule.teacher)
    schedules: Schedule[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}