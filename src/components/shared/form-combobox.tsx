'use client';

import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface FormComboboxProps {
  label?: string;
  error?: string;
  options: ComboboxOption[];
  helperText?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const FormCombobox: React.FC<FormComboboxProps> = ({
  label,
  error,
  options,
  helperText,
  placeholder = 'Pilih opsi...',
  searchPlaceholder = 'Cari opsi...',
  emptyText = 'Tidak ada hasil ditemukan.',
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value || defaultValue || '');

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((opt) => opt.value === currentValue);

  const handleSelect = (val: string) => {
    setInternalValue(val);
    if (onValueChange) {
      onValueChange(val);
    }
    setOpen(false);
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <Label className="block text-xs font-semibold text-slate-300">
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'flex h-11 w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm cursor-pointer font-sans',
              error && 'border-rose-500 focus:ring-rose-500',
              className
            )}
          >
            <span className={cn('truncate', !selectedOption && 'text-slate-500')}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-cyan-400 opacity-70 ml-2" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-slate-950/95 border-slate-800 backdrop-blur-2xl shadow-2xl rounded-xl overflow-hidden"
        >
          <Command className="bg-transparent text-slate-100 w-full">
            <CommandInput
              placeholder={searchPlaceholder}
              className="w-full text-xs"
            />
            <CommandList className="max-h-60 overflow-y-auto p-1.5 custom-scrollbar w-full">
              <CommandEmpty className="py-3 px-4 text-xs font-sans text-slate-400 text-center">
                {emptyText}
              </CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = option.value === currentValue;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => handleSelect(option.value)}
                      className={cn(
                        'flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-xs font-medium outline-none transition-colors hover:bg-indigo-600/30 hover:text-cyan-300',
                        isSelected && 'bg-indigo-600/25 text-cyan-300 font-bold'
                      )}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-cyan-400 transition-opacity shrink-0',
                          isSelected ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <span className="truncate">{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error ? (
        <p className="text-[11px] text-rose-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};
