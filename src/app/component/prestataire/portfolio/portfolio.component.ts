import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReviewServiceService } from 'src/app/service/review-service.service';
import { Review } from 'src/app/interface/review'; 
import { TokenService } from 'src/app/shared/token.service';
import { Disponiblite } from 'src/app/interface/disponiblite';
import { WorkScheduleService } from 'src/app/service/work-schedule.service';
import { PrestataireService } from 'src/app/service/prestataire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data-service.service';
import { Profile } from '../../Client/profile';
import { Job } from '../job';
import Swal from 'sweetalert2';
import { MessageService } from 'src/app/service/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  jobberId!: number;
  textMessage!: string;
  vu!: boolean;
  messageForm!: FormGroup;

  constructor(
    private userService:DataService,
    private reviewService:ReviewServiceService,
    private disponibilite:WorkScheduleService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private router:Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    ){ }
   
   
   
  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      text_message: ['', Validators.required]
    });

    
   
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
  sendToJobber() {
    const jobber_id = Number(window.location.pathname.split('/').pop());
    if (this.messageForm.valid) {
      const textMessage = this.messageForm.get('text_message')!.value;
      const vu = false;
      this.messageService.sendToJobber(jobber_id, textMessage, vu).subscribe(
        (res: any) => {
          console.log(res);
          this.messageForm.reset();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  
  @ViewChild('chatDialog') chatDialog!: TemplateRef<any>; // Reference to the chat dialog template
  message: string = ''; // Message input field value
  emojiPicker: boolean = false;
  
  chatDialogVisible: boolean = false;
   // Function to open the chat dialog


   openChat() {
    Swal.fire({
      html: `
      <form [formGroup]="messageForm" (ngSubmit)="sendToJobber()">
      <div class="form-group">
        <label for="text_message">Message</label>
        <textarea class="form-control" id="text_message" rows="3" formControlName="text_message"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="!messageForm.valid">Send</button>
    </form>      
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
  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn(); 
  }
  review(){
    if(!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    } 
 
  }
  besoin(){
    if(!this.isLoggedIn())  
    {
      this.router.navigate(['/login']);
    } 
  }
  }