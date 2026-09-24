import { handleServiceRequest } from "@/lib/forms/submission-handlers";

export async function POST(request: Request) {
  return handleServiceRequest(request);
}
