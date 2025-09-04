// #region snippet
// Promise 和 async/await 示例

// 基础 Promise
function createPromise(shouldResolve = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve('Promise 成功！');
      } else {
        reject(new Error('Promise 失败！'));
      }
    }, 1000);
  });
}

// Promise 链式调用
function promiseChain() {
  return createPromise()
    .then(result => {
      console.log('第一步：', result);
      return '第二步数据';
    })
    .then(result => {
      console.log('第二步：', result);
      return '最终结果';
    })
    .catch(error => {
      console.error('错误：', error.message);
    });
}

// async/await 版本
async function asyncFunction() {
  try {
    const result1 = await createPromise();
    console.log('第一步：', result1);
    
    const result2 = '第二步数据';
    console.log('第二步：', result2);
    
    return '最终结果';
  } catch (error) {
    console.error('错误：', error.message);
  }
}

// 并发执行
async function concurrentExecution() {
  const promises = [
    createPromise(),
    createPromise(),
    createPromise()
  ];
  
  const results = await Promise.all(promises);
  console.log('所有结果：', results);
}

export { createPromise, promiseChain, asyncFunction, concurrentExecution };
// #endregion snippet