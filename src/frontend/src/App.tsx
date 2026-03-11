import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Code2, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Level } from "./data/lessons";
import HomePage from "./pages/HomePage";
import LessonPage from "./pages/LessonPage";
import LessonsPage from "./pages/LessonsPage";

const queryClient = new QueryClient();

type Route =
  | { page: "home" }
  | { page: "level"; level: Level }
  | { page: "lesson"; id: string; level: Level };

function AppContent() {
  const [route, setRoute] = useState<Route>({ page: "home" });
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return true;
  });

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  // Apply dark class on initial render
  if (typeof window !== "undefined" && dark) {
    document.documentElement.classList.add("dark");
  }

  const navigateToLevel = (level: Level) => setRoute({ page: "level", level });
  const navigateHome = () => setRoute({ page: "home" });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Global nav bar */}
      <div className="fixed top-0 right-0 z-50 p-4">
        <button
          type="button"
          data-ocid="nav.theme_toggle"
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Alternar tema"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Floating logo (only on sub-pages) */}
      {route.page !== "home" && (
        <div className="fixed top-0 left-0 z-50 p-4">
          <button
            type="button"
            onClick={navigateHome}
            className="flex items-center gap-1.5 text-sm font-mono font-bold text-primary hover:opacity-80 transition-opacity"
          >
            <Code2 className="w-4 h-4" />
            CodeLearn
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={route.page === "lesson" ? route.id : route.page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col"
        >
          {route.page === "home" && (
            <HomePage onNavigateLevel={navigateToLevel} />
          )}
          {route.page === "level" && (
            <LessonsPage
              level={route.level}
              onBack={navigateHome}
              onLesson={(id) =>
                setRoute({ page: "lesson", id, level: route.level })
              }
            />
          )}
          {route.page === "lesson" && (
            <LessonPage
              lessonId={route.id}
              onBack={() => {
                if (route.page === "lesson") {
                  setRoute({ page: "level", level: route.level });
                }
              }}
              onHome={navigateHome}
              onLesson={(id) => {
                if (route.page === "lesson") {
                  setRoute({ page: "lesson", id, level: route.level });
                }
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <footer className="border-t border-border px-6 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} CodeLearn. Feito com{" "}
          <span className="text-primary">♥</span> usando{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
