import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
  messages: any = { sent: [], received: [] };
    data!:any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/messages').subscribe(data => {
      this.messages = data;
    });
  }
  deleteMessage(){
    
  }
  sendMessage(){}
}

