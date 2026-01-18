import { SetMetadata } from "@nestjs/common";

type PermissionType = "admin" | "teacher" | "student";
export type ListPermissions = PermissionType[]

export const Permissions = (...args: ListPermissions) => SetMetadata('permissions', args);