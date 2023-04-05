import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { JobRequestService } from 'src/app/service/job-request.service';
import { Request } from 'src/app/interface/request';
import { RequestJobService } from 'src/app/service/requestjob.service';

@Component({
  selector: 'app-respond-to-job-request',
  templateUrl: './respond-to-job-request.component.html',
  styleUrls: ['./respond-to-job-request.component.css']
})
export class RespondToJobRequestComponent {
  jobRequests: Request[] = [];
  response!: string;
  prix!: number;
  selectedRequest: Request | undefined;
  
  constructor(private jobRequestService: RequestJobService, private http: HttpClient) {}

  /*respondToJobRequest() {
    if (!this.selectedRequest) {
      console.error('No request selected');
      return;
    }
    this.jobRequestService.respondToJobRequest(this.selectedRequest.id, this.response, this.prix).subscribe(
      response => console.log(response),
    
    );
  }*/
 
  respondToJobRequest() {
   
    if (!this.selectedRequest) {
      console.error('No request selected');
      return;
    }
    console.log('Response:', this.response);
    console.log('Prix:', this.prix);
  
    this.jobRequestService.respondToJobRequest(this.selectedRequest.id, this.response, this.prix)
      .subscribe(
        response => console.log(response)
      );
  }
  

  ngOnInit(): void {
    //hadhia ll prestataire unique
    /*this.http.get<Request[]>('http://localhost:8000/api/providerRequest').subscribe(
      data => {
        console.log(this.jobRequests); 
        this.jobRequests = data;
      }
    );*/
  //  this.getProviderRequests();
  this.getJobRequests();
  }
 /* getProviderRequests(): void {
    this.jobRequestService.getProviderRequests()
      .subscribe(jobRequests => this.jobRequests = jobRequests);
  }
  */
  getJobRequests() {
    this.http.get<any[]>('http://localhost:8000/api/job-request').subscribe(
      data => {
        this.jobRequests = data;
      },
      error => console.log(error)
    );
  }
  

}
