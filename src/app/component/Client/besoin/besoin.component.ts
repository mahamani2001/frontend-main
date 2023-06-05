import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { DataService } from 'src/app/service/data-service.service';
import { RequestJobService } from 'src/app/service/requestjob.service';
import { Category } from '../../prestataire/category';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/shared/token.service';
import { Profile } from '../profile';
import { Job } from '../../prestataire/job';



@Component({
  selector: 'app-besoin',
  templateUrl: './besoin.component.html',
  styleUrls: ['./besoin.component.css']
})
export class BesoinComponent implements OnInit {
  
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  jobberId!: number;
  service !: Job;
  allJobber! : boolean;
  time: string = '';
  pageTitle : string='';
  btnTitle: string='';
   location: string = '';
    categories: Category[] = [];
    services:string ='';
    apiUrl = 'http://localhost:8000/api';
    user: Profile = {} as Profile;
    dataProfile: any;
    requestForm!: FormGroup ; // Define the requestForm property
   
  
    constructor(private http: HttpClient,
      private category:CategoryService,
      private data:DataService,
      private fb:FormBuilder,
      private request:RequestJobService ,
      private router:Router,
      private tokenService: TokenService,
      private userService:DataService
    )
    {
      
    }
    jobber_id!:number;
    serviceId!:number;
    ngOnInit(): void {
        this.allJobber=false;
      this.requestForm = this.fb.group({
        category_id: this.user.category_id, // Add validation if needed
        title: [''],
        description: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        time: ['', Validators.required],
        location: ['', Validators.required],
        jobber_id:['']
      }); 
      
      if(window.location.pathname.includes("reserve")) {
        this.pageTitle="Reserver un service ";
        this.btnTitle="Reserver"
        this.serviceId = Number(window.location.pathname.split('/').pop());
        // id job is sent on url
        this.userService.getJobByJobId(this.serviceId).subscribe(
          (res: any) => { 
           console.log(res) 
           this.service=res;
           this.jobber_id=Number(this.service.jobber_id);
         
           this.requestForm.controls["title"].setValue(this.service.title); 
           this.requestForm.controls["description"].setValue(this.service.description); 
       
           this.userService.getPrestataire(this.jobber_id).subscribe(
             res => { 
                this.dataProfile=res;
                this.user=this.dataProfile.data; 
               },
             err => {       
              alert("Erreur");
             }) 
            },
          err => {       
           alert("Erreur");
          }) 
      }   
    else {
      if(window.location.pathname.includes("demande")){
        this.allJobber = true;
        this.pageTitle="Demander un besoin ";
        this.btnTitle="Envoyer votre demande";
      }
    else {
      this.jobber_id = Number(window.location.pathname.split('/').pop()); 
     
       this.pageTitle="Demander un service a ";
       this.btnTitle="Envoyer votre demande";
       this.userService.getPrestataire(this.jobber_id).subscribe(
        res => { 
           this.dataProfile=res;
           this.user=this.dataProfile.data; 
          },
        err => {       
         alert("Erreur");
        }) 
   
    }
     
    } 
      this.category.getCategories().subscribe((data: any[]) => {
        this.categories= data;
      });
     
   
      
    }
    onSubmit() {
      
      console.log("-- Jobber Id" +this.jobber_id);
      this.requestForm.controls['jobber_id'].setValue(this.jobber_id); 
     if(this.allJobber==false) 
     this.requestForm.controls["category_id"].setValue(this.user.category_id); 
      const formData = this.requestForm.value;
      console.log(formData);
      this.http.post(`${this.apiUrl}/post-to-jobber`, formData )
        .subscribe(response => {
          console.log(response);
          console.log(this.jobber_id)
          Swal.fire({
            title: 'Envoyer demande pour obtenir devis ',
            text: 'Êtes-vous sûr(e) de vouloir envoyer votre demande à ce prestataire ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'oui'
         });
      
          if(!isNaN(this.jobber_id))
           
           
            Swal.fire({
              title: 'Send to all',
              text: 'Are you sure you want to send your request to all jobbers?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, send to all'
           });
          } );
        }
        isLoggedIn(): boolean {
          return this.tokenService.isLoggedIn(); 
        }
        besoin(){
          if(!this.isLoggedIn())  
          {
            this.router.navigate(['/login']);
          } 
        }
          titleCaseWord(word: string) {
          if (!word) return word;
          return word[0].toUpperCase() + word.substr(1).toLowerCase();
        }
        
}