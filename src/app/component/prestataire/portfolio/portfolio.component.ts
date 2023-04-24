import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReviewServiceService } from 'src/app/service/review-service.service';
import { Review } from 'src/app/interface/review'; 
import { TokenService } from 'src/app/shared/token.service';
import { Disponiblite } from 'src/app/interface/disponiblite';
import { WorkScheduleService } from 'src/app/service/work-schedule.service';
import { PrestataireService } from 'src/app/service/prestataire.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data-service.service';
import { Profile } from '../../Client/profile';
import { Job } from '../job';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  availability: Disponiblite[]=[];
  reviews !:Review[];
  data!:any;
  prestataire: Profile = {} as Profile;
  mesJobs: Job[] = [];

  constructor(
    private userService:DataService,
    private reviewService:ReviewServiceService
    ,private token: TokenService,private disponibilite:WorkScheduleService,
    private route: ActivatedRoute) { }

  
  ngOnInit(): void {
    const jobber_id = Number(window.location.pathname.split('/').pop());

    this.userService.getPrestataire(jobber_id).subscribe(
      res => { 
         this.data=res;
         this.prestataire=this.data.data; 
       },
      err => {       
       alert("Erreur");
      }) 


      this.userService.getJobsByPrestatire(jobber_id).subscribe(
        (res:any) => {  
          console.log(res)
           this.mesJobs=res;
         },
        err => {       
         alert("Erreur");
        }) 

        this.reviewService.getReviewsByJobber(jobber_id).subscribe(
          (res:any) => {  
            

            console.log(res);
             this.reviews=res.reviews;
           },
          err => {       
           alert("Erreur");
          }) 
        
    

      this.disponibilite.get(jobber_id)
        .subscribe(data => {
          this.availability = data;
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

  getNumberArray(maxNumber: number): number[] {
    return Array(maxNumber).fill(0).map((x, i) => i);
  }
  
  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  
  comment: string = '';
  rating: string = '';



  submitReview() {
    // Get the jobber ID from the URL
    const jobber_id = Number(window.location.pathname.split('/').pop());

    // Submit the review to the API
    this.reviewService.postReview(jobber_id, this.comment, Number(this.rating))
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
  
 

