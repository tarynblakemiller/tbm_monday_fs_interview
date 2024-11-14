import type {
  TextFieldProps,
  ButtonProps,
  DropdownProps,
} from "monday-ui-react-core";

export interface Fragrance {
  id: number;
  fragrance_id: string;
  name: string;
  description: string;
  category: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  value: string;
  label: string;
}

export interface FormData {
  id: number | null;
  fragrance_id: string;
  name: string;
  category: string;
  description: string;
}

export interface UseFragrancesReturn {
  data: Fragrance[];
  loading: boolean;
  categories: Category[];
  refetch: () => Promise<void>;
  error: Error | null;
}

export interface FragranceManagerProps {
  onClose?: () => void;
}

export interface FormErrors {
  invalid: boolean;
  duplicate: boolean;
}

export type FragranceTextFieldProps = TextFieldProps & {
  name: keyof FormData;
};

export type FragranceDropdownProps = Omit<DropdownProps, "onChange"> & {
  onChange: (value: DropdownOption | null) => void;
};

export type FragranceButtonProps = Omit<ButtonProps, "onClick"> & {
  onClick?: () => void;
};
