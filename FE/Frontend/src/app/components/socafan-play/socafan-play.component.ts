import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';
import { AnswerEnum } from '../../enums/answer-enum';
import { IAnswer } from '../../models/interfaces/i-Answer';
import { PlaceEntryRequest } from '../../models/interfaces/i-place-entry-request';
import { EntryService } from '../../services/entry/entry.service';
import { IEntry } from '../../models/interfaces/i-entry';
import { Status } from '../../enums/status';
import { Payment } from '../../enums/payment';
import { Game } from '../../models/interfaces/i-game';

@Component({
  selector: 'app-socafan-play',
  standalone: true,
  imports: [MatCardModule, FormsModule, ReactiveFormsModule, MatRadioModule, MatGridListModule, ReactiveFormsModule, CommonModule],
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
    { text: 'Number of goals scored by Chelsea in the first half', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of goals scored by Liverpool in the first half', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of goals scored in the first half by both teams', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of goals scored by Chelsea in the second half', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of goals scored by Liverpool in the second half', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of scored in the 2nd half alone by both teams', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of goals scored by Chelsea during the entire match', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of goals scored by Liverpool during the entire match', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of red cards awarded to Chelsea in the first half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of red cards awarded to Liverpool in the first half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of red cards awarded to both teams in the first half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of red cards awarded to Chelsea in the second half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Number of red cards awarded to Liverpool in the second half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of red cards awarded to both teams in the second half alone', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of red cards awarded to Chelsea during the entire match', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of red cards awarded to Liverpool during the entire match', options: Array.from({ length: 9 }, (_, i) => i) },
    { text: 'Total number of red cards awarded to both teams during the entire match', options: Array.from({ length: 9 }, (_, i) => i) },
  ];
  userId: number | null = null;
  game!: Game;

  constructor(private fb: FormBuilder, private authService: AuthService, private entryService: EntryService) {
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
        console.log('Entry placed successfully:', response);
      },
      error => {
        console.error('Error placing entry:', error);
      }
    );

  }

  getGameForToday(): void {
    //const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    this.entryService.getGameByEnteredDate().subscribe(
      (data: Game) => this.game = data,
      (error) => console.error('Error fetching game:', error)
    );
  }
}
