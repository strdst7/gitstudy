import { ArrowRight, Clock, History, RotateCcw, Search, Settings, Undo2 } from "lucide-react";
import {
  BodyText,
  Callout,
  CodeBlock,
  DataTable,
  DotList,
  InlineCode,
  Pill,
  SectionHeading,
} from "../ui";

/* ------------------------------------------------------------------ */
/* Setup                                                               */
/* ------------------------------------------------------------------ */

export function Setup() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <SectionHeading id="identity" num="04.1" title="First configuration" kicker="once per machine" />
        <BodyText>
          Git is distributed, so every commit must say who made it. Run these once after installing Git — before your
          first repository. The name and email are written into each commit object.
        </BodyText>
        <CodeBlock
          code={`git config --global user.name "name here"\ngit config --global user.email "email here"\ngit config --list`}
          caption="--global applies to every project of the current user on this machine."
        />
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-paper-soft p-3.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent">--global</span>
              <Settings className="size-3.5 text-muted" />
            </div>
            <p className="mt-1.5 text-[12.5px] font-medium text-ink">This user, every project</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
              The everyday choice. Applies to all repositories owned by your OS user on this machine.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-paper-soft p-3.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-sage">--system</span>
              <Settings className="size-3.5 text-muted" />
            </div>
            <p className="mt-1.5 text-[12.5px] font-medium text-ink">Every user on the machine</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
              Use <InlineCode>git config --system user.name</InlineCode> when a shared machine needs a default identity.
            </p>
          </div>
        </div>
        <Callout variant="note" title="Check before you commit">
          If a commit names the wrong person, fix your config and use <InlineCode>git commit --amend</InlineCode> — but only
          before the commit has been shared with anyone else.
        </Callout>
      </section>

      <section className="space-y-4">
        <SectionHeading id="init" num="04.2" title="Start a repository" kicker="one hidden folder" />
        <BodyText>
          <InlineCode>git init</InlineCode> creates a Git repository inside the current directory. Under the hood it makes a
          hidden <InlineCode>.git</InlineCode> folder — the repository is your project files plus that folder.
        </BodyText>
        <CodeBlock
          code={`mkdir study-guide && cd study-guide\ngit init\ngit status`}
          caption="The dot in .git hides the folder. It contains the objects, refs and history — never delete it casually."
        />
        <div className="rounded-xl border border-line bg-paper-deep/30 p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">repository</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[10.5px]">
            <span className="rounded-md border border-line bg-paper-soft px-2 py-1 text-ink-soft">study-guide/</span>
            <span className="text-faint">+</span>
            <span className="rounded-md border border-line bg-paper-soft px-2 py-1 text-muted">.git/</span>
            <span className="text-faint">=</span>
            <span className="rounded-md bg-ink px-2 py-1 text-cream">one repository</span>
          </div>
          <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
            The working directory shows only the latest version. The repository holds v1, v2, v3 and the log.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="reading-status" num="04.3" title="Reading status" kicker="know where you stand" />
        <BodyText>
          Status is the most useful command in Git. It compares three things: the working directory, the index and the last
          commit. Run it often — especially before staging.
        </BodyText>
        <CodeBlock
          prompt={false}
          label="git status -s"
          code={` M app.js        # modified since the index (red)\nM  README.md    # staged, ready to commit (green)\n?? notes.md     # untracked\nD  legacy.css   # staged deletion`}
          caption="The first column is the index; the second is the working tree. git status (without -s) spells this out in words."
        />
        <DataTable
          columns={["State", "Meaning"]}
          rows={[
            ["Untracked", "Git has never seen the file. It will not be in a commit until it is added."],
            ["Modified", "Tracked, but different from the last staged version. Detected by comparing hashes."],
            ["Unmodified", "The working file matches what Git holds."],
            ["Staged", "The index has a snapshot the repository does not — the next commit's contents."],
          ]}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="accent">red M</Pill>
          <span className="text-[12px] text-ink-soft">differs from both index and repo</span>
          <span className="text-line-strong">·</span>
          <Pill tone="sage">green M</Pill>
          <span className="text-[12px] text-ink-soft">matches the index, not the repo</span>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="add" num="04.4" title="Staging your work" kicker="working dir → index" />
        <BodyText>
          <InlineCode>git add</InlineCode> converts files from untracked to tracked and copies them into the staging file.
          After it runs, the file in the working tree equals the file in the index. It does <strong className="font-medium text-ink">not</strong>{" "}
          create a version.
        </BodyText>
        <CodeBlock
          code={`git add app.js          # stage one file\ngit add .               # stage everything in this folder\ngit ls-files            # list the files in the index tree\ngit status -s           # confirm what moved`}
          caption="git ls-files reads the staging tree itself, so it shows new files before the first commit."
        />
        <Callout variant="tip" title="Staging is a snapshot, not a live link">
          If you stage a file and then edit it again, the index still holds the earlier snapshot. The new edit is unstaged
          until you run <InlineCode>git add</InlineCode> a second time.
        </Callout>
      </section>

      <section className="space-y-4">
        <SectionHeading id="commit" num="04.5" title="Committing" kicker="index → repository" />
        <BodyText>
          A commit writes the current index into the repository as a new version. It records a commit object, a tree and
          blobs, plus a parent pointer to the commit before it.
        </BodyText>
        <CodeBlock
          code={`git commit -m "Describe the change"\ngit commit -am "Stage tracked edits and commit"\ngit log --oneline`}
        />
        <DataTable
          columns={["Option", "Effect"]}
          rows={[
            ["-m", "Attach the commit message without opening an editor."],
            ["-am", "Stage edits to already-tracked files and commit in one step."],
            ["(none)", "Untracked files are never included by -am — add them first."],
          ]}
        />
        <Callout variant="warn" title="The -am trap">
          <InlineCode>git commit -am</InlineCode> only works for files Git already tracks. A brand-new file must be staged
          with <InlineCode>git add</InlineCode> first.
        </Callout>
        <DotList
          items={[
            <>
              A commit object is a <strong className="font-medium text-ink">bookmark</strong>: it records which tree and
              blobs were stored in that version.
            </>,
            <>
              The chain is <InlineCode>commit → tree → blobs</InlineCode>. The repository's commit object holds the tree and
              its blobs.
            </>,
            <>
              Moving a file to another folder counts as a modification, and Git takes the whole tree again — not just the
              blob.
            </>,
          ]}
        />
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* History                                                             */
/* ------------------------------------------------------------------ */

export function HistoryAndDiffs() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <SectionHeading id="log" num="05.1" title="Reading history" kicker="a linked list of snapshots" />
        <BodyText>
          After the first commit, every new commit stores a <strong className="font-medium text-ink">parent pointer</strong>{" "}
          to the one before it. C2 points to C1, C3 to C2, C4 to C3. That is why history is a linked list, and why branches
          can grow out of any point in the chain.
        </BodyText>
        <div className="rounded-xl border border-line bg-paper-soft p-4">
          <div className="flex items-center gap-2">
            {["C1", "C2", "C3", "C4"].map((commit, index) => (
              <div key={commit} className="flex flex-1 items-center gap-2">
                <div className="flex flex-1 flex-col items-center rounded-md border border-line bg-paper px-2 py-2">
                  <span className="font-mono text-[10px] text-accent">{commit}</span>
                  <span className="mt-1 font-mono text-[8px] text-faint">snapshot</span>
                </div>
                {index < 3 && <ArrowRight className="size-3 shrink-0 text-line-strong" />}
              </div>
            ))}
          </div>
          <p className="mt-2.5 flex items-center gap-1.5 border-t border-line pt-2.5 font-mono text-[9px] text-muted">
            <Clock className="size-3 text-accent" /> parent pointers point backward · branches extend the chain
          </p>
        </div>
        <DataTable
          columns={["Command", "What it does"]}
          rows={[
            [<InlineCode>git log</InlineCode>, "Display the commit history."],
            [<InlineCode>git log --oneline</InlineCode>, "Compact history, one line per commit."],
            [<InlineCode>git log --oneline -n</InlineCode>, "Compact history of the last n commits."],
          ]}
        />
        <CodeBlock
          prompt={false}
          label="git log --oneline"
          code={`a91f2c0 (HEAD -> master) add the staging lab\n7d04be1 explain the three trees\n3c8e112 notes on hashing\n0f21bd4 initial commit`}
          caption="The first hash is the current commit. HEAD points at it, and master is the branch label around it."
        />
      </section>

      <section className="space-y-4">
        <SectionHeading id="show" num="05.2" title="Inspecting a commit" kicker="what happened here?" />
        <BodyText>
          To understand a single version, ask for its SHA with <InlineCode>git show</InlineCode>. You get the commit
          metadata, the message, and the changes introduced by that commit.
        </BodyText>
        <CodeBlock
          code={`git show 7d04be1\n# or the full hash\ngit show 7d04be1c93a4e2b6f1e0d8c7a6b5c4d3e2f1a0b`}
          caption="A SHA on its own is a commit, tree, blob or tag. Git needs enough characters to identify it uniquely."
        />
      </section>

      <section className="space-y-4">
        <SectionHeading id="diff" num="05.3" title="Comparing versions" kicker="two dots, two trees" />
        <BodyText>
          A diff answers a precise question. Before you use it, decide which two places you want compared: working
          directory, index, or repository.
        </BodyText>
        <DataTable
          columns={["Command", "Compares"]}
          rows={[
            [<InlineCode>git diff &lt;file&gt;</InlineCode>, "Working directory vs. index — what you changed but have not staged."],
            [<InlineCode>git diff --staged</InlineCode>, "Index vs. repository — exactly what the next commit will contain."],
            [<InlineCode>git diff &lt;older&gt;..&lt;newer&gt;</InlineCode>, "Two commits, older first, newer second."],
          ]}
        />
        <CodeBlock
          code={`git diff app.js\ngit add app.js\ngit diff --staged\ngit diff 0f21bd4..a91f2c0`}
          caption="A common habit: check the unstaged diff, stage the parts you mean to include, then check the staged diff before committing."
        />
        <Callout variant="note" title="Order matters">
          In <InlineCode>git diff older..newer</InlineCode> the older commit comes first. Reversing the range reverses
          every added and removed line.
        </Callout>
      </section>

      <section className="space-y-4">
        <SectionHeading id="pager" num="05.4" title="Pager mode" kicker="how to get out" />
        <BodyText>
          Commands such as <InlineCode>diff</InlineCode> and <InlineCode>log</InlineCode> open in an external page. If you
          feel stuck, you are inside the pager. Press <kbd className="rounded border border-line-strong bg-paper px-1.5 py-0.5 font-mono text-[10px]">q</kbd>{" "}
          to quit and return to your prompt.
        </BodyText>
        <CodeBlock
          code={`git config --global core.pager cat      # disable pager mode\ngit config --global --unset core.pager  # restore it`}
          caption="Turning the pager off prints long output straight to the terminal — useful in small windows or scripts."
        />
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Undo                                                                */
/* ------------------------------------------------------------------ */

export function Undo() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <SectionHeading id="before" num="06.1" title="Before you commit" kicker="index and working tree" />
        <BodyText>
          Most mistakes happen before a commit exists. Learn the direction of each command: the index can be reset from the
          repository, and the working tree can be reset from the index.
        </BodyText>
        <DataTable
          columns={["Situation", "Command", "Effect"]}
          rows={[
            [
              "Untrack a file (tracked → untracked)",
              <InlineCode>git rm --cached &lt;file&gt;</InlineCode>,
              "Removes it from the index. Use it for a file just added to Git for the first time; the file stays on disk.",
            ],
            [
              "Discard edits to a modified file",
              <InlineCode>git restore &lt;file&gt;</InlineCode>,
              "Restores the working file to its last staged content. Works only if the file was not staged.",
            ],
            [
              "Unstage a staged file",
              <InlineCode>git restore --staged &lt;file&gt;</InlineCode>,
              "Takes the file out of the index. Your edits stay in the working tree.",
            ],
          ]}
        />
        <div className="grid gap-2.5 sm:grid-cols-2">
          <CodeBlock label="unstage, keep the edit" code={`git restore --staged app.js\ngit diff app.js       # the edit is still here`} />
          <CodeBlock label="discard, lose the edit" code={`git restore app.js\ngit status -s         # clean`} />
        </div>
        <Callout variant="warn" title="Careful with restore">
          <InlineCode>git restore</InlineCode> discards edits permanently — they were never committed. If you staged a file
          and then try to restore it, nothing changes: the working tree already matches the index. Unstage it first, then
          restore.
        </Callout>
        <Callout variant="note" title="A note on wording">
          This guide's notes describe <InlineCode>restore --staged</InlineCode> as “from index to working tree”. In Git's
          own terms, it <em>resets the index from the last commit</em> (an unstage); plain{" "}
          <InlineCode>git restore</InlineCode> resets the working tree from the index. Use the mental picture that works,
          but check <InlineCode>git restore --help</InlineCode> for the exact semantics.
        </Callout>
      </section>

      <section className="space-y-4">
        <SectionHeading id="amend" num="06.2" title="Fix the last commit" kicker="replace the bookmark" />
        <BodyText>
          Typo in your message, or forgot to stage a file? <InlineCode>git commit --amend</InlineCode> replaces the most
          recent commit with a new one. The old commit is abandoned (though still recoverable from the reflog for a while).
        </BodyText>
        <CodeBlock
          code={`git add forgotten-file.js\ngit commit --amend -m "A clearer message"`}
          caption="Amend creates a new SHA. Never amend a commit others have already pulled — you would be rewriting shared history."
        />
      </section>

      <section className="space-y-4">
        <SectionHeading id="reset" num="06.3" title="Moving HEAD back" kicker="option one: relative" />
        <BodyText>
          <strong className="font-medium text-ink">HEAD</strong> is the pointer that says which commit you are standing on.
          It holds the SHA of the last commit you made. Moving HEAD to an earlier commit returns your files to the state
          they had at that earlier version.
        </BodyText>
        <div className="rounded-xl border border-line bg-paper-soft p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">go back n commits</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <span className="rounded-md border border-line bg-paper px-2 py-1 text-muted">C1</span>
            <span className="text-faint">←</span>
            <span className="rounded-md border border-line bg-paper px-2 py-1 text-muted">C2</span>
            <span className="text-faint">←</span>
            <span className="rounded-md border border-line bg-paper px-2 py-1 text-muted">C3</span>
            <span className="rounded-md border border-accent bg-accent px-2 py-1 text-paper-soft">HEAD~2 → C1</span>
          </div>
          <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
            n is the number of steps back. Only the commit pointer moves — nothing is deleted, so the commit can be brought
            back.
          </p>
        </div>
        <div className="grid gap-2.5 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-paper-soft p-3.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-sage">option A · keep the changes</p>
            <CodeBlock
              className="mt-2"
              label="two stages back"
              code={`git reset HEAD~1\ngit restore --staged <file>\ngit restore <file>`}
            />
            <p className="mt-2 text-[11px] leading-relaxed text-muted">Pointer back, then decide file by file.</p>
          </div>
          <div className="rounded-xl border border-line bg-paper-soft p-3.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent">option B · go straight to files</p>
            <CodeBlock className="mt-2" label="hard reset" code={`git reset --hard HEAD~1\ngit status\n# working tree now matches HEAD`} />
            <p className="mt-2 text-[11px] leading-relaxed text-muted">
              Discards uncommitted work too. Use only when you are sure.
            </p>
          </div>
        </div>
        <DataTable
          columns={["Command", "Effect"]}
          rows={[
            [<InlineCode>git reset HEAD~n</InlineCode>, "Moves the pointer only. Index and working tree stay as they are."],
            [<InlineCode>git reset --hard HEAD~n</InlineCode>, "Moves the pointer and resets index + working tree. Destructive."],
            [<InlineCode>git reset --hard &lt;sha&gt;</InlineCode>, "Jumps to a specific commit and makes the files match it."],
            [<InlineCode>git reset &lt;sha&gt;</InlineCode>, "Jumps the pointer back, leaving files available to inspect."],
          ]}
        />
        <Callout variant="warn" title="Before using --hard">
          Uncommitted changes have no history to recover from. Run <InlineCode>git status</InlineCode> and{" "}
          <InlineCode>git stash</InlineCode> (or commit) if there is work you want to keep.
        </Callout>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div className="flex items-start gap-2.5 rounded-lg border border-line bg-paper-soft p-3">
            <RotateCcw className="mt-0.5 size-3.5 shrink-0 text-accent" />
            <div>
              <p className="text-[12px] font-medium text-ink">Option two: by SHA</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                Use <InlineCode>git reset --hard &lt;sha&gt;</InlineCode> to jump straight to a version, then{" "}
                <InlineCode>git restore .</InlineCode> to refresh the working tree.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 rounded-lg border border-line bg-paper-soft p-3">
            <Undo2 className="mt-0.5 size-3.5 shrink-0 text-accent" />
            <div>
              <p className="text-[12px] font-medium text-ink">Undo a merge</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                Abandon a conflicted merge before committing with <InlineCode>git merge --quit</InlineCode>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="reflog" num="06.4" title="Finding a lost commit" kicker="HEAD has a memory" />
        <BodyText>
          The reflog records where HEAD has been. After moving back too far, open the reflog, find the entry you want, and
          move forward with a hard reset. The commits are still in the object database.
        </BodyText>
        <CodeBlock
          prompt={false}
          label="git reflog"
          code={`a91f2c0 HEAD@{0}: reset: moving to HEAD~2\n7d04be1 HEAD@{1}: commit: explain the three trees\n0f21bd4 HEAD@{2}: commit (initial): initial commit`}
        />
        <CodeBlock
          code={`git reset --hard HEAD@{1}`}
          caption="HEAD@{n} is the n-th entry in the reflog. Move forward to restore the newer commit."
        />
        <div className="grid gap-2.5 sm:grid-cols-3">
          {[
            { icon: History, title: "See the trail", text: "Every reset, commit and switch leaves a reflog entry." },
            { icon: Search, title: "Find the SHA", text: "Use the shortened hash if the entry number is confusing." },
            { icon: RotateCcw, title: "Move forward", text: "Reset to the entry. Your branch catches up again." },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-line bg-paper-soft p-3">
              <item.icon className="size-3.5 text-accent" />
              <p className="mt-1.5 text-[12px] font-medium text-ink">{item.title}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
        <Callout variant="tip" title="The safety net">
          A reset does not immediately delete commits. The reflog keeps them reachable for a while, so “I lost my work” is
          usually recoverable. Look up the entry before doing anything drastic.
        </Callout>
      </section>
    </div>
  );
}
