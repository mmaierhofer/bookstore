import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';

//npm install --save-dev jwt-decode

@Injectable()
export class AuthService {

  private api:string = 'http://bookstore-rest.s1510456024.student.kwmhgb.at/api/auth';//'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string ) {
    return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
  }


  public getCurrentUserId(){
    return Number.parseInt(localStorage.getItem('userId'));
  }

  public setLocalStorage(token: string) {
    const decodedToken = decode(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);
    localStorage.setItem('roleId', decodedToken.user.role_id);
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("roleId");
    console.log("logged out");
  }

  public isLoggedIn() {
    return !isNullOrUndefined(localStorage.getItem("token"));
  }

  public isAdmin() {
    if(localStorage.getItem('roleId') == '1') {
      return true;
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}
