import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, Eye, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { quizQuestions, type ChapterId } from "../lib/guide";
import { cn } from "../utils/cn";

const STORAGE_KEY = "gitguide.quiz.v1";

function loadKnown(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "number") : [];
  } catch {
    return [];
  }
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") && part.length > 2 ? (
          <code key={index} className="inline-code">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

export default function Quiz({ onNavigate }: { onNavigate: (chapter: ChapterId, section?: string) => void }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState<number[]>(loadKnown);
  const [finished, setFinished] = useState(false);
  const [keyOpen, setKeyOpen] = useState<number[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(known));
    } catch {
      /* storage may be unavailable */
    }
  }, [known]);

  const current = quizQuestions[index];
  const progress = ((index + (finished ? 1 : 0)) / quizQuestions.length) * 100;

  const grade = (gotIt: boolean) => {
    if (gotIt && !known.includes(current.id)) {
      setKnown((values) => [...values, current.id]);
    }
    if (!gotIt) {
      setKnown((values) => values.filter((value) => value !== current.id));
    }
    if (index + 1 >= quizQuestions.length) {
      setFinished(true);
    } else {
      setIndex(index + 1);
    }
    setRevealed(false);
  };

  const jumpTo = (target: number) => {
    setIndex(target);
    setRevealed(false);
    setFinished(false);
  };

  return (
    <div>
      {/* deck */}
      <div id="deck" className="scroll-mt-28">
        <div className="overflow-hidden rounded-2xl border border-line-strong/80 bg-paper-soft shadow-[0_10px_30px_-24px_rgba(28,27,22,0.5)]">
          <div className="flex items-center justify-between gap-3 border-b border-line bg-paper-deep/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-accent" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">flashcard deck</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9.5px] text-muted">
                {finished ? quizQuestions.length : index + 1} / {quizQuestions.length}
              </span>
              <span className="h-1 w-16 overflow-hidden rounded-full bg-line sm:w-24">
                <span
                  className="block h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${finished ? 100 : progress}%` }}
                />
              </span>
            </div>
          </div>

          {finished ? (
            <div className="px-5 py-10 text-center sm:px-8">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Trophy className="size-5" />
              </span>
              <p className="mt-4 font-display text-[30px] leading-tight text-ink">Deck complete.</p>
              <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-muted">
                You marked <span className="font-medium text-ink">{known.length} of {quizQuestions.length}</span> answers as
                solid. Review the ones that felt shaky, then run the deck again.
              </p>
              <div className="mx-auto mt-4 flex max-w-xs gap-2">
                <div className="flex-1 rounded-lg border border-sage/25 bg-sage-soft/50 px-3 py-2">
                  <p className="font-display text-2xl text-sage">{known.length}</p>
                  <p className="font-mono text-[8px] uppercase tracking-wider text-sage/80">got it</p>
                </div>
                <div className="flex-1 rounded-lg border border-amber/25 bg-[#f4e8d2] px-3 py-2">
                  <p className="font-display text-2xl text-[#8a611b]">{quizQuestions.length - known.length}</p>
                  <p className="font-mono text-[8px] uppercase tracking-wider text-[#8a611b]/80">to review</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setIndex(0);
                    setFinished(false);
                    setRevealed(false);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md border border-ink bg-ink px-3 py-2 font-mono text-[10.5px] text-cream transition hover:bg-charcoal-soft"
                >
                  <RotateCcw className="size-3" /> run deck again
                </button>
                <button
                  onClick={() => {
                    setKnown([]);
                    setIndex(0);
                    setFinished(false);
                    setRevealed(false);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-paper px-3 py-2 font-mono text-[10.5px] text-ink-soft transition hover:border-ink/40"
                >
                  clear score
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full border border-line bg-paper px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted">
                  {current.tag}
                </span>
                <button
                  onClick={() => onNavigate(current.chapter, current.section)}
                  className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-accent transition hover:text-accent-deep"
                >
                  read the chapter <ArrowRight className="size-3" />
                </button>
              </div>

              <p className="font-display text-[23px] leading-[1.25] text-ink sm:text-[27px]">
                <RichText text={current.prompt} />
              </p>

              {revealed ? (
                <div className="mt-4 animate-fade-up rounded-lg border border-line bg-paper p-4">
                  <p className="mb-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-sage">answer</p>
                  <p className="text-[13.5px] leading-[1.75] text-ink-soft">
                    <RichText text={current.answer} />
                  </p>
                </div>
              ) : (
                <div className="mt-4 flex min-h-20 items-center justify-center rounded-lg border border-dashed border-line-strong bg-paper/60 px-4 py-6">
                  <p className="max-w-xs text-center text-[12px] leading-relaxed text-faint">
                    Answer it out loud first — then flip the card.
                  </p>
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {!revealed ? (
                  <button
                    onClick={() => setRevealed(true)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-ink bg-ink px-3 py-2 font-mono text-[10.5px] text-cream transition hover:bg-charcoal-soft"
                  >
                    <Eye className="size-3" /> reveal answer
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => grade(true)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-sage bg-sage px-3 py-2 font-mono text-[10.5px] text-paper-soft transition hover:bg-[#56694d]"
                    >
                      <Check className="size-3" /> got it
                    </button>
                    <button
                      onClick={() => grade(false)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-paper px-3 py-2 font-mono text-[10.5px] text-ink-soft transition hover:border-amber/50 hover:text-ink"
                    >
                      <RotateCcw className="size-3" /> review again
                    </button>
                  </>
                )}
                <span className="ml-auto font-mono text-[9px] text-faint">
                  {known.length} marked solid
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1 border-t border-line pt-3">
                {quizQuestions.map((question, questionIndex) => (
                  <button
                    key={question.id}
                    onClick={() => jumpTo(questionIndex)}
                    aria-label={`Go to question ${question.id}`}
                    aria-current={questionIndex === index ? "step" : undefined}
                    className={cn(
                      "size-5 rounded font-mono text-[8px] transition",
                      questionIndex === index
                        ? "bg-accent text-paper-soft"
                        : known.includes(question.id)
                          ? "bg-sage-soft text-sage hover:bg-sage hover:text-paper-soft"
                          : "bg-paper-deep text-faint hover:bg-line",
                    )}
                  >
                    {question.id}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* answer key */}
      <div id="key" className="mt-8 scroll-mt-28">
        <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-line pb-2.5">
          <h3 className="font-display text-[24px] leading-tight text-ink">Answer key</h3>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
            {quizQuestions.length} questions
          </span>
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-paper-soft">
          {quizQuestions.map((question) => {
            const open = keyOpen.includes(question.id);
            return (
              <div key={question.id} className="border-b border-line/70 last:border-0">
                <button
                  onClick={() =>
                    setKeyOpen((values) =>
                      values.includes(question.id)
                        ? values.filter((value) => value !== question.id)
                        : [...values, question.id],
                    )
                  }
                  aria-expanded={open}
                  className="flex w-full items-start gap-3 px-3.5 py-3 text-left transition hover:bg-paper-deep/30"
                >
                  <span className="mt-0.5 w-5 shrink-0 font-mono text-[9.5px] text-accent">
                    {String(question.id).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-[12.5px] leading-snug text-ink">
                    <RichText text={question.prompt} />
                  </span>
                  <ChevronDown
                    className={cn("mt-0.5 size-3.5 shrink-0 text-muted transition-transform", open && "rotate-180")}
                  />
                </button>
                {open && (
                  <div className="animate-fade-up border-t border-line/60 bg-paper px-3.5 py-3 pl-11">
                    <p className="text-[12.5px] leading-[1.75] text-ink-soft">
                      <RichText text={question.answer} />
                    </p>
                    <button
                      onClick={() => onNavigate(question.chapter, question.section)}
                      className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-accent hover:text-accent-deep"
                    >
                      review in context <ArrowRight className="size-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
