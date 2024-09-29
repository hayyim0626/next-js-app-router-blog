import Client from './Client';
import getCoins from '@/apis/getCoins';

export default async function CoinCalculator() {
  const coinList = await getCoins();

  console.log(coinList.length);
  return (
    <section className="border border-red-500">
      <h3 className="h3 text-center">평단가 계산기</h3>
      <Client coinList={coinList} />
    </section>
  );
}
