import { CreateCourseDto } from "../dto/create-course.dto"
import { PaginationDto } from "../dto/pagination.dto";
import { UpdateCourseDto } from "../dto/update-course.dto";

export type CoursesPort = {
    create(createCourseDto: CreateCourseDto): Promise<any>;
    findAll(paginationDto: PaginationDto): Promise<any>;
    findAllUnpaginated(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateCourseDto: UpdateCourseDto): Promise<any>;
    remove(id: number): Promise<void>;
}