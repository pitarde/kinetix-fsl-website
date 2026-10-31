# Publishing a new debug build to the website

How a new debug APK gets onto kinetixfsl.app, so that **Settings → Check for new updates** in the app installs it.
Written 2026-11-01 from the real pipeline (`Kinetix-FSL/.github/workflows/ci.yml`, job `publish-debug`, and this
repository's `.github/workflows/pages.yml`). More background: `Kinetix-FSL/docs/AUTO_UPDATE.md` and
`Kinetix-FSL/docs/SIGNING.md`.

**Short version:** you only push the app to `main`. GitHub builds the APK, uploads it to this repository's
Releases, points `app-update.json` and the Download button at it, and deploys the website. You then check it and
update your local copy of the website.

This file is not published: the Pages deploy uploads only the site files.

---

## Before you start

- Run the commands in **PowerShell** (Android Studio's Terminal is fine).
- The app must be on the **`main`** branch. `karl-branch` runs the tests but never publishes.
- The phone's app must already be a debug build signed with the shared key (every build from this pipeline is).
  An APK signed with another key will not install over it.
- Optional: run the unit tests first, so CI doesn't stop on them:

```powershell
cd C:\Users\pitar\Documents\Kinetix-FSL
```

```powershell
.\gradlew :app:testDebugUnitTest
```

---

## Step 1: The website first (only if you changed website files)

Skip this step if you only changed the app.

```powershell
cd C:\Users\pitar\Documents\kinetix-fsl-website
```

```powershell
git pull --rebase --autostash
```

```powershell
git add -A
```

```powershell
git commit -m "Website: what you changed"
```

```powershell
git push
```

If `styles.css` shows as changed but you didn't touch it, that's only line endings: `git checkout -- styles.css`
clears it.

## Step 2: Commit and push the app

```powershell
cd C:\Users\pitar\Documents\Kinetix-FSL
```

```powershell
git pull --rebase --autostash
```

```powershell
git add -A
```

```powershell
git commit -m "Short description of this build"
```

```powershell
git push
```

The first line of each commit message becomes the **"What's new"** list the app shows (the last 15 commits), so
write it for testers.

To push **without** publishing a build (docs only, for example), put `[skip release]` in the commit message:
`git commit -m "Update docs [skip release]"`.

## Step 3: Wait for GitHub to build and publish (about 15–20 minutes)

```powershell
gh run watch --repo pitarde/KinetixFSL --exit-status
```

Choose the run named after your commit. Or watch it on GitHub: **pitarde/KinetixFSL → Actions → CI**.

What GitHub does by itself, in order:

1. **app-tests**: unit tests and lint. If they fail, nothing is published.
2. **publish-debug** (only after app-tests pass, only on `main`):
   1. Builds the debug APK, signed with the shared key (from the secrets).
   2. Checks that the APK really carries the shared key, and reads its version: versionCode = the number of
      commits, versionName = `1.4.<count>-<commit>`.
   3. Creates a pre-release `v1.4.<count>-debug` on **pitarde/kinetix-fsl-website** with the APK
      `kinetix-fsl-1.4.<count>-debug-arm64.apk`.
   4. Runs `tools/publish-release.mjs` in this repository: it writes `app-update.json`, `release.js` and
      `index.html` (version, link, size, SHA-256 and "What's new"), runs `checks.mjs`, and
      **kinetix-release-bot** commits "Publish debug build …" to this repository.
   5. Deletes debug releases older than the newest 5.
3. That bot commit starts **pages.yml** in this repository, which deploys kinetixfsl.app (about 1–2 minutes).

## Step 4: Check that the website names the new build

```powershell
curl.exe -s https://kinetixfsl.app/app-update.json
```

Use `curl.exe`, not `curl`: in PowerShell, `curl` is a different command.

`versionName` must end with your new commit. Compare it with:

```powershell
git -C C:\Users\pitar\Documents\Kinetix-FSL log -1 --format=%h
```

Still the old one? The website deploy may still be running. Wait a minute and check again, or look at
**pitarde/kinetix-fsl-website → Actions**.

## Step 5: Bring your local website copy up to date

The bot committed to this repository, so your copy is one commit behind:

```powershell
cd C:\Users\pitar\Documents\kinetix-fsl-website
```

```powershell
git pull
```

Do this before your next website change, or your push will be refused.

## Step 6: Update on the phone

In the app: **Settings → Check for new updates → install**. It installs over the old app, with no uninstall and no
data lost. The build line at the bottom of Settings should now show the new version.

---

## When something goes wrong

| What you see | What to do |
| --- | --- |
| CI failed at **app-tests** | A unit test or lint failed. Open the run, fix it, then commit and push again. |
| CI failed at **Signing key** | A secret is missing: `KINETIX_KEYSTORE_BASE64` / `KINETIX_KEYSTORE_PASSWORD` (see `docs/SIGNING.md`). |
| CI failed at **Release on the website repository** or **Point the website at it** | The `WEBSITE_REPO_TOKEN` secret has expired or lacks Contents read/write on kinetix-fsl-website. Make a new fine-grained token and replace the secret. |
| CI passed but `app-update.json` is still old | The website deploy (pages.yml) is still running or failed: check **kinetix-fsl-website → Actions**. |
| "The website already names this build." in the log | Nothing new to publish: that commit was already published. |
| A run failed for a temporary reason | Run it again: `gh run rerun <run id> --repo pitarde/KinetixFSL --failed` (the id is in `gh run list --repo pitarde/KinetixFSL`). |
| The phone says it is up to date | The phone already has this versionCode or a higher one. Only a newer commit on `main` makes a newer build. |
| `git push` in the website is refused | Your copy is behind the bot: `git pull --rebase --autostash`, then push again. |

## The whole routine at a glance

1. (Website changed?) `git pull --rebase --autostash` → `git add -A` → `git commit` → `git push` in the website.
2. In Kinetix-FSL: `git pull --rebase --autostash` → `git add -A` → `git commit -m "…"` → `git push`.
3. `gh run watch --repo pitarde/KinetixFSL --exit-status`
4. `curl.exe -s https://kinetixfsl.app/app-update.json` names the new commit.
5. `git pull` in the website copy.
6. Phone: Settings → Check for new updates.
