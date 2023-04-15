import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestJobService } from 'src/app/service/requestjob.service';
import { TokenService } from 'src/app/shared/token.service';
import { Request } from 'src/app/interface/request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  data!:any;
  requestJobList:Request[]=[];
  currentRequest: any = null;
  currentIndex = -1;
  requestForm!: FormGroup;

  constructor(private requestJobService:RequestJobService,private token:TokenService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getRequestJobList();
    this.requestForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      start_date : ['', Validators.required],
      end_date: ['', Validators.required],
      time: ['', Validators.required],
    });
    
  }
     
  getRequestJobList(): void {    
    this.requestJobService.getClientRequest()
  .subscribe(res => {
    this.data=res;
    this.requestJobList = this.data.requestjob;
    console.log(this.requestJobList);
  });
}
  refreshList(): void {
    this.getRequestJobList();
    this.currentRequest = null;
    this.currentIndex = -1;
  }
  removeRequest(id: number): void {
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
        this.requestJobService.delete(id)
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
}