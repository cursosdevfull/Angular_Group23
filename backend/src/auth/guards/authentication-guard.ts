import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(" ")[1]

        if (!token) {
            throw new HttpException('No token provided', 401);
        }

        try {
            const payload = this.jwtService.verify(token, { secret: 'your-secret-key' });
            request.user = payload;
            return true;
        } catch (error) {
            console.log(error);
            throw new HttpException('Invalid token', 401);
        }
    }
}