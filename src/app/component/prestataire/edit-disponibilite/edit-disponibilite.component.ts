import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Disponiblite } from 'src/app/interface/disponiblite';
import { WorkScheduleService } from 'src/app/service/work-schedule.service';

@Component({
  selector: 'app-edit-disponibilite',
  templateUrl: './edit-disponibilite.component.html',
  styleUrls: ['./edit-disponibilite.component.css']
})
export class EditDisponibiliteComponent {
  disponibiliteForm!: FormGroup;
  disponibiliteId: any = null; // Optional - if you want to edit an existing disponibilite

  constructor(private formBuilder: FormBuilder, private workScheduleService: WorkScheduleService) { }

  ngOnInit(): void {
    this.disponibiliteForm = this.formBuilder.group({
      actif: [false],
      heure: ['', Validators.required],
      jour: ['', Validators.required]
    });

    // If we're editing an existing disponibilite, get its data and pre-fill the form
    if (this.disponibiliteId) {
      this.workScheduleService.get(this.disponibiliteId).subscribe(
        (response) => {
          const disponibilite = response.data;
          this.disponibiliteForm.patchValue(disponibilite);
        },
        (error) => {
          console.log('Error getting disponibilite data:', error);
        }
      );
    }
  }

  onSubmit() {
    const formData = this.disponibiliteForm.value;

    if (this.disponibiliteId) {
      // We're editing an existing disponibilite
      this.workScheduleService.update(this.disponibiliteId, formData).subscribe(
        (response) => {
          console.log('Disponibilite updated successfully:', response);
        },
        (error) => {
          console.log('Error updating disponibilite:', error);
        }
      );
    } else {
      // We're creating a new disponibilite
      this.workScheduleService.create(formData).subscribe(
        (response) => {
          console.log('Disponibilite created successfully:', response);
        },
        (error) => {
          console.log('Error creating disponibilite:', error);
        }
      );
    }
  }

}
