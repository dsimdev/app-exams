import { ExamService } from './../../../services/exam.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-exam',
  templateUrl: './load-exam.component.html',
  styleUrls: ['./load-exam.component.css'],
})
export class LoadExamComponent implements OnInit {
  categoryId: any;
  exams:any = [];

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['categoryId'];

      if (this.categoryId == 0) {
        this.examService.listExamsEnabled().subscribe(
          (data) => {
            this.exams = data;
          },
          (error) => console.log(error)
        );
      } else {
        this.examService
          .listExamsByCategoryAndEnabled(this.categoryId)
          .subscribe(
            (data) => {
              this.exams = data;
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
  }
}
