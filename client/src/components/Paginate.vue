<script setup lang="ts">
import { computed } from 'vue'
import {scrollToTop} from "../utils/scroll.ts";

interface Props {
  total: number
  limit: number
  currentPage: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()

const totalPages = computed(() => Math.ceil(props.total / props.limit))

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:page', page)
  }
  scrollToTop()
}

const paginationRange = computed(() => {
  const total = totalPages.value
  const current = props.currentPage
  const delta = 2
  const range = []
  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  range.push(1)

  if (left > 2) {
    range.push('...')
  }

  for (let i = left; i <= right; i++) {
    range.push(i)
  }

  if (right < total - 1) {
    range.push('...')
  }

  if (total > 1) {
    range.push(total)
  }

  return range
})
</script>

<template>
  <div class="pagination-wrapper" v-if="totalPages > 1">
    <div class="pagination">
      <button v-show="currentPage > 1" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        Prev
      </button>

      <button
          v-for="(item, index) in paginationRange"
          :key="index"
          :disabled="item === '...'"
          @click="typeof item === 'number' && goToPage(item)"
          :class="{ active: item === currentPage }"
      >
        {{ item }}
      </button>

      <button v-show="currentPage < totalPages" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>

    <div class="go-to-page" v-if="true">
      <label for="page-select">Go to page:</label>
      <select id="page-select" :value="currentPage" @change="goToPage($event?.target.value)">
        <option v-for="page in totalPages" :key="page" :value="page">
          {{ page }}
        </option>
      </select>
    </div>
  </div>
</template>


<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f6f8;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  gap: 0.5rem;
}

.go-to-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

select {
  padding: 0.4rem 0.6rem;
  border-radius: 0.375rem;
  border: 1px solid #cbd5e1;
  background: white;
  font-weight: 500;
}

button {
  background: transparent;
  border: none;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #1e293b;
}

button.active {
  background-color: #000;
  color: #fff;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
