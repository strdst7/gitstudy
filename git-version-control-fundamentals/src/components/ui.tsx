import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  GitBranch,
  Info,
  Lightbulb,
  Quote,
  TriangleAlert,
} from "lucide-react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ */
/* Inline helpers                                                      */
/* ------------------------------------------------------------------ */

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-line bg-paper-soft px-1.5 font-mono text-[10px] font-medium text-muted shadow-[0_1px_0_#ddd5c4]">
      {children}
    </kbd>
  );
}

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "sage" | "dark" | "outline";
  className?: string;
}) {
  const tones = {
    neutral: "bg-paper-deep text-ink-soft border-line",
    accent: "bg-accent-soft text-accent-deep border-accent/20",
    sage: "bg-sage-soft text-sage border-sage/20",
    dark: "bg-charcoal text-cream border-charcoal",
    outline: "bg-transparent text-muted border-line-strong",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="inline-code">{children}</code>;
}

/* ------------------------------------------------------------------ */
/* Copy button                                                         */
/* ------------------------------------------------------------------ */

export function CopyButton({
  value,
  className,
  label,
  tone = "dark",
}: {
  value: string;
  className?: string;
  label?: string;
  tone?: "dark" | "light";
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label ?? "Copy to clipboard"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition",
        tone === "dark"
          ? "border-white/10 bg-white/5 text-cream/60 hover:border-white/25 hover:text-cream"
          : "border-line bg-paper-soft text-muted hover:border-line-strong hover:text-ink",
        className,
      )}
    >
      {copied ? (
        <Check className={cn("size-3", tone === "dark" ? "text-sage-soft" : "text-sage")} />
      ) : (
        <Copy className="size-3" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Code block                                                          */
/* ------------------------------------------------------------------ */

function highlightLine(line: string) {
  const hashIndex = line.indexOf("#");
  const code = hashIndex > -1 ? line.slice(0, hashIndex) : line;
  const comment = hashIndex > -1 ? line.slice(hashIndex) : "";

  const tokens = code.split(/(\s+)/).map((token, index) => {
    if (!token) return null;
    if (token.startsWith("--") || /^-[a-zA-Z]/.test(token)) {
      return (
        <span key={index} className="text-[#d8a56b]">
          {token}
        </span>
      );
    }
    if (/^["'].*["']$/.test(token)) {
      return (
        <span key={index} className="text-[#c5cfa8]">
          {token}
        </span>
      );
    }
    if (/^<.*>$/.test(token)) {
      return (
        <span key={index} className="text-[#e5a88c]">
          {token}
        </span>
      );
    }
    return <span key={index}>{token}</span>;
  });

  return (
    <>
      {tokens}
      {comment && <span className="italic text-[#7f8c75]">{comment}</span>}
    </>
  );
}

export function CodeBlock({
  code,
  label = "shell",
  caption,
  prompt = true,
  className,
}: {
  code: string;
  label?: string;
  caption?: string;
  prompt?: boolean;
  className?: string;
}) {
  const lines = code.replace(/\n$/, "").split("\n");
  return (
    <figure className={cn("not-prose", className)}>
      <div className="overflow-hidden rounded-xl border border-charcoal/70 bg-charcoal shadow-[0_1px_2px_rgba(28,27,22,0.12)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#d1522b]/80" />
              <span className="size-2 rounded-full bg-[#b98425]/70" />
              <span className="size-2 rounded-full bg-[#657a5b]/80" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/40">{label}</span>
          </div>
          <CopyButton value={code} />
        </div>
        <div className="overflow-x-auto px-4 py-3.5">
          <pre className="font-mono text-[12.5px] leading-[1.75] text-[#eee7d8]">
            <code>
              {lines.map((line, index) => (
                <div key={index} className="whitespace-pre">
                  {prompt && <span className="mr-2 select-none text-accent/70">$</span>}
                  {highlightLine(line)}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 px-1 text-[12px] leading-relaxed text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Callout                                                             */
/* ------------------------------------------------------------------ */

const calloutStyles = {
  note: {
    wrap: "border-sage/25 bg-sage-soft/45",
    icon: "bg-sage text-paper-soft",
    title: "text-sage",
    Icon: Info,
  },
  tip: {
    wrap: "border-accent/25 bg-accent-soft/45",
    icon: "bg-accent text-paper-soft",
    title: "text-accent-deep",
    Icon: Lightbulb,
  },
  warn: {
    wrap: "border-amber/30 bg-[#f3e9d4]",
    icon: "bg-amber text-paper-soft",
    title: "text-[#8a611b]",
    Icon: TriangleAlert,
  },
  quote: {
    wrap: "border-line-strong bg-paper-soft",
    icon: "bg-ink text-paper-soft",
    title: "text-ink",
    Icon: Quote,
  },
};

export function Callout({
  variant = "note",
  title,
  children,
  className,
}: {
  variant?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const style = calloutStyles[variant];
  const Icon = style.Icon;
  return (
    <aside className={cn("rounded-xl border p-4 sm:p-5", style.wrap, className)}>
      <div className="flex gap-3.5">
        <span className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full", style.icon)}>
          <Icon className="size-3.5" strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          {title && (
            <p className={cn("mb-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em]", style.title)}>
              {title}
            </p>
          )}
          <div className="text-[13.5px] leading-relaxed text-ink-soft">{children}</div>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  id,
  num,
  title,
  kicker,
}: {
  id: string;
  num: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="flex items-baseline gap-3 border-b border-line pb-2.5">
        <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent">{num}</span>
        <h2 className="font-display text-[26px] leading-tight tracking-[-0.01em] text-ink sm:text-[30px]">{title}</h2>
        {kicker && (
          <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.16em] text-faint sm:block">
            {kicker}
          </span>
        )}
      </div>
    </div>
  );
}

export function BodyText({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[14.5px] leading-[1.8] text-ink-soft sm:text-[15px]", className)}>{children}</p>;
}

export function DotList({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
          <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent/70" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Data table                                                          */
/* ------------------------------------------------------------------ */

export function DataTable({
  columns,
  rows,
  className,
}: {
  columns: string[];
  rows: ReactNode[][];
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-paper-soft", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-paper-deep/60">
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-2.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-muted"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-line/70 last:border-0 hover:bg-paper-deep/30">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "px-4 py-3 align-top text-[13px] leading-relaxed",
                      cellIndex === 0 ? "font-medium text-ink" : "text-ink-soft",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Progress ring                                                       */
/* ------------------------------------------------------------------ */

export function ProgressRing({
  value,
  total,
  size = 40,
  stroke = 3,
  dark = false,
}: {
  value: number;
  total: number;
  size?: number;
  stroke?: number;
  dark?: boolean;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = total === 0 ? 0 : Math.min(value / total, 1);
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className={dark ? "stroke-white/15" : "stroke-line"}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
          className={dark ? "stroke-accent transition-all duration-500" : "stroke-accent transition-all duration-500"}
        />
      </svg>
      <span
        className={cn(
          "absolute font-mono text-[9px] font-medium tabular-nums",
          dark ? "text-cream/70" : "text-muted",
        )}
      >
        {value}/{total}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Three trees (compact overview diagram)                              */
/* ------------------------------------------------------------------ */

export function ThreeTreesMini() {
  const trees = [
    { title: "Working directory", note: "v3 · your files", icon: "▤" },
    { title: "Index", note: "staged snapshot", icon: "◫" },
    { title: "Repository", note: ".git · all versions", icon: "◉" },
  ];
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      {trees.map((tree, index) => (
        <div key={tree.title} className="flex flex-1 items-center gap-3">
          <div className="flex-1 rounded-lg border border-line bg-paper-soft p-3.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">tree {index + 1}</span>
              <span className="text-accent">{tree.icon}</span>
            </div>
            <p className="text-[12.5px] font-medium leading-tight text-ink">{tree.title}</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">{tree.note}</p>
          </div>
          {index < trees.length - 1 && (
            <div className="hidden flex-col items-center gap-1 sm:flex">
              <span className="font-mono text-[9px] text-accent">{index === 0 ? "add" : "commit"}</span>
              <ArrowRight className="size-3.5 text-line-strong" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Commit graph (branching chapter)                                    */
/* ------------------------------------------------------------------ */

export function CommitGraph({ merged }: { merged: boolean }) {
  const main = [
    { id: "C0", x: 70, y: 232 },
    { id: "C1", x: 70, y: 192 },
    { id: "C2", x: 70, y: 152 },
    { id: "C4", x: 70, y: 108 },
  ];
  const branch = [
    { id: "C3", x: 216, y: 112 },
    { id: "C5", x: 216, y: 70 },
  ];
  const mainPath = main.map((node) => `${node.x},${node.y}`).join(" ");
  const branchPath = `70,152 216,112 216,70`;

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-charcoal/80 bg-charcoal p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/40">commit graph</span>
        <div className="flex items-center gap-3 font-mono text-[9px]">
          <span className="flex items-center gap-1.5 text-cream/60">
            <span className="size-1.5 rounded-full bg-accent" /> master
          </span>
          <span className="flex items-center gap-1.5 text-cream/60">
            <span className="size-1.5 rounded-full bg-[#9caf8d]" /> iss53
          </span>
        </div>
      </div>
      <svg viewBox="0 0 300 266" className="h-auto w-full" role="img" aria-label="Commit graph showing a branch and merge">
        <polyline points={mainPath} fill="none" stroke="#d1522b" strokeWidth="1.6" />
        <polyline points={branchPath} fill="none" stroke="#9caf8d" strokeWidth="1.6" />
        {merged && (
          <>
            <path d="M70,108 C70,44 216,44 216,70" fill="none" stroke="#9caf8d" strokeWidth="1.4" />
            <path d="M70,108 L160,34" fill="none" stroke="#d1522b" strokeWidth="1.6" />
            <path d="M216,70 L160,34" fill="none" stroke="#9caf8d" strokeWidth="1.6" />
          </>
        )}
        {[...main, ...branch].map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r="13" fill="#1a1915" stroke={node.x < 150 ? "#d1522b" : "#9caf8d"} strokeWidth="1.4" />
            <text x={node.x} y={node.y + 3.5} textAnchor="middle" className="fill-[#f6f1e6] font-mono" fontSize="9">
              {node.id}
            </text>
          </g>
        ))}
        {merged && (
          <g>
            <circle cx="160" cy="34" r="14" fill="#d1522b" />
            <text x="160" y="38" textAnchor="middle" className="fill-[#fbf8f1] font-mono" fontSize="9.5">
              C6
            </text>
          </g>
        )}
        <g>
          <rect x="34" y="244" width="72" height="17" rx="8.5" fill="#d1522b" />
          <text x="70" y="255.5" textAnchor="middle" className="fill-[#fbf8f1] font-mono" fontSize="8">
            master
          </text>
        </g>
        <g opacity={merged ? 0.45 : 1}>
          <rect x="180" y="20" width="72" height="17" rx="8.5" fill="#657a5b" />
          <text x="216" y="31.5" textAnchor="middle" className="fill-[#fbf8f1] font-mono" fontSize="8">
            iss53
          </text>
        </g>
        {!merged && (
          <text x="150" y="250" textAnchor="middle" className="fill-[#f6f1e6]/40 font-mono" fontSize="8">
            divergent · no common child yet
          </text>
        )}
      </svg>
      <div className="mt-1 flex items-center justify-between gap-2 border-t border-white/8 pt-2.5">
        <p className="text-[11.5px] leading-snug text-cream/50">
          {merged ? "C6 joins both lines; its parents are C4 and C5." : "Two HEADs, one common ancestor: C2."}
        </p>
        <GitBranch className="size-3.5 shrink-0 text-cream/30" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small stat block                                                    */
/* ------------------------------------------------------------------ */

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-[30px] leading-none text-ink">{value}</p>
      <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">{label}</p>
    </div>
  );
}
