import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Disponiblite } from 'src/app/interface/disponiblite';
import { WorkScheduleService } from 'src/app/service/work-schedule.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-add-disponibilite',
  templateUrl: './add-disponibilite.component.html',
  styleUrls: ['./add-disponibilite.component.css']
})
export class AddDisponibiliteComponent {
  disponibilites: Disponiblite[]=[];
  currentDisponibilite: any = null;
  currentIndex = -1;
  jour = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  errorMessage = '';
  data: any;
  disponibilite: Disponiblite = {} as Disponiblite;

  constructor(private disponibiliteService: WorkScheduleService,private formBuilder:FormBuilder,private token: TokenService,private router:Router) {}

  ngOnInit(): void {
    this.disponibiliteForm = this.formBuilder.group({
      actif: [false],
      heure_debut: ['', Validators.required],
      heure_fin: ['', Validators.required],
      jour: ['', Validators.required]
    });
    this.disponibiliteService.getAll().subscribe(
      res => { 
         this.data=res;
         this.disponibilite=this.data.data;
         this.token.saveUserName(this.disponibilite)
       },
      err => {       
       alert("Erreur");
      }) 
  
  }

  disponibiliteForm!: FormGroup;

  onSubmit() {
    if (this.disponibiliteForm.valid) {
      const disponibilite = {
        actif: this.disponibiliteForm.value.actif,
        heure_debut: this.disponibiliteForm.value.heure_debut,
        heure_fin: this.disponibiliteForm.value.heure_fin || null,
        jour: this.disponibiliteForm.value.jour,
        jobber_id:this.token.getUserId()
      };
      console.log(disponibilite);
      this.disponibiliteService.create(disponibilite).subscribe(
        (response) => {
          console.log('Form data saved to database:', response);
          this.router.navigate(['/availbilty']);
        },
        (error) => {
          console.log('Error saving form data to database:', error);
        }
      );
    }
  }
  
}
