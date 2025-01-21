import { useQuery } from "@tanstack/react-query"
import { getPostsWithUsers } from "../api/getPostsWithUsers.ts"
import { fetchPosts } from "../../../entities/posts/api/fetchPosts.ts"
import { fetchUsers } from "../../../entities/posts/api/fetchUsers.ts"

export const usePostsWithUsers = async (limit: number, skip: number) => {
  // return useQuery({
  //   queryKey: ['posts', { limit, skip }],
  //   queryFn: () => getPostsWithUsers({ limit, skip }),
  // });
  const [postsResponse, usersResponse] = await Promise.all([
    fetchPosts({limit, skip}),
    fetchUsers()
  ]);
  
  const postsData = await postsResponse;
  const { users: usersData } = await usersResponse;
  
  const posts = postsData.posts.map((post) => ({
    ...post,
    author: usersData.find((user) => user.id === post.userId),
  }));
  
  return {
    posts,
    total: postsData.total
  };
};