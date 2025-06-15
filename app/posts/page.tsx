"use client";


import PostsPageFunction from "@/components/posts/PostsCard";
import { usePosts } from "@/hooks/posts/usePosts";
import { Post } from "@/types/post";

export default function PostsPage() {
  const { data, isLoading, isError } = usePosts(1, 10);

  if (isLoading) return <p className="text-center p-4">Loading posts...</p>;
  if (isError) return <p className="text-center p-4 text-red-500">Failed to load posts.</p>;

  return (
    <div className="space-y-4 p-4">
      {data?.posts.map((post: Post) => (
        <PostsPageFunction key={post._id} post={post} />
      ))}
    </div>
  );
}
