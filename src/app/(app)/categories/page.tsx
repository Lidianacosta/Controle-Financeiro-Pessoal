
"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { CategoryTable } from '@/components/categories/category-table';
import { AddCategoryDialog } from '@/components/settings/add-category-dialog';
import { categories as initialCategories } from '@/lib/mock-data';
import type { Categoria } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function CategoriesPage() {
    const { toast } = useToast();
    const [categories, setCategories] = useState<Categoria[]>(initialCategories);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddCategory = (newCategoryData: Omit<Categoria, 'id'>) => {
        const newCategory: Categoria = {
            id: `cat-${Date.now()}`,
            ...newCategoryData
        }
        setCategories(prev => [...prev, newCategory]);
        toast({
            title: "Categoria Adicionada!",
            description: `A categoria ${newCategory.nome} foi criada com sucesso.`,
        });
    }

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Categorias</CardTitle>
                        <CardDescription>
                            Gerencie as categorias de despesas.
                        </CardDescription>
                    </div>
                    <Button size="sm" className="h-8 gap-1" onClick={() => setIsDialogOpen(true)}>
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Nova Categoria
                        </span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <CategoryTable categories={categories} />
                </CardContent>
            </Card>
            <AddCategoryDialog 
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onAddCategory={handleAddCategory}
            />
        </>
    )
}
