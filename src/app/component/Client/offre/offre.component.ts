import { Component, OnInit } from '@angular/core'; 
import { OffreService } from 'src/app/service/offre.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  offres!: any[];
  data!:any;
  constructor(private offreService: OffreService) { }

  ngOnInit() {
   this.getOffres();
  }
  getOffres(){
    this.offreService.getOffre().subscribe(
      (res) => {
        this.data=res;
        this.offres = this.data.Offre;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
