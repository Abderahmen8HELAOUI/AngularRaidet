import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../models/activity.model";
import {Beneficiary} from "../models/beneficiary.model";
import {Dossier} from "../models/dossier.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'activities' , { params });
  }

  get(id: any): Observable<Activity> {
    return this.http.get(this.baseUrl + 'activities/' + id);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'activities', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'activities/' + id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'activities/' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl + 'activities');
  }

  getDropDownActivityTitles(): Observable<any>{
    return this.http.get<Activity[]>(this.baseUrl + 'activityTitles');
  }

  getDropDownBeneficiaryCins(): Observable<any>{
    return this.http.get<Beneficiary[]>(this.baseUrl + 'beneficiaryCins');
  }

  getDropDownDossierTitles(): Observable<any>{
    return this.http.get<Dossier[]>(this.baseUrl + 'activities/dossierTitles');
  }

  getTotalNumber(){
    return this.http.get(this.baseUrl + 'activities/activitiesNumber');
  }

  getActivitiesTotalAmount(){
    return this.http.get(this.baseUrl + 'activities/activitiesTotalAmount');
  }

  getSumWorkerNumber(){
    return this.http.get(this.baseUrl + 'activities/sumWorkerNumber');
  }


}

