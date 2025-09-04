---
theme: seriph
background: https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80
title: JavaScript 与 ES 基础知识
info: |
  ## JavaScript 与 ES 基础知识学习幻灯片
  
  全面学习 JavaScript 基础语法和 ECMAScript (ES6-ES11) 现代特性
  
  - JavaScript 基础语法
  - ES6+ 核心特性
  - 异步编程
  - 现代开发实践
  
  适合初级到中级开发者
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
seoMeta:
  ogImage: auto
---

# JavaScript 与 ES 基础知识

<div class="text-2xl mb-8 opacity-80">
  📚 全面学习现代 JavaScript 开发
</div>

<div class="grid grid-cols-2 gap-8 items-center">
  <div class="text-left space-y-4">
    <div class="flex items-center space-x-3">
      <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
      <span>JavaScript 基础语法</span>
    </div>
    <div class="flex items-center space-x-3">
      <div class="w-3 h-3 bg-green-500 rounded-full"></div>
      <span>ES6+ 现代特性</span>
    </div>
    <div class="flex items-center space-x-3">
      <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
      <span>异步编程模式</span>
    </div>
    <div class="flex items-center space-x-3">
      <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
      <span>实际项目应用</span>
    </div>
  </div>
  
  <div class="text-6xl">
    🚀
  </div>
</div>

<div @click="$slidev.nav.next" class="mt-12 py-3 px-6 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block">
  开始学习 <carbon:arrow-right class="inline" />
</div>

<div class="abs-br m-6 text-xl">
  <button @click="$slidev.nav.openInEditor()" title="在编辑器中打开" class="slidev-icon-btn">
    <carbon:edit />
  </button>
</div>

<!--
这是一个专门为学习 JavaScript 和 ES 特性设计的交互式幻灯片。
通过实际代码示例和动手练习，帮助开发者掌握现代 JavaScript 开发技能。
-->

---
transition: fade-out
layout: two-cols
layoutClass: gap-16
---

# 课程概览

本课程将系统性地介绍 JavaScript 基础知识和现代 ES 特性

## 🎯 学习目标

- **掌握 JavaScript 核心概念** - 变量、函数、对象、数组
- **理解 ES6+ 现代特性** - 箭头函数、解构、模块、类
- **学习异步编程** - Promise、async/await
- **探索最新特性** - ES2019-ES2022 新增功能
- **实际项目应用** - 最佳实践和开发模式

::right::

## 📋 课程结构

<div class="space-y-4">
  <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
    <div class="font-bold text-blue-800">第1章：JavaScript 基础</div>
    <div class="text-sm text-blue-600">变量、函数、对象、原型</div>
  </div>
  
  <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
    <div class="font-bold text-green-800">第2章：ES6 核心特性</div>
    <div class="text-sm text-green-600">箭头函数、解构、模板字符串</div>
  </div>
  
  <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
    <div class="font-bold text-purple-800">第3章：ES6+ 高级特性</div>
    <div class="text-sm text-purple-600">类、模块、Symbol、迭代器</div>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
    <div class="font-bold text-orange-800">第4章：异步编程</div>
    <div class="text-sm text-orange-600">Promise、async/await</div>
  </div>
  
  <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
    <div class="font-bold text-red-800">第5章：现代 ES 特性</div>
    <div class="text-sm text-red-600">ES2019-ES2022 新功能</div>
  </div>
</div>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---
src: ./pages/01-fundamentals.md
---

---
src: ./pages/02-es6-core.md
hide: false
---

---
src: ./pages/03-es6-advanced.md
hide: false
---

---
src: ./pages/04-async.md
hide: false
---

---
src: ./pages/05-modern-es.md
hide: false
---

---
layout: center
class: text-center
---

# 总结与下一步

🎉 **恭喜您完成了 JavaScript 与 ES 基础知识的学习！**

## 📚 建议的后续学习路径

- **深入学习框架** - Vue.js, React, Node.js
- **工程化工具** - Webpack, Vite, TypeScript
- **进阶模式** - 设计模式、性能优化
- **实际项目** - 构建完整的 Web 应用

## 🔗 有用资源

- [MDN Web 文档](https://developer.mozilla.org) · [JavaScript.info](https://javascript.info)
- [ES6 兼容性表](https://kangax.github.io/compat-table/es6/)
- [Node.js 官方文档](https://nodejs.org)

<PoweredBySlidev mt-10 />