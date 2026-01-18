import { Inject, Injectable } from "@nestjs/common";
import { CoursesService } from "../adapters/courses.service";
import type { CoursesPort } from "../ports/courses.port";
import { CreateCourseDto } from "../dto/create-course.dto";
import { PaginationDto } from "../dto/pagination.dto";
import { UpdateCourseDto } from "../dto/update-course.dto";

@Injectable()
export class CourseApplication {
    constructor(@Inject(CoursesService) private service: CoursesPort) { }

    create(createCourseDto: CreateCourseDto) {
        return this.service.create(createCourseDto);
    }

    findAll(paginationDto: PaginationDto) {
        return this.service.findAll(paginationDto);
    }

    findAllUnpaginated() {
        return this.service.findAllUnpaginated();
    }

    findOne(id: number) {
        return this.service.findOne(id);
    }

    update(id: number, updateCourseDto: UpdateCourseDto) {
        return this.service.update(id, updateCourseDto);
    }

    remove(id: number) {
        return this.service.remove(id);
    }

}