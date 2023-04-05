import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Disponiblite } from 'src/app/interface/disponiblite';
import { WorkScheduleService } from 'src/app/service/work-schedule.service';

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

  constructor(private disponibiliteService: WorkScheduleService,private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.disponibiliteForm = this.formBuilder.group({
      actif: [false],
      heure: ['', Validators.required],
      jour: ['', Validators.required]
    });
  }

  disponibiliteForm!: FormGroup;

  onSubmit() {
    const formData = this.disponibiliteForm.value;
    this.disponibiliteService.create(formData).subscribe(
      (response) => {
        console.log('Form data saved to database:', response);
      },
      (error) => {
        console.log('Error saving form data to database:', error);
      }
    );
  }
  
}
