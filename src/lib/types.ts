export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  birthDate?: Date;
  fixedIncome: number;
  extraIncome: number;
  monthlyGoal: number;
};

export type Expense = {
  id: string;
  name: string;
  value: number;
  description: string;
  date: Date;
  status: 'pago' | 'a pagar';
  isFixed: boolean;
  category?: Category;
};

export type Category = {
  id: string;
  name: string;
  icon?: string;
};
