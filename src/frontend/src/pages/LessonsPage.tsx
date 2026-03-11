import { LEVEL_META, type Level } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { ArrowLeft, CheckCircle2, Circle, Clock, Code2 } from "lucide-react";
import { motion } from "motion/react";

interface LessonsPageProps {
  level: Level;
  onBack: () => void;
  onLesson: (id: string) => void;
}

export default function LessonsPage({
  level,
  onBack,
  onLesson,
}: LessonsPageProps) {
  const { isCompleted } = useProgress();
  const meta = LEVEL_META[level];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            data-ocid="nav.home_link"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <span className="text-border">/</span>
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold badge-${level}`}
          >
            <Code2 className="w-3 h-3" />
            {meta.label}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Level title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{meta.emoji}</span>
            <h1 className="font-display font-black text-3xl text-foreground">
              {meta.label}
            </h1>
          </div>
          <p className="text-muted-foreground">{meta.description}</p>
        </motion.div>

        {/* Lessons list */}
        <div data-ocid="lessons.list" className="space-y-3">
          {meta.lessons.map((lesson, i) => {
            const done = isCompleted(lesson.id);
            const ocid = `lessons.item.${i + 1}` as const;
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                data-ocid={ocid}
              >
                <button
                  type="button"
                  onClick={() => onLesson(lesson.id)}
                  className="w-full text-left group flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:bg-muted/40 transition-all duration-200 hover:border-primary/30"
                >
                  {/* Index + check */}
                  <div className="flex-shrink-0 mt-0.5">
                    {done ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {i + 1}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3
                        className={`font-semibold text-base transition-colors group-hover:text-primary ${done ? "text-muted-foreground" : "text-foreground"}`}
                      >
                        {lesson.title}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        <span className="font-mono">{lesson.duration}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {lesson.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium badge-${level}`}
                      >
                        {lesson.language}
                      </span>
                      {done && (
                        <span className="text-xs text-primary font-mono">
                          ✓ Concluída
                        </span>
                      )}
                    </div>
                  </div>

                  <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
