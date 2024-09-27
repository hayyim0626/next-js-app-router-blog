'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PropType {
  selected: DropDownDefault | null;
  data: DropDownDefault[];
  handleSelect: (data: string) => void;
  labelText?: string;
}

export interface DropDownDefault {
  label: string;
  value: string;
  img?: string;
}

const Dropdown: React.FC<PropType> = (props) => {
  const { selected, data, handleSelect, labelText = '' } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOption = (value: string) => {
    handleSelect(value);
    setIsOpen(false);
  };

  return (
    <>
      {labelText && <p className="text-sm mb-0.5">{labelText}</p>}
      <div className="relative w-64">
        <div
          className="flex items-center justify-between p-2 border rounded-lg cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected && (
            <>
              {selected.img && (
                <Image
                  width={24}
                  height={24}
                  src={selected.img}
                  alt={selected.label}
                />
              )}
              <span className="ml-2">{selected.label}</span>
            </>
          )}
          <span className="ml-2">▼</span>
        </div>
        {isOpen && selected && (
          <ul className="absolute bg-page-dark z-10 w-full mt-1 border rounded-lg shadow-lg max-h-60 overflow-auto flex flex-col gap-2 p-2">
            {data.map((el, idx) => (
              <li
                key={`${el.label}-${idx}`}
                className="flex items-center p-2 hover:bg-slate-500 cursor-pointer rounded-2xl"
                onClick={() => handleClickOption(el.value)}
              >
                {el.img && (
                  <Image width={24} height={24} src={el.img} alt={el.label} />
                )}
                <span className="ml-2">{el.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
