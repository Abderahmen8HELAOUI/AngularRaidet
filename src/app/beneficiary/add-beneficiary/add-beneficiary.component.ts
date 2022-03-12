import { Component, OnInit } from '@angular/core';
import {ActivityService} from "../../_services/activity.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Beneficiary} from "../../models/beneficiary.model";
import {BeneficiaryService} from "../../_services/beneficiary.service";
import { Observable } from 'rxjs';
import {FileUploadService} from "../../_services/file-upload.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styles: [
  ]
})
export class AddBeneficiaryComponent implements OnInit {

  selectedCountry: String = "--Choose Country--";
  Countries: Array<any> = [
    { name: 'زغوان', states: [ {name: 'زغوان', cities: ['زغوان المدينة', 'زغوان الشمالية', 'زغوان الجنوبية']} ] },
    { name: 'سوسة', states: [ {name: 'سوسة المدينة', cities: ['بوجعفر']} ] },
    //Monastir
    { name: 'المنستير', states: [ {name: 'المنستيـر', cities: ['المدينة']},
                                  {name: 'الوردانيـن', cities: ['الوردانين ']},
                                  {name: 'الساحليـن', cities: ['الساحلين ']},
                                  {name: 'زرمديـن', cities: ['المزاوغة']},
                                  {name: 'بنـي حسان', cities: ['بني حسان القبلية']},
                                  {name: 'جمـال', cities: ['جمال القبلية']},
                                  {name: 'بنبلة', cities: ['بنبلة']},
                                  {name: 'المكنين', cities: ['المكنين الشرقية']},
                                  {name: 'البقالطة', cities: ['البقالطة الشمالية']},
                                  {name: 'طبلبة', cities: ['حومة السوق']},
                                  {name: 'قصر هلال', cities: ['عياد']},
                                  {name: 'قصيبة المديوني', cities: ['قصيبةالمديوني']},
                                  {name: 'صيادة لمطة بوحجر', cities: ['صيادة الشرقية']},] },
    //Mahdia
    { name: 'المهدية', states: [  {name: 'المهدية', cities: ['الحكايمة الغربية','الحكايمة الشرقية','الرمل','هيبون','الزقانة','الزهراء','الجواودة','السعد','شيبة','رجيش الجنوبية،','رجيش',' زويلة الجنوبية','زويلة','المهدية']},
                                  {name: 'بومرداس', cities: ['بومرداس','الحوس','كركر','الزراطة','الرواضي','الشوارعية','بوهلال العلي القبلية','بوهلال العلي الجوفية','منزل حمزة',]},
                                  {name: 'أولاد الشامخ', cities: ['أولاد الشامخ الجنوبية']},
                                  {name: ' شربان ', cities: ['شربان']},
                                  {name: 'هبيرة', cities: ['هبيرة']},
                                  {name: 'السواسي', cities: ['السواسي']},
                                  {name: 'الجم', cities: ['الزاوية']},
                                  {name: ' الشابة', cities: ['الشابة الشمالية']},
                                  {name: 'ملولش', cities: ['ملولش']},
                                  {name: 'سيدي علوان', cities: ['سيدي علوان الغربية']},
                                  {name: 'قصور الساف', cities: ['القصر']}] },
    { name: 'صفاقس', states: [ {name: 'صفاقس المدينة', cities: ['المدينة', 'باب البحر', 'الحي الخيري', 'البساتين']} ] },
  ];

  states: Array<any> = [];
  cities: Array<any> = [];
  changeCountry(country: any) {

    this.states = this.Countries.find((cntry: any) => cntry.name == country.target.value).states; //Angular 11
  }

  changeState(state: any) {
    this.cities = this.Countries.find((cntry: any) => cntry.name == this.selectedCountry).states.find((stat: any) => stat.name == state.target.value).cities; //Angular 11
  }


  leadingCategories: Array<any> = [
    { name: 'رائدة ذات أولوية', leadingSubCategories: [ {name: 'إمرأة معنفة'},{name: 'إمرأة عزباء'},{name: 'وضعية إجتماعية خصوصية'},{name: 'خريجة سجون'} ] },
    { name: 'رائدة سلاسل القيمة', leadingSubCategories: [ ] },
    { name: 'رائدة متضامنات', leadingSubCategories: [  ] },
    { name: 'رائدة مساندة', leadingSubCategories: [  ] },
    { name: 'رائدة تطوير', leadingSubCategories: [  ] },
    { name: 'رائدة إبتكار', leadingSubCategories: [  ] },
  ];


  leadingSubCategories: Array<any> = [];

  changeLeadingCategory(leadingCategory: any) {
    this.leadingSubCategories = this.leadingCategories.find((cntry: any) => cntry.name == leadingCategory.target.value).leadingSubCategories;
  }

  // UploadImagesComponent
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  // UploadImagesComponent
  beneficiary: Beneficiary = {
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
    userName: '',

    leadingCategory: '',
    leadingSubCategory: '',

    creationDate: ''
  };
  submitted = false;
  state = '';

  constructor(private activityService :ActivityService,
              private beneficiaryService :BeneficiaryService,
              private router: Router,
              private toastr: ToastrService,
              private uploadService: FileUploadService) { }

  public listStates: Array<string> = [];
  public listCities: Array<string> = [];
  public listUserNames: Array<string> = [];
  public listActivityTitles: Array<string> = [];


  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
    this.dropdownStatesRefresh();
    this.dropdownCitiesRefresh();
    this.dropdownUserNamesRefresh();
    this.dropdownActivityTitlesRefresh();
  }

  dropdownCitiesRefresh(){
    this.activityService.getDropDownCities().subscribe(data=>{
      this.listCities = data;
      console.log(data);

    })
  }

  dropdownStatesRefresh(){
    this.activityService.getDropDownStates().subscribe(data=>{
      this.listStates = data;
      console.log(data);

    })
  }

  dropdownActivityTitlesRefresh(){
    this.activityService.getDropDownActivityTitles().subscribe(data=>{
      this.listActivityTitles = data;
      console.log(data);

    })
  }

  dropdownUserNamesRefresh(){
    this.beneficiaryService.getDropDownUserNames().subscribe(data=>{
      this.listUserNames = data;
      console.log(data);

    })
  }

  saveBeneficiary(): void {
    const data = {
      title: this.beneficiary.title,
      lastname: this.beneficiary.lastname,

      birthdate: this.beneficiary.birthdate,
      cin: this.beneficiary.cin,

      address: this.beneficiary.address,
      ville: this.beneficiary.ville,
      codePostal: this.beneficiary.codePostal,
      governorate: this.beneficiary.governorate,

      photo: this.beneficiary.photo,
      numTel: this.beneficiary.numTel,
      mail: this.beneficiary.mail,
      activityTitle: this.beneficiary.activityTitle,
      userName: this.beneficiary.userName,

      leadingCategory:this.beneficiary.leadingCategory,
      leadingSubCategory:this.beneficiary.leadingSubCategory
    };

    this.beneficiaryService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/Beneficiaries']);
          this.toastr.success('تم حفظ المترشحة بنجاح', 'منظومة رايدة')
        },
        error => {
          console.log(error);
          this.toastr.error('لا يمكن أستعمال أسم المشروع مرتين', 'منظومة رايدة');
        });
  }

  newActivity(): void {
    this.submitted = false;
    this.beneficiary = {
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

      activityTitle: '',
      userName: '',

      leadingCategory:'',
      leadingSubCategory:'',

      creationDate: ''
    };
  }


  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        });
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

}
