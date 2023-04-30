import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
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
import Swal from 'sweetalert2';

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
  @ViewChild('chatDialog') chatDialog!: TemplateRef<any>; // Reference to the chat dialog template
  message: string = ''; // Message input field value
  emojiPicker: boolean = false;
  
  chatDialogVisible: boolean = false;
   // Function to open the chat dialog


   openChat() {
    Swal.fire({
      html: `
        <div class="chat-box">
          <div class="chat-history" style="position: relative; height: 370px; width: 378px; top: 11px;">
            <!-- chat history messages here -->
          </div>
          <div class="chat-input">
            <input type="text" [(ngModel)]="message" placeholder="Type your message..." emojiPicker>
            <button (click)="toggleEmojiPicker()">😀</button>
            <button (click)="sendMessage()">Send</button>
          </div>
          <ngx-emoji-picker [theme]="'light'" [autoClose]="true" (emojiClick)="addEmoji($event)"></ngx-emoji-picker>
        </div>     
      `,
      showCloseButton: true,
      showConfirmButton: false,
    });
  }
  
  
  closeChat() {
    this.chatDialogVisible = false;
  }
  
  toggleEmojiPicker() {
    console.log('toggleEmojiPicker() called');
    console.log('this.emojiPicker before toggle:', this.emojiPicker);
    this.emojiPicker = !this.emojiPicker;
    console.log('this.emojiPicker after toggle:', this.emojiPicker);
  }
  

  // Function to add the selected emoji to the message input field
  addEmoji(event: any) {
    this.message += event.emoji.native;
  }

  // Function to send the message
  sendMessage() {
    // your code here to handle sending the message
  }
  }
  
 

