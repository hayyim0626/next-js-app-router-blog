'use client';

import { useState, useMemo } from 'react';
import { CoinList } from '@/apis/types';
import Button from '@/components/Button';
import Dropdown, { DropDownDefault } from '@/components/Dropdown';
import { withCommas } from '@/utils/functions';

interface PropType {
  coinList: CoinList[];
}

export default function CoinCalculatorClient(props: PropType) {
  const { coinList } = props;
  const dropdownList = coinList.map((el) => ({
    label: el.symbol.toUpperCase(),
    value: el.symbol.toUpperCase(),
    img: el.image,
  }));
  const [selectedCoin, setSelectedCoinList] = useState<DropDownDefault | null>(
    dropdownList[0]
  );
  const selectedCoinInfo = useMemo(() => {
    if (coinList && selectedCoin?.value) {
      return coinList.find(
        (el) => el.symbol.toUpperCase() === selectedCoin.value
      );
    }
    return null;
  }, [selectedCoin?.value, coinList]);

  const handleSelectCoin = (value: string) => {
    setSelectedCoinList(dropdownList.find((el) => el.value === value) || null);
  };

  return (
    <article className="max-w-[50%] mx-auto pt-12">
      <Dropdown
        width="w-full"
        selected={selectedCoin}
        data={dropdownList}
        handleSelect={handleSelectCoin}
        labelText="계산할 코인을 선택하세요"
      />
      {selectedCoinInfo && (
        <div className="py-4 flex flex-col items-start gap-2 bg-slate-800 rounded-xl p-3 my-4">
          <h5 className="h5 text-center text-blue-500">Coin Info</h5>
          <div className="flex items-center justify-between w-full">
            Name:
            <p className="text-blue-400">{selectedCoinInfo.name}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            Current Price:
            <p className="text-blue-400">
              ${withCommas(selectedCoinInfo.current_price)}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            Rank:
            <p className="text-blue-400">{selectedCoinInfo.market_cap_rank}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            Market cap:
            <p className="text-blue-400">
              ${withCommas(selectedCoinInfo.market_cap)}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            High 24h:
            <p className="text-blue-400">
              ${withCommas(selectedCoinInfo.high_24h)}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            Low 24h:
            <p className="text-blue-400">
              ${withCommas(selectedCoinInfo.low_24h)}
            </p>
          </div>
        </div>
      )}
      <p>입력 수량</p>
    </article>
  );
}
