import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './adapters/courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';
import { AuthModule } from '../auth/auth.module';
import { CourseApplication } from './application/course.application';

@Module({
    imports: [TypeOrmModule.forFeature([Course]), AuthModule],
    controllers: [CoursesController],
    providers: [CoursesService, CourseApplication],
    exports: [CoursesService],
})
export class CoursesModule { }