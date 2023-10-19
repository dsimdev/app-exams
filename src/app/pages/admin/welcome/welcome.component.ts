import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  user: any;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    console.log(this.user);
  }
}
