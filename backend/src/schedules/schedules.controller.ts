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
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AuthenticationGuard } from '../auth/guards/authentication-guard';

@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) { }

    @Post()
    @UseGuards(AuthenticationGuard)
    async create(@Body() createScheduleDto: CreateScheduleDto) {
        return await this.schedulesService.create(createScheduleDto);
    }

    @Get()
    @UseGuards(AuthenticationGuard)
    async findAll(@Query() paginationDto: PaginationDto) {
        return await this.schedulesService.findAll(paginationDto);
    }

    @Get('all')
    @UseGuards(AuthenticationGuard)
    async findAllUnpaginated() {
        return await this.schedulesService.findAllUnpaginated();
    }

    @Get('course/:courseId')
    @UseGuards(AuthenticationGuard)
    async findByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
        return await this.schedulesService.findByCourse(courseId);
    }

    @Get('teacher/:teacherId')
    @UseGuards(AuthenticationGuard)
    async findByTeacher(@Param('teacherId', ParseIntPipe) teacherId: number) {
        return await this.schedulesService.findByTeacher(teacherId);
    }

    @Get(':id')
    @UseGuards(AuthenticationGuard)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.schedulesService.findOne(id);
    }

    @Put(':id')
    @UseGuards(AuthenticationGuard)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateScheduleDto: UpdateScheduleDto,
    ) {
        return await this.schedulesService.update(id, updateScheduleDto);
    }

    @Delete(':id')
    @UseGuards(AuthenticationGuard)
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.schedulesService.remove(id);
        return { message: 'Schedule deleted successfully' };
    }
}