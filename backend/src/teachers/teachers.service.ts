import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PaginationDto } from '../courses/dto/pagination.dto';

@Injectable()
export class TeachersService {
    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>,
    ) { }

    async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
        const teacher = this.teacherRepository.create(createTeacherDto);
        return await this.teacherRepository.save(teacher);
    }

    async findAll(paginationDto: PaginationDto) {
        const { page = 1, limit = 18 } = paginationDto;
        const skip = (page - 1) * limit;

        // Obtener un elemento extra para verificar si hay más páginas
        const data = await this.teacherRepository.find({
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

    async findAllUnpaginated(): Promise<Teacher[]> {
        return await this.teacherRepository.find({
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new NotFoundException(`Teacher with ID ${id} not found`);
        }
        return teacher;
    }

    async update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
        const teacher = await this.findOne(id);
        Object.assign(teacher, updateTeacherDto);
        return await this.teacherRepository.save(teacher);
    }

    async remove(id: number): Promise<void> {
        const teacher = await this.findOne(id);
        await this.teacherRepository.remove(teacher);
    }
}