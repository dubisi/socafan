import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../services/entry/entry.service';
import { IAnswer } from '../../models/interfaces/i-Answer';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {

  results: IAnswer[] = [];
  userId: number | null = null;

  constructor(private _entryService: EntryService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
    console.log('Logged in user ID:', this.userId);
  }
  ngOnInit(): void {
    this.getAnswers();
  }
  getAnswers() {
    this._entryService.retrieveEntries(this.userId!).subscribe(
      response => {
        
        console.log('Result', response);
      },
      error => {
        console.error('Error placing entry:', error);
      }
    );
  }
}
