import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";



// const AUTH_API = 'http://localhost:8080/api/auth/';


const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {




    return this.http.post(this.baseUrl + 'auth/signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, regionalCommissary: string): Observable<any> {




    return this.http.post(this.baseUrl + 'auth/signup', {
      username,
      email,
      password,
      regionalCommissary,
    }, httpOptions);
  }

}
