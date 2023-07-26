import Card from '@/components/Card';
import { getAllBlogPosts } from '@/service/blog';
import Image from 'next/image';
import ProfileImg from '/public/Images/profile.png';

export default async function Home() {
  const blogPosts = await getAllBlogPosts();
  return (
    <main className='flex flex-col'>
      <div className='flex flex-col items-center'>
        <div className='overflow-hidden rounded-full w-52 h-52 border-gray-400 border flex flex-col justify-center'>
          <Image src={ProfileImg} alt='profile img' />
        </div>
        <div className='mt-4 w-3/5 text-center'>
          안녕하세요. 프론트엔드 개발자 홍예찬입니다.
          <br /> 대체 불가능한 개발자(Non-Fungible Developer)가 되기 위해 오늘도
          최선을 다하고 있습니다.
        </div>
      </div>
      {blogPosts.map((el) => (
        <Card key={el.title} data={el} />
      ))}
    </main>
  );
}
