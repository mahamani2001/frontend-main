import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { DataService } from 'src/app/service/data-service.service';
import { RequestJobService } from 'src/app/service/requestjob.service';
import { Category } from '../../prestataire/category';






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
  
  
    constructor(private http: HttpClient,private category:CategoryService,private data:DataService,private fb:FormBuilder,private request:RequestJobService )
    {
      
    }
    ngOnInit(): void {
      this.category.getCategories().subscribe((data: any[]) => {
        this.categories= data;
      });
      this.requestForm = this.fb.group({
        categorie: ['', Validators.required], // Add validation if needed
        service: ['', Validators.required],
        description: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        time: ['', Validators.required],
        location: ['', Validators.required]
      }); 
   
      
    }
    onSubmit() {
      const provider_id = 1;
      const user_id = 2;
      const formData = this.requestForm.value;
      this.http.post(`${this.apiUrl}/requests-to-provider`, { provider_id, user_id, ...formData })
        .subscribe(response => {
          console.log(response);
        });
    }   
}
