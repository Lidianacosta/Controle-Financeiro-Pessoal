
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
import { MoreHorizontal } from "lucide-react";
import * as Lucide from "lucide-react";

type IconName = keyof typeof Lucide;

// A robust Icon component that handles potential missing icons gracefully.
const Icon = ({ name, ...props }: { name?: string; [key: string]: any }) => {
    // Check if the name is a valid key in the Lucide object
    const isValidIcon = name && Object.prototype.hasOwnProperty.call(Lucide, name);
    // @ts-ignore - We are checking for the key's existence before using it.
    const LucideIcon = isValidIcon ? Lucide[name as IconName] : Lucide.MoreHorizontal;
    return <LucideIcon {...props} />;
};


export function CategoryTable({ categories, onEdit }: { categories: Categoria[], onEdit: (category: Categoria) => void }) {
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
                  <DropdownMenuItem onClick={() => onEdit(category)}>Editar</DropdownMenuItem>
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
