"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { CategoryTable } from '@/components/categories/category-table';
import { AddEditCategoryDialog } from '@/components/categories/add-category-dialog';
import { categories as initialCategories } from '@/lib/mock-data';
import type { Categoria } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function CategoriesPage() {
    const { toast } = useToast();
    const [categories, setCategories] = useState<Categoria[]>(initialCategories);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<Categoria | null>(null);

    const handleOpenDialog = (category?: Categoria) => {
        setCategoryToEdit(category || null);
        setIsDialogOpen(true);
    };

    const handleSaveCategory = (categoryData: Omit<Categoria, 'id'>, id?: string) => {
        if (id) {
            // Editing existing category
            setCategories(prev => prev.map(c => c.id === id ? { ...c, ...categoryData, id } : c));
            toast({
                title: "Categoria Atualizada!",
                description: `A categoria ${categoryData.nome} foi atualizada com sucesso.`,
                variant: 'success'
            });
        } else {
            // Adding new category
            const newCategory: Categoria = {
                id: `cat-${Date.now()}`,
                ...categoryData
            }
            setCategories(prev => [...prev, newCategory]);
            toast({
                title: "Categoria Adicionada!",
                description: `A categoria ${newCategory.nome} foi criada com sucesso.`,
                variant: 'success'
            });
        }
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
                    <Button size="sm" className="h-8 gap-1" onClick={() => handleOpenDialog()}>
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Nova Categoria
                        </span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <CategoryTable categories={categories} onEdit={handleOpenDialog} />
                </CardContent>
            </Card>
            <AddEditCategoryDialog 
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSaveCategory={handleSaveCategory}
                categoryToEdit={categoryToEdit}
            />
        </>
    )
}
