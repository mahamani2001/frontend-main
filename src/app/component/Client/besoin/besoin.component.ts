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


@Component({
  selector: 'app-besoin',
  templateUrl: './besoin.component.html',
  styleUrls: ['./besoin.component.css']
})
export class BesoinComponent implements OnInit {
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  time: string = '';
   location: string = '';
    categories: Category[] = [];
    services:string ='';
    apiUrl = 'http://localhost:8000/api';
  
    requestForm!: FormGroup ; // Define the requestForm property
  
  
    constructor(private http: HttpClient,
      private category:CategoryService,
      private data:DataService,
      private fb:FormBuilder,
      private request:RequestJobService ,
      private router:Router,
      private tokenService: TokenService,
    )
    {
      
    }
    ngOnInit(): void {
      this.category.getCategories().subscribe((data: any[]) => {
        this.categories= data;
      });
      this.requestForm = this.fb.group({
        category_id: [''], // Add validation if needed
        title: [''],
        description: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        time: ['', Validators.required],
        location: ['', Validators.required],
        jobber_id:['']
      }); 
   
      
    }
    onSubmit() {
      const jobberId = Number(window.location.pathname.split('/').pop()); 
      console.log("-- Jobber Id" +jobberId);
      this.requestForm.controls['jobber_id'].setValue(jobberId); 
      const formData = this.requestForm.value;
      console.log(formData);
      this.http.post(`${this.apiUrl}/post-to-jobber`, formData )
        .subscribe(response => {
          console.log(response);
          console.log(jobberId)
          
          if(!isNaN(jobberId))
            this.router.navigate(['/portfolio/'+jobberId]);
            else 
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
  
}
