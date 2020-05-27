import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

import * as moment from 'moment';

import { distinctUntilChanged, skipWhile, filter, throttleTime, scan } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message: string;
  messages: string[] = [];
  secretCode: string;

  constructor(private chatService: ChatService) {
    this.secretCode = 'DONT TELL';
  }

  sendMessage() {
    this.chatService.sendMessage('Himanshu', this.message);
    this.message = '';
  }

  callChatService() {
    this.chatService.testApi();
  }


  ngOnInit() {
  }
}