// Written by tools/publish-release.mjs (the app repository's CI runs it on every push to main). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.4.351-debug/kinetix-fsl-1.4.351-debug-arm64.apk",
  version: "1.4.351 (debug preview)",
  size: "117 MB",
  sha256: "6213656f1870e1006a92277ac35e2eade482b4fd2e9a0c665e3385715169914c",
});
