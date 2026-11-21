import {
  ArrowRight,
  BookOpen,
  Boxes,
  Clock,
  CloudOff,
  FolderTree,
  GitBranch,
  Globe,
  HardDrive,
  Hash,
  History as HistoryIcon,
  Layers,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import {
  BodyText,
  Callout,
  CodeBlock,
  DataTable,
  DotList,
  InlineCode,
  Pill,
  SectionHeading,
  ThreeTreesMini,
} from "../ui";
import StagingLab from "../StagingLab";
import HashLab from "../HashLab";
import { authors, chapters, guideStats, type ChapterId } from "../../lib/guide";

/* ------------------------------------------------------------------ */
/* Orientation                                                         */
/* ------------------------------------------------------------------ */

function HeroArt() {
  return (
    <div className="relative mx-auto w-full max-w-[330px] lg:mx-0">
      <div className="relative overflow-hidden rounded-2xl border border-charcoal/80 bg-charcoal shadow-[0_24px_50px_-30px_rgba(28,27,22,0.7)]">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <GitBranch className="size-3.5 text-accent" />
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream/40">~/study-guide</span>
          </div>
          <div className="flex gap-1.5">
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
          </div>
        </div>
        <div className="px-4 py-4 font-mono text-[10.5px] leading-[1.9]">
          <p className="text-cream/45">git log --oneline --graph</p>
          <div className="mt-2 space-y-1.5">
            {[
              { hash: "a91f2c0", msg: "add the staging lab", tag: "HEAD → master" },
              { hash: "7d04be1", msg: "explain the three trees" },
              { hash: "3c8e112", msg: "notes on hashing" },
              { hash: "0f21bd4", msg: "initial commit" },
            ].map((commit, index) => (
              <div key={commit.hash} className="flex items-center gap-2">
                <span className="w-3 text-center text-cream/25">{index === 0 ? "●" : "○"}</span>
                <span className="text-accent">{commit.hash}</span>
                <span className="min-w-0 flex-1 truncate text-cream/75">{commit.msg}</span>
                {commit.tag && <span className="hidden text-[8px] text-sage sm:inline">{commit.tag}</span>}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-white/8 pt-2.5">
            <span className="text-accent">$</span>
            <span className="text-cream/70">git status -s</span>
            <span className="ml-auto inline-block h-3 w-1.5 animate-pulse bg-cream/40" />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-3 rotate-[-3deg] rounded-lg border border-line bg-paper px-3 py-2 shadow-[0_8px_20px_-12px_rgba(28,27,22,0.4)] sm:-left-6">
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">index</p>
        <p className="mt-0.5 text-[11px] font-medium text-ink">3 changes staged</p>
        <div className="mt-1.5 flex gap-1">
          <span className="h-1 w-10 rounded-full bg-accent" />
          <span className="h-1 w-4 rounded-full bg-line" />
        </div>
      </div>

      <div className="absolute -right-2 -top-4 rotate-2 rounded-full border border-line bg-paper-soft px-2.5 py-1 shadow-[0_6px_16px_-10px_rgba(28,27,22,0.4)] sm:-right-4">
        <span className="flex items-center gap-1 font-mono text-[9px] text-ink-soft">
          <Hash className="size-2.5 text-accent" /> SHA-1
        </span>
      </div>
    </div>
  );
}

export function Orientation({ onNavigate }: { onNavigate: (chapter: ChapterId, section?: string) => void }) {
  return (
    <div className="space-y-11">
      {/* hero */}
      <div className="animate-fade-up">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="outline">
            <span className="size-1 rounded-full bg-accent" /> Git Study Guide
          </Pill>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">edition 2026</span>
        </div>
        <div className="mt-4 grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <h1 className="font-display text-[46px] leading-[0.96] tracking-[-0.025em] text-ink sm:text-[56px]">
              Git, from first commit <span className="italic text-accent">to fork.</span>
            </h1>
            <p className="mt-4 max-w-lg text-[14.5px] leading-[1.75] text-ink-soft">
              A complete field guide to version control: the three trees, the objects underneath, and the commands you
              will actually type. Learn the model once, and undoing anything stops being scary.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onNavigate("why")}
                className="group inline-flex items-center gap-2 rounded-md border border-ink bg-ink px-3.5 py-2.5 font-mono text-[11px] text-cream transition hover:bg-charcoal-soft"
              >
                Start reading
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => onNavigate("architecture", "staging-lab")}
                className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-paper-soft px-3.5 py-2.5 font-mono text-[11px] text-ink-soft transition hover:border-ink/40"
              >
                <Terminal className="size-3.5 text-accent" /> Open the staging lab
              </button>
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-line pt-3.5">
              <span className="flex size-6 items-center justify-center rounded-full bg-accent-soft font-display text-[11px] text-accent-deep">
                K
              </span>
              <span className="flex size-6 items-center justify-center rounded-full bg-sage-soft font-display text-[11px] text-sage">
                A
              </span>
              <p className="text-[11px] text-muted">
                Built from notes by <span className="text-ink-soft">{authors}</span>
              </p>
            </div>
          </div>
          <HeroArt />
        </div>

        <div className="mt-10 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-paper-soft py-4">
          {[
            { value: String(guideStats.chapters).padStart(2, "0"), label: "chapters" },
            { value: String(guideStats.commands), label: "commands" },
            { value: String(guideStats.questions), label: "self-test questions" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 text-center sm:px-5">
              <p className="font-display text-[26px] leading-none text-ink sm:text-[30px]">{stat.value}</p>
              <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-4">
        <SectionHeading id="start-here" num="01.1" title="Start here" kicker="how to use this guide" />
        <BodyText>
          This guide is built to be read in short sittings. Every chapter follows the same rhythm: a plain-language model,
          the exact commands, and the edge cases that usually cause trouble. Diagrams and labs are interactive — use them.
        </BodyText>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              step: "read",
              title: "One chapter at a time",
              text: "Six to nine minutes each. Mark it complete when the model clicks.",
            },
            {
              icon: Layers,
              step: "play",
              title: "Move real files",
              text: "The staging lab lets you add, commit, unstage and restore.",
            },
            {
              icon: Sparkles,
              step: "test",
              title: "Close the loop",
              text: "Seventeen flashcard questions with a review link on every answer.",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-xl border border-line bg-paper-soft p-3.5">
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded-md bg-paper-deep text-accent">
                  <item.icon className="size-3.5" />
                </span>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint">{item.step}</span>
              </div>
              <p className="mt-2.5 text-[12.5px] font-semibold text-ink">{item.title}</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="mental-model" num="01.2" title="The mental model" kicker="one diagram, three trees" />
        <BodyText>
          Git is a distributed version control system. A change travels from your working directory, into the staging area
          (the index), and finally into the repository as a commit. Almost every command in this guide moves data between
          those three places — or inspects the difference between them.
        </BodyText>
        <div className="rounded-xl border border-line bg-paper-deep/30 p-4 sm:p-5">
          <ThreeTreesMini />
          <div className="mt-4 flex flex-col justify-between gap-2 border-t border-line pt-3 sm:flex-row sm:items-center">
            <p className="font-mono text-[10px] text-muted">
              working dir <span className="text-accent">--git add--&gt;</span> index{" "}
              <span className="text-accent">--git commit--&gt;</span> repo (.git)
            </p>
            <button
              onClick={() => onNavigate("architecture")}
              className="inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wider text-accent hover:text-accent-deep"
            >
              go deeper <ArrowRight className="size-3" />
            </button>
          </div>
        </div>
        <Callout variant="quote" title="The sentence worth memorising">
          Every change moves from the working directory to the staging area to the repository. If you know which tree a
          file is in, you know which command to use.
        </Callout>
      </section>

      <section className="space-y-4">
        <SectionHeading id="inside-guide" num="01.3" title="Inside the guide" kicker="four parts, ten chapters" />
        <div className="overflow-hidden rounded-xl border border-line bg-paper-soft">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onNavigate(chapter.id)}
              className="group flex w-full items-center gap-3 border-b border-line/70 px-3.5 py-2.5 text-left transition last:border-0 hover:bg-paper-deep/40"
            >
              <span className="w-6 shrink-0 font-mono text-[9.5px] text-faint transition group-hover:text-accent">
                {chapter.num}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-medium text-ink">{chapter.title}</span>
                <span className="block truncate text-[10.5px] text-muted">{chapter.deck}</span>
              </span>
              <span className="hidden shrink-0 font-mono text-[8.5px] uppercase tracking-wider text-faint sm:block">
                {chapter.group}
              </span>
              <span className="flex shrink-0 items-center gap-1 font-mono text-[8.5px] text-faint">
                <Clock className="size-2.5" /> {chapter.minutes}m
              </span>
              <ArrowRight className="size-3 shrink-0 text-line-strong transition group-hover:translate-x-0.5 group-hover:text-accent" />
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="about" num="01.4" title="About this guide" kicker="colophon" />
        <div className="rounded-xl border border-line bg-paper-soft p-4 sm:p-5">
          <p className="font-display text-[21px] italic leading-snug text-ink-soft">
            “Version control is a tool that tracks every version of your files — so you never keep a pile of folders
            called final, final2, final_v3.”
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
            <p className="text-[11.5px] text-muted">
              Adapted from the study notes of <span className="font-medium text-ink-soft">{authors}</span>.
            </p>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
              {guideStats.chapters} chapters · {guideStats.questions} questions
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Why Git                                                             */
/* ------------------------------------------------------------------ */

export function WhyGit({ onNavigate }: { onNavigate: (chapter: ChapterId, section?: string) => void }) {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <SectionHeading id="problem" num="02.1" title="The problem it solves" kicker="why bother" />
        <BodyText>
          A <strong className="font-semibold text-ink">version control system (VCS)</strong> tracks every version of your
          files. Without one, every update produces another folder: <InlineCode>final</InlineCode>,{" "}
          <InlineCode>final2</InlineCode>, <InlineCode>final_v3</InlineCode>. Nothing tells you what changed, which copy is
          current, or how to get yesterday's version back.
        </BodyText>
        <BodyText>
          The problem grows the moment a team touches the same files. A VCS gives everyone the same history, a record of
          who changed what, and a safe way to combine work. That is why it is considered essential rather than optional.
        </BodyText>
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper-soft p-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">before</span>
          {["project-final", "project-final2", "project-FINAL-v3", "project-final (copy)"].map((folder) => (
            <span key={folder} className="rounded border border-line bg-paper px-2 py-1 font-mono text-[10px] text-muted line-through decoration-accent/50">
              {folder}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[9.5px] text-sage">
            <CheckMark /> one repo, full history
          </span>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="history" num="02.2" title="A short history" kicker="April 7, 2005" />
        <div className="grid gap-2.5 sm:grid-cols-[1fr_1.4fr]">
          <div className="rounded-xl border border-line bg-paper-soft p-4">
            <div className="flex items-center justify-between">
              <Users className="size-4 text-accent" />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-faint">creator</span>
            </div>
            <p className="mt-2 font-display text-[25px] leading-tight text-ink">Linus Torvalds</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
              Creator of Linux. He built Git to handle version updates on an open-source project with thousands of
              contributors.
            </p>
          </div>
          <div className="relative rounded-xl border border-line bg-paper-deep/30 p-4">
            <div className="absolute bottom-5 left-[19px] top-5 w-px bg-line-strong" />
            <div className="space-y-4">
              {[
                { year: "1991", title: "Linux begins", text: "An open-source kernel starts collecting contributions." },
                { year: "2005", title: "Git launches", text: "Released on April 7 to manage the Linux project's history." },
                { year: "today", title: "Everywhere", text: "Git is the standard distributed VCS, hosted on GitHub and beyond." },
              ].map((event) => (
                <div key={event.year} className="relative flex gap-3">
                  <span className="z-10 mt-0.5 flex size-[9px] shrink-0 items-center justify-center rounded-full border-2 border-accent bg-paper" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent">{event.year}</p>
                    <p className="text-[12px] font-medium text-ink">{event.title}</p>
                    <p className="text-[11px] leading-relaxed text-muted">{event.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="types" num="02.3" title="Three kinds of VCS" kicker="where history lives" />
        <div className="grid gap-2.5 sm:grid-cols-3">
          {[
            {
              icon: HardDrive,
              name: "Local",
              text: "Versions are kept on one machine. Simple, but the history lives and dies with that disk.",
              tone: "plain",
            },
            {
              icon: Globe,
              name: "Central",
              text: "One central server holds the history. Everyone needs the network to work.",
              tone: "plain",
            },
            {
              icon: CloudOff,
              name: "Distributed",
              text: "Every user holds a full copy of the history. This is Git — and it works offline.",
              tone: "active",
            },
          ].map((type) => (
            <div
              key={type.name}
              className={
                type.tone === "active"
                  ? "rounded-xl border border-accent/30 bg-accent-soft/40 p-4"
                  : "rounded-xl border border-line bg-paper-soft p-4"
              }
            >
              <div className="flex items-center justify-between">
                <type.icon className={type.tone === "active" ? "size-4 text-accent" : "size-4 text-muted"} />
                {type.tone === "active" && (
                  <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-paper-soft">
                    Git
                  </span>
                )}
              </div>
              <p className="mt-2 text-[13px] font-semibold text-ink">{type.name} VCS</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{type.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="clone" num="02.4" title="Clone ≠ download" kicker="keep the connection" />
        <BodyText>
          A download copies the files. A clone copies the files <em>and</em> the hidden <InlineCode>.git</InlineCode>{" "}
          folder, which holds the entire history. That difference changes what you are able to do next.
        </BodyText>
        <DataTable
          columns={["", "Clone", "Download"]}
          rows={[
            ["What you receive", "Full project plus the .git history", "Just the visible files"],
            ["Updates", "Fetch and push only the edited parts", "Upload and download the whole project"],
            ["Connection", "The relation with the server stays alive", "No link once the transfer ends"],
            ["Offline", "Work fully, commit locally", "Nothing to commit against"],
          ]}
        />
        <Callout variant="tip" title="Why this matters">
          Because your branch keeps its link to the remote after you push, a failed download does not lose your work. And
          because you hold a full local copy, you do not need the internet to keep working.
        </Callout>
        <button
          onClick={() => onNavigate("architecture")}
          className="group inline-flex items-center gap-2 rounded-md border border-line-strong bg-paper-soft px-3 py-2 font-mono text-[10.5px] text-ink-soft transition hover:border-ink/40"
        >
          Next: how the repository is built
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </button>
      </section>
    </div>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Architecture                                                        */
/* ------------------------------------------------------------------ */

export function Architecture() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <SectionHeading id="three-trees" num="03.1" title="The three trees" kicker="the core model" />
        <BodyText>
          A Git repository is the working directory (your project files) plus a hidden{" "}
          <InlineCode>.git</InlineCode> folder. The repository can show you previous versions — v1, v2, v3 — while the
          working directory only ever shows the latest one. Git inserts a third place between them.
        </BodyText>
        <div className="rounded-xl border border-line bg-paper-soft p-4 sm:p-5">
          <ThreeTreesMini />
          <p className="mt-3 border-t border-line pt-3 text-[12px] leading-relaxed text-muted">
            Older systems were <strong className="font-medium text-ink-soft">two-tree</strong>: working directory and
            repository. Git is <strong className="font-medium text-ink-soft">three-tree</strong>: the staging area (index)
            sits in the middle. The index is just a file; a commit creates a new version from it.
          </p>
        </div>
        <div>
          <p className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">What a VCS must do</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { icon: FolderTree, title: "Track without changing", text: "Store every file exactly as it is." },
              { icon: Boxes, title: "Stay portable", text: "Git is just a folder — OS independent." },
              { icon: Hash, title: "Give unique IDs", text: "Everything tracked becomes an object with a hash." },
              { icon: HistoryIcon, title: "Keep a history", text: "A log of versions, linked back to their parents." },
            ].map((need, index) => (
              <div key={need.title} className="flex gap-2.5 rounded-lg border border-line bg-paper-soft p-3">
                <span className="font-mono text-[9px] text-accent">0{index + 1}</span>
                <div>
                  <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                    <need.icon className="size-3 text-muted" /> {need.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{need.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3.5">
        <SectionHeading id="staging-lab" num="03.2" title="Staging lab" kicker="try the model yourself" />
        <BodyText>
          Edit a file, stage it, commit it. Use the buttons to watch files move between the three trees — and notice that
          editing after staging leaves you with two different states at once.
        </BodyText>
        <StagingLab />
        <Callout variant="note" title="Remember the direction">
          Files move <strong className="font-semibold text-ink">forward</strong> through the trees, never backward on their
          own. <InlineCode>git restore</InlineCode> explicitly pulls a file back from the index or repository.
        </Callout>
      </section>

      <section className="space-y-4">
        <SectionHeading id="objects" num="03.3" title="Git objects" kicker="what is actually stored" />
        <BodyText>
          Git stores four kinds of object. Each has its own job, and a commit is essentially a labelled snapshot that
          points at a tree, which in turn points at blobs.
        </BodyText>
        <DataTable
          columns={["Object", "What it holds"]}
          rows={[
            [
              <span className="font-mono text-[11.5px]">Blob</span>,
              "File content, plus metadata such as permissions, size and type.",
            ],
            [<span className="font-mono text-[11.5px]">Tree</span>, "A directory's contents and its metadata."],
            [
              <span className="font-mono text-[11.5px]">Commit</span>,
              "A snapshot that points to a tree (and to its parent). It works like a bookmark.",
            ],
            [
              <span className="font-mono text-[11.5px]">Tagged annotation</span>,
              "A named mark on a commit, used for releases and milestones.",
            ],
          ]}
        />
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-line bg-paper-deep/30 px-3 py-2.5 font-mono text-[10px] text-muted">
          <span className="rounded bg-charcoal px-1.5 py-0.5 text-cream">commit</span>
          <span className="text-accent">→</span>
          <span className="rounded border border-line bg-paper px-1.5 py-0.5 text-ink-soft">tree</span>
          <span className="text-accent">→</span>
          <span className="rounded border border-line bg-paper px-1.5 py-0.5 text-ink-soft">blob</span>
          <span className="text-accent">→</span>
          <span className="rounded border border-line bg-paper px-1.5 py-0.5 text-ink-soft">blob</span>
          <span className="ml-auto hidden text-[9px] sm:block">the commit is the bookmark</span>
        </div>
        <Callout variant="note" title="Moving a file">
          If you move a file into another folder, Git sees a modification and takes the whole tree again — not just the
          blob. A commit records which tree and blobs belonged to that version.
        </Callout>
      </section>

      <section className="space-y-4">
        <SectionHeading id="hashing" num="03.4" title="Hashing & IDs" kicker="same content, same value" />
        <BodyText>
          A hash function turns content into a fixed-length ID. Git uses <strong className="font-semibold text-ink">SHA-1</strong>.
          The essential property is determinism: the same content always produces the same hash. So if the hash changes,
          the content changed.
        </BodyText>
        <CodeBlock
          prompt={false}
          label="identity function"
          code={`content  ──▶  f(x)  ──▶  40-character ID\n\n"hello"  ──▶  sha1  ──▶  aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d`}
          caption="A one-character edit produces a completely different ID — that is how Git detects modifications."
        />
        <Callout variant="tip" title="Why uniqueness matters">
          Every object receives an ID from its content. No content, no object. Changed content cannot pretend to be the
          old version, because its hash will not match.
        </Callout>
      </section>

      <section className="space-y-3.5">
        <SectionHeading id="hash-lab" num="03.5" title="Hash lab" kicker="break it yourself" />
        <BodyText>
          Type in either box, or try a preset. Identical content produces an identical digest; one added exclamation mark
          produces a hash that looks nothing like it.
        </BodyText>
        <HashLab />
      </section>

      <section className="space-y-4">
        <SectionHeading id="staging-why" num="03.6" title="Why staging exists" kicker="the 100-number sheet" />
        <div className="grid gap-2.5 sm:grid-cols-3">
          {[
            { n: "01", title: "Compare", text: "The stage is where new work is compared against old before it lands." },
            { n: "02", title: "Back out", text: "You can change your mind before a version exists in the repository." },
            { n: "03", title: "Group", text: "Many related edits become one clean, meaningful version." },
          ].map((reason) => (
            <div key={reason.n} className="rounded-xl border border-line bg-paper-soft p-3.5">
              <span className="font-mono text-[9px] text-accent">{reason.n}</span>
              <p className="mt-1.5 text-[12.5px] font-semibold text-ink">{reason.title}</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{reason.text}</p>
            </div>
          ))}
        </div>
        <Callout variant="quote" title="The spreadsheet example">
          You edit a sheet containing 100 numbers. You do not push 100 edits and create 100 versions. You change
          everything, stage it, and commit it as one version that is easy to return to.
        </Callout>
        <DotList
          items={[
            <>
              A <strong className="font-medium text-ink">commit</strong> is a single snapshot: it inserts, appends and
              registers a new version.
            </>,
            <>
              Staging many updates related to one request is called <em>patching</em>.
            </>,
            <>
              <InlineCode>git add</InlineCode> only tracks and stages — no version or snapshot exists until you run{" "}
              <InlineCode>git commit</InlineCode>.
            </>,
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading id="status" num="03.7" title="File status" kicker="untracked → tracked" />
        <BodyText>
          A file starts untracked. <InlineCode>git add</InlineCode> performs three steps to turn it into a tracked file:
        </BodyText>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { n: "1", title: "Hash the file", text: "Apply SHA-1 to the file's content." },
            { n: "2", title: "Store the SHA", text: "Write that hash into the staging index." },
            { n: "3", title: "Create a blob", text: "Add a blob object to .git that tracks the file." },
          ].map((step) => (
            <div key={step.n} className="flex gap-2.5 rounded-lg border border-line bg-paper-soft p-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-[9px] text-accent-deep">
                {step.n}
              </span>
              <div>
                <p className="text-[12px] font-medium text-ink">{step.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
        <DataTable
          columns={["Status", "Meaning"]}
          rows={[
            [
              <span className="whitespace-nowrap">Untracked <Pill tone="sage" className="ml-1 normal-case">U</Pill></span>,
              "Git has never seen the file.",
            ],
            [
              <span className="whitespace-nowrap">Modified <Pill tone="accent" className="ml-1 normal-case">M</Pill></span>,
              "Tracked, but changed since last time — detected by comparing the SHA-1 hash.",
            ],
            ["Unmodified", "The latest version equals the one Git holds."],
          ]}
        />
        <Callout variant="warn" title="Read the colours">
          A <strong className="font-semibold text-[#a8502f]">red M</strong> means the file differs from both the staging
          area and the repository. A <strong className="font-semibold text-sage">green M</strong> means it matches the
          staging area but still differs from the repository — it is staged.
        </Callout>
      </section>
    </div>
  );
}
