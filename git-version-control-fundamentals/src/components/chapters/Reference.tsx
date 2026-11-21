import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import { BodyText, Callout, CodeBlock, DataTable, InlineCode, SectionHeading } from "../ui";
import CheatSheet from "../CheatSheet";
import Quiz from "../Quiz";
import type { ChapterId } from "../../lib/guide";

export function CheatSheetChapter({ onNavigate }: { onNavigate: (chapter: ChapterId, section?: string) => void }) {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <SectionHeading id="aliases" num="09.1" title="Aliases" kicker="shortcuts that stick" />
        <BodyText>
          An alias is a shortcut for a Git command, stored in your global configuration. Type less, make fewer typos, and
          keep your most-used flags consistent.
        </BodyText>
        <CodeBlock
          code={`git config --global alias.st "status -s"      # create\ngit config --global --get-regexp alias       # see all aliases\ngit config --global --unset alias.st         # remove`}
          caption="Quote the command if it contains a space. Aliases do not replace the original command — they are extra names."
        />
        <DataTable
          columns={["Alias", "Command it saves"]}
          rows={[
            [<InlineCode>st</InlineCode>, <InlineCode>status -s</InlineCode>],
            [<InlineCode>lg</InlineCode>, <InlineCode>log --oneline --graph --decorate</InlineCode>],
            [<InlineCode>unstage</InlineCode>, <InlineCode>restore --staged</InlineCode>],
            [<InlineCode>last</InlineCode>, <InlineCode>log -1 HEAD</InlineCode>],
          ]}
        />
        <Callout variant="tip" title="Set up four, use them forever">
          Pick a small set of aliases and actually learn them. A global alias lives in{" "}
          <InlineCode>~/.gitconfig</InlineCode>, so it follows you into every repository on the machine.
        </Callout>
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper-soft p-3">
          <Terminal className="size-3.5 shrink-0 text-accent" />
          <p className="text-[12px] text-ink-soft">Looking for a command you saw earlier?</p>
          <button
            onClick={() => onNavigate("architecture", "staging-lab")}
            className="ml-auto inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wider text-accent hover:text-accent-deep"
          >
            practice in the lab <ArrowRight className="size-3" />
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="commands" num="09.2" title="Command index" kicker="search · copy · use" />
        <BodyText>
          Every command in the guide, grouped by the job it does. Filter by word or flag, then copy what you need. This is
          a reference, not a reading list — come back when your hands are on the keyboard.
        </BodyText>
        <CheatSheet />
      </section>
    </div>
  );
}

export function QuizChapter({ onNavigate }: { onNavigate: (chapter: ChapterId, section?: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl border border-line bg-paper-soft p-4">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Sparkles className="size-4" />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-ink">Answer out loud before you flip the card.</p>
          <p className="mt-1 text-[12px] leading-relaxed text-muted">
            Seventeen questions cover the whole guide. Mark a card “got it” only when you can explain the answer without
            looking. Every answer includes a link back to the exact section.
          </p>
        </div>
      </div>
      <Quiz onNavigate={onNavigate} />
      <Callout variant="note" title="If you scored low, that is useful information">
        Reread the chapter linked from the question, then return to the deck. The questions map one-to-one onto the
        sections — nothing here is a trick.
      </Callout>
    </div>
  );
}
