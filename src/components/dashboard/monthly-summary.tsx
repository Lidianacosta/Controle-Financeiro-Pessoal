
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, Landmark, TrendingUp } from "lucide-react";
import type { Despesa, User } from "@/lib/types";
import { useContext } from "react";
import { AppContext } from "@/context/app-context";

type MonthlySummaryProps = {
  expenses: Despesa[];
};

export default function MonthlySummary({ expenses }: MonthlySummaryProps) {
  const { user } = useContext(AppContext);
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.valor, 0);
  const income = user?.renda_mensal || 0;
  const savingsGoal = user?.meta_de_economia || 0;
  const balance = income - totalExpenses;
  const savings = income - totalExpenses;
  const savingsPercentage = savingsGoal > 0 ? (savings / savingsGoal) * 100 : 0;


  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Renda Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(income)}
          </div>
          <p className="text-xs text-muted-foreground">
            Baseado na sua renda cadastrada
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas Totais</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {formatCurrency(totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">
            Total de despesas do mês
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
          <Landmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${balance < 0 ? 'text-destructive' : 'text-primary'}`}>
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-muted-foreground">Balanço do mês atual</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Meta de Economia</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(savings)}
          </div>
          <p className="text-xs text-muted-foreground">
             {savingsPercentage.toFixed(0)}% da sua meta de {formatCurrency(savingsGoal)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
