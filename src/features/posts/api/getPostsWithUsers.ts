import { fetchPosts } from "../../../entities/posts/api/fetchPosts.ts"
import { fetchUsers } from "../../../entities/posts/api/fetchUsers.ts"

export const getPostsWithUsers = async ({ limit, skip }: any) => {
  const [postsData, usersData] = await Promise.all([
    fetchPosts({ limit, skip }),
    fetchUsers()
  ]);
  return {
    posts: postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    })),
    total: postsData.total
  };
};