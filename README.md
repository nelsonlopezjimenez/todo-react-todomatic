# todo-react-todomatic

Sample todo app built with React and [Vite](https://vite.dev/). It is the base project for the course final project.

The app comes from MDN's
[React tutorials](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started)
([mdn/todo-react](https://github.com/mdn/todo-react)).
The unmodified MDN version is tagged `mdn-original`:

```bash
git checkout mdn-original   # view the original code
git diff mdn-original       # see everything changed since
```

## Getting started

You need [Node.js](https://nodejs.org/en/). The version is in [.nvmrc](.nvmrc). The project uses **npm**.

```bash
npm install
npm run dev
```

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

This project is licensed under the [LICENSE](LICENSE).
