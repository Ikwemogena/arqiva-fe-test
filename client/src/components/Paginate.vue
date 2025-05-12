<script setup lang="ts">
import { computed } from 'vue'

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
}
</script>

<template>
  <div class="pagination" v-if="totalPages > 1">
    <button v-show="currentPage > 1" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
      Prev
    </button>

    <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>

    <button v-show="currentPage < totalPages" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
      Next
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f6f8;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  gap: 0.5rem;
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
