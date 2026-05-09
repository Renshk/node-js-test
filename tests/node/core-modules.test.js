const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");
const { EventEmitter } = require("node:events");

test("path.join 在不同平台返回正确分隔路径", () => {
  const result = path.join("a", "b", "c.txt");
  assert.equal(result.includes("a"), true);
  assert.equal(result.includes("c.txt"), true);
});

test("EventEmitter 能监听并触发事件", () => {
  const emitter = new EventEmitter();
  let count = 0;

  emitter.on("inc", () => {
    count += 1;
  });

  emitter.emit("inc");
  emitter.emit("inc");

  assert.equal(count, 2);
});

test("fs.existsSync 可判断路径存在", () => {
  const tempDir = os.tmpdir();
  const exists = fs.existsSync(tempDir);
  assert.equal(exists, true);
});
