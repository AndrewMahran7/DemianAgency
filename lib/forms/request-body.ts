const maximumBodyBytes = 16_384;

export async function readSubmissionBody(request: Request) {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maximumBodyBytes) return { ok: false as const, status: 413 };
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > maximumBodyBytes) return { ok: false as const, status: 413 };
  try {
    return { ok: true as const, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false as const, status: 400 };
  }
}
