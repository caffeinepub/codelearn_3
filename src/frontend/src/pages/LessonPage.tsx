import { LESSONS, LEVEL_META, type Level } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Code2,
  Home,
} from "lucide-react";
import { motion } from "motion/react";
import { createElement, useMemo } from "react";

interface LessonPageProps {
  lessonId: string;
  onBack: () => void;
  onHome: () => void;
  onLesson: (id: string) => void;
}

const KEYWORDS = [
  "def",
  "if",
  "else",
  "elif",
  "for",
  "while",
  "return",
  "import",
  "from",
  "class",
  "in",
  "not",
  "and",
  "or",
  "True",
  "False",
  "None",
  "const",
  "let",
  "var",
  "function",
  "async",
  "await",
  "new",
  "this",
  "typeof",
  "instanceof",
  "interface",
  "type",
  "extends",
  "implements",
  "export",
  "default",
  "break",
  "continue",
  "switch",
  "case",
  "throw",
  "try",
  "catch",
  "finally",
  "null",
  "undefined",
];

function highlightLine(line: string): string {
  let safe = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  safe = safe.replace(/(#.*)$/, '<span class="cm">$1</span>');
  safe = safe.replace(/(\/\/.*$)/, '<span class="cm">$1</span>');
  safe = safe.replace(
    /("[^"]*"|'[^']*'|`[^`]*`)/g,
    '<span class="str">$1</span>',
  );
  safe = safe.replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>');
  for (const kw of KEYWORDS) {
    safe = safe.replace(
      new RegExp(`\\b(${kw})\\b`, "g"),
      '<span class="kw">$1</span>',
    );
  }
  return safe;
}

function HighlightedSpan({ html }: { html: string }) {
  return createElement("span", {
    className: "flex-1 text-sm leading-6",
    // biome-ignore lint/security/noDangerouslySetInnerHtml: static lesson code only, no user input
    dangerouslySetInnerHTML: { __html: html },
  });
}

type HighlightedLineProps = { line: string; lineNum: number };
function HighlightedLine({ line, lineNum }: HighlightedLineProps) {
  const html = highlightLine(line) || "&nbsp;";
  return (
    <div className="flex">
      <span className="select-none text-right pr-4 text-white/20 min-w-[2.5rem] font-mono text-xs leading-6">
        {lineNum}
      </span>
      <HighlightedSpan html={html} />
    </div>
  );
}

function renderCodeLines(lines: string[]) {
  return lines.map((line, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: code lines are positional, order is fixed
    <HighlightedLine key={i} line={line} lineNum={i + 1} />
  ));
}

function CodeBlock({ code }: { code: string }) {
  const lines = code.split("\n");
  return (
    <div className="code-block my-5">
      <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
      </div>
      {renderCodeLines(lines)}
    </div>
  );
}

type ContentBlock = { type: string; text?: string; code?: string };

function ContentRenderer({ block }: { block: ContentBlock }) {
  if (block.type === "heading") {
    return (
      <h2 className="font-display font-bold text-xl text-foreground mt-8 mb-3 first:mt-0">
        {block.text}
      </h2>
    );
  }
  if (block.type === "code") {
    return <CodeBlock code={block.code ?? ""} />;
  }
  return (
    <p className="text-foreground/85 leading-relaxed text-base mb-4">
      {block.text}
    </p>
  );
}

function renderContent(content: ContentBlock[]) {
  return content.map((block, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static lesson content, order is fixed
    <ContentRenderer key={i} block={block} />
  ));
}

export default function LessonPage({
  lessonId,
  onBack,
  onHome,
  onLesson,
}: LessonPageProps) {
  const { isCompleted, toggleComplete } = useProgress();

  const lesson = useMemo(
    () => LESSONS.find((l) => l.id === lessonId),
    [lessonId],
  );
  const levelLessons = useMemo(
    () => (lesson ? LESSONS.filter((l) => l.level === lesson.level) : []),
    [lesson],
  );
  const currentIndex = useMemo(
    () => levelLessons.findIndex((l) => l.id === lessonId),
    [levelLessons, lessonId],
  );

  const prevLesson = currentIndex > 0 ? levelLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < levelLessons.length - 1
      ? levelLessons[currentIndex + 1]
      : null;

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Aula não encontrada.</p>
      </div>
    );
  }

  const done = isCompleted(lesson.id);
  const meta = LEVEL_META[lesson.level as Level];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={onHome}
            data-ocid="nav.home_link"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>
          <span className="text-border">/</span>
          <button
            type="button"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            {meta.label}
          </button>
          <span className="text-border">/</span>
          <span className="text-foreground font-mono truncate max-w-[180px]">
            {lesson.title}
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold badge-${lesson.level}`}
              >
                <Code2 className="w-3 h-3" />
                {lesson.language}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold badge-${lesson.level}`}
              >
                {meta.emoji} {meta.label}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground text-xs font-mono">
                <Clock className="w-3.5 h-3.5" />
                {lesson.duration}
              </span>
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-foreground leading-tight mb-2">
              {lesson.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {lesson.description}
            </p>
          </div>

          <div className="space-y-0">{renderContent(lesson.content)}</div>

          <div className="mt-10 pt-6 border-t border-border">
            <button
              type="button"
              data-ocid="lesson.complete_button"
              onClick={() => toggleComplete(lesson.id)}
              className={`flex items-center gap-3 w-full md:w-auto px-6 py-3.5 rounded-xl font-mono font-semibold text-sm transition-all duration-200 border ${
                done
                  ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                  : "bg-muted border-border text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {done ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
              {done ? "Aula concluída! Desmarcar" : "Marcar como concluída"}
            </button>
          </div>

          <div className="mt-6 flex gap-3">
            {prevLesson ? (
              <button
                type="button"
                data-ocid="lesson.prev_button"
                onClick={() => onLesson(prevLesson.id)}
                className="flex-1 flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/30 transition-all duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground font-mono">
                    Anterior
                  </div>
                  <div className="text-sm font-medium text-foreground line-clamp-1">
                    {prevLesson.title}
                  </div>
                </div>
              </button>
            ) : (
              <div className="flex-1" />
            )}

            {nextLesson ? (
              <button
                type="button"
                data-ocid="lesson.next_button"
                onClick={() => onLesson(nextLesson.id)}
                className="flex-1 flex items-center justify-end gap-2 px-5 py-3 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="text-right">
                  <div className="text-xs text-muted-foreground font-mono">
                    Próxima
                  </div>
                  <div className="text-sm font-medium text-foreground line-clamp-1">
                    {nextLesson.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onBack}
                className="flex-1 flex items-center justify-end gap-2 px-5 py-3 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 font-mono text-sm font-semibold"
              >
                Ver todas as aulas
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
