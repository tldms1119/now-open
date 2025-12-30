/**
 * Mock API responses for development without backend server
 * Enable by setting USE_MOCK_API=true in environment variables
 */

interface ApiResponse<T> {
  result: boolean;
  payload?: T;
  message?: string;
  details?: string;
  status?: number;
}

// Helper to parse request body
function parseBody(body: unknown): unknown {
  if (typeof body === "string") {
    return JSON.parse(body) as unknown;
  }
  return body;
}

// Helper to extract pathname from URL, handling cases where API_URL might be undefined
function extractPathname(url: string): string {
  let pathname: string;

  try {
    // If URL starts with "undefined", extract the path after it
    // e.g., "undefined/api/v1/auth/sign-in" -> "/api/v1/auth/sign-in"
    if (url.startsWith("undefined")) {
      const pathPart = url.replace(/^undefined/, "");
      pathname = pathPart.startsWith("/") ? pathPart : "/" + pathPart;
    } else {
      // Try to parse as URL
      const urlObj = new URL(url, "http://localhost");
      pathname = urlObj.pathname;
    }
  } catch {
    // If URL parsing fails, assume it's already a path
    pathname = url.startsWith("/") ? url : "/" + url;
  }

  // Normalize pathname by removing /api/v1 prefix if present
  // This allows endpoint checks to work with or without the prefix
  if (pathname.startsWith("/api/v1/")) {
    pathname = pathname.replace(/^\/api\/v1/, "");
  } else if (pathname === "/api/v1") {
    pathname = "/";
  }

  return pathname;
}

export async function mockPublicPost<T>(
  url: string,
  body: unknown
): Promise<ApiResponse<T>> {
  const parsedBody = parseBody(body) as Record<string, unknown>;
  const pathname = extractPathname(url);
  console.log(pathname);

  // Mock sign-in endpoint
  if (pathname === "/auth/sign-in") {
    if (!parsedBody || typeof parsedBody.email !== "string") {
      return {
        result: false,
        message: "Email is required",
      };
    }
    return {
      result: true,
      payload: {
        email: parsedBody.email as string,
        username: (parsedBody.email as string).split("@")[0],
        token: `mock-token-${Date.now()}`,
        expireIn: 3600, // 1 hour
      } as T,
    };
  }

  // Mock sign-up endpoint
  if (pathname === "/auth/sign-up") {
    return {
      result: true,
      payload: undefined as T,
    };
  }

  // Mock check-email endpoint
  if (pathname === "/auth/check-email") {
    // Always return available (email not taken)
    return {
      result: true,
      payload: { available: true } as T,
    };
  }

  // Default: return success with empty payload
  return {
    result: true,
    payload: undefined as T,
  };
}

export async function mockPublicGet<T>(url: string): Promise<ApiResponse<T>> {
  const pathname = extractPathname(url);

  // Mock check-email endpoint
  if (pathname === "/auth/check-email") {
    return {
      result: true,
      payload: { available: true } as T,
    };
  }

  // Default: return success with empty payload
  return {
    result: true,
    payload: undefined as T,
  };
}

export async function mockAuthGet<T>(url: string): Promise<ApiResponse<T>> {
  const pathname = extractPathname(url);

  // Mock test endpoint
  if (pathname === "/test") {
    return {
      result: true,
      payload: { message: "Mock API response" } as T,
    };
  }

  // Mock spots GET endpoint
  if (pathname === "/spots") {
    return {
      result: true,
      payload: [
        {
          id: "spot-1",
          name: "Coffee Shop Downtown",
          desc: "A cozy coffee shop in the heart of downtown",
          longitude: 127.123456,
          latitude: 37.123456,
          businessHours: [
            { dayOfWeek: "1", openTime: "09:00", closeTime: "18:00" },
            { dayOfWeek: "2", openTime: "09:00", closeTime: "18:00" },
          ],
          photos: [],
        },
        {
          id: "spot-2",
          name: "Food Truck Park",
          desc: "Various food trucks serving delicious meals",
          longitude: 127.234567,
          latitude: 37.234567,
          businessHours: [
            { dayOfWeek: "0", openTime: "11:00", closeTime: "20:00" },
          ],
          photos: [],
        },
      ] as T,
    };
  }

  // Default: return success
  return {
    result: true,
    payload: undefined as T,
  };
}

export async function mockAuthPost<T>(
  url: string,
  body: unknown
): Promise<ApiResponse<T>> {
  const pathname = extractPathname(url);
  const parsedBody = parseBody(body) as Record<string, unknown>;

  // Mock spots endpoint
  if (pathname === "/spots") {
    return {
      result: true,
      payload: {
        id: `mock-spot-${Date.now()}`,
        ...parsedBody,
      } as T,
    };
  }

  // Default: return success
  return {
    result: true,
    payload: undefined as T,
  };
}
