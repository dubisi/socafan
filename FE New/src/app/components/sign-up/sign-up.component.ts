import { Component } from '@angular/core';
import { ISignUpData } from '../../models/interfaces/i-sign-up-data';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  signUpData: ISignUpData = {
    name: '',
    username: '',
    password: '',
    email: '',
    cellPhoneNumber: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.signUp(this.signUpData);
  }
}
