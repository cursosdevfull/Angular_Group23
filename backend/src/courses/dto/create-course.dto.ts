import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;
}