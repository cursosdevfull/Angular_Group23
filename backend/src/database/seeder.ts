import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CoursesService } from '../courses/courses.service';
import { coursesData } from './course-seed';

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const coursesService = app.get(CoursesService);

    console.log('Starting course seeding...');

    try {
        for (const courseData of coursesData) {
            await coursesService.create(courseData);
            console.log(`Created course: ${courseData.title}`);
        }
        console.log('Course seeding completed successfully!');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await app.close();
    }
}

seed();