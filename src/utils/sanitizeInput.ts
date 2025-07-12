export function sanitizeInput(input: string): string {
  if (typeof input !== "string") {
    throw new Error("Input must be a string.");
  }

  return input.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
