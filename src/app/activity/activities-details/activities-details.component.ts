import { Component, OnInit } from '@angular/core';
import {Activity} from "../../models/activity.model";
import {ActivityService} from "../../_services/activity.service";
import {ToastrService} from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activities-details',
  templateUrl: './activities-details.component.html',
  styleUrls: ['./activities-details.component.css']
})
export class ActivitiesDetailsComponent implements OnInit {
  currentActivity: Activity = {
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
    published: false
  };

  public listStates: Array<string> = [];
  public listCities: Array<string> = [];
  public listBeneficiaryCins: Array<string> = [];
  public listDossierTitles: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService :ActivityService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getActivity(this.route.snapshot.params.id);
    this.dropdownStatesRefresh();
    this.dropdownCitiesRefresh();
    this.dropdownBeneficiaryCinsRefresh();
    this.dropdownDossierTitlesRefresh();
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

  getActivity(id: string): void {
    this.activityService.get(id)
      .subscribe(
        data => {
          this.currentActivity = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateStarted(status: boolean): void {
    const data = {
      title: this.currentActivity.title,
      description: this.currentActivity.description,
      started: status
    };

    this.activityService.update(this.currentActivity.id, data)
      .subscribe(
        response => {
          this.currentActivity.published = status;
          console.log(response);
          this.toastr.info('تم تحيين حالة المشروع بنجاح', 'منظومة رايدة');
        },
        error => {
          console.log(error);
        });
  }

  updateActivity(): void {
    this.activityService.update(this.currentActivity.id, this.currentActivity)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/activities']);
          this.toastr.info('تم تحيين النشاط بنجاح', 'منظومة رايدة');
        },
        error => {
          console.log(error);
        });
  }

  deleteActivity(): void {
    if(confirm('هل تريد فعلا حذف المشروع؟'))
    {
      this.activityService.delete(this.currentActivity.id)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/activities']);
            this.toastr.error('تم حذف المشروع بنجاح', 'منظومة رايدة');
          },
          error => {
            console.log(error);
          });
    }

  }


}
