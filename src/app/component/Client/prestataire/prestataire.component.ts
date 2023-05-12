import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { PrestataireService } from 'src/app/service/prestataire.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestataire',
  templateUrl: './prestataire.component.html',
  styleUrls: ['./prestataire.component.css']
})
export class PrestataireComponent  implements OnInit{
  enterSearchValue = '';
    prestataires: Profile[] = [];
    filteredPrestataires: Profile[] = [];
     searchQuery:string ='';
     providers: any[] = [];
    constructor(private service: PrestataireService,
      private http: HttpClient,
      private tokenService: TokenService,
      private router:Router,
      ) {}
    ngOnInit(): void { 
      this.service.getAllPrestataires().subscribe((response: any) => {
        this.prestataires = response.data; // extract the prestataires array from the API response
        this.filteredPrestataires =  response.data;
      });
      this.getPosition();
      this.getPrestataires();
      this.sortByRecommendation();
    }
    getPrestataires(): void {
      this.service.getProviders()
        .subscribe((data: any[]) => {
          this.prestataires = data;
    this.sortByRecommendation();
        });
      }
      sortByRecommendation(): void {
      let p= this.prestataires.sort((a, b) => b.recommendations_count - a.recommendations_count);
      console.log(p);
    }
    filterPrestataires() {
      const query = this.searchQuery.toLowerCase();
      this.filteredPrestataires = this.prestataires.filter((prestataire) => {
        return prestataire.firstname.toLowerCase().includes(query) /*||
               prestataire.competence.toLowerCase().includes(query);*/
      });
    }
    getPrestatairesWithinDistance(distance: number) {
 
    }
     getPosition(): Promise<{latitude: number, longitude: number}> {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported'));
        } else {
          navigator.geolocation.getCurrentPosition(
            position => {
              const coords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
              console.log('Position:', coords);
              resolve(coords);
            },
            error => reject(error)
          );
        }
      });
    }   
    isLoggedIn(): boolean {
      return this.tokenService.isLoggedIn(); 
    }
    besoin(){
      if(!this.isLoggedIn())  
      {
        this.router.navigate(['/login']);
      } 
    }
    
}