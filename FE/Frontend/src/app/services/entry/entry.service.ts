import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaceEntryRequest } from '../../models/interfaces/i-place-entry-request';
import { Observable } from 'rxjs';
import { IAnswer } from '../../models/interfaces/i-Answer';
import { Game } from '../../models/interfaces/i-game';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiUrl = 'http://localhost:5129/api/Entry'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}
  

  retrieveEntries(idUser: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const user = { idUser };

    return this.http.post<any>(`${this.apiUrl}/RetrieveEntries`, user, {headers});
  }

  placeEntry(answer: IAnswer): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { answer };

    return this.http.post<any>(`${this.apiUrl}/PlaceEntry`, body, {headers});
  }

  getGameByEnteredDate(): Observable<Game> {
    console.log("wow");
    const url = `${this.apiUrl}/RetrieveGame`; // Adjust the URL according to your API endpoint
    return this.http.post<Game>(url, {});
  }
}
