
"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { CategoryTable } from '@/components/settings/category-table';
import { AddCategoryDialog } from '@/components/settings/add-category-dialog';
import { categories as initialCategories } from '@/lib/mock-data';
import type { Categoria } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
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
            className: "bg-green-100 text-green-800"
        });
    }

    return (
        <Tabs defaultValue="categories">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="categories">Categorias</TabsTrigger>
                <TabsTrigger value="profile">Perfil</TabsTrigger>
            </TabsList>
            <TabsContent value="categories">
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
            </TabsContent>
            <TabsContent value="profile">
                 <Card>
                    <CardHeader>
                        <CardTitle>Perfil</CardTitle>
                        <CardDescription>
                            Atualize as informações da sua conta.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>Gerenciamento de perfil em breve.</p>
                    </CardContent>
                </Card>
            </TabsContent>
            <AddCategoryDialog 
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onAddCategory={handleAddCategory}
            />
        </Tabs>
    )
}
