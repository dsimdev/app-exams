import { CategoryService } from './../../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  categoryId: any;
  category: any;

  constructor(
    private location: Location,
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['categoryId'];
    this.categoryService.getCategory(this.categoryId).subscribe(
      (data) => {
        this.category = data;
        console.log(this.category);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCategory(examId: any) {
    Swal.fire({
      title: `${this.category.title}`,
      text: `You are going to delete '${this.category.title}', are you sure?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'blue',
      cancelButtonColor: 'red',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.categoryService
            .deleteCategory(this.categoryId)
            .subscribe((data) => {
              Swal.fire(
                'Category deleted',
                'The category was deleted successfully',
                'success'
              );
              this.router.navigate(['/dashboard-admin/category']);
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

  public updateCategory() {
    this.categoryService.updateCategory(this.category).subscribe(
      (data) => {
        Swal.fire(
          'Congratz',
          'The category was updated successfully',
          'success'
        ).then((e) => {
          this.router.navigate(['/dashboard-admin/categories']);
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
