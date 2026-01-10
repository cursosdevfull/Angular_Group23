import { Component, effect, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'cdev-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router)
  authService = inject(AuthService)
  tokenService = inject(TokenService)
  fg!: FormGroup

  constructor() {
    this.createForm()
    effect(() => {
      const tokens = this.authService.userLogged()
      if (tokens) {
        this.tokenService.save('access_token', tokens.accessToken);
        this.tokenService.save('refresh_token', tokens.refreshToken);

        this.router.navigate(['dashboard'])
      }
    })
  }

  createForm() {
    this.fg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  signIn() {
    const value = this.fg.value
    this.authService.login({ email: value.email, password: value.password })
  }
}
