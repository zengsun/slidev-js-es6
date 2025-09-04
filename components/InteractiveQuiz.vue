<script setup lang="ts">
import { ref, computed } from 'vue'

interface Choice {
  id: string
  text: string
  isCorrect: boolean
}

interface Question {
  id: string
  question: string
  type: 'multiple-choice' | 'code-complete' | 'true-false'
  choices?: Choice[]
  code?: string
  correctAnswer?: string
  explanation: string
}

interface Props {
  questions: Question[]
  showFeedback?: boolean
  allowRetry?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showFeedback: true,
  allowRetry: true
})

const currentQuestionIndex = ref(0)
const selectedAnswers = ref<Record<string, string>>({})
const showExplanation = ref<Record<string, boolean>>({})
const quizCompleted = ref(false)
const userCode = ref('')

const currentQuestion = computed(() => props.questions[currentQuestionIndex.value])
const totalQuestions = computed(() => props.questions.length)

const score = computed(() => {
  let correct = 0
  props.questions.forEach(question => {
    const userAnswer = selectedAnswers.value[question.id]
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      const correctChoice = question.choices?.find(c => c.isCorrect)
      if (userAnswer === correctChoice?.id) {
        correct++
      }
    } else if (question.type === 'code-complete') {
      if (userAnswer === question.correctAnswer) {
        correct++
      }
    }
  })
  return Math.round((correct / totalQuestions.value) * 100)
})

const selectAnswer = (questionId: string, answerId: string) => {
  selectedAnswers.value[questionId] = answerId
  if (props.showFeedback) {
    showExplanation.value[questionId] = true
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < totalQuestions.value - 1) {
    currentQuestionIndex.value++
  } else {
    quizCompleted.value = true
  }
}

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const resetQuiz = () => {
  currentQuestionIndex.value = 0
  selectedAnswers.value = {}
  showExplanation.value = {}
  quizCompleted.value = false
  userCode.value = ''
}

const checkCodeAnswer = () => {
  const questionId = currentQuestion.value.id
  selectedAnswers.value[questionId] = userCode.value.trim()
  showExplanation.value[questionId] = true
}

const isAnswerCorrect = (questionId: string) => {
  const userAnswer = selectedAnswers.value[questionId]
  const question = props.questions.find(q => q.id === questionId)
  
  if (!question || !userAnswer) return false
  
  if (question.type === 'multiple-choice' || question.type === 'true-false') {
    const correctChoice = question.choices?.find(c => c.isCorrect)
    return userAnswer === correctChoice?.id
  } else if (question.type === 'code-complete') {
    return userAnswer === question.correctAnswer
  }
  
  return false
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600'
  if (score >= 70) return 'text-yellow-600'
  return 'text-red-600'
}
</script>

<template>
  <div class="interactive-quiz bg-white border-2 border-blue-200 rounded-lg p-6">
    <!-- 测验完成页面 -->
    <div v-if="quizCompleted" class="text-center">
      <div class="mb-6">
        <div class="text-6xl mb-4">🎉</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">测验完成！</h3>
        <p class="text-gray-600">您已完成所有问题</p>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-6 mb-6">
        <div class="text-4xl font-bold mb-2" :class="getScoreColor(score)">
          {{ score }}%
        </div>
        <p class="text-gray-600">
          答对 {{ Math.round(score * totalQuestions / 100) }} / {{ totalQuestions }} 题
        </p>
      </div>
      
      <div class="space-y-3">
        <div v-if="score >= 90" class="text-green-600">
          <p class="font-medium">🌟 优秀！</p>
          <p class="text-sm">您对这些概念掌握得很好！</p>
        </div>
        <div v-else-if="score >= 70" class="text-yellow-600">
          <p class="font-medium">👍 良好！</p>
          <p class="text-sm">还有一些概念需要加强理解。</p>
        </div>
        <div v-else class="text-red-600">
          <p class="font-medium">📚 需要复习</p>
          <p class="text-sm">建议重新学习相关内容后再次尝试。</p>
        </div>
        
        <button
          v-if="allowRetry"
          @click="resetQuiz"
          class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          重新开始测验
        </button>
      </div>
    </div>

    <!-- 测验进行中 -->
    <div v-else>
      <!-- 进度条 -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">进度</span>
          <span class="text-sm text-gray-500">
            {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- 当前问题 -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          {{ currentQuestion.question }}
        </h3>

        <!-- 代码块（如果有） -->
        <div v-if="currentQuestion.code" class="mb-4">
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto"><code>{{ currentQuestion.code }}</code></pre>
        </div>

        <!-- 选择题 -->
        <div 
          v-if="currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false'"
          class="space-y-3"
        >
          <button
            v-for="choice in currentQuestion.choices"
            :key="choice.id"
            @click="selectAnswer(currentQuestion.id, choice.id)"
            :class="[
              'w-full text-left p-4 rounded-lg border-2 transition-colors',
              selectedAnswers[currentQuestion.id] === choice.id
                ? showExplanation[currentQuestion.id]
                  ? choice.isCorrect
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-red-500 bg-red-50 text-red-800'
                  : 'border-blue-500 bg-blue-50 text-blue-800'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            ]"
            :disabled="showExplanation[currentQuestion.id]"
          >
            <div class="flex items-center space-x-3">
              <div :class="[
                'w-4 h-4 rounded-full border-2',
                selectedAnswers[currentQuestion.id] === choice.id
                  ? showExplanation[currentQuestion.id]
                    ? choice.isCorrect
                      ? 'border-green-500 bg-green-500'
                      : 'border-red-500 bg-red-500'
                    : 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              ]"></div>
              <span>{{ choice.text }}</span>
            </div>
          </button>
        </div>

        <!-- 代码填空题 -->
        <div v-else-if="currentQuestion.type === 'code-complete'" class="space-y-4">
          <textarea
            v-model="userCode"
            class="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500"
            placeholder="在这里写下您的代码..."
            :disabled="showExplanation[currentQuestion.id]"
          ></textarea>
          <button
            v-if="!showExplanation[currentQuestion.id]"
            @click="checkCodeAnswer"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            :disabled="!userCode.trim()"
          >
            提交答案
          </button>
        </div>

        <!-- 答案解释 -->
        <div 
          v-if="showExplanation[currentQuestion.id]"
          class="mt-6 p-4 rounded-lg"
          :class="isAnswerCorrect(currentQuestion.id) 
            ? 'bg-green-50 border-l-4 border-green-500' 
            : 'bg-red-50 border-l-4 border-red-500'"
        >
          <div class="flex items-start space-x-3">
            <div :class="isAnswerCorrect(currentQuestion.id) ? 'text-green-600' : 'text-red-600'">
              {{ isAnswerCorrect(currentQuestion.id) ? '✅' : '❌' }}
            </div>
            <div>
              <h4 :class="[
                'font-medium mb-2',
                isAnswerCorrect(currentQuestion.id) ? 'text-green-800' : 'text-red-800'
              ]">
                {{ isAnswerCorrect(currentQuestion.id) ? '回答正确！' : '回答错误' }}
              </h4>
              <p :class="isAnswerCorrect(currentQuestion.id) ? 'text-green-700' : 'text-red-700'">
                {{ currentQuestion.explanation }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 导航按钮 -->
      <div class="flex items-center justify-between">
        <button
          @click="prevQuestion"
          :disabled="currentQuestionIndex === 0"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← 上一题
        </button>
        
        <button
          @click="nextQuestion"
          :disabled="!selectedAnswers[currentQuestion.id]"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ currentQuestionIndex === totalQuestions - 1 ? '完成测验' : '下一题 →' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interactive-quiz {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

pre code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
}

textarea {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
}
</style>