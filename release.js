// Written by tools/publish-release.mjs (the app repository's "Publish release" workflow runs it). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    "https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.0.1/kinetix-fsl-v1.0.1-arm64.apk",
  version: "Version 1.0.1",
  size: "105 MB",
  sha256: "d2a242637770de36cbef46c80df07edb2110fdcd91ece9c303a5139b173aa349",
});
