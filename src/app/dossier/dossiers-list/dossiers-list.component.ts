import { Component, OnInit } from '@angular/core';
import {Dossier} from "../../models/dossier.model";
import {DossierService} from "../../_services/dossier.service";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-dossiers-list',
  templateUrl: './dossiers-list.component.html',
  styleUrls: ['./dossiers-list.component.css']
})
export class DossiersListComponent implements OnInit {

  fileName= 'قائمة الملفات.xlsx';
  dossiers: Dossier[] = [];
  currentDossier: Dossier = {};
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private dossierService: DossierService) { }

  ngOnInit(): void {
    this.retrieveDossiers();
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

  retrieveDossiers(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.dossierService.getAll(params)
      .subscribe({
        next: (data) => {
          this.dossiers =data.Dossiers;
          this.count = data.totalItems;
          this.page=data.currentPage
          // this.pageSize =3
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveDossiers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveDossiers();
  }

  refreshList(): void {
    this.retrieveDossiers();
    this.currentDossier = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(dossier: Dossier, index: number): void {
    this.currentDossier = dossier;
    this.currentIndex = index;
  }

  removeAllDossiers(): void {
    this.dossierService.deleteAll()
      .subscribe({
        next: res => {
          console.log(res);
          this.refreshList();
        },
        error: err => {
          console.log(err);
        }
      });

  }

  searchTitle(): void {
    this.page = 1;
    this.retrieveDossiers();
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
