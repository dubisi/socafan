import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, name: 'John Doe', password: '12345' },
      { id: 2, name: 'Jane Doe', password: '12345' },
      { id: 3, name: 'Alice Johnson', password: '12345' },
      { id: 4, name: 'Bob Smith', password: '12345' }
    ];
    return { users };
  }
}

