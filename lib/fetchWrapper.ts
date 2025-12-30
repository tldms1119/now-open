import { getSession } from "./session";
import {
  mockAuthGet,
  mockAuthPost,
  mockPublicGet,
  mockPublicPost,
} from "./mockApi";

interface ApiResponse<T> {
  result: boolean;
  payload?: T;
  message?: string;
  details?: string;
  status?: number;
}

const USE_MOCK_API = process.env.USE_MOCK_API === "true";

async function authFetch<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  // Use mock API if enabled
  if (USE_MOCK_API) {
    console.log("[Mock API] Auth:", options?.method || "GET", url);
    if (options?.method === "POST") {
      const body = options.body
        ? JSON.parse(options.body as string)
        : undefined;
      return mockAuthPost<T>(url, body);
    }
    return mockAuthGet<T>(url);
  }

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
  } catch (error: unknown) {
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
  // Use mock API if enabled
  if (USE_MOCK_API) {
    console.log("[Mock API] Public:", options?.method || "GET", url);
    if (options?.method === "POST") {
      const body = options.body
        ? JSON.parse(options.body as string)
        : undefined;
      return mockPublicPost<T>(url, body);
    }
    return mockPublicGet<T>(url);
  }

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
  } catch (error: unknown) {
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
    post: <T>(url: string, body: unknown, options?: RequestInit) =>
      authFetch<T>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...options?.headers },
        body: JSON.stringify(body),
        ...options,
      }),
    put: <T>(url: string, body: unknown, options?: RequestInit) =>
      authFetch<T>(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...options?.headers },
        body: JSON.stringify(body),
        ...options,
      }),
    // delete methods can be added similarly
  },
  public: {
    get: <T>(url: string, options?: RequestInit) =>
      publicFetch<T>(url, { method: "GET", ...options }),
    post: <T>(url: string, body: unknown, options?: RequestInit) =>
      publicFetch<T>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...options?.headers },
        body: JSON.stringify(body),
        ...options,
      }),
  },
};
