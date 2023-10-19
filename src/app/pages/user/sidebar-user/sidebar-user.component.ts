import { LoginService } from './../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css'],
})
export class SidebarUserComponent implements OnInit {
  categories: any;

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.categoryService.listCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        this.snack.open('An error has ocurred', 'OK', {
          duration: 3000,
        });
      }
    );
  }

  public logout() {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'red',
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'blue',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.logout();
        window.location.reload();
      }
    });
  }
}
