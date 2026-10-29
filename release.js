// Written by tools/publish-release.mjs (the app repository's CI runs it on every push to main). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.4.348-debug/kinetix-fsl-1.4.348-debug-arm64.apk",
  version: "1.4.348 (debug preview)",
  size: "117 MB",
  sha256: "04a6849e601de2c282856c6fa15154167159fd27cbc5484e88e63e5873debb94",
});
