
import type { Despesa, Categoria, User } from './types';

export const categories: Categoria[] = [];

export const expenses: Despesa[] = [];

export const user: User = {
    id: 'user-1',
    nome: 'Maria Silva',
    cpf: '123.456.789-00',
    email: 'maria.silva@example.com',
    data_de_aniversario: new Date(1992, 4, 25),
    numero_de_telefone: '(21) 98765-4321',
    renda_mensal: 7500,
    meta_de_economia: 2000
}
