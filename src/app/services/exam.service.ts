import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}

  public listExams() {
    return this.http.get(`${baseUrl}/app/exams`);
  }

  public createExam(exam: any) {
    return this.http.post(`${baseUrl}/app/exams`, exam);
  }

  public deleteExam(examId: any) {
    return this.http.delete(`${baseUrl}/app/exams/` + examId);
  }
}
