import { Component, OnInit } from '@angular/core';
import {Activity} from "../../models/activity.model";
import {ActivityService} from "../../_services/activity.service";
import {ToastrService} from "ngx-toastr";
import {Document} from "../../models/document.model";
import {DocumentService} from "../../_services/document.service";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {

  fileName= 'قائمة الوثائق.xlsx';
  documents: Document[] = [];
  currentDocument: Document = {};
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private documentService :DocumentService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.retrieveDocuments();

  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveDocuments(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.documentService.getAll(params)
      .subscribe(
        response => {
          const { documents, totalItems } = response;
          this.documents = documents;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveDocuments();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveDocuments();
  }

  refreshList(): void {
    this.retrieveDocuments();
    this.currentDocument = {};
    this.currentIndex = -1;
  }

  setActiveActivity(activity: Activity, index: number): void {
    this.currentDocument = activity;
    this.currentIndex = index;
  }

  removeAllDocuments(): void {
    if(confirm('هل تريد فعلا حذف جميع الوثائق؟'))
    {
      this.documentService.deleteAll()
        .subscribe(
          response => {
            console.log(response);
            this.refreshList();
            this.toastr.error('تم حذف جميع الوثائق بنجاح', 'منظومة رايدة')
          },
          error => {
            console.log(error);
          });
    }

  }

  searchTitle(): void {
    this.page = 1;
    this.retrieveDocuments();
  }


  exportExcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
}
