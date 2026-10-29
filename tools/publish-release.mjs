// Points the website and the app's "Check for new updates" at a new APK. Run by the app repository's CI
// (pitarde/KinetixFSL, .github/workflows/ci.yml, job publish-debug) after it uploads the APK to a release here;
// it can also be run by hand. It rewrites three files so they always name the same build:
//   release.js       the Download button on the site
//   app-update.json  what the app reads (versionCode decides whether an update is offered)
//   index.html       the downloadUrl in the structured data
//
// node tools/publish-release.mjs --version-code 347 --version-name 1.4.347-a1b2c3d \
//   --apk-url https://github.com/pitarde/kinetix-fsl-website/releases/download/v1.4.347-debug/kinetix-fsl-1.4.347-debug-arm64.apk \
//   --size-bytes 119750656 --sha256 <64 hex> [--label "debug preview"] [--notes-file notes.txt]
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const APK_PREFIX = "https://github.com/pitarde/kinetix-fsl-website/releases/download/";

const { values } = parseArgs({
  options: {
    "version-code": { type: "string" },
    "version-name": { type: "string" },
    "apk-url": { type: "string" },
    "size-bytes": { type: "string" },
    sha256: { type: "string" },
    label: { type: "string", default: "debug preview" },
    "notes-file": { type: "string" },
  },
});

const versionCode = Number(values["version-code"]);
const versionName = values["version-name"] || "";
const apkUrl = values["apk-url"] || "";
const sizeBytes = Number(values["size-bytes"]);
const sha256 = (values.sha256 || "").toLowerCase();
const problems = [];
if (!Number.isInteger(versionCode) || versionCode <= 0) problems.push("--version-code must be a positive whole number");
if (!/^[0-9][0-9A-Za-z.+-]*$/.test(versionName)) problems.push("--version-name is missing or odd");
if (!apkUrl.startsWith(APK_PREFIX) || !apkUrl.endsWith(".apk")) problems.push(`--apk-url must start with ${APK_PREFIX} and end in .apk`);
if (!Number.isInteger(sizeBytes) || sizeBytes <= 0) problems.push("--size-bytes must be a positive whole number");
if (!/^[a-f0-9]{64}$/.test(sha256)) problems.push("--sha256 must be 64 hex characters");
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

let notes = "";
if (values["notes-file"]) notes = (await readFile(values["notes-file"], "utf8")).trim().slice(0, 2000);

// The site and the app both show MB as 1024 × 1024 bytes, rounded (119750656 → "114 MB").
const size = `${Math.round(sizeBytes / 1048576)} MB`;
const shortVersion = versionName.replace(/-[0-9a-f]{7}$/, "");

const releaseJs = `// Written by tools/publish-release.mjs (the app repository's CI runs it on every push to main). Do not edit by hand:
// app-update.json and the downloadUrl in index.html must name the same APK, and checks.mjs fails when they do not.
window.KINETIX_RELEASE = Object.freeze({
  available: true,
  apkUrl:
    ${JSON.stringify(apkUrl)},
  version: ${JSON.stringify(`${shortVersion} (${values.label})`)},
  size: ${JSON.stringify(size)},
  sha256: ${JSON.stringify(sha256)},
});
`;
await writeFile(path.join(root, "release.js"), releaseJs);

const update = { versionCode, versionName, apkUrl, sizeBytes, sha256, notes };
await writeFile(path.join(root, "app-update.json"), JSON.stringify(update, null, 2) + "\n");

const indexPath = path.join(root, "index.html");
const index = await readFile(indexPath, "utf8");
const pattern = /("downloadUrl":\s*)"[^"]*"/;
if (!pattern.test(index)) {
  console.error("index.html: no downloadUrl to update");
  process.exit(1);
}
await writeFile(indexPath, index.replace(pattern, `$1${JSON.stringify(apkUrl)}`));

console.log(`Published ${versionName} (code ${versionCode}, ${size}) to release.js, app-update.json and index.html.`);
