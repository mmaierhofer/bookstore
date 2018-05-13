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
    console.log("Storing token");
    console.log(token);
    const decodedToken = decode(token);
    console.log(decodedToken);
    console.log(decodedToken.user.id);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);
    //this.setCurrentUserId();
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    console.log("logged out");
  }

  public isLoggedIn() {
    return !isNullOrUndefined(localStorage.getItem("token"));
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}
