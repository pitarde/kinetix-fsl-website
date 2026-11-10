// Written by tools/publish-release.mjs (the app repository's "Publish release" workflow runs it). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.0.5/kinetix-fsl-v1.0.5-arm64.apk",
  version: "Version 1.0.5",
  size: "106 MB",
  sha256: "ca3dc9f29158c4ad1c8d6a88a071229ebdb6df6bb61f77990cf9d0834af52c5c",
});
