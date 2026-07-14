export interface NoteRequest {
  name: string;
  message: string;
  category: string;
  card_color: string;
}

export interface NoteResponse {
  id: number;
  name: string;
  created_at: string;
  image_url?: string;
  message: string;
  card_number: number;
  category: string;
  card_color: string;
}
