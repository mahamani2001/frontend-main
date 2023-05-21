import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit{
  ngOnInit() {
    this.locationForm = new FormGroup({
      address: new FormControl(this.location.address),
      city: new FormControl(this.location.city),
      state: new FormControl(this.location.state),
      country: new FormControl(this.location.country)
    });
  }
  
}
