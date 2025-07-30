
"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wallet, Calendar as CalendarIcon } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


const signupSchema = z.object({
    nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    cpf: z.string().min(11, "CPF deve ter pelo menos 11 caracteres.").max(14, "CPF inválido."),
    email: z.string().email("Email inválido."),
    numero_de_telefone: z.string().optional(),
    data_de_aniversario: z.date().optional(),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
    renda_mensal: z.coerce.number().min(0, "Renda deve ser um valor positivo."),
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      senha: "",
      renda_mensal: 0,
      numero_de_telefone: "",
      data_de_aniversario: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    const newUser = {
      id: `user-${Date.now()}`,
      ...values,
    }
    localStorage.setItem('user', JSON.stringify(newUser));
    toast({
      title: "Conta criada com sucesso!",
      description: "Você já pode fazer o login.",
      variant: "success",
    })
    router.push('/login');
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-center mb-6">
        <Wallet className="h-10 w-10 text-primary" />
      </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Crie sua Conta</CardTitle>
          <CardDescription>
            Comece a organizar suas finanças hoje mesmo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Mínimo 8 caracteres" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
              
              <Button type="submit" className="w-full">
                Criar Conta
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/login" className="underline">
              Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
