import { Component, OnInit } from '@angular/core';
import {Dossier} from "../../models/dossier.model";
import {DossierService} from "../../_services/dossier.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ActivityService} from "../../_services/activity.service";

@Component({
  selector: 'app-add-dossier',
  templateUrl: './add-dossier.component.html',
  styleUrls: ['./add-dossier.component.css']
})
export class AddDossierComponent implements OnInit {

  dossier: Dossier = {
    title: '',
    creationDate: '',
    statusDossier: '',
    documentNumber: 0,
    activityTitle: '',
    published: false
  };
  submitted = false;

  public listActivityTitles: Array<string> = [];

  constructor(private dossierService: DossierService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dropdownDossierTitlesRefresh();
  }

  dropdownDossierTitlesRefresh(){
    this.dossierService.getActivityTitles().subscribe(data=>{
      this.listActivityTitles = data;
      console.log(data);

    })
  }

  saveDossier(): void {
    const data = {
      title: this.dossier.title,
      statusDossier: this.dossier.statusDossier,
      documentNumber: this.dossier.documentNumber,
      activityTitle: this.dossier.activityTitle
    };

    this.dossierService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.router.navigate(['/dossiers']);
          this.toastr.success('تم حفظ الملف بنجاح', 'منظومة رايدة')
        },
        error: (e) => console.error(e)
      });
  }

  newDossier(): void {
    this.submitted = false;
    this.dossier = {
      title: '',
      creationDate: '',
      statusDossier: '',
      documentNumber: 0,
      activityTitle: '',
      published: false
    };
  }

}
