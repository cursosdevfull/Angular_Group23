import { inject, Injectable } from "@angular/core";
import { CourseService } from "../adapters/course.service";
import { CoursePort } from "../ports/course.port";

@Injectable({ providedIn: 'root' })
export class CourseApplication {
    port: CoursePort = inject(CourseService);

    listCourses = this.port.listCourses;
    listAllCourses = this.port.listAllCourses
    currentPage = this.port.currentPage;
    updateCourse = this.port.updateCourse;
    createCourse = this.port.createCourse
    deleteCourse = this.port.deleteCourse;
}