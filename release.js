// Written by tools/publish-release.mjs (the app repository's CI runs it on every push to main). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.4.354-debug/kinetix-fsl-1.4.354-debug-arm64.apk",
  version: "1.4.354 (debug preview)",
  size: "121 MB",
  sha256: "be6f8cf987cb43a0df7e11a9fc843a733dff460704d0fddbd05f3ce8308f5b4e",
});
