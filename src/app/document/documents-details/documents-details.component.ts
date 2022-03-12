import { Component, OnInit } from '@angular/core';
import {Document} from "../../models/document.model";
import {ActivityService} from "../../_services/activity.service";
import {DocumentService} from "../../_services/document.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-documents-details',
  templateUrl: './documents-details.component.html',
  styleUrls: ['./documents-details.component.css']
})
export class DocumentsDetailsComponent implements OnInit {

  currentDocument: Document = {
    title: '',
    photo: '',
    description: '',
    dossierTitle: '',
    creationDate: '',
    published: false
  };

  public listDossierTitles: Array<string> = [];

  constructor(private activityService: ActivityService,
              private documentService: DocumentService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.dropdownDossierTitlesRefresh();
    this.getDocument(this.route.snapshot.params.id);
  }

  dropdownDossierTitlesRefresh() {
    this.activityService.getDropDownDossierTitles().subscribe(data => {
      this.listDossierTitles = data;
      console.log(data);

    })
  }

  getDocument(id: string): void {
    this.documentService.get(id)
      .subscribe(
        data => {
          this.currentDocument = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentDocument.title,
      photo: this.currentDocument.photo,
      description: this.currentDocument.description,
      dossierTitle: this.currentDocument.dossierTitle,
      creationDate: this.currentDocument.creationDate,
      published: status
    };

    this.documentService.update(this.currentDocument.id, data)
      .subscribe(
        response => {
          this.currentDocument.published = status;
          console.log(response);
          this.toastr.info('تم تحيين حالة الوثيقة بنجاح', 'منظومة رايدة');
        },
        error => {
          console.log(error);
        });
  }

  updateDocument(): void {
    this.documentService.update(this.currentDocument.id, this.currentDocument)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/documents']);
          this.toastr.info('تم تحيين الوثيقة بنجاح', 'منظومة رايدة');
        },
        error => {
          console.log(error);
        });
  }

  deleteDocument(): void {
    if (confirm('هل تريد فعلا حذف الوثيقة؟')) {
      this.documentService.delete(this.currentDocument.id)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/documents']);
            this.toastr.error('تم حذف الوثيقة بنجاح', 'منظومة رايدة');
          },
          error => {
            console.log(error);
          });
    }

  }
}
