import { Component, OnInit } from '@angular/core';
import {Activity} from "../../models/activity.model";
import {ActivityService} from "../../_services/activity.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";


@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  activity: Activity = {
    title: '',
    description: '',
    address: '',
    ville: '',
    codePostal: '',
    governorate: '',
    codeFiscal: '',
    photo: '',
    email: '',
    numTel: '',
    siteWeb: '',
    workerNumber: 0,
    amount: 0,
    beneficiaryCin: '',
    dossierTitle: '',
    published: false,
    creationDate: ''

  };
  submitted = false;


  constructor(private activityService :ActivityService,
              private router: Router,
              private toastr: ToastrService,
              private authService:AuthService) { }

  public listStates: Array<string> = [];
  public listCities: Array<string> = [];
  public listBeneficiaryCins: Array<string> = [];
  public listDossierTitles: Array<string> = [];
  state = [] as any;
  city:any=[];

  ngOnInit(): void {
    this.dropdownBeneficiaryCinsRefresh();
    this.dropdownStatesRefresh();
    this.dropdownCitiesRefresh();
    this.dropdownDossierTitlesRefresh();
    this.state = this.authService.state();
  }

  dropdownCitiesRefresh(){
    this.activityService.getDropDownCities().subscribe(data=>{
      this.listCities = data;
      console.log(data);

    })
  }

  dropdownStatesRefresh(){
    this.activityService.getDropDownStates().subscribe(data=>{
      this.listStates = data;
      console.log(data);

    })
  }

  dropdownBeneficiaryCinsRefresh(){
    this.activityService.getDropDownBeneficiaryCins().subscribe(data=>{
      this.listBeneficiaryCins = data;
      console.log(data);

    })
  }

  dropdownDossierTitlesRefresh(){
    this.activityService.getDropDownDossierTitles().subscribe(data=>{
      this.listDossierTitles = data;
      console.log(data);

    })
  }

  saveActivity(): void {
    const data = {
      title: this.activity.title,
      description: this.activity.description,
      address: this.activity.address,
      ville: this.activity.ville,
      codePostal: this.activity.codePostal,
      governorate: this.activity.governorate,
      codeFiscal: this.activity.codeFiscal,
      photo: this.activity.photo,
      email: this.activity.email,
      numTel: this.activity.numTel,
      siteWeb: this.activity.siteWeb,
      workerNumber: this.activity.workerNumber,
      amount: this.activity.amount,
      beneficiaryCin: this.activity.beneficiaryCin,
      dossierTitle: this.activity.dossierTitle
    };

    this.activityService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/activities']);
          this.toastr.success('تم حفظ النشاط بنجاح', 'منظومة رايدة')
        },
        error => {
          console.log(error);
        });
  }

  newActivity(): void {
    this.submitted = false;
    this.activity = {
      title: '',
      description: '',
      address: '',
      ville: '',
      codePostal: '',
      governorate: '',
      codeFiscal: '',
      photo: '',
      email: '',
      numTel: '',
      siteWeb: '',
      workerNumber: 0,
      amount: 0,
      beneficiaryCin: '',
      dossierTitle: '',
      published: false,
      creationDate: ''
    };
  }
  onSelect(state: any){
    this.city = this.authService.city()
      .filter(e=>
        e.stateName == state.target.value);
  }

}
