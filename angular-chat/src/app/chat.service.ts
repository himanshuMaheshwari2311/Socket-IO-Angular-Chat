import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
    private url = 'http://tie.prod:9000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(from, message) {
        console.log('sending: ' + message);
        this.socket.emit('private message', from, message);
    }

    public testApi() {
        console.log('sending to api');
        this.socket.emit('frappe.chat.room:subscribe');
        // this.socket.on();
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('this', (message) => {
                console.log(message);
                observer.next(message);
            });
        });
    }
}
