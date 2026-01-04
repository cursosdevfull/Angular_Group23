import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { name, email, password, roleIds } = createUserDto;

        // Check if user already exists
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Get roles if provided
        let roles: Role[] = [];
        if (roleIds && roleIds.length > 0) {
            roles = await this.rolesRepository.findBy({
                id: In(roleIds)
            });
        }

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            roles,
        });

        return this.usersRepository.save(user);
    }

    async findAll(paginationDto: PaginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;

        const [data, total] = await this.usersRepository.findAndCount({
            relations: ['roles'],
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
            select: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'roles']
        });

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['roles'],
            select: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'roles']
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { email },
            relations: ['roles'],
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        const { password, roleIds, ...updateData } = updateUserDto;

        // Hash password if provided
        if (password) {
            updateData['password'] = await bcrypt.hash(password, 10);
        }

        // Update roles if provided
        if (roleIds !== undefined) {
            const roles = await this.rolesRepository.findBy({
                id: In(roleIds)
            });
            user.roles = roles;
        }

        Object.assign(user, updateData);
        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
    }

    async updateRefreshToken(userId: number, refreshToken: string | null): Promise<void> {
        await this.usersRepository.update(userId, { refreshToken });
    }
}