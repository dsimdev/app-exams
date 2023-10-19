import Swal from 'sweetalert2';
import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  questionId: any = 0;
  question: any;
  exam: any;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.params['questionId'];
    this.questionService.getQuestion(this.questionId).subscribe(
      (data: any) => {
        this.question = data;
        console.log(this.question);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public updateQuestionData() {
    this.questionService.updateQuestion(this.question).subscribe((data) => {
      Swal.fire(
        'Question updated',
        'The question has been updated successfully',
        'success'
      ).then((e) => {
        this.router.navigate([
          '/dashboard-admin/questions/' +
            this.question.exam.examId +
            '/' +
            this.question.exam.title,
        ]);
      });
    });
  }

  cancel() {
    this.location.back();
  }
}
