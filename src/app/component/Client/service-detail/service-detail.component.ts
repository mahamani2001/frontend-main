import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data-service.service';
import { Job } from '../../prestataire/job';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent  implements OnInit{
  services!:Job;
constructor(private data:DataService,private route: ActivatedRoute){}

ngOnInit() {

}
}
