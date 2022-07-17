import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {Notice} from './notice.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private notices: Notice[] = [];
  private noticeUpdated = new Subject<Notice[]>();

  constructor(private http:HttpClient,private router:Router) { }

  addNotice(title: string, pubdate: Date, image: File){
    var datestr = (new Date(pubdate)).toUTCString();
    const noticeData = new FormData();
    noticeData.append("title", title);
    noticeData.append("pubdate", datestr);
    noticeData.append("image", image, title);

    this.http.post<{message:string , Notice:Notice}>('http://localhost:3000/api/notices/',noticeData)
    .subscribe((responseData)=>{
      console.log(responseData);
      const Notice: Notice = { id: responseData.Notice.id, title: title,pubdate :pubdate, imagePath: responseData.Notice.imagePath };

      window.alert('The Notice has been added!');
      this.notices.push(Notice);
      this.noticeUpdated.next([...this.notices]);
      this.router.navigate(["/admin/notices"]);
    })
  }

  getNotices() {
    this.http.get<{ message: string, notices: any }>('http://localhost:3000/api/notices')
      .pipe(map((notData) => {
        return notData.notices.map(noti => {
          return {
            title: noti.title,
            pubdate: noti.pubdate,
            id: noti._id,
            imagePath: noti.imagePath
          };
        });
      }))
      .subscribe(TransformednotData => {
        this.notices = TransformednotData;
        this.noticeUpdated.next([...this.notices]);
      });

  }

  getNotice(id: string) {
    return this.http.get<{ _id: string, name: string, fathername: string,mothername: string,notegory:string,address: string,noticeclass: string, imagePath: string }>('http://localhost:3000/api/notices/' + id)
  }



  getNoticeUpdatedListner(){
    return this.noticeUpdated.asObservable();
  }

}
