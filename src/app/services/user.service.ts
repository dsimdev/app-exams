import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public addUser(user: any) {
    return this.httpClient.post(`${authUrl}/users`, user);
  }

  public updateUser(user: any) {
    return this.httpClient.put(`${authUrl}/users`, user);
  }

  public getUser(userId: any) {
    return this.httpClient.get(`${authUrl}/users/${userId}`);
  }
}
