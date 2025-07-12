export function validateRequestBody(body: string) {
  if (typeof body !== "string") {
    throw new Error("Invalid request body: 'data' must be a string.");
  }

  if (body.length > 500) {
    throw new Error(
      "Invalid request body: 'data' exceeds maximum length of 500 characters.",
    );
  }
}
