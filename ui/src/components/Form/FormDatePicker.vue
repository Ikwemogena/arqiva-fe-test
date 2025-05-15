<script setup lang="ts">
import { computed, ref } from 'vue'
import IconCalendar from "../icons/IconCalendar.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select date',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  min: {
    type: String,
    default: '',
  },
  max: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const dateValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const focused = ref(false)

const handleFocus = () => {
  focused.value = true
}

const handleBlur = () => {
  focused.value = false
}
</script>

<template>
  <div class="form-date-container" :class="{ focused }">
    <input
      v-model="dateValue"
      type="date"
      class="form-date"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :min="min"
      :max="max"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    <div class="date-icon">
      <IconCalendar />
    </div>
  </div>
</template>

<style scoped>
.form-date-container {
  position: relative;
  width: 100%;
}

.form-date {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  background-color: #fff;
  color: #4a5568;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.form-date:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.form-date:disabled {
  background-color: #f7fafc;
  cursor: not-allowed;
  opacity: 0.7;
}

.focused .date-icon {
  color: #3182ce;
}

.date-icon {
  position: absolute;
  right: 7px;
  top: 57%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #718096;
}

.form-date::-webkit-calendar-picker-indicator {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

.form-date::-moz-date-placeholder {
  color: #a0aec0;
}

.form-date:not(:valid) {
  color: transparent;
}

.form-date:not(:valid) ~ .date-icon {
  color: #a0aec0;
}

.form-date::placeholder {
  color: #a0aec0;
}
</style>
