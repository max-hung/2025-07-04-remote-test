import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseItemGrid from '@/components/base/BaseItemGrid.vue'

describe('BaseItemGrid.vue', () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

  it('正確渲染所有項目', () => {
    const wrapper = mount(BaseItemGrid, {
      props: { items },
    })

    const gridItems = wrapper.findAll('.grid-item')

    expect(gridItems).toHaveLength(items.length)

    gridItems.forEach((itemWrapper, index) => {
      expect(itemWrapper.text()).toContain(items[index])
    })
  })
})
