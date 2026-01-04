import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: true })
    imageUrl: string;

    @Column({ type: 'text', nullable: true })
    resume: string;

    @Column('simple-array')
    goals: string[];

    @Column('simple-array')
    syllabus: string[];

    @Column('simple-array')
    requirements: string[];

    @Column({ length: 100, nullable: true })
    frequency: string;

    @Column({ type: 'datetime' })
    start: Date;

    @Column({ length: 100, nullable: true })
    rangeHours: string;

    @Column({ length: 255, nullable: true })
    slogan: string;

    @Column({ length: 255 })
    title: string;

    @Column({ type: 'int', nullable: true })
    duration: number;

    @ManyToOne(() => Course, course => course.schedules)
    @JoinColumn({ name: 'courseId' })
    course: Course;

    @Column()
    courseId: number;

    @ManyToOne(() => Teacher, teacher => teacher.schedules)
    @JoinColumn({ name: 'teacherId' })
    teacher: Teacher;

    @Column()
    teacherId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}