import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

//const AUTH_API = 'https://gestion-raidet.herokuapp.com/api/auth/';

const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  state(){
    return [
      {
        id: 1,
        stateName: "أريانة"
      },
      {
        id: 2,
        stateName: "باجة"
      },
      {
        id: 3,
        stateName: "بن عروس"
      },
      {
        id: 4,
        stateName: "بنزرت"
      },{
        id: 5,
        stateName: "تطاوين"
      },
      {
        id: 6,
        stateName: "توزر"
      },
      {
        id: 7,
        stateName: "تونس"
      },
      {
        id: 8,
        stateName: "جندوبة"
      },
      {
        id: 9,
        stateName: "زغوان"
      },
      {
        id: 10,
        stateName: "سليانة"
      },
      {
        id: 11,
        stateName: "سوسة"
      },
      {
        id: 12,
        stateName: "سيدي بوزيد"
      },{
        id: 13,
        stateName: "صفاقس"
      },
      {
        id: 14,
        stateName: "قابس"
      },
      {
        id: 15,
        stateName: "قبلي"
      },
      {
        id: 16,
        stateName: "القصرين"
      },{
        id: 17,
        stateName: "قفصة"
      },
      {
        id: 18,
        stateName: "القيروان"
      },
      {
        id: 19,
        stateName: "الكاف"
      },
      {
        id: 20,
        stateName: "مدنين"
      },{
        id: 21,
        stateName: "المنستير"
      },
      {
        id: 22,
        stateName: "منوبة"
      },
      {
        id: 23,
        stateName: "المهدية"
      },
      {
        id: 24,
        stateName: "نابل"
      }
    ]
  }

  city(){
    return [
      //أريانة
      {
        stateName: "أريانة",
        name: "أريانة المدينة"
      },
      {
        stateName: "أريانة",
        name: "سكرة"
      },
      {
        stateName: "أريانة",
        name: "رواد"
      },
      {
        stateName: "أريانة",
        name: "قلعة الأندلس"
      },
      {
        stateName: "أريانة",
        name: "سيدي ثابت"
      },
      {
        stateName: "أريانة",
        name: "حي التضامن"
      },
      {
        stateName: "أريانة",
        name: "المنيهلة"
      },

      //سوسة
      {
        id: 11,
        name: "سوسة المدينة"
      },
      {
        id: 11,
        name: "الزاوية القصيبة الثريات"
      },
      {
        id: 11,
        name: "سوسة الرياض"
      },
      {
        id: 11,
        name: "سوسة جوهرة"
      },
      {
        id: 11,
        name: "سوسة سيدي عبد الحميد"
      },
      {
        id: 11,
        name: "حمام سوسة"
      },
      {
        id: 11,
        name: "أكودة"
      },
      {
        id: 11,
        name: "القلعة الكبرى"
      },
      {
        id: 11,
        name: "سيدي بوعلي"
      },
      {
        id: 11,
        name: "هرقلة"
      },
      {
        id: 11,
        name: "النفيضة"
      },
      {
        id: 11,
        name: "بوفيشة"
      },
      {
        id: 11,
        name: "كندار"
      },
      {
        id: 11,
        name: "سيدي الهاني"
      },
      {
        id: 11,
        name: "مساكن"
      },{
        id: 11,
        name: "القلعة الصغرى"
      },

      //صفاقس
      {
        id: 13,
        name: "صفاقس المدينة"
      },
      {
        id: 13,
        name: "صفاقس الغربية"
      },
      {
        id: 13,
        name: "ساقية الزيت"
      },
      {
        id: 13,
        name: "ساقية الداير"
      },
      {
        id: 13,
        name: "صفاقس الجنوبية"
      },
      {
        id: 13,
        name: "طينة"
      },
      {
        id: 13,
        name: "عقارب"
      },
      {
        id: 13,
        name: "جبنيانة"
      },
      {
        id: 13,
        name: "العامرة"
      },
      {
        id: 13,
        name: "الحنشة"
      },
      {
        id: 13,
        name: "منزل شاكر"
      },
      {
        id: 13,
        name: "الغريبة"
      },
      {
        id: 13,
        name: "بئر علي بن خليفة"
      },
      {
        id: 13,
        name: "الصخيرة"
      },
      {
        id: 13,
        name: "المحرس"
      },{
        id: 13,
        name: "قـرقنـة"
      },

      //المنستير
      {
        id: 21,
        name: "المنستيـر"
      },
      {
        id: 21,
        name: "الوردانيـن"
      },
      {
        id: 21,
        name: "الساحليـن"
      },
      {
        id: 21,
        name: "زرمديـن"
      },
      {
        id: 21,
        name: "بنـي حسان"
      },
      {
        id: 21,
        name: "جمـال"
      },
      {
        id: 21,
        name: "بنبلة"
      },
      {
        id: 21,
        name: "المكنين"
      },
      {
        id: 21,
        name: "البقالطة"
      },
      {
        id: 21,
        name: "طبلبة"
      },
      {
        id: 21,
        name: "قصر هلال"
      },
      {
        id: 21,
        name: "قصيبة المديوني"
      },
      {
        id: 21,
        name: "صيادة لمطة بوحجر"
      },

      //المهدية
      {
        id: 23,
        name: "المهدية"
      },
      {
        id: 23,
        name: "بومرداس"
      },
      {
        id: 23,
        name: "أولاد الشامخ"
      },
      {
        id: 23,
        name: "شربان"
      },
      {
        id: 23,
        name: "هبيرة"
      },
      {
        id: 23,
        name: "السواسي"
      },
      {
        id: 23,
        name: "الجم"
      },
      {
        id: 23,
        name: "الشابة"
      },
      {
        id: 23,
        name: "ملولش"
      },
      {
        id: 23,
        name: "سيدي علوان"
      },
      {
        id: 23,
        name: "قصور الساف"
      }
    ]
  }
}
