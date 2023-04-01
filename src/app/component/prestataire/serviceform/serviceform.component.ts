import { Component } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from '../category';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Job } from '../job';
import { DataService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-serviceform',
  templateUrl: './serviceform.component.html',
  styleUrls: ['./serviceform.component.css']
})
export class ServiceformComponent {
  categories: Category[]=[];
  jobForm!:FormGroup;
 
  constructor(private categoryService: CategoryService, private formBuilder:FormBuilder, private jobService:DataService) {}

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
      this.jobForm = this.formBuilder.group({
        category: [''],
        title: [''],
        description: [''],
        price_min: [''],
        price_max: ['']
      });
      
  }
  onSubmit() {
    const jobData: Job = {
      categoryId: this.jobForm.value.category,
      title: this.jobForm.value.title,
      description: this.jobForm.value.description,
      price_min: this.jobForm.value.price_min,
      price_max: this.jobForm.value.price_max,
      id:0,
      pictureUrl: '',
    };
  
    this.jobService.createjob(jobData).subscribe(
      (result) => {
        console.log('Job created successfully', result);
        // reset the form after successful submission
        this.jobForm.reset();
      },
      (error) => {
        console.error('Error creating job', error);
      }
    );
  }
  
}
