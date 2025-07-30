import type { Despesa, Categoria, User } from './types';

export const categories: Categoria[] = [
  { id: '1', name: 'Comida', icon: 'Utensils', descricao: 'Despesas com comida, restaurantes, etc.' },
  { id: '2', name: 'Transporte', icon: 'Bus', descricao: 'Despesas com transporte público, combustível, etc.' },
  { id: '3', name: 'Aluguel', icon: 'Home', descricao: 'Aluguel, contas de casa, etc.' },
  { id: '4', name: 'Lazer', icon: 'Film', descricao: 'Cinema, shows, etc.' },
  { id: '5', name: 'Saúde', icon: 'HeartPulse', descricao: 'Médicos, remédios, etc.' },
  { id: '6', name: 'Educação', icon: 'BookOpen', descricao: 'Cursos, livros, etc.' },
  { id: '7', name: 'Outros', icon: 'MoreHorizontal', descricao: 'Outras despesas não categorizadas.' },
];

export const expenses: Despesa[] = [
  { id: '1', nome: 'Almoço no restaurante', valor: 45.50, descricao: 'Almoço com amigos no centro da cidade', data: new Date(2024, 6, 1), status: 'Paga', category: categories[0] },
  { id: '2', nome: 'Passagem de ônibus', valor: 4.50, descricao: 'Ida para o trabalho', data: new Date(2024, 6, 1), status: 'Paga', category: categories[1] },
  { id: '3', nome: 'Aluguel', valor: 1500, descricao: 'Aluguel do apartamento', data: new Date(2024, 6, 5), status: 'Paga', category: categories[2] },
  { id: '4', nome: 'Cinema', valor: 30, descricao: 'Ingresso para filme de ação', data: new Date(2024, 6, 10), status: 'Paga', category: categories[3] },
  { id: '5', nome: 'Consulta médica', valor: 250, descricao: 'Consulta de rotina', data: new Date(2024, 6, 15), status: 'A Pagar', category: categories[4] },
  { id: '6', nome: 'Curso de Inglês', valor: 350, descricao: 'Mensalidade do curso', data: new Date(2024, 6, 20), status: 'Paga', category: categories[5] },
  { id: '7', nome: 'Supermercado', valor: 450, descricao: 'Compras do mês', data: new Date(2024, 5, 28), status: 'Paga', category: categories[0] },
];

export const user: User = {
    id: '1',
    nome: 'Fulano de Tal',
    cpf: '123.456.789-00',
    email: 'fulano@example.com',
    data_de_aniversario: new Date(1990, 5, 15),
    numero_de_telefone: '(99) 99999-9999',
    renda_mensal: 7500
}
