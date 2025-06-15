import { BASE_URL } from '@/constant/app.constant';
import { getToken } from '@/lib/auth';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

interface RequestOptions extends RequestInit {
  token?: string;
}

// Generic fetcher
export async function fetchApi<TResponse>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<TResponse> {
  const token = options.token || getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${BASE_URL}${endpoint}`;
  console.log('Fetching:', url);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  console.log('Response status:', response.status);

  if (!response.ok) {
    const errorData = await response.json();
    console.error('API error response:', errorData);
    throw new Error(errorData.error || `API Error: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Fetched data:', data);
  return data as TResponse;
}

// GET wrapper
export async function getApi<TResponse>(endpoint: string, options: RequestOptions = {}) {
  return fetchApi<TResponse>(endpoint, { ...options, method: 'GET' });
}

// POST wrapper
export async function postApi<TResponse, TData = unknown>(
  endpoint: string,
  data: TData,
  options: RequestOptions = {}
) {
  return fetchApi<TResponse>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Lightweight raw fetch wrapper
export const apiClient = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Network response was not ok");
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType?.includes("application/json")) {
      return response.json();
    } else {
      const errorText = await response.text();
      console.error("Expected JSON but got:", errorText);
      throw new Error("Expected JSON but got something else");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// Generic POST with type-safe data and response
export const post = <TData = unknown, TResponse = unknown>(
  url: string,
  data: TData,
  token: string
): Promise<TResponse> => {
  return apiClient(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
