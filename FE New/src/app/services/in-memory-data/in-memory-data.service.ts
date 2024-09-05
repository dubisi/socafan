import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, username: 'JohnDoe', password: '12345' },
      { id: 2, username: 'Jane Doe', password: '12345' },
      { id: 3, username: 'Alice Johnson', password: '12345' },
      { id: 4, username: 'Bob Smith', password: '12345' }
    ];
    
    const game = [
      { id: 1, home: 'Pirates', away: 'Chiefs', date: new Date() },
      { id: 2, home: 'Chealsea', away: '12345', date: new Date() },
      { id: 3, home: 'Alice Johnson', away: '12345', date: new Date() },
      { id: 4, home: 'Bob Smith', away: '12345', date: new Date() }
    ];

    game.forEach((g, index) => {
      if (index > 0) { // Skip the first game
        const currentDate = new Date(g.date); // Copy the current date
        currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
        g.date = currentDate; // Update the date in the game object
      }
    });
    return { users, game };
    
  }
}

