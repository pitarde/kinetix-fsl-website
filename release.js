// Written by tools/publish-release.mjs (the app repository's CI runs it on every push to main). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.4.349-debug/kinetix-fsl-1.4.349-debug-arm64.apk",
  version: "1.4.349 (debug preview)",
  size: "117 MB",
  sha256: "27b0b0e3a016b6d05bdb878ece9eea35f1b87894c5b31dc3d3d4786cb5a7539f",
});
