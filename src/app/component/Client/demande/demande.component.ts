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

getStatusColor(status:String){
  if(status=="pending") return "status_btn_pending";
  else if(status=="completed") return "status_btn_completed";
  else return "status_btn_cancelled";
}
  refreshList(): void {
    this.getRequestJobList();
    this.currentRequest = null;
    this.currentIndex = -1;
  }
  setActiveRequest(request: any, index: number): void {
    this.currentRequest = request;
    this.currentIndex = index;
  }
  removeRequest(id: number): void {
    console.log("---<< delete ");
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
  showForm(){
    Swal.fire({
      title: 'edit demande ',
      html: `
      <div class="form-group">
      
      <input type="text" class="form-control" id="title" name="title" placeholder="Taper  préfirstname">
    </div>

    <div class="form-group">
      <label for="description"></label>
      <input type="text" class="form-control" id="description"  name="description" placeholder="Taper  title">
    </div>
    <div class="form-group">
    <label for="status"></label>
    <input type="text" class="form-control" id="status"  placeholder="Taper status">
  </div>

  <div class="form-group">
  <label for="start_date"></label>
  <input type="start_date" class="form-control" id="start_date" name="start_date"  placeholder="Taper l' start_date">
</div>

    <div class="form-group">
      <label for="end_date"></label>
      <input type="text" class="form-control" id="end_date" name="end_date"  placeholder="Taper  end_date">
    </div>

    <div class="form-group">
    <label for="location"></label>
    <input type="text" class="form-control" id="location" name="location"  placeholder="Taper  location">
  </div>

    <div class="form-group">
      <label for="time"></label>
      <input type="text" class="form-control" id="time" name="time" placeholder="Taper numéro de télétime" >
    </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Enregistrer',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const title = (<HTMLInputElement>document.getElementById('title')).value;
        const description = (<HTMLInputElement>document.getElementById('description')).value;
        const status = (<HTMLInputElement>document.getElementById('status')).value;
        const end_date = (<HTMLInputElement>document.getElementById('end_date')).value;
        const start_date = (<HTMLInputElement>document.getElementById('start_date')).value;
        const time = (<HTMLInputElement>document.getElementById('time')).value;
        const location = (<HTMLInputElement>document.getElementById('location')).value;

        // You can add your own logic for validating the form data here
        return { title, description, status,end_date, start_date, time ,location};
      }
    }).then((result: any) => {
      if (result.value) {
        // Handle form submission
        this.requestJobService.update(result.value).subscribe(
          (response) => {
            console.log('User created successfully!', response);
            // Show success message
            Swal.fire('Success', 'User created successfully!', 'success');
          }
        );
      }
    });
  }

  }
