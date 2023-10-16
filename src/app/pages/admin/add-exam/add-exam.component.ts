import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ExamService } from './../../../services/exam.service';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
})
export class AddExamComponent implements OnInit {
  categories: any = [];

  examData = {
    title: '',
    description: '',
    maxPoints: '',
    cantQuestions: '',
    enabled: true,
    category: {
      categoryId: '',
    },
  };

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.listCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire(
          'ERROR!',
          'An error has occurred loading the categories',
          'error'
        );
      }
    );
  }

  saveExam() {
    console.log(this.examData);
    if (this.examData.title.trim() == '' || this.examData.title == null) {
      this.snack.open('The title is required', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    this.examService.createExam(this.examData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Exam created',
          'The exam was created successfully',
          'success'
        );
        this.examData = {
          title: '',
          description: '',
          maxPoints: '',
          cantQuestions: '',
          enabled: true,
          category: {
            categoryId: '',
          },
        };
        this.router.navigate(['/dashboard-admin/exams']);
      },
      (error) => {
        console.log(error);
        Swal.fire(
          'ERROR!',
          'An error has ocurred, please try in a few moments',
          'error'
        );
      }
    );
  }
}
