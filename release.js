// Written by tools/publish-release.mjs (the app repository's "Publish release" workflow runs it). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.0.0/kinetix-fsl-v1.0.0-arm64.apk",
  version: "Version 1.0.0",
  size: "105 MB",
  sha256: "6ffbffb4cce24047d02ffe657178ef87560657d47dddeb82bf4d762807e1d748",
});
