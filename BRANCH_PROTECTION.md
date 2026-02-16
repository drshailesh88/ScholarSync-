# Branch Protection Rules

Configure these rules in GitHub Settings > Branches > Branch protection rules for `main`.

## Required Status Checks

Enable **Require status checks to pass before merging** with these checks:

- `quality` — TypeScript + ESLint zero tolerance
- `test` — Unit tests + coverage threshold (50% minimum)
- `security` — Dependency audit + hardcoded secrets scan
- `build` — Next.js production build + Docker image

## Required Reviews

- **Require pull request reviews before merging**: 1 approval minimum
- **Dismiss stale pull request approvals when new commits are pushed**: Enabled
- **Require review from code owners**: Recommended for billing and auth paths

## Branch Restrictions

- **Do not allow force pushes to `main`**
- **Do not allow deletions of `main`**
- **Require linear history**: Recommended (enforces squash or rebase merges)

## Setup Steps

1. Go to **Settings > Branches** in the GitHub repository
2. Click **Add branch protection rule**
3. Set **Branch name pattern** to `main`
4. Check the boxes described above
5. Click **Create** / **Save changes**
