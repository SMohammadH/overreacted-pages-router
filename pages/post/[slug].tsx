import { useQuery } from "@tanstack/react-query";
import styles from "/styles/post/Post.module.css";
import { useRouter } from "next/router";
import { montserrat } from "../fonts";

async function getPost(id: string) {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  ).then((res) => res.json());

  const postWithDate = { ...post, date: new Date(2023, 7, post.id) };
  return postWithDate;
}

export default function PostPage() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["post", router.query.slug],
    queryFn: () => getPost(router.query.slug.toString()),
  });

  if (data) {
    return (
      <div>
        <h1 className={`${styles.title} ${montserrat.className}`}>
          {data.title}
        </h1>
        <p className={styles.date}>
          {data.date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className={`${styles.body}`}>{data.body}</p>
      </div>
    );
  }

  return <></>;
}
