import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReviewServiceService } from 'src/app/service/review-service.service';
import { Review } from 'src/app/interface/review'; 
import { TokenService } from 'src/app/shared/token.service';
import { Disponiblite } from 'src/app/interface/disponiblite';
import { WorkScheduleService } from 'src/app/service/work-schedule.service';
import { PrestataireService } from 'src/app/service/prestataire.service';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  availability!: Disponiblite[];
  reviews !:Review[];
data!:any;


  constructor(private http: HttpClient,private reviewService:ReviewServiceService,private token: TokenService,private avaibility:WorkScheduleService,private prestataire:PrestataireService) { }

  ngOnInit(): void {
   /*   this.http.get(`http://127.0.0.1:8000/api/disponibilite`, {
      headers: {
        Authorization: `Bearer ${this.token.getToken()}`
      }
      
    }).subscribe(data => {
      console.log(data);
      this.availability=this.availability;
    });
      */


      this.avaibility.getUserAvailability()
        .subscribe(data => {
          this.availability = data.disponibilites;
          console.log(this.availability);
        });
    
   /* this.http.get<any[]>(`http://127.0.0.1:8000/api/disponibilite/${this.token.getUserId()}`).subscribe(data => {
        this.availability = data;

    });*/

  
    this.reviewService.getReviews(this.token.getUserId()).subscribe((response: any) => {
      this.reviews = response.reviews;
      
    });
   
    
    
    
  }
 
}
