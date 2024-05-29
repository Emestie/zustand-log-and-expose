import fs from "fs";

const package_ = fs.readFileSync("./package.json").toString();
const changelog = fs.readFileSync("./CHANGELOG.md").toString();

const jsonPackage = JSON.parse(package_);
const version = jsonPackage.version;

if (!changelog.includes(`# ${version}`)) {
    console.log("[Error!] CHANGELOG.md must cover current version!");
    exit(1);
}
