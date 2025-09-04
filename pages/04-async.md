---
layout: cover
background: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80
class: text-center
---

# 第4章：异步编程

<div class="mb-8">
  <div class="text-6xl mb-4">⏰</div>
  <div class="text-xl opacity-80">掌握现代异步编程模式</div>
</div>

<div class="grid grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
  <div>
    <h3 class="text-lg font-semibold mb-3">本章内容</h3>
    <ul class="space-y-2 text-sm">
      <li>• Promise 基础与链式调用</li>
      <li>• async/await 语法</li>
      <li>• 错误处理</li>
      <li>• 并发控制</li>
    </ul>
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-3">学习目标</h3>
    <ul class="space-y-2 text-sm">
      <li>• 理解异步编程概念</li>
      <li>• 掌握 Promise 使用</li>
      <li>• 学会 async/await</li>
      <li>• 处理异步错误</li>
    </ul>
  </div>
</div>

---
layout: two-cols
layoutClass: gap-16
---

# 4.1 Promise 基础

Promise 是 ES6 引入的异步编程解决方案，解决了回调地狱问题。

## 🔄 Promise 状态

- **pending** - 初始状态
- **fulfilled** - 成功状态
- **rejected** - 失败状态

::right::

## 异步处理对比

### 回调函数

```javascript
// 回调地狱示例
function fetchUser(id, callback) {
  setTimeout(() => {
    if (id === 1) {
      callback(null, { id: 1, name: '张三' });
    } else {
      callback(new Error('用户不存在'), null);
    }
  }, 1000);
}

fetchUser(1, (err, user) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('用户:', user.name);
  }
});
```

**问题**: 回调地狱、错误处理复杂、难以组合

### Promise

```javascript
// Promise 示例
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, name: '张三' });
      } else {
        reject(new Error('用户不存在'));
      }
    }, 1000);
  });
}

fetchUser(1)
  .then(user => console.log('用户:', user.name))
  .catch(err => console.error(err.message));
```

**优势**: 避免回调地狱、链式调用、统一错误处理

---
layout: default
---

# 4.2 async/await 语法

async/await 提供了更直观的异步编程方式。

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

```javascript
// async/await 示例
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUserData(id) {
  try {
    console.log('开始获取用户数据...');
    
    // 模拟 API 调用
    await delay(1000);
    
    if (id === 1) {
      return { id: 1, name: '张三', email: 'zhangsan@example.com' };
    } else {
      throw new Error('用户不存在');
    }
  } catch (error) {
    console.error('获取用户数据失败:', error.message);
    throw error;
  }
}

// 使用 async/await
(async () => {
  try {
    const user = await fetchUserData(1);
    console.log('用户信息:', user);
  } catch (error) {
    console.log('处理错误:', error.message);
  }
})();
```

</div>

<div>

```javascript
// 并发处理
async function fetchMultipleUsers() {
  console.log('开始并发获取多个用户...');
  
  const userPromises = [
    fetchUserData(1),
    fetchUserData(2),
    fetchUserData(3)
  ];
  
  try {
    // Promise.all - 全部成功
    const users = await Promise.all(userPromises);
    console.log('所有用户:', users);
  } catch (error) {
    console.log('有用户获取失败:', error.message);
  }
  
  try {
    // Promise.allSettled - 获取所有结果
    const results = await Promise.allSettled(userPromises);
    const successful = results.filter(r => r.status === 'fulfilled');
    console.log('成功获取的用户数量:', successful.length);
  } catch (error) {
    console.log('处理过程出错:', error.message);
  }
}

// 执行并发请求
// fetchMultipleUsers();
```

</div>

</div>

---
layout: center
class: text-center
---

# ⚡ 第4章总结

## 异步编程掌握要点

<div class="grid grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-blue-800 mb-4">Promise</h3>
    <ul class="text-blue-700 text-sm space-y-2">
      <li>• 三种状态：pending/fulfilled/rejected</li>
      <li>• .then()/.catch() 链式调用</li>
      <li>• Promise.all/allSettled/race</li>
      <li>• 避免回调地狱</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-green-800 mb-4">async/await</h3>
    <ul class="text-green-700 text-sm space-y-2">
      <li>• 同步写法处理异步</li>
      <li>• try/catch 错误处理</li>
      <li>• 更好的可读性</li>
      <li>• 顺序与并发控制</li>
    </ul>
  </div>
</div>

<div class="mt-8 text-lg text-gray-600">
  💡 <strong>下一章预告</strong>：探索 ES2019-ES2022 的最新特性，了解 JavaScript 语言的最新发展。
</div>