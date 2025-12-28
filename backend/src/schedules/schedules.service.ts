import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>,
    ) { }

    async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
        const schedule = this.scheduleRepository.create(createScheduleDto);
        return await this.scheduleRepository.save(schedule);
    }

    async findAll(paginationDto: PaginationDto) {
        const { page = 1, limit = 18 } = paginationDto;
        const skip = (page - 1) * limit;

        // Obtener un elemento extra para verificar si hay más páginas
        const data = await this.scheduleRepository.find({
            skip,
            take: limit + 1,
            order: { id: 'ASC' },
            relations: ['course', 'teacher'],
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

    async findAllUnpaginated(): Promise<Schedule[]> {
        return await this.scheduleRepository.find({
            order: { id: 'ASC' },
            relations: ['course', 'teacher'],
        });
    }

    async findOne(id: number): Promise<Schedule> {
        const schedule = await this.scheduleRepository.findOne({
            where: { id },
            relations: ['course', 'teacher'],
        });
        if (!schedule) {
            throw new NotFoundException(`Schedule with ID ${id} not found`);
        }
        return schedule;
    }

    async update(id: number, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
        const schedule = await this.findOne(id);
        Object.assign(schedule, updateScheduleDto);
        return await this.scheduleRepository.save(schedule);
    }

    async remove(id: number): Promise<void> {
        const schedule = await this.findOne(id);
        await this.scheduleRepository.remove(schedule);
    }

    async findByCourse(courseId: number): Promise<Schedule[]> {
        return await this.scheduleRepository.find({
            where: { courseId },
            relations: ['course', 'teacher'],
            order: { id: 'ASC' },
        });
    }

    async findByTeacher(teacherId: number): Promise<Schedule[]> {
        return await this.scheduleRepository.find({
            where: { teacherId },
            relations: ['course', 'teacher'],
            order: { id: 'ASC' },
        });
    }
}