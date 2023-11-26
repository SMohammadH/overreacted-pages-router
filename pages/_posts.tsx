import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import styles from "@/styles/post_card.module.css";
import { montserrat } from "./fonts";

export type Post = {
  id: number;
  title: string;
  body: string;
  date: Date;
};

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  const postsWithDate = posts.map((post: Post) => ({
    ...post,
    date: new Date(2023, 7, post.id),
    body: post.body.split(" ").slice(0, 7).join(" "),
  }));

  const sortedPosts = postsWithDate.sort(
    (objA: { date: number }, objB: { date: number }) => objB.date - objA.date
  );
  return sortedPosts;
}

export async function getStaticProps() {
  const posts = await getPosts();
  return { props: { posts } };
}

export function Posts(props: any) {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialData: props.posts,
  });
  return (
    <>
      {data?.map(({ id, title, body, date }: Post) => (
        <Link key={id} href={`/post/${id.toString()}`}>
          <div className={styles.post}>
            <h2 className={`${styles.post_title} ${montserrat.className}`}>
              {title}
            </h2>
            <p className={styles.post_date}>
              {date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className={styles.post_body}>{body}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
