export interface IFragrance {
  id: number;
  fragrance_id: string;
  name: string;
  description: string | null;
  category: string;
  image_url: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export type CreateFragranceDTO = Omit<
  IFragrance,
  "id" | "fragrance_id" | "created_at" | "updated_at"
>;

export type UpdateFragranceDTO = Partial<CreateFragranceDTO>;
