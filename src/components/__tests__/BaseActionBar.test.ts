import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Component from '@/components/base/BaseActionBar.vue'

describe('TypeScrollSelector.vue', () => {
  const typeList = ['All', 'News', 'Video', 'Image']

  const factory = () =>
    mount(Component, {
      props: { typeList },
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })

  it('初始顯示第一個 type 並加上 active class', () => {
    const wrapper = factory()
    const buttons = wrapper.findAll('.action-bar-btn')
    expect(buttons[0].classes()).toContain('active')
  })

  it('點擊 type 按鈕會切換 active 類別', async () => {
    const wrapper = factory()
    const buttons = wrapper.findAll('.inline-flex > .action-bar-btn')

    await buttons[2].trigger('click')
    await nextTick()

    expect(buttons[2].classes()).toContain('active')
    expect(buttons[0].classes()).not.toContain('active')
  })

  it('點擊 icon 會 emit toggle 事件', async () => {
    const wrapper = factory()
    const icons = wrapper.findAllComponents({ name: 'FontAwesomeIcon' })
    const menuIcon = icons[0] // 第一個 icon 是 bars
    await menuIcon.trigger('click')
    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('點擊左右箭頭時呼叫 scroll 函式', async () => {
    const wrapper = factory()

    // 找到 scrollable div
    const scrollDiv = wrapper.find('.overflow-x-auto')
    const el = scrollDiv.element as HTMLElement

    // 模擬 scroll 行為
    el.scrollLeft = 0
    el.scrollBy = vi.fn()
    Object.defineProperty(el.style, 'scrollBehavior', {
      value: '',
      writable: true,
    })

    // 找出左右箭頭 icon（bars, less-than, magnifier, greater-than）
    const icons = wrapper.findAllComponents({ name: 'FontAwesomeIcon' })
    const leftArrow = icons[1]
    const rightArrow = icons[3]

    await leftArrow.trigger('click')
    await rightArrow.trigger('click')

    // 等待 requestAnimationFrame 執行
    await new Promise((resolve) => requestAnimationFrame(resolve))

    expect(el.scrollBy).toHaveBeenCalledTimes(2)
    expect(el.scrollBy).toHaveBeenCalledWith({ left: -150, behavior: 'smooth' })
    expect(el.scrollBy).toHaveBeenCalledWith({ left: 150, behavior: 'smooth' })
  })
})
