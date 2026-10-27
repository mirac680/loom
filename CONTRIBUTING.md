# Contributing to Loom

Thanks for helping make Loom more useful. Small, well-scoped improvements are easiest to review.

## Before opening an issue

- Include your browser and operating system for behavior or layout reports.
- Describe what you expected and what happened instead.
- Do not attach private notebook exports. Loom notes can contain personal information.

## Development notes

- Node.js 18+ is used only for the zero-dependency local server.
- The browser app has no package dependencies or build step.
- Keep note content in the browser. Do not add analytics, a remote API, or third-party runtime requests without discussing the privacy impact in an issue first.
- Escape user-authored Markdown before rendering it. Note titles, tags, and excerpts are user data too.
- Keep keyboard and touch interactions available when changing the editor or graph.

## Pull requests

1. Explain the user problem and the behavior your change adds.
2. Keep the change focused and document any new shortcut or data format.
3. Describe the browser and viewport you used to review the result.

By contributing, you agree that your contribution is offered under Loom's MIT license.
