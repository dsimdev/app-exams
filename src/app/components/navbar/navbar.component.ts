import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public loginService: LoginService) {}

  ngOnInit(): void {}

  public logout() {
    this.loginService.logout();
    window.location.reload();
  }
}
