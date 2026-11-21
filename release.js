// Written by tools/publish-release.mjs (the app repository's "Publish release" workflow runs it). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.0.10/kinetix-fsl-v1.0.10-arm64.apk",
  version: "Version 1.0.10",
  size: "106 MB",
  sha256: "8abab427013f351132832770ad8047e07348728da84f16f6238b7713c0f1c798",
});
