import { useMemo, useRef, useState } from "react";
import { ArrowRight, CornerDownLeft, GitCommitHorizontal, Pencil, RotateCcw, Undo2, Plus } from "lucide-react";
import { cn } from "../utils/cn";

type Trees = {
  working: Record<string, string>;
  index: Record<string, string>;
  repo: Record<string, string>;
};

const INITIAL: Trees = {
  working: { "README.md": "v1", "app.js": "v2", "notes.md": "draft" },
  // After a clone or a commit, the index matches HEAD. Edits have not been staged yet.
  index: { "README.md": "v1", "app.js": "v1", "legacy.css": "v1" },
  repo: { "README.md": "v1", "app.js": "v1", "legacy.css": "v1" },
};

const FILE_ORDER = ["README.md", "app.js", "notes.md", "legacy.css"];

const CONTENT_LABELS: Record<string, string> = {
  v1: "line 1–24",
  v2: "line 1–31",
  v3: "line 1–38",
  v4: "line 1–45",
  draft: "untitled",
  deleted: "removed",
};

const DELETED = "deleted";

function shortHash() {
  return Math.random().toString(16).slice(2, 9).padEnd(7, "0");
}

function statusOf(name: string, trees: Trees) {
  const wd = trees.working[name];
  const index = trees.index[name];
  const repo = trees.repo[name];

  if (index === DELETED) return { label: "staged deletion", tone: "warn" as const };
  if (index && index !== repo) return { label: "staged", tone: "accent" as const };
  if (!wd) return { label: "deleted", tone: "warn" as const };
  if (!repo && !index) return { label: "untracked", tone: "sage" as const };
  if (wd !== (index ?? repo)) return { label: "modified", tone: "warn" as const };
  return { label: "clean", tone: "neutral" as const };
}

const toneClasses = {
  accent: "border-accent/30 bg-accent-soft text-accent-deep",
  warn: "border-amber/30 bg-[#f4e8d2] text-[#8a611b]",
  sage: "border-sage/25 bg-sage-soft text-sage",
  neutral: "border-line bg-paper-deep text-muted",
};

function FileCard({
  name,
  content,
  status,
  dimmed,
}: {
  name: string;
  content: string;
  status?: ReturnType<typeof statusOf>;
  dimmed?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-md border border-line bg-paper-soft px-2.5 py-1.5 transition",
        dimmed && "opacity-55",
      )}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="size-1 shrink-0 rounded-full bg-line-strong" />
        <span className="truncate font-mono text-[10.5px] text-ink-soft">{name}</span>
      </div>
      <span className="shrink-0 font-mono text-[9px] text-faint">{CONTENT_LABELS[content] ?? content}</span>
      {status && (
        <span
          className={cn(
            "shrink-0 rounded-full border px-1.5 py-px font-mono text-[8px] uppercase tracking-wide",
            toneClasses[status.tone],
          )}
        >
          {status.label}
        </span>
      )}
    </div>
  );
}

function TreeColumn({
  title,
  subtitle,
  count,
  children,
  footer,
  tone,
}: {
  title: string;
  subtitle: string;
  count: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
  tone: "working" | "index" | "repo";
}) {
  return (
    <div className="flex min-w-0 flex-col rounded-lg border border-line bg-paper-deep/35 p-2.5">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[11.5px] font-semibold leading-tight text-ink">{title}</p>
          <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-faint">{subtitle}</p>
        </div>
        <span
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[9px]",
            tone === "working" && "bg-ink text-cream",
            tone === "index" && "bg-accent text-paper-soft",
            tone === "repo" && "bg-sage text-paper-soft",
          )}
        >
          {count}
        </span>
      </div>
      <div className="flex-1 space-y-1.5">{children}</div>
      {footer && <div className="mt-2 border-t border-line/80 pt-2">{footer}</div>}
    </div>
  );
}

export default function StagingLab() {
  const [trees, setTrees] = useState<Trees>(INITIAL);
  const [log, setLog] = useState<string[]>([
    "~/study-guide $ git status -s",
    " M app.js",
    "?? notes.md",
    " D legacy.css",
  ]);
  const [commitCount, setCommitCount] = useState(1);
  const [head, setHead] = useState("7c1a0de");
  const [editLevel, setEditLevel] = useState(2);
  const terminal = useRef<HTMLDivElement>(null);

  const files = useMemo(() => {
    const names = new Set([...FILE_ORDER, ...Object.keys(trees.working), ...Object.keys(trees.repo), ...Object.keys(trees.index)]);
    return FILE_ORDER.filter((name) => names.has(name));
  }, [trees]);

  const stagedCount = useMemo(
    () => files.filter((name) => (trees.index[name] ?? null) !== (trees.repo[name] ?? null)).length,
    [files, trees],
  );
  const changeCount = useMemo(
    () =>
      files.filter((name) => {
        const wd = trees.working[name] ?? null;
        const index = trees.index[name] === DELETED ? null : (trees.index[name] ?? null);
        const base = index ?? trees.repo[name] ?? null;
        return wd !== base;
      }).length,
    [files, trees],
  );

  const pushLog = (lines: string[]) => {
    setLog((current) => [...current, ...lines].slice(-8));
    requestAnimationFrame(() => {
      terminal.current?.scrollTo({ top: terminal.current.scrollHeight, behavior: "smooth" });
    });
  };

  const editFile = () => {
    const next = Math.min(editLevel + 1, 4);
    setEditLevel(next);
    const version = `v${next}`;
    setTrees((current) => ({ ...current, working: { ...current.working, "app.js": version } }));
    pushLog([`$ vim app.js`, `✓ app.js edited · working tree now differs from the index`]);
  };

  const addAll = () => {
    if (changeCount === 0) {
      pushLog(["$ git add .", "nothing to stage — the working tree matches the index"]);
      return;
    }
    setTrees((current) => {
      const nextIndex: Record<string, string> = { ...current.working };
      Object.keys(current.repo).forEach((name) => {
        if (!(name in current.working)) nextIndex[name] = DELETED;
      });
      return { ...current, index: nextIndex };
    });
    pushLog(["$ git add .", `✓ ${changeCount} change${changeCount === 1 ? "" : "s"} copied into the index`]);
  };

  const commit = () => {
    if (stagedCount === 0) {
      pushLog(["$ git commit -m \"Update the study guide\"", "nothing staged — run `git add` first"]);
      return;
    }
    const hash = shortHash();
    setTrees((current) => {
      const nextRepo: Record<string, string> = { ...current.index };
      Object.keys(nextRepo).forEach((name) => {
        if (nextRepo[name] === DELETED) delete nextRepo[name];
      });
      return { ...current, repo: nextRepo, index: { ...nextRepo } };
    });
    setCommitCount((count) => count + 1);
    setHead(hash);
    pushLog([
      '$ git commit -m "Update the study guide"',
      `[master ${hash}] Update the study guide`,
      ` ${stagedCount} file${stagedCount === 1 ? "" : "s"} changed`,
    ]);
  };

  const unstage = () => {
    setTrees((current) => ({ ...current, index: { ...current.repo } }));
    pushLog(["$ git restore --staged .", "index reset to HEAD · your edits stay in the working tree"]);
  };

  const discard = () => {
    setTrees((current) => {
      const nextWorking: Record<string, string> = {};
      const names = new Set([...Object.keys(current.index), ...Object.keys(current.repo)]);
      names.forEach((name) => {
        const value = current.index[name] ?? current.repo[name];
        if (value && value !== DELETED) nextWorking[name] = value;
      });
      // untracked files survive a restore
      Object.entries(current.working).forEach(([name, value]) => {
        if (!current.repo[name] && !current.index[name]) nextWorking[name] = value;
      });
      return { ...current, working: nextWorking };
    });
    pushLog(["$ git restore .", "✓ working tree restored from the index · untracked files untouched"]);
  };

  const resetDemo = () => {
    setTrees(INITIAL);
    setCommitCount(1);
    setHead("7c1a0de");
    setEditLevel(2);
    setLog(["$ git status -s", " M app.js", "?? notes.md", " D legacy.css", "demo reset ✓"]);
  };

  const btn =
    "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[10.5px] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong/80 bg-paper-soft shadow-[0_10px_30px_-24px_rgba(28,27,22,0.5)]">
      {/* toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper-deep/50 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-ink text-paper-soft">
            <GitCommitHorizontal className="size-3.5" />
          </span>
          <div>
            <p className="text-[11.5px] font-semibold leading-none text-ink">The staging lab</p>
            <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-faint">
              interactive · nothing leaves your browser
            </p>
          </div>
        </div>
        <button
          onClick={resetDemo}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[9.5px] uppercase tracking-wider text-muted transition hover:bg-paper-deep hover:text-ink"
        >
          <RotateCcw className="size-3" /> reset
        </button>
      </div>

      <div className="p-3 sm:p-4">
        {/* trees */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <TreeColumn
            title="Working directory"
            subtitle="your files"
            count={Object.keys(trees.working).length}
            tone="working"
          >
            {files
              .filter((name) => trees.working[name])
              .map((name) => (
                <FileCard
                  key={name}
                  name={name}
                  content={trees.working[name]}
                  status={statusOf(name, trees)}
                />
              ))}
            {files
              .filter((name) => !trees.working[name] && (trees.index[name] || trees.repo[name]))
              .map((name) => (
                <FileCard
                  key={name}
                  name={name}
                  content="deleted"
                  status={{ label: "deleted", tone: "warn" }}
                  dimmed
                />
              ))}
            <button
              onClick={editFile}
              className="mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-line-strong py-1.5 font-mono text-[9.5px] text-muted transition hover:border-accent/50 hover:text-accent"
            >
              <Pencil className="size-3" /> edit app.js
            </button>
          </TreeColumn>

          <TreeColumn
            title="Index / staging"
            subtitle=".git/index"
            count={Object.keys(trees.index).length}
            tone="index"
            footer={
              <p className="font-mono text-[8.5px] leading-relaxed text-faint">
                {stagedCount === 0
                  ? "nothing staged yet"
                  : `${stagedCount} staged change${stagedCount === 1 ? "" : "s"}`}
              </p>
            }
          >
            {files.filter((name) => trees.index[name]).length === 0 ? (
              <div className="flex min-h-16 items-center justify-center rounded-md border border-dashed border-line px-2 py-3 text-center font-mono text-[9px] leading-relaxed text-faint">
                nothing staged yet
                <br />
                try git add .
              </div>
            ) : (
              files
                .filter((name) => trees.index[name])
                .map((name) => (
                  <FileCard
                    key={name}
                    name={name}
                    content={trees.index[name] === DELETED ? "deleted" : trees.index[name]}
                    status={
                      ["staged", "staged deletion"].includes(statusOf(name, trees).label)
                        ? statusOf(name, trees)
                        : undefined
                    }
                  />
                ))
            )}
          </TreeColumn>

          <TreeColumn
            title="Repository"
            subtitle=".git / commits"
            count={Object.keys(trees.repo).length}
            tone="repo"
            footer={
              <div className="flex items-center justify-between font-mono text-[8.5px] text-faint">
                <span>master</span>
                <span className="rounded bg-paper-deep px-1 py-0.5 text-ink-soft">{head}</span>
                <span>{commitCount} commit{commitCount === 1 ? "" : "s"}</span>
              </div>
            }
          >
            {files
              .filter((name) => trees.repo[name])
              .map((name) => (
                <FileCard key={name} name={name} content={trees.repo[name]} />
              ))}
          </TreeColumn>
        </div>

        {/* controls */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <button
            onClick={addAll}
            className={cn(btn, "border-accent bg-accent text-paper-soft hover:bg-accent-deep")}
          >
            <Plus className="size-3" /> git add .
          </button>
          <button
            onClick={commit}
            disabled={stagedCount === 0}
            className={cn(btn, "border-ink bg-ink text-cream hover:bg-charcoal-soft")}
          >
            <GitCommitHorizontal className="size-3" /> commit
          </button>
          <button
            onClick={unstage}
            className={cn(btn, "border-line-strong bg-paper-soft text-ink-soft hover:border-ink/40")}
          >
            <Undo2 className="size-3" /> restore --staged .
          </button>
          <button
            onClick={discard}
            className={cn(btn, "border-line-strong bg-paper-soft text-ink-soft hover:border-ink/40")}
          >
            <CornerDownLeft className="size-3" /> restore .
          </button>
        </div>

        {/* terminal */}
        <div className="mt-3 overflow-hidden rounded-lg border border-charcoal/80 bg-charcoal">
          <div className="flex items-center justify-between border-b border-white/8 px-3 py-1.5">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-cream/35">terminal</span>
            <span className="flex items-center gap-1 font-mono text-[8.5px] text-cream/30">
              <span className="size-1 rounded-full bg-sage" /> master
            </span>
          </div>
          <div ref={terminal} aria-live="polite" className="max-h-28 overflow-y-auto px-3 py-2 font-mono text-[10.5px] leading-[1.7]">
            {log.map((line, index) => (
              <p
                key={index}
                className={cn(
                  "whitespace-pre-wrap",
                  line.startsWith("$")
                    ? "text-cream/90"
                    : line.startsWith("✓")
                      ? "text-[#a9bb9c]"
                      : "text-cream/45",
                )}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <p className="mt-2.5 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted">
          <ArrowRight className="mt-0.5 size-3 shrink-0 text-accent" />
          <span>
            Files only move forward. Editing changes the working directory; <span className="font-mono text-[10px]">add</span>{" "}
            copies it to the index; <span className="font-mono text-[10px]">commit</span> writes the index into the repo.
          </span>
        </p>
      </div>
    </div>
  );
}
