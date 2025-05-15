import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PaginationComponent from '../components/Paginate.vue'

describe('pagination', () => {
  const createWrapper = (total: number, limit: number, currentPage: number) => {
    return mount(PaginationComponent, {
      props: {
        total,
        limit,
        currentPage,
      },
    })
  }

  it('renders correct number of page buttons', () => {
    const wrapper = createWrapper(50, 10, 1)
    const pageButtons = wrapper.findAll('button')

    expect(pageButtons).toHaveLength(7)
  })

  it('disables previous button on first page', () => {
    const wrapper = createWrapper(5, 10, 1)
    const prevButton = wrapper.findAll('button').find(btn => btn.text() === 'Prev')

    expect(prevButton).toBeUndefined()
  })

  it('disables next button on last page', () => {
    const wrapper = createWrapper(5, 10, 5)
    const nextButton = wrapper.findAll('button').find(btn => btn.text() === 'Next')

    expect(nextButton).toBeUndefined()
  })

  it('emits page-change event when clicking page button', async () => {
    const wrapper = createWrapper(50, 10, 1)
    const pageButton = wrapper.findAll('button').find(b => b.text() === '2')

    await pageButton?.trigger('click')

    expect(wrapper.emitted('update:page')).toBeTruthy()
    expect(wrapper.emitted('update:page')![0]).toEqual([2])
  })
})
