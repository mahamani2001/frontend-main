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
  jobRequests!:any[];
  response!: string;
  prix!: number;
  userId!:number;
  selectedRequest: Request | undefined;
  data!:any;
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
     this.userId=this.selectedRequest.user_id;
    this.jobRequestService.respondToJobRequest(this.selectedRequest.id, this.response, this.prix,this.userId)
      .subscribe(
        response => console.log(response)
      );
  }
  

  ngOnInit(): void {
    this.getJobberRequest();
  }
  getJobberRequest(){
    this.jobRequestService.getJobberRequest().subscribe(
    res => {
      this.data=res;
      this.jobRequests = this.data.requestJobs;
      console.log(this.jobRequests);
    },
   error => console.log(error)
 );
}

  

}