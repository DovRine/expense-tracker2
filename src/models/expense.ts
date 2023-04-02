interface Expense {
  id?: number;
  year: number;
  month: number;
  amount: number;
  category?: string;
  category_id: number;
  categoryId?: number;
}

export type {Expense};
