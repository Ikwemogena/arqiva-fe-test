<script setup lang="ts">
import ContributionCard from "../components/ui/ContributionCard.vue";
import { useFetch } from "@vueuse/core";
import {computed, onMounted, ref, watch, watchEffect} from "vue";
import type { Contribution } from "../types/contribution";
import FormInput from "../components/ui/Form/FormInput.vue";
import {useRoute, useRouter} from "vue-router";
import {sanitizeQuery} from "../utils/object.ts";

interface ApiResponse {
  contributions: Contribution[];
  total: number;
  skip: number;
  limit: number;
}

const router = useRouter()
const params = ref(sanitizeQuery(useRoute().query))
const contributions = ref<Contribution[]>([])

const noResultCopy = computed(() => {
  if (params.value.search && !contributions.value.length) {
    return `No contributions found for "${params.value.search}"`
  }

  if (!contributions.value.length) {
    return 'No contributions found'
  }
})

const searchTriggered = (title: number) => {
  params.value = sanitizeQuery({ ...params.value, ...{ title, page: undefined } })
}

const fetchContributions = async () => {
  const url = `http://127.0.0.1:8000/contributions/?${new URLSearchParams(params.value)}`;
  const { data } = await useFetch<ApiResponse>(url).get()

  if (data.value) {
    console.log('Full data value:', data.value)
    console.log('Type of data.value:', typeof data.value)
    console.log('Is data.value a string?', typeof data.value === 'string')

    if (typeof data.value === 'string') {
      try {
        const parsed = JSON.parse(data.value)
        console.log('Parsed data:', parsed)
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
})

onMounted(() => {
  fetchContributions()
  if(!params.value.limit) {
    params.value = { ...params.value, ...{ limit: 14 } }
  }
})

</script>

<template>
    <div>
      <div style="padding: 2rem; display: flex; justify-content: center">
        <FormInput v-debounce:300ms="searchTriggered" placeholder="Search contributor name" :value="params.title" />
      </div>
      <div style="padding: 2rem">
        <div class="contributions__grid" v-if="contributions.length">
          <ContributionCard v-for="(contribution, index) in contributions" :key="index" :contribution="contribution" />
        </div>
        <div v-else>{{ noResultCopy }}</div>
      </div>
    </div>
</template>

<style scoped>
.contributions__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
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
