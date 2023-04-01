import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  enterSearchValue:string='';
  @Output()

  searchTextChanged:EventEmitter<string> =new EventEmitter<string>();
   onsearchTextChanged(){
    this.searchTextChanged.emit(this.enterSearchValue); 
  }
}
