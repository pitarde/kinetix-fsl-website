// Written by tools/publish-release.mjs (the app repository's CI runs it on every push to main). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.4.352-debug/kinetix-fsl-1.4.352-debug-arm64.apk",
  version: "1.4.352 (debug preview)",
  size: "117 MB",
  sha256: "7eed1dfbdb15c5dd5a61556912fb6502c562a0bf5aeec577e2fae862f7a44d15",
});
