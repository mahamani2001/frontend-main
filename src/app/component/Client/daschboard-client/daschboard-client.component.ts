import { Component } from '@angular/core';
import { Profile } from '../profile';

@Component({
  selector: 'app-daschboard-client',
  templateUrl: './daschboard-client.component.html',
  styleUrls: ['./daschboard-client.component.css']
})
export class DaschboardClientComponent {
  profil=new Profile();
  
}
