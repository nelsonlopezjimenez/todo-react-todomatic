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
| `step-04-done` (tag)  | End of step 4                                                       |
| `step-05-tests`       | Vitest + React Testing Library tests, run in CI                     |
| `step-05-done` (tag)  | End of step 5                                                       |
| `fix/issue-template-yaml` | Fix: quote the commit placeholder in the bug report template    |
| `step-06-form-email`  | Optional email field; Form.jsx shows controlled inputs and a form action |
| `todomatic-final-exam` (local only) | The final exam starting point, see [Final exam](#final-exam) |

```bash
git diff mdn-original main                       # everything changed since MDN
git diff step-02-known-bugs step-03-fixed        # all the bug fixes
git log --oneline step-02-known-bugs..step-03-fixed   # one commit per fix
```

## Final exam

### Purpose

The local branch `todomatic-final-exam` is the starting point students get for the final exam:
the same app as `main`, with deliberate bugs for students to find, fix and test.

- It is an **orphan branch**: a single commit with no shared history, so `git log` and
  `git diff` cannot show students the fixes.
- It has no links back to this repository: the package is named `todomatic-final-exam`
  and the README has no History section.
- Lint, tests and build pass on it, so the bugs can only be found by using the app.
- The bugs and their solutions are not in this repository. They are in the instructor's
  private `course-solutions` repository, in `todo-react-mdn/`.

### The `todomatic-final-exam` repository

Students never get this repository. They get
[todomatic-final-exam](https://github.com/nelsonlopezjimenez/todomatic-final-exam), a separate
repository whose `main` is the `todomatic-final-exam` branch, pushed with:

```bash
git push students todomatic-final-exam:main
```

The branch tracks `students/main`, so the two can be compared at any time:

```bash
git fetch students
git switch todomatic-final-exam
git status          # "up to date with 'students/main'" means they are identical
git switch main
```

**Never push `todomatic-final-exam` to `origin`**: this repository's `main` and step branches
contain every fix.

### Giving it to students

1. Before the exam, check the branch: `npm ci`, `npm run lint`, `npm test` and `npm run build`
   must pass, and the grading tests from `course-solutions` must fail.
2. Make sure the classroom Verdaccio has every package: run
   `warm-verdaccio.mjs` against both registries (see `verdaccio-tools`).
3. Students fork or clone `todomatic-final-exam` (on GitHub, or a copy pushed to the classroom
   Gitea with `git push <gitea-remote> todomatic-final-exam:main`). In their copy they turn on
   **Issues**, and on GitHub also **Pages** (Settings → Pages → Source: GitHub Actions).
4. While the exam runs, keep this repository private or out of reach, because it holds the fixes.
5. Students report each bug as an issue, fix it on a `fix/<short-name>` branch with a test,
   and open a pull request, as described in [CONTRIBUTING.md](CONTRIBUTING.md).
6. After they submit the bug fixes, students answer the open questions
   (also in `course-solutions`). The questions show fixed code, so they come second.
7. Grade by copying `grading.test.jsx` into each student's `src/` and running
   `npx vitest run src/grading.test.jsx`: each passing test is one bug fixed.

To change the exam before it is handed out, amend the single commit on `todomatic-final-exam`
and push it again. Once students have cloned it, add new commits instead of amending.

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
| `npm test`        | Run the tests once (Vitest + React Testing Library)    |
| `npm run test:watch` | Re-run the tests whenever a file changes            |

## Deployment

Pushing to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which lints, tests and builds the app, then publishes it to GitHub Pages.
If lint or tests fail, nothing is published.

GitHub Pages serves project sites from `/<repo-name>/`, so the workflow sets `BASE_PATH` to that and [vite.config.js](vite.config.js) uses it as `base`.
Locally `base` is `/`.

## Learn more

- [React documentation](https://react.dev/)
- [Vite documentation](https://vite.dev/guide/)
- [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## License

This project is based on MDN's code and is licensed under the [Mozilla Public License 2.0](LICENSE).
