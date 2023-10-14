import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    password: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
  };

  constructor(private userService: UserService, private snack: MatSnackBar) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Username is required', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('User saved', 'User registered successfully', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('¡ERROR!', 'An error has ocurred', 'error');
      }
    );
  }
}
