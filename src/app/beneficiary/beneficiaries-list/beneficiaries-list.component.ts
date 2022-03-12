import { Component, OnInit } from '@angular/core';
import {Beneficiary} from "../../models/beneficiary.model";
import {ToastrService} from "ngx-toastr";
import {BeneficiaryService} from "../../_services/beneficiary.service";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-beneficiaries-list',
  templateUrl: './beneficiaries-list.component.html',
  styles: [
  ]
})
export class BeneficiariesListComponent implements OnInit {

  fileName= 'قائمة الباعثات.xlsx';
  beneficiaries: Beneficiary[] = [];
  currentBeneficiary: Beneficiary = {};
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private beneficiaryService :BeneficiaryService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.retrieveBeneficiaries();

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

  retrieveBeneficiaries(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.beneficiaryService.getAll(params)
      .subscribe(
        response => {
          const { beneficiaries, totalItems } = response;
          this.beneficiaries = beneficiaries;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveBeneficiaries();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveBeneficiaries();
  }

  refreshList(): void {
    this.retrieveBeneficiaries();
    this.currentBeneficiary = {};
    this.currentIndex = -1;
  }

  setActiveBeneficiary(beneficiary: Beneficiary, index: number): void {
    this.currentBeneficiary = beneficiary;
    this.currentIndex = index;
  }

  removeAllBeneficiaries(): void {
    if(confirm('هل تريد فعلا حذف جميع المترشحات؟')) {
      this.beneficiaryService.deleteAll()
        .subscribe(
          response => {
            console.log(response);
            this.refreshList();
            this.toastr.error('تم حذف جميع النترشحات بنجاح', 'منظومة رايدة')
          },
          error => {
            console.log(error);
          });
    }
  }

  searchTitle(): void {
    this.page = 1;
    this.retrieveBeneficiaries();
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
