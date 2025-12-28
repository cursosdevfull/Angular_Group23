import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto) {
        return await this.coursesService.create(createCourseDto);
    }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        return await this.coursesService.findAll(paginationDto);
    }

    @Get('all')
    async findAllUnpaginated() {
        return await this.coursesService.findAllUnpaginated();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.coursesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCourseDto: UpdateCourseDto,
    ) {
        return await this.coursesService.update(id, updateCourseDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.coursesService.remove(id);
        return { message: 'Course deleted successfully' };
    }
}