// Written by tools/publish-release.mjs (the app repository's "Publish release" workflow runs it). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.0.4/kinetix-fsl-v1.0.4-arm64.apk",
  version: "Version 1.0.4",
  size: "106 MB",
  sha256: "cd51e0140a01f3a9afca5ae074a03d220d65f132445a0ce99f340242893be516",
});
