import { CategoryService } from './../../../services/category.service';
import { ExamService } from './../../../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css'],
})
export class UpdateExamComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private categoryService: CategoryService,
    private router: Router,
    private location: Location
  ) {}

  examId = 0;
  exam: any;
  categories: any;

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];

    this.examService.getExam(this.examId).subscribe(
      (data) => {
        this.exam = data;
        console.log(this.exam);
      },
      (error) => {
        console.log(error);
      }
    );

    this.categoryService.listCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteExam(examId: any) {
    Swal.fire({
      title: `${this.exam.title}`,
      text: `You are going to delete '${this.exam.title}', are you sure?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'blue',
      cancelButtonColor: 'red',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.examService.deleteExam(examId).subscribe((data) => {
            Swal.fire(
              'Exam deleted',
              'The exam was deleted successfully',
              'success'
            );
            this.router.navigate(['/dashboard-admin/exams']);
          });
        }
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

  public updateExam() {
    this.examService.updateExam(this.exam).subscribe(
      (data) => {
        Swal.fire(
          'Congratz',
          'The exam was updated successfully',
          'success'
        ).then((e) => {
          this.router.navigate(['/dashboard-admin/exams']);
        });
      },
      (error) => {
        Swal.fire(
          'ERROR!',
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
