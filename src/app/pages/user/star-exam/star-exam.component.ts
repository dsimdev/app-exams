import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-star-exam',
  templateUrl: './star-exam.component.html',
  styleUrls: ['./star-exam.component.css'],
})
export class StarExamComponent implements OnInit {
  examId: any;
  questions: any;
  points = 0;
  correctAnswers = 0;
  tries = 0;
  isSended = false;
  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.cantBack();
    this.examId = this.route.snapshot.params['examId'];
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getExamQuestions(this.examId).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 60;

        this.questions.forEach((q: any) => {
          q['answerOk'] = '';
        });

        this.startTime();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formSubmit() {
    Swal.fire({
      title: `Do you want to send the exam?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Send',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluateExam();
      }
    });
  }

  evaluateExam() {
    this.questionService.evaluateExam(this.questions).subscribe(
      (data: any) => {
        this.points = data.maxPoints;
        this.correctAnswers = data.correctAnswers;
        this.tries = data.tries;
        this.isSended = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  startTime() {
    let time = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluateExam();
        clearInterval(time);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormatTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} : min : ${ss} seg`;
  }

  print() {
    window.print();
  }

  cantBack() {
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null!, location.href);
    });
  }
}
