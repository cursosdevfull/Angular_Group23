import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { AuthenticationGuard } from '../auth/guards/authentication-guard';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Get()
    @UseGuards(AuthenticationGuard)
    async findAll(): Promise<Role[]> {
        return this.rolesService.findAll();
    }
}