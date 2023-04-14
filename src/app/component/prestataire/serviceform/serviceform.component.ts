import { Component } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from '../category';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Job } from '../job';
import { DataService } from 'src/app/service/data-service.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { PrestataireService } from 'src/app/service/prestataire.service';

@Component({
  selector: 'app-serviceform',
  templateUrl: './serviceform.component.html',
  styleUrls: ['./serviceform.component.css']
})
export class ServiceformComponent {
  categories: Category[]=[];
  jobForm!:FormGroup;
  data: any;
  jobs:Job[]=[];
  constructor(private categoryService: CategoryService, private formBuilder:FormBuilder, private jobService:DataService,private router:Router, private token: TokenService,private prestataire:PrestataireService) {}

  ngOnInit(): void  {
    this.prestataire.getServices();
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
      this.jobForm = this.formBuilder.group({
        categoryId: [''],
        title: [''],
        description: [''],
        price_min: [''],
        price_max: [''],
      });
      this.prestataire.getServices().subscribe(

        res => { 
           this.data=res;
           this.jobs=this.data.data;
           this.token.saveUserName(this.jobs)
         },
        err => {       
         alert("Erreur");
        }) 
      
  }
  onSubmit() {
    const jobData: Job = {
      categoryId: this.jobForm.value.categoryId,
      title: this.jobForm.value.title,
      description: this.jobForm.value.description,
      price_min: this.jobForm.value.price_min,
      price_max: this.jobForm.value.price_max,
      id:0,
      pictureUrl: 'https://images.app.goo.gl/VC8hwWassK9KLjvt7',
      jobber_id:this.token.getUserId()
      
    };
    console.log(jobData);
    this.jobService.createjob(jobData).subscribe(
      (result) => {
        console.log('Job created successfully', result);
        // reset the form after successful submission
        this.jobForm.reset();
        this.router.navigate(['/post']);
      }
    );
  }
  
}
