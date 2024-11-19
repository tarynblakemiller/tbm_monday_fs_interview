export interface IFragranceData {
  name: string;
  description: string;
  category: string;
  image_url: string;
}

export interface IFragranceComplete extends IFragranceData {
  id: string;
  fragrance_id: string;
  created_at: Date;
  updated_at: Date;
}
