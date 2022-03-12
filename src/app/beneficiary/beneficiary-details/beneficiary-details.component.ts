import { Component, OnInit } from '@angular/core';
import {Beneficiary} from "../../models/beneficiary.model";
import {ActivityService} from "../../_services/activity.service";
import {BeneficiaryService} from "../../_services/beneficiary.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-beneficiary-details',
  templateUrl: './beneficiary-details.component.html',
  styleUrls: ['./beneficiary-details.component.css']
})
export class BeneficiaryDetailsComponent implements OnInit {
  currentBeneficiary: Beneficiary = {
    title: '',
    lastname: '',

    cin: '',
    birthdate: '',

    address: '',
    ville: '',
    codePostal: '',
    governorate: '',

    photo: '',
    numTel: '',
    mail: '',
    activityTitle: '',
    userName: ''
  };

  public listStates: Array<string> = [];
  public listCities: Array<string> = [];
  public listUserNames: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    private activityService :ActivityService,
    private beneficiaryService :BeneficiaryService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getBeneficiary(this.route.snapshot.params.id);
    this.dropdownStatesRefresh();
    this.dropdownCitiesRefresh();
    this.dropdownUserNamesRefresh();
  }

  dropdownCitiesRefresh(){
    this.activityService.getDropDownCities().subscribe(data=>{
      this.listCities = data;
      console.log(data);

    })
  }

  dropdownUserNamesRefresh(){
    this.beneficiaryService.getDropDownUserNames().subscribe(data=>{
      this.listUserNames = data;
      console.log(data);

    })
  }

  dropdownStatesRefresh(){
    this.activityService.getDropDownStates().subscribe(data=>{
      this.listStates = data;
      console.log(data);

    })
  }

  getBeneficiary(id: string): void {
    this.beneficiaryService.get(id)
      .subscribe(
        data => {
          this.currentBeneficiary = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

 updateBeneficiary(): void {
    this.beneficiaryService.update(this.currentBeneficiary.id, this.currentBeneficiary)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/Beneficiaries']);
          this.toastr.info('تم تحيين المترشحة بنجاح', 'منظومة رايدة');
        },
        error => {
          console.log(error);
        });
  }

  deleteBeneficiary(): void {
    if(confirm('هل تريد فعلا حذف المترشحة؟'))
    {
      this.beneficiaryService.delete(this.currentBeneficiary.id)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/Beneficiaries']);
            this.toastr.error('تم حذف المترشحة بنجاح', 'منظومة رايدة');
          },
          error => {
            console.log(error);
          });
    }

  }


}
