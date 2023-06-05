import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/service/category.service';
import { DataService } from 'src/app/service/data-service.service';
import { Category } from '../../prestataire/category';
import { Job } from '../../prestataire/job';
import { TokenService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services!: Job[];
  categories: Category[] = [];
  data!: any[]; // declare the category_id variable and set it to a default value
  pictureUrl!: any[]; 

  constructor(private service:DataService,private category:CategoryService,
    private tokenService: TokenService,
    private router:Router,
    private categService:CategoryService,
    ){}
  ngOnInit() {
    
    this.categService.getAllImages().subscribe(
      (data: any[]) => {
        this.pictureUrl = data;
      },
      error => console.log(error)
    );
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
 get filteredServices() {
  return this.services.filter(service => {
    const nameMatch = service.title.toLowerCase().includes(this.searchText.toLowerCase());
    const categoryMatch = !this.selectedCategory || (service.category && service.category.name === this.selectedCategory.name);
    return nameMatch && categoryMatch;
  });
}

selectedCategory!: Category;
onCategorySelected(event: Event) {
  const box = document.getElementById('service_list');
  box?.classList.add('change_categ');


  const element = event.target as HTMLInputElement;
   var value = element.value; 
   var x, i;
   x = document.getElementsByClassName("column");
  
  if (value == "all" ) value = "";
   for (i = 0; i < x.length; i++) {
   this.w3RemoveClass(x[i], "show"); 
    if (x[i].className.indexOf(value) > -1) {
      this.w3AddClass(x[i], "show");
    }
  } 
  
} 
  w3AddClass(element: Element, name: string) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}
 
  w3RemoveClass(element: Element, name: string) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
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
isLoggedIn(): boolean {
  return this.tokenService.isLoggedIn(); 
}
demandeService(){
  if(this.isLoggedIn()) this.router.navigate(['/besoin']); 
  else  this.router.navigate(['/login']);
}


besoin(){
  if(!this.isLoggedIn())  
  {
    this.router.navigate(['/login']);
  } 
}
}


