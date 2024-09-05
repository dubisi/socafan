import { Component, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ILoginResult } from '../../models/interfaces/i-login-result';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: any;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    //   this.authService.login(this.username, this.password).subscribe(
    //     (response: ILoginResult) => {
    //       console.log('Login successful', response);
    //       this.authService.setUserId(response.userId);
    //     },
    //     error => {
    //       console.error('Login failed', error);
    //     }
    //   );
    // }
    this.authService.login(this.username, this.password).subscribe((result) => {
      if (result.success) {
        this.router.navigate(['/socafan']);
        console.log('success'); // Navigate to a different page upon successful login
      } else {
        this.errorMessage = result.message;
      }
    });
  }
}

