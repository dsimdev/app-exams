import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-exam-question',
  templateUrl: './view-exam-question.component.html',
  styleUrls: ['./view-exam-question.component.css'],
})
export class ViewExamQuestionComponent implements OnInit {
  examId: any;
  title: any;
  questions: any = [];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];

    this.questionService.getExamQuestions(this.examId).subscribe(
      (data) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public deleteQuestion(questionId: any) {
    Swal.fire({
      title: 'Delete question',
      text: 'Are you sure you want to delete this question?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'red',
      confirmButtonText: 'Delete',
      confirmButtonColor: 'blue',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.questionService.deleteQuestion(questionId).subscribe((data) => {
            Swal.fire(
              'Question delete',
              'The question was deleted successfully',
              'success'
            );
          });
          this.questions = this.questions.filter(
            (question: any) => question.questionId != questionId
          );
        }
      },
      (error) => {
        Swal.fire(
          'Error',
          'An error has ocurred, please try again in a few moment',
          'error'
        );
      }
    );
  }

  cancel() {
    this.location.back();
  }
}
