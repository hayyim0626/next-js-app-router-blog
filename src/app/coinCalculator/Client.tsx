'use client';

import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import { CoinList } from '@/apis/types';
import Button from '@/components/Button';
import Dropdown, { DropDownDefault } from '@/components/Dropdown';
import CoinInfo from '@/components/CoinInfo';
interface PropType {
  coinList: CoinList[];
}

interface EnterValue {
  id: number;
  amount: number;
  price: number;
}

export default function CoinCalculatorClient(props: PropType) {
  const { coinList } = props;
  const dropdownList = coinList.map((el) => ({
    label: el.symbol.toUpperCase(),
    value: el.symbol.toUpperCase(),
    img: el.image,
  }));
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCoin, setSelectedCoinList] = useState<DropDownDefault>(
    dropdownList[0]
  );
  const [enterValue, setEnterValue] = useState<EnterValue[]>([
    { amount: 0, price: 0, id: 1 },
  ]);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const selectedCoinInfo = useMemo(() => {
    return coinList.find(
      (el) => el.symbol.toUpperCase() === selectedCoin.value
    );
  }, [selectedCoin.value, coinList]);

  const handleSelectCoin = (value: string) => {
    const selected = dropdownList.find((el) => el.value === value);
    selected && setSelectedCoinList(selected);
  };

  const addEnterInputs = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const updatedValues = enterValue.map((el) => ({
        id: el.id,
        price: Number(formData.get(`price-${el.id}`) || el.price),
        amount: Number(formData.get(`amount-${el.id}`) || el.amount),
      }));
      setEnterValue([
        ...updatedValues,
        { id: enterValue[enterValue.length - 1].id + 1, amount: 0, price: 0 },
      ]);
    }
  };

  const deleteEnterInputs = (id: number) => {
    setEnterValue(enterValue.filter((el) => el.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(enterValue);
    const totalCost = enterValue.reduce(
      (acc, val) => acc + val.amount * val.price,
      0
    );
    const totalAmount = enterValue.reduce((acc, val) => acc + val.amount, 0);
    console.log(totalCost / totalAmount);
    setCalculatedPrice(totalCost / totalAmount);
  };

  const Article = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return <article className={`${className} mt-6`}>{children}</article>;
  };

  return (
    <section className="max-w-[50%] mx-auto pt-32">
      <Article>
        <Dropdown
          width="w-full"
          selected={selectedCoin}
          data={dropdownList}
          handleSelect={handleSelectCoin}
          labelText="계산할 코인을 선택하세요"
        />
        <CoinInfo coinInfo={selectedCoinInfo} />
      </Article>
      <Article>
        <p className="">체결 가격과 수량을 입력하세요</p>
        <div className="flex flex-col gap-3">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              {enterValue.map((el, idx) => (
                <div
                  key={el.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="w-full flex">
                    <input
                      name={`price-${el.id}`}
                      defaultValue={enterValue[idx].price || ''}
                      placeholder="체결가를 입력하세요"
                      className="p-2 border border-sky-600 w-1/2 rounded-xl mr-6"
                      // value={enterValue[idx].price}
                    />
                    <input
                      name={`amount-${el.id}`}
                      defaultValue={enterValue[idx].amount || ''}
                      placeholder="수량을 입력하세요"
                      className="p-2 border border-sky-600 w-1/2 rounded-xl"
                      // value={enterValue[idx].amount}
                    />
                  </div>
                  {idx === 0 ? (
                    <button
                      type="button"
                      className="w-5 h-5 text-3xl flex items-center justify-center"
                      onClick={addEnterInputs}
                    >
                      ＋
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => deleteEnterInputs(el.id)}
                    >
                      <Image
                        width={22}
                        height={22}
                        alt="img"
                        src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}/trash_icon.png`}
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <Button text="계산하기" className="w-full mt-3" />
          </form>
        </div>
      </Article>
      <Article className="pb-20">
        <p>당신의 {selectedCoin?.value} 평단가는!</p>
        <div className="py-4 flex flex-col items-start gap-2 dark:bg-slate-800 bg-sky-100 rounded-xl px-3 mt-3">
          <h3 className="h3">
            {calculatedPrice ? calculatedPrice : '두구두구'}
          </h3>
        </div>
      </Article>
    </section>
  );
}
