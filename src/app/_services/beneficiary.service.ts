import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Beneficiary} from "../models/beneficiary.model";
import {File} from "../models/file.model";
import {User} from "../models/user.model";


const baseUrl = 'https://gestion-raidet.herokuapp.com/api/beneficiaries';
const baseFileUrl = 'https://gestion-raidet.herokuapp.com/upload';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  public photoUrl = 'https://gestion-raidet.herokuapp.com/uploads/';

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params });
  }

  get(id: any): Observable<Beneficiary> {
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

  findByTitle(title: any): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${baseUrl}?title=${title}`);
  }

  getDropDownUserNames(): Observable<any>{
    return this.http.get<User[]>(`${baseUrl}/userNames`);
  }

  UploadPhoto(val:any){
    return this.http.post(baseFileUrl,val);
  }

  getFileName(filename: any): Observable<any> {
    return this.http.get(`${baseUrl}/${filename}`);
  }

  getBeneficiaryNumber(){
    return this.http.get(`${baseUrl}/beneficiariesNumber`);
  }
}
