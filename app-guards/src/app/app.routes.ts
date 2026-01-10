import { Routes } from '@angular/router';
import { Users } from './users/users';
import { Activity } from './activity/activity';
import { Detail } from './detail/detail';
import { List } from './list/list';
import { authGuard } from './guards/auth-guard';
import { authChild } from './guards/auth-child';
import { DetailFake } from './detail-fake/detail-fake';
import { toggleGuard } from './guards/toggle-guard';

export const routes: Routes = [
    {
        path: "users",
        component: Users,
        canActivateChild: [authGuard],
        children: [
            {
                path: "activities/:id",
                component: Activity,
                canActivate: [authChild]
            },
            {
                path: "details/:id",
                component: DetailFake,
                canMatch: [toggleGuard]
            },
            {
                path: "details/:id",
                component: Detail
            },
        ]
    },
    {
        path: "products",
        component: List
    },
    {
        path: "**",
        redirectTo: "users"
    }
];
