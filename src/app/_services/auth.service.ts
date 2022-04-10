import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

<<<<<<< HEAD
const AUTH_API = 'http://localhost:8080/api/auth/';
=======
// const AUTH_API = 'http://localhost:8080/api/auth/';
>>>>>>> 346ed1d (some changes)

const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
<<<<<<< HEAD
    return this.http.post(AUTH_API + 'signin', {
=======
    return this.http.post(this.baseUrl + 'auth/signin', {
>>>>>>> 346ed1d (some changes)
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, regionalCommissary: string): Observable<any> {
<<<<<<< HEAD
    return this.http.post(AUTH_API + 'signup', {
=======
    return this.http.post(this.baseUrl + 'auth/signup', {
>>>>>>> 346ed1d (some changes)
      username,
      email,
      password,
      regionalCommissary,
    }, httpOptions);
  }

}
