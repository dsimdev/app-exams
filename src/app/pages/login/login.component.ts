import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

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

  constructor(private snack: MatSnackBar, private loginService: LoginService) {}

  ngOnInit(): void {}

  formSubmit() {
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }

    if (
      (this.loginData.username.trim() == '' ||
        this.loginData.username == null) &&
      (this.loginData.password.trim() == '' || this.loginData.password == null)
    ) {
      this.snack.open('Please, complete all the fields', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err) => console.log(err)
    );
  }
}
