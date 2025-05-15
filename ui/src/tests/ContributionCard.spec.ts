import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ContributionCard from '../components/ContributionCard.vue'

describe('contributionCard', () => {
  const mockContribution = {
    id: 1,
    title: 'Test Contribution',
    description: 'Test Description',
    startTime: new Date(Date.now() + 86400000).toISOString(),
    endTime: new Date(Date.now() + 172800000).toISOString(),
    owner: 'Test Owner',
  }

  it('renders properly', () => {
    const wrapper = mount(ContributionCard, {
      props: {
        contribution: mockContribution,
      },
    })

    expect(wrapper.text()).toContain('Test Contribution')
    expect(wrapper.text()).toContain('Test Description')
    expect(wrapper.text()).toContain('Test Owner')
  })

  it('calculates status correctly', () => {
    const wrapper = mount(ContributionCard, {
      props: {
        contribution: mockContribution,
      },
    })

    expect(wrapper.text()).toContain('scheduled')
  })

  it('has correct status class', () => {
    const wrapper = mount(ContributionCard, {
      props: {
        contribution: mockContribution,
      },
    })

    expect(wrapper.find('.status').classes()).toContain('scheduled')
  })
})
