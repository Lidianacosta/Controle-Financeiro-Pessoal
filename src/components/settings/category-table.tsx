
"use client";

import type { Categoria } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Utensils, Bus, Home, Film, HeartPulse, BookOpen, MoreHorizontal as MoreHorizontalIcon } from "lucide-react";
import * as Lucide from "lucide-react";

type IconName = keyof typeof Lucide;

const Icon = ({ name, ...props }: { name?: string, [key: string]: any }) => {
    // @ts-ignore
    const LucideIcon = Lucide[name as IconName] || MoreHorizontalIcon;
    return <LucideIcon {...props} />;
};


export function CategoryTable({ categories }: { categories: Categoria[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16 hidden sm:table-cell">Ícone</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="hidden sm:table-cell">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                <Icon name={category.icon} className="h-4 w-4 text-muted-foreground" />
              </div>
            </TableCell>
            <TableCell className="font-medium">{category.nome}</TableCell>
            <TableCell>{category.descricao}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Menu de ações</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
