
"use client";

import { useContext, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppContext } from '@/context/app-context';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export default function ReportsPage() {
    const { expenses } = useContext(AppContext);

    const { chartData, chartConfig, totalExpenses } = useMemo(() => {
        const expenseDataByCat = expenses.reduce((acc, expense) => {
            const categoryName = expense.category?.nome || 'Outros';
            if (!acc[categoryName]) {
                acc[categoryName] = 0;
            }
            acc[categoryName] += expense.valor;
            return acc;
        }, {} as Record<string, number>);

        const totalExpenses = Object.values(expenseDataByCat).reduce((sum, value) => sum + value, 0);

        const chartData = Object.entries(expenseDataByCat).map(([name, value]) => ({
            name,
            value,
        }));

        const chartConfig: ChartConfig = {};
        chartData.forEach((item, index) => {
            chartConfig[item.name] = {
                label: item.name,
                color: COLORS[index % COLORS.length]
            }
        });
        
        return { chartData, chartConfig, totalExpenses };
    }, [expenses]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
    };

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
                        <PieChart>
                            <Tooltip
                                content={
                                <ChartTooltipContent
                                    formatter={(value, name) => {
                                        const percentage = totalExpenses > 0 ? ((value as number) / totalExpenses) * 100 : 0;
                                        return `${formatCurrency(value as number)} (${percentage.toFixed(2)}%)`;
                                    }}
                                    labelFormatter={(label) => chartConfig[label]?.label}
                                />
                                }
                            />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                labelLine={false}
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                    return (
                                        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                    );
                                }}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend wrapperStyle={{fontSize: "12px"}}/>
                        </PieChart>
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
