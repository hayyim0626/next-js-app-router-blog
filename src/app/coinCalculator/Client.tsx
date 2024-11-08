'use client';

import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import { CoinList } from '@/apis/types';
import { withCommas, removeCommas } from '@/utils/functions';
import Button from '@/components/Button';
import Dropdown, { DropDownDefault } from '@/components/Dropdown';
import CoinInfo from '@/components/CoinInfo';
interface PropType {
  coinList: CoinList[];
}

interface EnterValue {
  id: number;
  amount: string;
  price: string;
}

export default function CoinCalculatorClient(props: PropType) {
  const { coinList } = props;
  const dropdownList = coinList.map((el) => ({
    label: el.symbol.toUpperCase(),
    value: el.symbol.toUpperCase(),
    img: el.image,
  }));
  const [selectedCoin, setSelectedCoinList] = useState<DropDownDefault>(
    dropdownList[0]
  );
  const [enterValue, setEnterValue] = useState<EnterValue[]>([
    { amount: '', price: '', id: 1 },
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

  const handleClickAddBtn = () => {
    setEnterValue([
      ...enterValue,
      { amount: '', price: '', id: enterValue[enterValue.length - 1].id + 1 },
    ]);
  };

  const handleChangeInput = ({
    event,
    id,
    target,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    id: number;
    target: 'amount' | 'price';
  }) => {
    setEnterValue(
      enterValue.map((item) =>
        item.id === id
          ? { ...item, [target]: withCommas(removeCommas(event.target.value)) }
          : item
      )
    );
  };

  const deleteEnterInputs = (id: number) => {
    setEnterValue(enterValue.filter((el) => el.id !== id));
  };

  const handleCalcuate = () => {
    const totalCost = enterValue.reduce(
      (acc, val) =>
        acc +
        Number(removeCommas(val.amount)) * Number(removeCommas(val.price)),
      0
    );
    const totalAmount = enterValue.reduce(
      (acc, val) => acc + Number(removeCommas(val.amount)),
      0
    );
    setCalculatedPrice(totalCost / totalAmount);
  };

  return (
    <section className="max-w-[50%] mx-auto pt-32">
      <div>
        <Dropdown
          width="w-full"
          selected={selectedCoin}
          data={dropdownList}
          handleSelect={handleSelectCoin}
          labelText="계산할 코인을 선택하세요"
        />
        <CoinInfo coinInfo={selectedCoinInfo} />
      </div>
      <article className="mt-6">
        <p>체결 가격과 수량을 입력하세요</p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            {enterValue.map((el, idx) => (
              <div
                key={el.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="w-full flex">
                  <input
                    placeholder="ex) 50,000"
                    className="p-2 border border-sky-600 w-1/2 rounded-xl mr-6"
                    value={enterValue[idx].price}
                    onChange={(e) =>
                      handleChangeInput({
                        event: e,
                        id: el.id,
                        target: 'price',
                      })
                    }
                  />
                  <input
                    placeholder="0.123"
                    className="p-2 border border-sky-600 w-1/2 rounded-xl"
                    value={enterValue[idx].amount}
                    onChange={(e) =>
                      handleChangeInput({
                        event: e,
                        id: el.id,
                        target: 'amount',
                      })
                    }
                  />
                </div>
                {idx === 0 ? (
                  <button
                    type="button"
                    className="w-5 h-5 text-3xl flex items-center justify-center"
                    onClick={handleClickAddBtn}
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
          <Button
            text="계산하기"
            className="w-full mt-3"
            onClick={handleCalcuate}
          />
        </div>
      </article>
      <article className="mt-6 pb-20">
        <p>나의 {selectedCoin?.value} 평단가는!</p>
        <div className="py-4 flex flex-col items-start gap-2 dark:bg-slate-800 bg-sky-100 rounded-xl px-3 mt-3">
          <h3 className="h3">
            ${' '}
            {calculatedPrice
              ? withCommas(calculatedPrice.toFixed(2))
              : '두구두구'}
          </h3>
        </div>
      </article>
    </section>
  );
}
