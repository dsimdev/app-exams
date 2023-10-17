import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}

  public listExams() {
    return this.http.get(`${appUrl}/exams`);
  }

  public createExam(exam: any) {
    return this.http.post(`${appUrl}/exams`, exam);
  }

  public deleteExam(examId: any) {
    return this.http.delete(`${appUrl}/exams/${examId}`);
  }

  public getExam(examId: any) {
    return this.http.get(`${appUrl}/exams/${examId}`);
  }

  public updateExam(exam: any) {
    return this.http.put(`${appUrl}/exams`, exam);
  }
}
