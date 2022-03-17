import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dossier} from "../models/dossier.model";
import {environment} from "../../environments/environment";

const baseUrl = 'https://gestion-raidet.herokuapp.com/api/dossiers';

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/dossiers', { params });
  }

  get(id: any): Observable<Dossier> {
    return this.http.get(this.baseUrl + 'api/dossiers' + id);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/dossiers', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'api/dossiers' + id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/dossiers' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: any): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(`${baseUrl}?title=${title}`);
  }

  getDossierNumber(){
    return this.http.get(this.baseUrl + 'api/dossiers/dossierNumber');
  }
}
