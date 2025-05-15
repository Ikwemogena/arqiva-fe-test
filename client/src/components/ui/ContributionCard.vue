<script setup lang="ts">
import type { Contribution } from '../../types/contribution'
import { formatDateRange } from '../../utils/date.ts'
import IconCalendar from '../icons/IconCalendar.vue'
import IconUser from '../icons/IconUser.vue'

defineProps<{
  contribution: Contribution
}>()

function getStatus(contribution: Contribution) {
  const now = new Date()
  const startTime = new Date(contribution.startTime)
  const endTime = new Date(contribution.endTime)

  if (now < startTime) {
    return 'scheduled'
  }
  else if (now >= startTime && now <= endTime) {
    return 'active'
  }
  else {
    return 'completed'
  }
}
</script>

<template>
  <div class="contribution__card">
    <div style="display: flex; flex-direction: column; gap: 0.4rem">
      <div class="contribution__header">
        <h3 class="contribution__card-title">
          {{ contribution.title }}
        </h3>
        <div>
          <p class="status" :class="getStatus(contribution) ">
            {{ getStatus(contribution) }}
          </p>
        </div>
      </div>
      <p class="contribution__card-description">
        {{ contribution.description }}
      </p>
    </div>

    <div style="color: #545e6b; display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.9rem">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <IconCalendar style="color: #000;" />
        <p>{{ formatDateRange(contribution.startTime, contribution.endTime) }}</p>
      </div>

      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <IconUser style="color: #000;" />
        <p>{{ contribution.owner }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contribution__card {
  background-color: #f5f6f8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem;
  width: 100%;
  border: 1px solid #d8d5d5;
  border-radius: 0.75rem;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  transition:
    transform 0.14s cubic-bezier(0.4, 2, 0.6, 1),
    box-shadow 0.13s;
}

.contribution__card:hover {
  transform: translateY(-5px) scale(1.018);
  box-shadow: 0 5px 32px rgba(0, 0, 0, 0.13);
  border: 1px solid #dddddd;
}

.contribution__header {
  display: flex;
  justify-content: space-between;
  line-height: 1.2;
}

.contribution__card-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #1a202c;
  margin: 0;
}

.contribution__card-description {
  font-size: 1rem;
  color: #555555;
}

.status {
  border-radius: 1rem;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  text-transform: capitalize;
}

.status.completed {
  background-color: #e4f0e8;
  color: #2a8c37;
}

.status.active {
  background-color: #eaf3ff;
  color: #0073e6;
}

.status.scheduled {
  background-color: #fff4e5;
  color: #e67e22;
}
</style>
