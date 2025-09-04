<script setup lang="ts">
import { ref, computed } from 'vue'

interface Example {
  title: string
  code: string
  explanation: string
}

interface Props {
  concept: string
  description: string
  examples: Example[]
  visualType?: 'comparison' | 'timeline' | 'diagram'
}

const props = withDefaults(defineProps<Props>(), {
  visualType: 'comparison'
})

const currentExampleIndex = ref(0)
const showDetails = ref(false)

const currentExample = computed(() => props.examples[currentExampleIndex.value])

const nextExample = () => {
  currentExampleIndex.value = (currentExampleIndex.value + 1) % props.examples.length
}

const prevExample = () => {
  currentExampleIndex.value = currentExampleIndex.value === 0 
    ? props.examples.length - 1 
    : currentExampleIndex.value - 1
}

const selectExample = (index: number) => {
  currentExampleIndex.value = index
}
</script>

<template>
  <div class="concept-explainer bg-white border border-gray-200 rounded-lg p-6">
    <!-- 概念标题 -->
    <div class="mb-6">
      <h3 class="text-2xl font-bold text-gray-800 mb-3">{{ concept }}</h3>
      <p class="text-gray-600 leading-relaxed">{{ description }}</p>
    </div>

    <!-- 示例选择器 -->
    <div class="mb-6">
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="(example, index) in examples"
          :key="index"
          @click="selectExample(index)"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            currentExampleIndex === index
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ example.title }}
        </button>
      </div>
      
      <!-- 导航按钮 -->
      <div class="flex items-center justify-between">
        <button
          @click="prevExample"
          class="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <span>← 上一个示例</span>
        </button>
        <span class="text-sm text-gray-500">
          {{ currentExampleIndex + 1 }} / {{ examples.length }}
        </span>
        <button
          @click="nextExample"
          class="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <span>下一个示例 →</span>
        </button>
      </div>
    </div>

    <!-- 当前示例 -->
    <div v-if="currentExample" class="space-y-4">
      <!-- 示例标题 -->
      <h4 class="text-lg font-semibold text-gray-800">{{ currentExample.title }}</h4>
      
      <!-- 代码示例 -->
      <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre class="text-gray-100 font-mono text-sm"><code>{{ currentExample.code }}</code></pre>
      </div>
      
      <!-- 详细说明 -->
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h5 class="font-medium text-blue-800 mb-2">💡 解释</h5>
            <div 
              v-if="showDetails || currentExample.explanation.length < 150"
              class="text-blue-700 leading-relaxed"
              v-html="currentExample.explanation"
            />
            <div v-else class="text-blue-700 leading-relaxed">
              {{ currentExample.explanation.substring(0, 150) }}...
              <button 
                @click="showDetails = true"
                class="text-blue-600 hover:text-blue-800 font-medium ml-2"
              >
                展开详情
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 视觉化类型 -->
    <div v-if="visualType === 'comparison'" class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h5 class="font-medium text-gray-800 mb-3">📊 对比分析</h5>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-red-50 border-l-4 border-red-500 p-3 rounded-r">
          <h6 class="font-medium text-red-800">传统方式</h6>
          <p class="text-red-700 text-sm mt-1">较复杂，代码冗长</p>
        </div>
        <div class="bg-green-50 border-l-4 border-green-500 p-3 rounded-r">
          <h6 class="font-medium text-green-800">现代方式</h6>
          <p class="text-green-700 text-sm mt-1">简洁优雅，易于理解</p>
        </div>
      </div>
    </div>

    <div v-else-if="visualType === 'timeline'" class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h5 class="font-medium text-gray-800 mb-3">📅 发展时间线</h5>
      <div class="space-y-2">
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span class="text-sm text-gray-700">ES5 (2009) - 传统语法</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          <span class="text-sm text-gray-700">ES6 (2015) - 现代特性引入</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span class="text-sm text-gray-700">ES2020+ - 持续演进</span>
        </div>
      </div>
    </div>

    <div v-else-if="visualType === 'diagram'" class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h5 class="font-medium text-gray-800 mb-3">🔗 概念关系图</h5>
      <div class="text-center text-gray-600">
        <div class="inline-block p-4 bg-white rounded-lg border-2 border-blue-200">
          {{ concept }}
        </div>
      </div>
    </div>

    <!-- 学习提示 -->
    <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h5 class="font-medium text-yellow-800 mb-2">💭 学习提示</h5>
      <ul class="text-yellow-700 text-sm space-y-1">
        <li>• 理解概念的核心原理</li>
        <li>• 通过示例加深记忆</li>
        <li>• 在实际项目中练习应用</li>
        <li>• 注意浏览器兼容性</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.concept-explainer {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

pre code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
}
</style>