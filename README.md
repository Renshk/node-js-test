# Node.js + JavaScript 学习测试框架(simple nodejs&js test framework)

这个项目是一个“学习实验室”，专门用来把你在学习 Node.js / JavaScript 时遇到的问题写成测试，再通过运行测试快速验证结论。

## 1. 环境要求

- Node.js >= 20

## 2. 快速开始

```bash
npm test
```

## 3. 可用命令

- `npm test`：运行全部测试
- `npm run test:watch`：监听模式，文件变更后自动重跑
- `npm run test:js`：只运行 JavaScript 语法/语言特性测试
- `npm run test:node`：只运行 Node.js 运行时/API 特性测试
- `npm run new:test -- js array-sort`：快速创建测试文件（可选第三个参数选模板，默认 `question`）

单文件运行（把路径跟在 `--` 后面即可，无需单独脚本）：

```bash
npm test -- tests/js/array-index-start.test.js
```

## 4. 目录结构

```txt
tests/
  js/      # 语言语法、类型、异步、原型等（*.test.js）
  node/    # fs/path/events/process 等 Node 特性（*.test.js）
  templates/   # 仅骨架模板（*.template.js，不会被 npm test 收集）
```

## 5. 如何验证学习问题

### 步骤

1. 在 `tests/js` 或 `tests/node` 下新建 `*.test.js` 文件
2. 使用 `test('问题描述', () => { ... })` 写出你的假设
3. `npm test` 看是否通过
4. 若失败，修正你的理解或代码，再次验证

## 6. 推荐测试书写模式

- **Given**：准备输入和环境
- **When**：执行代码
- **Then**：断言实际结果

## 7. 单文件运行

```bash
node --test tests/js/array-index-start.test.js
```

或通过 npm：

```bash
npm test -- tests/js/array-index-start.test.js
```

## 8. 下一步建议

- 每学一个新知识点，就新增一个最小测试用例
- 通过“先写预期，再跑测试”的方式训练推理能力
- 默认骨架：`tests/templates/question.template.js`（不传模板名时使用）
- 还可自建 `tests/templates/<名字>.template.js`，生成时用第三个参数选用

## 9. 快速生成测试文件

```bash
npm run new:test -- js array-sort-behavior
npm run new:test -- node stream-pipe-basics
```

指定模板（对应 `tests/templates/<template>.template.js`，省略则使用 `question`）：

```bash
npm run new:test -- js fetch-timeout async
```

也允许写成带后缀的形式（会规范化）：`async.template.js` 或 `async.js` 均可。

生成后会在 `tests/js` 或 `tests/node` 下创建对应的 `*.test.js` 文件。

仓库自带示例：`question.template.js`、`async.template.js`。
