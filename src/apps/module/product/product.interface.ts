export interface TVariants {
  type: string;
  value: string;
}

export interface TInventory {
  quantity: number;
  inStock: boolean;
}

export interface Tproduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariants[];
  inventory: TInventory;
  isDeleted: boolean;
}

export interface Terror {
  error: unknown;
}
