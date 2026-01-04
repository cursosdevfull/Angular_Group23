import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class PaginationDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    page?: number = 1;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    limit?: number = 18;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    courseId?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    teacherId?: number;
}