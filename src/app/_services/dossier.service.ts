import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dossier} from "../models/dossier.model";
import {Activity} from "../models/activity.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  baseUrl = environment.baseUrl;

 constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'dossiers', { params });
  }

  get(id: any): Observable<Dossier> {
    return this.http.get(this.baseUrl + 'dossiers/' + id);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'dossiers/', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'dossiers/' + id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'dossiers/' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl + 'dossiers/');
  }

  getDossierNumber(){
    return this.http.get(this.baseUrl + 'dossiers/dossierNumber');
  }

  getActivityTitles(): Observable<any>{
    return this.http.get<Activity[]>(this.baseUrl + 'dossiers/activityTitles');

  }

  getDocumentNumber(){
    return this.http.get(this.baseUrl + 'dossiers/documentNumber');

  }
}
