import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReviewServiceService } from 'src/app/service/review-service.service';
import { Review } from 'src/app/interface/review'; 
import { TokenService } from 'src/app/shared/token.service';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  availability!: any[];
  reviews !:Review[];



  constructor(private http: HttpClient,private reviewService:ReviewServiceService,private token: TokenService) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/api/disponibilites').subscribe(data => {
      
      this.availability = data;
      
    });

    this.reviewService.getReviews().subscribe((response: any) => {
      this.reviews = response.reviews;
      
    });
  }
}
