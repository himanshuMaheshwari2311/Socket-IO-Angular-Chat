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

  ngOnInit() {
    this.chatService
      .getMessages().pipe(distinctUntilChanged()).pipe(filter((message: string) => message.length > 0))
      .pipe(throttleTime(1000))
      .pipe(skipWhile((message) => message !== this.secretCode))
      .pipe(scan((acc, message, index) =>
        message + index + 1
        , 1))
      .subscribe((message: string) => {
        const currentTime = moment().format('hh:mm:ss a');
        const messageWithTimestamp = `${currentTime}: ${message}`;
        this.messages.push(messageWithTimestamp);
      });
  }
}