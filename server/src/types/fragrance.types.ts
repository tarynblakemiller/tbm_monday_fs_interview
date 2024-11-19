export interface IFragrance {
  id: string;
  fragrance_id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  stock?: number;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type CreateFragranceDTO = Omit<
  IFragrance,
  "id" | "fragrance_id" | "created_at" | "updated_at"
>;

export type UpdateFragranceDTO = Partial<CreateFragranceDTO>;
