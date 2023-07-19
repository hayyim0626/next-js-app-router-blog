import { BlogPost } from "@/service/blog";

type Props = {
  data: BlogPost;
};

export default function Card({ data }: Props) {
  return <div>{data.title}</div>;
}
