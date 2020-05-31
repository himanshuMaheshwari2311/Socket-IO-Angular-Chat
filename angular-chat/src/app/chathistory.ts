import { Message } from './message';

export interface ChatHistory {
    name: string;
    messages: Message[];
}
