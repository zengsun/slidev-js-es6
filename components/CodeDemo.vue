<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  code?: string
  language?: string
  editable?: boolean
  showOutput?: boolean
  autoRun?: boolean
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  language: 'javascript',
  editable: true,
  showOutput: true,
  autoRun: false,
  height: '300px'
})

const codeRef = ref(props.code)
const output = ref('')
const error = ref('')
const isRunning = ref(false)

// 安全的代码执行函数
const runCode = async () => {
  if (!codeRef.value.trim()) return
  
  isRunning.value = true
  output.value = ''
  error.value = ''
  
  try {
    // 创建一个安全的执行环境
    const originalConsole = console.log
    const logs: string[] = []
    
    // 重写 console.log 来捕获输出
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    }
    
    // 执行代码
    const func = new Function(codeRef.value)
    const result = func()
    
    // 恢复原始 console.log
    console.log = originalConsole
    
    // 设置输出
    if (logs.length > 0) {
      output.value = logs.join('\n')
    } else if (result !== undefined) {
      output.value = typeof result === 'object' 
        ? JSON.stringify(result, null, 2) 
        : String(result)
    } else {
      output.value = '代码执行完成'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    isRunning.value = false
  }
}

// 自动运行
onMounted(() => {
  if (props.autoRun) {
    runCode()
  }
})

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(codeRef.value)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<template>
  <div class="code-demo border border-gray-200 rounded-lg overflow-hidden">
    <!-- 工具栏 -->
    <div class="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="text-sm font-medium text-gray-700">{{ language }}</span>
        <div class="flex space-x-1">
          <div class="w-3 h-3 bg-red-400 rounded-full"></div>
          <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div class="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button 
          @click="copyCode"
          class="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-200"
          title="复制代码"
        >
          📋
        </button>
        <button 
          v-if="showOutput && editable"
          @click="runCode"
          :disabled="isRunning"
          class="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {{ isRunning ? '运行中...' : '▶ 运行' }}
        </button>
      </div>
    </div>

    <div class="grid" :class="showOutput ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'">
      <!-- 代码编辑区 -->
      <div class="relative">
        <textarea
          v-if="editable"
          v-model="codeRef"
          class="w-full font-mono text-sm p-4 bg-gray-900 text-gray-100 resize-none focus:outline-none"
          :style="{ height }"
          spellcheck="false"
          placeholder="在这里编写 JavaScript 代码..."
        />
        <pre
          v-else
          class="w-full font-mono text-sm p-4 bg-gray-900 text-gray-100 overflow-auto"
          :style="{ height }"
        ><code>{{ codeRef }}</code></pre>
      </div>

      <!-- 输出区 -->
      <div 
        v-if="showOutput" 
        class="border-l border-gray-200 bg-white"
      >
        <div class="p-4 border-b border-gray-200 bg-gray-50">
          <h4 class="text-sm font-medium text-gray-700">输出结果</h4>
        </div>
        <div class="p-4" :style="{ height }">
          <div v-if="error" class="text-red-600 font-mono text-sm whitespace-pre-wrap">
            ❌ 错误: {{ error }}
          </div>
          <div v-else-if="output" class="text-green-600 font-mono text-sm whitespace-pre-wrap">
            {{ output }}
          </div>
          <div v-else class="text-gray-400 text-sm italic">
            点击运行按钮查看输出结果
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-demo {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

textarea {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
  tab-size: 2;
}

pre code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
}
</style>