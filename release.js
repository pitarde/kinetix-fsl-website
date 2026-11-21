// Written by tools/publish-release.mjs (the app repository's "Publish release" workflow runs it). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.0.12/kinetix-fsl-v1.0.12-arm64.apk",
  version: "Version 1.0.12",
  size: "106 MB",
  sha256: "6ae35a0f35266df05440846a1a08896ea4a5c22e081143dfeb6c99232a4783e7",
});
