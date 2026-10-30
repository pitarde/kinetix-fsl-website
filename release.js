// Written by tools/publish-release.mjs (the app repository's CI runs it on every push to main). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.4.350-debug/kinetix-fsl-1.4.350-debug-arm64.apk",
  version: "1.4.350 (debug preview)",
  size: "117 MB",
  sha256: "60c46b7e1453838ee12e3c2b7b00c4c24588648751630c3fd621a491112b94b2",
});
