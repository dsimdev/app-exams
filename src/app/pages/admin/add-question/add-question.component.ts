import Swal from 'sweetalert2';
import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  examId: any;
  title: any;
  question: any = {
    exam: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    this.question.exam['examId'] = this.examId;
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.option3.trim() == '' || this.question.option3 == null) {
      return;
    }
    if (this.question.option4.trim() == '' || this.question.option4 == null) {
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }

    this.questionService.addQuestion(this.question).subscribe(
      (data) => {
        Swal.fire(
          'Question added',
          'The question was successfully added',
          'success'
        );
      },
      (error) => {
        Swal.fire(
          'ERROR!',
          'An error has ocurred, please try again in a few moments',
          'error'
        );
      }
    );
  }

  cancel() {
    this.location.back();
  }
}
