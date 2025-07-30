import type { Despesa, Categoria, User } from './types';

export const categories: Categoria[] = [
  { id: 'cat-1', name: 'Moradia', icon: 'Home', descricao: 'Despesas com aluguel, condomínio, etc.' },
  { id: 'cat-2', name: 'Alimentação', icon: 'Utensils', descricao: 'Supermercado, restaurantes, delivery.' },
  { id: 'cat-3', name: 'Transporte', icon: 'Bus', descricao: 'Transporte público, combustível, apps.' },
  { id: 'cat-4', name: 'Saúde', icon: 'HeartPulse', descricao: 'Farmácia, consultas, planos.' },
  { id: 'cat-5', name: 'Lazer', icon: 'Film', descricao: 'Cinema, passeios, streaming.' },
  { id: 'cat-6', name: 'Educação', icon: 'BookOpen', descricao: 'Cursos, livros, material escolar.' },
  { id: 'cat-7', name: 'Contas Fixas', icon: 'FileText', descricao: 'Água, luz, internet, celular.' },
  { id: 'cat-8', name: 'Outros', icon: 'MoreHorizontal', descricao: 'Outras despesas não categorizadas.' },
];

export const expenses: Despesa[] = [
  { id: 'exp-1', nome: 'Aluguel Apto', valor: 1800.00, descricao: 'Pagamento mensal do aluguel', data: new Date(2024, 6, 5), status: 'Paga', category: categories[0], isFixed: true },
  { id: 'exp-2', nome: 'Supermercado do Mês', valor: 750.80, descricao: 'Compras mensais no Pão de Açúcar', data: new Date(2024, 6, 2), status: 'Paga', category: categories[1] },
  { id: 'exp-3', nome: 'Plano de Internet', valor: 99.90, descricao: 'Mensalidade Vivo Fibra', data: new Date(2024, 6, 10), status: 'Paga', category: categories[6], isFixed: true },
  { id: 'exp-4', nome: 'Jantar Japonês', valor: 120.00, descricao: 'Jantar com amigos no Sushi Leblon', data: new Date(2024, 6, 12), status: 'Paga', category: categories[1] },
  { id: 'exp-5', nome: 'Bilhete Único', valor: 50.00, descricao: 'Recarga para transporte público', data: new Date(2024, 6, 1), status: 'Paga', category: categories[2] },
  { id: 'exp-6', nome: 'Farmácia', valor: 75.50, descricao: 'Compra de analgésicos e vitaminas', data: new Date(2024, 6, 15), status: 'A Pagar', category: categories[3] },
  { id: 'exp-7', nome: 'Mensalidade Academia', valor: 150.00, descricao: 'Plano mensal SmartFit', data: new Date(2024, 6, 20), status: 'Paga', category: categories[4], isFixed: true },
  { id: 'exp-8', nome: 'Ingresso Cinema', valor: 45.00, descricao: 'Filme novo no Kinoplex', data: new Date(2024, 5, 28), status: 'Paga', category: categories[4] },
  { id: 'exp-9', nome: 'Curso de Programação', valor: 450.00, descricao: 'Mensalidade curso de React', data: new Date(2024, 6, 1), status: 'Paga', category: categories[5], isFixed: true },
];

export const user: User = {
    id: 'user-1',
    nome: 'Maria Silva',
    cpf: '123.456.789-00',
    email: 'maria.silva@example.com',
    data_de_aniversario: new Date(1992, 4, 25),
    numero_de_telefone: '(21) 98765-4321',
    renda_mensal: 7500
}
