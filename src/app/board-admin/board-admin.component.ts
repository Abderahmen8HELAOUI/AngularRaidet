import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {ActivityService} from "../_services/activity.service";
import {BeneficiaryService} from "../_services/beneficiary.service";
import {DossierService} from "../_services/dossier.service";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  total: any
  sumWorkerNumber: any
  activitiesTotalAmount: any;
  beneficiariesNumber: any
  dossierNumber: any;
  documentNumber: any;

  constructor(private userService: UserService,
              private activityService: ActivityService,
              private beneficiaryService: BeneficiaryService,
              private dossierService: DossierService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.activityService.getTotalNumber().subscribe(
      res => {
        this.total = res;
        console.log(res);
      }
    );

    this.activityService.getSumWorkerNumber().subscribe(
      res => {
        this.sumWorkerNumber = res;
        console.log(res);
      }
    );

    this.activityService.getActivitiesTotalAmount().subscribe(
      res => {
        this.activitiesTotalAmount = res;
        console.log(res);
      }
    )

    this.beneficiaryService.getBeneficiaryNumber().subscribe(
      res => {
        this.beneficiariesNumber = res;
        console.log(res);
      }
    );

    this.dossierService.getDossierNumber().subscribe(
      res => {
        this.dossierNumber = res;
        console.log(res);
      }
    );

    this.dossierService.getDocumentNumber().subscribe(
      res => {
        this.dossierNumber = res;
        console.log(res);
      }
    );

  }
}
