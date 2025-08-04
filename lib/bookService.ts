// lib/bookService.ts
export const bookService = async (bookingFormData: any) => {
  const res = await fetch("/api/book-service", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingFormData),
  });

  if (!res.ok) {
    throw new Error("Failed to book service.");
  }

  return await res.json();
};
