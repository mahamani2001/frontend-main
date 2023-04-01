import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  
  @Output() onData = new EventEmitter<string>();

  emitData() {
    this.onData.emit('Hello, Parent!');
  }
}
