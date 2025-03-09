"use server";

import { API_BASE_URL } from "@/config/config";

interface FlashcardResponse {
  csvContent: string;
}

export async function generateFlashcards(
  text: string
): Promise<{ csvContent: string }> {
  const response = await fetch(`${API_BASE_URL}/api/card`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to generate flashcards");
  }

  const data: FlashcardResponse = await response.json();
  return { csvContent: data.csvContent };
}
