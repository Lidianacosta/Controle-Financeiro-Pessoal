
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

const categorySchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  descricao: z.string().optional(),
  icon: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

type AddCategoryDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onAddCategory: (category: Omit<Categoria, "id">) => void;
};

export function AddCategoryDialog({ isOpen, onOpenChange, onAddCategory }: AddCategoryDialogProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nome: "",
      descricao: "",
      icon: "MoreHorizontal",
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    onAddCategory(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Categoria</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da nova categoria de despesas.
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
                    <FormLabel>Ícone (Lucide)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Home" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                  <DialogClose asChild>
                      <Button type="button" variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">Salvar Categoria</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
