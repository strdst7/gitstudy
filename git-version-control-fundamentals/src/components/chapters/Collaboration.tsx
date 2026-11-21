import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Check,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Globe,
  KeyRound,
  Link2,
  Network,
  UserRound,
} from "lucide-react";
import {
  BodyText,
  Callout,
  CodeBlock,
  CommitGraph,
  DataTable,
  DotList,
  InlineCode,
  Pill,
  SectionHeading,
} from "../ui";

/* ------------------------------------------------------------------ */
/* Branches                                                            */
/* ------------------------------------------------------------------ */

export function Branching() {
  const [merged, setMerged] = useState(false);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <SectionHeading id="tags" num="07.1" title="Tags" kicker="mark the milestone" />
        <BodyText>
          Every commit adds a feature — update 17.1, 17.2, and so on. A tag marks a big moment, such as update 18, so you
          can find it later without remembering a SHA. Annotated tags carry their own message and author.
        </BodyText>
        <CodeBlock
          code={`git tag -a v18.0 -m "Release 18: the study guide edition"\ngit tag\ngit show v18.0`}
          caption="The -a makes it an annotated tag; -m attaches the message. Tags are labels on commits, not branches."
        />
        <Callout variant="tip" title="Tag the version, not the moment">
          Cut the tag when the release content is final. Moving a tag later rewrites a promise other people may already be
          relying on.
        </Callout>
      </section>

      <section className="space-y-4">
        <SectionHeading id="head" num="07.2" title="HEAD & branches" kicker="where are you standing?" />
        <BodyText>
          A branch is simply a chain of commits. The default name is <InlineCode>master</InlineCode> in older repositories;
          many newer ones use <InlineCode>main</InlineCode>. <strong className="font-medium text-ink">HEAD</strong> is the
          pointer telling Git which commit object you are standing on.
        </BodyText>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-paper-soft p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">two things depend on HEAD</p>
            <div className="mt-2 space-y-2">
              {["Undoing in Git — what does “back” mean?", "The content of your working directory."].map((item) => (
                <p key={item} className="flex gap-2 text-[12px] leading-relaxed text-ink-soft">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-charcoal/80 bg-charcoal p-4">
            <div className="absolute left-9 top-5 bottom-5 w-px bg-accent/40" />
            <div className="absolute left-9 top-[54%] h-px w-20 bg-[#9caf8d]/60" />
            <div className="relative space-y-2.5 font-mono text-[10px]">
              {[
                { c: "C1", b: "" },
                { c: "C2", b: "" },
                { c: "C3", b: "HEAD → master" },
                { c: "C4", b: "feature" },
              ].map((node, index) => (
                <div
                  key={node.c}
                  className={`flex items-center gap-2 ${index === 3 ? "pl-14" : ""}`}
                >
                  <span
                    className={`z-10 flex size-4 items-center justify-center rounded-full border text-[7px] ${
                      index === 3
                        ? "border-[#9caf8d] bg-charcoal text-[#9caf8d]"
                        : "border-accent bg-charcoal text-cream"
                    }`}
                  >
                    {node.c}
                  </span>
                  {node.b && (
                    <span className={`rounded px-1.5 py-0.5 text-[8px] ${index === 3 ? "bg-[#9caf8d]/20 text-[#c3d3b6]" : "bg-accent/20 text-[#f0b59e]"}`}>
                      {node.b}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <BodyText>
          Create a new branch and it starts from the snapshot you were on, then continues linearly. Master keeps working
          exactly as it was, because you did not touch it.
        </BodyText>
        <DataTable
          columns={["Task", "Command"]}
          rows={[
            ["Create a branch", <InlineCode>git branch &lt;name&gt;</InlineCode>],
            ["List local branches", <InlineCode>git branch</InlineCode>],
            ["List remote branches", <InlineCode>git branch -r</InlineCode>],
            ["Switch branches", <InlineCode>git switch &lt;name&gt;</InlineCode>],
            ["Delete a branch", <InlineCode>git branch -d "name"</InlineCode>],
            ["Show branches merged into yours", <InlineCode>git branch --merged</InlineCode>],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading id="merge" num="07.3" title="Merging" kicker="stand on the target" />
        <BodyText>
          Merging applies another branch into the one you are on. The direction matters:{" "}
          <InlineCode>git merge &lt;branch&gt;</InlineCode> brings the named branch into your current branch. Switch first,
          then merge.
        </BodyText>
        <CodeBlock
          code={`git switch main\ngit merge feature`}
          caption="You are standing on main and naming feature. The result lands in main."
        />
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-paper-soft p-3.5">
            <p className="text-[12px] font-semibold text-ink">Fast-forward</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
              No new commits exist on your branch, so Git simply moves the pointer forward. No merge commit is created.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-paper-soft p-3.5">
            <p className="text-[12px] font-semibold text-ink">Three-way merge</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
              Both branches have new commits, so Git builds a merge commit from the common ancestor and both tips.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="divergent" num="07.4" title="Divergent history" kicker="two heads, one ancestor" />
        <BodyText>
          You commit on master, and your branch — say <InlineCode>iss53</InlineCode> — also has commits made after the
          point where you branched. Their HEADs now point at different commits: master at C4, iss53 at C5, with C2 as the
          common ancestor. Git's fix is a brand-new merge commit, C6, that joins both lines.
        </BodyText>
        <div className="grid gap-3 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <CommitGraph merged={merged} />
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: "master", value: merged ? "C6" : "C4", tone: "accent" },
                { label: "iss53", value: merged ? "C6" : "C5", tone: "sage" },
                { label: "common ancestor", value: "C2", tone: "muted" },
                { label: "HEAD", value: "master", tone: "dark" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-line bg-paper-soft px-3 py-2">
                  <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-faint">{stat.label}</p>
                  <p
                    className={`mt-0.5 font-mono text-[12px] ${
                      stat.tone === "accent"
                        ? "text-accent"
                        : stat.tone === "sage"
                          ? "text-sage"
                          : "text-ink-soft"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setMerged((value) => !value)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-ink bg-ink px-3 py-2 font-mono text-[10.5px] text-cream transition hover:bg-charcoal-soft"
            >
              {merged ? <GitBranch className="size-3.5" /> : <GitMerge className="size-3.5" />}
              {merged ? "show the divergence" : "merge iss53 into master"}
            </button>
            <p className="rounded-lg border border-dashed border-line-strong px-3 py-2 font-mono text-[10px] leading-relaxed text-muted">
              C6 parents = C4 + C5
              <br />
              master moves to the merge commit.
            </p>
          </div>
        </div>
        <CodeBlock
          code={`git switch master\ngit merge iss53\n# a new commit C6 joins master (C4) and iss53 (C5)`}
          caption="The merge commit is a snapshot like any other; the difference is that it has two parents."
        />
      </section>

      <section className="space-y-4">
        <SectionHeading id="conflicts" num="07.5" title="Conflicts" kicker="choose deliberately" />
        <BodyText>
          A conflict happens when two branches modified the same file. Git stops and asks you to decide. You have three
          choices:
        </BodyText>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {[
            { title: "Keep both", text: "Merge both edits into the file, then save." },
            { title: "Keep incoming", text: "Take the version from the branch being merged in." },
            { title: "Keep current", text: "Keep the version on the branch you are standing on." },
          ].map((choice, index) => (
            <div key={choice.title} className="rounded-xl border border-line bg-paper-soft p-3.5">
              <span className="font-mono text-[9px] text-accent">0{index + 1}</span>
              <p className="mt-1.5 text-[12.5px] font-semibold text-ink">{choice.title}</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{choice.text}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
          {["<<<<<<< HEAD", "keep current", "=======", "incoming", ">>>>>>> iss53"].map((marker) => (
            <span
              key={marker}
              className={`rounded border px-2 py-1 ${
                marker === "======="
                  ? "border-line bg-paper text-faint"
                  : marker.startsWith("<<<") || marker.includes("current")
                    ? "border-accent/30 bg-accent-soft text-accent-deep"
                    : "border-sage/30 bg-sage-soft text-sage"
              }`}
            >
              {marker}
            </span>
          ))}
        </div>
        <BodyText>
          Resolve the file, save it, mark it resolved with <InlineCode>git add .</InlineCode>, then commit the merge. To back
          out instead of committing:
        </BodyText>
        <CodeBlock
          code={`git add .                # mark resolved files in the index\ngit restore --staged .   # remove from the index area\ngit restore .            # remove changes from the working tree\ngit merge --quit         # leave the merge state`}
          caption="The usual one-command escape is git merge --abort. The guide's sequence quits the merge and cleans both the index and working tree."
        />
        <Callout variant="warn" title="Resolve, don't guess">
          Run <InlineCode>git status</InlineCode> after a conflict. It lists every unmerged path, and it is genuinely safe
          to read a diff before choosing. Committing the conflict markers by accident is far more expensive than a pause.
        </Callout>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Remotes                                                             */
/* ------------------------------------------------------------------ */

function RemoteFlow() {
  return (
    <div className="rounded-xl border border-line bg-paper-soft p-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">the remote conversation</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { icon: UserRound, title: "Local branch", note: "HEAD · your working copy" },
          { icon: Network, title: "origin", note: "remote-tracking branch" },
          { icon: Globe, title: "GitHub", note: "the hosted repository" },
        ].map((node) => (
          <div key={node.title} className="rounded-lg border border-line bg-paper p-2.5 text-center">
            <node.icon className="mx-auto size-4 text-accent" />
            <p className="mt-1.5 text-[11px] font-medium leading-tight text-ink">{node.title}</p>
            <p className="mt-0.5 font-mono text-[8.5px] leading-tight text-faint">{node.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-2.5 grid gap-1.5 sm:grid-cols-3">
        {[
          { icon: ArrowDownToLine, label: "fetch", note: "download only" },
          { icon: GitMerge, label: "merge", note: "move HEAD" },
          { icon: ArrowUpFromLine, label: "push", note: "send commits" },
        ].map((arrow) => (
          <div key={arrow.label} className="flex items-center gap-1.5 rounded border border-dashed border-line px-2 py-1.5">
            <arrow.icon className="size-3 shrink-0 text-muted" />
            <span className="font-mono text-[9.5px] text-ink-soft">{arrow.label}</span>
            <span className="ml-auto font-mono text-[8px] text-faint">{arrow.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Remotes() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <SectionHeading id="remote-basics" num="08.1" title="Working with remotes" kicker="fetch, merge, pull" />
        <BodyText>
          After <InlineCode>git fetch</InlineCode>, your branch still stands on the last commit that existed before the
          fetch. The downloaded commits exist, but nothing moved. After the merge, HEAD moves to the newest commit the
          fetch brought in. A pulled remote master does not show in your local branch until you merge it.
        </BodyText>
        <RemoteFlow />
        <div className="rounded-xl border border-line bg-paper-soft p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">what HEAD sees</p>
          <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
            {[
              { title: "after fetch", head: "C3", remote: "C5", note: "origin/main has moved; your branch has not." },
              { title: "after merge", head: "C5", remote: "C5", note: "HEAD catches up with the fetched commits." },
            ].map((row) => (
              <div key={row.title} className="rounded-lg border border-line bg-paper p-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-faint">{row.title}</span>
                  <span className="flex gap-1 font-mono text-[8.5px]">
                    <Pill tone={row.head === row.remote ? "sage" : "accent"} className="px-1.5 py-0 text-[8px] normal-case">
                      HEAD {row.head}
                    </Pill>
                    <Pill tone="outline" className="px-1.5 py-0 text-[8px] normal-case">
                      origin {row.remote}
                    </Pill>
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{row.note}</p>
              </div>
            ))}
          </div>
        </div>
        <DataTable
          columns={["Command", "What it does"]}
          rows={[
            [<InlineCode>git clone &lt;url&gt; &lt;folder&gt;</InlineCode>, "Clone the repo into a folder with that name."],
            [<InlineCode>git remote</InlineCode>, "List remotes. Seeing origin means this repo came from a remote."],
            [<InlineCode>git fetch &lt;remote&gt;</InlineCode>, "Download remote changes but do not merge them into your tree."],
            [<InlineCode>git merge</InlineCode>, "Bring the fetched changes into your working tree (often fast-forward)."],
            [<InlineCode>git pull</InlineCode>, "fetch + merge in one command."],
            [<InlineCode>git push -u origin &lt;branch&gt;</InlineCode>, "Push a local branch and link it to the remote."],
            [<InlineCode>git remote remove &lt;name&gt;</InlineCode>, "Remove a remote connection."],
          ]}
        />
        <div className="grid gap-2.5 sm:grid-cols-2">
          <Callout variant="tip" title="Your normal workflow">
            Do not push straight to remote master. Create a branch, do the work there, then push that new branch and open a
            pull request.
          </Callout>
          <Callout variant="note" title="Why the first push needs -u">
            The remote does not know your new branch, so you create one there to receive it. <InlineCode>-u</InlineCode> is
            short for <InlineCode>--set-upstream</InlineCode>, linking your local branch to the remote branch. Without that
            link, the two have no relationship.
          </Callout>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="github" num="08.2" title="GitHub & origin" kicker="remote hosting" />
        <BodyText>
          GitHub is web hosting for Git repositories. <InlineCode>origin</InlineCode> is simply the name assigned to a
          remote URL — it can be changed to anything. The name is a convention, not a Git requirement.
        </BodyText>
        <CodeBlock
          code={`git remote add origin git@github.com:you/study-guide.git\ngit remote -v\ngit push -u origin main\ngit merge origin/main`}
          caption="Create an empty GitHub repository first — no README, no .gitignore — so the first push has nothing to conflict with."
        />
        <DotList
          items={[
            <>
              <InlineCode>git remote add origin &lt;url&gt;</InlineCode> connects the local repo; you may remove origin and
              choose any name.
            </>,
            <>
              <InlineCode>git merge origin/main</InlineCode> merges the remote branch into your current local branch.
            </>,
            <>
              Seeing <InlineCode>origin</InlineCode> in <InlineCode>git remote</InlineCode> is the quickest proof that this
              repo was taken from a remote.
            </>,
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading id="ssh" num="08.3" title="SSH keys" kicker="preferred over HTTPS" />
        <BodyText>
          GitHub must know who you are. With SSH, it compares the public key you register with the one your machine holds.
          The private key never leaves your computer.
        </BodyText>
        <CodeBlock
          code={`ssh-keygen -t ed25519 -C "email@example.com"\neval "$(ssh-agent -s)"\ncat ~/.ssh/id_ed25519.pub   # copy this output into GitHub`}
          label="ssh setup"
        />
        <div className="grid gap-2.5 sm:grid-cols-3">
          {[
            { icon: KeyRound, title: "Generate", text: "Create an ed25519 key pair, tied to your email." },
            { icon: Link2, title: "Register", text: "Paste the .pub key into GitHub → Settings → SSH keys." },
            { icon: Check, title: "Verify", text: "Use an SSH remote URL and test the connection." },
          ].map((step, index) => (
            <div key={step.title} className="rounded-lg border border-line bg-paper-soft p-3">
              <div className="flex items-center justify-between">
                <step.icon className="size-3.5 text-accent" />
                <span className="font-mono text-[8px] text-faint">0{index + 1}</span>
              </div>
              <p className="mt-1.5 text-[12px] font-medium text-ink">{step.title}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{step.text}</p>
            </div>
          ))}
        </div>
        <Callout variant="warn" title="Public vs private">
          Copy <InlineCode>id_ed25519.pub</InlineCode> into GitHub. Never paste the private key{" "}
          <InlineCode>id_ed25519</InlineCode> anywhere but your own machine. To remove a key pair:{" "}
          <InlineCode>rm ~/.ssh/id_ed25519 ~/.ssh/id_ed25519.pub</InlineCode> — then delete it on GitHub too.
        </Callout>
      </section>

      <section className="space-y-4">
        <SectionHeading id="fork" num="08.4" title="Forking" kicker="contribute without permission" />
        <BodyText>
          A fork is a copy of someone else's GitHub repository, made into your own account. You work in your copy, then ask
          the original project to pull your changes in.
        </BodyText>
        <div className="rounded-xl border border-line bg-paper-soft p-4">
          <div className="space-y-0">
            {[
              { title: "Fork the repository", text: "Use the Fork button on the GitHub project you want to work with." },
              { title: "Clone your fork", text: "git clone git@github.com:you/project.git — work on your own copy." },
              { title: "Add two remotes", text: "One for your fork (origin) and one for the original project (upstream)." },
              { title: "Push to your fork", text: "Commit, then push the branch to origin. Never push to upstream." },
              { title: "Open a pull request", text: "From GitHub, request that your branch be merged into the original." },
            ].map((step, index) => (
              <div key={step.title} className="relative flex gap-3 pb-4 last:pb-0">
                {index < 4 && <span className="absolute left-[11px] top-6 h-full w-px bg-line-strong" />}
                <span className="relative z-10 mt-0.5 flex size-[23px] shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-soft font-mono text-[9px] text-accent-deep">
                  {index + 1}
                </span>
                <div>
                  <p className="text-[12.5px] font-medium text-ink">{step.title}</p>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-line bg-paper-deep/30 px-3 py-2.5">
          <GitPullRequest className="size-3.5 text-accent" />
          <p className="font-mono text-[10px] text-muted">
            fork → clone → remote add upstream → push origin → pull request
          </p>
        </div>
        <Callout variant="note" title="Why two remotes?">
          <InlineCode>origin</InlineCode> is your fork, where you have write access. <InlineCode>upstream</InlineCode> is the
          original project, used to fetch other people's changes. Keeping them separate is what makes long-lived forks
          manageable.
        </Callout>
      </section>
    </div>
  );
}
