import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Disponiblite } from 'src/app/interface/disponiblite';
import { WorkScheduleService } from 'src/app/service/work-schedule.service';
import Swal from 'sweetalert2';

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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.disponibiliteService.delete(id)
          .subscribe(
            response => {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              this.refreshList();
            },
            error => {
              swalWithBootstrapButtons.fire(
                'Error!',
                'An error occurred while deleting the file.',
                'error'
              );
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }
  
  disponibiliteForm!: FormGroup;
  onSubmit() {
    // Handle form submission here
  }
  
}
