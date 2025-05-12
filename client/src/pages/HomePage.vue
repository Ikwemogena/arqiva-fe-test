<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFetch } from "@vueuse/core";
import { sanitizeQuery } from "../utils/object.ts";
import ContributionCard from "../components/ui/ContributionCard.vue";
import FormInput from "../components/ui/Form/FormInput.vue";
import FormSelect from "../components/ui/Form/FormSelect.vue";
import FormDatePicker from "../components/ui/Form/FormDatePicker.vue";
import type { Contribution } from "../types/contribution";

interface ApiResponse {
  contributions: Contribution[];
  total: number;
  skip: number;
  limit: number;
}

const router = useRouter()
const params = ref(sanitizeQuery(useRoute().query))
const contributions = ref<Contribution[]>([])
const showAdvancedFilters = ref(false)

const sortOptions = [
  { value: 'id', label: 'ID' },
  { value: 'title', label: 'Title' },
  { value: 'description', label: 'Description' },
  { value: 'startTime', label: 'Start Time' },
  { value: 'endTime', label: 'End Time' },
  { value: 'owner', label: 'Owner' }
]

const noResultCopy = computed(() => {
  if ((params.value.title || params.value.description || params.value.owner) && !contributions.value.length) {
    return `No contributions found for your search criteria`
  }

  if (!contributions.value.length) {
    return 'No contributions found'
  }
})

const updateSearch = (field: string, value: any) => {
  params.value = sanitizeQuery({ ...params.value, ...{ [field]: value, page: undefined } })
}

const resetFilters = () => {
  setTimeout(() => {
    params.value = sanitizeQuery({limit: params.value.limit})
  }, 300)
}

const fetchContributions = async () => {
  const url = `http://127.0.0.1:8000/contributions/?${new URLSearchParams(params.value)}`;
  const { data } = await useFetch<ApiResponse>(url).get()

  if (data.value) {
    if (typeof data.value === 'string') {
      try {
        const parsed = JSON.parse(data.value)
        contributions.value = parsed.contributions
      } catch (e) {
        console.error('Failed to parse response:', e)
      }
    } else {
      contributions.value = data.value.contributions
    }
  }
}

watchEffect(() => {
  router.push({
    query: {
      ...params.value
    }
  })
})

watch(params, () => {
  fetchContributions()
}, {deep: true})

onMounted(() => {
  fetchContributions()
  if(!params.value.limit) {
    params.value = { ...params.value, ...{ limit: 14 } }
  }
  if(!params.value.order_by) {
    params.value = { ...params.value, ...{ order_by: 'id' } }
  }
})
</script>

<template>
  <div>
    <div class="search-container">
      <div class="search-row">
        <FormInput v-debounce:300ms="(val) => updateSearch('title', val)" placeholder="Search by title" :value="params.title" />
        <button class="toggle-filters" @click="showAdvancedFilters = !showAdvancedFilters">
          {{ showAdvancedFilters ? 'Hide' : 'Show' }} Advanced Filters
        </button>
      </div>

      <Transition name="slide" mode="out-in">
        <div v-if="showAdvancedFilters" class="advanced-filters">
          <div class="filter-row">
            <FormInput v-debounce:300ms="(val) => updateSearch('description', val)" placeholder="Filter by description" :value="params.description" />
            <FormInput v-debounce:300ms="(val) => updateSearch('owner', val)" placeholder="Filter by owner" :value="params.owner" />
          </div>

          <div class="filter-row">
            <div class="date-range">
              <span>Start date range:</span>
              <FormDatePicker v-model="params.startTime_gt" @update:model-value="(val) => updateSearch('startTime_gt', val)" placeholder="From" />
              <FormDatePicker v-model="params.startTime_lt" @update:model-value="(val) => updateSearch('startTime_lt', val)" placeholder="To" />
            </div>

            <div class="date-range">
              <span>End date range:</span>
              <FormDatePicker v-model="params.endTime_gt" @update:model-value="(val) => updateSearch('endTime_gt', val)" placeholder="From" />
              <FormDatePicker v-model="params.endTime_lt" @update:model-value="(val) => updateSearch('endTime_lt', val)" placeholder="To" />
            </div>
          </div>

          <div class="filter-row">
            <div class="sort-option">
              <span>Sort by:</span>
              <FormSelect
                  :options="sortOptions"
                  v-model:selected="params.order_by"
              />
            </div>

            <button class="reset-button" @click="resetFilters">Reset All Filters</button>
          </div>
        </div>
      </Transition>
    </div>

    <div class="content-container">
      <div class="contributions__grid" v-if="contributions.length">
        <ContributionCard v-for="(contribution, index) in contributions" :key="index" :contribution="contribution" />
      </div>
      <div v-else class="no-results">{{ noResultCopy }}</div>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.search-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.toggle-filters {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.advanced-filters {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.sort-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reset-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;
}

.content-container {
  padding: 2rem;
}

.no-results {
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  font-style: italic;
  color: #666;
}

.contributions__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
}
.slide-enter-to {
  max-height: 1000px;
  opacity: 1;
}

.slide-leave-from {
  max-height: 1000px;
  opacity: 1;
}
.slide-leave-to {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
}


@media (min-width: 600px) {
  .contributions__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .contributions__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
