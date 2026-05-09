const test = require("node:test");
const assert = require("node:assert/strict");

test("原型链属性查找会回退到 prototype", () => {
  function User(name) {
    this.name = name;
  }
  User.prototype.role = "guest";

  const u = new User("Tom");
  assert.equal(u.name, "Tom");
  assert.equal(u.role, "guest");
});

test("箭头函数不绑定自己的 this", () => {
  const obj = {
    value: 100,
    normal() {
      return this.value;
    },
    arrow: () => this
  };

  assert.equal(obj.normal(), 100);
  assert.notEqual(obj.arrow(), obj);
});
