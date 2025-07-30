
import type { Despesa, Categoria, User } from './types';

export const categories: Categoria[] = [
  { id: 'cat-1', name: 'Moradia', icon: 'Home', descricao: 'Despesas com aluguel, condomínio, IPTU, etc.' },
  { id: 'cat-2', name: 'Alimentação', icon: 'Utensils', descricao: 'Supermercado, restaurantes, delivery.' },
  { id: 'cat-3', name: 'Transporte', icon: 'Bus', descricao: 'Transporte público, combustível, aplicativos.' },
  { id: 'cat-4', name: 'Saúde', icon: 'HeartPulse', descricao: 'Farmácia, consultas, planos de saúde.' },
  { id: 'cat-5', name: 'Lazer', icon: 'Film', descricao: 'Cinema, passeios, hobbies, streaming.' },
  { id: 'cat-6', name: 'Educação', icon: 'BookOpen', descricao: 'Cursos, livros, material escolar.' },
  { id: 'cat-7', name: 'Contas Fixas', icon: 'FileText', descricao: 'Água, luz, internet, celular, etc.' },
  { id: 'cat-8', name: 'Outros', icon: 'MoreHorizontal', descricao: 'Despesas diversas não categorizadas.' },
];

export const expenses: Despesa[] = [];

export const user: User = {
    id: 'user-1',
    nome: 'Maria Silva',
    cpf: '123.456.789-00',
    email: 'maria.silva@example.com',
    data_de_aniversario: new Date(1992, 4, 25),
    numero_de_telefone: '(21) 98765-4321',
    renda_mensal: 7500
}
