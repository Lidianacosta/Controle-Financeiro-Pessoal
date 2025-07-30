export type User = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  numero_de_telefone?: string;
  data_de_aniversario?: Date;
  senha?: string;
  renda_mensal: number;
  meta_de_economia?: number;
};

export type DespesaStatus = 'Paga' | 'A Pagar';

export type Despesa = {
  id: string;
  nome: string;
  valor: number;
  descricao: string;
  data: Date;
  status: DespesaStatus;
  isFixed?: boolean;
  category?: Categoria;
};

export type Categoria = {
  id: string;
  nome: string;
  descricao?: string;
  icon?: string;
};
