import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data-service.service';
import { Job } from '../job';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from '../category';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  constructor(private job: DataService,private authService: AuthService,private categoryService: CategoryService,private dataService:DataService,private router:Router) { 
    this.jobs = [];
    this.categories=[];
  }
  jobs: Job[] ;
  categories: Category[] ;
  selectedCategoryId: number | undefined;
  editingJob: Job | undefined;
  data:any;
  ngOnInit(): void {
    this.loadJobsAndCategories();
  
  }

  isLoggedIn(): boolean {
    if (!this.authService.isLoggedIn()) {
      // Redirect to the login page if the user is not authenticated
      // Example using Angular Router:
      this.router.navigate(['/login']);}
      
    return this.authService.isLoggedIn();
  }

  getUsername(): string {
     let $user =this.authService.getUsername();
     return $user;
  }

  logout(): void {
    this.authService.logout();
  }

  loadJobsAndCategories() {
    this.job.getAlljobs().subscribe(jobs => {
      this.jobs = jobs;
    });

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onChangeCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    // Perform action using selected category ID
    console.log('Selected category ID:', this.selectedCategoryId);
  }

 
  editJob(job: Job) {
    console.log('Editing job:', job);
    // Set the job being edited
    this.editingJob = job;
  }
  

  deleteJob(jobId: number) {
    console.log('Deleting job with ID:', jobId);
    // Use the deletejob method of the DataService to delete the job
    this.job.deletejob(jobId).subscribe(
      res => {
        console.log('Job deleted successfully:', res);
        this.loadJobsAndCategories(); // Reload data after deletion
      },
      err => console.error('Error deleting job:', err)
    );
  }
  
  refresh() {
    this.loadJobsAndCategories();
  }

  saveJob() {
    console.log('Saving job:', this.editingJob);
    // Use the updatejob method of the DataService to update the job
    this.job.updatejob(this.editingJob!).subscribe(
      res => {
        console.log('Job updated successfully:', res);
        this.editingJob = undefined;
        this.loadJobsAndCategories(); // Reload data after edit
      },
      err => console.error('Error updating job:', err)
    );
  }
  
  cancelEdit() {
    console.log('Canceling edit');
    this.editingJob = undefined;
  }
  
  }


