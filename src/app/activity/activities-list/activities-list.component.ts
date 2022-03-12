import { Component, OnInit } from '@angular/core';
import {Activity} from "../../models/activity.model";
import {ActivityService} from "../../_services/activity.service";
import {ToastrService} from "ngx-toastr";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent implements OnInit {

  fileName= 'قائمة المشاريع.xlsx';
  activities: Activity[] = [];
  currentActivity: Activity = {};
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private activityService :ActivityService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.retrieveActivities();

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

  retrieveActivities(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.activityService.getAll(params)
      .subscribe(
        response => {
          const { activities, totalItems } = response;
          this.activities = activities;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveActivities();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveActivities();
  }

  refreshList(): void {
    this.retrieveActivities();
    this.currentActivity = {};
    this.currentIndex = -1;
  }

  setActiveActivity(activity: Activity, index: number): void {
    this.currentActivity = activity;
    this.currentIndex = index;
  }

  removeAllActivities(): void {
    if(confirm('هل تريد فعلا حذف جميع الأنشطة؟'))
    {
      this.activityService.deleteAll()
        .subscribe(
          response => {
            console.log(response);
            this.refreshList();
            this.toastr.error('تم حذف جميع الأنشطة بنجاح', 'منظومة رايدة')
          },
          error => {
            console.log(error);
          });
    }

  }

  searchTitle(): void {
    this.page = 1;
    this.retrieveActivities();
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
