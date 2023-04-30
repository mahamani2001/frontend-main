import { Component } from '@angular/core';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
  message: string = ''; // Message input field value
  emojiPicker: boolean = false;
  
  chatDialogVisible: boolean = false;
   // Function to open the chat dialog
  toggleEmojiPicker() {
    console.log('toggleEmojiPicker() called');
    console.log('this.emojiPicker before toggle:', this.emojiPicker);
    this.emojiPicker = !this.emojiPicker;
    console.log('this.emojiPicker after toggle:', this.emojiPicker);
  }
  

  // Function to add the selected emoji to the message input field
  addEmoji(event: any) {
    this.message += event.emoji.native;
  }

  // Function to send the message
  sendMessage() {
    // your code here to handle sending the message
  }
  deleteMessage(){}
}

