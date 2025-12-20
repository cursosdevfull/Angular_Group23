import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cdev-menu',
  imports: [MatListModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  links = [
    {
      path: "/dashboard",
      title: "Dashboard"
    },
    {
      path: "/courses",
      title: "Courses"
    },
    {
      path: "/schedules",
      title: "Schedules"
    }
  ]
}
