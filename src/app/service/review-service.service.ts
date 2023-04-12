import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  apiUrl="http://localhost:8000/api/avi";
   constructor(private http: HttpClient) {}

  getReviews() {
    return this.http.get(this.apiUrl);
  }
}
