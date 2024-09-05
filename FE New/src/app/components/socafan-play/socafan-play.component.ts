import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { AnswerEnum } from '../../enums/answer-enum';
import { IAnswer } from '../../models/interfaces/i-Answer';
import { PlaceEntryRequest } from '../../models/interfaces/i-place-entry-request';
import { EntryService } from '../../services/entry/entry.service';
import { IEntry } from '../../models/interfaces/i-entry';
import { Status } from '../../enums/status';
import { Payment } from '../../enums/payment';
import { Game } from '../../models/interfaces/i-game';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-socafan-play',
  templateUrl: './socafan-play.component.html',
  styleUrl: './socafan-play.component.scss'
})
export class SocafanPlayComponent implements OnInit {

  form: FormGroup;
  answerEnum = AnswerEnum;

  // To store selected answers for each question
  selectedAnswers: { [key: number]: AnswerEnum } = {};

  // Define the questions and their corresponding options
  questions = [
    { text: `Number of goals scored by home in the first half`, options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of goals scored by away in the first half', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of goals scored in the first half by both teams', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of goals scored by home in the second half', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of goals scored by away in the second half', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of scored in the 2nd half alone by both teams', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of goals scored by home during the entire match', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of goals scored by away during the entire match', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of red cards awarded to home in the first half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of red cards awarded to away in the first half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of red cards awarded to both teams in the first half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of red cards awarded to home in the second half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of red cards awarded to away in the second half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of red cards awarded to both teams in the second half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of red cards awarded to home during the entire match', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of red cards awarded to away during the entire match', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of red cards awarded to both teams during the entire match', options: Array.from({ length: 9 }, (_, i) => i) },
  ];
  userId: number | null = null;
  game!: Game;
  gameAvailable: boolean = false;
  home: string = '';
  away: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private entryService: EntryService, private router: Router, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      questions: this.fb.array(this.questions.map(() => this.fb.control(null))),
    });
  }

  ngOnInit(): void {
    this.getGameForToday();
    this.userId = this.authService.getUserId();
    console.log('Logged in user ID:', this.userId);
  }

  get questionsFormArray() {
    return this.form.get('questions') as any;
  }

  onSubmit() {
    const selectedOptions = this.form.value.questions;

    console.log('Selected options for each question:', selectedOptions);

    const formValues = this.form.value.questions;
    const answer: IAnswer = {
      idUser: this.userId!, // You might need to dynamically set or fetch this ID
      q1: formValues[0] ?? AnswerEnum.A, // Default to AnswerEnum.A if null
      q2: formValues[1] ?? AnswerEnum.A,
      q3: formValues[2] ?? AnswerEnum.A,
      q4: formValues[3] ?? AnswerEnum.A,
      q5: formValues[4] ?? AnswerEnum.A,
      q6: formValues[5] ?? AnswerEnum.A,
      q7: formValues[6] ?? AnswerEnum.A,
      q8: formValues[7] ?? AnswerEnum.A,
      q9: formValues[8] ?? AnswerEnum.A,
      idGamePlay: 1,
      idAnswer: 0,
      entry: {} as IEntry
    };

    const play: PlaceEntryRequest = {} as PlaceEntryRequest;
    play.idUser = this.userId!;
    play.answer = answer;
    console.log(play);

    const entry: IEntry = {
      entryDate: new Date(),
      expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)), // 1 day later
      active: true,
      idEntry: 0,
      status: Status.Pending,
      payment: Payment.Free,
      answers: []
    };

    play.entry = entry;

    // Call the service to send data to the backend
    this.entryService.placeEntry(play.answer).subscribe(
      response => {
        this._snackBar.open('Entry placed successfully:', 'close');
        this.router.navigate(["/socafan"])
      },
      error => {
        this._snackBar.open('Error placing entry: Please try', 'close');
      }
    );

  }

  getGameForToday(): void {
    //const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    this.entryService.getGameByEnteredDate().subscribe(
      (result) => {
        if (result.success) {
          console.log(result);
          this.questions.forEach(x => {
            if (x.text.search("home") !== -1) {
              x.text = x.text.replace("home", result.game.home);
            } else {
              x.text = x.text.replace("away", result.game.away);
            }
          });// Navigate to a different page upon successful login
          this.gameAvailable = true;
          this.home = result.game.home;
          this.away = result.game.away;
          this.game = Object.assign({}, result.game);

        } else {
          console.log(result.message)
          this.gameAvailable = false;
        }
      }
    );
  }
}
