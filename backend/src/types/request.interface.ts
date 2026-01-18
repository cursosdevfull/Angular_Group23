import { Request } from 'express';

export interface JwtPayload {
    sub: number;
    email: string;
    name: string;
    roles: string[];
    iat?: number;
    exp?: number;
}

export interface RequestWithUser extends Request {
    user: JwtPayload;
}