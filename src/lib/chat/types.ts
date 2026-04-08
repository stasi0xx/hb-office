export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface MenuDish {
  nazwa: string;
  cena: string;
}

export interface MenuDay {
  [category: string]: MenuDish[];
}

export interface MenuData {
  [date: string]: MenuDay;
}
