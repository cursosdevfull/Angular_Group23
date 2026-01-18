import { Signal, WritableSignal } from "@angular/core";

export abstract class CoursePort {
    abstract listCourses: Signal<any>;
    abstract listAllCourses: Signal<any[]>;
    abstract currentPage: WritableSignal<number>;
    abstract updateCourse: WritableSignal<{ id: number; title: string } | null>;
    abstract createCourse: WritableSignal<{ title: string } | null>;
    abstract deleteCourse: WritableSignal<number | null>;
}