import { useState } from "react";
import { Fingerprint, Equal, EqualNot } from "lucide-react";
import { sha1 } from "../lib/sha1";
import { cn } from "../utils/cn";

function Digest({ value }: { value: string }) {
  return (
    <p className="mt-1.5 break-all font-mono text-[10.5px] leading-relaxed tracking-[0.04em]">
      <span className="text-accent">{value.slice(0, 8)}</span>
      <span className="text-ink-soft">{value.slice(8, 16)}</span>
      <span className="text-sage">{value.slice(16, 24)}</span>
      <span className="text-ink-soft">{value.slice(24, 32)}</span>
      <span className="text-accent">{value.slice(32)}</span>
    </p>
  );
}

const PRESETS = ["hello", "hello!", "git", ""];

export default function HashLab() {
  const [a, setA] = useState("hello");
  const [b, setB] = useState("hello!");

  const hashA = sha1(a);
  const hashB = sha1(b);
  const same = hashA === hashB;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper-soft">
      <div className="flex items-center justify-between border-b border-line bg-paper-deep/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Fingerprint className="size-3.5 text-accent" />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">hash playground</span>
        </div>
        <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-faint">SHA-1</span>
      </div>

      <div className="p-4">
        <div className="grid gap-2.5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="rounded-lg border border-line bg-paper p-3">
            <label htmlFor="hash-a" className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
              input a
            </label>
            <input
              id="hash-a"
              value={a}
              onChange={(event) => setA(event.target.value)}
              placeholder="type something…"
              className="mt-1 w-full border-0 border-b border-line bg-transparent pb-1 font-mono text-[12px] text-ink outline-none placeholder:text-faint focus:border-accent"
            />
            <Digest value={hashA} />
          </div>

          <div
            className={cn(
              "mx-auto hidden size-7 items-center justify-center rounded-full border sm:flex",
              same ? "border-sage/30 bg-sage-soft text-sage" : "border-accent/25 bg-accent-soft text-accent",
            )}
          >
            {same ? <Equal className="size-3.5" /> : <EqualNot className="size-3.5" />}
          </div>

          <div className="rounded-lg border border-line bg-paper p-3">
            <label htmlFor="hash-b" className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
              input b
            </label>
            <input
              id="hash-b"
              value={b}
              onChange={(event) => setB(event.target.value)}
              placeholder="type something…"
              className="mt-1 w-full border-0 border-b border-line bg-transparent pb-1 font-mono text-[12px] text-ink outline-none placeholder:text-faint focus:border-accent"
            />
            <Digest value={hashB} />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.1em] text-faint">try</span>
          {PRESETS.map((preset) => (
            <button
              key={preset || "empty"}
              onClick={() => setB(preset)}
              className={cn(
                "rounded border px-2 py-1 font-mono text-[9.5px] transition",
                b === preset
                  ? "border-accent/40 bg-accent-soft text-accent-deep"
                  : "border-line bg-paper text-muted hover:border-line-strong hover:text-ink",
              )}
            >
              {preset === "" ? "empty" : preset}
            </button>
          ))}
          <span className="ml-auto font-mono text-[9px] text-muted">
            {same ? "same content → same ID" : "1 character → entirely new ID"}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-2.5 font-mono text-[9.5px] text-faint">
          <span className="text-ink-soft">content</span>
          <span>→</span>
          <span className="text-accent">f(x)</span>
          <span>→</span>
          <span className="text-ink-soft">40 hex characters</span>
          <span className="text-line-strong">·</span>
          <span>the key property: deterministic, collision-resistant</span>
        </div>
      </div>
    </div>
  );
}
