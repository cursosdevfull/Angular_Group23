import { IsString, IsNotEmpty, MaxLength, IsEmail, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateTeacherDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    lastname: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @IsString()
    @IsOptional()
    @MaxLength(20)
    phone?: string;

    @IsString()
    @IsOptional()
    summary?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    linkedin?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    photoUrl?: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    skills: string[];
}