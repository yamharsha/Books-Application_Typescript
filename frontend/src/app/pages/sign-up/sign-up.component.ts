import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm: {
    userName: string;
    password1: string;
    password2: string;
  } = {
    userName: '',
    password1: '',
    password2: '',
  };

  constructor(private router: Router, private authService: AuthService) {}

  async submitSignUp(): Promise<void> {
    if (this.signUpForm.password1 === this.signUpForm.password2) {
      const newUserData: { userName: string; password: string } = {
        userName: this.signUpForm.userName,
        password: this.signUpForm.password1,
      };
      const userSucess = await this.authService.RegisterUser(newUserData);
      if (userSucess) {
        this.router.navigate(['/']);
      }
    }
  }
}
