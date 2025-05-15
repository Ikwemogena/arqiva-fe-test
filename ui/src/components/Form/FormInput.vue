<script setup lang="ts">
defineProps<{
  placeholder?: string
  disabled?: boolean
}>()
</script>

<template>
  <input type="text" :placeholder="placeholder" :disabled="disabled">
</template>

<style scoped>
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 30%;
}
</style>
