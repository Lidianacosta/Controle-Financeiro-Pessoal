
"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { Despesa } from '@/lib/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDate } from 'date-fns';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
};

export default function DailyExpensesChart({ expenses }: { expenses: Despesa[] }) {
    const { chartData, chartConfig } = useMemo(() => {
        const today = new Date();
        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

        const expensesThisMonth = expenses.filter(e => {
            const expenseDate = new Date(e.data);
            return expenseDate >= monthStart && expenseDate <= monthEnd;
        });

        const chartData = daysInMonth.map(day => {
            const total = expensesThisMonth
                .filter(e => isSameDay(new Date(e.data), day))
                .reduce((sum, e) => sum + e.valor, 0);

            return {
                name: format(day, 'dd'),
                fullDate: day,
                total: total,
            };
        });

        const chartConfig: ChartConfig = {
            total: {
                label: 'Total Gasto',
                color: 'hsl(var(--primary))',
            },
        };

        return { chartData, chartConfig };
    }, [expenses]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gastos Diários do Mês</CardTitle>
                <CardDescription>
                    Acompanhe seus gastos dia a dia no mês atual.
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
                                    interval={4}
                                />
                                <YAxis
                                    tickFormatter={(value) => formatCurrency(value as number)}
                                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--muted))' }}
                                    content={<ChartTooltipContent 
                                        labelFormatter={(label, payload) => {
                                            if (payload && payload.length > 0) {
                                                const data = payload[0].payload;
                                                return format(data.fullDate, 'dd/MM/yyyy');
                                            }
                                            return label;
                                        }}
                                        formatter={(value) => formatCurrency(value as number)} 
                                    />}
                                />
                                <Bar dataKey="total" fill="var(--color-total)" radius={4} />
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
    