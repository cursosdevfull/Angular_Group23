import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { CoursesPort } from '../ports/courses.port';

@Injectable()
export class CoursesService implements CoursesPort {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) { }

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const course = this.courseRepository.create(createCourseDto);
        return await this.courseRepository.save(course);
    }

    async findAll(paginationDto: PaginationDto) {
        const { page = 1, limit = 18 } = paginationDto;
        const skip = (page - 1) * limit;

        // Obtener un elemento extra para verificar si hay más páginas
        const data = await this.courseRepository.find({
            skip,
            take: limit + 1,
            order: { id: 'ASC' },
        });

        // Verificar si hay más datos
        let hasMore = false;
        if (data.length > limit) {
            hasMore = true;
            data.pop(); // Remover el elemento extra
        }

        return {
            data,
            hasMore,
            page,
            limit,
        };
    }

    async findAllUnpaginated(): Promise<Course[]> {
        return await this.courseRepository.find({
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Course> {
        const course = await this.courseRepository.findOne({ where: { id } });
        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }

    async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const course = await this.findOne(id);
        Object.assign(course, updateCourseDto);
        return await this.courseRepository.save(course);
    }

    async remove(id: number): Promise<void> {
        const course = await this.findOne(id);
        await this.courseRepository.remove(course);
    }
}