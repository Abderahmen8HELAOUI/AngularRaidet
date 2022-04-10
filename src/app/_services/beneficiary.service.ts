import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Beneficiary} from "../models/beneficiary.model";
import {File} from "../models/file.model";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";


const baseUrl = 'http://localhost:8080/api/beneficiaries';
const baseFileUrl = 'http://localhost:8080/api/upload';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  baseUrl = environment.baseUrl;

    public photoUrl = 'http://localhost:8080/api/uploads/';

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'beneficiaries', { params });
  }

  get(id: any): Observable<Beneficiary> {
    return this.http.get(this.baseUrl + 'beneficiaries/' + id);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'beneficiaries' , data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'beneficiaries/' + id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'beneficiaries/' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl + 'beneficiaries');
  }

  getDropDownUserNames(): Observable<any>{
    return this.http.get<User[]>(this.baseUrl + 'beneficiaries/userNames');
  }

  getDropDownEmails(): Observable<any>{
    return this.http.get<User[]>(this.baseUrl + 'beneficiaries/Emails');
  }

  UploadPhoto(val:any){
    return this.http.post(baseFileUrl,val);
  }

  getFileName(filename: any): Observable<any> {
    return this.http.get(this.baseUrl + filename);
  }

  getBeneficiaryNumber(){
    return this.http.get(this.baseUrl + 'beneficiaries/beneficiariesNumber');
  }
}
