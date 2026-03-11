import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "codelearn_completed";

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    } catch {
      // ignore
    }
  }, [completed]);

  const markComplete = useCallback((id: string) => {
    setCompleted((prev) => new Set([...prev, id]));
  }, []);

  const markIncomplete = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (id: string) => completed.has(id),
    [completed],
  );

  return {
    completed,
    markComplete,
    markIncomplete,
    toggleComplete,
    isCompleted,
  };
}
