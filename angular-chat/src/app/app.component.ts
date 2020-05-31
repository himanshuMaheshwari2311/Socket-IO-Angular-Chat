import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from './chat.service';
import { ChatHistory } from './chathistory';
import { Message } from './message';

const chathistory: Map<string, ChatHistory> = new Map([
  ['Himanshu Maheshwari',
    {
      'name': 'Himanshu Maheshwari',
      'messages': [
        { 'message': 'Hi! is the chat component ready?', 'author': 'Rohit Bhaskar', 'timestamp': '18:56' },
        { 'message': 'Layout is almost done', 'author': 'Himanshu Maheshwari', 'timestamp': '19:11' }
      ]
    },
  ],
  ['Tanay Shah',
    {
      'name': 'Tanay Shah',
      'messages': [
        { 'message': 'Hi! is frappe server up?', 'author': 'Rohit Bhaskar', 'timestamp': '18:58' },
        { 'message': 'Yes and migrated database to aws rds', 'author': 'Tanay Shah', 'timestamp': '19:05' },
        { 'message': 'Okay, great!', 'author': 'Rohit Bhaskar', 'timestamp': '19:15' },
        { 'message': 'Okay, great!', 'author': 'Rohit Bhaskar', 'timestamp': '19:15' },
        { 'message': 'Okay, great!', 'author': 'Rohit Bhaskar', 'timestamp': '19:15' },
        { 'message': 'Okay, great!', 'author': 'Rohit Bhaskar', 'timestamp': '19:15' },
        { 'message': 'Okay, great!', 'author': 'Rohit Bhaskar', 'timestamp': '19:15' },
        { 'message': 'Okay, great!', 'author': 'Rohit Bhaskar', 'timestamp': '19:15' },
        { 'message': 'Okay, great!', 'author': 'Rohit Bhaskar', 'timestamp': '19:15' },
      ]
    },
  ],
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewChecked {
  user: string;
  title: string;
  receiver: string;
  receiverTitle: string;
  chatListItem: { name: string, lastMessage: string }[] = [];
  chatMessages: Message[] = [];
  chatHistory: any;

  @ViewChild('chatContainer') private chatContainer: ElementRef;
  @ViewChild('currentMessage') private currentMessage: ElementRef;

  constructor(private chatService: ChatService) {
    this.user = 'Rohit Bhaskar';
    this.title = 'Mentor';
    this.chatHistory = chathistory;
  }


  ngOnInit() {
    this.loadChatList();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    console.log(this.currentMessage.nativeElement.value);
    this.chatHistory.get(this.receiver).messages.push(
      {
        'message': this.currentMessage.nativeElement.value,
        'author' : this.user,
        'timestamp': '19:56'
      }
    );
    this.currentMessage.nativeElement.value = '';
  }

  callChatService() {
    this.chatService.testApi();
  }

  loadChat(name) {
    this.receiver = name;
    this.receiverTitle = 'Mentor';
    this.chatMessages = this.chatHistory.get(name).messages;
    console.log(this.chatMessages);
  }

  loadChatList() {
    chathistory.forEach((value: ChatHistory, key: string) => {
      this.chatListItem.push({ 'name': key, 'lastMessage': value.messages[value.messages.length - 1].message });
    });
    console.log(this.chatListItem);
  }

  isUser(name) {
    return this.user === name;
  }

  isReciever() {
    return this.receiver ? true : false;
  }

  scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
