'use client';

import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import * as React from 'react';

import { ObjectId } from 'mongodb';
import { Button } from '../../(client)/components/ui/Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../(client)/components/ui/Commmand';
import { Popover, PopoverContent, PopoverTrigger } from '../../(client)/components/ui/Popover';
import { cn } from '../../lib/util';

interface ComboboxDemoProps {
  data: { label: string; value: ObjectId }[];
  change: (value: ObjectId) => void;
  addNew?: (value: string) => void | undefined;
}

export function ComboboxDemo({ data, change, addNew }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [search, setSearch] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? value : 'Сонгоно уу.'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Search framework..." onValueChange={(e) => setSearch(e)} />
          <CommandList>
            <CommandEmpty>
              {(addNew && (
                <button onClick={() => addNew(search)} className=" w-full py-2 px-2  flex items-center gap-3">
                  <Plus size={15} />
                  <span>Шинээр нэмэх</span>
                </button>
              )) || <span>Хайсан зүйл тань олдсонгүй</span>}
            </CommandEmpty>
            <CommandGroup>
              {data.map((framework) => (
                <CommandItem
                  key={framework.label}
                  value={framework.label}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    change(framework.value);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === framework.label ? 'opacity-100' : 'opacity-0')} />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
