import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { PrestataireService } from 'src/app/service/prestataire.service';

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
    

    constructor(private service: PrestataireService) {}
  
    ngOnInit(): void {
      this.service.getAllPrestataires().subscribe((response: any) => {
        this.prestataires = response.data; // extract the prestataires array from the API response
        this.filteredPrestataires =  response.data;
      });
    }
    filterPrestataires() {
      const query = this.searchQuery.toLowerCase();
      this.filteredPrestataires = this.prestataires.filter((prestataire) => {
        return prestataire.firstname.toLowerCase().includes(query) /*||
               prestataire.competence.toLowerCase().includes(query);*/
      });
    }
  
  


}