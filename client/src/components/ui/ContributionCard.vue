<script setup lang="ts">

import IconCalendar from "../icons/IconCalendar.vue";
import IconUser from "../icons/IconUser.vue";
import type { Contribution } from "../../types/contribution";

defineProps<{
  contribution: Contribution;
}>()
</script>

<template>
  <div class="contribution__card">
    <div style="display: flex; flex-direction: column; gap: 0.4rem">
      <div class="contribution__header">
        <h3 class="contribution__card-title">{{ contribution.title }}</h3>
        <div>
<!--          <p class="status" :class="status.toLowerCase()">{{ status }}</p>-->
        </div>
      </div>
      <p class="contribution__card-description">{{ contribution.description }}</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.9rem">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <IconCalendar />
        <p>{{ contribution.startTime }} - {{ contribution.endTime }}</p>
      </div>

      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <IconUser />
        <p>{{ contribution.owner }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contribution__card {
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.contribution__card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.contribution__header {
  display: flex;
  justify-content: space-between;
  line-height: 1.2;
}

.contribution__card-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.contribution__card-description {
  font-size: 1rem;
  color: #666;
}

.status {
  border-radius: 1rem;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
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
