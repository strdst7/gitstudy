import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, Check, ChevronRight, Clock, Menu, Search } from "lucide-react";
import Sidebar from "./components/Sidebar";
import SearchPalette from "./components/SearchPalette";
import { CheatSheetChapter, QuizChapter } from "./components/chapters/Reference";
import { Architecture, Orientation, WhyGit } from "./components/chapters/Foundations";
import { HistoryAndDiffs, Setup, Undo } from "./components/chapters/Practice";
import { Branching, Remotes } from "./components/chapters/Collaboration";
import { chapters, getChapter, neighborChapters, type ChapterId } from "./lib/guide";
import { Pill } from "./components/ui";
import { cn } from "./utils/cn";

const COMPLETED_KEY = "gitguide.completed.v1";

function loadCompleted(): ChapterId[] {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is ChapterId => chapters.some((chapter) => chapter.id === id));
  } catch {
    return [];
  }
}

function initialChapter(): ChapterId {
  const hash = window.location.hash.replace("#", "");
  return chapters.some((chapter) => chapter.id === hash) ? (hash as ChapterId) : "orientation";
}

function ChapterContent({
  id,
  onNavigate,
}: {
  id: ChapterId;
  onNavigate: (chapter: ChapterId, section?: string) => void;
}) {
  switch (id) {
    case "orientation":
      return <Orientation onNavigate={onNavigate} />;
    case "why":
      return <WhyGit onNavigate={onNavigate} />;
    case "architecture":
      return <Architecture />;
    case "setup":
      return <Setup />;
    case "history":
      return <HistoryAndDiffs />;
    case "undo":
      return <Undo />;
    case "branching":
      return <Branching />;
    case "remotes":
      return <Remotes />;
    case "cheatsheet":
      return <CheatSheetChapter onNavigate={onNavigate} />;
    case "quiz":
      return <QuizChapter onNavigate={onNavigate} />;
    default:
      return null;
  }
}

export default function App() {
  const [activeId, setActiveId] = useState<ChapterId>(initialChapter);
  const [completed, setCompleted] = useState<ChapterId[]>(loadCompleted);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const scrollTimer = useRef<number | undefined>(undefined);

  const active = getChapter(activeId);
  const { previous, next } = neighborChapters(activeId);
  const isDone = completed.includes(activeId);
  const progress = Math.round((completed.length / chapters.length) * 100);

  const navigate = (chapter: ChapterId, section?: string) => {
    const changed = chapter !== activeId;
    setActiveId(chapter);
    setMobileOpen(false);
    if (changed) {
      window.history.pushState(null, "", `#${chapter}`);
    } else {
      window.history.replaceState(null, "", `#${chapter}`);
    }
    window.clearTimeout(scrollTimer.current);

    if (section) {
      scrollTimer.current = window.setTimeout(
        () => {
          document.getElementById(section)?.scrollIntoView({
            behavior: changed ? "auto" : "smooth",
            block: "start",
          });
        },
        changed ? 200 : 10,
      );
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const toggleComplete = (chapter: ChapterId) => {
    setCompleted((current) =>
      current.includes(chapter) ? current.filter((id) => id !== chapter) : [...current, chapter],
    );
  };

  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
    } catch {
      /* storage unavailable */
    }
  }, [completed]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.title = activeId === "orientation" ? "Git Study Guide" : `${active.title} · Git Study Guide`;
  }, [active.title, activeId]);

  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash.replace("#", "");
      const match = chapters.find((chapter) => chapter.id === hash);
      setActiveId(match ? match.id : "orientation");
      setMobileOpen(false);
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    window.clearTimeout(scrollTimer.current);
    setActiveSection(active.sections[0]?.id ?? "");
    const elements = active.sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -62% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const completeButton = (variant: "full" | "compact" = "full") => (
    <button
      onClick={() => toggleComplete(activeId)}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md border font-mono transition",
        variant === "full" ? "w-full px-2.5 py-2 text-[10px]" : "px-3 py-2 text-[10.5px]",
        isDone
          ? "border-sage/40 bg-sage-soft text-sage hover:border-sage hover:bg-sage hover:text-paper-soft"
          : "border-line-strong bg-paper-soft text-ink-soft hover:border-ink/40 hover:text-ink",
      )}
    >
      <Check className="size-3" strokeWidth={2.4} />
      {isDone ? "Completed · undo" : "Mark complete"}
    </button>
  );

  return (
    <div className="min-h-screen bg-paper">
      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] lg:block">
        <Sidebar activeId={activeId} completed={completed} onNavigate={navigate} onOpenSearch={() => setSearchOpen(true)} />
      </aside>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            className="absolute inset-0 animate-fade-in bg-ink/45 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-[286px] animate-fade-in shadow-2xl">
            <Sidebar
              activeId={activeId}
              completed={completed}
              onNavigate={navigate}
              onOpenSearch={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              onClose={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="lg:pl-[272px]">
        {/* top bar */}
        <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
          <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="flex size-8 items-center justify-center rounded-md border border-line-strong bg-paper-soft text-ink-soft transition hover:border-ink/40 lg:hidden"
            >
              <Menu className="size-4" />
            </button>
            <button onClick={() => navigate("orientation")} className="font-display text-[20px] leading-none text-ink lg:hidden">
              git study
            </button>

            <div className="hidden min-w-0 items-center gap-1.5 lg:flex">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-faint">guide</span>
              <ChevronRight className="size-3 text-line-strong" />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-muted">{active.group}</span>
              <ChevronRight className="size-3 text-line-strong" />
              <span className="truncate text-[11.5px] font-medium text-ink">{active.title}</span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden items-center gap-2 sm:flex">
                <span className="hidden h-[3px] w-16 overflow-hidden rounded-full bg-line md:block">
                  <span
                    className="block h-full rounded-full bg-accent transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </span>
                <span className="font-mono text-[9px] tabular-nums text-muted">
                  {completed.length}/{chapters.length}
                </span>
              </div>
              <span className="hidden h-4 w-px bg-line sm:block" />
              <button
                onClick={() => setSearchOpen(true)}
                className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-paper-soft px-2.5 py-1.5 text-muted transition hover:border-ink/40 hover:text-ink"
                aria-label="Search the guide"
              >
                <Search className="size-3.5" />
                <span className="hidden text-[10.5px] sm:inline">Search</span>
                <kbd className="hidden rounded border border-line bg-paper px-1 py-px font-mono text-[8px] text-faint md:inline">
                  ⌘K
                </kbd>
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1180px] px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_218px]">
            <article className="min-w-0 pb-2 pt-6 sm:pt-8">
              {activeId !== "orientation" && (
                <header className="mb-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
                      chapter {active.num}
                    </span>
                    <span className="h-3 w-px bg-line" />
                    <Pill tone="outline" className="px-2 py-0.5 text-[8.5px]">
                      {active.group}
                    </Pill>
                    {isDone && (
                      <Pill tone="sage" className="px-2 py-0.5 text-[8.5px]">
                        <Check className="size-2.5" /> complete
                      </Pill>
                    )}
                    <span className="ml-auto flex items-center gap-1 font-mono text-[9px] text-muted">
                      <Clock className="size-2.5" /> {active.minutes} min read
                    </span>
                  </div>
                  <h1 className="mt-3 font-display text-[38px] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[45px]">
                    {active.title}
                  </h1>
                  <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted sm:text-[14px]">{active.deck}</p>

                  {active.sections.length > 1 && (
                    <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 xl:hidden">
                      {active.sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => navigate(activeId, section.id)}
                          className="shrink-0 rounded-full border border-line bg-paper-soft px-2.5 py-1 font-mono text-[9px] text-muted transition hover:border-line-strong hover:text-ink"
                        >
                          {section.label}
                        </button>
                      ))}
                    </div>
                  )}
                </header>
              )}

              <div key={activeId} className="animate-fade-up">
                <ChapterContent id={activeId} onNavigate={navigate} />
              </div>

              {/* completion */}
              <div className="mt-10 flex flex-col gap-3 rounded-xl border border-line bg-paper-soft p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border",
                      isDone ? "border-sage/30 bg-sage text-paper-soft" : "border-line bg-paper text-muted",
                    )}
                  >
                    <Check className="size-4" strokeWidth={2.4} />
                  </span>
                  <div>
                    <p className="text-[12.5px] font-semibold text-ink">
                      {isDone ? "Nice — this chapter is complete." : "Finished this chapter?"}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                      Progress is saved in your browser, so the sidebar remembers where you have been.
                    </p>
                  </div>
                </div>
                <div className="shrink-0">{completeButton("compact")}</div>
              </div>

              {/* prev / next */}
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {previous ? (
                  <button
                    onClick={() => navigate(previous.id)}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-paper-soft px-4 py-3 text-left transition hover:border-line-strong hover:bg-paper-deep/30"
                  >
                    <ArrowLeft className="size-4 shrink-0 text-muted transition group-hover:-translate-x-0.5 group-hover:text-ink" />
                    <span className="min-w-0">
                      <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-faint">previous</span>
                      <span className="block truncate text-[12px] font-medium text-ink">{previous.title}</span>
                    </span>
                  </button>
                ) : (
                  <div className="hidden rounded-xl border border-dashed border-line sm:block" />
                )}
                {next ? (
                  <button
                    onClick={() => navigate(next.id)}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-ink bg-ink px-4 py-3 text-left transition hover:bg-charcoal-soft"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-cream/40">up next</span>
                      <span className="block truncate text-[12px] font-medium text-cream">{next.title}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-cream/60 transition group-hover:translate-x-0.5 group-hover:text-cream" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("orientation")}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-ink bg-ink px-4 py-3 text-left transition hover:bg-charcoal-soft"
                  >
                    <span>
                      <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-cream/40">you finished</span>
                      <span className="block text-[12px] font-medium text-cream">Back to the beginning</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-cream/60 transition group-hover:translate-x-0.5 group-hover:text-cream" />
                  </button>
                )}
              </div>

              <footer className="mt-10 flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] text-muted">
                    Git Study Guide · <span className="text-ink-soft">KDherstacks · aimirah. miii</span>
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
                    built for studying, not memorising
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper-soft px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-muted transition hover:border-line-strong hover:text-ink"
                  >
                    <ArrowUp className="size-3" /> top
                  </button>
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">edition 2026</span>
                </div>
              </footer>
            </article>

            {/* reading rail */}
            <aside className="hidden xl:block">
              <div className="sticky top-[76px] space-y-4 py-8">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-faint">on this page</p>
                  <nav className="mt-2 space-y-px border-l border-line">
                    {active.sections.map((section) => {
                      const current = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => navigate(activeId, section.id)}
                          className={cn(
                            "-ml-px block w-full border-l-2 py-1.5 pl-3 text-left text-[10.5px] leading-snug transition",
                            current
                              ? "border-accent font-medium text-ink"
                              : "border-transparent text-muted hover:border-line-strong hover:text-ink",
                          )}
                        >
                          {section.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="rounded-lg border border-line bg-paper-soft p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">chapter</span>
                    <span className="font-mono text-[8px] tabular-nums text-faint">
                      {active.num} / {chapters.length}
                    </span>
                  </div>
                  <p className="mt-1 font-display text-[20px] leading-tight text-ink">{active.shortTitle}</p>
                  <div className="mt-1 flex items-center gap-1 font-mono text-[8.5px] text-muted">
                    <Clock className="size-2.5" /> {active.minutes} min · {active.sections.length} sections
                  </div>
                  <div className="mt-2.5">{completeButton()}</div>
                </div>

                <div className="rounded-lg border border-dashed border-line-strong p-3">
                  <div className="flex items-center gap-1.5">
                    <Search className="size-3 text-accent" />
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">find a command</p>
                  </div>
                  <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted">
                    Jump anywhere in the guide from the keyboard.
                  </p>
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="mt-2 flex w-full items-center justify-between rounded border border-line bg-paper px-2 py-1.5 font-mono text-[9px] text-ink-soft transition hover:border-line-strong"
                  >
                    open search
                    <span className="rounded border border-line px-1 py-px text-[8px] text-faint">⌘K</span>
                  </button>
                </div>

                <div className="flex items-center justify-between px-1">
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">progress</span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-[3px] w-16 overflow-hidden rounded-full bg-line">
                      <span
                        className="block h-full rounded-full bg-accent transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </span>
                    <span className="font-mono text-[8.5px] tabular-nums text-muted">{progress}%</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} />
    </div>
  );
}


