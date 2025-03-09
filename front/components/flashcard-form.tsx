"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Download, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Flashcard } from "@/components/flashcard";
import { generateFlashcards } from "@/actions/flashcard-actions";

export function FlashcardForm() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Array<{ front: string; back: string }>>([]);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const isValid = text.length >= 70;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValid) {
      setError("Please enter at least 70 characters");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { csvContent } = await generateFlashcards(text);

      const cards = csvContent
        .split("\n")
        .filter((row) => row.trim())
        .map((row) => {
          const match = row.match(/^"(.*?)","(.*?)"$/);
          if (!match) {
            console.warn("Skipping invalid CSV row:", row);
            return null;
          }
          return { front: match[1], back: match[2] };
        })
        .filter((card) => card !== null) as Array<{ front: string; back: string }>;

      if (cards.length === 0) {
        throw new Error("No valid flashcards could be generated");
      }

      setFlashcards(cards);

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate flashcards");
    } finally {
      setIsLoading(false);
    }
  }

  function handleDownload() {
    if (downloadLink) {
      const a = document.createElement("a");
      a.href = downloadLink;
      a.download = "flashcards.csv";
      a.click();
      window.URL.revokeObjectURL(downloadLink);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Enter your text here (minimum 70 characters)..."
            className="min-h-[200px] resize-y"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Min: 70 characters</span>
            <span className={text.length < 70 ? "text-destructive" : "text-muted-foreground"}>
              {text.length} characters
            </span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="animate-in fade-in-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full sm:w-auto transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Flashcards...
            </>
          ) : (
            "Generate Flashcards"
          )}
        </Button>
      </form>

      {flashcards.length > 0 && (
        <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Generated Flashcards</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!downloadLink}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {flashcards.map((card, index) => (
              <Flashcard key={index} front={card.front} back={card.back} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}