import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnswer } from '../../models/interfaces/i-Answer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:5129/api/Admin/PlaceGame'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  submitForm(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
