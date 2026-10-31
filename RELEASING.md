# Releasing a new version of Kinetix FSL

How the app gets onto kinetixfsl.app as a **release APK**, so people can download it and the app's
**Settings → Check for new updates** installs each new version. Written 2026-11-01. This file is not published on
the site (the deploy uploads only the site's own files).

## What changed on 2026-11-01

| Before | Now |
| --- | --- |
| Every push to `main` published a **debug** build automatically | Pushing to `main` only **tests** and builds. Nothing reaches users until **you** press **Publish release** |
| Named like `1.4.354 (debug preview)` | Named **Version 1.0.0**, then **1.0.1**, **1.0.2**, … counting up by itself |
| Debug APK (debuggable, not shrunk) | **Release** APK: shrunk with R8, signed with the same shared key |

Phones that have a debug build update to Version 1.0.0 normally through **Check for new updates**: same app, same key,
higher internal number. Nobody has to uninstall.

### How the numbers work

- **The version people see** follows the usual Android style, `major.minor.patch`. The first release is
  **1.0.0**. Each time you publish, the workflow takes the highest release on the website and raises one number.
  You choose which with **Bump** (default **patch**):

  | Bump | Example | Use it for |
  | --- | --- | --- |
  | **patch** (default) | 1.0.0 → **1.0.1** | Fixes and small changes: almost every release |
  | **minor** | 1.0.3 → **1.1.0** | A new feature or a noticeable redesign |
  | **major** | 1.4.2 → **2.0.0** | A very big change (a new edition of the app) |

  You never type the number. A test run or a failed run doesn't use one up.
- Inside the APK there's also the **versionCode**, which Android uses to decide what is newer. It is the number of
  commits in the app's history (354 for the last debug build), so it only goes up. **Commit something new to `main`
  between two releases**: the same commit cannot be published twice, and the workflow refuses it.

---

## The first release (do this once, in this order)

### 1. Push the website changes

The website's publish script learned to write "Version 1.0.0". The release workflow uses the website's copy of that
script, so it must be on GitHub **before** the first publish.

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
git commit -m "Website: release APK wording and version publishing"
```

```powershell
git push
```

### 2. Push the app changes

This puts the new **Publish release** workflow on `main` (the button only appears once it is there) and stops the
automatic debug publishing.

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
git commit -m "Release APK: manual Publish release workflow, version 1.0.0 naming"
```

```powershell
git push
```

Wait until the **CI** run for this push is green (about 15 minutes):

```powershell
gh run watch --repo pitarde/KinetixFSL --exit-status
```

### 3. Build a test APK for your phone (nothing is published)

The release build has never run on a phone. R8 can remove code the app needs (for example what Firestore uses to
read posts), which would make a screen crash. So test it first.

```powershell
gh workflow run publish-release.yml --repo pitarde/KinetixFSL -f test_only=true
```

Or on GitHub: **pitarde/KinetixFSL → Actions → Publish release → Run workflow**, leave **Test only** ticked →
**Run workflow**.

Wait for it (about 15–20 minutes):

```powershell
gh run watch --repo pitarde/KinetixFSL --exit-status
```

Download the test APK to your Downloads folder. `kinetix-fsl-v1.0.0-test` is the name for the first release;
later it carries that release's version (the run's Summary shows the exact name):

```powershell
gh run download --repo pitarde/KinetixFSL --name kinetix-fsl-v1.0.0-test --dir "$HOME\Downloads\kinetix-test"
```

(If it asks which run, pick the newest **Publish release**.) Or on GitHub: open the run → **Artifacts** →
**kinetix-fsl-v1.0.0-test**.

Put `kinetix-fsl-v1.0.0-test-arm64.apk` on your phone (USB cable, Google Drive or Messenger to yourself) and open it to
install. Or, with the phone plugged in by USB and USB debugging on:

```powershell
adb install -r "$HOME\Downloads\kinetix-test\kinetix-fsl-v1.0.0-test-arm64.apk"
```

It installs **over** your current app; your account and progress stay.

### 4. Test it on the phone

Walk every main screen once, the way a user would:

- Sign in / sign out, the welcome and splash screens
- Home feed: scroll, open a post with a video, like, comment, share
- Profile: your own and someone else's, Followers / Following, Edit profile
- A community: Posts, Announcements, About, create a post
- Inbox and a chat
- Modules → a lesson → **camera practice** (detection works), quiz, dictionary
- Settings: the build line pop-up, **Check for new updates**

Look at the build line at the bottom of Settings: it should say **v1.0.0 (…) · release**.

Anything crashes or looks broken? **Don't publish.** Tell Claude what happened (the screen, what you tapped), fix it,
push, and build a test APK again.

### 5. Publish Version 1.0.0

```powershell
gh workflow run publish-release.yml --repo pitarde/KinetixFSL -f test_only=false
```

To write the "What's new" yourself, add it (one change per line; leave it out to use the commit messages since the
last release):

```powershell
gh workflow run publish-release.yml --repo pitarde/KinetixFSL -f test_only=false -f notes="First release of Kinetix FSL"
```

Or on GitHub: **Actions → Publish release → Run workflow**, **untick Test only**, leave **Bump** on **patch**,
optionally type **What's new** → **Run workflow**. (For the very first release the bump doesn't matter: it is always
1.0.0.)

```powershell
gh run watch --repo pitarde/KinetixFSL --exit-status
```

### 6. Check the website

```powershell
curl.exe -s https://kinetixfsl.app/app-update.json
```

It must show `"versionName": "1.0.0"` and an `apkUrl` ending in `/v1.0.0/kinetix-fsl-v1.0.0-arm64.apk`. If it still shows
the old debug build, the website's own deploy is still running: wait a minute and check again (or look at
**pitarde/kinetix-fsl-website → Actions**). The Download section on kinetixfsl.app now says **Version 1.0.0**.

Bring your local website copy up to date (the release bot committed to it):

```powershell
cd C:\Users\pitar\Documents\kinetix-fsl-website
```

```powershell
git pull
```

### 7. On the phones

Everyone: **Settings → Check for new updates → Version 1.0.0 → install**. New users: kinetixfsl.app → **Install the
app**.

Your own phone already has the test build from the same commit, so it says it is up to date. That's correct: it is
the same app.

---

## Every release after that (1.0.1, 1.0.2, …)

1. Make the changes, then commit and push the app to `main` (step 2 above). Push the website first if you changed it.
2. Wait for **CI** to be green: `gh run watch --repo pitarde/KinetixFSL --exit-status`.
3. Optional but recommended for bigger changes: a **test** run and a phone test (steps 3–4).
4. **Publish**: `gh workflow run publish-release.yml --repo pitarde/KinetixFSL -f test_only=false`, then
   `gh run watch --repo pitarde/KinetixFSL --exit-status`. For a bigger update add `-f bump=minor` (1.0.x → 1.1.0)
   or `-f bump=major` (→ 2.0.0).
5. Check `curl.exe -s https://kinetixfsl.app/app-update.json` shows the new version, then `git pull` in the
   website copy.
6. Phones: **Check for new updates**.

## What the Publish release workflow does

1. Refuses to run on any branch but `main`.
2. Works out the next version: the highest `vX.Y.Z` release on pitarde/kinetix-fsl-website, with the chosen number
   raised (1.0.0 when there is none yet).
3. Writes "What's new": your text, or the commit messages since the last release.
4. Runs the unit tests.
5. Builds the **release** APK (R8) signed with the shared key, named with that version.
6. Checks that it really carries the shared key and that its versionCode is higher than what the website offers now.
7. **Test only:** keeps the APK as a download of the run for 14 days. Stops there.
8. **Publish:** creates the release **vX.Y.Z** on pitarde/kinetix-fsl-website with `kinetix-fsl-vX.Y.Z-arm64.apk`,
   marked Latest. Then the website's `tools/publish-release.mjs` rewrites `app-update.json`, `release.js` and `index.html`,
   and **kinetix-release-bot** commits "Publish release Version X.Y.Z". That commit deploys kinetixfsl.app
   (about 1–2 minutes).

## When something goes wrong

| What you see | What to do |
| --- | --- |
| No **Publish release** in Actions | The workflow file is not on `main` yet: do step 2. |
| "versionCode … is not higher than the one the website offers" | Nothing new was committed since the last release. Commit and push a change, then publish. |
| "Release vX.Y.Z already exists" | That version is taken (two runs at once). Run Publish again: it picks the next version. Don't delete a published release. |
| Failed at **Unit tests** | A test fails. Fix it, push, run again. |
| Failed at **Signing key** | The `KINETIX_KEYSTORE_BASE64` / `KINETIX_KEYSTORE_PASSWORD` secrets are missing (`Kinetix-FSL/docs/SIGNING.md`). |
| Failed at **Release on the website repository** or **Point the website at it** | The `WEBSITE_REPO_TOKEN` secret expired or lacks Contents read/write on kinetix-fsl-website. Make a new fine-grained token and replace it (`Kinetix-FSL/docs/AUTO_UPDATE.md`). |
| Failed at **Check the website is ready** ("the old one") | The website changes were not pushed (step 1). Push them, then run Publish again. Nothing was created. |
| CI passed but the site still shows the old version | The website deploy is still running or failed: **kinetix-fsl-website → Actions**. |
| A phone says it is up to date | It already has this versionCode or a higher one (for example the test APK). |
| `git push` in the website copy is refused | It is behind the release bot: `git pull --rebase --autostash`, then push. |

## Good to know

- Each published APK stays on GitHub Releases. Old releases are not deleted, and the old `v1.4.xxx-debug`
  pre-releases are left as they are. You can delete those on GitHub when you like; nobody needs them now.
- The release is signed with the same shared key as the debug builds (`Kinetix-FSL/docs/SIGNING.md`). Keep using
  that key: an APK signed with another key will not install over the app people have.
- You can still run debug builds from Android Studio on your own phone. If your phone has a release with a higher
  versionCode than the debug build, Android refuses the downgrade: uninstall first, or commit so the number goes up.
