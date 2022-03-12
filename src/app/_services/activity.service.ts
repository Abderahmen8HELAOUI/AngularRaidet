import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../models/activity.model";
import {State} from "../models/state.model";
import {City} from "../models/city.model";
import {Beneficiary} from "../models/beneficiary.model";
import {Dossier} from "../models/dossier.model";

const baseUrl = 'http://localhost:8080/api/activities';
const citiesUrl = 'http://localhost:8080/api/citiesNames';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private statesUrl = '//localhost:8080/api/stateNames';
  private activityUrl = 'http://localhost:8080/api/activityTitles';
  private beneficiaryCinUrl = 'http://localhost:8080/api/beneficiaryCins';
  private dossierTitleUrl = 'http://localhost:8080/api/dossierTitles';


  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params });
  }

  get(id: any): Observable<Activity> {
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

  findByTitle(title: any): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${baseUrl}?title=${title}`);
  }

  getDropDownStates(): Observable<any>{
    return this.http.get<State[]>(this.statesUrl);
  }

  getDropDownCities(): Observable<any>{
    return this.http.get<City[]>(citiesUrl);
  }

  getDropDownActivityTitles(): Observable<any>{
    return this.http.get<Activity[]>(this.activityUrl);
  }

  getDropDownBeneficiaryCins(): Observable<any>{
    return this.http.get<Beneficiary[]>(this.beneficiaryCinUrl);
  }

  getDropDownDossierTitles(): Observable<any>{
    return this.http.get<Dossier[]>(this.dossierTitleUrl);
  }

  getTotalNumber(){
    return this.http.get(`${baseUrl}/activitiesNumber`);
  }

  getActivitiesTotalAmount(){
    return this.http.get(`${baseUrl}/activitiesTotalAmount`);
  }


}

