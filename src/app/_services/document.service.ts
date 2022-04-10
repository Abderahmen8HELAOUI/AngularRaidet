import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Document } from '../models/document.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'documents', { params });
  }

  get(id: any): Observable<Document> {
    return this.http.get(this.baseUrl + 'documents/' + id);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'documents' , data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'documents/' + id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'documents/' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

}
