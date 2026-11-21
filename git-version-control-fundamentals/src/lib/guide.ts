export type ChapterId =
  | "orientation"
  | "why"
  | "architecture"
  | "setup"
  | "history"
  | "undo"
  | "branching"
  | "remotes"
  | "cheatsheet"
  | "quiz";

export type Chapter = {
  id: ChapterId;
  num: string;
  title: string;
  shortTitle: string;
  deck: string;
  group: "Foundations" | "Daily practice" | "Collaboration" | "Reference";
  minutes: number;
  sections: { id: string; label: string }[];
};

export const authors = "KDherstacks · aimirah. miii";

export const chapters: Chapter[] = [
  {
    id: "orientation",
    num: "01",
    title: "Orientation",
    shortTitle: "Orientation",
    deck: "What Git is, why it exists, and how to get the most out of this guide.",
    group: "Foundations",
    minutes: 4,
    sections: [
      { id: "start-here", label: "Start here" },
      { id: "mental-model", label: "The mental model" },
      { id: "inside-guide", label: "Inside the guide" },
      { id: "about", label: "About this guide" },
    ],
  },
  {
    id: "why",
    num: "02",
    title: "Why Git",
    shortTitle: "Why Git",
    deck: "Version control, a short history, and why a clone beats a download.",
    group: "Foundations",
    minutes: 6,
    sections: [
      { id: "problem", label: "The problem it solves" },
      { id: "history", label: "A short history" },
      { id: "types", label: "Three kinds of VCS" },
      { id: "clone", label: "Clone ≠ download" },
    ],
  },
  {
    id: "architecture",
    num: "03",
    title: "Architecture",
    shortTitle: "Architecture",
    deck: "Three trees, four objects, and the hash that keeps everything honest.",
    group: "Foundations",
    minutes: 9,
    sections: [
      { id: "three-trees", label: "The three trees" },
      { id: "staging-lab", label: "Staging lab" },
      { id: "objects", label: "Git objects" },
      { id: "hashing", label: "Hashing & IDs" },
      { id: "hash-lab", label: "Hash lab" },
      { id: "staging-why", label: "Why staging exists" },
      { id: "status", label: "File status" },
    ],
  },
  {
    id: "setup",
    num: "04",
    title: "Setup & daily commands",
    shortTitle: "Setup",
    deck: "Configure once, then stage and commit with confidence.",
    group: "Daily practice",
    minutes: 7,
    sections: [
      { id: "identity", label: "First configuration" },
      { id: "init", label: "Start a repository" },
      { id: "reading-status", label: "Reading status" },
      { id: "add", label: "Staging your work" },
      { id: "commit", label: "Committing" },
    ],
  },
  {
    id: "history",
    num: "05",
    title: "History & diffs",
    shortTitle: "History & diffs",
    deck: "Read the log, compare trees, and inspect any commit you like.",
    group: "Daily practice",
    minutes: 5,
    sections: [
      { id: "log", label: "Reading history" },
      { id: "show", label: "Inspecting a commit" },
      { id: "diff", label: "Comparing versions" },
      { id: "pager", label: "Pager mode" },
    ],
  },
  {
    id: "undo",
    num: "06",
    title: "Undoing things",
    shortTitle: "Undoing",
    deck: "Restore, unstage, reset, and recover a commit you thought was gone.",
    group: "Daily practice",
    minutes: 8,
    sections: [
      { id: "before", label: "Before you commit" },
      { id: "amend", label: "Fix the last commit" },
      { id: "reset", label: "Moving HEAD back" },
      { id: "reflog", label: "Finding a lost commit" },
    ],
  },
  {
    id: "branching",
    num: "07",
    title: "Branches & merging",
    shortTitle: "Branches",
    deck: "Tags, HEAD, divergent history, and a calm way through conflicts.",
    group: "Collaboration",
    minutes: 9,
    sections: [
      { id: "tags", label: "Tags" },
      { id: "head", label: "HEAD & branches" },
      { id: "merge", label: "Merging" },
      { id: "divergent", label: "Divergent history" },
      { id: "conflicts", label: "Conflicts" },
    ],
  },
  {
    id: "remotes",
    num: "08",
    title: "Remotes & GitHub",
    shortTitle: "Remotes",
    deck: "Push, pull, fork, and connect securely with SSH.",
    group: "Collaboration",
    minutes: 9,
    sections: [
      { id: "remote-basics", label: "Working with remotes" },
      { id: "github", label: "GitHub & origin" },
      { id: "ssh", label: "SSH keys" },
      { id: "fork", label: "Forking" },
    ],
  },
  {
    id: "cheatsheet",
    num: "09",
    title: "Cheat sheet",
    shortTitle: "Cheat sheet",
    deck: "Every command in the guide, searchable and ready to copy.",
    group: "Reference",
    minutes: 4,
    sections: [
      { id: "aliases", label: "Aliases" },
      { id: "commands", label: "Command index" },
    ],
  },
  {
    id: "quiz",
    num: "10",
    title: "Self-test",
    shortTitle: "Self-test",
    deck: "Seventeen questions to find out what actually stuck.",
    group: "Reference",
    minutes: 10,
    sections: [
      { id: "deck", label: "Flashcards" },
      { id: "key", label: "Answer key" },
    ],
  },
];

export const chapterGroups: { label: Chapter["group"]; chapters: Chapter[] }[] = [
  "Foundations",
  "Daily practice",
  "Collaboration",
  "Reference",
].map((group) => ({
  label: group as Chapter["group"],
  chapters: chapters.filter((chapter) => chapter.group === group),
}));

export type CommandItem = {
  cmd: string;
  desc: string;
  chapter: ChapterId;
};

export type CommandGroup = {
  title: string;
  hint: string;
  items: CommandItem[];
};

export const commandGroups: CommandGroup[] = [
  {
    title: "Set up",
    hint: "Once per machine",
    items: [
      { cmd: 'git config --global user.name "name here"', desc: "Set the name attached to every commit.", chapter: "setup" },
      { cmd: 'git config --global user.email "email here"', desc: "Set the email attached to every commit.", chapter: "setup" },
      { cmd: "git config --list", desc: "List the active configuration.", chapter: "setup" },
      { cmd: "git init", desc: "Create a new repository in the current folder.", chapter: "setup" },
      { cmd: "git config --system user.name", desc: "Set a value for every user on the machine.", chapter: "setup" },
      { cmd: "git config --global core.pager cat", desc: "Disable pager mode for diff and log.", chapter: "history" },
      { cmd: "git config --global --unset core.pager", desc: "Restore the pager.", chapter: "history" },
    ],
  },
  {
    title: "Stage & commit",
    hint: "The daily loop",
    items: [
      { cmd: "git status", desc: "Show the state of working tree and index.", chapter: "setup" },
      { cmd: "git status -s", desc: "Short, two-column status output.", chapter: "setup" },
      { cmd: "git add <file>", desc: "Stage one file into the index.", chapter: "setup" },
      { cmd: "git add .", desc: "Stage everything in the current directory.", chapter: "setup" },
      { cmd: "git ls-files", desc: "List the files in the index tree.", chapter: "setup" },
      { cmd: 'git commit -m "msg"', desc: "Create a version from the staged snapshot.", chapter: "setup" },
      { cmd: 'git commit -am "msg"', desc: "Stage tracked edits and commit in one step.", chapter: "setup" },
      { cmd: "git commit --amend", desc: "Replace the last commit (message or contents).", chapter: "undo" },
    ],
  },
  {
    title: "Inspect",
    hint: "Read before you change",
    items: [
      { cmd: "git log", desc: "Show the commit history.", chapter: "history" },
      { cmd: "git log --oneline", desc: "One compact line per commit.", chapter: "history" },
      { cmd: "git log --oneline -n", desc: "History for the last n commits.", chapter: "history" },
      { cmd: "git show <SHA>", desc: "Show what happened in a specific commit.", chapter: "history" },
      { cmd: "git diff <file>", desc: "Working directory versus the index.", chapter: "history" },
      { cmd: "git diff --staged", desc: "Index versus the repository.", chapter: "history" },
      { cmd: "git diff <old>..<new>", desc: "Compare two commits, older first.", chapter: "history" },
    ],
  },
  {
    title: "Undo",
    hint: "Nothing is truly lost",
    items: [
      { cmd: "git restore <file>", desc: "Discard unstaged edits in the working tree.", chapter: "undo" },
      { cmd: "git restore --staged <file>", desc: "Unstage a file; the edits stay in the working tree.", chapter: "undo" },
      { cmd: "git rm --cached <file>", desc: "Untrack a file but keep it on disk.", chapter: "undo" },
      { cmd: "git reset HEAD~n", desc: "Move HEAD back n commits, keeping your files.", chapter: "undo" },
      { cmd: "git reset --hard HEAD~n", desc: "Move HEAD back and reset the working tree too.", chapter: "undo" },
      { cmd: "git reset --hard <sha>", desc: "Jump the branch and files to a specific commit.", chapter: "undo" },
      { cmd: "git reflog", desc: "Show everywhere HEAD has been.", chapter: "undo" },
      { cmd: "git reset --hard HEAD@{n}", desc: "Return to the n-th reflog entry.", chapter: "undo" },
    ],
  },
  {
    title: "Branch & merge",
    hint: "Parallel lines of work",
    items: [
      { cmd: 'git tag -a <version> -m "msg"', desc: "Create an annotated tag on a commit.", chapter: "branching" },
      { cmd: "git branch <name>", desc: "Create a branch at the current commit.", chapter: "branching" },
      { cmd: "git branch", desc: "List local branches.", chapter: "branching" },
      { cmd: "git branch -r", desc: "List remote-tracking branches.", chapter: "branching" },
      { cmd: "git switch <branch>", desc: "Move HEAD to another branch.", chapter: "branching" },
      { cmd: 'git branch -d "branch"', desc: "Delete a merged branch.", chapter: "branching" },
      { cmd: "git branch --merged", desc: "Show branches merged into the current one.", chapter: "branching" },
      { cmd: "git merge <branch>", desc: "Merge a branch into the one you are standing on.", chapter: "branching" },
      { cmd: "git merge --quit", desc: "Abandon a conflicted merge before committing.", chapter: "branching" },
    ],
  },
  {
    title: "Remotes",
    hint: "Share the work",
    items: [
      { cmd: "git clone <url> <folder>", desc: "Copy a remote repository into a folder.", chapter: "remotes" },
      { cmd: "git remote", desc: "List remotes; origin means you cloned.", chapter: "remotes" },
      { cmd: "git remote add origin <url>", desc: "Connect a local repo to a remote.", chapter: "remotes" },
      { cmd: "git remote remove <name>", desc: "Remove a remote connection.", chapter: "remotes" },
      { cmd: "git fetch <remote>", desc: "Download changes without touching your files.", chapter: "remotes" },
      { cmd: "git merge origin/main", desc: "Bring fetched work into your branch.", chapter: "remotes" },
      { cmd: "git pull", desc: "fetch plus merge in a single command.", chapter: "remotes" },
      { cmd: "git push -u origin <branch>", desc: "Push a new branch and set its upstream.", chapter: "remotes" },
    ],
  },
  {
    title: "SSH & aliases",
    hint: "Quality of life",
    items: [
      { cmd: 'ssh-keygen -t ed25519 -C "email"', desc: "Generate an SSH key pair.", chapter: "remotes" },
      { cmd: 'eval "$(ssh-agent -s)"', desc: "Start the SSH agent.", chapter: "remotes" },
      { cmd: "cat ~/.ssh/id_ed25519.pub", desc: "Copy the public key into GitHub.", chapter: "remotes" },
      { cmd: "rm ~/.ssh/id_ed25519 ~/.ssh/id_ed25519.pub", desc: "Delete a local key pair.", chapter: "remotes" },
      { cmd: 'git config --global alias.st "status -s"', desc: "Create a shortcut for a Git command.", chapter: "cheatsheet" },
      { cmd: "git config --global --unset alias.st", desc: "Remove an alias.", chapter: "cheatsheet" },
    ],
  },
];

export type QuizQuestion = {
  id: number;
  prompt: string;
  answer: string;
  chapter: ChapterId;
  section: string;
  tag: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    prompt: "What problem does a VCS solve, and who created Git and when?",
    answer:
      "A VCS tracks every version of your files, so you never keep folders like final, final2 and final_v3. It is essential when a team edits the same files. Linus Torvalds — who also created Linux — released Git on April 7, 2005.",
    chapter: "why",
    section: "problem",
    tag: "Foundations",
  },
  {
    id: 2,
    prompt: "What is the difference between local, central and distributed VCS?",
    answer:
      "Local keeps versions on one machine. Central puts the history on one server. Distributed gives every user a full copy of the history — that is Git. You can fetch and push only the edited parts, and you can work offline.",
    chapter: "why",
    section: "types",
    tag: "Foundations",
  },
  {
    id: 3,
    prompt: "Name the four Git objects and what each holds.",
    answer:
      "Blob: file content and metadata (permissions, size, type). Tree: a directory's content and metadata. Commit: a snapshot pointing to a tree, like a bookmark, with a parent pointer. Tagged annotation: a named mark on a commit.",
    chapter: "architecture",
    section: "objects",
    tag: "Architecture",
  },
  {
    id: 4,
    prompt: "Why must a hash function give the same value for the same content?",
    answer:
      "A stable output is how Git derives a unique ID for an object. The same content always returns the same hash, so if the hash changes, Git knows the content changed. Git uses SHA-1.",
    chapter: "architecture",
    section: "hashing",
    tag: "Architecture",
  },
  {
    id: 5,
    prompt: "What are the three trees, and what moves a file between them?",
    answer:
      "Working directory → index (staging area) → repository (.git). git add moves changes into the index, and git commit writes the staged snapshot into the repository.",
    chapter: "architecture",
    section: "three-trees",
    tag: "Architecture",
  },
  {
    id: 6,
    prompt: "Why does the staging area exist? Use the 100-number sheet example.",
    answer:
      "Staging is where you compare new against old and back out before the change lands. With a 100-number sheet you do not create 100 versions; you change everything, stage it, and commit it as one version that is easy to return to.",
    chapter: "architecture",
    section: "staging-why",
    tag: "Architecture",
  },
  {
    id: 7,
    prompt: "Which three steps does git add perform to turn a file from untracked to tracked?",
    answer:
      "1) Apply SHA-1 to the file. 2) Store the SHA in the staging index. 3) Create a blob object in .git that tracks the file. No version is created until you run git commit.",
    chapter: "architecture",
    section: "status",
    tag: "Architecture",
  },
  {
    id: 8,
    prompt: "What do red M and green M mean in git status?",
    answer:
      "Red M means the file differs from both the staging area and the repository. Green M means the file matches the staging area but still differs from the repository (it is staged).",
    chapter: "architecture",
    section: "status",
    tag: "Everyday Git",
  },
  {
    id: 9,
    prompt: "What does git diff <file> compare, and what does git diff --staged compare?",
    answer:
      "git diff <file> compares the working directory against the index. git diff --staged compares the index against the repository (the last commit).",
    chapter: "history",
    section: "diff",
    tag: "Everyday Git",
  },
  {
    id: 10,
    prompt: "How does git reset HEAD~n differ from git reset --hard HEAD~n?",
    answer:
      "git reset HEAD~n moves only the HEAD pointer back n commits, leaving the index and working tree untouched. --hard also resets the index and working tree to that commit, so uncommitted edits are discarded.",
    chapter: "undo",
    section: "reset",
    tag: "Undo",
  },
  {
    id: 11,
    prompt: "How do you recover a commit after resetting past it?",
    answer:
      "Run git reflog to find the SHA or entry, then git reset --hard HEAD@{n} to move forward to it. A reset never deletes the commit immediately.",
    chapter: "undo",
    section: "reflog",
    tag: "Undo",
  },
  {
    id: 12,
    prompt: "What is HEAD, and what two things depend on it?",
    answer:
      "HEAD is the pointer telling Git which commit you are standing on — it holds the SHA of your last commit. Undoing in Git and the content of the working directory both depend on it.",
    chapter: "branching",
    section: "head",
    tag: "Branching",
  },
  {
    id: 13,
    prompt: "Draw a divergent history and show what the merge commit looks like.",
    answer:
      "master: C0 ← C1 ← C2 ← C4 ← C6 (merge). iss53: C3 ← C5, branched from C2, then joined at C6. The new commit C6 has two parents: C4 and C5.",
    chapter: "branching",
    section: "divergent",
    tag: "Branching",
  },
  {
    id: 14,
    prompt: "What are the three choices when you hit a merge conflict?",
    answer: "Keep both, keep incoming, or keep current. Then git add . to mark resolution and commit the merge.",
    chapter: "branching",
    section: "conflicts",
    tag: "Branching",
  },
  {
    id: 15,
    prompt: "What is the difference between git fetch, git merge and git pull?",
    answer:
      "git fetch downloads remote changes but does not merge them into your working tree. git merge brings fetched changes into your branch (often a fast-forward). git pull is fetch followed by merge in one step.",
    chapter: "remotes",
    section: "remote-basics",
    tag: "Remotes",
  },
  {
    id: 16,
    prompt: "Why does the first push of a new branch need -u?",
    answer:
      "-u is shorthand for --set-upstream. The remote does not know your new branch yet, so you create the remote branch and link the local one to it. Without that link there is no upstream relation.",
    chapter: "remotes",
    section: "remote-basics",
    tag: "Remotes",
  },
  {
    id: 17,
    prompt: "List the five steps of the fork workflow.",
    answer:
      "1) Fork the repository into your account. 2) Clone your fork. 3) Add two remotes: your fork and the original repo. 4) Push your work to your fork. 5) Open a pull request on GitHub.",
    chapter: "remotes",
    section: "fork",
    tag: "Remotes",
  },
];

export const guideStats = {
  chapters: chapters.length,
  commands: commandGroups.reduce((total, group) => total + group.items.length, 0),
  questions: quizQuestions.length,
};

export function getChapter(id: ChapterId) {
  return chapters.find((chapter) => chapter.id === id)!;
}

export function neighborChapters(id: ChapterId) {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  return {
    previous: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}
