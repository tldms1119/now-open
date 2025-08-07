import { getSession } from "./session";

interface ApiResponse<T> {
  result: boolean;
  payload?: T;
  message?: string;
  details?: string;
  status?: number;
}

async function authFetch<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const session = await getSession();

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.token}`,
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      return {
        result: false,
        status: response.status,
        message: `${response.statusText || "An error occurred"}`,
      };
    }

    return await response.json();
  } catch (error: any) {
    console.error("Auth fetch error:", error);
    return {
      result: false,
      message: "An error occurred",
    };
  }
}

async function publicFetch<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      return {
        result: false,
        status: response.status,
        message: `${response.statusText || "An error occurred"}`,
      };
    }
    return await response.json();
  } catch (error: any) {
    console.error("Public fetch error:", error);
    return {
      result: false,
      message: "An error occurred",
    };
  }
}

export const api = {
  auth: {
    get: <T>(url: string, options?: RequestInit) =>
      authFetch<T>(url, { method: "GET", ...options }),
    post: <T>(url: string, body: any, options?: RequestInit) =>
      authFetch<T>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...options?.headers },
        body: JSON.stringify(body),
        ...options,
      }),
    // put, delete methods can be added similarly
  },
  public: {
    get: <T>(url: string, options?: RequestInit) =>
      publicFetch<T>(url, { method: "GET", ...options }),
    post: <T>(url: string, body: any, options?: RequestInit) =>
      publicFetch<T>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...options?.headers },
        body: JSON.stringify(body),
        ...options,
      }),
  },
};
