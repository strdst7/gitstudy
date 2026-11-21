import { useMemo, useState } from "react";
import { Search, Terminal, X } from "lucide-react";
import { commandGroups } from "../lib/guide";
import { CopyButton } from "./ui";
import { cn } from "../utils/cn";

export default function CheatSheet() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return commandGroups
      .filter((entry) => group === "All" || entry.title === group)
      .map((entry) => ({
        ...entry,
        items: entry.items.filter((item) =>
          needle ? `${item.cmd} ${item.desc}`.toLowerCase().includes(needle) : true,
        ),
      }))
      .filter((entry) => entry.items.length > 0);
  }, [query, group]);

  const total = groups.reduce((count, entry) => count + entry.items.length, 0);

  return (
    <div>
      <div className="rounded-xl border border-line bg-paper-soft p-3 sm:p-4">
        <div className="flex items-center gap-2.5 rounded-lg border border-line bg-paper px-3 py-2.5 focus-within:border-accent/60">
          <Search className="size-4 shrink-0 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter commands — try “reset”, “branch”, “--staged”…"
            aria-label="Filter commands"
            className="min-w-0 flex-1 bg-transparent font-mono text-[12px] text-ink outline-none placeholder:font-sans placeholder:text-[12px] placeholder:text-faint"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear filter"
              className="flex size-5 items-center justify-center rounded border border-line text-muted hover:text-ink"
            >
              <X className="size-3" />
            </button>
          )}
          <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-wider text-faint sm:block">
            {total} commands
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {["All", ...commandGroups.map((entry) => entry.title)].map((title) => (
            <button
              key={title}
              onClick={() => setGroup(title)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[10.5px] transition",
                group === title
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-paper text-muted hover:border-line-strong hover:text-ink",
              )}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-6">
        {groups.length === 0 && (
          <div className="rounded-xl border border-dashed border-line-strong px-6 py-12 text-center">
            <p className="font-display text-2xl text-ink">Nothing here</p>
            <p className="mt-1 text-[12.5px] text-muted">
              No command matches “{query}”. Try a flag like <span className="font-mono">--hard</span> or a verb like{" "}
              <span className="font-mono">merge</span>.
            </p>
          </div>
        )}

        {groups.map((entry) => (
          <section key={entry.title}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <h3 className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                <Terminal className="size-3.5 text-accent" />
                {entry.title}
              </h3>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">{entry.hint}</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-line bg-paper-soft">
              {entry.items.map((item) => (
                <div
                  key={`${entry.title}-${item.cmd}`}
                  className="group flex flex-col gap-1.5 border-b border-line/70 px-3.5 py-3 transition last:border-0 hover:bg-paper-deep/30 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <div className="min-w-0">
                    <code className="block break-all font-mono text-[11.5px] leading-relaxed text-ink">
                      <span className="mr-1 text-accent">$</span>
                      {item.cmd}
                    </code>
                    <p className="mt-1 text-[11.5px] leading-snug text-muted">{item.desc}</p>
                  </div>
                  <CopyButton
                    value={item.cmd}
                    tone="light"
                    className="w-fit shrink-0 opacity-70 transition group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
