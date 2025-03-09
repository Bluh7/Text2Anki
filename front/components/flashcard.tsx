"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  front: string;
  back: string;
}

export function Flashcard({ front, back }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!front?.trim() || !back?.trim()) {
    return (
      <div className="h-[200px] w-full border-2 border-destructive/20 bg-destructive/5 flex items-center justify-center">
        <span className="text-destructive text-sm">
          Invalid flashcard content
        </span>
      </div>
    );
  }

  return (
    <div className="h-[200px] w-full relative [perspective:1000px]">
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-all duration-500 [transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        )}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front side */}
        <Card className="absolute inset-0 w-full h-full [backface-visibility:hidden] border-2 border-blue-600/20 hover:border-blue-600/40 transition-colors cursor-pointer">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex-1 flex items-center">
              <p className="font-medium text-center w-full">{front}</p>
            </div>
            <div className="mt-4 text-xs text-muted-foreground flex justify-between items-center">
              <span>Front</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={e => {
                  e.stopPropagation();
                  setIsFlipped(!isFlipped);
                }}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Flip card</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back side */}
        <Card className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] border-2 border-blue-600/20 hover:border-blue-600/40 transition-colors cursor-pointer">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex-1 flex items-center">
              <p className="font-medium text-center w-full">{back}</p>
            </div>
            <div className="mt-4 text-xs text-muted-foreground flex justify-between items-center">
              <span>Back</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={e => {
                  e.stopPropagation();
                  setIsFlipped(!isFlipped);
                }}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Flip card</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
