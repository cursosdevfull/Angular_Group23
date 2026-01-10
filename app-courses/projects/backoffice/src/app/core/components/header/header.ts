import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { TokenService } from '../../../features/auth/services/token.service';
import * as jwt from 'jwt-decode';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'cdev-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private tokenService = inject(TokenService)
  authService = inject(AuthService)
  username = signal('');

  constructor() {
    const accessToken = this.tokenService.retrieve('access_token');
    if (accessToken) {
      const decodedToken = jwt.jwtDecode<any>(accessToken);
      this.username.set(decodedToken.name);
    }
  }
}
