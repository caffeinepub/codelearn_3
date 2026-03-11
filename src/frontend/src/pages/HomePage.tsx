import { Progress } from "@/components/ui/progress";
import { LESSONS, LEVEL_META, type Level } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { BookOpen, ChevronRight, Code2, Terminal } from "lucide-react";
import { motion } from "motion/react";

interface HomePageProps {
  onNavigateLevel: (level: Level) => void;
}

const LEVEL_OCIDS = {
  iniciante: "home.iniciante_button",
  moderado: "home.moderado_button",
  experiente: "home.experiente_button",
} as const;

export default function HomePage({ onNavigateLevel }: HomePageProps) {
  const { isCompleted } = useProgress();

  const getProgress = (level: Level) => {
    const levelLessons = LESSONS.filter((l) => l.level === level);
    const done = levelLessons.filter((l) => isCompleted(l.id)).length;
    return {
      done,
      total: levelLessons.length,
      pct: Math.round((done / levelLessons.length) * 100),
    };
  };

  const totalCompleted = LESSONS.filter((l) => isCompleted(l.id)).length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-background scanlines">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -20%, oklch(0.78 0.20 162 / 0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-6">
              <Terminal className="w-3.5 h-3.5" />
              <span>Aprenda do zero ao avançado • Grátis</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-foreground mb-4 leading-none">
              Code<span className="text-primary">Learn</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              Aprenda programação do jeito certo — do Python básico ao
              TypeScript avançado, no seu próprio ritmo.
            </p>

            {totalCompleted > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono"
              >
                <BookOpen className="w-4 h-4" />
                {totalCompleted} de {LESSONS.length} aulas concluídas
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Level Cards */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pb-16 -mt-4">
        <div className="grid md:grid-cols-3 gap-6">
          {(
            Object.entries(LEVEL_META) as [Level, (typeof LEVEL_META)[Level]][]
          ).map(([level, meta], i) => {
            const prog = getProgress(level);
            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              >
                <button
                  type="button"
                  className={`group relative flex flex-col h-full w-full text-left rounded-xl border border-border bg-card p-6 transition-all duration-300 card-glow-${level} hover:border-current`}
                  style={{ color: `oklch(var(--level-${level}))` }}
                  onClick={() => onNavigateLevel(level)}
                  data-ocid={LEVEL_OCIDS[level]}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-6 right-6 h-px rounded-full opacity-60"
                    style={{ background: `oklch(var(--level-${level}))` }}
                  />

                  <div className="mb-4">
                    <span className="text-4xl">{meta.emoji}</span>
                  </div>

                  <div
                    className={`inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold mb-3 badge-${level}`}
                  >
                    <Code2 className="w-3 h-3" />
                    {meta.label}
                  </div>

                  <h2 className="text-foreground font-display font-bold text-xl mb-2">
                    {level === "iniciante"
                      ? "Python"
                      : level === "moderado"
                        ? "JavaScript"
                        : "TypeScript"}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                    {meta.description}
                  </p>

                  <div className="space-y-2 mb-5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground font-mono">
                        {prog.done}/{prog.total} aulas
                      </span>
                      <span
                        className="font-mono font-semibold"
                        style={{ color: `oklch(var(--level-${level}))` }}
                      >
                        {prog.pct}%
                      </span>
                    </div>
                    <div className={`progress-${level}`}>
                      <Progress value={prog.pct} className="h-1.5 bg-muted" />
                    </div>
                  </div>

                  <div
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-200 border"
                    style={{
                      background: `oklch(var(--level-${level}) / 0.12)`,
                      borderColor: `oklch(var(--level-${level}) / 0.3)`,
                      color: `oklch(var(--level-${level}))`,
                    }}
                  >
                    {prog.done === prog.total && prog.total > 0
                      ? "Revisar"
                      : prog.done > 0
                        ? "Continuar"
                        : "Começar"}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-3 gap-4 border border-border rounded-xl bg-card p-6"
        >
          {[
            { value: "9", label: "Aulas" },
            { value: "3", label: "Linguagens" },
            { value: "100%", label: "Grátis" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono font-black text-2xl text-primary">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
