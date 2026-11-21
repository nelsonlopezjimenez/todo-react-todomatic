# todo-react-todomatic

Sample todo app built with React and [Vite](https://vite.dev/). It is the base project for the course final project.

The app comes from MDN's
[React tutorials](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started)
([mdn/todo-react](https://github.com/mdn/todo-react)).

## History

The project was modernized in steps. Each step has its own branch, and tags mark the important points:

| Branch / tag          | What it contains                                                    |
| --------------------- | ------------------------------------------------------------------- |
| `mdn-original` (tag)  | The unmodified MDN code                                             |
| `step-01-cleanup`     | npm only, Vite `base` for GitHub Pages, new README                  |
| `step-02-upgrade`     | React 19, Vite 8, ESLint 10                                         |
| `step-02-known-bugs` (tag) | End of step 2, before the bug fixes                            |
| `step-03-fixes`       | Bug fixes and current React patterns (one commit per fix)           |
| `step-03-fixed` (tag) | End of step 3                                                       |
| `step-04-project-files` | MDN-only files removed, contributing guide, templates, favicon    |

```bash
git diff mdn-original main                       # everything changed since MDN
git diff step-02-known-bugs step-03-fixed        # all the bug fixes
git log --oneline step-02-known-bugs..step-03-fixed   # one commit per fix
```

## Getting started

You need [Node.js](https://nodejs.org/en/). The version is in [.nvmrc](.nvmrc). The project uses **npm**.

```bash
npm ci
npm run dev
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for branches, commit messages and code conventions.

## Available scripts

| Command           | What it does                                           |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Start the dev server at http://localhost:3000          |
| `npm run build`   | Build the production bundle into `dist/`               |
| `npm run preview` | Serve the built `dist/` folder locally                 |
| `npm run lint`    | Run ESLint on all `.js` / `.jsx` files                 |

## Deployment

Pushing to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the app and publishes it to GitHub Pages.

GitHub Pages serves project sites from `/<repo-name>/`, so the workflow sets `BASE_PATH` to that and [vite.config.js](vite.config.js) uses it as `base`.
Locally `base` is `/`.

## Learn more

- [React documentation](https://react.dev/)
- [Vite documentation](https://vite.dev/guide/)

## License

This project is based on MDN's code and is licensed under the [Mozilla Public License 2.0](LICENSE).
