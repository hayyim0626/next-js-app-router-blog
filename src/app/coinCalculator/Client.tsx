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

  console.log(dropdownList);

  const handleSelectCoin = (value: string) => {
    setSelectedCoinList(dropdownList.find((el) => el.value === value) || null);
  };

  return (
    <article className="max-w-[50%] mx-auto py-12">
      <Dropdown
        selected={selectedCoin}
        data={dropdownList}
        handleSelect={handleSelectCoin}
        labelText="계산할 코인을 선택하세요"
      />
      {selectedCoinInfo && (
        <div className="py-4 flex flex-col items-start gap-2">
          <h5 className="h5 text-center text-blue-500">Coin Info</h5>
          <p>
            Name: <span className="text-blue-400">{selectedCoinInfo.name}</span>
          </p>
          <p>
            Current Price:{' '}
            <span className="text-blue-400">
              ${withCommas(selectedCoinInfo.current_price)}
            </span>
          </p>
          <p>
            Market cap:{' '}
            <span className="text-blue-400">
              ${withCommas(selectedCoinInfo.market_cap)}
            </span>
          </p>
          <p>
            High 24h:{' '}
            <span className="text-blue-400">
              ${withCommas(selectedCoinInfo.high_24h)}
            </span>
          </p>
          <p>
            Low 24h:{' '}
            <span className="text-blue-400">
              ${withCommas(selectedCoinInfo.low_24h)}
            </span>
          </p>
        </div>
      )}
    </article>
  );
}
