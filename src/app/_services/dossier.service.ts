import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dossier} from "../models/dossier.model";

const baseUrl = 'https://gestion-raidet.herokuapp.com/api/dossiers';

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params });
  }

  get(id: any): Observable<Dossier> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(`${baseUrl}?title=${title}`);
  }

  getDossierNumber(){
    return this.http.get(`${baseUrl}/dossierNumber`);
  }
}