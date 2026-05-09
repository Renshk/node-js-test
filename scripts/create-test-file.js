const fs = require("node:fs");
const path = require("node:path");

const TEMPLATES_DIR = path.join("tests", "templates");

function toKebabCase(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeTemplateBase(raw) {
  if (!raw) return "question";
  let base = raw.trim();
  if (base.endsWith(".template.js")) {
    base = base.slice(0, -".template.js".length);
  } else if (base.endsWith(".js")) {
    base = base.slice(0, -".js".length);
  }
  return base || "question";
}

function usage() {
  console.log("Usage:");
  console.log(
    "  npm run new:test -- <js|node> <file-name> [template]"
  );
  console.log("  template: basename without extension, default \"question\"");
  console.log("            resolves to tests/templates/<template>.template.js");
  console.log("Example:");
  console.log("  npm run new:test -- js array-sort-behavior");
  console.log("  npm run new:test -- node stream-demo async");
}

const [, , area, rawName, templateArg] = process.argv;

if (!area || !rawName) {
  usage();
  process.exit(1);
}

if (!["js", "node"].includes(area)) {
  console.error("Error: area must be 'js' or 'node'.");
  usage();
  process.exit(1);
}

const fileName = `${toKebabCase(rawName)}.test.js`;
const targetDir = path.join(process.cwd(), "tests", area);
const targetPath = path.join(targetDir, fileName);

if (fs.existsSync(targetPath)) {
  console.error(`Error: file already exists -> ${targetPath}`);
  process.exit(1);
}

const templateBase = normalizeTemplateBase(templateArg);
const templatePath = path.join(
  process.cwd(),
  TEMPLATES_DIR,
  `${templateBase}.template.js`
);

if (!fs.existsSync(templatePath)) {
  console.error(`Error: missing template -> ${templatePath}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const title = `验证问题: ${rawName}`;
let content = fs.readFileSync(templatePath, "utf8");
content = content.replace(/^\/\*\*[\s\S]*?\*\/\s*/m, "");
content = content.replace(/__TITLE__/g, title);

fs.writeFileSync(targetPath, content, "utf8");
console.log(`Created: ${targetPath} (from ${templateBase}.template.js)`);
