import { FlashcardForm } from "@/components/flashcard-form"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Anki Flashcard Generator
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Generate Anki Flashcards</h2>
            <p className="text-muted-foreground">
              Enter your text below (minimum 70 characters) and we'll generate flashcards for you to import into Anki.
            </p>
          </div>

          <FlashcardForm />
        </section>
      </main>

      <footer className="border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Anki Flashcard Generator
        </div>
      </footer>
    </div>
  )
}

