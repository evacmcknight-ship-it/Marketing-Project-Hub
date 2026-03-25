# Shared Data Setup

This project now supports a shared backend using Netlify Functions and Supabase. The frontend still keeps a browser-local cache as a fallback, but once the shared workspace is published, the shared database becomes the source of truth.

## 1. Create the Supabase database

1. Create a Supabase project.
2. Open the SQL Editor in Supabase.
3. Run the SQL in `SUPABASE_SCHEMA.sql`.

## 2. Add environment variables in Netlify

In your Netlify site:

1. Open `Site configuration` -> `Environment variables`.
2. Add `SUPABASE_URL` with your Supabase project URL.
3. Add `SUPABASE_SERVICE_ROLE_KEY` with your Supabase service role key.
4. Redeploy the site after saving those variables.

Do not put the service role key in frontend code. It must stay only in Netlify environment variables.

## 3. Deploy this repo to Netlify

This repo now includes `netlify.toml`, which tells Netlify to:

- publish the site from the repo root
- load serverless functions from `netlify/functions`

If your Netlify site already points at this repo, a normal redeploy is enough after you push these changes.

## 4. Publish your current browser data to the shared workspace

After the deploy finishes:

1. Open the live Netlify URL in the browser that currently has your existing cards and requests.
2. Look for the status pill near the top right of the app.
3. Click `Publish Local Data`.

That is the one-time step that copies your current browser data into Supabase so everyone using the Netlify link sees the same shared cards.

## 5. Verify shared editing

1. Open the Netlify URL in a second browser or an incognito window.
2. Create or edit a card.
3. Refresh the first browser.
4. Confirm the same change appears there too.

The app also refreshes shared data periodically while the page is open, but a manual refresh is the fastest way to confirm the first test.

## What happens after setup

- New cards, edits, deletes, requests, and goals changes save to the shared database.
- Redeploying HTML, CSS, or JS will not wipe the saved cards, because the live data is no longer stored in the code files.
- If the shared backend is unavailable, the app falls back to browser-local behavior and shows that status in the sync pill.

## Current behavior note

Anyone with the Netlify link can edit the shared data because there is no sign-in layer yet. If you want, the next step would be adding authentication and edit permissions.
