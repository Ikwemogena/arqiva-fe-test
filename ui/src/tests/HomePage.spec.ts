import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const mockData = {
  contributions: [
    { id: 1, title: 'Test Title', description: 'Desc', startTime: new Date(), endTime: new Date(), owner: 'John' },
  ],
  total: 1,
  skip: 0,
  limit: 14,
}

beforeEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
  vi.stubGlobal('fetch', vi.fn())
})
const routes = [{ path: '/', component: HomePage }]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

beforeEach(() => {
  vi.resetAllMocks()
  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    }),
  ))
})

describe('homePage', () => {
  it('renders contributions from API', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(HomePage, {
      global: {
        plugins: [router],
      },
    })

    // Wait for fetch to resolve
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(fetch).toHaveBeenCalled()
    expect(wrapper.text()).toContain('Test Title')
  })

  it('shows no result message when API returns empty contributions', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ contributions: [] }),
    })

    router.push('/')
    await router.isReady()

    const wrapper = mount(HomePage, {
      global: {
        plugins: [router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('No contributions found')
  })

  it('toggles advanced filters', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(HomePage, {
      global: {
        plugins: [router],
      },
    })

    const toggleButton = wrapper.find('.toggle-filters')
    expect(toggleButton.exists()).toBe(true)

    await toggleButton.trigger('click')
    expect(wrapper.find('.advanced-filters').isVisible()).toBe(true)
  })
})
