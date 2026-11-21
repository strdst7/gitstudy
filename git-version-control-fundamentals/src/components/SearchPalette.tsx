import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, CircleHelp, CornerDownLeft, Search, Terminal, X } from "lucide-react";
import { chapters, commandGroups, quizQuestions, type ChapterId } from "../lib/guide";
import { cn } from "../utils/cn";

type Result = {
  kind: "chapter" | "command" | "question";
  title: string;
  subtitle: string;
  chapter: ChapterId;
  section?: string;
};

const kindMeta = {
  chapter: { icon: BookOpen, label: "chapter" },
  command: { icon: Terminal, label: "command" },
  question: { icon: CircleHelp, label: "self-test" },
};

const index: Result[] = [
  ...chapters.map((chapter) => ({
    kind: "chapter" as const,
    title: `${chapter.num} · ${chapter.title}`,
    subtitle: chapter.deck,
    chapter: chapter.id,
  })),
  ...commandGroups.flatMap((group) =>
    group.items.map((item) => ({
      kind: "command" as const,
      title: item.cmd,
      subtitle: `${group.title} — ${item.desc}`,
      chapter: item.chapter,
    })),
  ),
  ...quizQuestions.map((question) => ({
    kind: "question" as const,
    title: question.prompt,
    subtitle: `Self-test question ${question.id} · ${question.tag}`,
    chapter: "quiz" as const,
    section: "deck",
  })),
];

export default function SearchPalette({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (chapter: ChapterId, section?: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return [
        ...index.filter((item) => item.kind === "chapter").slice(0, 5),
        ...index.filter((item) => item.kind === "command").slice(0, 4),
      ];
    }
    const words = needle.split(/\s+/);
    return index
      .filter((item) => {
        const haystack = `${item.title} ${item.subtitle}`.toLowerCase();
        return words.every((word) => haystack.includes(word));
      })
      .sort((a, b) => {
        const aStarts = a.title.toLowerCase().startsWith(needle) ? 0 : 1;
        const bStarts = b.title.toLowerCase().startsWith(needle) ? 0 : 1;
        return aStarts - bStarts;
      })
      .slice(0, 10);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  const choose = (result: Result | undefined) => {
    if (!result) return;
    onNavigate(result.chapter, result.section);
    onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => (current + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => (current - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(results[active]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex animate-fade-in items-start justify-center bg-ink/40 px-3 pt-[8vh] backdrop-blur-[3px] sm:px-4 sm:pt-[12vh]"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the study guide"
        className="w-full max-w-xl animate-pop overflow-hidden rounded-2xl border border-line-strong bg-paper shadow-[0_30px_80px_-20px_rgba(28,27,22,0.45)]"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Search className="size-4 shrink-0 text-accent" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chapters, commands, questions…"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-faint"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="flex size-6 items-center justify-center rounded border border-line text-muted transition hover:border-line-strong hover:text-ink"
          >
            <X className="size-3" />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="font-display text-xl text-ink">No matches for “{query}”</p>
              <p className="mt-1 text-[12px] text-muted">Try “merge”, “staging”, “reset” or “fetch”.</p>
            </div>
          ) : (
            <>
              <p className="px-2.5 pb-1.5 pt-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-faint">
                {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Quick jumps"}
              </p>
              {results.map((result, resultIndex) => {
                const meta = kindMeta[result.kind];
                const Icon = meta.icon;
                return (
                  <button
                    key={`${result.kind}-${result.title}-${resultIndex}`}
                    onMouseEnter={() => setActive(resultIndex)}
                    onClick={() => choose(result)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition",
                      active === resultIndex ? "bg-accent-soft/60" : "hover:bg-paper-deep/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-md border",
                        active === resultIndex
                          ? "border-accent/25 bg-paper-soft text-accent"
                          : "border-line bg-paper-soft text-muted",
                      )}
                    >
                      <Icon className="size-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-[12.5px] text-ink",
                          result.kind === "command" && "font-mono text-[11.5px]",
                        )}
                      >
                        {result.title}
                      </span>
                      <span className="block truncate text-[10.5px] text-muted">{result.subtitle}</span>
                    </span>
                    <span className="hidden shrink-0 font-mono text-[8px] uppercase tracking-wider text-faint sm:block">
                      {meta.label}
                    </span>
                  </button>
                );
              })}
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line bg-paper-deep/40 px-4 py-2">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-faint">
            ↑ ↓ browse · enter open · esc close
          </p>
          <span className="flex items-center gap-1 font-mono text-[8.5px] text-faint">
            jump to <CornerDownLeft className="size-2.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
