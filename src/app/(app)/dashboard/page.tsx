"use client";

import { useState } from "react";
import type { Expense } from "@/lib/types";
import { expenses as initialExpenses } from "@/lib/mock-data";
import MonthlySummary from "@/components/dashboard/monthly-summary";
import ExpenseTable from "@/components/dashboard/expense-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { File, PlusCircle } from "lucide-react";
import AddExpenseSheet from "@/components/dashboard/add-expense-sheet";
import { categories } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleAddExpense = (expense: Omit<Expense, "id" | "category" | "date"> & { category: string, date: Date }) => {
    const newExpense: Expense = {
      ...expense,
      id: `exp-${Date.now()}`,
      category: categories.find(c => c.name === expense.category),
      date: new Date(expense.date),
    };
    setExpenses(prev => [newExpense, ...prev]);
    toast({
      title: "Despesa Adicionada!",
      description: `${expense.name} foi adicionada com sucesso.`,
    })
  };

  return (
    <>
      <MonthlySummary expenses={expenses} />
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="paid" className="text-green-600">Pagas</TabsTrigger>
            <TabsTrigger value="pending" className="text-orange-600">Pendentes</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exportar
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={() => setIsSheetOpen(true)}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Adicionar Despesa
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <ExpenseTable expenses={expenses} />
        </TabsContent>
        <TabsContent value="paid">
          <ExpenseTable expenses={expenses.filter(e => e.status === 'pago')} />
        </TabsContent>
        <TabsContent value="pending">
          <ExpenseTable expenses={expenses.filter(e => e.status === 'a pagar')} />
        </TabsContent>
      </Tabs>
      <AddExpenseSheet 
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onAddExpense={handleAddExpense}
      />
    </>
  );
}
