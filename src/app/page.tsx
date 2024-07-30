import Card from "@/components/Card";
import { getAllBlogPosts } from "@/service/blog";
import Image from "next/image";
import ProfileImg from "/public/Images/profile.png";

export default async function Home() {
  const blogPosts = await getAllBlogPosts();
  return (
    <main className="flex flex-col">
      <div className="flex flex-col items-center">
        <div className="overflow-hidden rounded-full w-52 h-52 border-gray-400 border flex flex-col justify-center">
          <Image src={ProfileImg} alt="profile img" />
        </div>
        <p className="mt-4 w-3/5 text-center">
          안녕하세요. 프론트엔드 개발자 홍예찬입니다.
          <br /> 대체 불가능한 개발자(Non-Fungible Developer)가 되기 위해 오늘도
          최선을 다하고 있습니다.
        </p>
      </div>
      <p className="text-2xl mt-6">New Blogs</p>
      <div className="flex border">
        {blogPosts.slice(0, 5).map((el) => (
          <Card key={el.title} data={el} />
        ))}
      </div>
      {/* <Image
        width={200}
        height={200}
        alt="img"
        src="https://chans-devlog.s3.ap-northeast-2.amazonaws.com/images/javascript.png"
      />
      <Image
        width={400}
        height={200}
        alt="img"
        src="https://chans-devlog.s3.ap-northeast-2.amazonaws.com/images/money-printing.jpeg"
      /> */}
    </main>
  );
}
