# Zain & Sahar's Baby Shower e-invite

A self-contained, mobile-first interactive invitation ready for GitHub Pages.

## Preview locally

From this folder, run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload everything in this folder to the repository root, including `.nojekyll`.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.

No custom-domain file is included. The site will remain on its normal `github.io` address unless a custom domain is deliberately configured later.

## Editing later

- Page copy and Google Form URL: `index.html`
- Colours, layout and animations: `styles.css`
- Countdown, music and motion behaviour: `script.js`
- Character art: `assets/images/`
- Botanical garlands and section decorations: `assets/decor/`
- Background music: `assets/audio/one-summers-day-10min.mp3`

The background track starts only after the visitor taps the invitation, which complies with mobile browser autoplay rules.
