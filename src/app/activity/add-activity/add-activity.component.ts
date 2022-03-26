import { Component, OnInit } from '@angular/core';
import {Activity} from "../../models/activity.model";
import {ActivityService} from "../../_services/activity.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";


@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  selectedCountry: String = "--Choose Country--";
  Countries: Array<any> = [
    { name: 'زغوان', states: [{name: 'زغوان', cities: ['زغوان المدينة', 'زغوان الشمالية', 'زغوان الجنوبية']},
        {name: 'الزريبة', cities: ['زغوان المدينة', 'زغوان الشمالية', 'زغوان الجنوبية']},
        {name: 'بئر مشارقة', cities: ['زغوان المدينة', 'زغوان الشمالية', 'زغوان الجنوبية']},
        {name: 'الفحص', cities: ['زغوان المدينة', 'زغوان الشمالية', 'زغوان الجنوبية']},
        {name: 'الناظور', cities: ['زغوان المدينة', 'زغوان الشمالية', 'زغوان الجنوبية']},
        {name: 'صواف', cities: ['زغوان المدينة', 'زغوان الشمالية', 'زغوان الجنوبية']},

      ] },
    { name: 'سوسة', states: [ {name: 'سوسة المدينة', cities: ['بوجعفر']},
        {name: 'الزاوية القصيبة الثريات', cities: ['زاوية سوسة']},
        {name: 'سوسة الرياض', cities: ['الزهور']},
        {name: 'سوسة جوهرة', cities: ['وادي بليبان']},
        {name: 'سوسة سيدي عبد الحميد ', cities: ['الطيب المهيري']},
        {name: 'حمام سوسة', cities: ['المدينة']},
        {name: 'أكودة', cities: ['أكودة الشرقية']},
        {name: 'القلعة الكبرى', cities: ['الجرابعة']},
        {name: 'سيدي بوعلية', cities: ['سيدي بوعلي']},
        {name: 'هرقلة', cities: ['هرقلة']},
        {name: 'النفيضة', cities: ['النفيضة']},
        {name: 'بوفيشة', cities: ['بوفيشة']},
        {name: 'كندار', cities: ['كندار']},
        {name: 'سيدي الهاني', cities: ['سيدي الهاني المركزية']},
        {name: 'مساكن', cities: ['التوارة الشمالية']},
        {name: 'القلعة الصغرىة', cities: ['القلعة الصغرى الشرقية']},] },
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
        {name: 'أولاد الشامخ', cities: ['أولاد الشامخ الجنوبية','أولاد الشامخ الشمالية','أولاد عمر','الشحيمات الشمالية','العجيلات','السمرة','بوسليم','المحارزة الشمالية',]},
        {name: 'شربان', cities: ['شربان','المعاطي','الشحدة القبلية','الشحدة الشرقية','القواسم الغربية','القواسم الشرقية','الشرف','القرادحة الغربية','القرادحة الشرقية','أولاد الحناشي',]},
        {name: 'هبيرة', cities: ['هبيرة']},
        {name: 'السواسي', cities: ['السواسي']},
        {name: 'الجم', cities: ['الزاوية']},
        {name: ' الشابة', cities: ['']},
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

  activity: Activity = {
    title: '',
    description: '',
    address: '',
    ville: '',
    codePostal: '',
    governorate: '',
    codeFiscal: '',
    photo: '',
    email: '',
    numTel: '',
    siteWeb: '',
    workerNumber: 0,
    amount: 0,
    beneficiaryCin: '',
    dossierTitle: '',
    published: false,
    creationDate: ''

  };
  submitted = false;


  constructor(private activityService :ActivityService,
              private router: Router,
              private toastr: ToastrService) { }

  public listStates: Array<string> = [];
  public listCities: Array<string> = [];
  public listBeneficiaryCins: Array<string> = [];
  public listDossierTitles: Array<string> = [];
  state = [] as any;
  city:any=[];

  ngOnInit(): void {
    this.dropdownBeneficiaryCinsRefresh();
    this.dropdownDossierTitlesRefresh();
  }


  dropdownBeneficiaryCinsRefresh(){
    this.activityService.getDropDownBeneficiaryCins().subscribe(data=>{
      this.listBeneficiaryCins = data;
      console.log(data);

    })
  }

  dropdownDossierTitlesRefresh(){
    this.activityService.getDropDownDossierTitles().subscribe(data=>{
      this.listDossierTitles = data;
      console.log(data);

    })
  }

  saveActivity(): void {
    const data = {
      title: this.activity.title,
      description: this.activity.description,
      address: this.activity.address,
      ville: this.activity.ville,
      codePostal: this.activity.codePostal,
      governorate: this.activity.governorate,
      codeFiscal: this.activity.codeFiscal,
      photo: this.activity.photo,
      email: this.activity.email,
      numTel: this.activity.numTel,
      siteWeb: this.activity.siteWeb,
      workerNumber: this.activity.workerNumber,
      amount: this.activity.amount,
      beneficiaryCin: this.activity.beneficiaryCin,
      dossierTitle: this.activity.dossierTitle
    };

    this.activityService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/activities']);
          this.toastr.success('تم حفظ النشاط بنجاح', 'منظومة رايدة')
        },
        error => {
          console.log(error);
        });
  }

  newActivity(): void {
    this.submitted = false;
    this.activity = {
      title: '',
      description: '',
      address: '',
      ville: '',
      codePostal: '',
      governorate: '',
      codeFiscal: '',
      photo: '',
      email: '',
      numTel: '',
      siteWeb: '',
      workerNumber: 0,
      amount: 0,
      beneficiaryCin: '',
      dossierTitle: '',
      published: false,
      creationDate: ''
    };
  }


}
