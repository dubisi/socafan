import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: any;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

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
        this._snackBar.open(result.message, "close"); // Navigate to a different page upon successful login
      } else {
        this.errorMessage = result.message;
      }
    });
  }
}

