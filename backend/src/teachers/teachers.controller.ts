import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    Put,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PaginationDto } from '../courses/dto/pagination.dto';

@Controller('teachers')
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) { }

    @Post()
    async create(@Body() createTeacherDto: CreateTeacherDto) {
        return await this.teachersService.create(createTeacherDto);
    }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        return await this.teachersService.findAll(paginationDto);
    }

    @Get('all')
    async findAllUnpaginated() {
        return await this.teachersService.findAllUnpaginated();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.teachersService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTeacherDto: UpdateTeacherDto,
    ) {
        return await this.teachersService.update(id, updateTeacherDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.teachersService.remove(id);
        return { message: 'Teacher deleted successfully' };
    }
}