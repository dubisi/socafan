import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ISignUpData } from '../../models/interfaces/i-sign-up-data';
import { UserLevel } from '../../enums/user-level';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/users'; // Replace with your API URL
  private userId: number | null = null;
  private isAdminUser = false;

  constructor(private http: HttpClient, private router: Router) { }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/Authorization/login`, { username, password }).pipe(
  //     tap(response => {
  //       if (response.token) {
  //         localStorage.setItem('authToken', response.token);
  //         this.isAdminUser = response.role == UserLevel.Adimin;
  //         if (this.isAdminUser) {
  //           this.router.navigate(['/admin']);
  //         } else {
  //           this.router.navigate(['/socafan']);
  //         }
  //       }
  //     })
  //   );
  // }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user)); // Store the user info
          return { success: true, user };
        } else {
          return { success: false, message: 'Username or password is incorrect' };
        }
      })
    );
  }

  signUp(signUpData: ISignUpData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Authorization/signup`, signUpData);
  }

  logout(): void {
    this.userId = null;
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  setUserId(userId: number): void {
    this.userId = userId;
    console.log(userId);
    localStorage.setItem('userId', userId.toString());
  }

  getUserId(): number | null {
    if (!this.userId) {
      const storedUserId = localStorage.getItem('userId');
      this.userId = storedUserId ? parseInt(storedUserId, 10) : null;
    }
    return this.userId;
  }

  isAdmin(): boolean {
    return this.isAdminUser;
  }
}
