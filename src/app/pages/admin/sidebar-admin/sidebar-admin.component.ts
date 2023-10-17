import Swal from 'sweetalert2';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css'],
})
export class SidebarAdminComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

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
