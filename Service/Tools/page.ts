// Service/Tools/page.ts
import { BASE_URL } from "@/constant/app.constant";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchTools = async () => {
  const res = await fetch(`${BASE_URL}/get-all-tools`, {
    headers: {
      'x-api-key': API_KEY || '',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tools');
  }

  const data = await res.json();


  return data;
};