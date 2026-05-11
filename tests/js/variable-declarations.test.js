const { describe, test } = require('node:test');
const assert = require("node:assert/strict");

/**
 * ==============================================================================
 * JavaScript 变量声明知识点与注意点总结
 * ==============================================================================
 * 
 * 1. 作用域 (Scope)
 *    - var:   函数作用域 (Function Scope) 或全局作用域。穿透块级作用域 ({})。
 *    - let:   块级作用域 (Block Scope)。只在声明所在的 {} 内有效。
 *    - const: 块级作用域 (Block Scope)。
 * 
 * 2. 变量提升 (Hoisting) 与 暂时性死区 (TDZ - Temporal Dead Zone)
 *    - var:   存在变量提升。可以在声明前访问，值为 `undefined`。
 *    - let:   存在提升，但受到 TDZ 限制。在声明前访问会抛出 `ReferenceError`。
 *    - const: 存在提升，受 TDZ 限制。在声明前访问会抛出 `ReferenceError`。
 * 
 * 3. 重复声明 (Re-declaration)
 *    - var:   允许在同一作用域内重复声明，后续声明会被合并或覆盖。
 *    - let:   禁止在同一作用域内重复声明，会抛出 `SyntaxError`。
 *    - const: 禁止在同一作用域内重复声明，会抛出 `SyntaxError`。
 * 
 * 4. 重新赋值 (Re-assignment) 与 初始化 (Initialization)
 *    - var:   允许重新赋值。声明时可以不初始化（默认为 undefined）。
 *    - let:   允许重新赋值。声明时可以不初始化（默认为 undefined）。
 *    - const: 禁止重新赋值（引用地址不可变）。声明时必须立即初始化。
 *             注意：如果是对象或数组，其内部的属性/元素是可以被修改的（因为引用地址没变）。
 * 
 * 5. 隐式全局变量 (Implicit Global)
 *    - 非严格模式：不加任何关键字声明并赋值的变量会成为全局对象的属性。
 *    - 严格模式 ("use strict")：禁止隐式声明，会抛出 `ReferenceError`。
 * ==============================================================================
 */

describe("JavaScript Variable Declarations", () => {
    
    describe("1. Scope (作用域)", () => {
        test("var should leak out of block scope", () => {
            // Given: A block scope containing a var declaration
            const condition = true;
            
            // When: The block is executed
            if (condition) {
                var leakedVar = "I am outside!";
            }
            
            // Then: The variable is accessible outside the block
            assert.strictEqual(leakedVar, "I am outside!");
        });

        test("let and const should be confined to block scope", () => {
            // Given: A block scope containing let and const declarations
            const condition = true;
            
            // When: We try to evaluate code that accesses them outside the block
            const accessLetOutside = () => {
                if (condition) { let blockLet = 1; }
                return blockLet; 
            };
            
            const accessConstOutside = () => {
                if (condition) { const blockConst = 2; }
                return blockConst;
            };

            // Then: A ReferenceError is thrown
            assert.throws(accessLetOutside, ReferenceError);
            assert.throws(accessConstOutside, ReferenceError);
        });
    });

    describe("2. Hoisting and TDZ (提升与暂时性死区)", () => {
        test("var should be hoisted and initialized as undefined", () => {
            // Given: A variable declared with var lower in the function
            // When: It is accessed before its declaration line
            const result = hoistedVar;
            var hoistedVar = "initialized";

            // Then: It does not throw, but returns undefined
            assert.strictEqual(result, undefined);
        });

        test("let and const should throw ReferenceError due to TDZ", () => {
            // Given: Variables declared with let/const lower in the scope
            // When: Attempting to access them before declaration
            const accessLetBefore = () => { return tdzLet; let tdzLet = 1; };
            const accessConstBefore = () => { return tdzConst; const tdzConst = 2; };
            const accessVarBefore = () => { return tdzVar; var tdzVar = 3; };

            // Then: A ReferenceError is thrown
            assert.throws(accessLetBefore, ReferenceError);
            assert.throws(accessConstBefore, ReferenceError);
            assert.strictEqual(accessVarBefore(), undefined);
        });
    });

    describe("3. Re-declaration (重复声明)", () => {
        test("var allows re-declaration", () => {
            // Given: An existing var variable
            var counter = 1;
            
            // When: It is re-declared in the same scope
            var counter = 2;
            
            // Then: No error is thrown and the value is updated
            assert.strictEqual(counter, 2);
        });

        test("let and const prevent re-declaration in the same scope", () => {
            // Given: Existing variables
            // When: Attempting to re-declare them
            const reDeclareLet = () => eval("let a = 1; let a = 2;");
            const reDeclareConst = () => eval("const b = 1; const b = 2;");

            // Then: A SyntaxError is thrown
            assert.throws(reDeclareLet, SyntaxError);
            assert.throws(reDeclareConst, SyntaxError);
        });
    });

    describe("4. Re-assignment and Initialization (重新赋值与初始化)", () => {
        test("var allows re-assignment", () => {
            // Given: A variable declared with var
            var score = 1000;
            
            // When: A new value is assigned
            score = 900;
            
            // Then: The value is successfully updated
            assert.strictEqual(score, 900);
        });

        test("let allows re-assignment", () => {
            // Given: A variable declared with let
            let score = 100;
            
            // When: A new value is assigned
            score = 90;
            
            // Then: The value is successfully updated
            assert.strictEqual(score, 90);
        });

        test("const prevents re-assignment", () => {
            // Given: A constant primitive variable
            const PI = 3.14159;
            
            // When: Attempting to re-assign it
            const tryReassign = () => { PI = 3.14; };
            
            // Then: A TypeError is thrown
            assert.throws(tryReassign, TypeError);
        });

        test("const allows mutation of object properties (reference remains constant)", () => {
            // Given: An object declared with const
            const user = { name: "Alice", role: "Developer" };
            
            // When: A property within the object is modified
            user.role = "Senior Developer";
            
            // Then: The mutation is successful
            assert.strictEqual(user.role, "Senior Developer");
        });

        test("const requires initialization during declaration", () => {
            // Given: A const declaration
            // When: Declared without an initial value
            const declareWithoutInit = () => eval("const missingValue;");
            
            // Then: A SyntaxError is thrown
            assert.throws(declareWithoutInit, SyntaxError);
        });
    });

    describe("5. Implicit Globals (隐式全局变量)", () => {
        test("Assigning without keywords throws ReferenceError in strict mode", () => {
            // Given: Strict mode environment
            // When: Assigning a value to an undeclared identifier
            const implicitAssign = () => {
                "use strict";
                forgotKeywordVar = 42;
            };

            // Then: A ReferenceError is thrown
            assert.throws(implicitAssign, ReferenceError);
        });

        test("Assigning without keywords creates a global property in non-strict mode", () => {
          // Given: Non-strict mode (默认环境)
          
          // When: Assigning a value to an undeclared identifier
          const createImplicitGlobal = () => {
              forgotKeywordVarNonStrict = 99; // 前面没有加任何声明关键字
          };
          createImplicitGlobal();

          // Then: It does not throw, and becomes a property of the Node.js `global` object
          assert.strictEqual(global.forgotKeywordVarNonStrict, 99);
          assert.strictEqual(forgotKeywordVarNonStrict, 99); // 直接访问也能拿到

          // 清理测试环境，防止污染全局对象影响其他测试用例
          delete global.forgotKeywordVarNonStrict;
      });
    });
});