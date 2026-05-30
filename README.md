# Julien Perradin — academic website

A single-page personal academic site (contact, publications, curriculum,
conferences & seminars). Static HTML/CSS/JS — no build step, no dependencies.
Designed to be hosted for free on **GitHub Pages**.

```
index.html        the page
styles.css        all styling
main.js           nav, scroll-spy, mobile menu (vanilla JS)
assets/
  julien.jpg        portrait
  Perradin-CV.pdf   downloadable CV
  favicon.svg       site icon
.nojekyll         tells GitHub Pages to serve files as-is
```

Fonts (Newsreader, Public Sans, IBM Plex Mono) load from Google Fonts.

---

## How to put it online (about 5 minutes)

You have two easy options. **Option A** (website at
`https://<username>.github.io`) is the cleanest for a personal site.

### Option A — your main GitHub Pages site

1. **Create the repository.** On GitHub, click **New repository**. Name it
   **exactly** `<your-username>.github.io` (e.g. `jperradin.github.io`).
   Make it **Public**. Don't add a README (this folder already has one).
2. **Upload the files.** On the new repo's page, click
   **Add file → Upload files**. Drag in *the contents of this `build` folder*
   — that is `index.html`, `styles.css`, `main.js`, `.nojekyll`, and the
   `assets/` folder. Make sure `index.html` sits at the top level of the repo,
   **not** inside a `build/` subfolder.
3. **Commit.** Scroll down and click **Commit changes**.
4. **Wait ~1 minute**, then visit **https://<your-username>.github.io**.
   Done.

> GitHub Pages is enabled automatically for a `<username>.github.io` repo.

### Option B — a project repo (URL has a sub-path)

Use this if you'd rather keep the repo under a normal name (e.g. `website`).
The site will live at `https://<username>.github.io/website/`.

1. Create a **Public** repo with any name, e.g. `website`.
2. Upload the contents of this `build` folder (as in step 2 above).
3. Go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Set **Branch** to `main` and folder to **/ (root)**, then **Save**.
6. Wait ~1 minute and open **https://<username>.github.io/website/**.

---

## Using Git from the command line (optional)

If you prefer the terminal instead of drag-and-drop:

```bash
cd build
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<username>/<username>.github.io.git
git push -u origin main
```

---

## Updating the site later

- **Edit text / links:** open `index.html` and edit directly.
- **Replace the CV:** drop a new PDF in `assets/` named `Perradin-CV.pdf`
  (or change the link in `index.html`).
- **Replace the photo:** replace `assets/julien.jpg` (a square image works best).
- After any change, commit & push (or re-upload) — the live site refreshes in
  about a minute.

## Custom domain (optional)

In **Settings → Pages → Custom domain**, enter a domain you own (e.g.
`perradin.science`) and follow GitHub's DNS instructions. A `CNAME` file
will be added to the repo automatically.
