import {Component, Input, OnInit} from '@angular/core';
import {Tutorial} from "../../models/tutorial.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TutorialService} from "../../_services/tutorial.service";
import {Dossier} from "../../models/dossier.model";
import {DocumentService} from "../../_services/document.service";
import {DossierService} from "../../_services/dossier.service";

@Component({
  selector: 'app-dossiers-details',
  templateUrl: './dossiers-details.component.html',
  styleUrls: ['./dossiers-details.component.css']
})
export class DossiersDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentDossier: Dossier = {
    title: '',
    creationDate: '',
    statusDossier: '',
    documentNumber: 0,
    activityTitle: '',
    published: false
  };

  message = '';

  constructor(
    private dossierService: DossierService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params["id"]);
    }
  }

  getTutorial(id: string): void {
    this.dossierService.get(id)
      .subscribe({
        next: (data) => {
          this.currentDossier = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentDossier.title,
      creationDate: this.currentDossier.creationDate,
      statusDossier: this.currentDossier.statusDossier,
      documentNumber:this.currentDossier.documentNumber,
      activityTitle: this.currentDossier.activityTitle,
      published: status
    };

    this.message = '';

    this.dossierService.update(this.currentDossier.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentDossier.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateTutorial(): void {
    this.message = '';

    this.dossierService.update(this.currentDossier.id, this.currentDossier)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
          this.router.navigate(['/documents']);
        },
        error: (e) => console.error(e)
      });
  }

  deleteTutorial(): void {
    this.dossierService.delete(this.currentDossier.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/documents']);
        },
        error: (e) => console.error(e)
      });
  }

}
