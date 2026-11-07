// Written by tools/publish-release.mjs (the app repository's "Publish release" workflow runs it). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.0.2/kinetix-fsl-v1.0.2-arm64.apk",
  version: "Version 1.0.2",
  size: "106 MB",
  sha256: "4ada2e4db640235d92fd753b9464708b7f6a33b73ebf07ed650a7214a0261464",
});
