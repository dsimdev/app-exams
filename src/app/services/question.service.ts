import { appUrl } from './helper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  public getExamQuestions(examId: any) {
    return this.http.get(`${appUrl}/questions/exam/all/${examId}`);
  }

  public addQuestion(question: any) {
    return this.http.post(`${appUrl}/questions`, question);
  }

  public deleteQuestion(questionId: any) {
    return this.http.delete(`${appUrl}/questions/${questionId}`);
  }

  public updateQuestion(question: any) {
    return this.http.put(`${appUrl}/questions/`, question);
  }

  public getQuestion(questionId: any) {
    return this.http.get(`${appUrl}/questions/${questionId}`);
  }
}
