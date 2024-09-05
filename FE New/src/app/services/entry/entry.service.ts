import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaceEntryRequest } from '../../models/interfaces/i-place-entry-request';
import { map, Observable } from 'rxjs';
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

  getGameByEnteredDate(): Observable<any> {
    return this.http.get<any[]>('api/game').pipe(
      map(games => {
        if (games) {
          // Get today's date
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Reset time part for comparison

          // Find games that match today's date
          const foundGame = games.find(game => {
            const gameDate = new Date(game.date);
            gameDate.setHours(0, 0, 0, 0); // Reset time part for comparison
            return gameDate.getTime() === today.getTime();
          });

          if (foundGame) {
            return { success: true, game: foundGame };
          } else {
            return { success: false, message: 'No game found for today' };
          }
        } else {
          return { success: false, message: 'Error fetching games' };
        }
      })
    );
  }
}
