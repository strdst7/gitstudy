import { Check, GitBranch, Search, X } from "lucide-react";
import { authors, chapterGroups, chapters, type ChapterId } from "../lib/guide";
import { ProgressRing } from "./ui";
import { cn } from "../utils/cn";

export default function Sidebar({
  activeId,
  completed,
  onNavigate,
  onOpenSearch,
  onClose,
}: {
  activeId: ChapterId;
  completed: ChapterId[];
  onNavigate: (id: ChapterId) => void;
  onOpenSearch: () => void;
  onClose?: () => void;
}) {
  const percent = Math.round((completed.length / chapters.length) * 100);

  return (
    <div className="flex h-full flex-col bg-charcoal text-cream">
      {/* brand */}
      <div className="relative border-b border-white/10 px-5 pb-4 pt-5">
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="absolute right-3 top-4 flex size-7 items-center justify-center rounded border border-white/10 text-cream/50 transition hover:text-cream"
          >
            <X className="size-3.5" />
          </button>
        )}
        <button onClick={() => onNavigate("orientation")} className="group flex items-center gap-2.5 text-left">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-paper-soft shadow-[0_4px_12px_-4px_rgba(209,82,43,0.7)]">
            <GitBranch className="size-[18px]" strokeWidth={2.2} />
          </span>
          <span>
            <span className="block font-display text-[23px] leading-none tracking-[-0.01em] text-cream">git study</span>
            <span className="mt-1 block font-mono text-[7.5px] uppercase tracking-[0.2em] text-cream/35">
              a field guide
            </span>
          </span>
        </button>
        <p className="mt-3 max-w-[190px] text-[10.5px] leading-[1.6] text-cream/40">
          Version control, explained from the working directory up.
        </p>
        <button
          onClick={onOpenSearch}
          className="mt-3.5 flex w-full items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-cream/45 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-cream/80"
        >
          <Search className="size-3" />
          <span className="text-[10px]">Search the guide</span>
          <kbd className="ml-auto rounded border border-white/15 px-1 py-px font-mono text-[8px] text-cream/35">⌘K</kbd>
        </button>
      </div>

      {/* nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {chapterGroups.map((group) => (
          <div key={group.label} className="mb-4 last:mb-0">
            <p className="mb-1.5 px-2 font-mono text-[7.5px] uppercase tracking-[0.2em] text-cream/30">
              {group.label}
            </p>
            {group.chapters.map((chapter) => {
              const isActive = chapter.id === activeId;
              const isDone = completed.includes(chapter.id);
              return (
                <button
                  key={chapter.id}
                  onClick={() => onNavigate(chapter.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group mb-0.5 flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-left transition",
                    isActive
                      ? "bg-cream text-ink shadow-[0_2px_10px_-4px_rgba(0,0,0,0.5)]"
                      : "text-cream/55 hover:bg-white/[0.055] hover:text-cream",
                  )}
                >
                  <span
                    className={cn(
                      "w-3.5 shrink-0 font-mono text-[8px]",
                      isActive ? "text-accent" : "text-cream/25 group-hover:text-cream/40",
                    )}
                  >
                    {chapter.num}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium">{chapter.shortTitle}</span>
                  {isDone ? (
                    <Check className={cn("size-3 shrink-0", isActive ? "text-sage" : "text-sage/80")} strokeWidth={2.5} />
                  ) : (
                    <span
                      className={cn(
                        "size-1.5 shrink-0 rounded-full border",
                        isActive ? "border-accent/30" : "border-cream/15",
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* progress */}
      <div className="border-t border-white/10 px-3 py-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
          <div className="flex items-center gap-3">
            <ProgressRing value={completed.length} total={chapters.length} dark size={38} />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[7.5px] uppercase tracking-[0.16em] text-cream/35">your progress</p>
              <p className="mt-0.5 text-[10.5px] text-cream/70">
                {completed.length} of {chapters.length} chapters
              </p>
            </div>
            <span className="font-mono text-[9px] tabular-nums text-cream/35">{percent}%</span>
          </div>
          <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* authors */}
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex -space-x-1.5">
            <span className="flex size-5 items-center justify-center rounded-full border border-charcoal bg-accent-soft font-display text-[9px] text-accent-deep">
              K
            </span>
            <span className="flex size-5 items-center justify-center rounded-full border border-charcoal bg-sage-soft font-display text-[9px] text-sage">
              A
            </span>
          </span>
          <div className="min-w-0">
            <p className="truncate text-[9px] text-cream/55">{authors}</p>
            <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-cream/25">notes · edition 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
