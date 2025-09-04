<script setup lang="ts">
import { ref, computed } from 'vue'

interface ComparisonItem {
  feature: string
  oldWay: {
    title: string
    code: string
    description: string
    issues?: string[]
  }
  newWay: {
    title: string
    code: string
    description: string
    benefits?: string[]
  }
  browserSupport?: {
    feature: string
    support: string
  }
}

interface Props {
  title: string
  items: ComparisonItem[]
  showBrowserSupport?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBrowserSupport: true
})

const currentItemIndex = ref(0)
const currentTab = ref<'comparison' | 'browser-support'>('comparison')

const currentItem = computed(() => props.items[currentItemIndex.value])

const selectItem = (index: number) => {
  currentItemIndex.value = index
}

const copyCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<template>
  <div class="feature-comparison bg-white border border-gray-200 rounded-lg overflow-hidden">
    <!-- 头部 -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <h3 class="text-2xl font-bold mb-2">{{ title }}</h3>
      <p class="opacity-90">对比传统方式与现代ES特性</p>
    </div>

    <!-- 特性选择器 -->
    <div class="p-4 bg-gray-50 border-b border-gray-200">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(item, index) in items"
          :key="index"
          @click="selectItem(index)"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            currentItemIndex === index
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          ]"
        >
          {{ item.feature }}
        </button>
      </div>
    </div>

    <!-- 选项卡 -->
    <div class="border-b border-gray-200">
      <div class="flex">
        <button
          @click="currentTab = 'comparison'"
          :class="[
            'px-6 py-3 font-medium text-sm border-b-2 transition-colors',
            currentTab === 'comparison'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          ]"
        >
          代码对比
        </button>
        <button
          v-if="showBrowserSupport"
          @click="currentTab = 'browser-support'"
          :class="[
            'px-6 py-3 font-medium text-sm border-b-2 transition-colors',
            currentTab === 'browser-support'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          ]"
        >
          浏览器支持
        </button>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="p-6">
      <!-- 代码对比 -->
      <div v-if="currentTab === 'comparison'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 传统方式 -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <h4 class="text-lg font-semibold text-gray-800">{{ currentItem.oldWay.title }}</h4>
            </div>
            
            <div class="relative">
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto"><code>{{ currentItem.oldWay.code }}</code></pre>
              <button
                @click="copyCode(currentItem.oldWay.code)"
                class="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                title="复制代码"
              >
                📋
              </button>
            </div>
            
            <p class="text-gray-600 text-sm">{{ currentItem.oldWay.description }}</p>
            
            <div v-if="currentItem.oldWay.issues" class="bg-red-50 border-l-4 border-red-500 p-3 rounded-r">
              <h5 class="font-medium text-red-800 mb-2">❌ 存在的问题</h5>
              <ul class="text-red-700 text-sm space-y-1">
                <li v-for="issue in currentItem.oldWay.issues" :key="issue" class="flex items-start space-x-2">
                  <span class="text-red-500 mt-0.5">•</span>
                  <span>{{ issue }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 现代方式 -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <h4 class="text-lg font-semibold text-gray-800">{{ currentItem.newWay.title }}</h4>
            </div>
            
            <div class="relative">
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto"><code>{{ currentItem.newWay.code }}</code></pre>
              <button
                @click="copyCode(currentItem.newWay.code)"
                class="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                title="复制代码"
              >
                📋
              </button>
            </div>
            
            <p class="text-gray-600 text-sm">{{ currentItem.newWay.description }}</p>
            
            <div v-if="currentItem.newWay.benefits" class="bg-green-50 border-l-4 border-green-500 p-3 rounded-r">
              <h5 class="font-medium text-green-800 mb-2">✅ 优势</h5>
              <ul class="text-green-700 text-sm space-y-1">
                <li v-for="benefit in currentItem.newWay.benefits" :key="benefit" class="flex items-start space-x-2">
                  <span class="text-green-500 mt-0.5">•</span>
                  <span>{{ benefit }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 总结 -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 class="font-medium text-blue-800 mb-2">💡 总结</h5>
          <p class="text-blue-700 text-sm">
            {{ currentItem.feature }}展示了JavaScript语言的演进，现代语法更加简洁、易读且功能强大。
            建议在新项目中优先使用现代语法，但也要考虑浏览器兼容性要求。
          </p>
        </div>
      </div>

      <!-- 浏览器支持 -->
      <div v-else-if="currentTab === 'browser-support'" class="space-y-6">
        <div v-if="currentItem.browserSupport">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">
            {{ currentItem.browserSupport.feature }} 浏览器支持情况
          </h4>
          
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Chrome -->
              <div class="text-center">
                <div class="text-3xl mb-2">🌐</div>
                <h5 class="font-medium text-gray-800">Chrome</h5>
                <p class="text-sm text-green-600">{{ currentItem.browserSupport.support }}</p>
              </div>
              
              <!-- Firefox -->
              <div class="text-center">
                <div class="text-3xl mb-2">🦊</div>
                <h5 class="font-medium text-gray-800">Firefox</h5>
                <p class="text-sm text-green-600">{{ currentItem.browserSupport.support }}</p>
              </div>
              
              <!-- Safari -->
              <div class="text-center">
                <div class="text-3xl mb-2">🧭</div>
                <h5 class="font-medium text-gray-800">Safari</h5>
                <p class="text-sm text-green-600">{{ currentItem.browserSupport.support }}</p>
              </div>
              
              <!-- Edge -->
              <div class="text-center">
                <div class="text-3xl mb-2">🔷</div>
                <h5 class="font-medium text-gray-800">Edge</h5>
                <p class="text-sm text-green-600">{{ currentItem.browserSupport.support }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h5 class="font-medium text-yellow-800 mb-2">⚠️ 注意事项</h5>
            <ul class="text-yellow-700 text-sm space-y-1">
              <li>• 确保目标用户的浏览器版本支持该特性</li>
              <li>• 考虑使用 Babel 等工具进行向下兼容转换</li>
              <li>• 可以使用 polyfill 为旧浏览器提供支持</li>
              <li>• 在生产环境前进行充分的兼容性测试</li>
            </ul>
          </div>
        </div>
        
        <div v-else class="text-center text-gray-500 py-8">
          <div class="text-4xl mb-4">📊</div>
          <p>该特性的浏览器支持信息暂未提供</p>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <div class="bg-gray-50 border-t border-gray-200 p-4">
      <div class="flex items-center justify-between">
        <button
          @click="selectItem(currentItemIndex === 0 ? items.length - 1 : currentItemIndex - 1)"
          class="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <span>← 上一个特性</span>
        </button>
        
        <span class="text-sm text-gray-500">
          {{ currentItemIndex + 1 }} / {{ items.length }}
        </span>
        
        <button
          @click="selectItem((currentItemIndex + 1) % items.length)"
          class="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <span>下一个特性 →</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-comparison {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

pre code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
}
</style>