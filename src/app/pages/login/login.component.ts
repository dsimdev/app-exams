import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    if (this.loginData.username == '' || this.loginData.username == null) {
      this.snack.open('Username is required', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }

    if (this.loginData.password == '' || this.loginData.password == null) {
      this.snack.open('Password is required', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }

    if (
      (this.loginData.username == '' && this.loginData.password == '') ||
      (this.loginData.username == null && this.loginData.password == null)
    ) {
      this.snack.open('Please, complete all the fields', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          if (this.loginService.getUserRoles() == 'ADMIN') {
            this.router.navigate(['dashboard-admin']);
            this.loginService.loginStatusSubject.next(true);
          } else if (this.loginService.getUserRoles() == 'USER') {
            this.router.navigate(['dashboard-user']);
            this.loginService.loginStatusSubject.next(true);
          } else {
            this.loginService.logout();
          }
        });
      },
      (error) => {
        this.snack.open('Wrong data, try again', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }
}
