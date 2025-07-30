
"use client";

import { useContext, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppContext } from '@/context/app-context';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export default function ReportsPage() {
    const { expenses } = useContext(AppContext);

    const { chartData, chartConfig } = useMemo(() => {
        const expenseDataByCat = expenses.reduce((acc, expense) => {
            const categoryName = expense.category?.nome || 'Outros';
            if (!acc[categoryName]) {
                acc[categoryName] = 0;
            }
            acc[categoryName] += expense.valor;
            return acc;
        }, {} as Record<string, number>);

        const chartData = Object.entries(expenseDataByCat).map(([name, value]) => ({
            name,
            value,
        })).sort((a,b) => a.value - b.value); // Sort for better visualization in bar chart

        const chartConfig: ChartConfig = {
             value: {
                label: "Total Gasto",
             },
        };
        chartData.forEach((item, index) => {
            chartConfig[item.name] = {
                label: item.name,
                color: COLORS[index % COLORS.length]
            }
        });
        
        return { chartData, chartConfig };
    }, [expenses]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Relatórios de Despesas</CardTitle>
                <CardDescription>
                    Visualize suas despesas por categoria.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {expenses.length > 0 ? (
                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                           <XAxis type="number" hide />
                           <YAxis 
                             dataKey="name" 
                             type="category" 
                             tickLine={false} 
                             axisLine={false} 
                             tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                             width={100}
                           />
                           <Tooltip
                                cursor={{ fill: 'hsl(var(--muted))' }}
                                content={
                                <ChartTooltipContent
                                    formatter={(value) =>
                                        new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                        }).format(value as number)
                                    }
                                />
                                }
                           />
                           <Bar dataKey="value" layout="vertical" radius={4} fill="hsl(var(--primary))" />
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
