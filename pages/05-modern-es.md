---
layout: cover
background: https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
class: text-center
---

# 第5章：现代 ES 特性

<div class="mb-8">
  <div class="text-6xl mb-4">🚀</div>
  <div class="text-xl opacity-80">探索最新 JavaScript 特性</div>
</div>

<div class="grid grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
  <div>
    <h3 class="text-lg font-semibold mb-3">本章内容</h3>
    <ul class="space-y-2 text-sm">
      <li>• ES2019-2022 新特性</li>
      <li>• 可选链与空值合并</li>
      <li>• 逻辑赋值运算符</li>
      <li>• 顶层 await</li>
    </ul>
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-3">学习目标</h3>
    <ul class="space-y-2 text-sm">
      <li>• 了解最新语言特性</li>
      <li>• 掌握实用新语法</li>
      <li>• 提升开发效率</li>
      <li>• 跟上技术发展</li>
    </ul>
  </div>
</div>

---
layout: two-cols
layoutClass: gap-16
---

# 5.1 ES2020 核心特性

ES2020 带来了可选链、空值合并等实用特性。

## ⚡ 主要特性

- **可选链** - `?.` 安全访问属性
- **空值合并** - `??` 处理 null/undefined
- **BigInt** - 大整数类型
- **动态导入** - `import()` 函数

::right::

## 安全属性访问对比

### 传统安全访问

```javascript
const user = {
  profile: {
    address: {
      city: '北京'
    }
  }
};

// 传统方式 - 冗长且易出错
let city;
if (user && 
    user.profile && 
    user.profile.address && 
    user.profile.address.city) {
  city = user.profile.address.city;
}

console.log(city); // '北京'

// 处理可能不存在的属性
const user2 = { profile: null };
let city2;
if (user2 && 
    user2.profile && 
    user2.profile.address) {
  city2 = user2.profile.address.city;
}
console.log(city2); // undefined
```

**问题**: 需要逐层检查每个属性是否存在，代码冗长、容易遗漏检查、可读性差

### ES2020 可选链

```javascript
const user = {
  profile: {
    address: {
      city: '北京'
    }
  }
};

// 可选链操作符
const city = user?.profile?.address?.city;
console.log(city); // '北京'

// 处理不存在的属性
const user2 = { profile: null };
const city2 = user2?.profile?.address?.city;
console.log(city2); // undefined

// 方法调用
const result = user?.profile?.getName?.();
console.log(result); // undefined (方法不存在)

// 数组访问
const firstItem = user?.items?.[0];
console.log(firstItem); // undefined
```

**优势**: 使用 ?. 操作符安全访问嵌套属性，语法简洁、安全访问、无需逐层检查

---
layout: default
---

# 5.2 现代语法特性

ES2021-2022 继续改进 JavaScript 的开发体验。

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## 🔧 空值合并与逻辑赋值

```javascript
// 空值合并操作符 (??)
const config = {
  theme: null,
  timeout: 0,
  debug: false
};

// ?? 只处理 null 和 undefined
const theme = config.theme ?? 'default';
const timeout = config.timeout ?? 5000;  // 0 是有效值
const debug = config.debug ?? true;      // false 是有效值

console.log(theme, timeout, debug);     // 'default' 0 false

// 对比 || 操作符
const theme2 = config.theme || 'default';
const timeout2 = config.timeout || 5000; // 0 被认为是假值
const debug2 = config.debug || true;     // false 被认为是假值

console.log(theme2, timeout2, debug2);   // 'default' 5000 true

// 逻辑赋值运算符 (ES2021)
let count = 0;
count ||= 10;  // 等同于 count = count || 10
console.log(count); // 10

let value = null;
value ??= 'default'; // 等同于 value = value ?? 'default'
console.log(value);  // 'default'
```

</div>

<div>

## 🌟 其他现代特性

```javascript
// 数字分隔符 (ES2021)
const million = 1_000_000;
const binary = 0b1010_0001;
const hex = 0xFF_EC_DE_5E;

console.log(million);  // 1000000
console.log(binary);   // 161
console.log(hex);      // 4293913694

// Promise.any (ES2021)
const promises = [
  Promise.reject('错误1'),
  Promise.resolve('成功1'),
  Promise.resolve('成功2')
];

Promise.any(promises)
  .then(result => console.log('第一个成功:', result))
  .catch(error => console.log('所有都失败:', error));

// String.replaceAll (ES2021)
const text = 'hello world hello';
const replaced = text.replaceAll('hello', 'hi');
console.log(replaced); // 'hi world hi'

// 私有字段 (ES2022 - 语法演示)
// class Counter {
//   #count = 0;
//   increment() { this.#count++; }
//   get value() { return this.#count; }
// }

console.log('现代特性演示完成');
```

</div>

</div>

---
layout: center
class: text-center
---

# 🎯 第5章总结

## 现代 JavaScript 特性掌握

<div class="grid grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-blue-800 mb-4">ES2020 特性</h3>
    <ul class="text-blue-700 text-sm space-y-2">
      <li>• 可选链：obj?.prop?.method?.()</li>
      <li>• 空值合并：value ?? default</li>
      <li>• BigInt：大整数类型</li>
      <li>• 动态导入：import()</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-green-800 mb-4">ES2021-2022</h3>
    <ul class="text-green-700 text-sm space-y-2">
      <li>• 逻辑赋值：??= ||= &&=</li>
      <li>• 数字分隔符：1_000_000</li>
      <li>• Promise.any</li>
      <li>• 私有字段：#private</li>
    </ul>
  </div>
</div>

<div class="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
  <h3 class="text-xl font-bold text-gray-800 mb-4">🎓 课程完成！</h3>
  <p class="text-gray-700 mb-4">
    恭喜您完成了 JavaScript 与 ES 基础知识的学习！您现在已经掌握了：
  </p>
  <div class="grid grid-cols-2 gap-4 text-sm">
    <ul class="text-gray-600 space-y-1">
      <li>✅ JavaScript 基础语法与概念</li>
      <li>✅ ES6 核心特性应用</li>
      <li>✅ 面向对象编程</li>
    </ul>
    <ul class="text-gray-600 space-y-1">
      <li>✅ 异步编程模式</li>
      <li>✅ 现代 JavaScript 特性</li>
      <li>✅ 最佳实践与模式</li>
    </ul>
  </div>
  
  <div class="mt-6 text-center">
    <p class="text-lg font-medium text-blue-700">
      继续学习：框架应用、工程化工具、性能优化
    </p>
  </div>
</div>