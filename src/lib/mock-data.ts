import type { Expense, Category } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Alimentação', icon: 'Utensils' },
  { id: '2', name: 'Transporte', icon: 'Bus' },
  { id: '3', name: 'Moradia', icon: 'Home' },
  { id: '4', name: 'Lazer', icon: 'Film' },
  { id: '5', name: 'Saúde', icon: 'HeartPulse' },
  { id: '6', name: 'Educação', icon: 'BookOpen' },
  { id: '7', name: 'Outros', icon: 'MoreHorizontal' },
];

export const expenses: Expense[] = [
  { id: '1', name: 'Almoço no restaurante', value: 45.50, description: 'Almoço com amigos no centro da cidade', date: new Date(2024, 6, 1), status: 'pago', isFixed: false, category: categories[0] },
  { id: '2', name: 'Passagem de ônibus', value: 4.50, description: 'Ida para o trabalho', date: new Date(2024, 6, 1), status: 'pago', isFixed: true, category: categories[1] },
  { id: '3', name: 'Aluguel', value: 1500, description: 'Aluguel do apartamento', date: new Date(2024, 6, 5), status: 'pago', isFixed: true, category: categories[2] },
  { id: '4', name: 'Cinema', value: 30, description: 'Ingresso para filme de ação', date: new Date(2024, 6, 10), status: 'pago', isFixed: false, category: categories[3] },
  { id: '5', name: 'Consulta médica', value: 250, description: 'Consulta de rotina', date: new Date(2024, 6, 15), status: 'a pagar', isFixed: false, category: categories[4] },
  { id: '6', name: 'Curso de Inglês', value: 350, description: 'Mensalidade do curso', date: new Date(2024, 6, 20), status: 'pago', isFixed: true, category: categories[5] },
  { id: '7', name: 'Supermercado', value: 450, description: 'Compras do mês', date: new Date(2024, 5, 28), status: 'pago', isFixed: false, category: categories[0] },
];
