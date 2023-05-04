import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/service/category.service';
import { DataService } from 'src/app/service/data-service.service';
import { Category } from '../../prestataire/category';
import { Job } from '../../prestataire/job';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services!: Job[];
  categories: Category[] = [];
  data!: any[]; // declare the category_id variable and set it to a default value

  
  
  constructor(private service:DataService,private category:CategoryService){}
  ngOnInit() {
    this.service.getAlljobs().subscribe(
      jobs => {
        this.services = jobs;
         console.log(this.services);
        // Get category names for each job
        for (const job of this.services) {
          this.category.getCategoryName(job.category_id).subscribe(
            categoryName => {
              job.category = { id: job.category_id, name: categoryName };
            }
          );
        }
      }
    );
this.category.getCategories().subscribe(categories => this.categories = categories);
  }


getCategories(): void {
  this.category.getCategories()
    .subscribe(categories => this.categories = categories);
}
  
 searchText:string="";
 onSearchTextEntered(searchValue:string){
this.searchText=searchValue;
console.log(this.searchText);
 }


 getData(): void {
   this.service.getAlljobs()
     .subscribe(data => {
       this.data = data;
     
     });
        
  
 }
 
 selectedCategory: string = '';
 onCategorySelected(event: Event) {
  const element = event.target as HTMLInputElement;
  const value = element.value;
  this.selectedCategory = value;
}
sortB:string='';
sortByLatest(event: Event) {
  const sortBy = (event.target as HTMLSelectElement).value;
  this.sortB = sortBy;
  if (sortBy === 'latest') {
    this.services.sort((a, b) => this.services.indexOf(b) - this.services.indexOf(a));
  } else if (sortBy === 'lowest') {
    this.services.sort((a, b) => Number(a.price_min) - Number(b.price_min));
  } else if (sortBy === 'highest') {
    this.services.sort((a, b) =>  Number(a.price_max) - Number(b.price_max));
  }

}




}



