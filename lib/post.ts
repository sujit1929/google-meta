import { post } from "@/app/api";
import { BASE_URL } from "@/constant/app.constant";
export const likePost = async (postId: string, token: string) => {
 

  return post(`${BASE_URL}/posts/${postId}/like`, {}, token);
};

export const savePost = async (postId: string, token: string) => {
  if (!token) throw new Error("User not authenticated");

  return post(`${BASE_URL}/posts/${postId}/save`, {}, token);
};

export const commentOnPost = async (postId: string, text: string, token: string) => {
  if (!token) throw new Error("User not authenticated");

  return post(`${BASE_URL}/posts/${postId}/comment`, { text }, token);
};
