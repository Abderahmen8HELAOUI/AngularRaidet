import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../models/activity.model";
import {State} from "../models/state.model";
import {City} from "../models/city.model";
import {Beneficiary} from "../models/beneficiary.model";
import {Dossier} from "../models/dossier.model";
import {environment} from "../../environments/environment";

//const baseUrl = 'https://gestion-raidet.herokuapp.com/api/activities';
//const citiesUrl = 'https://gestion-raidet.herokuapp.com/api/citiesNames';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  baseUrl = environment.baseUrl;
  //private statesUrl = 'https://gestion-raidet.herokuapp.com/api/stateNames';
  private activityUrl = 'https://gestion-raidet.herokuapp.com/api/activityTitles';
  private beneficiaryCinUrl = 'https://gestion-raidet.herokuapp.com/api/beneficiaryCins';
  private dossierTitleUrl = 'https://gestion-raidet.herokuapp.com/api/dossierTitles';


  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/activities', { params });
  }

  get(id: any): Observable<Activity> {
    return this.http.get(this.baseUrl + id);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.baseUrl+id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.baseUrl+id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: any): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.baseUrl + 'title' + title);
  }

  getDropDownStates(): Observable<any>{
    return this.http.get<State[]>(this.baseUrl + 'api/stateNames');
  }

  getDropDownCities(): Observable<any>{
    return this.http.get<City[]>(this.baseUrl + 'api/citiesNames');
  }

  getDropDownActivityTitles(): Observable<any>{
    return this.http.get<Activity[]>(this.baseUrl + 'api/activityTitles');
  }

  getDropDownBeneficiaryCins(): Observable<any>{
    return this.http.get<Beneficiary[]>(this.baseUrl + 'api/beneficiaryCins');
  }

  getDropDownDossierTitles(): Observable<any>{
    return this.http.get<Dossier[]>(this.baseUrl + 'api/dossierTitles');
  }

  getTotalNumber(){
    return this.http.get(this.baseUrl + 'activitiesNumber');
  }

  getActivitiesTotalAmount(){
    return this.http.get(this.baseUrl + 'activitiesTotalAmount');
  }


}

