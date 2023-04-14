import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data-service.service';
import { Job } from '../job';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from '../category';
 import { Router } from '@angular/router';
 
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  searchTitle: string = '';

  categories: Category[]=[];
  selectedCategoryId: number | undefined;
  editingJob: Job | undefined;
  data:any;
  filteredJobs: Job[] = []; // initialize with empty array
  
  constructor(private job: DataService,private dataService: DataService,private categoryService: CategoryService,private router:Router) { 
    this.filteredJobs = [];
    this.categories=[];
    
  }
  ngOnInit(): void {
    console.log("----->>> on post compenent ");
    this.loadJobsAndCategories();
   
  }
  isLoggedIn(): boolean {
    if (!this.dataService.isLoggedIn()) {
      // Redirect to the login page if the user is not authenticated
      // Example using Angular Router:
      this.router.navigate(['/login']);
    }
      
    return this.dataService.isLoggedIn();
  }
  loadJobsAndCategories() {
    // Load all jobs
    console.log('hi') ; 
     this.job.getServices().subscribe(jobs => {
      this.filteredJobs = jobs;
      // Apply title filter if searchTitle is not empty
      if (this.searchTitle) {
        this.filterJobsByTitle(this.searchTitle);
      }
    });

    // Load categories
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
// Function to filter jobs by title
filterJobsByTitle(title: string) {
  this.filteredJobs = this.filteredJobs.filter(filteredJobs => filteredJobs.title.toLowerCase().includes(title.toLowerCase()));
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
   
  
  searchText: string = "";
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);}
  




  
  }