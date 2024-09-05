import { Component } from '@angular/core';
import { ISignUpData } from '../../models/interfaces/i-sign-up-data';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    CommonModule,
    FormsModule],
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
    this.authService.signUp(this.signUpData).subscribe(
      response => {
        console.log('Sign-up successful', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Sign-up failed', error);
      }
    );
  }
}
