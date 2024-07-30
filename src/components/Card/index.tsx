import { BlogPost } from '@/service/blog';
import Image from 'next/image';

type Props = {
  data: BlogPost;
};

export default function Card({ data }: Props) {
  return (
    <div className='border w-96'>
      {/* <Image /> */}
      <p className='p-3 text-lg border rounded-xl border-red-500 text-center'>
        {data.title}
      </p>
    </div>
  );
}
