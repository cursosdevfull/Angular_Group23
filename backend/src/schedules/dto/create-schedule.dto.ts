import { Type } from 'class-transformer';
import { IsString, IsArray, IsDateString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateScheduleDto {
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsString()
    resume?: string;

    @IsArray()
    @IsString({ each: true })
    goals: string[];

    @IsArray()
    @IsString({ each: true })
    syllabus: string[];

    @IsArray()
    @IsString({ each: true })
    requirements: string[];

    @IsOptional()
    @IsString()
    frequency?: string;

    @IsDateString()
    start: string;

    @IsOptional()
    @IsString()
    rangeHours?: string;

    @IsOptional()
    @IsString()
    slogan?: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    duration?: number;

    @IsNumber()
    courseId: number;

    @IsNumber()
    teacherId: number;
}