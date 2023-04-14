import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { DataService } from 'src/app/service/data-service.service';
import { RequestJobService } from 'src/app/service/requestjob.service';
import { Category } from '../../prestataire/category';
import { Router } from '@angular/router';






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
  
  
    constructor(private http: HttpClient,private category:CategoryService,private data:DataService,private fb:FormBuilder,private request:RequestJobService ,private router:Router )
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
        location: ['', Validators.required]
      }); 
   
      
    }
    onSubmit() {
      /*const provider_id = 2;
      const user_id = 2;*/
      const formData = this.requestForm.value;
      console.log(formData);
      this.http.post(`${this.apiUrl}/post-to-jobber`, formData )
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/portfolio']);
        });
    } 
    
      
    
  
}
