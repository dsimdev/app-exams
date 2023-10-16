import { ExamService } from './../../../services/exam.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css'],
})
export class ViewExamsComponent implements OnInit {
  exams: any = [];

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.examService.listExams().subscribe(
      (data: any) => {
        this.exams = data;
      },
      (error) => {
        Swal.fire(
          'ERROR!',
          'We had an error loading exams, please try again in a few moments',
          'error'
        );
      }
    );
  }

  deleteExam(examId: any) {
    Swal.fire({
      title: 'Delete exam',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'd33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.examService.deleteExam(examId).subscribe((data) => {
            console.log(data);
            this.exams = this.exams.filter(
              (exam: any) => exam.examId != examId
            );
            Swal.fire(
              'Exam deleted',
              'The exam was deleted successfully',
              'success'
            );
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
}
