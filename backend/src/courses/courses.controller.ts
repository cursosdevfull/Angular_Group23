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
    UseGuards,
} from '@nestjs/common';
import { CoursesService } from './adapters/courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AuthenticationGuard } from '../auth/guards/authentication-guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { AuthorizationGuard } from 'src/auth/guards/authorization-guard';
import { CourseApplication } from './application/course.application';

@Controller('courses')
export class CoursesController {
    constructor(private readonly app: CourseApplication) { }

    @Post()
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Permissions("admin", "teacher")
    async create(
        @Body() createCourseDto: CreateCourseDto,
    ) {
        return await this.app.create(createCourseDto);
    }

    @Get()
    @UseGuards(AuthenticationGuard)
    async findAll(@Query() paginationDto: PaginationDto) {
        return await this.app.findAll(paginationDto);
    }

    @Get('all')
    @UseGuards(AuthenticationGuard)
    async findAllUnpaginated() {
        return await this.app.findAllUnpaginated();
    }

    @Get(':id')
    @UseGuards(AuthenticationGuard)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.app.findOne(id);
    }

    @Put(':id')
    @UseGuards(AuthenticationGuard)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCourseDto: UpdateCourseDto,
    ) {
        return await this.app.update(id, updateCourseDto);
    }

    @Delete(':id')
    @UseGuards(AuthenticationGuard)
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.app.remove(id);
        return { message: 'Course deleted successfully' };
    }
}