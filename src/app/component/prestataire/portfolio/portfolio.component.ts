import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReviewServiceService } from 'src/app/service/review-service.service';
import { Review } from 'src/app/interface/review'; 
import { TokenService } from 'src/app/shared/token.service';
import { Disponiblite } from 'src/app/interface/disponiblite';
import { WorkScheduleService } from 'src/app/service/work-schedule.service';
import { PrestataireService } from 'src/app/service/prestataire.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  availability!: Disponiblite[];
  reviews !:Review[];
data!:any;


  constructor(private reviewService:ReviewServiceService
    ,private token: TokenService,private disponibilite:WorkScheduleService,
    private prestataire:PrestataireService
    ,private route: ActivatedRoute) { }

  
  ngOnInit(): void {

      this.disponibilite.getUserAvailability()
        .subscribe(data => {
          this.availability = data.disponibilites;
          console.log(this.availability);
        });
   /* this.reviewService.getReviews(this.token.getUserId()).subscribe((response: any) => {
      this.reviews = response.reviews;
      
    });*/ 
   
  
  }
  onSubmit(jobberId: number, comment: string, rating: number) {
    this.reviewService.postReview(jobberId, comment, rating)
      .subscribe(response => console.log(response));
  }


 

 
 
  

  comment: string = '';
  rating: string = '';



  submitReview() {
    // Get the jobber ID from the URL
    const jobberId = Number(window.location.pathname.split('/').pop());

    // Submit the review to the API
    this.reviewService.postReview(jobberId, this.comment, Number(this.rating))
      .subscribe(
        response => {
          console.log(response);
          alert('Review submitted successfully!');
        },
        error => {
          console.error(error);
          alert('An error occurred while submitting your review. Please try again later.');
        }
      );
  }
  }
  
 

