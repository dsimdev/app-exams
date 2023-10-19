import Swal from 'sweetalert2';
import { ExamService } from './../../../services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  examId: any;
  exam: any = new Object();

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.examService.getExam(this.examId).subscribe(
      (data: any) => {
        this.exam = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public startExam() {
    Swal.fire({
      title: "You're are gonna to start the exam",
      text: 'Are you sure?',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'red',
      confirmButtonText: 'Start',
      confirmButtonColor: 'blue',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start/' + this.examId]);
      }
    });
  }

  cancel() {
    this.location.back();
  }
}
