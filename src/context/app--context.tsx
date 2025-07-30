
"use client";

import React, { createContext, useState, ReactNode } from 'react';
import type { Categoria, Despesa, User } from '@/lib/types';
import { categories as initialCategories, expenses as initialExpenses, user as initialUser } from '@/lib/mock-data';

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  categories: Categoria[];
  setCategories: React.Dispatch<React.SetStateAction<Categoria[]>>;
  expenses: Despesa[];
  setExpenses: React.Dispatch<React.SetStateAction<Despesa[]>>;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  categories: [],
  setCategories: () => {},
  expenses: [],
  setExpenses: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [categories, setCategories] = useState<Categoria[]>(initialCategories);
  const [expenses, setExpenses] = useState<Despesa[]>(initialExpenses);

  return (
    <AppContext.Provider value={{ user, setUser, categories, setCategories, expenses, setExpenses }}>
      {children}
    </AppContext.Provider>
  );
};
