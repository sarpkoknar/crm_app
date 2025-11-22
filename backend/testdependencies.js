// testDependencies.js
const fs = require("fs");
const path = require("path");

// 1. package.json oku
const pkg = require("./package.json");
const dependencies = Object.keys(pkg.dependencies || {});
const devDependencies = Object.keys(pkg.devDependencies || {});
const allDeps = [...dependencies, ...devDependencies];

// 2. backend içindeki tüm dosyaları tara (node_modules hariç!)
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);

    // node_modules ve package-lock.json hariç
    if (file === "node_modules" || file === "package-lock.json") {
      return;
    }

    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const backendPath = __dirname;
const allFiles = getAllFiles(backendPath);

// 3. require / import taraması
const usedDeps = new Set();

allFiles.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");

  allDeps.forEach((dep) => {
    const requireRegex = new RegExp(`require\\(['"]${dep}['"]\\)`);
    const importRegex = new RegExp(`from ['"]${dep}['"]`);
    const bareImportRegex = new RegExp(`import ['"]${dep}['"]`);

    if (
      requireRegex.test(content) ||
      importRegex.test(content) ||
      bareImportRegex.test(content)
    ) {
      usedDeps.add(dep);
    }
  });
});

// 4. Kullanılan & kullanılmayan paketleri listele
const unusedDeps = allDeps.filter((d) => !usedDeps.has(d));

console.log("------ KULLANILAN PAKETLER (Gerçek) ------");
usedDeps.forEach((d) => console.log("✔", d));

console.log("\n------ KULLANILMAYAN PAKETLER (Gerçek) ------");
unusedDeps.forEach((d) => console.log("⚠", d));
