// Written by tools/publish-release.mjs (the app repository's "Publish release" workflow runs it). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.0.9/kinetix-fsl-v1.0.9-arm64.apk",
  version: "Version 1.0.9",
  size: "106 MB",
  sha256: "2c408c0d62398d102fb861ab3527d0620700e452be6e96fd463d8ffcdc66811a",
});
