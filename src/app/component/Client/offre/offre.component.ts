
import { Component, OnInit } from '@angular/core'; 
import { Offre } from 'src/app/interface/offre';
import { OffreService } from 'src/app/service/offre.service';
import { RequestJobService } from 'src/app/service/requestjob.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
   offres:Offre[]=[];
   offre!: Offre;
   data!:any; 
   constructor(private offreService:OffreService,private token:TokenService) { }

  ngOnInit() {
    this.getOffres();
  }
  getOffres(): void{
    const demandeId = Number(window.location.pathname.split('/').pop()); 
    console.log(this.offre);
    this.offreService.getOffresByDemandes(demandeId).subscribe(res => {
      this.data=res;
      this.offres = this.data.Offre; 
      console.log(this.offres)
    });
}
acceptOffre(id:any): void {
  this.offreService.acceptOffre(id)
    .subscribe(offre => this.offre = offre);
    alert("Votre acceptation a été effectuée avec succès.")
}
refuseOffre(id:any): void {
  this.offreService.refuseOffre(id)
    .subscribe(offre => this.offre = offre);
  
}
}