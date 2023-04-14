import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../shared/token.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  apiUrl="http://localhost:8000/api";
   constructor(private http: HttpClient,private token:TokenService) {}

  getReviews(id:any) {
    return this.http.get(this.apiUrl);
  }
 /* postReview(id:any){
    this.http.post(`http://127.0.0.1:8000/api/review`, {
      headers: {
        Authorization: `Bearer ${this.token.getToken()}`
      }
    });
  }*/
  postReview(jobberId: number, comment: string, rating: number) {
    // Send the request to the API
    return this.http.post('http://localhost:8000/api/reviews/' + jobberId, { comment, rating });
  }
  

}
 
