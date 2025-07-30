
"use client";

import React, { createContext, useState, ReactNode } from 'react';
import type { Categoria, Despesa } from '@/lib/types';
import { categories as initialCategories, expenses as initialExpenses } from '@/lib/mock-data';

interface AppContextType {
  categories: Categoria[];
  setCategories: React.Dispatch<React.SetStateAction<Categoria[]>>;
  expenses: Despesa[];
  setExpenses: React.Dispatch<React.SetStateAction<Despesa[]>>;
}

export const AppContext = createContext<AppContextType>({
  categories: [],
  setCategories: () => {},
  expenses: [],
  setExpenses: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Categoria[]>(initialCategories);
  const [expenses, setExpenses] = useState<Despesa[]>(initialExpenses);

  return (
    <AppContext.Provider value={{ categories, setCategories, expenses, setExpenses }}>
      {children}
    </AppContext.Provider>
  );
};
