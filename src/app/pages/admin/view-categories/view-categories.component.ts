import Swal from 'sweetalert2';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories: any = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.listCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire(
          'ERROR!!',
          'We had an error loading the categories, please try again in a few moments',
          'error'
        );
      }
    );
  }
  deleteExam(categoryId: any) {
    Swal.fire({
      title: 'Delete category',
      text: `Are you sure you want to delete this category?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'blue',
      cancelButtonColor: 'red',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.categoryService.deleteCategory(categoryId).subscribe((data) => {
            console.log(data);
            this.categories = this.categories.filter(
              (category: any) => category.categoryId != categoryId
            );
            Swal.fire(
              'Category deleted',
              'The category was deleted successfully',
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
