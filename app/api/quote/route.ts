import { handleQuoteRequest } from "@/lib/forms/submission-handlers";

export async function POST(request: Request) {
  return handleQuoteRequest(request);
}
