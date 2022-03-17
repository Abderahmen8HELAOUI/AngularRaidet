import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Document } from '../models/document.model';
import {environment} from "../../environments/environment";

const baseUrl = 'https://gestion-raidet.herokuapp.com/api/documents';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/documents', { params });
  }

  get(id: any): Observable<Document> {
    return this.http.get(this.baseUrl + 'api/documents' + id);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/documents', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'api/documents' + id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/documents' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Document[]> {
    return this.http.get<Document[]>(`${baseUrl}?title=${title}`);
  }
}
