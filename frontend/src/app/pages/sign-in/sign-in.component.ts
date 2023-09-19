import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInInput: {
    userName: string;
    password: string;
  } = {
    userName: '',
    password: '',
  };

  constructor(private router: Router, private authService: AuthService) {}

  async submitSignIn(): Promise<void> {
    const newUserData = this.signInInput;
    const userSucess = await this.authService.SignInUser(newUserData);
    if (userSucess) {
      this.router.navigate(['/']);
    }
  }
}
