#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const appName = "frontend"
 
const basePath = path.join(__dirname, "..");

// 🔹 Function to replace old app names with the new one
const replaceInFile = (filePath) => {
  const fullPath = path.join(basePath, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, "utf8");
    content = content
      .replace(/gptSeek/g, appName)
      .replace(/gptSeek/g, appName)
      .replace(/stylish-pack/g, appName)
      .replace(/com\.gptSeek/g, `com.${appName.replace(/\s+/g, "").toLowerCase()}`)
      .replace(/com\.stylish-pack/g, `com.${appName.replace(/\s+/g, "").toLowerCase()}`);
    fs.writeFileSync(fullPath, content, "utf8");
  }
};

// 🔹 List of files to update
const filesToReplace = [
  "package.json",
  "app.json",
  "android/app/src/main/AndroidManifest.xml",
  "android/app/src/main/java/com/gptSeek/MainActivity.java",
  "android/app/src/main/java/com/gptSeek/MainApplication.java",
  "ios/gptSeek.xcodeproj/project.pbxproj",
  "ios/gptSeek/Info.plist",
];

filesToReplace.forEach(replaceInFile);

// 🔹 Rename iOS folders & workspace files
const renameFolder = (oldName, newName) => {
  const oldPath = path.join(basePath, "ios", oldName);
  const newPath = path.join(basePath, "ios", newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
  }
};

renameFolder("gptSeek", appName);
renameFolder("gptSeekTests", `${appName}Tests`);
renameFolder("gptSeek.xcodeproj", `${appName}.xcodeproj`);
renameFolder("gptSeek.xcworkspace", `${appName}.xcworkspace`);

renameFolder("stylish-pack", appName);

// 🔹 Rename Xcode scheme
const schemePathgptSeek = path.join(basePath, "ios", "gptSeek.xcodeproj", "xcshareddata", "xcschemes", "gptSeek.xcscheme");
const newSchemePathgptSeek = path.join(basePath, "ios", `${appName}.xcodeproj`, "xcshareddata", "xcschemes", `${appName}.xcscheme`);

const schemePathStylishPack = path.join(basePath, "ios", "stylish-pack.xcodeproj", "xcshareddata", "xcschemes", "stylish-pack.xcscheme");
const newSchemePathStylishPack = path.join(basePath, "ios", `${appName}.xcodeproj`, "xcshareddata", "xcschemes", `${appName}.xcscheme`);

if (fs.existsSync(schemePathgptSeek)) {
  fs.renameSync(schemePathgptSeek, newSchemePathgptSeek);
  replaceInFile(newSchemePathgptSeek);
}

if (fs.existsSync(schemePathStylishPack)) {
  fs.renameSync(schemePathStylishPack, newSchemePathStylishPack);
  replaceInFile(newSchemePathStylishPack);
}

console.log(`✅ Project successfully renamed to "${appName}"! 🚀`);
