# Field Proven Marketing website

A seven-page, mobile-first static website for Field Proven Marketing. It has no paid APIs, database, build dependencies or subscription requirement. The contact and landing-page forms use FormSubmit's free email delivery service.

## Preview locally

1. Install [Node.js](https://nodejs.org/) if it is not already installed.
2. Open this folder in a terminal.
3. Run `npm run build`.
4. Run `npm run preview`.
5. Open `http://127.0.0.1:4173/` in a browser. Stop the preview with Ctrl+C.

The generated, ready-to-publish website is in `dist/`. Do not open its HTML files directly from your file manager; use the local preview server so page links and forms behave as they will online.

## Make simple edits

- Company details, email address, prices, service list and navigation: `src/config.mjs`.
- Page copy and section order: `src/pages.mjs`.
- Shared header, footer, buttons, pricing box and forms: `src/components.mjs`.
- Colors, type and spacing: `src/assets/site.css`.
- Form submission and mobile menu: `src/assets/site.js`.

After any edit, run `npm run build` again and refresh the preview. Local builds use the preview address in page metadata. The GitHub Pages workflow supplies the public URL automatically. If you later use a custom domain, update `SITE_URL` in `.github/workflows/pages.yml` so canonical links, social metadata and the sitemap point to it.

## Logo files

The site uses the separate supplied logo PDF as its source for `src/assets/logo-primary.png` and the FP favicon at `src/assets/favicon.png`. Do not extract a replacement from the brand-guidelines overview image. The supplied file has a white background, so the full logo appears on the white header. If you later obtain an approved reversed SVG for dark backgrounds, save it as `src/assets/logo-reversed.svg` and rebuild; the footer will use it automatically. Keep each logo's proportions intact.

## Activate the forms once

The forms are already wired to `fieldprovenmarketing@gmail.com`. FormSubmit requires the recipient to confirm the address before it begins forwarding submissions:

1. Publish the website or open the local preview through its server.
2. Submit the contact form once with your own details. Label the message as a test.
3. Open `fieldprovenmarketing@gmail.com` and find the FormSubmit activation email. Check Spam if needed, then click its confirmation link.
4. Submit a second test from the contact page and one from `/moving-company-google-ads/`. Confirm that both arrive in the inbox. After confirmation, you can remove the test messages.

The forms use required fields, browser validation, a hidden honeypot field and FormSubmit's spam filtering. Visitors see a clear success or error message and a thank-you confirmation. If JavaScript is disabled, the form submits directly to FormSubmit's hosted confirmation page. Do not use real customer data for setup tests. FormSubmit's [setup](https://formsubmit.co/) and [AJAX](https://formsubmit.co/ajax-documentation) documentation explain the service.

## Publish for free with a separate GitHub account

1. Create or sign in to the GitHub account you want to own Field Proven Marketing. Keep its password and verification codes private.
2. Create an **empty public** repository named exactly `<your-github-username>.github.io`; leave the optional starter README, license and `.gitignore` unchecked. The finished website will use `https://<your-github-username>.github.io/`. This exact repository name matters because the site's links start at the domain root.
3. Upload or push this project's source files to the repository's `main` branch, including `.github/workflows/pages.yml`. Do not upload the outer folder as an extra level.
4. In the repository, open **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. The included workflow builds and publishes the site on every push to `main`. In **Actions**, check that “Publish Field Proven website” succeeds. If the first run began before you selected **GitHub Actions** in Pages settings, rerun it from **Actions**. Then open the website URL in **Settings → Pages**.
6. Complete the one-time FormSubmit email confirmation and test both forms as described above.

The workflow computes the public URL from the account username and uses it in every page's canonical and social metadata and in the sitemap. You do not need a paid plan or a separate server. GitHub's [Pages setup guide](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [publishing source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) cover the current settings. A custom domain is optional and may cost money if you buy one.

## Notes

- The site does not claim specific client results, testimonials or guarantees.
- The privacy page describes the current form and font services. Update it if you later add analytics, advertising tags or another form provider.
- The Founding Partner terms are in `src/config.mjs` so you can change them without hunting through every page.
