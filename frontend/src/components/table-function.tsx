'use client';

import perPageOptions from '@/source/perpage-option';
import useAppStore from '@/store/app-store';
import TableSearchInput from './table-input-search';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const TableFunction = ({ withSearch = true }: { withSearch?: boolean }) => {
  const { limit, setLimit } = useAppStore();

  return (
    <div className="flex flex-col xl:flex-row gap-4 justify-center xl:justify-between items-center">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span>Tampilkan</span>
        <Select value={limit || '10'} onValueChange={(value: string) => setLimit(value)}>
          <SelectTrigger className="h-9 w-20 rounded-md border-blue-300 hover:border-blue-500 focus:ring-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-blue-200 bg-white">
            <SelectGroup>
              {perPageOptions?.map((option, i) => (
                <SelectItem
                  className="hover:bg-blue-50 hover:text-blue-600 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                  value={option.value}
                  key={i}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <span>data</span>
      </div>
      {withSearch && <TableSearchInput />}
    </div>
  );
};

export default TableFunction;
