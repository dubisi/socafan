import { AnswerEnum } from "../../enums/answer-enum";
import { IEntry } from "./i-entry";

export interface IAnswer {
    idAnswer: number;
    idGamePlay: number;
    idUser: number;
    q1: AnswerEnum;
    q2: AnswerEnum;
    q3: AnswerEnum;
    q4: AnswerEnum;
    q5: AnswerEnum;
    q6: AnswerEnum;
    q7: AnswerEnum;
    q8: AnswerEnum;
    q9: AnswerEnum;
    entry: IEntry;
    
  }