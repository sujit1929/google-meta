"use client";

import { useGetTools } from "@/hooks/Tools/useTools";

export default function Page() {
  const { data, isLoading, error } = useGetTools();
  console.log("fetched data for mainpage:", data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tools</p>;

  return (
    <div>
      <h1>Tools:</h1>
      <ul>
        {data?.map((tool: any) => (
          <li key={tool._id}>{tool.createdAt}</li>
        ))}
      </ul>
    </div>
  );
}
