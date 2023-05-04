import { Component } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  sentMessages: any[] = [];
  receivedMessages: any[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // Fetch jobber messages
    this.messageService.getJobberMessages().subscribe(
      (res: any) => {
        this.sentMessages = res.sent;
        this.receivedMessages = res.received;
      },
      err => {
        console.log(err);
      }
    );
  }
}
