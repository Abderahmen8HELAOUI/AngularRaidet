import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Document} from "../../models/document.model";
import {DocumentService} from "../../_services/document.service";
import {ActivityService} from "../../_services/activity.service";

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {

  document: Document = {
    title: '',
    photo: '',
    description: '',
    published: false,
    dossierTitle: '',
    creationDate: ''
  };
  submitted = false;

  constructor(private activityService :ActivityService,
              private documentService :DocumentService,
              private router: Router,
              private toastr: ToastrService) { }

  public listDossierTitles: Array<string> = [];

  ngOnInit(): void {
    this.dropdownDossierTitlesRefresh();
  }

  saveDocument(): void {
    const data = {
      title: this.document.title,
      photo: this.document.photo,
      description: this.document.description,
      dossierTitle: this.document.dossierTitle
    };

    this.documentService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/documents']);
          this.toastr.success('تم حفظ الوثيقة بنجاح', 'منظومة رائدات')
        },
        error => {
          console.log(error);
        });
  }

  dropdownDossierTitlesRefresh(){
    this.activityService.getDropDownDossierTitles().subscribe(data=>{
      this.listDossierTitles = data;
      console.log(data);

    })
  }

  newDocument(): void {
    this.submitted = false;
    this.document = {
      title: '',
      photo: '',
      description: '',
      dossierTitle: '',
      published: false,
      creationDate: ''
    };
  }

}
