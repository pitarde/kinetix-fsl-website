// Written by tools/publish-release.mjs (the app repository's CI runs it on every push to main). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.4.334-debug/kinetix-fsl-1.4.334-debug-arm64.apk",
  version: "1.4.334 (debug preview)",
  size: "114 MB",
  sha256: "a681a0e7b42ea2dee58d2e6048abc54a304d5aecfa7030fd017dcc0799f18913",
});
