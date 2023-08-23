import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfos } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserInfos$() {
    return this.httpClient.get<UserInfos>('user/user-infos');
  }
}
