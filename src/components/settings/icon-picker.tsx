
"use client";

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Check } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import * as Lucide from 'lucide-react';
import { cn } from '@/lib/utils';

const iconList = Object.keys(Lucide).filter(key => typeof Lucide[key as keyof typeof Lucide] === 'object');

// A more robust Icon component that handles potential missing icons gracefully.
const Icon = ({ name, ...props }: { name?: string; [key: string]: any }) => {
    // Check if the name is a valid key in the Lucide object and it's a component
    const isValidIcon = name && Object.prototype.hasOwnProperty.call(Lucide, name) && typeof Lucide[name as keyof typeof Lucide] === 'object';
    // @ts-ignore - We are checking for the key's existence and type before using it.
    const LucideIcon = isValidIcon ? Lucide[name as keyof typeof Lucide] : Lucide.MoreHorizontal;
    return <LucideIcon {...props} />;
};


export const IconPicker = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <Icon name={value} className="h-4 w-4" />
            {value}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search icon..." />
          <CommandList>
            <CommandEmpty>No icon found.</CommandEmpty>
            <CommandGroup className="h-64 overflow-y-auto">
              {iconList.map((iconName) => (
                <CommandItem
                  key={iconName}
                  value={iconName}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icon name={iconName} className="h-4 w-4" />
                    <span className="text-sm">{iconName}</span>
                  </div>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === iconName ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
