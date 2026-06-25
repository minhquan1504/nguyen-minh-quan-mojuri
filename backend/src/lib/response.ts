import { NextResponse } from "next/server";

const allowedOrigin = "*";

export function jsonResponse<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      ...(init?.headers ?? {}),
    },
  });
}

export function optionsResponse() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export function notFound(message = "Resource not found") {
  return jsonResponse({ message }, { status: 404 });
}

export function badRequest(message: string, details?: unknown) {
  return jsonResponse({ message, details }, { status: 400 });
}
