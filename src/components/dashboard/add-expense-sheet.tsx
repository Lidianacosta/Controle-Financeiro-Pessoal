
"use client";

import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { suggestExpenseCategory } from "@/ai/flows/suggest-expense-category";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Despesa, Categoria } from "@/lib/types";
import { AppContext } from "@/context/app-context";

const expenseSchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  valor: z.coerce.number().positive("O valor deve ser positivo."),
  descricao: z.string().min(3, "A descrição é muito curta.").max(200, "A descrição é muito longa."),
  data: z.date({ required_error: "A data é obrigatória." }),
  status: z.enum(["Paga", "A Pagar"], { required_error: "Selecione o status." }),
  category: z.string({ required_error: "Selecione uma categoria." }),
  isFixed: z.boolean().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

type AddExpenseSheetProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSaveExpense: (expense: Omit<Despesa, "id" | "category" | "date"> & { category: string, date: Date }, id?: string) => void;
    expenseToEdit?: Despesa | null;
};

export default function AddExpenseSheet({ isOpen, onOpenChange, onSaveExpense, expenseToEdit }: AddExpenseSheetProps) {
  const { categories } = useContext(AppContext);
  const { toast } = useToast();
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      nome: "",
      valor: 0,
      descricao: "",
      status: "A Pagar",
      data: new Date(),
      isFixed: false,
    },
  });
  
  useEffect(() => {
    if (expenseToEdit && isOpen) {
        form.reset({
            nome: expenseToEdit.nome,
            valor: expenseToEdit.valor,
            descricao: expenseToEdit.descricao,
            data: new Date(expenseToEdit.data),
            status: expenseToEdit.status,
            category: expenseToEdit.category?.nome,
            isFixed: expenseToEdit.isFixed
        });
    } else if (!isOpen) {
        form.reset({
            nome: "",
            valor: 0,
            descricao: "",
            status: "A Pagar",
            data: new Date(),
            isFixed: false,
            category: undefined
        });
        setSuggestedCategories([]);
    }
  }, [expenseToEdit, isOpen, form]);


  const description = form.watch("descricao");

  const handleSuggestCategories = async () => {
    if (!description) return;
    setIsSuggesting(true);
    setSuggestedCategories([]);
    try {
      const result = await suggestExpenseCategory({ description });
      if (result && result.categories) {
        setSuggestedCategories(result.categories);
        if(result.categories.length > 0) {
            form.setValue('category', result.categories[0]);
             toast({
                title: "Sugestões prontas!",
                description: "Encontramos algumas categorias para você.",
                variant: 'success'
            })
        } else {
            toast({
                title: "Nenhuma sugestão encontrada",
                description: "Não encontramos nenhuma categoria para essa descrição.",
            })
        }
      }
    } catch (error) {
      console.error("Error suggesting categories:", error);
      toast({
        variant: "destructive",
        title: "Erro ao sugerir",
        description: "Não foi possível sugerir categorias. Tente novamente.",
      })
    } finally {
      setIsSuggesting(false);
    }
  };

  const onSubmit = (data: ExpenseFormValues) => {
    onSaveExpense(data as any, expenseToEdit?.id);
    onOpenChange(false);
  };

  const dialogTitle = expenseToEdit ? "Editar Despesa" : "Adicionar Nova Despesa";
  const dialogDescription = expenseToEdit ? "Atualize os detalhes da sua despesa." : "Preencha os detalhes da sua despesa. Use a IA para sugerir categorias!";

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>{dialogTitle}</SheetTitle>
          <SheetDescription>
            {dialogDescription}
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 overflow-y-auto h-[calc(100vh-120px)] pr-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Almoço no shopping" {...field} />
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
                    <Textarea placeholder="Descreva sua despesa para receber sugestões de categoria." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <Button type="button" size="sm" variant="ghost" onClick={handleSuggestCategories} disabled={isSuggesting || !description}>
                {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-yellow-400" />}
                Sugerir Categoria com IA
            </Button>

             <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                   <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {suggestedCategories.length > 0 && (
                          <SelectGroup>
                           <SelectLabel className="text-primary">Sugeridas</SelectLabel>
                            {suggestedCategories.map((cat, i) => (
                                <SelectItem key={`sug-${cat}-${i}`} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectGroup>
                      )}
                      <SelectGroup>
                        <SelectLabel>Todas</SelectLabel>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.nome}>{cat.nome}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Valor (R$)</FormLabel>
                    <FormControl>
                        <Input type="number" step="0.01" placeholder="100,00" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                    control={form.control}
                    name="data"
                    render={({ field }) => (
                        <FormItem className="flex flex-col pt-2">
                        <FormLabel className="mb-2">Data da Despesa</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn( "w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground" )} >
                                {field.value ? ( format(field.value, "PPP", { locale: ptBR }) ) : ( <span>Escolha uma data</span> )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus locale={ptBR}/>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4" >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="Paga" /></FormControl>
                        <FormLabel className="font-normal">Paga</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="A Pagar" /></FormControl>
                        <FormLabel className="font-normal">A Pagar</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <SheetFooter className="pt-4">
                <SheetClose asChild>
                    <Button type="button" variant="outline">Cancelar</Button>
                </SheetClose>
                <Button type="submit" variant="success">Salvar</Button>
            </SheetFooter>
          </form>
        </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
