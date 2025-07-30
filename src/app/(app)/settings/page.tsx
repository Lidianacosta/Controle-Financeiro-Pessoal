
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/app-context";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const profileSchema = z.object({
    nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    cpf: z.string().min(11, "CPF deve ter pelo menos 11 caracteres.").max(14, "CPF inválido."),
    email: z.string().email("Email inválido."),
    numero_de_telefone: z.string().optional(),
    data_de_aniversario: z.date().optional(),
    renda_mensal: z.coerce.number().min(0, "Renda deve ser um valor positivo."),
    meta_de_economia: z.coerce.number().min(0, "A meta deve ser um valor positivo.").optional(),
});

export default function SettingsPage() {
    const { user, setUser } = useContext(AppContext);
    const { toast } = useToast();
    
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            nome: "",
            cpf: "",
            email: "",
            numero_de_telefone: "",
            data_de_aniversario: undefined,
            renda_mensal: 0,
            meta_de_economia: 0,
        },
    });

    useEffect(() => {
        if(user) {
            form.reset({
                ...user,
                data_de_aniversario: user.data_de_aniversario ? new Date(user.data_de_aniversario) : undefined
            })
        }
    }, [user, form]);

    function onSubmit(values: z.infer<typeof profileSchema>) {
        setUser(prev => prev ? { ...prev, ...values } : null);
        toast({
            title: "Perfil Atualizado!",
            description: "Suas informações foram salvas com sucesso.",
            variant: "success"
        })
    }

    const getInitials = (name: string) => {
        if (!name) return "";
        const names = name.split(' ');
        const initials = names.map(n => n[0]).join('');
        return initials.toUpperCase().slice(0, 2);
    }

    if(!user) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Carregando perfil...</p>
                </CardContent>
            </Card>
        )
    }

  return (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                 <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${user.nome}&background=random`} />
                    <AvatarFallback>{getInitials(user.nome)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{user.nome}</CardTitle>
                    <CardDescription>
                        Atualize as informações da sua conta e preferências.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numero_de_telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="(99) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="data_de_aniversario"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Nascimento (Opcional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown-buttons"
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="renda_mensal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Renda Mensal</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="R$" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
                control={form.control}
                name="meta_de_economia"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Meta de Economia Mensal</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="R$" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            
            <div className="flex justify-end">
                <Button type="submit" variant="success">Salvar Alterações</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
