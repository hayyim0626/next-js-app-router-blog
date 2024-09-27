import Client from './Client';
import getCoins from '@/apis/getCoins';
import { CoinList } from '@/apis/types';

export default async function CoinCalculator() {
  const coinList = await getCoins();

  console.log(coinList.length);
  return (
    <section className="border border-red-500">
      <h3 className="h3 text-center">평단가 계산기</h3>
      {/* {coinList.map((el: CoinList) => (
        <div key={el.id}>{el.id}</div>
      ))} */}
      <Client coinList={coinList} />
    </section>
  );
}
