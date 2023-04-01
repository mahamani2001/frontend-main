import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Disponiblite } from 'src/app/interface/disponiblite';
import { WorkScheduleService } from 'src/app/service/work-schedule.service';

@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.css']
})
export class WorkScheduleComponent implements OnInit {
  disponibilites: Disponiblite[]=[];
  currentDisponibilite: any = null;
  currentIndex = -1;
  jour = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  errorMessage = '';

  constructor(private disponibiliteService: WorkScheduleService,private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.retrieveDisponibilites();
    this.disponibiliteForm = this.formBuilder.group({
      actif: [false],
      heure: ['', Validators.required],
      jour: ['', Validators.required]
    });
  }

  retrieveDisponibilites(): void {
    this.disponibiliteService.getAll()
      .subscribe(
        data => {
          this.disponibilites = data;
        },
      );
  }

  refreshList(): void {
    this.retrieveDisponibilites();
    this.currentDisponibilite = null;
    this.currentIndex = -1;
  }

  setActiveDisponibilite(disponibilite: any, index: number): void {
    this.currentDisponibilite = disponibilite;
    this.currentIndex = index;
  }

  removeDisponibilite(id: number): void {
    this.disponibiliteService.delete(id)
      .subscribe(
        response => {
          this.refreshList();
        },
      );
  }

  /*removeAllDisponibilites(): void {
    this.disponibiliteService.deleteAll()
      .subscribe(
        response => {
          this.refreshList();
        },
        error => {
          this.errorMessage = error.message;
        });
  }*/
  disponibiliteForm!: FormGroup;

  onSubmit() {
    // Handle form submission here
  }
}
