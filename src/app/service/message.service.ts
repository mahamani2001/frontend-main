import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../interface/message';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8000/api/messages';

  constructor(private http: HttpClient) { }

  sendToJobberr(jobberId: number, textMessage: string, vu: boolean) {
    const url = `${this.baseUrl}`;

    const data = {
      jobber_id: jobberId,
      text_message: textMessage,
      vu: vu
    };

    return this.http.post(url, data);
  }
  getJobberMessages():Observable<any>{
    return this.http.get(`${this.baseUrl}`);
   }
  sendToJobber(jobberId: number, textMessage: string, vu: boolean): Observable<any> {
    return this.http.post(this.baseUrl + '/' + jobberId, { text_message: textMessage, vu: vu });
  }
 
  
}
