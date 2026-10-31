// Written by tools/publish-release.mjs (the app repository's CI runs it on every push to main). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.4.353-debug/kinetix-fsl-1.4.353-debug-arm64.apk",
  version: "1.4.353 (debug preview)",
  size: "121 MB",
  sha256: "1254e6d4d0544e78366d01fe8a7973c2beb7d12d0421bba59435bdca391f4333",
});
