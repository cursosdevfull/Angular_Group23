import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Find user by email
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate tokens
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles.map(role => role.name),
        };

        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

        // Save refresh token
        await this.usersService.updateRefreshToken(user.id, refreshToken);

        return {
            accessToken,
            refreshToken
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.usersService.findOne(payload.sub);

            if (!user || user.refreshToken !== refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const newPayload = {
                sub: user.id,
                email: user.email,
                name: user.name,
                roles: user.roles.map(role => role.name),
            };

            const newAccessToken = this.jwtService.sign(newPayload, { expiresIn: '15m' });

            return {
                accessToken: newAccessToken,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(userId: number) {
        await this.usersService.updateRefreshToken(userId, null);
        return { message: 'Logged out successfully' };
    }
}