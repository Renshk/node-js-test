const test = require("node:test");
const assert = require("node:assert/strict");

test("var/let/const 的作用域差异", () => {
  if (true) {
    var fromVar = 1;
    let fromLet = 2;
    const fromConst = 3;

    assert.equal(fromLet, 2);
    assert.equal(fromConst, 3);
  }

  assert.equal(fromVar, 1);
  assert.equal(typeof fromLet, "undefined");
  assert.equal(typeof fromConst, "undefined");
});

test("解构赋值支持默认值", () => {
  const obj = { a: 10 };
  const { a, b = 20 } = obj;

  assert.equal(a, 10);
  assert.equal(b, 20);
});

test("可选链 + 空值合并", () => {
  const user = {
    profile: {
      city: "Shenzhen"
    }
  };

  const city = user?.profile?.city ?? "Unknown";
  const zip = user?.profile?.zip ?? "000000";

  assert.equal(city, "Shenzhen");
  assert.equal(zip, "000000");
});
