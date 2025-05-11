<script setup lang="ts">
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconUser from "@/components/icons/IconUser.vue";

const title = "Global Economic Insights";
const description = "In-depth analysis of the latest economic trends around the world.";
const owner = "Global News Network";
const status = "Completed";
const startTime = new Date("2023-09-15T08:00:00");
const endTime = new Date("2023-09-15T10:00:00");
</script>

<template>
  <div class="contribution__card">
    <div style="display: flex; flex-direction: column; gap: 0.4rem">
      <div class="contribution__header">
        <h1 class="contribution__card-title">{{ title }}</h1>
        <div>
          <p class="status" :class="status.toLowerCase()">{{ status }}</p>
        </div>
      </div>
      <p class="contribution__card-description">{{ description }}</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.9rem">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <IconCalendar />
        <p>{{ startTime.toDateString() }} - {{ endTime.toDateString() }}</p>
      </div>

      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <IconUser />
        <p>{{ owner }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contribution__card {
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  width: 24rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
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
  font-size: 1.6rem;
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
