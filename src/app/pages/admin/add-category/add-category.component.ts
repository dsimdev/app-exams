import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  category = {
    title: '',
    description: '',
  };

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  public formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open('The title is required', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    this.categoryService.addCategory(this.category).subscribe(
      (data: any) => {
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Congrats', 'Category added successfully', 'success');
        this.router.navigate(['/dashboard-admin/categories']);
      },
      (error) => {
        Swal.fire(
          'ERROR!',
          'Something gone wrong creating the category, please try again in a few moments',
          'error'
        );
      }
    );
  }

  cancel() {
    this.location.back();
  }
}
