"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Option = {
  label: string;
  value: string;
};

interface ComboBoxSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  contentClassName?: string;
}

export function ComboBoxSelect({
  options,
  value,
  onChange,
  placeholder = "Chọn...",
  className,
  contentClassName,
}: ComboBoxSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-[200px] flex justify-between cursor-pointer text-[#6b6b6b]",
            className
          )}
        >
          {selectedLabel || placeholder}
          <ChevronsUpDown className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[200px] p-0", contentClassName)}>
        <Command>
          <CommandInput placeholder={`Tìm ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.label}
                  onSelect={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className="flex justify-between cursor-pointer"
                >
                  {opt.label}
                  <Check
                    className={cn(
                      "size-4 opacity-0 text-orange-500",
                      opt.value === value && "opacity-100"
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
}
