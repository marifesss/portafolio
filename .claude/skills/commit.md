---
name: commit
description: Write a commit message for this repo following Conventional Commits, with scopes tailored to the portfolio's src/features and src/content structure. Use this whenever generating, writing, or proposing a git commit message in this project.
---

# Commit messages (Conventional Commits)

Generate commit messages that follow the [Conventional Commits](https://www.conventionalcommits.org/) spec, using the scopes defined for **this** project.

## Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

- **Subject**: imperative mood, lowercase, no trailing period, ≤ 72 chars ("add", not "added"/"adds").
- **Body** (optional): explain *what* and *why*, not *how*. Wrap at ~72 chars. Use bullet points for multiple changes.
- Omit the scope only when a change is truly global (e.g. `chore: bump dependencies`).
- End the commit message with the co-author trailer required by this environment:
  ```
  Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
  ```

## Types

| Type       | Use for                                                        |
| ---------- | -------------------------------------------------------------- |
| `feat`     | New feature or user-facing capability                          |
| `fix`      | Bug fix                                                        |
| `content`  | Adding/updating portfolio copy or data in `src/content`        |
| `style`    | Visual/CSS/formatting only, no behavior change                 |
| `refactor` | Code change that neither fixes a bug nor adds a feature        |
| `docs`     | Docs only (`README.md`, `ARCHITECTURE.md`, `CLAUDE.md`, JSDoc) |
| `perf`     | Performance improvement                                        |
| `build`    | Build system, deps, or tooling (`package.json`, config)        |
| `chore`    | Maintenance that doesn't fit above                             |

> `content` is a project-specific type: this is a content-driven portfolio, so
> data changes are first-class. Prefer `content(<section>)` for copy/asset
> updates and `feat(<section>)` when the change is new UI/behavior.

## Scopes (tailored to this project)

Derived from `src/features/*` and `src/content/*`. For a given section, use the
**same scope name** whether you're touching its feature UI or its content data.

**Section scopes** (feature + its content):

- `home` — `src/features/home`
- `profile` — `src/features/profile`, `src/content/profile.ts`
- `projects` — `src/features/projects`, `src/content/projects.ts`
- `experience` — `src/features/experience`, `src/content/experience.ts`
- `skills` — `src/features/skills`, `src/content/skills.ts`
- `records` — `src/features/records`, `src/content/records.ts`
- `contact` — `src/features/contact`, `src/content/contact.ts`

**Cross-cutting scopes:**

- `content` — content layer as a whole (`src/content/index.ts`, `site.ts`, `navigation.ts`)
- `shell` / `layout` — persistent chrome in `src/components/layout` (AppShell, Sidebar, PlayerBar, LanguageToggle)
- `ui` — design-system primitives in `src/components/ui` (Chip, SectionHeader)
- `i18n` — language handling (`src/i18n`, LanguageProvider, dictionary)
- `types` — shared types in `src/lib/types.ts`
- `app` — routing layer in `src/app` (routes, layout, metadata)
- `theme` — Tailwind tokens / `globals.css`
- `config` — tooling/config (`tsconfig`, `next.config`, eslint, etc.)
- `deps` — dependency changes

Pick the **most specific** scope. If a change spans multiple sections, use the
cross-cutting scope that best describes it (e.g. `i18n`, `ui`, `content`), or
split into separate commits.

## Guidelines

- One logical change per commit. If the diff mixes concerns, suggest splitting it.
- Match the scope to where the change actually lives (see the map above).
- When a commit completes a pending item, remove the matching `// TODO` marker in
  `src/content` in the same commit and mention it in the body.
- Reference the section by its scope, not the folder path, in the subject.

## Examples

```
content(projects): add Yelou repo and live demo links

Fills in the GitHub and deploy URLs and removes the // TODO markers
now that the assets are ready.
```

```
feat(projects): add architecture-diagram tab to project detail
```

```
feat(i18n): persist selected locale to localStorage
```

```
style(ui): tighten Chip hover contrast for accessibility
```

```
feat(shell): highlight active route in the sidebar
```

```
docs: document layered architecture in ARCHITECTURE.md
```

```
build(deps): add framer-motion for section transitions
```
