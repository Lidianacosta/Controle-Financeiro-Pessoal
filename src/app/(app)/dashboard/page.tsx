
"use client";

import { useState, useContext } from "react";
import type { Despesa } from "@/lib/types";
import MonthlySummary from "@/components/dashboard/monthly-summary";
import ExpenseTable from "@/components/dashboard/expense-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { File, PlusCircle } from "lucide-react";
import AddExpenseSheet from "@/components/dashboard/add-expense-sheet";
import { useToast } from "@/hooks/use-toast";
import { AppContext } from "@/context/app-context";
import FinancialEvolutionChart from "@/components/dashboard/financial-evolution-chart";
import DailyExpensesChart from "@/components/dashboard/daily-expenses-chart";

export default function DashboardPage() {
  const { expenses, setExpenses, categories } = useContext(AppContext);
  const { toast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Despesa | null>(null);

  const handleOpenSheet = (expense?: Despesa) => {
    setExpenseToEdit(expense || null);
    setIsSheetOpen(true);
  };

  const handleSaveExpense = (expenseData: Omit<Despesa, "id" | "category" | "date"> & { category: string, date: Date }, id?: string) => {
    const category = categories.find(c => c.nome === expenseData.category)
    if (id) {
        // Editing
        setExpenses(prev => prev.map(e => e.id === id ? { 
            ...e, 
            ...expenseData,
            id, 
            category,
            date: new Date(expenseData.date)
        } : e));
        toast({
            title: "Despesa Atualizada!",
            description: `${expenseData.nome} foi atualizada com sucesso.`,
            variant: 'success'
        });
    } else {
        // Adding
        const newExpense: Despesa = {
            ...expenseData,
            id: `exp-${Date.now()}`,
            category,
            date: new Date(expenseData.date),
        };
        setExpenses(prev => [newExpense, ...prev]);
        toast({
            title: "Despesa Adicionada!",
            description: `${expenseData.nome} foi adicionada com sucesso.`,
            variant: 'success'
        });
    }
  };

  const handleDeleteExpense = (expenseId: string) => {
    const expenseToDelete = expenses.find(e => e.id === expenseId);
    if(expenseToDelete) {
        setExpenses(prev => prev.filter(e => e.id !== expenseId));
        toast({
            title: "Despesa Excluída!",
            description: `A despesa "${expenseToDelete.nome}" foi excluída.`,
            variant: 'success'
        })
    }
  }

  const handleExport = () => {
    if(!expenses || expenses.length === 0){
        toast({
            title: "Nenhuma despesa para exportar",
            description: "Adicione despesas antes de exportar.",
            variant: "destructive"
        })
        return;
    }
    const headers = ["Nome", "Valor", "Descrição", "Data", "Status", "Categoria"];
    const rows = expenses.map(expense => 
        [
            `"${expense.nome.replace(/"/g, '""')}"`,
            expense.valor,
            `"${expense.descricao.replace(/"/g, '""')}"`,
            new Date(expense.data).toLocaleDateString("pt-BR"),
            expense.status,
            `"${(expense.category?.nome || 'N/A').replace(/"/g, '""')}"`,
        ].join(',')
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "despesas.csv");
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
    toast({
        title: "Exportação Concluída!",
        description: "Seu arquivo de despesas (despesas.csv) foi baixado.",
        variant: "success",
    })
  }

  return (
    <div className="space-y-8">
      <MonthlySummary />
      <div className="grid gap-8 md:grid-cols-2">
        <FinancialEvolutionChart expenses={expenses} />
        <DailyExpensesChart expenses={expenses} />
      </div>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="paid" className="text-green-600">Pagas</TabsTrigger>
            <TabsTrigger value="pending" className="text-red-600">Pendentes</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exportar
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={() => handleOpenSheet()} variant="success">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Adicionar Despesa
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <ExpenseTable expenses={expenses} onEdit={handleOpenSheet} onDelete={handleDeleteExpense} />
        </TabsContent>
        <TabsContent value="paid">
          <ExpenseTable expenses={expenses.filter(e => e.status === 'Paga')} onEdit={handleOpenSheet} onDelete={handleDeleteExpense} />
        </TabsContent>
        <TabsContent value="pending">
          <ExpenseTable expenses={expenses.filter(e => e.status === 'A Pagar')} onEdit={handleOpenSheet} onDelete={handleDeleteExpense} />
        </TabsContent>
      </Tabs>
      <AddExpenseSheet 
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSaveExpense={handleSaveExpense}
        expenseToEdit={expenseToEdit}
      />
    </div>
  );
}

    
