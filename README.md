# JavaScript 与 ES 基础知识学习幻灯片

一个基于 Slidev 构建的交互式 JavaScript 和 ECMAScript 特性学习幻灯片。

## 🎯 学习目标

- **掌握 JavaScript 基础语法** - 变量、函数、对象、数组
- **理解 ES6+ 现代特性** - 箭头函数、解构、模块、类
- **学习异步编程** - Promise、async/await
- **探索最新特性** - ES2019-ES2022 新增功能
- **实际项目应用** - 最佳实践和开发模式

## 📚 课程内容

### 第1章：JavaScript 基础
- 变量声明与作用域 (var, let, const)
- 数据类型与类型转换
- 函数定义与调用
- 对象与数组操作
- 原型与原型链

### 第2章：ES6 核心特性
- 箭头函数语法
- 解构赋值（数组和对象）
- 模板字符串
- 参数默认值与剩余参数

### 第3章：ES6+ 高级特性
- 类与继承
- 模块系统 (import/export)
- Symbol 原始类型
- 迭代器与生成器

### 第4章：异步编程
- Promise 基础与链式调用
- async/await 语法
- 错误处理
- 并发控制

### 第5章：现代 ES 特性
- ES2020：可选链、空值合并、BigInt
- ES2021：逻辑赋值运算符、Promise.any
- ES2022：私有字段、顶层 await

## 🚀 开始使用

### 安装依赖

```bash
# 使用 pnpm安装依赖
pnpm install

# 或者使用 npm
npm install
```

### 启动开发服务器

```bash
# 开发模式（热重载）
pnpm dev

# 或者
npm run dev
```

访问 http://localhost:3030 查看幻灯片。

### 构建生产版本

```bash
# 构建静态文件
pnpm build

# 导出 PDF
pnpm export
```

## 🎮 交互功能

### 自定义组件
- **CodeDemo** - 实时代码编辑器和运行结果
- **ConceptExplainer** - 概念解释与示例对比
- **InteractiveQuiz** - 交互式测验和练习
- **FeatureComparison** - ES5 vs ES6+ 特性对比

### 学习特色
- 💻 **实时代码编辑** - 每个代码块都可编辑和运行
- ❓ **互动测验** - 即时检验学习成果
- 🔄 **对比学习** - 传统方法 vs 现代语法
- 🎨 **精美界面** - 基于 Seriph 主题的现代设计

## 📁 项目结构

```
js-es6/
├── slides.md              # 主幻灯片文件
├── pages/                 # 分章节幻灯片
│   ├── 01-fundamentals.md
│   ├── 02-es6-core.md
│   ├── 03-es6-advanced.md
│   ├── 04-async.md
│   └── 05-modern-es.md
├── components/            # Vue 组件
│   ├── CodeDemo.vue
│   ├── ConceptExplainer.vue
│   ├── InteractiveQuiz.vue
│   └── FeatureComparison.vue
├── snippets/              # 代码示例
│   ├── fundamentals/
│   ├── es6-examples/
│   ├── async-patterns/
│   └── modern-features/
└── package.json
```

## 📋 学习建议

1. **按顺序学习** - 从第1章开始，逐步推进
2. **动手实践** - 尝试编辑和运行每个代码示例
3. **完成练习** - 每章末尾的测验题帮助巩固知识
4. **查看备注** - 每张幻灯片的备注都有详细说明

## 🔗 相关资源

- [MDN Web 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) - 权威的 JavaScript 文档
- [ES6 入门教程](https://es6.ruanyifeng.com/) - 阮一峰的 ES6 教程
- [JavaScript.info](https://zh.javascript.info/) - 现代 JavaScript 教程
- [Can I Use](https://caniuse.com/) - 浏览器兼容性查询

## 📝 许可证

MIT License - 自由使用和修改

## 🚀 贡献

欢迎提交 Issue 和 Pull Request 来改进这个学习资源！

---

**开始你的 JavaScript 学习之旅吧！** 🌆