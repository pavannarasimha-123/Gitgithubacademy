// Topic list shown on the dashboard, grouped by section.
const TOPICS = [
  { id: "git-vs-github", group: "Foundations", title: "Git vs GitHub", summary: "What each one actually is, and how they relate.", icon: "GT" },
  { id: "install-config", group: "Foundations", title: "Install & Configure", summary: "Get Git on your machine and tell it who you are.", icon: "IN" },
  { id: "three-areas", group: "Foundations", title: "The Three Areas", summary: "Working directory, staging area, local repo.", icon: "3A" },
  { id: "init-clone", group: "Core Git", title: "Init & Clone", summary: "Start a repo from scratch or copy one from GitHub.", icon: "CL" },
  { id: "stage-commit", group: "Core Git", title: "Stage & Commit", summary: "status, add, commit, log, diff.", icon: "AC" },
  { id: "branching", group: "Core Git", title: "Branching & Merging", summary: "Parallel lines of work, and bringing them back together.", icon: "BR" },
  { id: "remotes", group: "Core Git", title: "Remotes: Push & Pull", summary: "Sync your local history with GitHub.", icon: "RM" },
  { id: "undoing-changes", group: "Core Git", title: "Undoing Changes", summary: "restore, reset, revert — when things go wrong.", icon: "UN" },
  { id: "stash-tags", group: "Core Git", title: "Stash & Tags", summary: "Shelve work-in-progress; mark release points.", icon: "ST" },
  { id: "gitignore", group: "Core Git", title: ".gitignore", summary: "Keep junk and secrets out of your repo.", icon: "IG" },
  { id: "ssh-keys", group: "Core Git", title: "SSH Keys", summary: "Push to GitHub without typing a password every time.", icon: "SK" },
  { id: "github-repo-setup", group: "GitHub Workflow", title: "Repo on GitHub", summary: "Create a repository through the GitHub UI.", icon: "GH" },
  { id: "push-flow", group: "GitHub Workflow", title: "Pushing to GitHub", summary: "First push, and the everyday commit loop.", icon: "PU" },
  { id: "pr-flow", group: "GitHub Workflow", title: "Pull Requests", summary: "Proposing, reviewing, and merging changes.", icon: "PR" },
  { id: "github-actions", group: "GitHub Workflow", title: "GitHub Actions (CI/CD)", summary: "Run tests and builds automatically on every push.", icon: "GA" },
  { id: "cheatsheet", group: "GitHub Workflow", title: "Command Cheat Sheet", summary: "Every command from this guide, one page.", icon: "CS" },
  { id: "static-vs-dynamic", group: "Deployment", title: "Static vs Dynamic", summary: "What kind of project decides which host you need.", icon: "SD" },
  { id: "vercel", group: "Deployment", title: "Vercel", summary: "Frontend frameworks, static sites, serverless functions.", icon: "VC" },
  { id: "netlify", group: "Deployment", title: "Netlify", summary: "Static hosting, forms, functions.", icon: "NF" },
  { id: "ghpages", group: "Deployment", title: "GitHub Pages", summary: "Free static hosting built into GitHub.", icon: "GP" },
  { id: "render", group: "Deployment", title: "Render", summary: "Static sites, web services, databases, cron jobs.", icon: "RD" },
  { id: "railway", group: "Deployment", title: "Railway", summary: "Fast backend deploys, databases, usage-based pricing.", icon: "RW" },
  { id: "choosing", group: "Deployment", title: "Which One Do I Pick?", summary: "A decision table for your specific project.", icon: "PK" },
];

// Each topic's full content, as an ordered list of "blocks" the
// frontend knows how to render: heading, p, code, list, table,
// steps, callout.
const CONTENT = {

  "git-vs-github": {
    id: "git-vs-github", title: "Git vs GitHub",
    blocks: [
      { type: "p", text: "**Git** is software that runs on your computer. It's a version control system — it watches a folder and, whenever you tell it to, saves a snapshot of every file inside it. You can rewind to any snapshot, compare snapshots, or branch into a parallel timeline. Git works completely offline." },
      { type: "p", text: "**GitHub** is a website that hosts copies of Git repositories in the cloud. It gives your local Git history a home on the internet so you can back it up, share it, collaborate with other people, and layer extra tools on top — issues, pull requests, Actions, Pages. GitHub is one of several places to host a Git repo (GitLab and Bitbucket are others) — it is not Git itself." },
      { type: "callout", tone: "info", label: "Mental model", text: "Git = the save/rewind system on your machine. GitHub = the cloud drive + social layer built around Git. You could use Git your whole life and never touch GitHub — but GitHub is useless without Git underneath it." },
      { type: "table", headers: ["", "Git", "GitHub"], rows: [
        ["What it is", "A command-line program", "A website / cloud service"],
        ["Runs where", "Your computer, offline", "GitHub's servers"],
        ["Stores", "Commit history in a .git folder", "A hosted copy of that history"],
        ["Extra features", "None — just version control", "Issues, PRs, Actions, Pages, project boards"],
      ]},
    ],
  },

  "install-config": {
    id: "install-config", title: "Install & Configure Git",
    blocks: [
      { type: "p", text: "Before your first commit, Git needs to know who you are — this name and email get stamped onto every snapshot you create." },
      { type: "heading", level: 4, text: "Check if Git is already installed" },
      { type: "code", label: "terminal", lines: [
        { t: "$ git --version" },
        { t: "# git version 2.44.0  -> you're good to go", cmt: true },
      ]},
      { type: "heading", level: 4, text: "Install it" },
      { type: "table", headers: ["OS", "Command / method"], rows: [
        ["macOS", "xcode-select --install, or brew install git"],
        ["Windows", "Download the installer from git-scm.com (includes Git Bash)"],
        ["Linux (Debian/Ubuntu)", "sudo apt update && sudo apt install git"],
      ]},
      { type: "heading", level: 4, text: "Tell Git who you are (one-time, global)" },
      { type: "code", label: "terminal", lines: [
        { t: '$ git config --global user.name "Your Name"' },
        { t: '$ git config --global user.email "you@example.com"' },
        { t: "$ git config --global init.defaultBranch main" },
        { t: "$ git config --list", cmt: false },
      ]},
      { type: "p", text: "Use the **same email** here as on your GitHub account — that's how GitHub matches your commits to your profile and contribution graph." },
    ],
  },

  "three-areas": {
    id: "three-areas", title: "The Three Areas",
    blocks: [
      { type: "p", text: "Almost every confusing Git moment comes from not knowing which of three zones a file currently sits in." },
      { type: "table", headers: ["Area", "What lives here", "How things move forward"], rows: [
        ["Working Directory", "The actual files on disk, exactly as you see them in your editor", "git add moves changes to Staging"],
        ["Staging Area (Index)", "A holding zone listing exactly which changes go into the next commit", "git commit moves staged changes to the Local Repository"],
        ["Local Repository", "The permanent, saved history of commits, inside the hidden .git folder", "git push sends commits to the Remote (GitHub)"],
      ]},
      { type: "callout", tone: "info", label: "The everyday cycle", text: "edit files -> git add -> git commit -> git push. Every Git session is some version of this loop." },
    ],
  },

  "init-clone": {
    id: "init-clone", title: "Init & Clone",
    blocks: [
      { type: "p", text: "There are two ways to get a Git repository on your machine: create a brand-new one, or copy down one that already exists on GitHub." },
      { type: "heading", level: 4, text: "Option A — start from scratch with git init" },
      { type: "code", label: "terminal", lines: [
        { t: "$ mkdir my-project && cd my-project" },
        { t: "$ git init" },
        { t: "# Initialized empty Git repository in /my-project/.git/", cmt: true },
      ]},
      { type: "p", text: "This creates a hidden .git folder — that folder IS the repository. Delete it and the folder becomes untracked again." },
      { type: "heading", level: 4, text: "Option B — copy an existing repo with git clone" },
      { type: "p", text: "Cloning downloads a full copy of a repository — every file, commit, and branch — and wires it up to talk back to that GitHub repo." },
      { type: "code", label: "terminal", lines: [
        { t: "$ git clone https://github.com/username/repo-name.git" },
        { t: "# or over SSH, once you've added a key to GitHub:", cmt: true },
        { t: "$ git clone git@github.com:username/repo-name.git" },
        { t: "# clone into a custom folder name", cmt: true },
        { t: "$ git clone https://github.com/username/repo-name.git my-folder" },
      ]},
      { type: "steps", items: [
        { title: "Go to the repository on GitHub", body: "Open the repo's page and click the green Code button." },
        { title: "Copy the URL", body: "HTTPS is simplest (login prompt on push); SSH uses a key, no password prompts once set up." },
        { title: "Run git clone in your terminal", body: "Navigate to the folder you want the project in, then paste the command." },
        { title: "Move in and check the connection", body: "cd repo-name then git remote -v — you'll see origin already pointing at GitHub." },
      ]},
      { type: "callout", tone: "info", label: "Why clone instead of downloading a ZIP", text: "A ZIP is a snapshot with no history and no link back to GitHub. Cloning keeps the full commit history and the live origin connection so you can pull and push." },
    ],
  },

  "stage-commit": {
    id: "stage-commit", title: "Stage & Commit",
    blocks: [
      { type: "heading", level: 4, text: "git status — what has changed?" },
      { type: "p", text: "Your first move, every time. It lists modified, new, and staged files, and tells you the next command to run." },
      { type: "code", label: "terminal", lines: [
        { t: "$ git status" },
        { t: "# On branch main", cmt: true },
        { t: "# Changes not staged for commit: modified: index.html", cmt: true },
        { t: "# Untracked files: new-file.js", cmt: true },
      ]},
      { type: "heading", level: 4, text: "git add — stage your changes" },
      { type: "code", label: "terminal", lines: [
        { t: "$ git add index.html          # stage one file" },
        { t: "$ git add src/ styles/          # stage entire folders" },
        { t: "$ git add .                     # stage everything changed" },
        { t: "$ git add -p                    # stage changes piece-by-piece" },
      ]},
      { type: "heading", level: 4, text: "git commit — save a permanent snapshot" },
      { type: "code", label: "terminal", lines: [
        { t: '$ git commit -m "Add login form validation"' },
        { t: "# stage all tracked files AND commit in one step", cmt: true },
        { t: '$ git commit -am "Fix typo in header"' },
        { t: "# edit the previous commit instead of a new one", cmt: true },
        { t: '$ git commit --amend -m "Corrected message"' },
      ]},
      { type: "p", text: "Write commit messages in the imperative mood — \"Add\", \"Fix\", \"Refactor\" — not \"Added\" or \"I added\". Good history reads like a changelog." },
      { type: "heading", level: 4, text: "git log & git diff — see the history" },
      { type: "code", label: "terminal", lines: [
        { t: "$ git log                          # full history" },
        { t: "$ git log --oneline --graph --all  # compact, visual" },
        { t: "$ git diff                         # unstaged changes" },
        { t: "$ git diff --staged                # staged changes" },
      ]},
    ],
  },

  "branching": {
    id: "branching", title: "Branching & Merging",
    blocks: [
      { type: "p", text: "A branch is a separate line of development. You get one automatically — main — and can create as many more as you like to build features without touching the stable code." },
      { type: "code", label: "terminal", lines: [
        { t: "$ git branch                         # list branches" },
        { t: "$ git branch feature/login-form       # create a new branch" },
        { t: "$ git checkout feature/login-form     # switch to it" },
        { t: "$ git checkout -b feature/login-form  # create + switch in one step" },
        { t: "$ git switch feature/login-form       # modern alternative" },
        { t: "$ git switch -c feature/login-form    # modern create + switch" },
        { t: "# once the feature is done:", cmt: true },
        { t: "$ git checkout main" },
        { t: "$ git merge feature/login-form" },
        { t: "$ git branch -d feature/login-form    # delete once merged" },
      ]},
      { type: "callout", tone: "warn", label: "Merge conflicts", text: "If the same lines changed on both branches, Git marks the file with <<<<<<< / ======= / >>>>>>> markers. Open the file, decide the final code, delete the markers, then git add and git commit to finish the merge." },
      { type: "heading", level: 4, text: "Merge vs rebase" },
      { type: "table", headers: ["", "git merge", "git rebase"], rows: [
        ["History shape", "Keeps both timelines, adds a merge commit", "Rewrites your commits on top of the target branch — linear history"],
        ["Safe on shared branches?", "Yes, always", "Avoid rebasing commits others have already pulled"],
        ["Typical use", "Bringing a feature branch into main", "Cleaning up a feature branch before opening a PR"],
      ]},
    ],
  },

  "remotes": {
    id: "remotes", title: "Remotes: Push & Pull",
    blocks: [
      { type: "p", text: "A remote is a nickname Git uses for a repository's URL somewhere else — almost always GitHub. The default nickname is origin." },
      { type: "code", label: "terminal", lines: [
        { t: "$ git remote add origin https://github.com/username/repo-name.git" },
        { t: "$ git remote -v                    # view configured remotes" },
        { t: "$ git push -u origin main         # first push: -u remembers this pairing" },
        { t: "$ git push                        # every push after that" },
        { t: "$ git pull                        # fetch + merge remote changes" },
        { t: "$ git fetch                       # download only, no merge" },
      ]},
      { type: "table", headers: ["Command", "Direction", "What it does"], rows: [
        ["git push", "local -> remote", "Uploads your local commits to GitHub"],
        ["git pull", "remote -> local", "Downloads and merges GitHub's commits into your current branch"],
        ["git fetch", "remote -> local", "Downloads GitHub's commits but leaves your branch untouched"],
      ]},
      { type: "callout", tone: "danger", label: "If push is rejected", text: "\"Updates were rejected because the remote contains work you do not have locally\" means someone else pushed first. Run git pull to bring in those changes (resolve conflicts if any) before pushing again." },
    ],
  },

  "undoing-changes": {
    id: "undoing-changes", title: "Undoing Changes",
    blocks: [
      { type: "p", text: "Git gives you a different undo command depending on exactly what you want to take back — and whether it's already been shared with anyone else." },
      { type: "table", headers: ["Command", "Undoes what", "Safe after pushing?"], rows: [
        ["git restore <file>", "Discards uncommitted edits in the working directory", "N/A — local only"],
        ["git restore --staged <file>", "Unstages a file without losing the edit", "N/A — local only"],
        ["git reset --soft HEAD~1", "Removes the last commit, keeps changes staged", "No — rewrites history"],
        ["git reset --hard HEAD~1", "Removes the last commit AND its changes entirely", "No — rewrites history, destructive"],
        ["git revert <commit>", "Creates a brand-new commit that undoes an earlier one", "Yes — safe on shared branches"],
      ]},
      { type: "code", label: "terminal", lines: [
        { t: "$ git restore index.html            # throw away local edits" },
        { t: "$ git restore --staged index.html   # unstage but keep the edit" },
        { t: "$ git reset --soft HEAD~1           # undo last commit, keep changes" },
        { t: "$ git revert a1b2c3d                # safely undo a pushed commit" },
      ]},
      { type: "callout", tone: "danger", label: "Rule of thumb", text: "Never reset or force-push over history that other people have already pulled. Once a commit is on a shared branch, use revert instead." },
    ],
  },

  "stash-tags": {
    id: "stash-tags", title: "Stash & Tags",
    blocks: [
      { type: "heading", level: 4, text: "git stash — shelve work-in-progress" },
      { type: "p", text: "Stash temporarily puts away uncommitted changes so you can switch branches with a clean working directory, then bring them back later." },
      { type: "code", label: "terminal", lines: [
        { t: "$ git stash                 # shelve current changes" },
        { t: '$ git stash save "wip: nav" # shelve with a note' },
        { t: "$ git stash list            # see everything stashed" },
        { t: "$ git stash pop             # reapply the latest stash and remove it" },
        { t: "$ git stash apply           # reapply but keep it in the list" },
        { t: "$ git stash drop            # delete a stash without applying it" },
      ]},
      { type: "heading", level: 4, text: "git tag — mark a release point" },
      { type: "p", text: "A tag is a permanent label on a specific commit — used for version numbers like v1.0.0." },
      { type: "code", label: "terminal", lines: [
        { t: "$ git tag v1.0.0                       # lightweight tag on the latest commit" },
        { t: '$ git tag -a v1.0.0 -m "First release" # annotated tag, with message' },
        { t: "$ git push origin v1.0.0               # push a single tag" },
        { t: "$ git push origin --tags               # push all tags" },
      ]},
    ],
  },

  "gitignore": {
    id: "gitignore", title: ".gitignore",
    blocks: [
      { type: "p", text: "A .gitignore file tells Git which files or folders to never track — dependency folders, build output, secrets, OS clutter. Create it in your project root." },
      { type: "code", label: ".gitignore", lines: [
        { t: "node_modules/" },
        { t: "dist/" },
        { t: "build/" },
        { t: ".env" },
        { t: ".DS_Store" },
        { t: "*.log" },
      ]},
      { type: "callout", tone: "warn", label: "Already tracked a file by accident?", text: "Adding it to .gitignore later won't untrack it. Remove it from Git's tracking (keeping the file on disk) with: git rm --cached <file>, then commit." },
      { type: "code", label: "terminal", lines: [
        { t: "$ git rm --cached .env" },
        { t: '$ git commit -m "Stop tracking .env"' },
      ]},
    ],
  },

  "ssh-keys": {
    id: "ssh-keys", title: "SSH Keys for GitHub",
    blocks: [
      { type: "p", text: "SSH keys let you push and pull from GitHub without typing your username and a personal access token every time." },
      { type: "steps", items: [
        { title: "Generate a key pair", body: 'ssh-keygen -t ed25519 -C "you@example.com" then press Enter to accept the default file location.' },
        { title: "Start the SSH agent and add the key", body: 'eval "$(ssh-agent -s)" then ssh-add ~/.ssh/id_ed25519' },
        { title: "Copy the public key", body: "cat ~/.ssh/id_ed25519.pub, then copy the full output." },
        { title: "Add it to GitHub", body: "GitHub -> Settings -> SSH and GPG keys -> New SSH key -> paste it -> Add SSH key." },
        { title: "Test the connection", body: "ssh -T git@github.com — you should see a success message with your username." },
        { title: "Use SSH remote URLs from now on", body: "git@github.com:username/repo.git instead of the https:// version." },
      ]},
      { type: "code", label: "terminal", lines: [
        { t: '$ ssh-keygen -t ed25519 -C "you@example.com"' },
        { t: '$ eval "$(ssh-agent -s)"' },
        { t: "$ ssh-add ~/.ssh/id_ed25519" },
        { t: "$ cat ~/.ssh/id_ed25519.pub" },
        { t: "$ ssh -T git@github.com" },
      ]},
    ],
  },

  "github-repo-setup": {
    id: "github-repo-setup", title: "Creating a Repository on GitHub",
    blocks: [
      { type: "steps", items: [
        { title: "Click \"New\" from your GitHub dashboard", body: "Or the + icon top-right -> New repository." },
        { title: "Name it and set visibility", body: "Pick a name and description, choose Public (anyone can see it) or Private (invite-only)." },
        { title: "Skip or add a README", body: "If you already have a local project, leave \"Add a README\" unchecked — GitHub will show you the exact commands to connect it. Starting fresh on GitHub? Check it." },
        { title: "Click \"Create repository\"", body: "GitHub shows the remote URL and the exact commands for your situation, new project or existing one." },
      ]},
    ],
  },

  "push-flow": {
    id: "push-flow", title: "Pushing a Local Project to GitHub",
    blocks: [
      { type: "code", label: "terminal — full sequence", lines: [
        { t: "$ cd my-project" },
        { t: "$ git init" },
        { t: "$ git add ." },
        { t: '$ git commit -m "Initial commit"' },
        { t: "$ git branch -M main" },
        { t: "$ git remote add origin https://github.com/username/my-project.git" },
        { t: "$ git push -u origin main" },
      ]},
      { type: "p", text: "After this first push, GitHub shows your files. Every future change follows a short loop:" },
      { type: "code", label: "terminal — the everyday loop", lines: [
        { t: "$ git pull                       # make sure you're up to date first" },
        { t: "# ...edit your files...", cmt: true },
        { t: "$ git add ." },
        { t: '$ git commit -m "Describe what changed"' },
        { t: "$ git push" },
      ]},
    ],
  },

  "pr-flow": {
    id: "pr-flow", title: "Pull Requests",
    blocks: [
      { type: "p", text: "A pull request (PR) proposes merging changes from one branch (or a fork) into another, with a review step in between. It's how teams review code before it reaches main, and how you contribute to projects you don't have write access to." },
      { type: "heading", level: 3, text: "Case 1 — a repo you own (or have write access to)" },
      { type: "steps", items: [
        { title: "Create a feature branch off main", body: "git checkout -b feature/new-navbar" },
        { title: "Commit your work and push the branch", body: "git push -u origin feature/new-navbar" },
        { title: "Open the PR on GitHub", body: "Click the yellow \"Compare & pull request\" banner GitHub shows after a fresh push, or go to Pull requests -> New pull request and pick base (main) vs compare (your branch)." },
        { title: "Write a title and description, then submit", body: "Explain what changed and why. Reviewers can leave inline comments on specific lines." },
        { title: "Address feedback", body: "Push more commits to the same branch — the PR updates automatically." },
        { title: "Merge", body: "Click Merge pull request (or Squash/Rebase merge), then delete the branch." },
      ]},
      { type: "heading", level: 3, text: "Case 2 — contributing to someone else's repo" },
      { type: "steps", items: [
        { title: "Fork it", body: "Click Fork on their repo page — GitHub creates a full copy under your account." },
        { title: "Clone your fork", body: "git clone https://github.com/YOUR-username/their-repo.git" },
        { title: "Add the original repo as a second remote", body: "git remote add upstream https://github.com/original-owner/their-repo.git — lets you pull their latest changes with git pull upstream main." },
        { title: "Branch, commit, push to YOUR fork", body: "git checkout -b fix/typo, commit, then git push origin fix/typo" },
        { title: "Open a pull request from your fork to their repo", body: "On the original repository: Pull requests -> New pull request -> compare across forks -> pick your branch." },
      ]},
    ],
  },

  "github-actions": {
    id: "github-actions", title: "GitHub Actions (CI/CD)",
    blocks: [
      { type: "p", text: "GitHub Actions runs automated workflows — tests, builds, deploys — every time you push or open a PR. A workflow is a YAML file living in .github/workflows/." },
      { type: "code", label: ".github/workflows/ci.yml", lines: [
        { t: "name: CI" },
        { t: "on: [push, pull_request]" },
        { t: "jobs:" },
        { t: "  build:" },
        { t: "    runs-on: ubuntu-latest" },
        { t: "    steps:" },
        { t: "      - uses: actions/checkout@v4" },
        { t: "      - uses: actions/setup-node@v4" },
        { t: "        with: { node-version: 20 }" },
        { t: "      - run: npm install" },
        { t: "      - run: npm test" },
      ]},
      { type: "steps", items: [
        { title: "Create the workflow file", body: "Add .github/workflows/ci.yml to your repo as shown above." },
        { title: "Commit and push it", body: "git add .github/workflows/ci.yml && git commit -m \"Add CI\" && git push" },
        { title: "Watch it run", body: "Open the Actions tab on GitHub — every push now triggers this workflow automatically." },
        { title: "Add a status badge (optional)", body: "GitHub provides a markdown snippet under the workflow's ⋯ menu -> Create status badge, to show pass/fail in your README." },
      ]},
    ],
  },

  "cheatsheet": {
    id: "cheatsheet", title: "Full Command Cheat Sheet",
    blocks: [
      { type: "table", headers: ["Setup & Info", ""], rows: [
        ["git init", "start a new repo"],
        ["git clone <url>", "copy a remote repo locally"],
        ["git status", "see what's changed"],
        ["git log --oneline", "compact commit history"],
        ["git diff", "line-by-line unstaged changes"],
        ["git remote -v", "list connected remotes"],
      ]},
      { type: "table", headers: ["Saving Work", ""], rows: [
        ["git add <file>", "stage a file"],
        ["git add .", "stage everything"],
        ['git commit -m ""', "save a snapshot"],
        ["git commit --amend", "edit the last commit"],
        ["git restore <file>", "discard local edits"],
        ["git reset --soft HEAD~1", "undo last commit, keep changes"],
      ]},
      { type: "table", headers: ["Branching", ""], rows: [
        ["git branch", "list branches"],
        ["git checkout -b <n>", "create + switch"],
        ["git switch <n>", "switch branch"],
        ["git merge <n>", "merge branch into current"],
        ["git branch -d <n>", "delete merged branch"],
        ["git rebase <n>", "replay commits on top of n"],
      ]},
      { type: "table", headers: ["Remote / GitHub", ""], rows: [
        ["git remote add origin <url>", "connect to GitHub"],
        ["git push -u origin main", "first push, sets tracking"],
        ["git push", "upload commits"],
        ["git pull", "download + merge"],
        ["git fetch", "download only"],
        ["git stash", "shelve changes temporarily"],
      ]},
    ],
  },

  "static-vs-dynamic": {
    id: "static-vs-dynamic", title: "Static vs Dynamic",
    blocks: [
      { type: "p", text: "Every deployment tool draws a line between these two categories. Knowing which one your project is decides which platform, and which settings, you need." },
      { type: "compare", left: {
        title: "Static site", color: "green",
        text: "Pre-built HTML, CSS and JS files. The server's only job is handing them to the browser — no code runs per-request.",
        items: ["Plain HTML/CSS/JS sites", "React/Vue/Svelte apps built with npm run build", "Portfolios, docs, blogs, landing pages", "Deploys: GitHub Pages, Netlify, Vercel"],
      }, right: {
        title: "Dynamic site / backend", color: "blue",
        text: "A server process keeps running, executes code per request, usually talks to a database.",
        items: ["Node/Express, Django, Rails, Go APIs", "Apps needing a database, auth, background jobs", "Full-stack Next.js apps with server routes", "Deploys: Render, Railway, Vercel (serverless)"],
      }},
    ],
  },

  vercel: {
    id: "vercel", title: "Vercel", badge: "▲", badgeColor: "#000",
    blocks: [
      { type: "p", text: "Vercel is built by the creators of Next.js and is the smoothest option for frontend frameworks (React, Next.js, Vue, Svelte) and for static sites. It also runs backend logic through short-lived serverless functions, but isn't meant for a long-running traditional server." },
      { type: "heading", level: 4, text: "Deploy a static site or frontend app" },
      { type: "steps", items: [
        { title: "Push your project to GitHub", body: "Vercel deploys directly from a repo." },
        { title: "Sign up at vercel.com with GitHub", body: "Lets Vercel list your repositories directly." },
        { title: "Click \"Add New\" -> \"Project\"", body: "Select the repository to deploy." },
        { title: "Configure the build", body: "Vercel auto-detects the framework and fills in the build command and output directory. Add environment variables here." },
        { title: "Click \"Deploy\"", body: "Vercel installs dependencies, builds, and gives you a live URL like your-project.vercel.app in under a minute." },
        { title: "Every future push auto-deploys", body: "Push to main -> production updates. Any other branch or PR -> a unique preview URL is built automatically." },
      ]},
      { type: "heading", level: 4, text: "Deploying a serverless function" },
      { type: "p", text: "Any file in an /api folder at your project root becomes an HTTP endpoint automatically — no extra config." },
      { type: "code", label: "api/hello.js", lines: [
        { t: "export default function handler(req, res) {" },
        { t: '  res.status(200).json({ message: "Hello from Vercel" });' },
        { t: "}" },
      ]},
      { type: "heading", level: 4, text: "Deploying from the terminal (CLI)" },
      { type: "code", label: "terminal", lines: [
        { t: "$ npm install -g vercel" },
        { t: "$ vercel login" },
        { t: "$ cd my-project" },
        { t: "$ vercel                 # deploys a preview" },
        { t: "$ vercel --prod          # deploys straight to production" },
      ]},
    ],
  },

  netlify: {
    id: "netlify", title: "Netlify", badge: "◆", badgeColor: "#0b1a12",
    blocks: [
      { type: "p", text: "Netlify is one of the original static-hosting platforms — very simple for pure static sites, plus extras like built-in form handling and split testing without writing backend code." },
      { type: "heading", level: 4, text: "Deploy a static site" },
      { type: "steps", items: [
        { title: "Push your project to GitHub", body: "Same starting point as any Git-based deploy." },
        { title: "Sign up at netlify.com with GitHub", body: "Click \"Add new site\" -> \"Import an existing project.\"" },
        { title: "Pick the repository", body: "Authorize Netlify to access GitHub if prompted, then select the repo." },
        { title: "Set the build command and publish directory", body: "e.g. build command npm run build, publish directory dist or build." },
        { title: "Click \"Deploy site\"", body: "You get a URL like random-name-123.netlify.app — rename it under Site settings." },
      ]},
      { type: "heading", level: 4, text: "Deploying a Netlify Function (backend logic)" },
      { type: "code", label: "netlify/functions/hello.js", lines: [
        { t: "exports.handler = async function (event, context) {" },
        { t: "  return {" },
        { t: "    statusCode: 200," },
        { t: '    body: JSON.stringify({ message: "Hello from Netlify" }),' },
        { t: "  };" },
        { t: "};" },
      ]},
      { type: "heading", level: 4, text: "Deploying from the terminal (CLI)" },
      { type: "code", label: "terminal", lines: [
        { t: "$ npm install -g netlify-cli" },
        { t: "$ netlify login" },
        { t: "$ cd my-project" },
        { t: "$ netlify init            # links folder to a Netlify site" },
        { t: "$ netlify deploy --prod  # ships to production" },
      ]},
    ],
  },

  ghpages: {
    id: "ghpages", title: "GitHub Pages", badge: "⌂", badgeColor: "#161b22",
    blocks: [
      { type: "p", text: "GitHub Pages serves static files straight from a repository — no third-party sign-up needed since it's built into GitHub. It cannot run a backend or database." },
      { type: "steps", items: [
        { title: "Push your static files to GitHub", body: "Plain HTML/CSS/JS, or the built output of a framework (a dist/build folder)." },
        { title: "Open repo Settings -> Pages", body: "In the left sidebar of your repository's Settings tab." },
        { title: "Choose the source", body: "A branch (main, folder /root or /docs) for plain sites, or \"GitHub Actions\" for projects needing a build step first." },
        { title: "Save and wait a minute", body: "GitHub gives you a URL: https://username.github.io/repo-name" },
      ]},
      { type: "heading", level: 4, text: "Deploying a built frontend app" },
      { type: "code", label: "terminal", lines: [
        { t: "$ npm install --save-dev gh-pages" },
        { t: "# in package.json add:", cmt: true },
        { t: '#   "homepage": "https://username.github.io/repo-name",', cmt: true },
        { t: '#   "scripts": { "deploy": "gh-pages -d dist" }', cmt: true },
        { t: "$ npm run build" },
        { t: "$ npm run deploy" },
      ]},
    ],
  },

  render: {
    id: "render", title: "Render", badge: "◉", badgeColor: "#0d1a2b",
    blocks: [
      { type: "p", text: "Render is a full cloud platform. It can host static sites, but is mainly chosen for long-running web services — Node, Python, Ruby, Go, Docker — plus managed Postgres/Redis, cron jobs, and background workers, all wired to auto-deploy from GitHub." },

      { type: "heading", level: 3, text: "A. Deploying a Static Site on Render" },
      { type: "steps", items: [
        { title: "Push your static files (or frontend build) to GitHub", body: "Plain HTML or a React/Vue/etc. project with a build script." },
        { title: "Click \"New +\" -> \"Static Site\"", body: "Connect GitHub if you haven't already, then pick the repo." },
        { title: "Set the build command and publish directory", body: "e.g. npm run build and dist or build." },
        { title: "Click \"Create Static Site\"", body: "Render builds and serves it on a *.onrender.com URL, free of charge, with automatic HTTPS." },
        { title: "Every push redeploys automatically", body: "Watch the build log live in the Render dashboard." },
      ]},

      { type: "heading", level: 3, text: "B. Deploying a Web Service (backend) on Render" },
      { type: "steps", items: [
        { title: "Push your backend code to GitHub", body: "Make sure it listens on the port Render provides via process.env.PORT — Render assigns the port dynamically." },
        { title: "Click \"New +\" -> \"Web Service\"", body: "Choose your repository from the list." },
        { title: "Pick the runtime", body: "Node, Python, Ruby, Go, Rust, or Docker — Render detects it or lets you choose manually." },
        { title: "Set Build Command and Start Command", body: "e.g. npm install && npm run build for build, npm start to run it." },
        { title: "Add environment variables", body: "Under the Environment tab — database URLs, API keys, secrets." },
        { title: "Choose a plan and click \"Create Web Service\"", body: "Free tier works for testing but spins down when idle (cold start on next request). Paid plans stay always-on." },
        { title: "Auto-deploy on every push", body: "Every push to your chosen branch triggers a fresh build and deploy." },
      ]},

      { type: "heading", level: 3, text: "C. Adding a Database on Render" },
      { type: "steps", items: [
        { title: "Click \"New +\" -> \"PostgreSQL\"", body: "(or Redis, under the same menu)" },
        { title: "Name it and pick a region and plan", body: "Match the region to your web service for lowest latency." },
        { title: "Click \"Create Database\"", body: "Render provisions it and shows you an Internal and External connection string." },
        { title: "Copy the Internal Database URL", body: "Paste it into your web service's environment variables (e.g. DATABASE_URL)." },
        { title: "Redeploy your web service", body: "So it picks up the new environment variable and connects." },
      ]},
    ],
  },

  railway: {
    id: "railway", title: "Railway", badge: "⛭", badgeColor: "#1a0d2b",
    blocks: [
      { type: "p", text: "Railway serves a similar purpose to Render — backend services, databases, cron jobs — with an emphasis on very fast \"point at a repo and it just runs\" setup, and usage-based pricing rather than fixed tiers." },

      { type: "heading", level: 3, text: "A. Deploying a Static Site on Railway" },
      { type: "steps", items: [
        { title: "Push your static build to GitHub", body: "A dist/build folder from any frontend framework, or plain HTML files." },
        { title: "Click \"New Project\" -> \"Deploy from GitHub repo\"", body: "Pick the repository." },
        { title: "Add a static file server", body: "Railway runs Node projects as services — add a tiny start script (e.g. using the serve package: \"start\": \"serve -s dist\") so it has something to run." },
        { title: "Generate a public domain", body: "Settings -> Networking -> \"Generate Domain\"." },
        { title: "Every push redeploys automatically", body: "Watch build/runtime logs in the project dashboard." },
      ]},

      { type: "heading", level: 3, text: "B. Deploying a Web Service (backend) on Railway" },
      { type: "steps", items: [
        { title: "Push your code to GitHub", body: "Railway auto-detects most runtimes (Node, Python, Go, Rust, and more) via Nixpacks — usually no config file needed." },
        { title: "Sign up at railway.app with GitHub", body: "Authorize access to your repositories." },
        { title: "Click \"New Project\" -> \"Deploy from GitHub repo\"", body: "Select the repository." },
        { title: "Let Railway auto-detect, or set commands manually", body: "Override the build/start commands in Settings if auto-detection guesses wrong." },
        { title: "Add environment variables", body: "Variables tab -> paste in your .env values." },
        { title: "Generate a public domain", body: "Settings -> Networking -> \"Generate Domain\" — Railway doesn't expose a port publicly by default." },
        { title: "Every push redeploys automatically", body: "Watch build and runtime logs directly in the dashboard." },
      ]},

      { type: "heading", level: 3, text: "C. Adding a Database on Railway" },
      { type: "steps", items: [
        { title: "Inside your project, click \"New\"", body: "Choose \"Database\" from the menu." },
        { title: "Pick Postgres, MySQL, MongoDB, or Redis", body: "Railway provisions it in seconds." },
        { title: "Connection variables are auto-injected", body: "Services in the same project automatically get reference variables like DATABASE_URL — no manual copy-paste needed." },
        { title: "Reference the variable in your service", body: "Use ${{Postgres.DATABASE_URL}} style references in your service's own Variables tab, or read process.env.DATABASE_URL in code." },
      ]},

      { type: "heading", level: 4, text: "Deploying from the terminal (CLI)" },
      { type: "code", label: "terminal", lines: [
        { t: "$ npm install -g @railway/cli" },
        { t: "$ railway login" },
        { t: "$ cd my-project" },
        { t: "$ railway init" },
        { t: "$ railway up            # builds and deploys the current folder" },
      ]},
    ],
  },

  choosing: {
    id: "choosing", title: "Which One Do I Pick?",
    blocks: [
      { type: "table", headers: ["Your project", "Go with", "Why"], rows: [
        ["Plain HTML/CSS/JS site, portfolio, docs", "GitHub Pages", "Free, zero extra sign-up, lives right next to your repo"],
        ["React / Next.js / Vue frontend", "Vercel", "Best-in-class DX, instant PR previews, native framework support"],
        ["JAMstack site with forms or A/B tests", "Netlify", "Built-in form handling and split testing without a backend"],
        ["Node/Python/Go API + database", "Render or Railway", "Long-running servers, managed databases, background jobs"],
        ["Fastest \"just deploy it\" backend setup", "Railway", "Auto-detects almost any stack, usage-based pricing"],
        ["Predictable fixed pricing tiers & cron jobs", "Render", "Clear free/paid tiers, built-in scheduled jobs"],
      ]},
      { type: "callout", tone: "info", label: "They all share one habit", text: "Connect the GitHub repo once, and every one of these platforms rebuilds and redeploys automatically on every git push. Master the Git/GitHub workflow, and deployment becomes the easy part." },
    ],
  },
};

module.exports = { TOPICS, CONTENT };
