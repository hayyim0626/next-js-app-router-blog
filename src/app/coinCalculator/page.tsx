import Client from './Client';
import getCoins from '@/apis/getCoins';

export default async function CoinCalculator() {
  const coinList = await getCoins();

  return (
    <section>
      <h3 className="h3 text-center">평단가 계산기</h3>
      <Client coinList={coinList} />
    </section>
  );
}
