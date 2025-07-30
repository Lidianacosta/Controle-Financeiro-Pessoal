

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { Categoria } from "@/lib/types";
import { useEffect } from "react";
import { IconPicker } from "../settings/icon-picker";
import * as Lucide from 'lucide-react';

const iconList = Object.keys(Lucide).filter(key => typeof Lucide[key as keyof typeof Lucide] === 'object' && key !== 'createLucideIcon' && key !== 'icons');

const categorySchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  descricao: z.string().optional(),
  icon: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

type AddEditCategoryDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSaveCategory: (category: Omit<Categoria, "id">, id?: string) => void;
    categoryToEdit?: Categoria | null;
};

export function AddEditCategoryDialog({ isOpen, onOpenChange, onSaveCategory, categoryToEdit }: AddEditCategoryDialogProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nome: "",
      descricao: "",
      icon: "MoreHorizontal",
    },
  });

  useEffect(() => {
    if (categoryToEdit && isOpen) {
      form.reset({
        nome: categoryToEdit.nome,
        descricao: categoryToEdit.descricao || "",
        icon: categoryToEdit.icon || "MoreHorizontal"
      });
    } else if (!isOpen) {
      form.reset({
        nome: "",
        descricao: "",
        icon: "MoreHorizontal",
      });
    }
  }, [categoryToEdit, isOpen, form]);

  const onSubmit = (data: CategoryFormValues) => {
    onSaveCategory(data, categoryToEdit?.id);
    onOpenChange(false);
  };

  const dialogTitle = categoryToEdit ? "Editar Categoria" : "Adicionar Nova Categoria";
  const dialogDescription = categoryToEdit ? "Atualize os detalhes da sua categoria." : "Preencha os detalhes da nova categoria de despesas.";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Contas Fixas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva a categoria." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ícone</FormLabel>
                    <FormControl>
                       <IconPicker 
                        value={field.value || "MoreHorizontal"} 
                        onChange={field.onChange} 
                        iconList={iconList}
                       />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                  <DialogClose asChild>
                      <Button type="button" variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
