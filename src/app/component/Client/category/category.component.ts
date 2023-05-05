import { Component } from '@angular/core';
import { Category } from '../../prestataire/category';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/service/category.service';
import { TokenService } from 'src/app/shared/token.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category: Category[] = [];
  constructor(
     public router: Router,
    private http: HttpClient,
    private categService:CategoryService,
    private tokenService: TokenService,
 
   ) {
    
  }

  ngOnInit() {
    this.getCategory();   
    this.refreshCategory(); 
 }
    getCategory(){
      this.categService.getCategories().subscribe(
       (response) => {
        this.category = response;
        console.log(typeof this.category);

      })
    
    }

    refreshCategory(){
      this.categService.getCategories().subscribe(
        category => {
            this.category = category;
        },
        error => {
            console.log(error);
        }
    );
  
    }
    isLoggedIn(): boolean {
      return this.tokenService.isLoggedIn(); 
    }
    demandeService(){
      if(this.isLoggedIn()) this.router.navigate(['/besoin']); 
      else  this.router.navigate(['/login']);
    }
    
}
