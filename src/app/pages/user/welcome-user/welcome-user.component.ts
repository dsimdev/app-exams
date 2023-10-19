import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css'],
})
export class WelcomeUserComponent implements OnInit {
  user: any;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    console.log(this.user);
  }
}
