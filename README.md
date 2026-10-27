# Loom

**A quiet notebook where ideas find each other.** Loom is a local-first notes app with a living, interactive map of the connections between your thoughts.

[Türkçe README](README.tr.md)

![Loom logo](icon.svg)

## Why Loom?

Notes are easy to collect and hard to reconnect. Loom gives each note a home, then lets you connect thoughts by writing `[[the title of another note]]`. Those links appear as backlinks and as an interactive knowledge map. Your notebook lives in this browser; Loom has no account system, remote database, analytics, or API key.

## Features

- **Local-first by default:** notes and preferences stay in browser storage on this device.
- **A visual knowledge map:** pan, zoom, drag notes around, and open a note right from the graph.
- **Wiki-style links:** type `[[Note title]]`; Loom opens the matching note or creates it for you.
- **Backlinks:** see which notes point to the note you are reading.
- **Markdown:** write headings, lists, quotes, inline code, links, bold text, and more; switch to Preview when you want a clean reading view.
- **Find notes quickly:** search note titles, text, and tags; filter by tag or pinned notes.
- **Own your data:** export your notebook as JSON or import a previous export.
- **Works offline:** the app shell is cached after your first visit and can be installed as a PWA.
- **Comfortable to use:** English and Turkish interface, dark mode, responsive layout, and keyboard shortcuts.
- **No runtime packages:** the app uses browser APIs and a tiny Node.js static server. There are no framework or build dependencies.

## Run locally

You need Node.js 18 or newer. From this folder, run:

```sh
npm start
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173). `server.mjs` uses only Node's built-in modules. You can change the port with `PORT=8080 npm start` on macOS/Linux or `$env:PORT=8080; npm start` in PowerShell.

You can also serve the folder with another local static server. Opening `index.html` directly works for editing, but service workers and installable offline support require `localhost` or HTTPS.

## Publish with GitHub Pages

Loom is a static site, so it can be hosted with GitHub Pages without a build step: push this folder to a repository, then choose **Settings → Pages** and publish from the branch and folder you use. Keep `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, and `icon.svg` together. The Node.js server is only for local development.

## Get started

1. Open a note in the left sidebar or click **New note**.
2. Add a title and a few optional tags, separated by commas.
3. Write in Markdown. Use `[[A note title]]` to connect another thought.
4. Open **Knowledge map** to explore your notes. Drag the canvas to pan, scroll to zoom, and click a node to open it.
5. Export a JSON backup from the menu whenever you want to move or protect your notebook.

Loom starts with three example notes so the links and map are visible immediately. Delete them when you are ready to use your own notebook.

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl/⌘ + K` | Focus note search |
| `Ctrl/⌘ + N` | Create a note |
| `Ctrl/⌘ + Shift + G` | Open the knowledge map |
| `Ctrl/⌘ + S` | Save the notebook now |
| `Ctrl/⌘ + B` | Bold selected text |
| `Ctrl/⌘ + I` | Italicize selected text |
| `Esc` | Close the map or mobile navigation |

## Data and privacy

Loom stores notes in `localStorage` for the current browser origin. The included server only serves files from this folder and binds to `127.0.0.1`; it does not receive notebook contents. Clearing browser storage, using a different browser or origin, or removing the app's site data removes the local copy. Use **Export notebook** to create a portable backup. Imported JSON replaces the open notebook after confirmation.

Loom does not encrypt browser storage. Keep exported files somewhere you trust, especially if your notes are sensitive.

## Project structure

```text
loom/
├── app.js                 # editor, storage, Markdown, links, and graph
├── styles.css             # responsive light and dark themes
├── index.html             # accessible app shell
├── server.mjs             # dependency-free local Node.js server
├── sw.js                  # offline app-shell cache
├── manifest.webmanifest   # installable PWA metadata
└── icon.svg               # app icon
```

## Contributing

Bug reports and focused feature ideas are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md). Loom has no dependency install step; keep it that way when a browser API can do the job.

## License

MIT. See [LICENSE](LICENSE).
