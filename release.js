// Written by tools/publish-release.mjs (the app repository's "Publish release" workflow runs it). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.0.6/kinetix-fsl-v1.0.6-arm64.apk",
  version: "Version 1.0.6",
  size: "106 MB",
  sha256: "6f99e1d06d520dfb579a253930982ec141736ff17ff65e4c9d369999c9b3a216",
});
