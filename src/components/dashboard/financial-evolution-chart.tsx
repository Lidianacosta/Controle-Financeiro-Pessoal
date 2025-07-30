
"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { Despesa } from '@/lib/types';
import { format, subMonths, addMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
};

export default function FinancialEvolutionChart({ expenses }: { expenses: Despesa[] }) {
    const { chartData, chartConfig } = useMemo(() => {
        const months = [];
        const today = new Date();
        for (let i = 3; i > 0; i--) {
            months.push(subMonths(today, i));
        }
        months.push(today);
        for (let i = 1; i <= 3; i++) {
            months.push(addMonths(today, i));
        }

        const fixedExpenses = expenses.filter(e => e.isFixed && e.status === 'Paga');

        const chartData = months.map(month => {
            const monthStart = startOfMonth(month);
            const monthEnd = endOfMonth(month);
            
            let total = 0;
            
            if (month <= today) {
                // Past and current months
                 total = expenses
                    .filter(e => {
                        const expenseDate = new Date(e.data);
                        return isWithinInterval(expenseDate, { start: monthStart, end: monthEnd });
                    })
                    .reduce((sum, e) => sum + e.valor, 0);
            } else {
                // Future months (projection)
                total = fixedExpenses.reduce((sum, e) => sum + e.valor, 0);
            }


            return {
                name: format(month, 'MMM/yy', { locale: ptBR }),
                total: total,
                type: month > today ? 'Projeção' : 'Realizado'
            };
        });

        const chartConfig: ChartConfig = {
            total: {
                label: 'Total Gasto',
            },
        };

        return { chartData, chartConfig };
    }, [expenses]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Evolução Financeira</CardTitle>
                <CardDescription>
                    Visão geral das despesas passadas, atuais e futuras (projeção).
                </CardDescription>
            </CardHeader>
            <CardContent>
                {expenses.length > 0 ? (
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                                />
                                <YAxis
                                    tickFormatter={(value) => formatCurrency(value as number)}
                                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--muted))' }}
                                    content={
                                        <ChartTooltipContent
                                            formatter={(value, name, item) => (
                                                <div className='flex flex-col'>
                                                   <span>{formatCurrency(value as number)}</span>
                                                   <span className="text-xs text-muted-foreground">{item.payload.type}</span>
                                                </div>
                                            )}
                                        />
                                    }
                                />
                                <Bar dataKey="total" radius={4}>
                                    {chartData.map((entry, index) => (
                                        <div key={`cell-${index}`} style={{ backgroundColor: entry.type === 'Projeção' ? 'hsl(var(--primary) / 0.5)' : 'hsl(var(--primary))' }} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-muted-foreground">Não há dados de despesas para exibir.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
    