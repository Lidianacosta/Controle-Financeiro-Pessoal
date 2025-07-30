
"use client";

import React, { createContext, useState, ReactNode, useEffect } from 'react';
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
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [expenses, setExpenses] = useState<Despesa[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedUser = localStorage.getItem('user');
      setUser(savedUser ? JSON.parse(savedUser, (key, value) => {
        if (key === 'data_de_aniversario') {
            return new Date(value);
        }
        return value;
      }) : initialUser);

      const savedCategories = localStorage.getItem('categories');
      setCategories(savedCategories ? JSON.parse(savedCategories) : initialCategories);

      const savedExpenses = localStorage.getItem('expenses');
      setExpenses(savedExpenses ? JSON.parse(savedExpenses, (key, value) => {
        if (key === 'data') {
            return new Date(value);
        }
        return value;
      }) : initialExpenses);
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setUser(initialUser);
      setCategories(initialCategories);
      setExpenses(initialExpenses);
    }
  }, []);

  useEffect(() => {
    if (isMounted && user !== null) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [categories, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses, isMounted]);
  
  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <AppContext.Provider value={{ user, setUser, categories, setCategories, expenses, setExpenses }}>
      {children}
    </AppContext.Provider>
  );
};
