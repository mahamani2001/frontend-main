import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data-service.service';
import { Job } from '../job';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from '../category';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  constructor(private job: DataService,private categoryService: CategoryService) { 
    this.jobs = [];
    this.categories=[];
    }
  jobs: Job[] ;
  categories: Category[] ;
  selectedCategoryId: number | undefined;
  ngOnInit(): void {
    this.job.getAlljobs().subscribe(jobs => {
      this.jobs = jobs;
      this.jobs.forEach(job => {
        if (!this.isImageValid(job.pictureUrl)) {
          console.log(`Invalid image URL: ${job.pictureUrl}`);
        }
      });
    });

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

  }
  isImageValid(url: string): boolean{
    if (!url) {
      return false;
    }
    const extension = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif'].indexOf(extension) !== -1;
  }
  onChangeCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    // Perform action using selected category ID
    console.log('Selected category ID:', this.selectedCategoryId);
  }




  
   
 
 
   




  
   
 
 
   

  
  

  }


