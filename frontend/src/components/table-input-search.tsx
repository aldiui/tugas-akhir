'use client';

import useAppStore from '@/store/app-store';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';

interface TableSearchInputProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

const TableSearchInput = ({
  onSearch,
  placeholder = 'Cari...',
  debounceMs = 500,
}: TableSearchInputProps) => {
  const { search, setSearch } = useAppStore();
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(inputValue);
      onSearch?.(inputValue);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearch, onSearch, debounceMs]);

  useEffect(() => {
    setInputValue('');
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          id="table-search"
          type="text"
          placeholder={placeholder}
          className="h-9 pl-9 border-blue-300 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-400"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
    </div>
  );
};

export default TableSearchInput;
