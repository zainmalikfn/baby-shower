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

The included `CNAME` points GitHub Pages at `zain-malik.com`.

## Connect the Namecheap domain

In Namecheap **Advanced DNS**, add these records for the root domain:

| Type | Host | Value |
|---|---|---|
| A Record | @ | 185.199.108.153 |
| A Record | @ | 185.199.109.153 |
| A Record | @ | 185.199.110.153 |
| A Record | @ | 185.199.111.153 |
| CNAME Record | www | your-github-username.github.io. |

Replace `your-github-username` with the GitHub account name. In the GitHub Pages settings, confirm `zain-malik.com` as the custom domain and enable **Enforce HTTPS** once the certificate becomes available.

If the root domain already hosts a different site, use a subdomain such as `invite.zain-malik.com` instead: change the `CNAME` file to that subdomain and add a Namecheap CNAME record from `invite` to `your-github-username.github.io.`.

## Editing later

- Page copy and Google Form URL: `index.html`
- Colours, layout and animations: `styles.css`
- Countdown, music and motion behaviour: `script.js`
- Character art: `assets/images/`
- Botanical garlands and section decorations: `assets/decor/`
- Background music: `assets/audio/one-summers-day-10min.mp3`

The background track starts only after the visitor taps the invitation, which complies with mobile browser autoplay rules.
